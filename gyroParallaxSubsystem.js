/**
 * Gyro-parallax subsystem — background-only parallax from device orientation.
 *
 * Process (single direction of data flow):
 *
 *   SENSOR  — deviceorientation → low-pass filter → relative angles (minus calibrated base)
 *   MAP     — orientation-aware yaw/pitch scaling + soft dead-zone → desired angles
 *   SLEW    — rate-limited updates to targetYaw/targetPitch (iOS burst smoothing)
 *   FRAME   — per animation tick:
 *             stillness clock → settle decay → calibration timer → stillness reward
 *             → exponential smooth to displayed yaw/pitch → depth multipliers
 *             → gravity drift → Bezier-eased parallax → layer transforms + vignette
 *
 * Scene writes are isolated in applyToScene(); nothing here touches HUD DOM except vignette.
 */

// ─── Math ───────────────────────────────────────────────────────────────────

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

/** Cubic-bezier easing (x in [0..1] → y in [0..1]). Newton solve; safe fallback. */
function bezierEase01(x, p1x, p1y, p2x, p2y) {
  const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleDX = (t) => (3 * ax * t + 2 * bx) * t + cx;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;

  const xx = clamp01(x);
  let t = xx;
  for (let i = 0; i < 5; i++) {
    const dx = sampleX(t) - xx;
    const d = sampleDX(t);
    if (Math.abs(dx) < 1e-5 || Math.abs(d) < 1e-6) break;
    t = clamp01(t - dx / d);
  }
  return clamp01(sampleY(t));
}

// ─── Tuning (calm-v8 lineage) ────────────────────────────────────────────────

const T = {
  MAX_YAW: 0.14,
  MAX_PITCH: 0.10,
  LOW_PASS_A: 0.045,
  CAL_BASE_K: 0.06,
  DEAD_IN: 0.011,
  DEAD_OUT: 0.018,
  MAX_YAW_RATE: 0.55,
  MAX_PITCH_RATE: 0.45,
  STILL_DELTA_DEG: 0.5,
  SETTLE_STILL_MS: 260,
  SETTLE_IDLE_MS: 450,
  SETTLE_FACTOR: 0.06,
  STILL_MS_DECAY_TAU: 0.75,
  STILL_REWARD_START_MS: 1200,
  STILL_REWARD_EASE_TAU: 0.35,
  DISPLAY_TAU: 0.32,
  GRAV_YAW_REF: 0.1,
  GRAV_PITCH_REF: 0.1,
  GRAV_ACCEL_X: 10,
  GRAV_ACCEL_Y: 12,
  GRAV_DAMP_TAU: 0.65,
  GRAV_MAX_V: 8,
  FOLLOW_TAU_X: 0.42,
  FOLLOW_TAU_Y: 0.52,
  CLOUD_TAU: 0.72,
  PX_SCALE: 460,
  PY_SCALE: 720,
  CAL_MS_COMPLETE: 900,
  CAL_MS_CAP: 1200,
};

/**
 * @param {object} config
 * @param {number} config.LAYER_COUNT
 * @param {() => { nebulaStars: import('three').Object3D | null; radiantStars: import('three').Object3D | null; cosmicDust: import('three').Object3D | null; nebulaClouds: import('three').Sprite[] }} config.getSceneRefs
 * @param {() => HTMLElement | null} [config.getVignetteEl]
 */
export function createGyroParallaxSubsystem(config) {
  const { LAYER_COUNT, getSceneRefs } = config;
  const getVignetteEl = typeof config.getVignetteEl === 'function' ? config.getVignetteEl : () => null;

  /** @private — all mutable gyro state lives here */
  const s = {
    supported: false,
    enabled: false,
    started: false,
    targetYaw: 0,
    targetPitch: 0,
    yaw: 0,
    pitch: 0,
    lastEvtMs: 0,
    lastOriMs: 0,
    lastGamma: 0,
    lastBeta: 0,
    stillMs: 0,
    filtGamma: 0,
    filtBeta: 0,
    _stillHint: 0,
    gravVX: 0,
    gravVY: 0,
    baseGamma: 0,
    baseBeta: 0,
    calibrating: false,
    calibrateMs: 0,
    motionOn: true,
    stillReward: 1,
    parX: 0,
    parY: 0,
  };

  let orientationHandler = null;

  // ─── SENSOR → INTENT → SLEW (runs on deviceorientation) ─────────────────

  function buildOrientationHandler() {
    const toNorm = (deg, limitDeg) =>
      clamp((Number.isFinite(deg) ? deg : 0) / limitDeg, -1, 1);

    return (ev) => {
      const gamma = ev && typeof ev.gamma === 'number' ? ev.gamma : 0;
      const beta = ev && typeof ev.beta === 'number' ? ev.beta : 0;
      const nowMs =
        typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
      s.lastEvtMs = nowMs;

      const dG = Math.abs(gamma - s.lastGamma);
      const dB = Math.abs(beta - s.lastBeta);
      s.lastGamma = gamma;
      s.lastBeta = beta;
      const isStill = dG < T.STILL_DELTA_DEG && dB < T.STILL_DELTA_DEG;
      s._stillHint = isStill ? 1 : 0;

      const isLandscape =
        window.innerWidth > window.innerHeight ||
        (typeof window.orientation === 'number' && Math.abs(window.orientation) === 90);

      const yawFull = isLandscape ? 14 : 22;
      const pitchFull = isLandscape ? 20 : 12;
      const yawAmp = isLandscape ? 1.0 : 0.42;
      const pitchAmp = isLandscape ? 0.7 : 1.28;

      s.filtGamma += (gamma - s.filtGamma) * T.LOW_PASS_A;
      s.filtBeta += (beta - s.filtBeta) * T.LOW_PASS_A;

      if (s.calibrating) {
        s.baseGamma += (s.filtGamma - s.baseGamma) * T.CAL_BASE_K;
        s.baseBeta += (s.filtBeta - s.baseBeta) * T.CAL_BASE_K;
      }

      const relGamma = s.filtGamma - s.baseGamma;
      const relBeta = s.filtBeta - s.baseBeta;

      const rawYaw = toNorm(relGamma, yawFull) * T.MAX_YAW * yawAmp;
      const rawPitch = toNorm(relBeta, pitchFull) * T.MAX_PITCH * pitchAmp;

      const soft = (v) => {
        const av = Math.abs(v);
        if (av <= T.DEAD_IN) return 0;
        const t = Math.max(0, Math.min(1, (av - T.DEAD_IN) / (T.DEAD_OUT - T.DEAD_IN)));
        const sm = t * t * (3 - 2 * t);
        return Math.sign(v) * av * sm;
      };
      const desiredYaw = soft(rawYaw);
      const desiredPitch = soft(rawPitch);

      const last = Number.isFinite(s.lastOriMs) && s.lastOriMs > 0 ? s.lastOriMs : nowMs;
      s.lastOriMs = nowMs;
      const dts = Math.max(1 / 120, Math.min(0.06, (nowMs - last) / 1000));
      const dy = clamp(
        desiredYaw - s.targetYaw,
        -T.MAX_YAW_RATE * dts,
        T.MAX_YAW_RATE * dts
      );
      const dp = clamp(
        desiredPitch - s.targetPitch,
        -T.MAX_PITCH_RATE * dts,
        T.MAX_PITCH_RATE * dts
      );
      s.targetYaw += dy;
      s.targetPitch += dp;
    };
  }

  function startListening() {
    if (s.enabled) return;
    try {
      orientationHandler = orientationHandler || buildOrientationHandler();
      window.addEventListener('deviceorientation', orientationHandler, { passive: true });
      s.enabled = true;
    } catch (_) { /* ignore */ }
  }

  /** Request sensors (iOS needs user gesture) and attach listener. */
  function init() {
    if (s.started) return;
    s.started = true;

    const hasDeviceOrientation = typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;
    if (!hasDeviceOrientation) return;
    s.supported = true;

    try {
      const DOE = window.DeviceOrientationEvent;
      if (DOE && typeof DOE.requestPermission === 'function') {
        DOE.requestPermission()
          .then((res) => {
            if (res === 'granted') startListening();
          })
          .catch(() => {});
      } else {
        startListening();
      }
    } catch (_) { /* ignore */ }
  }

  /** Call when user enters the scene (same gesture as init on iOS). */
  function onEnterScene() {
    s.baseGamma = s.filtGamma || 0;
    s.baseBeta = s.filtBeta || 0;
    s.calibrating = true;
    s.calibrateMs = 0;
  }

  function resetParallaxOffsets() {
    s.targetYaw = 0;
    s.targetPitch = 0;
    s.yaw = 0;
    s.pitch = 0;
    s.gravVX = 0;
    s.gravVY = 0;
    s.parX = 0;
    s.parY = 0;
  }

  function recenter() {
    s.baseGamma = s.filtGamma || 0;
    s.baseBeta = s.filtBeta || 0;
    s.calibrating = true;
    s.calibrateMs = 0;
  }

  function toggleMotion() {
    s.motionOn = !s.motionOn;
    if (!s.motionOn) resetParallaxOffsets();
  }

  /** Long-press / double-tap on “breathe” — optional. */
  function bindBreathGestures(breathEl) {
    if (!breathEl) return;
    let pressTimer = 0;
    let lastTapAt = 0;
    const LONG_MS = 520;
    const TAP_MS = 320;

    const clear = () => {
      if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = 0;
      }
    };

    const onTouchStart = (e) => {
      if (e && e.touches && e.touches.length > 1) return;
      clear();
      pressTimer = setTimeout(() => {
        pressTimer = 0;
        recenter();
      }, LONG_MS);
    };

    const onTouchEnd = (e) => {
      clear();
      const now = Date.now();
      if (now - lastTapAt < TAP_MS) {
        lastTapAt = 0;
        toggleMotion();
      } else {
        lastTapAt = now;
      }
      if (e && e.type === 'touchend') e.preventDefault();
    };

    breathEl.addEventListener('touchstart', onTouchStart, { passive: true });
    breathEl.addEventListener('touchend', onTouchEnd, { passive: false });
    breathEl.addEventListener('touchcancel', clear, { passive: true });
    breathEl.addEventListener('dblclick', () => toggleMotion());
  }

  /** Milliseconds of stillness — for global calm coupling in the main loop. */
  function getStillMs() {
    return s.enabled && s.motionOn && Number.isFinite(s.stillMs) ? s.stillMs : 0;
  }

  // ─── FRAME: temporal + parallax + scene ────────────────────────────────

  function apply(dt, breath = 0, layerIndex = 0) {
    if (!s.enabled || !s.motionOn) return;

    const { nebulaStars, radiantStars, cosmicDust, nebulaClouds } = getSceneRefs();
    if (!(nebulaStars || cosmicDust || radiantStars || (nebulaClouds && nebulaClouds.length))) return;

    if (!Number.isFinite(dt) || dt <= 0) dt = 1 / 60;
    if (dt > 0.2) dt = 0.2;

    const stillHint = s._stillHint ? 1 : 0;
    if (stillHint) {
      s.stillMs = Math.min(20000, s.stillMs + dt * 1000);
    } else {
      const k = Math.exp(-dt / T.STILL_MS_DECAY_TAU);
      s.stillMs *= k;
      if (s.stillMs < 1) s.stillMs = 0;
    }

    const nowMs =
      typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
    const sinceEvt = s.lastEvtMs ? nowMs - s.lastEvtMs : 0;
    const shouldSettle = s.stillMs > T.SETTLE_STILL_MS || sinceEvt > T.SETTLE_IDLE_MS;
    if (shouldSettle) {
      const settle = Math.pow(T.SETTLE_FACTOR, dt);
      s.targetYaw *= settle;
      s.targetPitch *= settle;
      if (Math.abs(s.targetYaw) < 1e-4) s.targetYaw = 0;
      if (Math.abs(s.targetPitch) < 1e-4) s.targetPitch = 0;
    }

    const stillTarget =
      s.stillMs > T.STILL_REWARD_START_MS
        ? Math.max(0.78, 1 - (s.stillMs - T.STILL_REWARD_START_MS) / 8000)
        : 1.0;
    const stillEase = 1 - Math.exp(-dt / T.STILL_REWARD_EASE_TAU);
    s.stillReward += (stillTarget - s.stillReward) * stillEase;
    const stillReward = s.stillReward;

    if (s.calibrating) {
      s.calibrateMs = Math.min(T.CAL_MS_CAP, s.calibrateMs + dt * 1000);
      if (s.calibrateMs >= T.CAL_MS_COMPLETE) s.calibrating = false;
    }

    const ease = 1 - Math.exp(-Math.max(0, dt) / T.DISPLAY_TAU);
    s.yaw += (s.targetYaw - s.yaw) * ease;
    s.pitch += (s.targetPitch - s.pitch) * ease;

    if (!Number.isFinite(s.yaw) || !Number.isFinite(s.pitch)) {
      s.yaw = 0;
      s.pitch = 0;
      s.targetYaw = 0;
      s.targetPitch = 0;
      s.gravVX = 0;
      s.gravVY = 0;
      s.parX = 0;
      s.parY = 0;
    }

    const yaw = s.yaw;
    const pitch = s.pitch;

    const vignette = getVignetteEl();
    try {
      if (vignette && vignette.style) {
        const mag = Math.min(1, Math.hypot(yaw, pitch) / 0.11);
        const v = 0.06 + mag * 0.22;
        vignette.style.opacity = String(v.toFixed(3));
      }
    } catch (_) {}

    const b = Number.isFinite(breath) ? Math.max(0, Math.min(1, breath)) : 0;
    const breathDepth = 0.92 + b * 0.16;

    const li = Number.isFinite(layerIndex) ? layerIndex : 0;
    const depthNorm = Math.max(0, Math.min(1, li / Math.max(1, LAYER_COUNT - 1)));
    const layerDepth = 1.1 - depthNorm * 0.18;

    const depthMul = breathDepth * layerDepth * stillReward;

    let px = yaw * T.PX_SCALE * depthMul;
    let py = -pitch * T.PY_SCALE * depthMul;

    const gNormX = Math.max(-1, Math.min(1, s.targetYaw / T.GRAV_YAW_REF));
    const gNormY = Math.max(-1, Math.min(1, s.targetPitch / T.GRAV_PITCH_REF));
    const accelX = gNormX * T.GRAV_ACCEL_X;
    const accelY = -gNormY * T.GRAV_ACCEL_Y;
    const damp = Math.exp(-dt / T.GRAV_DAMP_TAU);
    s.gravVX = s.gravVX * damp + accelX * dt;
    s.gravVY = s.gravVY * damp + accelY * dt;
    s.gravVX = Math.max(-T.GRAV_MAX_V, Math.min(T.GRAV_MAX_V, s.gravVX));
    s.gravVY = Math.max(-T.GRAV_MAX_V, Math.min(T.GRAV_MAX_V, s.gravVY));

    px += s.gravVX;
    py += s.gravVY;

    const tx = 1 - Math.exp(-dt / T.FOLLOW_TAU_X);
    const ty = 1 - Math.exp(-dt / T.FOLLOW_TAU_Y);
    const ex = bezierEase01(tx, 0.22, 0.0, 0.36, 1.0);
    const ey = bezierEase01(ty, 0.22, 0.0, 0.36, 1.0);
    s.parX += (px - s.parX) * ex;
    s.parY += (py - s.parY) * ey;
    px = s.parX;
    py = s.parY;

    if (nebulaStars) {
      nebulaStars.position.x = px * 0.06;
      nebulaStars.position.y = py * 0.09;
      nebulaStars.rotation.y += yaw * 0.002;
      nebulaStars.rotation.x += pitch * 0.001;
    }
    if (radiantStars) {
      radiantStars.position.x = px * 0.075;
      radiantStars.position.y = py * 0.115;
      radiantStars.rotation.y += yaw * 0.002;
      radiantStars.rotation.x += pitch * 0.001;
    }
    if (cosmicDust) {
      cosmicDust.position.x = px * 0.14;
      cosmicDust.position.y = py * 0.22;
      cosmicDust.rotation.y += yaw * 0.003;
      cosmicDust.rotation.x += pitch * 0.002;
    }
    if (nebulaClouds && nebulaClouds.length) {
      for (let i = 0; i < nebulaClouds.length; i++) {
        const sp = nebulaClouds[i];
        if (!sp || !sp.position || !sp.userData) continue;
        const bx = Number.isFinite(sp.userData.baseX) ? sp.userData.baseX : sp.position.x;
        const by = Number.isFinite(sp.userData.baseY) ? sp.userData.baseY : sp.position.y;
        const bz = Number.isFinite(sp.userData.baseZ) ? sp.userData.baseZ : sp.position.z;
        const size = Number.isFinite(sp.userData.baseSize) ? sp.userData.baseSize : sp.scale.x;
        const w = Math.max(0.7, Math.min(1.8, size / 55));

        const tgx = bx + px * 0.33 * w;
        const tgy = by + py * 0.52 * w;
        const tgz = bz + (yaw * 28 - pitch * 18) * 0.035 * w;

        if (!Number.isFinite(sp.userData.gyroX)) sp.userData.gyroX = sp.position.x;
        if (!Number.isFinite(sp.userData.gyroY)) sp.userData.gyroY = sp.position.y;
        if (!Number.isFinite(sp.userData.gyroZ)) sp.userData.gyroZ = sp.position.z;

        const tt = 1 - Math.exp(-dt / T.CLOUD_TAU);
        const e = bezierEase01(tt, 0.18, 0.0, 0.3, 1.0);
        sp.userData.gyroX += (tgx - sp.userData.gyroX) * e;
        sp.userData.gyroY += (tgy - sp.userData.gyroY) * e;
        sp.userData.gyroZ += (tgz - sp.userData.gyroZ) * e;

        sp.position.x = sp.userData.gyroX;
        sp.position.y = sp.userData.gyroY;
        sp.position.z = sp.userData.gyroZ;
      }
    }
  }

  return {
    init,
    onEnterScene,
    bindBreathGestures,
    apply,
    getStillMs,
  };
}
