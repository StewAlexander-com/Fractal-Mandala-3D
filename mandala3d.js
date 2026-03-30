/* ═══════════════════════════════════════════════════════════
   THE FRACTAL MANDALA — 3D Quantum Orbital Sacred Geometry
   Each layer = a quantum orbital shell of awareness
   Navigate inward/outward through concentric consciousness

   ARCHITECTURE ↔ WORLDVIEW (isomorphic)
   • Invariant ontology — LAYERS (seven), language, geometry ids, inward/out path.
   • Invariant dynamics — one field of laws: build*, animate; navigation + resilience.
   • Variable relation only — GENESIS: seed + INITIAL_CONDITIONS, applied once; never
     rewrites teachings or redefines layers. Initial state in a bounded basin.
   • Constraint / freedom — no false dichotomy: GENESIS_BOUNDS is the vessel; lawful
     variation inside is the freedom. Same gesture as “order amid change, change amid
     order” (Whitehead): rigor and play are one structure at different resolutions.
   • Fault — fall back to canonical conditions; meaning persists; atmosphere may reset.
   • Modules — ontology.js (invariant data), genesis.js (bounded initial relation),
     mandala3d.js (dynamics, perception, UI). Same split as worldview layers above.

   ═══════════════════════════════════════════════════════════ */

import * as THREE from 'three';
import {
  LAYERS,
  LAYER_COUNT,
  LAYER_SPACING,
  LAYER_TILTS,
  LINEAGE,
  TAU,
} from './ontology.js';
import {
  INITIAL_CONDITIONS,
  applyInitialConditions,
} from './genesis.js';

// DYNAMICS + PRESENTATION — everything below orchestrates Three.js, input, and the loop.
// Ontology and genesis are imported; they are not duplicated here.

// ─── RESILIENCE LAYER — fault-tolerant foundation ───
// dt clamp: accept finitude; preserve continuity (no runaway state on resume)
const MAX_DT = 0.1;          // 100ms — anything larger is a tab resume spike
const SAFE_NUM = (v, fallback = 0) => Number.isFinite(v) ? v : fallback;

// ─── Reduced-motion preference ───
// Queries OS-level accessibility setting. When active, we scale down
// continuous JS animations (orbit, drift, particle motion) to near-zero
// while keeping the scene renderable and navigable.
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let prefersReducedMotion = reducedMotionQuery.matches;
reducedMotionQuery.addEventListener('change', (e) => { prefersReducedMotion = e.matches; });



// ─── STATE ───
let currentLayer = 0;
let targetLayer = 0;
let cameraZ = LAYER_COUNT * LAYER_SPACING + 20;
let targetCameraZ = cameraZ;
let isTransitioning = false;
let transitionTimer = 0;
let entered = false;
let clock, scene, camera, renderer;
let orbitalGroups = [];
let particleSystems = [];
let coreGlow;
let starGlowTexture; // shared radial glow for all point materials

// User camera controls
let userOrbitAngle = 0;       // radians — horizontal orbit offset from swipe/drag
let targetOrbitAngle = 0;
let lastOrbitInputTime = 0;   // timestamp of last user orbit interaction
const ORBIT_IDLE_DELAY = 4;   // seconds before auto-orbit resumes
const ORBIT_DECAY_RATE = 0.3; // how fast user orbit decays back to 0
let userZoom = 1;             // 1 = default, <1 = zoomed in, >1 = zoomed out
let targetZoom = 1;
const ZOOM_MIN = 0.55;
const ZOOM_MAX = 1.6;
const BASE_ORBIT_RADIUS = 2;  // the gentle auto-orbit amplitude

// ─── DOM (null-safe — every ref guarded so a missing element can’t crash the app) ───
const $ = id => document.getElementById(id);  // shorthand
const canvas         = $('canvas');
const layerTitle     = $('layerTitle');
const layerNumber    = $('layerNumber');
const layerName      = $('layerName');
const layerSubtitle  = $('layerSubtitle');
const teachingWrap   = $('teachingWrap');
const teachingPanel  = $('teachingPanel');
const teachingInner  = $('teachingInner');
const teachingPanelToggle = $('teachingPanelToggle');
const welcome        = $('welcome');
const enterBtn       = $('enterBtn');
const sliderTrack    = $('sliderTrack');
const sliderFill     = $('sliderFill');
const sliderThumb    = $('sliderThumb');
const sliderStops    = $('sliderStops');
const sliderTooltip  = $('sliderTooltip');
const layerContext   = $('layerContext');
const breathEl       = $('breath');
const gyroVignette   = $('gyroVignette');
let visitedLayers = new Set();
const audioToggle    = $('audioToggle');
const micToggle      = $('micToggle');
const micModal       = $('micModal');
const micAllow       = $('micAllow');
const micDeny        = $('micDeny');
const exitBtn        = $('exitBtn');

// Accessibility: allow pinch-zoom on the welcome overlay before entering.
// We keep canvas touch handling strict after entering for gesture controls.
if (canvas) {
  try { canvas.style.touchAction = 'pinch-zoom'; } catch (_) {}
}

// ─── SCROLL FADE INDICATORS + HINT ARROWS ───
const scrollHintUp   = $('scrollHintUp');
const scrollHintDown = $('scrollHintDown');

function updateScrollFades() {
  if (!teachingPanel) return;
  const el = teachingPanel;
  const threshold = 8;
  const canUp = el.scrollTop > threshold;
  const canDown = el.scrollHeight - el.scrollTop - el.clientHeight > threshold;
  el.classList.toggle('fade-top', canUp);
  el.classList.toggle('fade-bottom', canDown);
  if (scrollHintUp) scrollHintUp.disabled = !canUp;
  if (scrollHintDown) scrollHintDown.disabled = !canDown;
}
if (teachingPanel) teachingPanel.addEventListener('scroll', updateScrollFades, { passive: true });

function scrollTeachingByHint(direction) {
  if (!teachingPanel) return;
  const step = Math.min(Math.round(teachingPanel.clientHeight * 0.55), 280);
  const behavior = prefersReducedMotion ? 'auto' : 'smooth';
  teachingPanel.scrollBy({ top: direction * step, behavior });
}

// iOS home-screen / standalone often omits or delays synthetic click; mirror other HUD controls.
let lastScrollHintTap = 0;
function bindScrollHintButton(btn, direction) {
  if (!btn) return;
  const onActivate = (e) => {
    e.stopPropagation();
    if (e.type === 'touchend') e.preventDefault();
    const now = Date.now();
    if (now - lastScrollHintTap < 320) return;
    lastScrollHintTap = now;
    if (btn.disabled) return;
    scrollTeachingByHint(direction);
  };
  btn.addEventListener('click', onActivate);
  btn.addEventListener('touchend', onActivate);
  btn.addEventListener('touchstart', (e) => { e.stopPropagation(); }, { passive: true });
  btn.addEventListener('touchmove', (e) => { e.stopPropagation(); }, { passive: true });
}
bindScrollHintButton(scrollHintUp, -1);
bindScrollHintButton(scrollHintDown, 1);

// ─── KEY IDEAS PANEL SHOW / HIDE (co-located toggle — same HUD language as audio/mic) ───
function syncTeachingPanelCollapsed(collapsed) {
  if (!teachingWrap) return;
  teachingWrap.classList.toggle('teaching-wrap--collapsed', !!collapsed);
  if (teachingPanelToggle) {
    teachingPanelToggle.setAttribute('aria-expanded', String(!collapsed));
    teachingPanelToggle.setAttribute(
      'aria-label',
      collapsed ? 'Show key ideas panel' : 'Hide key ideas panel'
    );
    teachingPanelToggle.title = collapsed ? 'Show key ideas' : 'Hide key ideas';
  }
}

function toggleTeachingPanelCollapsed() {
  if (!teachingWrap) return;
  syncTeachingPanelCollapsed(!teachingWrap.classList.contains('teaching-wrap--collapsed'));
}

let lastTeachingPanelToggleAt = 0;
function handleTeachingPanelToggle(ev) {
  if (!entered || !teachingWrap || !teachingPanelToggle) return;
  if (ev) {
    ev.stopPropagation();
    if (ev.type === 'touchend') ev.preventDefault();
  }
  const t = Date.now();
  if (t - lastTeachingPanelToggleAt < 320) return;
  lastTeachingPanelToggleAt = t;
  toggleTeachingPanelCollapsed();
}

if (teachingPanelToggle) {
  teachingPanelToggle.addEventListener('click', handleTeachingPanelToggle);
  teachingPanelToggle.addEventListener('touchend', handleTeachingPanelToggle);
  teachingPanelToggle.addEventListener('touchstart', (e) => { e.stopPropagation(); }, { passive: true });
  teachingPanelToggle.addEventListener('touchmove', (e) => { e.stopPropagation(); }, { passive: true });
}

// ─── PANEL TOUCH ISOLATION ───
// Prevent touch events on the teaching panel from leaking to the canvas
// gesture system. On mobile, the panel should scroll its own content;
// vertical swipes should NOT trigger layer navigation.
let panelTouchActive = false;
if (teachingPanel) {
  teachingPanel.addEventListener('touchstart', (e) => {
    panelTouchActive = true;
    e.stopPropagation(); // belt-and-suspenders: prevent canvas from seeing this
  }, { passive: true });
  teachingPanel.addEventListener('touchmove', (e) => {
    e.stopPropagation();
  }, { passive: true });
  teachingPanel.addEventListener('touchend', () => {
    panelTouchActive = false;
  }, { passive: true });
  teachingPanel.addEventListener('touchcancel', () => {
    panelTouchActive = false;
  }, { passive: true });
}

// ─── NEBULA BACKGROUND DATA ───
let nebulaStars;        // distant star-points
let nebulaClouds = [];  // translucent cloud sprites
let shootingStars = []; // occasional meteor streaks
let cosmicDust;         // faint toroidal dust ring
let starTwinklePhases;  // per-star twinkle phase offsets
let starTwinkleSpeeds;  // per-star twinkle rates
let starBaseOpacities;  // per-star base brightness
let radiantStars;       // sparse colored radiant stars (red/blue/yellow-shift)
let radiantPulsePhases; // per-radiant-star pulse phase offsets
let radiantPulseSpeeds; // per-radiant-star pulse rates
let radiantBaseSizes;   // per-radiant-star base sizes for pulsing
let radiantTrails;      // Points object for radiance trails
let radiantTrailData;   // per-trail metadata: which star, history ring buffer
const TRAIL_STARS = 14; // how many radiant stars get trails
const TRAIL_LENGTH = 12; // trail segments per star (head→tail)
let dustParticlePhases; // per-dust-particle animation phase offsets
let dustParticleSpeeds; // per-dust-particle animation rates
let dustBaseOpacities;  // per-dust-particle base brightness (varied)

// ─── OPTIONAL: GYRO BACKGROUND PARALLAX (phones only) ───
// Non-intrusive: affects only the WebGL background elements (stars/nebula/dust),
// never the HTML HUD (key ideas panel, icons, slider).
const gyroBg = {
  supported: false,
  enabled: false,
  started: false,
  // target offsets (radians)
  targetYaw: 0,
  targetPitch: 0,
  // applied offsets (radians)
  yaw: 0,
  pitch: 0,
  // stillness detection (to settle back toward neutral and reduce nausea)
  lastEvtMs: 0,
  lastOriMs: 0,
  lastGamma: 0,
  lastBeta: 0,
  stillMs: 0,
  // filtered raw angles (degrees) to suppress micro-tremor flutter
  filtGamma: 0,
  filtBeta: 0,
  // dead-zone hysteresis state (prevents chatter near threshold)
  deadYaw: true,
  deadPitch: true,
  _stillHint: 0,
  // subtle "gravity" drift (world-units velocity) for depth embodiment
  gravVX: 0,
  gravVY: 0,
  // baseline calibration (neutral holding angle)
  baseGamma: 0,
  baseBeta: 0,
  calibrating: false,
  calibrateMs: 0,
  // user control
  motionOn: true,
  // smoothed stillness reward (prevents step when crossing thresholds)
  stillReward: 1,
  // Bezier-eased camera-follow offsets (world units)
  parX: 0,
  parY: 0,
};

// Cubic-bezier easing helper (x in [0..1] → y in [0..1]).
// We solve for t from x via a few Newton steps; falls back safely.
function _bezierEase01(x, p1x, p1y, p2x, p2y) {
  const clamp01 = (v) => v < 0 ? 0 : v > 1 ? 1 : v;
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
  let t = xx; // good starting guess
  for (let i = 0; i < 5; i++) {
    const dx = sampleX(t) - xx;
    const d = sampleDX(t);
    if (Math.abs(dx) < 1e-5 || Math.abs(d) < 1e-6) break;
    t = clamp01(t - dx / d);
  }
  return clamp01(sampleY(t));
}

function initGyroBackgroundParallax() {
  if (gyroBg.started) return;
  gyroBg.started = true;

  const hasDeviceOrientation = typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;
  if (!hasDeviceOrientation) return;
  gyroBg.supported = true;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const toNorm = (deg, limitDeg) => clamp((Number.isFinite(deg) ? deg : 0) / limitDeg, -1, 1);
  // Make the effect clearly perceptible on real devices (including iOS PWA),
  // while still staying below “UI motion” territory.
  const MAX_YAW = 0.14;    // ~8.0°
  const MAX_PITCH = 0.10;  // ~5.7°

  const onOrientation = (ev) => {
    // gamma: left/right tilt (-90..90), beta: front/back (-180..180)
    // Map to gentle parallax, clamp to avoid discomfort.
    const gamma = ev && typeof ev.gamma === 'number' ? ev.gamma : 0;
    const beta  = ev && typeof ev.beta === 'number' ? ev.beta : 0;
    const nowMs = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    gyroBg.lastEvtMs = nowMs;

    // Track stillness based on sensor deltas (degrees). When deltas are tiny for a while,
    // we slowly return to neutral so the user doesn't feel "stuck off-center".
    const dG = Math.abs(gamma - gyroBg.lastGamma);
    const dB = Math.abs(beta - gyroBg.lastBeta);
    gyroBg.lastGamma = gamma;
    gyroBg.lastBeta = beta;
    const isStill = dG < 0.5 && dB < 0.5; // slightly wider to treat tremor as still
    // We'll accumulate still time in apply() using dt; here we only mark intent.
    gyroBg._stillHint = isStill ? 1 : 0;

    // Natural feel: in portrait, people tilt phone "toward/away" (beta) more than
    // they twist side-to-side (gamma). In landscape the intuition flips.
    const isLandscape = (window.innerWidth > window.innerHeight)
      || (typeof window.orientation === 'number' && Math.abs(window.orientation) === 90);

    // Full-scale tilt thresholds (degrees): lower = more sensitive.
    const yawFull = isLandscape ? 14 : 22;     // portrait: constrain side-to-side
    const pitchFull = isLandscape ? 20 : 12;   // portrait: boost up/down

    // Amplitude multipliers: keep within MAX_* but bias the perceived motion axis.
    // Portrait: damp side-to-side (gamma) further; slightly boost up/down (beta).
    const yawAmp = isLandscape ? 1.0 : 0.42;
    const pitchAmp = isLandscape ? 0.7 : 1.28;

    // Low-pass filter raw angles so tiny hand jitter doesn't constantly retarget.
    // deviceorientation can arrive at 60–120Hz on iPhone; this keeps motion calm.
    const a = 0.045; // smaller = smoother / less flutter (more damping)
    gyroBg.filtGamma += (gamma - gyroBg.filtGamma) * a;
    gyroBg.filtBeta  += (beta  - gyroBg.filtBeta)  * a;

    // Baseline calibration: treat how the user naturally holds the phone as "neutral".
    // We update base slowly during a brief calibration window after Enter / recenter.
    if (gyroBg.calibrating) {
      gyroBg.calibrateMs = Math.min(1200, gyroBg.calibrateMs + 16); // approximate; corrected in apply()
      const k = 0.06;
      gyroBg.baseGamma += (gyroBg.filtGamma - gyroBg.baseGamma) * k;
      gyroBg.baseBeta  += (gyroBg.filtBeta  - gyroBg.baseBeta)  * k;
    }
    const relGamma = gyroBg.filtGamma - gyroBg.baseGamma;
    const relBeta  = gyroBg.filtBeta  - gyroBg.baseBeta;

    const rawYaw = toNorm(relGamma, yawFull) * MAX_YAW * yawAmp;
    const rawPitch = toNorm(relBeta, pitchFull) * MAX_PITCH * pitchAmp;

    // Soft dead-zone: ramp in smoothly so "still → moving" never stutters.
    const DEAD_IN = 0.011;  // radians (no motion)
    const DEAD_OUT = 0.018; // radians (full motion)
    const soft = (v) => {
      const av = Math.abs(v);
      if (av <= DEAD_IN) return 0;
      const t = Math.max(0, Math.min(1, (av - DEAD_IN) / (DEAD_OUT - DEAD_IN)));
      // smoothstep
      const s = t * t * (3 - 2 * t);
      return Math.sign(v) * av * s;
    };
    const desiredYaw = soft(rawYaw);
    const desiredPitch = soft(rawPitch);

    // Slew-rate limiter: iOS deviceorientation can arrive in uneven bursts, producing
    // perceptible "jerks" even with filters. Cap target change per second.
    const last = Number.isFinite(gyroBg.lastOriMs) && gyroBg.lastOriMs > 0 ? gyroBg.lastOriMs : nowMs;
    gyroBg.lastOriMs = nowMs;
    const dts = Math.max(1 / 120, Math.min(0.06, (nowMs - last) / 1000));
    const maxYawRate = 0.55;   // rad/s
    const maxPitchRate = 0.45; // rad/s
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const dy = clamp(desiredYaw - gyroBg.targetYaw, -maxYawRate * dts, maxYawRate * dts);
    const dp = clamp(desiredPitch - gyroBg.targetPitch, -maxPitchRate * dts, maxPitchRate * dts);
    gyroBg.targetYaw += dy;
    gyroBg.targetPitch += dp;
  };

  const start = () => {
    if (gyroBg.enabled) return;
    try {
      window.addEventListener('deviceorientation', onOrientation, { passive: true });
      gyroBg.enabled = true;
    } catch (_) { /* ignore */ }
  };

  // iOS Safari requires explicit permission from a user gesture.
  try {
    const DOE = window.DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === 'function') {
      DOE.requestPermission().then((res) => {
        if (res === 'granted') start();
      }).catch(() => { /* ignore */ });
    } else {
      start();
    }
  } catch (_) { /* ignore */ }
}

function applyGyroBackgroundParallax(dt, breath = 0, layerIndex = 0) {
  if (!gyroBg.enabled || !gyroBg.motionOn) return;
  if (!(nebulaStars || cosmicDust || radiantStars || (nebulaClouds && nebulaClouds.length))) return;

  // Defensive: if dt is weird, clamp to something sane so smoothing can't explode.
  if (!Number.isFinite(dt) || dt <= 0) dt = 1 / 60;
  if (dt > 0.2) dt = 0.2;

  // If the phone stops moving (or events pause), gently settle toward neutral.
  // This reduces seasick feeling from persistent tilt offsets.
  const stillHint = gyroBg._stillHint ? 1 : 0;
  // Never hard-reset stillness: decay smoothly so "still → moving" has no step.
  if (stillHint) {
    gyroBg.stillMs = Math.min(20000, gyroBg.stillMs + dt * 1000);
  } else {
    const decayTau = 0.75; // seconds — how quickly stillness relaxes when movement resumes
    const k = Math.exp(-dt / decayTau);
    gyroBg.stillMs *= k;
    if (gyroBg.stillMs < 1) gyroBg.stillMs = 0;
  }
  const nowMs = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const sinceEvt = gyroBg.lastEvtMs ? (nowMs - gyroBg.lastEvtMs) : 0;
  const shouldSettle = gyroBg.stillMs > 260 || sinceEvt > 450;
  if (shouldSettle) {
    // Exponential decay toward 0 over ~1–1.5s (depends on dt).
    const settle = Math.pow(0.06, dt); // smaller base => faster settle
    gyroBg.targetYaw *= settle;
    gyroBg.targetPitch *= settle;
    if (Math.abs(gyroBg.targetYaw) < 1e-4) gyroBg.targetYaw = 0;
    if (Math.abs(gyroBg.targetPitch) < 1e-4) gyroBg.targetPitch = 0;
  }

  // Stillness reward: after sustained stillness, slightly reduce depth amplitude.
  // Smoothed to avoid any perceptible step when crossing the threshold.
  const stillTarget = gyroBg.stillMs > 1200
    ? Math.max(0.78, 1 - (gyroBg.stillMs - 1200) / 8000)  // approaches ~0.78
    : 1.0;
  const stillEase = 1 - Math.exp(-dt / 0.35); // ~350ms time constant
  gyroBg.stillReward += (stillTarget - gyroBg.stillReward) * stillEase;
  const stillReward = gyroBg.stillReward;

  // Complete calibration timing using real dt (replaces approx increment above).
  if (gyroBg.calibrating) {
    gyroBg.calibrateMs = Math.min(1200, gyroBg.calibrateMs + dt * 1000);
    if (gyroBg.calibrateMs >= 900) gyroBg.calibrating = false;
  }

  // Smooth with a real time-constant so transitions never “jump” (iOS sensors can
  // update in bursts; dead-zone exits can step the target).
  // tau ≈ 0.22s feels floaty but responsive; higher = smoother.
  const tau = 0.32;
  const ease = 1 - Math.exp(-Math.max(0, dt) / tau);
  gyroBg.yaw += (gyroBg.targetYaw - gyroBg.yaw) * ease;
  gyroBg.pitch += (gyroBg.targetPitch - gyroBg.pitch) * ease;

  // NaN / runaway guard: if any browser feeds invalid sensor data, reset safely.
  if (!Number.isFinite(gyroBg.yaw) || !Number.isFinite(gyroBg.pitch)) {
    gyroBg.yaw = 0;
    gyroBg.pitch = 0;
    gyroBg.targetYaw = 0;
    gyroBg.targetPitch = 0;
    gyroBg.deadYaw = true;
    gyroBg.deadPitch = true;
    gyroBg.gravVX = 0;
    gyroBg.gravVY = 0;
    gyroBg.parX = 0;
    gyroBg.parY = 0;
  }

  // Depth parallax: translate different background layers by different amounts.
  // This yields a “3D field” feel rather than one plane sliding around.
  const yaw = gyroBg.yaw;
  const pitch = gyroBg.pitch;
  // Vignette: gently increases with tilt magnitude (reduces motion discomfort).
  try {
    if (gyroVignette && gyroVignette.style) {
      const mag = Math.min(1, Math.hypot(yaw, pitch) / 0.11);
      const v = 0.06 + mag * 0.22; // ~0.06—0.28
      gyroVignette.style.opacity = String(v.toFixed(3));
    }
  } catch (_) {}
  // Breath coherence: inhale slightly deepens parallax; exhale softens.
  const b = Number.isFinite(breath) ? Math.max(0, Math.min(1, breath)) : 0;
  const breathDepth = 0.92 + b * 0.16; // ~0.92—1.08

  // Layer-aware depth: outer layers can tolerate a touch more parallax; inner layers less.
  const li = Number.isFinite(layerIndex) ? layerIndex : 0;
  const depthNorm = Math.max(0, Math.min(1, li / Math.max(1, LAYER_COUNT - 1)));
  const layerDepth = 1.10 - depthNorm * 0.18; // outer ~1.10, inner ~0.92

  const depthMul = breathDepth * layerDepth * stillReward;

  // Balance: keep overall motion subtle but increase perceived depth separation.
  let px = yaw * 460 * depthMul;      // overall horizontal parallax scalar (world units)
  let py = -pitch * 720 * depthMul;   // overall vertical parallax scalar (world units)

  // Subtle "gravity": the greater the tilt, the more the background drifts
  // in the direction of that tilt, with damping. This creates a natural 3D pull
  // without affecting HUD or inducing nausea.
  // Drive gravity from smoothed target (avoids tiny raw sensor jitter leaking in).
  const gNormX = Math.max(-1, Math.min(1, gyroBg.targetYaw / 0.10));
  const gNormY = Math.max(-1, Math.min(1, gyroBg.targetPitch / 0.10));
  // Dampen gravity drift: barely-there bias, mostly felt at larger tilts.
  const accelX = gNormX * 10;   // world units / s^2 (subtle)
  const accelY = -gNormY * 12;  // invert so "tilt up" drifts upward
  const damp = Math.exp(-dt / 0.65); // faster damping (less lingering drift)
  gyroBg.gravVX = gyroBg.gravVX * damp + accelX * dt;
  gyroBg.gravVY = gyroBg.gravVY * damp + accelY * dt;
  const maxV = 8;
  gyroBg.gravVX = Math.max(-maxV, Math.min(maxV, gyroBg.gravVX));
  gyroBg.gravVY = Math.max(-maxV, Math.min(maxV, gyroBg.gravVY));

  px += gyroBg.gravVX;
  py += gyroBg.gravVY;

  // Bezier-eased follow: smooth the translation target itself so stars don't "jump"
  // when the phone target changes. Per-axis lag creates natural curved arcs.
  const followTauX = 0.42;
  const followTauY = 0.52;
  const tx = 1 - Math.exp(-dt / followTauX);
  const ty = 1 - Math.exp(-dt / followTauY);
  const ex = _bezierEase01(tx, 0.22, 0.0, 0.36, 1.0);
  const ey = _bezierEase01(ty, 0.22, 0.0, 0.36, 1.0);
  gyroBg.parX += (px - gyroBg.parX) * ex;
  gyroBg.parY += (py - gyroBg.parY) * ey;
  px = gyroBg.parX;
  py = gyroBg.parY;

  // Far layer: star fields (subtle) — smallest movement
  if (nebulaStars) {
    // Far objects move least, especially horizontally.
    nebulaStars.position.x = px * 0.060;
    nebulaStars.position.y = py * 0.090;
    // Slight differential rotation for depth cue (kept conservative).
    nebulaStars.rotation.y += yaw * 0.002;
    nebulaStars.rotation.x += pitch * 0.001;
  }
  if (radiantStars) {
    radiantStars.position.x = px * 0.075;
    radiantStars.position.y = py * 0.115;
    radiantStars.rotation.y += yaw * 0.002;
    radiantStars.rotation.x += pitch * 0.001;
  }
  // Mid layer: dust (more noticeable)
  if (cosmicDust) {
    cosmicDust.position.x = px * 0.14;
    cosmicDust.position.y = py * 0.22;
    cosmicDust.rotation.y += yaw * 0.003;
    cosmicDust.rotation.x += pitch * 0.002;
  }
  // Near layer: cloud sprites (most noticeable; reversible via base position)
  if (nebulaClouds && nebulaClouds.length) {
    for (let i = 0; i < nebulaClouds.length; i++) {
      const s = nebulaClouds[i];
      if (!s || !s.position || !s.userData) continue;
      const bx = Number.isFinite(s.userData.baseX) ? s.userData.baseX : s.position.x;
      const by = Number.isFinite(s.userData.baseY) ? s.userData.baseY : s.position.y;
      const bz = Number.isFinite(s.userData.baseZ) ? s.userData.baseZ : s.position.z;
      // Individual depth weighting based on sprite size (bigger = "closer").
      const size = Number.isFinite(s.userData.baseSize) ? s.userData.baseSize : s.scale.x;
      const w = Math.max(0.7, Math.min(1.8, size / 55)); // normalize around typical sizes
      // Near layer moves most; apply extra "water-like" easing so phone turns
      // feel flowing rather than angular, especially on iOS sensor bursts.
      const tx = bx + px * 0.33 * w;
      const ty = by + py * 0.52 * w;
      const tz = bz + (yaw * 28 - pitch * 18) * 0.035 * w;

      if (!Number.isFinite(s.userData.gyroX)) s.userData.gyroX = s.position.x;
      if (!Number.isFinite(s.userData.gyroY)) s.userData.gyroY = s.position.y;
      if (!Number.isFinite(s.userData.gyroZ)) s.userData.gyroZ = s.position.z;

      const cloudTau = 0.72; // higher = more liquid / slower response
      const t = 1 - Math.exp(-dt / cloudTau);
      const e = _bezierEase01(t, 0.18, 0.0, 0.30, 1.0);
      s.userData.gyroX += (tx - s.userData.gyroX) * e;
      s.userData.gyroY += (ty - s.userData.gyroY) * e;
      s.userData.gyroZ += (tz - s.userData.gyroZ) * e;

      s.position.x = s.userData.gyroX;
      s.position.y = s.userData.gyroY;
      s.position.z = s.userData.gyroZ;
    }
  }
}

// One-time perturbation of state vectors only — no new semantics, no rewiring.

// ─── INIT THREE.JS ───
let contextLost = false;   // WebGL context-loss flag

function init() {
  if (!canvas) { console.error('Canvas element missing'); return; }

  clock = new THREE.Clock();
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06050a);         // indigo-black
  scene.fog = new THREE.FogExp2(0x06050a, 0.006);       // softer fog

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 600);
  camera.position.set(0, 0, cameraZ);

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',  // prefer discrete GPU when available
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  handleResize();   // initial size — uses actual element dimensions
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 2.0;

  // ─── WebGL CONTEXT LOSS RECOVERY ───
  // Mobile GPUs can reclaim context when backgrounded. Recover silently.
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();  // signal we intend to restore
    contextLost = true;
    console.warn('WebGL context lost — waiting for restore');
  }, false);
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    console.info('WebGL context restored — rebuilding');
    // Three.js r170 auto-restores most state, but we nudge it:
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    handleResize();
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.0;
  }, false);

  // Shared radial glow texture — astronomical point-spread function
  // Bright saturated core with extended halo, like real star optics
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 128;
  glowCanvas.height = 128;
  const glowCtx = glowCanvas.getContext('2d');
  // Layer 1: wide soft halo
  const halo = glowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
  halo.addColorStop(0,    'rgba(255,255,255,0.6)');
  halo.addColorStop(0.25, 'rgba(255,255,255,0.15)');
  halo.addColorStop(0.55, 'rgba(255,255,255,0.04)');
  halo.addColorStop(1,    'rgba(255,255,255,0)');
  glowCtx.fillStyle = halo;
  glowCtx.fillRect(0, 0, 128, 128);
  // Layer 2: intense core burn (additive)
  glowCtx.globalCompositeOperation = 'lighter';
  const core = glowCtx.createRadialGradient(64, 64, 0, 64, 64, 24);
  core.addColorStop(0,   'rgba(255,255,255,1)');
  core.addColorStop(0.3, 'rgba(255,255,255,0.85)');
  core.addColorStop(0.6, 'rgba(255,255,255,0.3)');
  core.addColorStop(1,   'rgba(255,255,255,0)');
  glowCtx.fillStyle = core;
  glowCtx.fillRect(0, 0, 128, 128);
  glowCtx.globalCompositeOperation = 'source-over';
  starGlowTexture = new THREE.CanvasTexture(glowCanvas);

  // Lighting — warm core + nebula accent lights
  const ambient = new THREE.AmbientLight(0x1a1528, 0.6);
  scene.add(ambient);

  const coreLight = new THREE.PointLight(0xffeedd, 3.5, 250);
  coreLight.position.set(0, 0, 0);
  scene.add(coreLight);

  // Nebula accent lights — coloured fills that illuminate the gas
  const roseLight = new THREE.PointLight(0xc7889a, 0.6, 300);
  roseLight.position.set(-40, 25, 40);
  scene.add(roseLight);

  const lavenderLight = new THREE.PointLight(0x9b8ab8, 0.5, 300);
  lavenderLight.position.set(35, -20, 60);
  scene.add(lavenderLight);

  const blueLight = new THREE.PointLight(0x7eb4d4, 0.5, 300);
  blueLight.position.set(0, 30, -30);
  scene.add(blueLight);

  const backLight = new THREE.PointLight(0x4a3f32, 1.0, 350);
  backLight.position.set(0, 30, -50);
  scene.add(backLight);

  try { buildLayers(); } catch (e) { console.error('buildLayers failed:', e); }
  try { buildNebulaBackground(); } catch (e) { console.error('buildNebulaBackground failed:', e); }
  try { buildNavDots(); } catch (e) { console.error('buildNavDots failed:', e); }
  try {
    applyInitialConditions({
      camera,
      orbitalGroups,
      particleSystems,
      nebulaStars,
      starTwinklePhases,
      starBaseOpacities,
      cosmicDust,
      nebulaClouds,
      initialConditions: INITIAL_CONDITIONS,
    });
  } catch (e) { console.warn('applyInitialConditions:', e); }
  animate();
}

// ─── DYNAMICS: BUILD LAYERS (geometry from ontology + Three.js) ───
// Per-layer tilt seeds (6-DOF depth cue 1: each layer tilts uniquely so rings
// read as true 3D ellipses, not flat circles) — tilts live in ontology.js

// Depth glow halos — one per layer (6-DOF depth cue 5)
let layerHalos = [];

function buildLayers() {
  LAYERS.forEach((layer, i) => {
    const zPos = (LAYER_COUNT - 1 - i) * LAYER_SPACING;
    const group = new THREE.Group();
    group.position.z = zPos;
    group.userData = {
      baseZ: zPos,
      index: i,
      baseTilt: LAYER_TILTS[i] || { x: 0, y: 0, z: 0 },
      baseEmissive: layer.emissive.clone(),   // for depth-dependent lighting
      baseColor: layer.color.clone(),
    };

    // Apply base group tilt (depth cue 1)
    const tilt = LAYER_TILTS[i] || { x: 0, y: 0, z: 0 };
    group.rotation.set(tilt.x, tilt.y, tilt.z);

    // Orbital ring — torus
    const torusR = layer.radius;
    const tubeR = 0.08 + i * 0.02;
    const torusGeo = new THREE.TorusGeometry(torusR, tubeR, 32, 128);
    const torusMat = new THREE.MeshStandardMaterial({
      color: layer.color,
      emissive: layer.emissive,
      emissiveIntensity: 0.55,
      metalness: 0.7,
      roughness: 0.3,
      transparent: true,
      opacity: 0.8,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 2;
    group.add(torus);

    // Second tilted orbital ring
    const torus2Geo = new THREE.TorusGeometry(torusR * 0.95, tubeR * 0.7, 24, 96);
    const torus2 = new THREE.Mesh(torus2Geo, torusMat.clone());
    torus2.material.opacity = 0.4;
    torus2.rotation.x = Math.PI / 2 + 0.6;
    torus2.rotation.y = 0.4;
    group.add(torus2);

    // Third orbital (perpendicular)
    const torus3Geo = new THREE.TorusGeometry(torusR * 0.88, tubeR * 0.5, 20, 80);
    const torus3 = new THREE.Mesh(torus3Geo, torusMat.clone());
    torus3.material.opacity = 0.25;
    torus3.rotation.x = 0.3;
    torus3.rotation.z = Math.PI / 2 + 0.2;
    group.add(torus3);

    // Sacred geometry wireframe at center — glowing signature of each layer
    const wireGeo = createSacredGeometry(layer.geometry, layer.n, torusR * 0.6);
    if (wireGeo) {
      const wireMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(layer.emissive).lerp(new THREE.Color(0xffffff), 0.3),
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      wire.userData.baseOpacity = 0.6;
      group.add(wire);
    }

    // Particle cloud (electron cloud)
    const particles = createParticleCloud(layer, torusR);
    group.add(particles);
    particleSystems.push(particles);

    // ── Depth glow halo (cue 5): soft additive disc under each ring ──
    const haloSize = torusR * 1.6;
    const haloSpriteMat = new THREE.SpriteMaterial({
      map: starGlowTexture,
      color: layer.emissive,
      transparent: true,
      opacity: 0.0,   // set dynamically based on proximity
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const haloSprite = new THREE.Sprite(haloSpriteMat);
    haloSprite.scale.set(haloSize, haloSize, 1);
    haloSprite.position.z = -0.5;  // slightly behind the ring
    group.add(haloSprite);
    layerHalos.push(haloSprite);

    scene.add(group);
    orbitalGroups.push(group);
  });

  // Core glow — layered: inner hot white + outer warm halo
  const coreGeo = new THREE.SphereGeometry(3.5, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xfff0dd,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  coreGlow = new THREE.Mesh(coreGeo, coreMat);
  coreGlow.position.z = 0;
  scene.add(coreGlow);

  // Outer halo — larger, softer
  const haloGeo = new THREE.SphereGeometry(7, 32, 32);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xd4a574,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const coreHalo = new THREE.Mesh(haloGeo, haloMat);
  coreHalo.position.z = 0;
  scene.add(coreHalo);
  coreGlow.userData.halo = coreHalo;

  // Connecting spiral paths
  buildSpirals();
}

// ─── NEBULA BACKGROUND — Astronomically-inspired Star Field + Nebula Gas ───
function buildNebulaBackground() {
  // 1. Star field — concentrated toward center, sparser at edges
  //    Like a real stellar nursery: density ∝ 1/r² from core
  const starCount = 2400;
  const starPositions = new Float32Array(starCount * 3);
  const starColors    = new Float32Array(starCount * 3);
  const starSizes     = new Float32Array(starCount);

  // Spectral palette — weighted toward hot blue-white (O/B stars near center)
  const starPalette = [
    new THREE.Color(0x9dc8ff), // O-type blue-white
    new THREE.Color(0xaabfff), // B-type blue
    new THREE.Color(0xfff4e8), // A-type white
    new THREE.Color(0xffeedd), // F-type yellow-white
    new THREE.Color(0xffd2a1), // G-type gold
    new THREE.Color(0xffb07a), // K-type orange
    new THREE.Color(0xff8866), // late K-type deep orange
    new THREE.Color(0xe86840), // M-type red dwarf
    new THREE.Color(0xcc5533), // cool M-type ruddy
    new THREE.Color(0xb84422), // late M-type deep red-brown
    new THREE.Color(0xd45a30), // carbon star amber-red
    new THREE.Color(0xf0d9b5), // warm white
    new THREE.Color(0xffffff), // pure white (overexposed)
    new THREE.Color(0xc8e0f0), // cool blue-white (rare B-type)
    new THREE.Color(0xd0f0e8), // mint-white (reflection nebula tint)
  ];

  const maxField = LAYER_COUNT * LAYER_SPACING + 90;

  for (let i = 0; i < starCount; i++) {
    const angle  = Math.random() * TAU;
    // Inverse-square distribution: more stars near center, fewer at edges
    const u = Math.random();
    const radius = 8 + Math.pow(u, 0.55) * 165;  // bunches ~40% within r<60
    const z = (Math.random() - 0.3) * maxField;

    starPositions[i * 3]     = Math.cos(angle) * radius;
    starPositions[i * 3 + 1] = Math.sin(angle) * radius;
    starPositions[i * 3 + 2] = z;

    // Stars near center are hotter (bluer, brighter); edges are cooler
    const distNorm = Math.min(1, radius / 160);  // 0=center, 1=edge
    const roll = Math.random();

    // Ruddy palette indices: 6-10 are the M-type / carbon star entries
    // Dim tiers bias toward ruddy colors (astrophysically: M-dwarfs dominate
    // the faint end of the luminosity function)
    const ruddyStart = 6; // index of first ruddy entry
    const ruddyEnd = 11;  // index past last ruddy entry
    let col;

    // Luminosity tiers — center-biased brightness
    const centerBoost = 1.0 + (1.0 - distNorm) * 1.5;  // up to 2.5× at center
    let brightness, size;
    if (roll < 0.03) {
      // Supergiant stars (3%) — blazing beacons, any colour
      col = starPalette[Math.floor(Math.random() * starPalette.length)];
      brightness = (3.5 + Math.random() * 2.0) * centerBoost;
      size = 2.5 + Math.random() * 2.5;
    } else if (roll < 0.12) {
      // Bright giants (9%) — warm to hot colours
      col = starPalette[Math.floor(Math.random() * starPalette.length)];
      brightness = (2.0 + Math.random() * 1.5) * centerBoost;
      size = 1.2 + Math.random() * 1.5;
    } else if (roll < 0.35) {
      // Main sequence bright (23%) — full palette
      col = starPalette[Math.floor(Math.random() * starPalette.length)];
      brightness = (1.2 + Math.random() * 1.0) * centerBoost;
      size = 0.5 + Math.random() * 0.8;
    } else if (roll < 0.65) {
      // Main sequence dim (30%) — 40% chance ruddy
      col = Math.random() < 0.4
        ? starPalette[ruddyStart + Math.floor(Math.random() * (ruddyEnd - ruddyStart))]
        : starPalette[Math.floor(Math.random() * starPalette.length)];
      brightness = (0.6 + Math.random() * 0.6) * centerBoost * 0.7;
      size = 0.2 + Math.random() * 0.5;
    } else {
      // Red/brown dwarfs (35%) — 70% ruddy
      col = Math.random() < 0.7
        ? starPalette[ruddyStart + Math.floor(Math.random() * (ruddyEnd - ruddyStart))]
        : starPalette[Math.floor(Math.random() * starPalette.length)];
      brightness = (0.3 + Math.random() * 0.5) * centerBoost * 0.5;
      size = 0.1 + Math.random() * 0.3;
    }

    // Clamp color channels — additive blending will push past 1.0 visually
    starColors[i * 3]     = Math.min(1.0, col.r * brightness);
    starColors[i * 3 + 1] = Math.min(1.0, col.g * brightness);
    starColors[i * 3 + 2] = Math.min(1.0, col.b * brightness);
    starSizes[i] = size;
  }

  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color',    new THREE.Float32BufferAttribute(starColors, 3));
  starGeo.setAttribute('size',     new THREE.Float32BufferAttribute(starSizes, 1));

  // Per-star twinkle data — atmospheric scintillation
  starTwinklePhases  = new Float32Array(starCount);
  starTwinkleSpeeds  = new Float32Array(starCount);
  starBaseOpacities  = new Float32Array(starCount);
  for (let i = 0; i < starCount; i++) {
    starTwinklePhases[i] = Math.random() * TAU;
    starTwinkleSpeeds[i] = 0.3 + Math.random() * 1.5;
    starBaseOpacities[i] = starSizes[i];
  }

  const starMat = new THREE.PointsMaterial({
    size: 1.5,
    map: starGlowTexture,
    vertexColors: true,
    transparent: true,
    opacity: 1.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  nebulaStars = new THREE.Points(starGeo, starMat);
  scene.add(nebulaStars);

  // 2. Nebula gas — dense luminous clouds, bright core fading to dark edges
  //    Like Hubble imagery: layered emission nebula with H-II regions
  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = 256;
  cloudCanvas.height = 256;
  const ctx = cloudCanvas.getContext('2d');
  const cGrad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  cGrad.addColorStop(0,    'rgba(255,255,255,1)');
  cGrad.addColorStop(0.15, 'rgba(255,255,255,0.7)');
  cGrad.addColorStop(0.4,  'rgba(255,255,255,0.25)');
  cGrad.addColorStop(0.7,  'rgba(255,255,255,0.06)');
  cGrad.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = cGrad;
  ctx.fillRect(0, 0, 256, 256);
  const cloudTexture = new THREE.CanvasTexture(cloudCanvas);

  // Inner nebula: bright, dense, warm-toned (H-II emission) + cool hints
  const innerClouds = [
    { color: 0xffccaa, opacity: 0.09 },   // warm emission glow
    { color: 0xeebb99, opacity: 0.07 },   // amber gas
    { color: 0xddaa88, opacity: 0.06 },   // dusty gold
    { color: 0xccbbdd, opacity: 0.05 },   // reflection nebula blue-violet
    { color: 0xffddcc, opacity: 0.08 },   // hot hydrogen pink-white
    { color: 0x9ec8e8, opacity: 0.035 },  // light blue reflection nebula
    { color: 0xa8e0cc, opacity: 0.03 },   // soft mint — ionised oxygen glow
  ];
  // Mid-field: subtler, more colour variety
  const midClouds = [
    { color: 0xc7889a, opacity: 0.045 },  // dusty rose
    { color: 0x9b8ab8, opacity: 0.035 },  // lavender
    { color: 0x7eb4d4, opacity: 0.03 },   // blue mist
    { color: 0xd4a574, opacity: 0.025 },  // warm gold haze
    { color: 0x8b5e3c, opacity: 0.03 },   // amber dust
    { color: 0x88c8e0, opacity: 0.025 },  // cool blue haze
    { color: 0x90d8c4, opacity: 0.02 },   // minty green wisp
  ];
  // Outer: dark absorption nebula wisps + faint cool tones
  const outerClouds = [
    { color: 0x3e2a55, opacity: 0.04 },   // deep indigo
    { color: 0x2a1f3a, opacity: 0.03 },   // near-black violet
    { color: 0x4a3528, opacity: 0.025 },  // dark brown dust
    { color: 0x2a4555, opacity: 0.02 },   // dark teal wisp
  ];

  // Place clouds in 3 radial zones
  const placeCloud = (pick, minR, maxR, minSize, maxSize) => {
    const spriteMat = new THREE.SpriteMaterial({
      map: cloudTexture,
      color: pick.color,
      transparent: true,
      opacity: pick.opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(spriteMat);
    const a = Math.random() * TAU;
    const r = minR + Math.random() * (maxR - minR);
    const z = (Math.random() - 0.25) * maxField * 0.8;
    sprite.position.set(Math.cos(a) * r, Math.sin(a) * r, z);
    const sz = minSize + Math.random() * (maxSize - minSize);
    sprite.scale.set(sz, sz, 1);
    sprite.userData.driftSpeed = 0.003 + Math.random() * 0.008;
    sprite.userData.driftAngle = Math.random() * TAU;
    sprite.userData.baseOpacity = pick.opacity;
    // Cache baseline position for gyro parallax (so offsets are reversible).
    sprite.userData.baseX = sprite.position.x;
    sprite.userData.baseY = sprite.position.y;
    sprite.userData.baseZ = sprite.position.z;
    sprite.userData.baseSize = sz;
    scene.add(sprite);
    nebulaClouds.push(sprite);
  };

  // Inner zone (r 0–40): dense, bright, 14 clouds
  for (let i = 0; i < 14; i++) {
    const pick = innerClouds[Math.floor(Math.random() * innerClouds.length)];
    placeCloud(pick, 5, 40, 25, 65);
  }
  // Mid zone (r 30–90): 12 clouds
  for (let i = 0; i < 12; i++) {
    const pick = midClouds[Math.floor(Math.random() * midClouds.length)];
    placeCloud(pick, 30, 90, 35, 80);
  }
  // Outer zone (r 70–150): sparse dark wisps, 10 clouds
  for (let i = 0; i < 10; i++) {
    const pick = outerClouds[Math.floor(Math.random() * outerClouds.length)];
    placeCloud(pick, 70, 150, 40, 100);
  }

  // 3. Shooting stars — small pool of reusable meteor streaks
  try {
    const SHOOTING_STAR_POOL = 4;
    for (let i = 0; i < SHOOTING_STAR_POOL; i++) {
      const trailGeo = new THREE.BufferGeometry();
      const trailPositions = new Float32Array(6); // 2 vertices × 3
      trailGeo.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3));
      const trailMat = new THREE.LineBasicMaterial({
        color: 0xf0d9b5,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const trail = new THREE.Line(trailGeo, trailMat);
      trail.frustumCulled = false;
      trail.userData = {
        active: false,
        life: 0,
        maxLife: 0,
        startPos: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        tailLength: 0,
      };
      scene.add(trail);
      shootingStars.push(trail);
    }
  } catch (e) { console.warn('Shooting stars init skipped:', e.message); }

  // 4. Cosmic dust ring — luminous toroidal particle band at the midpoint
  //    Now with per-particle brightness variation: glowing hotspots and dim wisps
  try {
    const dustCount = 800; // slightly more for richer texture
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors    = new Float32Array(dustCount * 3);
    const dustSizes     = new Float32Array(dustCount);
    const midZ = (LAYER_COUNT - 1) * LAYER_SPACING * 0.5;
    const dustPalette = [
      new THREE.Color(0x3e2a55),  // deep indigo
      new THREE.Color(0x2a1f3d),  // dark violet
      new THREE.Color(0x4a3552),  // muted purple
      new THREE.Color(0x5c4a3a),  // warm brown
      new THREE.Color(0x6a4a6e),  // rose-violet (luminous accent)
      new THREE.Color(0x8a6a40),  // warm amber glow
      new THREE.Color(0x2a4a60),  // cool blue dust
      new THREE.Color(0x2a5a4a),  // dark mint dust
    ];

    // Per-particle animation data
    dustParticlePhases = new Float32Array(dustCount);
    dustParticleSpeeds = new Float32Array(dustCount);
    dustBaseOpacities  = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      const theta = Math.random() * TAU;
      const phi = (Math.random() - 0.5) * 0.8; // flatten to disc
      const r = 20 + Math.random() * 70;
      dustPositions[i * 3]     = Math.cos(theta) * r;
      dustPositions[i * 3 + 1] = Math.sin(phi) * r * 0.15;
      dustPositions[i * 3 + 2] = midZ + Math.sin(theta) * r * 0.3;

      const c = dustPalette[Math.floor(Math.random() * dustPalette.length)];

      // Per-particle luminosity: ~15% are luminous hotspots, ~25% are dim wisps
      const lumRoll = Math.random();
      let b;
      if (lumRoll < 0.15) {
        // Luminous hotspot — glowing knot in the dust
        b = 0.8 + Math.random() * 0.6;
        dustSizes[i] = 0.35 + Math.random() * 0.25; // slightly larger
      } else if (lumRoll < 0.40) {
        // Dim wisp — barely there
        b = 0.12 + Math.random() * 0.18;
        dustSizes[i] = 0.12 + Math.random() * 0.15;
      } else {
        // Normal dust
        b = 0.3 + Math.random() * 0.5;
        dustSizes[i] = 0.18 + Math.random() * 0.15;
      }

      dustColors[i * 3]     = c.r * b;
      dustColors[i * 3 + 1] = c.g * b;
      dustColors[i * 3 + 2] = c.b * b;

      // Per-particle animation phase — slow, desynchronised breathing
      dustParticlePhases[i] = Math.random() * TAU;
      dustParticleSpeeds[i] = 0.08 + Math.random() * 0.25; // very slow
      dustBaseOpacities[i]  = dustSizes[i]; // tie base opacity to size
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute('color',    new THREE.Float32BufferAttribute(dustColors, 3));
    dustGeo.setAttribute('size',     new THREE.Float32BufferAttribute(dustSizes, 1));
    const dustMat = new THREE.PointsMaterial({
      size: 0.3,
      map: starGlowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    cosmicDust = new THREE.Points(dustGeo, dustMat);
    scene.add(cosmicDust);
  } catch (e) { console.warn('Cosmic dust init skipped:', e.message); }

  // 5. Radiant stars — sparse, distinctly coloured gems: red-shift, blue-shift, yellow
  //    Think quasars and variable stars scattered across the field — rare, vivid accents
  try {
    const radiantCount = 36; // sparse — about 1.5% of the main star count
    const radiantPositions = new Float32Array(radiantCount * 3);
    const radiantColors    = new Float32Array(radiantCount * 3);
    const radiantSizes     = new Float32Array(radiantCount);

    // Three spectral families, physically motivated:
    // Red-shift: receding objects / cool giants (Hα emission)
    // Blue-shift: approaching / hot young stars (O/B emission)
    // Yellow radiant: solar-type supergiants (Cepheids)
    const radiantPalette = [
      // Red-shift stars (12) — deep cherry to warm crimson
      { r: 1.0,  g: 0.22, b: 0.15 },  // hot red
      { r: 0.95, g: 0.30, b: 0.20 },  // warm red
      { r: 0.85, g: 0.18, b: 0.25 },  // crimson
      { r: 1.0,  g: 0.35, b: 0.18 },  // red-orange
      // Blue-shift stars (12) — sapphire to electric cyan to icy mint
      { r: 0.20, g: 0.45, b: 1.0  },  // deep blue
      { r: 0.55, g: 0.80, b: 1.0  },  // light icy blue
      { r: 0.15, g: 0.60, b: 1.0  },  // blue-cyan
      { r: 0.40, g: 0.90, b: 0.75 },  // soft mint-cyan
      // Yellow radiant stars (12) — amber to brilliant gold
      { r: 1.0,  g: 0.85, b: 0.20 },  // rich gold
      { r: 1.0,  g: 0.78, b: 0.15 },  // deep amber
      { r: 0.95, g: 0.90, b: 0.35 },  // warm yellow
      { r: 1.0,  g: 0.70, b: 0.10 },  // intense amber
    ];

    radiantPulsePhases = new Float32Array(radiantCount);
    radiantPulseSpeeds = new Float32Array(radiantCount);
    radiantBaseSizes   = new Float32Array(radiantCount);

    for (let i = 0; i < radiantCount; i++) {
      const angle = Math.random() * TAU;
      const u = Math.random();
      const radius = 12 + Math.pow(u, 0.6) * 150;
      const z = (Math.random() - 0.3) * maxField;

      radiantPositions[i * 3]     = Math.cos(angle) * radius;
      radiantPositions[i * 3 + 1] = Math.sin(angle) * radius;
      radiantPositions[i * 3 + 2] = z;

      // Cycle through the palette: 0-11 red, 12-23 blue, 24-35 yellow
      const palIdx = i % radiantPalette.length;
      const col = radiantPalette[palIdx];
      const brightness = 1.5 + Math.random() * 1.5; // vivid
      radiantColors[i * 3]     = Math.min(1.0, col.r * brightness);
      radiantColors[i * 3 + 1] = Math.min(1.0, col.g * brightness);
      radiantColors[i * 3 + 2] = Math.min(1.0, col.b * brightness);

      const baseSize = 2.5 + Math.random() * 3.0; // larger than typical stars
      radiantSizes[i] = baseSize;
      radiantBaseSizes[i] = baseSize;

      // Slow pulsing — Cepheid-like variability
      radiantPulsePhases[i] = Math.random() * TAU;
      radiantPulseSpeeds[i] = 0.15 + Math.random() * 0.5; // slow, dreamy
    }

    const radiantGeo = new THREE.BufferGeometry();
    radiantGeo.setAttribute('position', new THREE.Float32BufferAttribute(radiantPositions, 3));
    radiantGeo.setAttribute('color',    new THREE.Float32BufferAttribute(radiantColors, 3));
    radiantGeo.setAttribute('size',     new THREE.Float32BufferAttribute(radiantSizes, 1));

    const radiantMat = new THREE.PointsMaterial({
      size: 3.5,
      map: starGlowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    radiantStars = new THREE.Points(radiantGeo, radiantMat);
    scene.add(radiantStars);

    // 5b. Radiance trails — illuminated dust wake behind selected radiant stars
    //     Each trail is TRAIL_LENGTH points fading from star to nothing,
    //     as if the star's light ionises dust along its path through the ISM.
    const totalTrailPts = TRAIL_STARS * TRAIL_LENGTH;
    const trailPositions = new Float32Array(totalTrailPts * 3);
    const trailColors    = new Float32Array(totalTrailPts * 3);
    const trailSizes     = new Float32Array(totalTrailPts);

    // Pick which radiant stars get trails (spread across colour families)
    // 5 red, 5 blue, 4 yellow — ensures visual variety
    const trailStarIndices = [];
    for (let family = 0; family < 3; family++) {
      const familyStart = family * 12; // 12 per colour family
      const count = family < 2 ? 5 : 4;
      const picked = new Set();
      while (picked.size < count) {
        picked.add(familyStart + Math.floor(Math.random() * 12));
      }
      picked.forEach(idx => trailStarIndices.push(idx));
    }

    radiantTrailData = [];
    for (let t = 0; t < TRAIL_STARS; t++) {
      const starIdx = trailStarIndices[t];
      // Get the star's colour (already stored in radiantColors)
      const cr = radiantColors[starIdx * 3];
      const cg = radiantColors[starIdx * 3 + 1];
      const cb = radiantColors[starIdx * 3 + 2];
      // Get the star's initial position
      const sx = radiantPositions[starIdx * 3];
      const sy = radiantPositions[starIdx * 3 + 1];
      const sz = radiantPositions[starIdx * 3 + 2];

      // Each trail particle: opacity fades from head (j=0) to tail (j=TRAIL_LENGTH-1)
      const baseOffset = t * TRAIL_LENGTH;
      for (let j = 0; j < TRAIL_LENGTH; j++) {
        const fadeT = j / (TRAIL_LENGTH - 1); // 0 at head, 1 at tail
        const alpha = 1.0 - fadeT;  // linear fade
        const idx3 = (baseOffset + j) * 3;

        // Initialise all trail points at the star's position
        trailPositions[idx3]     = sx;
        trailPositions[idx3 + 1] = sy;
        trailPositions[idx3 + 2] = sz;

        // Colour: same hue as star but dimmer toward tail
        // Multiply by alpha² for a nice luminance falloff (inverse-square feel)
        const lum = alpha * alpha;
        trailColors[idx3]     = Math.min(1.0, cr * lum);
        trailColors[idx3 + 1] = Math.min(1.0, cg * lum);
        trailColors[idx3 + 2] = Math.min(1.0, cb * lum);

        // Size: larger near star, shrinks to nothing
        trailSizes[baseOffset + j] = (1.8 + Math.random() * 0.6) * alpha;
      }

      // Store trail metadata for animation
      radiantTrailData.push({
        starIdx,
        baseOffset,
        // Ring buffer of past world positions (newest at index 0)
        history: Array.from({ length: TRAIL_LENGTH }, () => ({
          x: sx, y: sy, z: sz
        })),
        // Sample interval counter — don't record every frame, space them out
        sampleAccum: 0,
      });
    }

    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3));
    trailGeo.setAttribute('color',    new THREE.Float32BufferAttribute(trailColors, 3));
    trailGeo.setAttribute('size',     new THREE.Float32BufferAttribute(trailSizes, 1));

    const trailMat = new THREE.PointsMaterial({
      size: 1.8,
      map: starGlowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.18,       // very transparent — illuminated dust, not a comet
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    radiantTrails = new THREE.Points(trailGeo, trailMat);
    scene.add(radiantTrails);

  } catch (e) { console.warn('Radiant stars init skipped:', e.message); }
}

// ─── SACRED GEOMETRY GENERATORS ───
function createSacredGeometry(type, n, radius) {
  const vertices = [];

  if (type === 'seed') {
    // Seed of Life: 7 overlapping circles approximated as line segments
    const r = radius * 0.5;
    for (let c = 0; c < 7; c++) {
      const cx = c === 0 ? 0 : Math.cos(TAU / 6 * c) * r;
      const cy = c === 0 ? 0 : Math.sin(TAU / 6 * c) * r;
      for (let i = 0; i < 24; i++) {
        const a1 = (TAU / 24) * i;
        const a2 = (TAU / 24) * (i + 1);
        vertices.push(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, 0);
        vertices.push(cx + Math.cos(a2) * r, cy + Math.sin(a2) * r, 0);
      }
    }
  } else if (type === 'hexagram') {
    // Star of David
    for (let t = 0; t < 2; t++) {
      const offset = t * Math.PI / 3;
      for (let i = 0; i < 3; i++) {
        const a1 = (TAU / 3) * i + offset - Math.PI / 2;
        const a2 = (TAU / 3) * ((i + 1) % 3) + offset - Math.PI / 2;
        vertices.push(Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
        vertices.push(Math.cos(a2) * radius, Math.sin(a2) * radius, 0);
      }
    }
  } else if (type === 'pentagram') {
    // Five-pointed star
    const order = [0, 2, 4, 1, 3, 0];
    for (let i = 0; i < order.length - 1; i++) {
      const a1 = (TAU / 5) * order[i] - Math.PI / 2;
      const a2 = (TAU / 5) * order[i + 1] - Math.PI / 2;
      vertices.push(Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
      vertices.push(Math.cos(a2) * radius, Math.sin(a2) * radius, 0);
    }
    // Outer pentagon
    for (let i = 0; i < 5; i++) {
      const a1 = (TAU / 5) * i - Math.PI / 2;
      const a2 = (TAU / 5) * ((i + 1) % 5) - Math.PI / 2;
      vertices.push(Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
      vertices.push(Math.cos(a2) * radius, Math.sin(a2) * radius, 0);
    }
  } else if (type === 'borromean') {
    // Three interlocking circles
    const r = radius * 0.65;
    for (let c = 0; c < 3; c++) {
      const offX = Math.cos(TAU / 3 * c - Math.PI / 2) * r * 0.4;
      const offY = Math.sin(TAU / 3 * c - Math.PI / 2) * r * 0.4;
      for (let i = 0; i < 32; i++) {
        const a1 = (TAU / 32) * i;
        const a2 = (TAU / 32) * (i + 1);
        vertices.push(offX + Math.cos(a1) * r, offY + Math.sin(a1) * r, 0);
        vertices.push(offX + Math.cos(a2) * r, offY + Math.sin(a2) * r, 0);
      }
    }
  } else if (type === 'octagram') {
    // Two overlapping squares
    for (let s = 0; s < 2; s++) {
      const offset = s * Math.PI / 4;
      for (let i = 0; i < 4; i++) {
        const a1 = (TAU / 4) * i + offset;
        const a2 = (TAU / 4) * ((i + 1) % 4) + offset;
        vertices.push(Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
        vertices.push(Math.cos(a2) * radius, Math.sin(a2) * radius, 0);
      }
    }
  } else if (type === 'hexagonal') {
    // Nested hexagons
    for (let ring = 0; ring < 2; ring++) {
      const r = radius * (1 - ring * 0.35);
      const rot = ring * Math.PI / 6;
      for (let i = 0; i < 6; i++) {
        const a1 = (TAU / 6) * i + rot;
        const a2 = (TAU / 6) * ((i + 1) % 6) + rot;
        vertices.push(Math.cos(a1) * r, Math.sin(a1) * r, 0);
        vertices.push(Math.cos(a2) * r, Math.sin(a2) * r, 0);
      }
    }
    // Radial connectors
    for (let i = 0; i < 6; i++) {
      const a = (TAU / 6) * i;
      vertices.push(Math.cos(a) * radius * 0.65, Math.sin(a) * radius * 0.65, 0);
      vertices.push(Math.cos(a) * radius, Math.sin(a) * radius, 0);
    }
  } else if (type === 'dodecagram') {
    // 12-pointed star
    for (let i = 0; i < 12; i++) {
      const a1 = (TAU / 12) * i;
      const a2 = (TAU / 12) * ((i + 5) % 12);
      vertices.push(Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
      vertices.push(Math.cos(a2) * radius, Math.sin(a2) * radius, 0);
    }
  }

  if (vertices.length === 0) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  return geo;
}

// ─── PARTICLE CLOUD (ELECTRON ORBITAL) ───
function createParticleCloud(layer, torusR) {
  const count = 200 + layer.n * 30;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Distribute on torus surface with some randomness (orbital cloud shape)
    const theta = Math.random() * TAU;
    const phi = Math.random() * TAU;
    const jitter = (Math.random() - 0.5) * torusR * 0.4;
    const r = torusR + Math.cos(phi) * (torusR * 0.15 + jitter);
    const y = Math.sin(phi) * (torusR * 0.15 + jitter);

    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * r * 0.3 + (Math.random() - 0.5) * 4;

    sizes[i] = 0.05 + Math.random() * 0.15;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    color: layer.particleColor,
    size: 0.28,
    map: starGlowTexture,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  return new THREE.Points(geo, mat);
}

// ─── CONNECTING SPIRALS ───
function buildSpirals() {
  const spiralCount = 3;
  for (let s = 0; s < spiralCount; s++) {
    const pts = [];
    const steps = 300;
    const startAngle = (TAU / spiralCount) * s;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const z = t * (LAYER_COUNT - 1) * LAYER_SPACING;
      const angle = startAngle + t * TAU * 3;
      const r = 3 + t * 38;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        z
      ));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(400));
    const curveMat = new THREE.LineBasicMaterial({
      color: 0x8a7562,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Line(curveGeo, curveMat));
  }
}

// ─── NAVIGATION ───
function buildNavDots() {
  if (!sliderStops) return;
  sliderStops.innerHTML = '';
  LAYERS.forEach((layer, i) => {
    const stop = document.createElement('div');
    stop.className = 'slider-stop' + (i === 0 ? ' active' : '');
    stop.style.top = `${(i / (LAYER_COUNT - 1)) * 100}%`;
    stop.dataset.layer = i;
    // Click + touchend for reliable tap on all platforms
    const handleStopTap = (e) => {
      e.stopPropagation();
      if (e.type === 'touchend') e.preventDefault();  // prevent ghost click
      goToLayer(i);
    };
    stop.addEventListener('click', handleStopTap);
    stop.addEventListener('touchend', handleStopTap);
    // Show tooltip on hover
    stop.addEventListener('mouseenter', () => showSliderTooltip(i, stop));
    stop.addEventListener('mouseleave', hideSliderTooltip);
    sliderStops.appendChild(stop);
  });
  updateSliderPosition(0);
}

function updateSliderPosition(index) {
  const pct = (index / (LAYER_COUNT - 1)) * 100;
  if (sliderThumb) sliderThumb.style.top = `${pct}%`;
  if (sliderFill)  sliderFill.style.height = `${pct}%`;
  // Mark visited
  visitedLayers.add(index);
  // Update stop dots + trigger pulse animation on newly active dot
  if (sliderStops) {
    sliderStops.querySelectorAll('.slider-stop').forEach((stop, i) => {
      const wasActive = stop.classList.contains('active');
      stop.classList.toggle('active', i === index);
      stop.classList.toggle('visited', visitedLayers.has(i) && i !== index);
      // Trigger grow/glow pulse on newly activated dot
      if (i === index && !wasActive) {
        stop.classList.remove('pulse');
        // Force reflow to restart animation
        void stop.offsetWidth;
        stop.classList.add('pulse');
      }
    });
  }
  updateLayerContext(index);
}

/** Persistent label beside the slider — complements the brief center title flash. */
function updateLayerContext(index) {
  if (!layerContext) return;
  if (!entered) {
    layerContext.hidden = true;
    layerContext.textContent = '';
    return;
  }
  const layer = LAYERS[index];
  if (!layer) return;
  layerContext.hidden = false;
  layerContext.textContent = `${LAYER_COUNT - index}. ${layer.name}`;
}

function showSliderTooltip(index, refEl) {
  if (!sliderTooltip || !sliderTrack) return;
  const layer = LAYERS[index];
  if (!layer) return;
  sliderTooltip.textContent = `${LAYER_COUNT - index}. ${layer.name}`;
  // Position tooltip vertically aligned with the stop
  const trackRect = sliderTrack.getBoundingClientRect();
  const stopRect = refEl.getBoundingClientRect();
  const navEl = $('navControls');
  if (!navEl) return;
  const navRect = navEl.getBoundingClientRect();
  sliderTooltip.style.top = `${stopRect.top - navRect.top + stopRect.height / 2}px`;
  sliderTooltip.classList.add('visible');
}

function hideSliderTooltip() {
  if (sliderTooltip) sliderTooltip.classList.remove('visible');
}


function getLineage(layerIndex) {
  const names = LINEAGE[layerIndex] || [];
  return names.join(' \u00b7 ');
}

function goToLayer(index) {
  if (index < 0 || index >= LAYER_COUNT || isTransitioning) return;
  targetLayer = index;
  const targetZ = (LAYER_COUNT - 1 - index) * LAYER_SPACING;
  targetCameraZ = targetZ + 6;
  isTransitioning = true;
  transitionTimer = 0;

  showLayerTitle(index);
  updateSliderPosition(index);
}

function showLayerTitle(index) {
  const layer = LAYERS[index];
  if (!layer) return;
  if (layerNumber)   layerNumber.textContent = `layer ${LAYER_COUNT - index}`;
  if (layerName)     layerName.textContent = layer.name;
  if (layerSubtitle) layerSubtitle.textContent = layer.subtitle;
  if (layerTitle) {
    layerTitle.classList.remove('dissolve-out');
    // Force reflow so the base state (below-center, blurred) applies
    // before the transition to .visible begins
    void layerTitle.offsetHeight;
    layerTitle.classList.add('visible');
  }
  if (teachingPanel) teachingPanel.classList.remove('visible');
  // Hide scroll-hint chevrons while the title is showing — they can overlap it
  if (scrollHintUp) scrollHintUp.disabled = true;
  if (scrollHintDown) scrollHintDown.disabled = true;

  clearTimeout(showLayerTitle._timer);
  clearTimeout(showLayerTitle._breathTimer);

  // Phase 1: Title holds for 2.4s
  showLayerTitle._timer = setTimeout(() => {
    // Phase 2: Title dissolves upward — the wave recedes
    if (layerTitle) {
      layerTitle.classList.remove('visible');
      layerTitle.classList.add('dissolve-out');
    }

    // Phase 3: Teaching content injected immediately but panel
    // won't become visible until the wave trough passes.
    // The breath lives inside the crossfade overlap, not as a gap.
    const breathDuration = prefersReducedMotion ? 100 : 500;
    showLayerTitle._breathTimer = setTimeout(() => {
      if (teachingInner) {
        // Inject content + lineage footer
        const lineage = getLineage(index);
        teachingInner.innerHTML = layer.content
          + `<p class="communal-presence">also sat here: ${lineage} \u00b7 you</p>`;

        // Phase 3: Organic reveal — decelerating rhythm, like discoveries surfacing
        const children = teachingInner.children;
        let cumulative = 0;
        for (let i = 0; i < children.length; i++) {
          // Each gap grows: 600, 720, 840... thoughts arrive slower as you go deeper
          const gap = prefersReducedMotion ? 0 : (600 + i * 120);
          cumulative += i === 0 ? 0 : gap;
          children[i].classList.add('stagger-in');
          children[i].style.animationDelay = `${cumulative}ms`;
          // Vary the rise distance slightly — organic, not mechanical
          const drift = 6 + (i % 3) * 4; // 6px, 10px, 14px, 6px...
          children[i].style.setProperty('--drift', `${drift}px`);
        }
      }
      if (teachingPanel) { teachingPanel.scrollTop = 0; teachingPanel.classList.add('visible'); }
      updatePanelOpacity(index);
      updateScrollFades();
    }, breathDuration);
  }, 2400);
}

// ─── SLIDER DRAG ───
let isDragging = false;

function sliderYToLayer(clientY) {
  if (!sliderTrack) return 0;
  const rect = sliderTrack.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
  return Math.round(pct * (LAYER_COUNT - 1));
}

function onDragStart(e) {
  if (!entered || !sliderThumb) return;
  isDragging = true;
  sliderThumb.classList.add('dragging');
  // Disable smooth transition while dragging for instant feedback
  if (sliderThumb) sliderThumb.style.transition = 'transform 0.1s, box-shadow 0.1s';
  if (sliderFill)  sliderFill.style.transition = 'none';
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const layer = sliderYToLayer(clientY);
  goToLayer(layer);
}

function onDragMove(e) {
  if (!isDragging) return;
  e.preventDefault();
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const layer = sliderYToLayer(clientY);
  if (layer !== targetLayer) goToLayer(layer);
}

function onDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  if (sliderThumb) { sliderThumb.classList.remove('dragging'); sliderThumb.style.transition = ''; }
  if (sliderFill)  sliderFill.style.transition = '';
}

// Mouse drag on thumb
if (sliderThumb) {
  sliderThumb.addEventListener('mousedown', onDragStart);
  sliderThumb.addEventListener('touchstart', onDragStart, { passive: true });
}
document.addEventListener('mousemove', onDragMove);
document.addEventListener('mouseup', onDragEnd);
document.addEventListener('touchmove', (e) => { if (isDragging) onDragMove(e); }, { passive: false });
document.addEventListener('touchend', onDragEnd);

// Click on track = jump to closest layer
if (sliderTrack) {
  sliderTrack.addEventListener('click', (e) => {
    if (!entered) return;
    goToLayer(sliderYToLayer(e.clientY));
  });

  // Touch on track = start drag from anywhere on the track, not just thumb
  sliderTrack.addEventListener('touchstart', (e) => {
    if (!entered) return;
    isDragging = true;
    if (sliderThumb) {
      sliderThumb.classList.add('dragging');
      sliderThumb.style.transition = 'transform 0.1s, box-shadow 0.1s';
    }
    if (sliderFill) sliderFill.style.transition = 'none';
    const clientY = e.touches[0].clientY;
    goToLayer(sliderYToLayer(clientY));
  }, { passive: true });
}

// ─── INPUT HANDLING — Unified Gesture System ───
//
// Desktop:  scroll-Y = layer nav,  click-drag = orbit,  ctrl/meta+scroll = zoom
// Mobile:   1-finger swipe-Y = layer nav,  1-finger swipe-X = orbit,
//           2-finger pinch = zoom,  slider = layer nav

let scrollAccum = 0;
const SCROLL_THRESHOLD = 80;

function handleLayerScroll(delta) {
  if (!entered || isTransitioning) return;
  scrollAccum += delta;
  if (Math.abs(scrollAccum) >= SCROLL_THRESHOLD) {
    const dir = scrollAccum > 0 ? 1 : -1;
    scrollAccum = 0;
    goToLayer(Math.max(0, Math.min(LAYER_COUNT - 1, currentLayer + dir)));
  }
}

// ── Desktop: mouse wheel ──
// Guard: if pointer is over the teaching panel, let the panel scroll natively
if (canvas) canvas.addEventListener('wheel', (e) => {
  // Check if the cursor is actually over the teaching panel
  if (teachingPanel && teachingPanel.classList.contains('visible')) {
    const panelRect = teachingPanel.getBoundingClientRect();
    if (e.clientX >= panelRect.left && e.clientX <= panelRect.right &&
        e.clientY >= panelRect.top  && e.clientY <= panelRect.bottom) {
      return; // let panel scroll naturally — don't preventDefault, don't navigate layers
    }
  }
  e.preventDefault();
  if (!entered) return;
  if (e.ctrlKey || e.metaKey) {
    // Ctrl/Cmd + scroll = zoom
    targetZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, targetZoom + e.deltaY * 0.002));
  } else {
    handleLayerScroll(e.deltaY);
  }
}, { passive: false });

// Also stop wheel propagation from within the panel itself
if (teachingPanel) teachingPanel.addEventListener('wheel', (e) => {
  e.stopPropagation();
}, { passive: true });

// ── Desktop: mouse drag = orbit ──
let isMouseDragging = false;
let mouseLastX = 0;

if (canvas) canvas.addEventListener('mousedown', (e) => {
  if (!entered) return;
  isMouseDragging = true;
  mouseLastX = e.clientX;
  if (canvas) canvas.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isMouseDragging || isDragging) return; // isDragging = slider drag
  const dx = e.clientX - mouseLastX;
  mouseLastX = e.clientX;
  targetOrbitAngle += dx * 0.005;
  lastOrbitInputTime = clock.getElapsedTime();
});

document.addEventListener('mouseup', () => {
  isMouseDragging = false;
  if (canvas) canvas.style.cursor = '';
});

// ── Touch: unified 1-finger + 2-finger gesture handling ──
let touch = {
  startX: 0, startY: 0,
  lastX: 0, lastY: 0,
  orbitDXAccum: 0,      // accumulate dx between rAF ticks (smoother on iOS)
  orbitRaf: 0,          // rAF id for orbit updates
  startDist: 0,        // pinch starting distance
  startZoom: 1,        // zoom value when pinch started
  fingers: 0,
  intent: null,        // 'orbit' | 'layer' | 'pinch' | null
  locked: false,       // once intent is set, lock it for this gesture
};

const INTENT_THRESHOLD = 8; // px before we decide swipe direction

function pinchDist(e) {
  const dx = e.touches[0].clientX - e.touches[1].clientX;
  const dy = e.touches[0].clientY - e.touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

if (canvas) canvas.addEventListener('touchstart', (e) => {
  if (!entered || panelTouchActive) return;
  touch.fingers = e.touches.length;
  touch.intent = null;
  touch.locked = false;
  touch.orbitDXAccum = 0;
  if (touch.orbitRaf) { cancelAnimationFrame(touch.orbitRaf); touch.orbitRaf = 0; }

  if (e.touches.length === 1) {
    touch.startX = touch.lastX = e.touches[0].clientX;
    touch.startY = touch.lastY = e.touches[0].clientY;
  } else if (e.touches.length === 2) {
    touch.intent = 'pinch';
    touch.locked = true;
    touch.startDist = pinchDist(e);
    touch.startZoom = targetZoom;
  }
}, { passive: true });

if (canvas) canvas.addEventListener('touchmove', (e) => {
  if (!entered || panelTouchActive) return;
  e.preventDefault();

  // ── Pinch zoom (2 fingers) ──
  if (e.touches.length === 2 && touch.intent === 'pinch') {
    const dist = pinchDist(e);
    const scale = touch.startDist / dist; // pinch-in = scale > 1 = zoom out
    targetZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, touch.startZoom * scale));
    return;
  }

  // ── Single-finger gestures ──
  if (e.touches.length !== 1) return;

  const cx = e.touches[0].clientX;
  const cy = e.touches[0].clientY;
  const dx = cx - touch.lastX;
  const dy = cy - touch.lastY;

  // Determine intent on first significant move
  if (!touch.locked) {
    const totalDX = Math.abs(cx - touch.startX);
    const totalDY = Math.abs(cy - touch.startY);
    if (totalDX < INTENT_THRESHOLD && totalDY < INTENT_THRESHOLD) {
      return; // not enough movement yet
    }
    touch.intent = totalDX > totalDY ? 'orbit' : 'layer';
    touch.locked = true;
  }

  if (touch.intent === 'orbit') {
    // iOS can deliver touchmove in uneven bursts; accumulate and apply once per frame.
    touch.orbitDXAccum += dx;
    if (!touch.orbitRaf) {
      touch.orbitRaf = requestAnimationFrame(() => {
        const accum = touch.orbitDXAccum;
        touch.orbitDXAccum = 0;
        touch.orbitRaf = 0;
        // Slightly lower gain + per-frame application feels smoother on iPhone.
        targetOrbitAngle += accum * 0.0048;
        lastOrbitInputTime = clock.getElapsedTime();
      });
    }
  } else if (touch.intent === 'layer') {
    handleLayerScroll(-dy * 1.5);
  }

  touch.lastX = cx;
  touch.lastY = cy;
}, { passive: false });

if (canvas) canvas.addEventListener('touchend', () => {
  touch.fingers = 0;
  touch.intent = null;
  touch.locked = false;
  touch.orbitDXAccum = 0;
  if (touch.orbitRaf) { cancelAnimationFrame(touch.orbitRaf); touch.orbitRaf = 0; }
});

// ── Keyboard ──
document.addEventListener('keydown', (e) => {
  // Escape key: close mic modal or teaching panel (works before/after enter)
  if (e.key === 'Escape') {
    if (micModal && micModal.classList.contains('visible')) {
      hideMicModal();
      return;
    }
    if (entered && teachingWrap && teachingPanel && teachingPanel.classList.contains('visible')
        && !teachingWrap.classList.contains('teaching-wrap--collapsed')) {
      syncTeachingPanelCollapsed(true);
      return;
    }
  }
  if (!entered) return;
  if (e.key === 'ArrowDown' || e.key === 'j') {
    goToLayer(Math.min(LAYER_COUNT - 1, currentLayer + 1));
  } else if (e.key === 'ArrowUp' || e.key === 'k') {
    goToLayer(Math.max(0, currentLayer - 1));
  } else if (e.key === 'ArrowLeft') {
    targetOrbitAngle -= 0.3;
    lastOrbitInputTime = clock.getElapsedTime();
  } else if (e.key === 'ArrowRight') {
    targetOrbitAngle += 0.3;
    lastOrbitInputTime = clock.getElapsedTime();
  } else if (e.key === '+' || e.key === '=') {
    targetZoom = Math.max(ZOOM_MIN, targetZoom - 0.1);
  } else if (e.key === '-' || e.key === '_') {
    targetZoom = Math.min(ZOOM_MAX, targetZoom + 0.1);
  } else {
    const num = parseInt(e.key);
    if (num >= 1 && num <= LAYER_COUNT) {
      // Map key N to the layer displayed as "layer N".
      // showLayerTitle displays index 0 as "layer 7" (outermost) and
      // index 6 as "layer 1" (core), so key 1 → index 6, key 7 → index 0.
      goToLayer(LAYER_COUNT - num);
    }
  }
});

// ─── AMBIENT AUDIO (Web Audio API — works in all environments inc. iOS standalone) ───
const AUDIO_VOLUME = 0.33;
// Ocean bed (CC0 — see AUDIO-CREDITS.txt): same bus shape as meditation, 20% of its linear gain
const OCEAN_TO_MUSIC_GAIN = 0.2;
const oceanTargetGain = () => AUDIO_VOLUME * OCEAN_TO_MUSIC_GAIN;

// Slow volume swell — calm breath-like rise/fall (both beds track together)
// Longer period + slightly deeper trough yields a more perceptible, soothing "breath"
// without ever pumping or drawing attention.
const AMBIENT_LFO_PERIOD_MS = 260000;  // ~4.3 min crest-to-crest
const AMBIENT_LFO_MIN = 0.16;          // quieter trough
const AMBIENT_LFO_MAX = 1.0;           // crest: nominal mix strength
// Large σ → gentle shoulders, long smooth climb/descent (narrow σ reads as a sharp spike)
const AMBIENT_LFO_SIGMA = 0.56;
// Exponential smooth toward target gain multiplier — slower τ for a calmer envelope
const AMBIENT_GAIN_SMOOTH_TAU_SLOW = 0.9;
const AMBIENT_GAIN_SMOOTH_TAU_FAST = 0.1;
const AMBIENT_GAIN_ERR_FAST = 0.14; // above this |target−smoothed|, use fast τ

/** Web Audio context exists and is not closed — safe to touch nodes created from it. */
function isAmbientAudioContextAlive() {
  return audioCtx && audioCtx.state !== 'closed';
}

/** Gain automation: try on running/suspended/interrupted; closed → rely on HTML volume fallback. */
function canAutomateAmbientGainNodes() {
  if (!isAmbientAudioContextAlive()) return false;
  const s = audioCtx.state;
  return s === 'running' || s === 'suspended' || s === 'interrupted';
}

let audioCtx = null;          // AudioContext — created on first user gesture
let gainNode = null;          // GainNode for meditation volume
let audioSource = null;       // MediaElementAudioSourceNode (meditation)
let audioElement = null;      // underlying <audio> for meditation
let waveGainNode = null;      // GainNode for ocean loop (Web Audio path)
let waveAudioSource = null;   // MediaElementAudioSourceNode (ocean)
let waveAudioElement = null;  // underlying <audio> for ocean loop
let audioMuted = false;
let audioReady = false;       // true once pipeline is connected & playing
let fadeRAF = null;           // requestAnimationFrame id for fade-in
let ambientIntroFade = 0;     // 0..1 initial fade-in; then stays 1
let ambientSmoothedF = 0;     // smoothed combined multiplier (intro × LFO), for zipper-free gains
let lastAmbientGainSmoothMs = 0;

/** Crest-to-crest period AMBIENT_LFO_PERIOD_MS; wide normal-like bump, normalized to [MIN, MAX]. */
function getAmbientLfoGainMultiplier(nowMs = performance.now()) {
  try {
    const t = Number(nowMs);
    if (!Number.isFinite(t)) return (AMBIENT_LFO_MIN + AMBIENT_LFO_MAX) * 0.5;
    const T = AMBIENT_LFO_PERIOD_MS;
    const phase = (((t % T) + T) % T) / T;
    const sig = Math.max(AMBIENT_LFO_SIGMA, 1e-6);
    const edgeBell = Math.exp(-0.5 * Math.pow(0.5 / sig, 2));
    const x = (phase - 0.5) / sig;
    const bell = Math.exp(-0.5 * x * x);
    const denom = 1 - edgeBell;
    const n = denom > 1e-6 ? (bell - edgeBell) / denom : 0;
    const clampedN = Math.max(0, Math.min(1, n));
    const out = AMBIENT_LFO_MIN + (AMBIENT_LFO_MAX - AMBIENT_LFO_MIN) * clampedN;
    return Number.isFinite(out) ? out : AMBIENT_LFO_MIN;
  } catch (_) {
    return AMBIENT_LFO_MIN;
  }
}

function trySetAudioParamValue(param, value) {
  if (!param || !Number.isFinite(value)) return false;
  try {
    param.value = Math.max(0, value);
    return true;
  } catch (_) {
    return false;
  }
}

function trySetHtmlAudioVolume(el, value) {
  if (!el || !Number.isFinite(value)) return false;
  try {
    el.volume = Math.max(0, Math.min(1, value));
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Apply meditation + ocean gains. Uses exponential smoothing on the envelope so changes
 * feel continuous (avoids stepped / zipper artifacts); dtSec from the render loop when available.
 * Never throws; degrades silently if Web Audio is interrupted/closed or nodes are stale.
 */
function refreshAmbientGains(dtSec = null) {
  if (!audioReady || audioMuted) return;
  try {
    const nowMs = performance.now();
    let dt = dtSec;
    if (!Number.isFinite(dt) || dt <= 0) {
      dt = lastAmbientGainSmoothMs ? Math.min((nowMs - lastAmbientGainSmoothMs) / 1000, 0.12) : 1 / 60;
    }
    lastAmbientGainSmoothMs = nowMs;

    const intro = Number.isFinite(ambientIntroFade) ? ambientIntroFade : 0;
    const lfo = getAmbientLfoGainMultiplier(nowMs);
    const targetF = Math.max(0, Math.min(1, intro * lfo));
    const err = Math.abs(targetF - ambientSmoothedF);
    const tau = Math.max(
      err > AMBIENT_GAIN_ERR_FAST ? AMBIENT_GAIN_SMOOTH_TAU_FAST : AMBIENT_GAIN_SMOOTH_TAU_SLOW,
      1e-4
    );
    const k = 1 - Math.exp(-dt / tau);
    ambientSmoothedF += (targetF - ambientSmoothedF) * k;
    if (!Number.isFinite(ambientSmoothedF)) ambientSmoothedF = targetF;
    ambientSmoothedF = Math.max(0, Math.min(1, ambientSmoothedF));

    const f = ambientSmoothedF;
    const medLinear = AUDIO_VOLUME * f;
    const og = oceanTargetGain() * f;

    const webOk = canAutomateAmbientGainNodes();
    if (gainNode && webOk) {
      if (!trySetAudioParamValue(gainNode.gain, medLinear) && audioElement) {
        trySetHtmlAudioVolume(audioElement, medLinear);
      }
    } else if (audioElement) {
      trySetHtmlAudioVolume(audioElement, medLinear);
    }

    if (waveGainNode && webOk) {
      if (!trySetAudioParamValue(waveGainNode.gain, og) && waveAudioElement) {
        trySetHtmlAudioVolume(waveAudioElement, og);
      }
    } else if (waveAudioElement) {
      trySetHtmlAudioVolume(waveAudioElement, og);
    }
  } catch (_) {
    /* keep last smoothed state; next frame may recover */
  }
}

function setAmbientIntroFade(t) {
  ambientIntroFade = Math.max(0, Math.min(1, t));
  refreshAmbientGains();
}

function silenceAmbientOutputs() {
  ambientSmoothedF = 0;
  lastAmbientGainSmoothMs = 0;
  try {
    const medWeb = gainNode && canAutomateAmbientGainNodes();
    if (medWeb) {
      trySetAudioParamValue(gainNode.gain, 0);
      if (audioElement) trySetHtmlAudioVolume(audioElement, 1);
    } else if (audioElement) {
      trySetHtmlAudioVolume(audioElement, 0);
    }
    const waveWeb = waveGainNode && canAutomateAmbientGainNodes();
    if (waveWeb) {
      trySetAudioParamValue(waveGainNode.gain, 0);
      if (waveAudioElement) trySetHtmlAudioVolume(waveAudioElement, 1);
    } else if (waveAudioElement) {
      trySetHtmlAudioVolume(waveAudioElement, 0);
    }
  } catch (_) {}
}

const AMBIENT_INTRO_FADE_MS = 3000;

function startAmbientIntroFade() {
  const fadeStart = performance.now();
  function fadeStep(now) {
    if (audioMuted) {
      silenceAmbientOutputs();
      return;
    }
    const t = Math.min((now - fadeStart) / AMBIENT_INTRO_FADE_MS, 1);
    setAmbientIntroFade(t);
    if (t < 1) fadeRAF = requestAnimationFrame(fadeStep);
  }
  if (fadeRAF) {
    try { cancelAnimationFrame(fadeRAF); } catch (_) {}
    fadeRAF = null;
  }
  fadeRAF = requestAnimationFrame(fadeStep);
}

/** If context exists but play never reached audioReady (autoplay block, iOS quirks), retry on tap. */
function startOrRetryAmbientPlayback() {
  if (audioReady) return;
  if (!audioCtx) {
    initAudio();
    return;
  }
  if (!audioElement) {
    initAudio();
    return;
  }
  audioElement.play().then(() => {
    if (waveAudioElement) waveAudioElement.play().catch(() => {});
    audioReady = true;
    if (!audioMuted) startAmbientIntroFade();
    else silenceAmbientOutputs();
  }).catch(() => {});
}

function initAudio() {
  if (audioReady) return;
  try {
    // 1. Create AudioContext inside user gesture (required by iOS)
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;   // browser has no Web Audio support
    audioCtx = new AC();

    // 2. Meditation: gain → destination
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0;   // start silent for fade-in
    gainNode.connect(audioCtx.destination);

    audioElement = new Audio('ambient-meditation.mp3');
    audioElement.loop = true;
    audioElement.playsInline = true;
    audioElement.preload = 'auto';
    audioElement.volume = 1;

    try {
      audioSource = audioCtx.createMediaElementSource(audioElement);
      audioSource.connect(gainNode);
    } catch (corsErr) {
      console.warn('MediaElementSource failed, using HTML audio fallback:', corsErr);
      gainNode = null;
    }

    // 3. Ocean loop (separate element + gain, same context)
    waveGainNode = audioCtx.createGain();
    waveGainNode.gain.value = 0;
    waveGainNode.connect(audioCtx.destination);

    waveAudioElement = new Audio('ambient-ocean-wave.mp3');
    waveAudioElement.loop = true;
    waveAudioElement.playsInline = true;
    waveAudioElement.preload = 'auto';
    waveAudioElement.volume = 1;

    try {
      waveAudioSource = audioCtx.createMediaElementSource(waveAudioElement);
      waveAudioSource.connect(waveGainNode);
    } catch (waveErr) {
      console.warn('Ocean wave MediaElementSource failed:', waveErr);
      try { waveGainNode.disconnect(); } catch (e) {}
      waveGainNode = null;
    }

    // 4. Resume context if suspended (iOS starts contexts suspended)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }

    // 5. Start playback (meditation drives readiness; ocean best-effort)
    audioElement.play().then(() => {
      waveAudioElement.play().catch(() => {});
      audioReady = true;
      if (!audioMuted) startAmbientIntroFade();
      else silenceAmbientOutputs();
    }).catch(() => {
      console.log('Audio autoplay blocked — tap sound icon to enable');
    });

    if (audioToggle) {
      audioToggle.classList.add('visible');
      audioToggle.setAttribute('aria-pressed', 'true');
    }
  } catch (err) {
    console.warn('Audio init failed:', err);
    try {
      try { audioSource?.disconnect(); } catch (_) {}
      try { waveAudioSource?.disconnect(); } catch (_) {}
      try { gainNode?.disconnect(); } catch (_) {}
      try { waveGainNode?.disconnect(); } catch (_) {}
      try { audioCtx?.close(); } catch (_) {}
    } catch (_) {}
    audioCtx = null;
    gainNode = null;
    waveGainNode = null;
    audioSource = null;
    waveAudioSource = null;
    audioElement = null;
    waveAudioElement = null;
    audioReady = false;
    fadeRAF = null;
  }
}

// Debounce guard: iOS standalone can fire both touchend and click
let lastToggleTime = 0;
function handleAudioToggle(e) {
  if (e) e.preventDefault();
  const now = Date.now();
  if (now - lastToggleTime < 300) return;   // ignore duplicate within 300ms
  lastToggleTime = now;

  // Until playback is ready: retries init or play() (mobile autoplay / deferred start)
  if (!audioReady) {
    startOrRetryAmbientPlayback();
    return;
  }

  audioMuted = !audioMuted;
  if (audioToggle) {
    audioToggle.classList.toggle('muted', audioMuted);
    audioToggle.setAttribute('aria-pressed', String(!audioMuted));
  }

  if (audioMuted) {
    if (fadeRAF) { cancelAnimationFrame(fadeRAF); fadeRAF = null; }
    silenceAmbientOutputs();
    if (audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend().catch(() => {});
    }
    if (audioElement) audioElement.pause();
    if (waveAudioElement) waveAudioElement.pause();
  } else {
    if (audioCtx && (audioCtx.state === 'suspended' || audioCtx.state === 'interrupted')) {
      audioCtx.resume().catch(() => {});
    }
    const medWeb = gainNode && canAutomateAmbientGainNodes();
    const waveWeb = waveGainNode && canAutomateAmbientGainNodes();
    const finishUnmuteGains = () => {
      ambientIntroFade = 1;
      ambientSmoothedF = getAmbientLfoGainMultiplier();
      lastAmbientGainSmoothMs = 0;
      refreshAmbientGains();
    };
    if (audioElement) {
      try { audioElement.volume = medWeb ? 1 : AUDIO_VOLUME; } catch (_) {}
      audioElement
        .play()
        .then(() => {
          audioReady = true;
          if (waveAudioElement) {
            try { waveAudioElement.volume = waveWeb ? 1 : oceanTargetGain(); } catch (_) {}
            waveAudioElement.play().catch(() => {});
          }
          finishUnmuteGains();
        })
        .catch(() => {});
    } else {
      finishUnmuteGains();
    }
  }
}
// Listen on both click (desktop) and touchend (iOS standalone fallback)
if (audioToggle) {
  audioToggle.addEventListener('click', handleAudioToggle);
  audioToggle.addEventListener('touchend', handleAudioToggle);
}

// ─── AUDIO-REACTIVE GEOMETRY — breath-responsive mandala ───
// Two inputs: ambient track (always on when playing) + mic (optional).
// Both feed AnalyserNodes → frequency data → smoothed RMS energy → single
// normalized "breath" value (0..1) on a wide, heavily-smoothed distribution.
// This drives: (1) emissive warmth/intensity, (2) subtle movement modulation.
//
// FAULT TOLERANCE DESIGN:
//   • Every audio API call is wrapped in try/catch — no single failure can kill
//     the render loop or break the experience
//   • AudioContext state is checked before every operation (can be 'suspended',
//     'interrupted', 'closed' at any time by the OS)
//   • Mic stream tracks are monitored for unexpected 'ended' events (hardware
//     disconnect, OS revoke, phone call interruption)
//   • NaN/Infinity guards on all numeric outputs — corrupt data → 0, not NaN
//   • Zero-data detection: some mobile browsers return all-zero FFT data from
//     analysers even when audio is playing — detected and treated as silence
//   • Graceful degradation chain: mic+ambient → ambient-only → zero-energy
//     baseline. The mandala always works; audio reactivity is pure enhancement.
//   • getUserMedia constraints use progressive fallback — if ideal constraints
//     fail, retry with minimal constraints before giving up
//   • Analyser reconnection: if the AudioContext is interrupted/resumed (iOS
//     phone call, Siri, Control Center), analysers are re-validated
//   • No feature detection = no mic button shown (insecure origin, no API)

// Pre-allocated color objects for per-frame audio-reactive modulation (avoid GC)
const _warmGold = new THREE.Color(0xd4a840);
const _fogWarm  = new THREE.Color(0x0d0a06);
const _fogBase  = new THREE.Color(0x06050a);

let ambientAnalyser = null;     // AnalyserNode for the ambient music track
let micAnalyser = null;         // AnalyserNode for microphone input
let micStream = null;           // MediaStream from getUserMedia
let micSource = null;           // MediaStreamAudioSourceNode
let micActive = false;          // is mic currently feeding data?
let audioBreath = 0;            // the final smoothed 0..1 breath signal
let audioBreathTarget = 0;      // raw target before smoothing
let ambientAnalyserFailed = false;  // latch: don't retry if ambient analyser permanently failed
let micZeroFrames = 0;          // consecutive frames of zero mic energy (dead-stream detection)
const MIC_ZERO_THRESHOLD = 180; // ~3s at 60fps — if mic reads zero for this long, stream is dead

// Frequency data buffers (reused each frame)
let ambientFreqData = null;
let micFreqData = null;

// ── Utility: check if AudioContext is in a usable state ──
function isAudioCtxUsable() {
  return audioCtx && audioCtx.state !== 'closed';
}

// ── Utility: safe number — clamp and NaN-guard ──
function safeBreathNum(v) {
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

// ── Feature detection: hide mic button if getUserMedia is unavailable ──
// (insecure origins, old browsers, restrictive CSP)
(function detectMicSupport() {
  const hasGetUserMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const isSecureContext = window.isSecureContext !== false; // treat undefined as true for older browsers
  if (!hasGetUserMedia || !isSecureContext) {
    if (micToggle) micToggle.style.display = 'none';
  }
})();

// Attach analyser to the ambient track (called after audio pipeline is ready)
function attachAmbientAnalyser() {
  if (ambientAnalyser || ambientAnalyserFailed) return;
  if (!isAudioCtxUsable() || !audioSource) return;
  try {
    ambientAnalyser = audioCtx.createAnalyser();
    ambientAnalyser.fftSize = 256;
    ambientAnalyser.smoothingTimeConstant = 0.85;
    audioSource.connect(ambientAnalyser);
    ambientFreqData = new Uint8Array(ambientAnalyser.frequencyBinCount);
  } catch (e) {
    console.warn('Ambient analyser attach failed:', e.message);
    ambientAnalyser = null;
    ambientFreqData = null;
    // If the context is closed, don't retry forever
    if (audioCtx && audioCtx.state === 'closed') ambientAnalyserFailed = true;
  }
}

// Compute RMS energy from an AnalyserNode's frequency data, normalized 0..1
// Returns 0 on any failure — never throws, never returns NaN.
function getAnalyserEnergy(analyser, freqData) {
  if (!analyser || !freqData) return 0;
  try {
    analyser.getByteFrequencyData(freqData);
  } catch (e) {
    // Analyser disconnected, context closed, or node GC'd
    return 0;
  }
  let sum = 0;
  const len = freqData.length;
  if (len === 0) return 0;
  // Weight low-mid frequencies more (where breath and ambient drones live)
  for (let i = 0; i < len; i++) {
    const weight = i < len * 0.4 ? 1.5 : 1.0;
    const v = freqData[i] / 255;
    sum += v * v * weight;
  }
  const energy = Math.sqrt(sum / len);
  // Guard against NaN from corrupt data
  return Number.isFinite(energy) ? energy : 0;
}

// Per-frame: blend both sources into a single breath value.
// Entire function is fault-isolated — any failure → audioBreath decays to 0.
function updateAudioBreath() {
  try {
    // Re-check AudioContext state (iOS can suspend/interrupt at any time)
    if (audioCtx && audioCtx.state === 'interrupted') {
      // iOS-specific: context was interrupted (phone call, Siri, etc.)
      // Try to resume — if it fails, that's fine, we just get zero energy
      audioCtx.resume().catch(() => {});
    }

    // Ensure ambient analyser is connected once audio is playing
    if (!ambientAnalyser && audioReady) attachAmbientAnalyser();

    // If AudioContext is suspended/closed, analysers return zero — that's fine
    const ambientEnergy = getAnalyserEnergy(ambientAnalyser, ambientFreqData);
    let micEnergy = 0;

    if (micActive) {
      micEnergy = getAnalyserEnergy(micAnalyser, micFreqData);

      // Dead-stream detection: if mic returns zero for too long, the stream
      // is likely dead (hardware disconnect, OS revoked permission, etc.)
      if (micEnergy < 0.001) {
        micZeroFrames++;
        if (micZeroFrames > MIC_ZERO_THRESHOLD) {
          console.warn('Mic stream appears dead — auto-disabling');
          disableMic();
          micEnergy = 0;
        }
      } else {
        micZeroFrames = 0;  // reset on any non-zero data
      }
    }

    // Soft-limit mic energy so speech peaks can't spike the blend.
    // tanh gives a smooth ceiling that compresses loud input without clipping.
    const clampedMic = micActive ? Math.tanh(micEnergy * 1.5) * 0.6 : 0;

    // Blend: ambient always dominates — mic adds subtle breath modulation on top.
    // Ambient drives the primary visual rhythm; mic never overshadows it.
    // This prevents speech or room noise from hijacking the experience.
    const rawEnergy = micActive
      ? ambientEnergy * 0.65 + clampedMic * 0.35
      : ambientEnergy;

    // Map to 0..1 with a floor and ceiling — wide flat distribution
    const mapped = Math.max(0, Math.min(1, (rawEnergy - 0.02) / 0.5));
    audioBreathTarget = safeBreathNum(mapped);

    // Heavy exponential smoothing — this is what makes it feel like breathing
    const rise = 0.015;
    const fall = 0.008;
    const rate = audioBreathTarget > audioBreath ? rise : fall;
    audioBreath = safeBreathNum(audioBreath + (audioBreathTarget - audioBreath) * rate);

  } catch (e) {
    // Total failure — just decay gracefully toward zero
    audioBreath *= 0.95;
    if (audioBreath < 0.001) audioBreath = 0;
  }
}

// ── Mic permission flow ──
function showMicModal() {
  if (micModal) micModal.classList.add('visible');
}
function hideMicModal() {
  if (micModal) micModal.classList.remove('visible');
}

async function enableMic() {
  hideMicModal();
  try {
    // Guard: getUserMedia requires secure context + API support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('getUserMedia not available (insecure origin or old browser)');
      return;
    }

    // Ensure AudioContext exists (user may tap mic before audio plays)
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) {
        console.warn('Web Audio API not supported');
        return;
      }
      try {
        audioCtx = new AC();
      } catch (ctxErr) {
        console.warn('AudioContext creation failed:', ctxErr.message);
        return;
      }
    }

    // Resume if suspended (required on iOS for user-gesture gating)
    if (audioCtx.state === 'suspended' || audioCtx.state === 'interrupted') {
      try { await audioCtx.resume(); } catch (e) { /* best effort */ }
    }

    // If context is closed (e.g., OS killed it), we can't proceed
    if (audioCtx.state === 'closed') {
      console.warn('AudioContext is closed — cannot enable mic');
      return;
    }

    // Progressive constraint fallback:
    // Try ideal constraints first, then fall back to minimal
    let stream = null;
    const constraintSets = [
      // CRITICAL: all processing OFF.
      // echoCancellation MUST be false — when true the browser's AEC fights
      // the ambient track playing through speakers, altering its perceived
      // texture and ducking/muting playback during speech.
      // noiseSuppression off — we want raw ambient room energy, not cleaned signal.
      // autoGainControl off — AGC amplifies silence and compresses peaks,
      // distorting the smooth breath envelope we need.
      {
        audio: {
          echoCancellation: { exact: false },
          noiseSuppression: { exact: false },
          autoGainControl: { exact: false }
        }
      },
      // Fallback with ideal (soft) constraints if exact fails
      {
        audio: {
          echoCancellation: { ideal: false },
          noiseSuppression: { ideal: false },
          autoGainControl: { ideal: false }
        }
      },
      // Last resort: just ask for any audio
      { audio: true }
    ];

    for (const constraints of constraintSets) {
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        break;  // success
      } catch (e) {
        // NotAllowedError = user denied — don't retry with different constraints
        if (e.name === 'NotAllowedError' || e.name === 'SecurityError') throw e;
        // OverconstrainedError, NotReadableError, etc — try next constraint set
        console.warn('getUserMedia constraint set failed, trying fallback:', e.name);
      }
    }

    if (!stream) {
      console.warn('All getUserMedia constraint sets failed');
      return;
    }

    micStream = stream;

    // Monitor for unexpected track end (hardware disconnect, OS revoke)
    micStream.getAudioTracks().forEach(track => {
      track.addEventListener('ended', () => {
        console.warn('Mic track ended unexpectedly — disabling');
        disableMic();
      });
      // Also watch for mute (some browsers fire this on permission revoke)
      track.addEventListener('mute', () => {
        console.warn('Mic track muted by system');
      });
    });

    // Create audio nodes — each can fail independently
    try {
      micSource = audioCtx.createMediaStreamSource(micStream);
    } catch (srcErr) {
      console.warn('createMediaStreamSource failed:', srcErr.message);
      micStream.getTracks().forEach(t => t.stop());
      micStream = null;
      return;
    }

    try {
      micAnalyser = audioCtx.createAnalyser();
      micAnalyser.fftSize = 256;
      micAnalyser.smoothingTimeConstant = 0.88;
      micSource.connect(micAnalyser);
    } catch (analyserErr) {
      console.warn('Mic analyser setup failed:', analyserErr.message);
      try { micSource.disconnect(); } catch (e) {}
      micSource = null;
      micStream.getTracks().forEach(t => t.stop());
      micStream = null;
      return;
    }

    // Do NOT connect micSource to destination — we don't want to hear the mic
    micFreqData = new Uint8Array(micAnalyser.frequencyBinCount);
    micZeroFrames = 0;  // reset dead-stream counter
    micActive = true;
    if (micToggle) { micToggle.classList.add('active'); micToggle.setAttribute('aria-pressed', 'true'); }

  } catch (err) {
    // Catch-all: user denied, or any unexpected failure
    const reason = err.name || err.message || 'unknown';
    console.warn('Mic enable failed (' + reason + '):', err.message || '');
    disableMic();
  }
}

function disableMic() {
  micActive = false;
  micZeroFrames = 0;
  if (micToggle) { micToggle.classList.remove('active'); micToggle.setAttribute('aria-pressed', 'false'); }
  if (micStream) {
    try { micStream.getTracks().forEach(t => t.stop()); } catch (e) {}
    micStream = null;
  }
  if (micSource) {
    try { micSource.disconnect(); } catch (e) {}
    micSource = null;
  }
  micAnalyser = null;
  micFreqData = null;
}

// Debounce guard for mic toggle (same pattern as audio toggle)
let lastMicToggleTime = 0;
function handleMicToggle(e) {
  if (e) e.preventDefault();
  const now = Date.now();
  if (now - lastMicToggleTime < 300) return;
  lastMicToggleTime = now;

  if (micActive) {
    disableMic();
  } else {
    showMicModal();
  }
}

if (micToggle) {
  micToggle.addEventListener('click', handleMicToggle);
  micToggle.addEventListener('touchend', handleMicToggle);
}
if (micAllow) {
  const doAllow = (e) => { e.preventDefault(); enableMic(); };
  micAllow.addEventListener('click', doAllow);
  micAllow.addEventListener('touchend', doAllow);
}
if (micDeny) {
  const doDeny = (e) => { e.preventDefault(); hideMicModal(); };
  micDeny.addEventListener('click', doDeny);
  micDeny.addEventListener('touchend', doDeny);
}

// ── Visibility change: clean up mic when page goes background ──
// Some mobile browsers stop mic streams when the page is hidden;
// others keep them running but return stale data. Proactively disable.
document.addEventListener('visibilitychange', () => {
  if (document.hidden && micActive) {
    console.log('Page hidden — pausing mic to conserve resources');
    disableMic();
  }
});

// ─── FULLSCREEN TOGGLE ───
// Uses the Fullscreen API (desktop) and falls back gracefully.
// iOS Safari doesn't support Fullscreen API on the document, but
// webkit supports it on <video> elements. For non-video we just
// let the button be a no-op on iOS — the PWA / Add-to-Home-Screen
// path already runs fullscreen via the viewport-fit=cover meta tag.
const fsToggle = $('fsToggle');

function isFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}

function updateFsIcon() {
  if (fsToggle) {
    const fs = isFullscreen();
    fsToggle.classList.toggle('is-fs', fs);
    fsToggle.setAttribute('aria-pressed', String(fs));
  }
}

function handleFsToggle(e) {
  if (e) e.preventDefault();
  try {
    if (isFullscreen()) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      const el = document.documentElement;
      const rfs = el.requestFullscreen || el.webkitRequestFullscreen;
      if (rfs) rfs.call(el);
    }
  } catch (err) {
    console.warn('Fullscreen toggle failed:', err);
  }
}

// Hide fullscreen button on platforms where the API doesn't work.
// iOS Safari has no Fullscreen API for non-video elements; the button
// would do nothing. Users can "Add to Home Screen" for a fullscreen PWA.
(function initFsToggle() {
  if (!fsToggle) return;
  const el = document.documentElement;
  const hasFullscreen = !!(el.requestFullscreen || el.webkitRequestFullscreen);
  if (!hasFullscreen) {
    fsToggle.style.display = 'none';
    /* Flex .hud-bottom-cluster reflows — no manual left offsets */
    return;
  }
  fsToggle.addEventListener('click', handleFsToggle);
  fsToggle.addEventListener('touchend', handleFsToggle);
})();
// Sync icon when user exits fullscreen via Escape or browser chrome
document.addEventListener('fullscreenchange', updateFsIcon);
document.addEventListener('webkitfullscreenchange', updateFsIcon);

// ─── LAYER-ADAPTIVE PANEL OPACITY ───
// Panel darkens progressively toward the bright inner layers
// so text stays readable against luminous core geometry.
const PANEL_BASE_ALPHA = 0.44;
const PANEL_DEPTH_BOOST = 0.242; // ~10% stronger panel vs prior 0.40 / 0.22

function updatePanelOpacity(layerIndex) {
  if (!teachingPanel) return;
  const depth = layerIndex / (LAYER_COUNT - 1); // 0 = outer, 1 = core
  const alpha = Math.min(PANEL_BASE_ALPHA + depth * PANEL_DEPTH_BOOST, 0.90);
  // Radial gradient: full alpha in center where text lives, fades at edges
  const edgeAlpha = (alpha * 0.10).toFixed(2);
  teachingPanel.style.background =
    `radial-gradient(ellipse at 50% 50%, rgba(8,6,14,${alpha.toFixed(2)}) 30%, rgba(8,6,14,${edgeAlpha}) 90%, transparent 100%)`;
}

// Enter button
function handleEnter(e) {
  if (e) e.preventDefault();
  entered = true;
  if (welcome) welcome.classList.add('hidden');
  if (exitBtn) exitBtn.classList.add('visible');
  if (canvas) {
    try { canvas.style.touchAction = 'none'; } catch (_) {}
  }
  goToLayer(0);
  if (teachingWrap) teachingWrap.classList.add('teaching-wrap--in-scene');
  initAudio();  // user gesture — safe to start audio
  // Same user gesture is required on iOS to request motion permission.
  initGyroBackgroundParallax();
  // Auto-calibrate neutral hold for the first moment in-scene.
  gyroBg.baseGamma = gyroBg.filtGamma || 0;
  gyroBg.baseBeta = gyroBg.filtBeta || 0;
  gyroBg.calibrating = true;
  gyroBg.calibrateMs = 0;
}

function resetToSplash() {
  clearTimeout(showLayerTitle._timer);
  clearTimeout(showLayerTitle._breathTimer);
  hideSliderTooltip();
  if (layerTitle) layerTitle.classList.remove('visible', 'dissolve-out');
  if (teachingPanel) {
    teachingPanel.classList.remove('visible');
    teachingPanel.scrollTop = 0;
  }
  if (teachingInner) teachingInner.innerHTML = '';
  visitedLayers.clear();
  targetLayer = 0;
  currentLayer = 0;
  const targetZ = (LAYER_COUNT - 1) * LAYER_SPACING;
  targetCameraZ = targetZ + 6;
  cameraZ = targetCameraZ;
  isTransitioning = false;
  userOrbitAngle = 0;
  targetOrbitAngle = 0;
  userZoom = 1;
  targetZoom = 1;
  entered = false;
  updateSliderPosition(0);
  if (welcome) welcome.classList.remove('hidden');
  if (exitBtn) exitBtn.classList.remove('visible');
  if (teachingWrap) {
    teachingWrap.classList.remove('teaching-wrap--in-scene', 'teaching-wrap--collapsed');
  }
  if (teachingPanelToggle) {
    teachingPanelToggle.setAttribute('aria-expanded', 'true');
    teachingPanelToggle.setAttribute('aria-label', 'Hide key ideas panel');
    teachingPanelToggle.title = 'Hide key ideas';
  }
  if (canvas) {
    try { canvas.style.touchAction = 'pinch-zoom'; } catch (_) {}
  }
  try {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    }
  } catch (_) { /* ignore */ }
  if (micActive) disableMic();
}

let lastExitTime = 0;
function handleExitToSplash(e) {
  if (e) e.preventDefault();
  const now = Date.now();
  if (now - lastExitTime < 320) return;
  lastExitTime = now;
  resetToSplash();
}

if (enterBtn) {
  enterBtn.addEventListener('click', handleEnter);
  enterBtn.addEventListener('touchend', handleEnter);
}
if (exitBtn) {
  exitBtn.addEventListener('click', handleExitToSplash);
  exitBtn.addEventListener('touchend', handleExitToSplash);
}

// ─── MOTION CONTROL (gesture-only, non-intrusive) ───
// Long-press the "breathe" word to recenter (recalibrate baseline).
// Double-tap it to toggle motion on/off.
(function bindBreathMotionGestures() {
  if (!breathEl) return;
  let pressTimer = 0;
  let lastTapAt = 0;
  const LONG_MS = 520;
  const TAP_MS = 320;

  const clear = () => {
    if (pressTimer) { clearTimeout(pressTimer); pressTimer = 0; }
  };

  const recenter = () => {
    gyroBg.baseGamma = gyroBg.filtGamma || 0;
    gyroBg.baseBeta = gyroBg.filtBeta || 0;
    gyroBg.calibrating = true;
    gyroBg.calibrateMs = 0;
  };

  const toggleMotion = () => {
    gyroBg.motionOn = !gyroBg.motionOn;
    if (!gyroBg.motionOn) {
      gyroBg.targetYaw = 0; gyroBg.targetPitch = 0;
      gyroBg.yaw = 0; gyroBg.pitch = 0;
      gyroBg.gravVX = 0; gyroBg.gravVY = 0;
      gyroBg.parX = 0; gyroBg.parY = 0;
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
})();

// ─── ROBUST RESIZE — works with iOS safe-area, dynamic toolbar, notch ───
function handleResize() {
  if (!renderer || !camera) return;
  try {
    // Use visualViewport when available (iOS Safari, Android Chrome)
    const vv = window.visualViewport;
    const w = vv ? vv.width  : window.innerWidth;
    const h = vv ? vv.height : window.innerHeight;

    // Set the WebGL drawing-buffer size but do NOT touch CSS inline styles
    // (third arg `false`) — our CSS already handles layout via 100vw/100dvh
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  } catch (e) { console.warn('Resize handler error:', e); }
}

window.addEventListener('resize', handleResize);

// visualViewport: coalesce resize + scroll — iOS Safari / Chrome sometimes update
// layout on scroll when the URL bar shows or hides without a window "resize".
let _vvResizeRaf = null;
function scheduleViewportResize() {
  if (_vvResizeRaf != null) return;
  _vvResizeRaf = requestAnimationFrame(() => {
    _vvResizeRaf = null;
    handleResize();
  });
}
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', scheduleViewportResize);
  window.visualViewport.addEventListener('scroll', scheduleViewportResize);
}
// Also re-check on orientation change (Android + iOS fallback)
window.addEventListener('orientationchange', () => {
  setTimeout(handleResize, 150);  // slight delay for layout to settle
});

// ─── EVOLUTION — fixed laws; state = genesis + user + time (ontology unchanged) ───
// ─── ANIMATION LOOP (fault-isolated — no single subsystem can kill the loop) ───
function animate() {
  requestAnimationFrame(animate);

  // Skip rendering while WebGL context is lost — GPU will restore on its own
  if (contextLost) return;

  const rawDt = clock.getDelta();
  const dt = Math.min(rawDt, MAX_DT);          // clamp: prevent physics explosions on tab-resume
  const elapsed = clock.getElapsedTime();

  // Reduced-motion: scale continuous animations to 5% speed (not zero — the
  // scene should still feel alive, just calm enough to avoid vestibular triggers)
  const motionScale = prefersReducedMotion ? 0.05 : 1.0;

  // ── Quiet stillness response (mobile gyro) ──
  // When the device is held steady for ~5–10s, we gently reduce background drift
  // and micro-bob so the whole field feels safer and calmer (no explicit prompts).
  let stillCalm = 0; // 0..1
  try {
    const ms = (gyroBg && gyroBg.enabled && gyroBg.motionOn && Number.isFinite(gyroBg.stillMs)) ? gyroBg.stillMs : 0;
    // Fade in from 5s → 10s of stillness.
    const t = Math.max(0, Math.min(1, (ms - 5000) / 5000));
    // Smoothstep for a soft onset.
    stillCalm = t * t * (3 - 2 * t);
  } catch (_) {}
  const calmMul = 1 - stillCalm * 0.28; // up to ~28% calmer when held still

  // ── Audio-reactive breath signal ──
  updateAudioBreath();

  // Slow Gaussian-like volume swell (meditation + ocean) — after intro fade, LFO runs every frame
  if (audioReady && !audioMuted && ambientIntroFade >= 1) {
    try {
      refreshAmbientGains(dt);
    } catch (_) {}
  }
  // audioBreath is 0..1, heavily smoothed, wide distribution
  // b = breath intensity for use throughout the loop
  // Final NaN guard: if anything upstream corrupted the value, clamp to 0
  const bRaw = Number.isFinite(audioBreath) ? Math.max(0, Math.min(1, audioBreath)) : 0;
  const b = Math.max(0, Math.min(1, bRaw + INITIAL_CONDITIONS.breathCoupling.baselineOffset));

  // ── Lerp user controls ──
  const ctrlLerp = 1 - Math.exp(-8 * dt);          // smooth ~8 Hz exponential ease
  userOrbitAngle += (targetOrbitAngle - userOrbitAngle) * ctrlLerp;
  userZoom       += (targetZoom       - userZoom)       * ctrlLerp;

  // ── Auto-orbit resume: decay user offset after idle ──
  // After ORBIT_IDLE_DELAY seconds of no user orbit input, gently
  // ease targetOrbitAngle back toward 0 so the auto-drift takes over.
  const idleTime = elapsed - lastOrbitInputTime;
  if (idleTime > ORBIT_IDLE_DELAY && Math.abs(targetOrbitAngle) > 0.001) {
    targetOrbitAngle *= (1 - ORBIT_DECAY_RATE * dt);
    if (Math.abs(targetOrbitAngle) < 0.001) targetOrbitAngle = 0;
  }

  // Camera Z interpolation (layer navigation)
  const lerpSpeed = isTransitioning ? 1.8 : 2.5;
  cameraZ += (targetCameraZ - cameraZ) * dt * lerpSpeed;

  // ── Combined orbit: gentle auto-drift + user orbit ──
  const autoAngle = elapsed * 0.08 * motionScale * calmMul;
  const genAz = (camera && camera.userData && camera.userData.genesisAzimuth) || 0;
  const genEl = (camera && camera.userData && camera.userData.genesisElevation) || 0;
  const totalAngle = autoAngle + userOrbitAngle + genAz;

  // Depth cue 3: parallax micro-bob — two overlapping frequencies create
  // differential parallax between near and far objects
  // Audio-reactive: breath gently amplifies the bob (1.0—1.15x)
  const bobBreathMul = 1.0 + b * 0.15;
  const bobX = (Math.sin(totalAngle) * BASE_ORBIT_RADIUS * bobBreathMul
             + Math.sin(elapsed * 0.23) * 0.6) * motionScale * calmMul;    // slow lateral drift
  const bobY = (Math.cos(elapsed * 0.12) * BASE_ORBIT_RADIUS * 0.5 * bobBreathMul
             + Math.cos(elapsed * 0.17) * 0.4) * motionScale * calmMul;    // secondary vertical drift

  camera.position.x = bobX;
  camera.position.y = bobY + genEl * 6;

  // ── Zoom: offset camera Z relative to target layer ──
  //   userZoom 1.0 = default (+6 above layer)   <1 = closer   >1 = farther
  //   maps zoom range [0.55..1.6] to Z-offset [-4..+18]
  const zoomOffset = 6 + (userZoom - 1) * 20;     // default 6, zoom-in → −2, zoom-out → +18
  camera.position.z = cameraZ + (zoomOffset - 6);  // cameraZ already targets layer+6
  camera.lookAt(0, 0, camera.position.z - 12);

  // Check transition completion
  if (isTransitioning) {
    transitionTimer += dt;
    if (Math.abs(cameraZ - targetCameraZ) < 0.3) {
      currentLayer = targetLayer;
      isTransitioning = false;
    }
  }

  // Fog color for atmospheric perspective (cue 6)
  // Audio-reactive: breath warms the fog ever so slightly toward deep amber
  const fogColor = _fogBase.clone();
  if (b > 0.01) {
    fogColor.lerp(_fogWarm, b * 0.3);
  }

  // Animate orbital groups
  try {
  orbitalGroups.forEach((group, i) => {
    const layer = LAYERS[i];
    const baseSpeed = 0.15 + i * 0.03;
    // Audio-reactive: breath subtly modulates rotation speed (1.0—1.12x)
    const speed = baseSpeed * (1.0 + b * 0.12) * motionScale;
    const dir = i % 2 === 0 ? 1 : -1;

    // ── Depth cue 1: slow gyroscopic precession ──
    // Each group's base tilt was set in buildLayers; here we add slow
    // wobble so the ellipse orientation shifts over time, like a gyroscope
    const bt = group.userData.baseTilt || { x: 0, y: 0, z: 0 };
    const precRate = 0.015 + i * 0.005;  // inner layers precess slightly faster
    const gYaw = group.userData.genesisYaw || 0;
    const gPrec = group.userData.genesisPrecession || 0;
    const gRotZ = INITIAL_CONDITIONS.layerPhase.globalRotationPhase;
    group.rotation.x = bt.x + Math.sin(elapsed * precRate)          * 0.08 + gPrec;
    group.rotation.y = bt.y + Math.cos(elapsed * precRate * 0.7)    * 0.06 + gYaw;
    group.rotation.z = bt.z + gRotZ;
    // z-rotation left to child-level orbital spin below

    // Rotate orbitals
    group.children.forEach((child, ci) => {
      if (child.isMesh) {
        child.rotation.z += dt * speed * dir * (ci === 0 ? 1 : ci === 1 ? -0.7 : 0.5);
        child.rotation.x += dt * speed * 0.1 * dir;
      }
      if (child.isLineSegments) {
        child.rotation.z += dt * speed * 0.3 * -dir;
      }
    });

    // Particle orbital motion + Z-axis drift (depth cue 4)
    const particles = particleSystems[i];
    if (particles && particles.geometry && particles.geometry.attributes.position) {
      const positions = particles.geometry.attributes.position;
      const count = positions.count;
      for (let p = 0; p < count; p++) {
        let x = positions.getX(p);
        let y = positions.getY(p);
        let z = positions.getZ(p);
        const velScale = particles.userData && Number.isFinite(particles.userData.velocityBiasScale)
          ? particles.userData.velocityBiasScale
          : 1;
        const angle = Math.atan2(y, x) + dt * speed * 0.5 * dir * velScale;
        const r = Math.sqrt(x * x + y * y);
        positions.setX(p, SAFE_NUM(Math.cos(angle) * r));
        positions.setY(p, SAFE_NUM(Math.sin(angle) * r));
        // Cue 4: sinusoidal Z drift — each particle floats forward/back
        // Audio-reactive: breath amplifies Z drift (1.0—1.3x)
        const zDrift = Math.sin(elapsed * 0.4 + p * 0.37) * 0.03 * (1.0 + b * 0.3);
        positions.setZ(p, SAFE_NUM(z + zDrift));
      }
      positions.needsUpdate = true;
    }

    // Proximity-based opacity + depth lighting + atmospheric perspective
    const distFromCamera = Math.abs(group.position.z - camera.position.z + 6);
    const fadeStart = LAYER_SPACING * 1.5;
    const fadeEnd = LAYER_SPACING * 4;
    let opacity;
    if (distFromCamera < fadeStart) {
      opacity = 1;
    } else if (distFromCamera < fadeEnd) {
      opacity = 1 - (distFromCamera - fadeStart) / (fadeEnd - fadeStart);
    } else {
      opacity = 0;
    }

    // ── Depth cue 2: emissive intensity scales with proximity ──
    // Near layers glow brighter; far layers dim to near-zero emissive
    // Audio-reactive: breath boosts emissive warmth (quadratic + breath lift)
    const emissiveScale = opacity * opacity + b * 0.18;  // breath adds up to 18% emissive lift

    // ── Depth cue 6: atmospheric desaturation for distant layers ──
    // Lerp material color toward fog color as distance increases
    const atmosFactor = 1 - opacity;  // 0 = near, 1 = far

    group.children.forEach(child => {
      if (child.material) {
        if (child.isSprite) {
          // Depth glow halo (cue 5): bright when near, invisible when far
          child.material.opacity = opacity * 0.15;  // subtle bloom
        } else {
          child.material.opacity = child.userData.baseOpacity !== undefined
            ? child.userData.baseOpacity * opacity
            : opacity * 0.7;
        }

        // Depth-dependent emissive (cue 2) + audio-reactive warmth
        if (child.material.emissiveIntensity !== undefined && child.isMesh) {
          // Base emissive + breath lift: breath raises the floor and adds warmth
          child.material.emissiveIntensity = 0.55 * emissiveScale + 0.05 + b * 0.12;
        }

        // Atmospheric color shift (cue 6) — only on mesh materials
        if (child.material.color && child.isMesh && group.userData.baseColor) {
          child.material.color.copy(group.userData.baseColor).lerp(fogColor, atmosFactor * 0.4);
        }
        if (child.material.emissive && child.isMesh && group.userData.baseEmissive) {
          child.material.emissive.copy(group.userData.baseEmissive).lerp(fogColor, atmosFactor * 0.3);
          // Audio-reactive: breath shifts emissive toward warm gold
          if (b > 0.01) {
            child.material.emissive.lerp(_warmGold, b * 0.08);
          }
        }
      }
    });
  });
  } catch (e) { /* orbital animation fault-isolated */ }

  // Core breathing — pulsing heart of the mandala
  try {
  if (coreGlow && coreGlow.material) {
    // Audio-reactive: breath lifts core glow opacity and scale
    const breathe = 0.2 + Math.sin(elapsed * 0.5) * 0.1 + b * 0.08;
    coreGlow.material.opacity = breathe;
    const s = 1 + Math.sin(elapsed * 0.5) * 0.15 + b * 0.06;
    coreGlow.scale.set(s, s, s);
    // Outer halo breathes in counter-phase
    if (coreGlow.userData.halo && coreGlow.userData.halo.material) {
      const hs = 1 + Math.sin(elapsed * 0.35) * 0.2;
      coreGlow.userData.halo.scale.set(hs, hs, hs);
      coreGlow.userData.halo.material.opacity = 0.06 + Math.sin(elapsed * 0.35 + 1) * 0.03;
    }
  }
  } catch (e) { /* core glow fault-isolated */ }

  // ── Per-star twinkle — individual shimmer at different rates ──
  if (nebulaStars && starTwinklePhases) {
    try {
      const sizes  = nebulaStars.geometry.attributes.size;
      const count  = sizes.count;
      // Update a rolling batch per frame (~350) to keep CPU light
      const batchSize = Math.min(350, count);
      const offset = Math.floor(elapsed * 20) * batchSize % count;
      for (let i = 0; i < batchSize; i++) {
        const idx = (offset + i) % count;
        const phase = starTwinklePhases[idx] + elapsed * starTwinkleSpeeds[idx];
        // Composite flicker: primary sine + secondary harmonic
        const flicker = 0.85 + Math.sin(phase) * 0.15 + Math.sin(phase * 2.7) * 0.04;
        sizes.setX(idx, starBaseOpacities[idx] * flicker);
      }
      sizes.needsUpdate = true;

      // Global rotation + opacity drift (keep existing behaviour)
      // Audio-reactive: breath subtly brightens star field
      const ambT = elapsed + INITIAL_CONDITIONS.breathCoupling.ambientPhaseNudge;
      nebulaStars.material.opacity = 0.88 + Math.sin(ambT * 0.6) * 0.1 + b * 0.06;
      nebulaStars.rotation.z += dt * 0.002 * motionScale;
      nebulaStars.rotation.y += dt * 0.0008 * motionScale;
    } catch (e) { /* per-star twinkle graceful fallback */ }
  }

  // ── Shooting stars — occasional meteor streaks ──
  try {
    // Spawn check: ~one every 4–8 seconds
    const shootScale = Math.max(0.4, INITIAL_CONDITIONS.ambientEvents.firstShootingStarDelayScale);
    if (shootingStars.length > 0 && Math.random() < (dt * 0.18 * motionScale) / shootScale) {
      const inactive = shootingStars.find(s => !s.userData.active);
      if (inactive) {
        const d = inactive.userData;
        d.active = true;
        d.life = 0;
        d.maxLife = 1.0 + Math.random() * 1.5;  // 1–2.5 seconds
        d.tailLength = 3 + Math.random() * 6;
        // Spawn on a random arc around the camera's current view
        const spawnAngle = Math.random() * TAU;
        const spawnR = 40 + Math.random() * 60;
        const spawnZ = camera.position.z + (Math.random() - 0.5) * 60;
        d.startPos.set(
          Math.cos(spawnAngle) * spawnR,
          Math.sin(spawnAngle) * spawnR,
          spawnZ
        );
        // Velocity: inward and slightly downward
        d.velocity.set(
          -Math.cos(spawnAngle) * (15 + Math.random() * 20),
          -Math.sin(spawnAngle) * (15 + Math.random() * 20) - 3,
          (Math.random() - 0.5) * 10
        );
      }
    }

    shootingStars.forEach(trail => {
      const d = trail.userData;
      if (!d.active) return;
      d.life += dt;
      const t = d.life / d.maxLife;   // 0→1
      if (t >= 1) {
        d.active = false;
        trail.material.opacity = 0;
        return;
      }
      // Position: head moves along velocity
      const headX = d.startPos.x + d.velocity.x * d.life;
      const headY = d.startPos.y + d.velocity.y * d.life;
      const headZ = d.startPos.z + d.velocity.z * d.life;
      // Tail trails behind
      const tailFrac = Math.min(1, d.life * 3); // tail grows in
      const tailX = headX - d.velocity.x * 0.08 * d.tailLength * tailFrac;
      const tailY = headY - d.velocity.y * 0.08 * d.tailLength * tailFrac;
      const tailZ = headZ - d.velocity.z * 0.08 * d.tailLength * tailFrac;

      const pos = trail.geometry.attributes.position;
      pos.setXYZ(0, tailX, tailY, tailZ);
      pos.setXYZ(1, headX, headY, headZ);
      pos.needsUpdate = true;

      // Fade: bright in the middle, fade in and out
      const fade = t < 0.15 ? t / 0.15 : t > 0.6 ? (1 - t) / 0.4 : 1;
      trail.material.opacity = fade * 0.45;
    });
  } catch (e) { /* shooting stars graceful fallback */ }

  // ── Cosmic dust ring — glacial rotation + per-particle breathing ──
  if (cosmicDust) {
    try {
      cosmicDust.rotation.y += dt * 0.003 * motionScale;
      cosmicDust.rotation.x += dt * 0.0005 * motionScale;

      // Per-particle size animation — subtle transparency variation
      // Updates a rolling batch per frame to keep CPU light
      if (dustParticlePhases) {
        const dustSizes = cosmicDust.geometry.attributes.size;
        const dustCount = dustSizes.count;
        const dustBatch = Math.min(200, dustCount);
        const dustOffset = Math.floor(elapsed * 8) * dustBatch % dustCount;
        for (let i = 0; i < dustBatch; i++) {
          const idx = (dustOffset + i) % dustCount;
          const phase = dustParticlePhases[idx]
            + (elapsed + INITIAL_CONDITIONS.ambientEvents.cosmicDustPhaseOffset) * dustParticleSpeeds[idx];
          // Gentle breathing: +-20% around base size
          const breath = 0.8 + Math.sin(phase) * 0.2 + Math.sin(phase * 1.7) * 0.06;
          dustSizes.setX(idx, dustBaseOpacities[idx] * breath);
        }
        dustSizes.needsUpdate = true;
      }

      // Global opacity still drifts gently
      cosmicDust.material.opacity = 0.12 + Math.sin(elapsed * 0.25) * 0.03;
    } catch (e) { /* cosmic dust fallback */ }
  }

  // ── Radiant stars — slow Cepheid-like pulsing ──
  if (radiantStars && radiantPulsePhases) {
    try {
      const rSizes = radiantStars.geometry.attributes.size;
      const rCount = rSizes.count;
      for (let i = 0; i < rCount; i++) {
        const phase = radiantPulsePhases[i] + elapsed * radiantPulseSpeeds[i];
        // Smooth sinusoidal pulse: size breathes between 70% and 130%
        const pulse = 0.7 + Math.sin(phase) * 0.3 + Math.sin(phase * 0.37) * 0.08;
        rSizes.setX(i, radiantBaseSizes[i] * pulse);
      }
      rSizes.needsUpdate = true;
      // Gentle global opacity sway + follow star field rotation
      radiantStars.material.opacity = 0.8 + Math.sin(elapsed * 0.4) * 0.15 + b * 0.05;
      radiantStars.rotation.z += dt * 0.002 * motionScale;
      radiantStars.rotation.y += dt * 0.0008 * motionScale;
    } catch (e) { /* radiant stars fallback */ }
  }

  // ── Radiance trails — illuminated dust wakes behind moving stars ──
  if (radiantTrails && radiantTrailData && radiantStars) {
    try {
      const trailPos = radiantTrails.geometry.attributes.position;
      const starPos  = radiantStars.geometry.attributes.position;
      const SAMPLE_INTERVAL = 0.12; // seconds between history samples

      // We need the radiant stars' world matrix to transform local → world
      radiantStars.updateMatrixWorld();
      const wm = radiantStars.matrixWorld;

      for (let t = 0; t < radiantTrailData.length; t++) {
        const td = radiantTrailData[t];
        const si = td.starIdx;

        // Get star's LOCAL position from the geometry
        const lx = starPos.getX(si);
        const ly = starPos.getY(si);
        const lz = starPos.getZ(si);

        // Transform to world space using the group's rotation matrix
        // matrixWorld elements: e[0..3]=col0, e[4..7]=col1, e[8..11]=col2, e[12..15]=col3
        const e = wm.elements;
        const wx = e[0]*lx + e[4]*ly + e[8]*lz  + e[12];
        const wy = e[1]*lx + e[5]*ly + e[9]*lz  + e[13];
        const wz = e[2]*lx + e[6]*ly + e[10]*lz + e[14];

        // Accumulate time; when enough passes, shift history and record new position
        td.sampleAccum += dt;
        if (td.sampleAccum >= SAMPLE_INTERVAL) {
          td.sampleAccum -= SAMPLE_INTERVAL;
          // Shift history: drop oldest, add newest at front
          for (let h = td.history.length - 1; h > 0; h--) {
            td.history[h].x = td.history[h - 1].x;
            td.history[h].y = td.history[h - 1].y;
            td.history[h].z = td.history[h - 1].z;
          }
          td.history[0].x = wx;
          td.history[0].y = wy;
          td.history[0].z = wz;
        }

        // Write history positions into the trail geometry
        // Interpolate head (j=0) toward current world pos for smoothness
        for (let j = 0; j < TRAIL_LENGTH; j++) {
          const pi = (td.baseOffset + j) * 3;
          if (j === 0) {
            // Head tracks the star exactly (no lag)
            trailPos.array[pi]     = wx;
            trailPos.array[pi + 1] = wy;
            trailPos.array[pi + 2] = wz;
          } else {
            trailPos.array[pi]     = td.history[j].x;
            trailPos.array[pi + 1] = td.history[j].y;
            trailPos.array[pi + 2] = td.history[j].z;
          }
        }
      }
      trailPos.needsUpdate = true;

      // Subtle global opacity pulse — breathes with the dust
      radiantTrails.material.opacity = 0.15 + Math.sin(elapsed * 0.3) * 0.04;
    } catch (e) { /* radiant trails fallback */ }
  }

  // ── Nebula cloud drift + luminosity breathing ──
  nebulaClouds.forEach((sprite, ci) => {
    const spd = sprite.userData.driftSpeed;
    sprite.userData.driftAngle += dt * spd;
    sprite.position.x += Math.sin(sprite.userData.driftAngle) * dt * 0.15;
    sprite.position.y += Math.cos(sprite.userData.driftAngle * 1.3) * dt * 0.1;
    try {
      const base = sprite.userData.baseOpacity || 0.03;
      const breath = 1.0 + Math.sin(elapsed * 0.12 + ci * 1.1) * 0.15;
      sprite.material.opacity = Math.max(0.005, Math.min(base * 2.0, base * breath));
    } catch (e) { /* cloud breathing fallback */ }
  });

  // Optional gyro parallax: affects only background meshes/sprites.
  try { applyGyroBackgroundParallax(dt, b, currentLayer); } catch (_) {}

  // NaN guard — if camera position corrupted, reset to last known-good
  if (!Number.isFinite(camera.position.z)) {
    camera.position.set(0, 0, cameraZ);
  }

  try { renderer.render(scene, camera); } catch (e) { /* render fault-isolated */ }
}

// ─── START ───
try {
  init();
} catch (e) {
  console.error('Mandala init failed:', e);
  // Show a graceful message instead of a blank screen
  if (welcome) {
    welcome.classList.remove('hidden');
    const sub = welcome.querySelector('.welcome-sub');
    if (sub) sub.textContent = 'requires WebGL — try a different browser';
    const btn = welcome.querySelector('.enter-btn');
    if (btn) btn.style.display = 'none';
  }
}
