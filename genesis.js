/**
 * GENESIS — bounded initial conditions + one-time applier (variable relation only).
 */
import { LAYER_COUNT, TAU } from './ontology.js?v=deploy-2026-04-13';

// ─── GENESIS (Accipio Ludo in code) — session seed + bounded initial conditions ───
// Structure accepted whole; freedom = lawful variation of starting coordinates only.
// Replay: set window.__FM3D_SEED__ (string) before this module loads.
const GENESIS_VERSION = 1;
const CANONICAL_GENESIS_SEED = 'fm3d-canonical-v1';

function genesisClamp(v, lo, hi, fb = 0) {
  const n = Number.isFinite(v) ? v : fb;
  return Math.min(hi, Math.max(lo, n));
}

function hashString32(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function rngBetween(rng, lo, hi, fb = 0) {
  const a = Number.isFinite(lo) ? lo : fb;
  const b = Number.isFinite(hi) ? hi : fb;
  return a + (b - a) * rng();
}

function rngSigned(rng, mag, fb = 0) {
  const m = Number.isFinite(mag) ? mag : fb;
  return rngBetween(rng, -m, m, 0);
}

// Envelopes: outward rigor that makes inward variation trustworthy (same gesture, two scales).
const GENESIS_BOUNDS = Object.freeze({
  maxCameraAzimuthDeg: 12,
  maxCameraElevationDeg: 6,
  maxLayerYawDeg: 10,
  maxParticleZBias: 1.5,
  maxDriftBias: 0.08,
  maxBrightnessBias: 0.08,
  maxEventDelayScaleDelta: 0.25,
});

const CANONICAL_INITIAL_CONDITIONS = Object.freeze({
  version: GENESIS_VERSION,
  seed: CANONICAL_GENESIS_SEED,
  canonicalFallback: true,
  invariants: Object.freeze({
    preserveLayerOrder: true,
    preserveLayerCount: LAYER_COUNT,
    preserveTextContent: true,
    preserveGeometryMapping: true,
    preserveColorIdentity: true,
    preserveNavigationSemantics: true,
  }),
  camera: Object.freeze({
    azimuthOffset: 0,
    elevationOffset: 0,
    rollOffset: 0,
    distanceScale: 1,
  }),
  layerPhase: Object.freeze({
    globalRotationPhase: 0,
    perLayerYawOffsets: Object.freeze([]),
    perLayerPrecessionOffsets: Object.freeze([]),
  }),
  particles: Object.freeze({
    radialJitterScale: 1,
    angularPhaseOffset: 0,
    zBias: 0,
    driftBiasX: 0,
    driftBiasY: 0,
    driftBiasZ: 0,
    velocityBiasScale: 1,
  }),
  stars: Object.freeze({
    seedOffset: 0,
    twinklePhaseOffset: 0,
    brightnessBias: 0,
    spatialSkewX: 0,
    spatialSkewY: 0,
  }),
  ambientEvents: Object.freeze({
    firstShootingStarDelayScale: 1,
    nebulaPhaseOffset: 0,
    cosmicDustPhaseOffset: 0,
  }),
  breathCoupling: Object.freeze({
    ambientPhaseNudge: 0,
    baselineOffset: 0,
  }),
  bounds: GENESIS_BOUNDS,
});

function buildInitialConditions(layerCount = LAYER_COUNT) {
  try {
    const sessionSeed =
      typeof window !== 'undefined' && window.__FM3D_SEED__ != null && String(window.__FM3D_SEED__).length
        ? String(window.__FM3D_SEED__)
        : `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;
    const seed32 = hashString32(sessionSeed);
    const rng = mulberry32(seed32);

    const yawMax = TAU * (GENESIS_BOUNDS.maxLayerYawDeg / 360);
    const precMax = TAU * (8 / 360);
    const perLayerYawOffsets = Array.from({ length: layerCount }, () => rngSigned(rng, yawMax));
    const perLayerPrecessionOffsets = Array.from({ length: layerCount }, () => rngSigned(rng, precMax));

    return Object.freeze({
      version: GENESIS_VERSION,
      seed: sessionSeed,
      canonicalFallback: false,
      invariants: CANONICAL_INITIAL_CONDITIONS.invariants,
      camera: Object.freeze({
        azimuthOffset: rngSigned(rng, TAU * (GENESIS_BOUNDS.maxCameraAzimuthDeg / 360)),
        elevationOffset: rngSigned(rng, TAU * (GENESIS_BOUNDS.maxCameraElevationDeg / 360)),
        rollOffset: rngSigned(rng, TAU * (1.5 / 360)),
        distanceScale: genesisClamp(rngBetween(rng, 0.985, 1.015), 0.985, 1.015, 1),
      }),
      layerPhase: Object.freeze({
        globalRotationPhase: rngBetween(rng, 0, TAU, 0),
        perLayerYawOffsets: Object.freeze(perLayerYawOffsets),
        perLayerPrecessionOffsets: Object.freeze(perLayerPrecessionOffsets),
      }),
      particles: Object.freeze({
        radialJitterScale: genesisClamp(rngBetween(rng, 0.92, 1.08), 0.92, 1.08, 1),
        angularPhaseOffset: rngBetween(rng, 0, TAU, 0),
        zBias: genesisClamp(rngSigned(rng, GENESIS_BOUNDS.maxParticleZBias), -GENESIS_BOUNDS.maxParticleZBias, GENESIS_BOUNDS.maxParticleZBias, 0),
        driftBiasX: genesisClamp(rngSigned(rng, GENESIS_BOUNDS.maxDriftBias), -GENESIS_BOUNDS.maxDriftBias, GENESIS_BOUNDS.maxDriftBias, 0),
        driftBiasY: genesisClamp(rngSigned(rng, GENESIS_BOUNDS.maxDriftBias), -GENESIS_BOUNDS.maxDriftBias, GENESIS_BOUNDS.maxDriftBias, 0),
        driftBiasZ: genesisClamp(rngSigned(rng, GENESIS_BOUNDS.maxDriftBias), -GENESIS_BOUNDS.maxDriftBias, GENESIS_BOUNDS.maxDriftBias, 0),
        velocityBiasScale: genesisClamp(rngBetween(rng, 0.96, 1.04), 0.96, 1.04, 1),
      }),
      stars: Object.freeze({
        seedOffset: seed32 >>> 0,
        twinklePhaseOffset: rngBetween(rng, 0, TAU, 0),
        brightnessBias: genesisClamp(rngSigned(rng, GENESIS_BOUNDS.maxBrightnessBias), -GENESIS_BOUNDS.maxBrightnessBias, GENESIS_BOUNDS.maxBrightnessBias, 0),
        spatialSkewX: genesisClamp(rngSigned(rng, 0.04), -0.04, 0.04, 0),
        spatialSkewY: genesisClamp(rngSigned(rng, 0.04), -0.04, 0.04, 0),
      }),
      ambientEvents: Object.freeze({
        firstShootingStarDelayScale: genesisClamp(rngBetween(rng, 0.85, 1.25), 0.85, 1.25, 1),
        nebulaPhaseOffset: rngBetween(rng, 0, TAU, 0),
        cosmicDustPhaseOffset: rngBetween(rng, 0, TAU, 0),
      }),
      breathCoupling: Object.freeze({
        ambientPhaseNudge: rngSigned(rng, TAU * (4 / 360)),
        baselineOffset: genesisClamp(rngSigned(rng, 0.03), -0.03, 0.03, 0),
      }),
      bounds: GENESIS_BOUNDS,
    });
  } catch (err) {
    console.warn('Genesis fallback:', err);
    return CANONICAL_INITIAL_CONDITIONS;
  }
}

const INITIAL_CONDITIONS = buildInitialConditions(LAYER_COUNT);
function applyInitialConditions(ctx) {
  const ic = (ctx && ctx.initialConditions) || INITIAL_CONDITIONS || CANONICAL_INITIAL_CONDITIONS;
  if (!ctx) return;
  try {
    if (ctx.camera) {
      try {
        ctx.camera.rotation.z += ic.camera.rollOffset;
      } catch (_) { /* noop */ }
      try {
        ctx.camera.position.multiplyScalar(ic.camera.distanceScale);
      } catch (_) { /* noop */ }
      try {
        ctx.camera.userData = ctx.camera.userData || {};
        ctx.camera.userData.genesisAzimuth = ic.camera.azimuthOffset;
        ctx.camera.userData.genesisElevation = ic.camera.elevationOffset;
      } catch (_) { /* noop */ }
    }

    if (Array.isArray(ctx.orbitalGroups)) {
      ctx.orbitalGroups.forEach((group, i) => {
        try {
          if (!group) return;
          const y = ic.layerPhase.perLayerYawOffsets[i] || 0;
          const p = ic.layerPhase.perLayerPrecessionOffsets[i] || 0;
          group.userData = group.userData || {};
          group.userData.genesisYaw = y;
          group.userData.genesisPrecession = p;
        } catch (_) { /* noop */ }
      });
    }

    if (Array.isArray(ctx.particleSystems)) {
      const pj = ic.particles;
      const ang = pj.angularPhaseOffset || 0;
      const c = Math.cos(ang);
      const s = Math.sin(ang);
      ctx.particleSystems.forEach((ps) => {
        try {
          if (!ps?.geometry?.attributes?.position) return;
          const pos = ps.geometry.attributes.position;
          const arr = pos.array;
          const rs = pj.radialJitterScale;
          for (let i = 0; i < arr.length; i += 3) {
            let x = arr[i + 0];
            let y = arr[i + 1];
            let z = arr[i + 2];
            x *= rs;
            y *= rs;
            const ox = x;
            const oy = y;
            arr[i + 0] = ox * c - oy * s + pj.driftBiasX;
            arr[i + 1] = ox * s + oy * c + pj.driftBiasY;
            arr[i + 2] = z + pj.zBias + pj.driftBiasZ;
          }
          pos.needsUpdate = true;
          ps.userData = ps.userData || {};
          ps.userData.velocityBiasScale = pj.velocityBiasScale;
        } catch (_) { /* noop */ }
      });
    }

    if (ctx.nebulaStars && ctx.nebulaStars.geometry?.attributes?.position) {
      try {
        const pos = ctx.nebulaStars.geometry.attributes.position;
        const arr = pos.array;
        const skx = ic.stars.spatialSkewX;
        const sky = ic.stars.spatialSkewY;
        for (let i = 0; i < arr.length; i += 3) {
          arr[i + 0] *= 1 + skx;
          arr[i + 1] *= 1 + sky;
        }
        pos.needsUpdate = true;
      } catch (_) { /* noop */ }
    }

    if (ctx.starTwinklePhases && ic.stars.twinklePhaseOffset) {
      try {
        const d = ic.stars.twinklePhaseOffset;
        for (let i = 0; i < ctx.starTwinklePhases.length; i++) {
          ctx.starTwinklePhases[i] += d;
        }
      } catch (_) { /* noop */ }
    }

    if (ctx.starBaseOpacities && ic.stars.brightnessBias) {
      try {
        const bb = ic.stars.brightnessBias;
        for (let i = 0; i < ctx.starBaseOpacities.length; i++) {
          ctx.starBaseOpacities[i] = genesisClamp(
            ctx.starBaseOpacities[i] * (1 + bb),
            0.02,
            8,
            ctx.starBaseOpacities[i]
          );
        }
      } catch (_) { /* noop */ }
    }

    if (ctx.nebulaStars) {
      try {
        ctx.nebulaStars.rotation.z += ic.ambientEvents.nebulaPhaseOffset * 0.001;
        ctx.nebulaStars.rotation.y += ic.ambientEvents.nebulaPhaseOffset * 0.0004;
      } catch (_) { /* noop */ }
    }

    if (ctx.cosmicDust) {
      try {
        ctx.cosmicDust.rotation.z += ic.ambientEvents.cosmicDustPhaseOffset * 0.001;
      } catch (_) { /* noop */ }
    }

    if (Array.isArray(ctx.nebulaClouds) && ic.ambientEvents.cosmicDustPhaseOffset) {
      const d = ic.ambientEvents.cosmicDustPhaseOffset * 0.002;
      ctx.nebulaClouds.forEach((spr) => {
        try {
          if (spr?.userData) spr.userData.driftAngle = (spr.userData.driftAngle || 0) + d;
        } catch (_) { /* noop */ }
      });
    }

    try {
      console.info('FM3D genesis seed:', ic.seed);
    } catch (_) { /* noop */ }
  } catch (err) {
    console.warn('applyInitialConditions fallback:', err);
  }
}

export {
  INITIAL_CONDITIONS,
  CANONICAL_INITIAL_CONDITIONS,
  applyInitialConditions,
};
