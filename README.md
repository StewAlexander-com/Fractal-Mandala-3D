# The Fractal Mandala — Quantum Orbital Edition

> *Seven layers of sacred geometry. One interactive journey inward.*

[![Live Demo](og-image.png)](https://stewalexander-com.github.io/Fractal-Mandala-3D/)

## [Enter the Mandala → stewalexander-com.github.io/Fractal-Mandala-3D](https://stewalexander-com.github.io/Fractal-Mandala-3D/)

A Three.js meditation experience with seven concentric layers, nebula-depth rendering, optional gyro background parallax, and layered ambient audio. The current runtime is mobile-first and resilience-focused: calm motion defaults, explicit fallback paths, and fault-isolated subsystems.

## Current Runtime Architecture (Mar 2026)

- **Rendering core**: `mandala3d.js` (scene, loop, UI, audio, resilience)
- **Gyro subsystem**: `gyroParallaxSubsystem.js` (device orientation -> background-only parallax)
- **Invariant content model**: `ontology.js` (layer semantics) + `genesis.js` (bounded initial conditions)
- **Fallback-first mobile behavior**:
  - Safe wrappers for media queries and canvas context acquisition
  - Runtime self-heal for procedural halo/knot textures if initialization fails
  - Fallback-only compositor safety mode for risky mobile browser paths
- **Backplate behavior**:
  - Aspect-correct center-crop background with subtle drift
  - In **mobile portrait**, horizontal offset is pinned to center to avoid edge seams; only gentle vertical movement remains

The teachings distill converging ideas from contemplative traditions and modern scientific inquiry; the interactive architecture is intentionally designed to preserve legibility and calm under imperfect browser/runtime conditions.

## Layered Ambient Sound

Two loops run through a shared ambient pipeline:

- Meditation bed (`ambient-meditation.mp3`)
- Ocean bed (`ambient-ocean-wave.mp3`, see `AUDIO-CREDITS.txt`)

Runtime behavior:

- Meditation is the primary bed; ocean sits below it
- Shared fade-in, mute/unmute, and suspend/resume handling
- Web Audio path preferred; HTML media-volume fallback remains available
- Breath visualization analyses ambient audio, with optional microphone blend when enabled

## The Seven Layers (outside -> core)

| Layer | Sacred Geometry | Teaching |
|-------|------------------|----------|
| 7 — Meta-Recognition | Dodecagram (12-fold) | The field clarifying itself |
| 6 — Structural Insights | Hexagonal lattice | Process, not substance |
| 5 — Key Distinctions | Octagram (8-fold) | Seeing through the pairs |
| 4 — Three Acceptances | Borromean rings | Accipio Toto, Praesentia, Ludo |
| 3 — The Practice | Pentagram (5-fold) | The fractal cycle |
| 2 — The Second Arrow | Star of David (6-fold) | First arrow / second arrow |
| 1 — Core Awareness | Seed of Life | dx/dt — this moment |

## Controls

| Input | Desktop | Mobile |
|-------|---------|--------|
| Navigate layers | Scroll / arrow keys / slider | Vertical swipe / slider |
| Orbit camera | Drag / left-right keys | Horizontal swipe |
| Zoom | Ctrl+scroll / +/- keys | Pinch |
| Jump to layer | Number keys / slider stops | Slider stops |
| Audio | Speaker toggle | Speaker toggle |
| Mic reactive input | Mic toggle | Mic toggle |
| Fullscreen | Expand toggle | Browser-dependent (limited on iOS) |

## Visual System (Current)

- Concentric torus-based orbital layers with depth-dependent emissive behavior
- Nebula field with star distribution, cloud sprites, knot/fractal gas textures, and cosmic dust band
- Nebula backplate image grading + UV crop management for readability and stability
- Ring color gradients with directional light-dark modulation and depth fade
- Layer title readability treatment with mobile-safe fallback path
- Tilt-responsive vignette (background-only)

## Mobile Browser Stabilization

The app now uses a **fallback-only** compositor guard:

- Default visuals stay intact on capable browsers
- A `mobile-compositor-safe` class is applied only for known-risk/unsupported mobile compositor paths
- In that mode, blur/mask heavy UI effects switch to stable gradients/opaque equivalents to avoid WebGL-overlay artifacts
- This guard is intended for Safari/WebKit edge cases and other mobile browser paths that regress `backdrop-filter`/mask compositing

## Resilience and Fault Tolerance

- WebGL context loss/restoration handling
- Delta-time clamping to avoid tab-resume spikes
- Null-safe DOM wiring and guarded animation subsystems
- Safe numeric guards to prevent NaN propagation
- Fallback behavior when image/audio/context APIs fail
- Mic lifecycle hardening:
  - Progressive constraints for `getUserMedia`
  - Dead-stream detection and auto-disable
  - Cleanup on visibility/background transitions
  - Secure-origin feature gating

## Run Locally

```bash
# Any static server works
npx serve . -l 3000
# Then open http://localhost:3000
```

## Audio Credits

Ambient meditation track: "Angelic Meditation" from [Pixabay](https://pixabay.com/music/meditationspiritual-angelic-meditation-172334/) (Pixabay Content License).

Ocean wave bed: CC0 clip credited in [`AUDIO-CREDITS.txt`](AUDIO-CREDITS.txt).

---

*"You are not a noun. You are verb-ing."*
