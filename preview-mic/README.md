# The Fractal Mandala — Quantum Orbital Edition

> *Seven layers of sacred geometry. One interactive journey inward.*

[![Live Demo](og-image.png)](https://stewalexander-com.github.io/Fractal-Mandala-3D/)

## [Enter the Mandala → stewalexander-com.github.io/Fractal-Mandala-3D](https://stewalexander-com.github.io/Fractal-Mandala-3D/)

### Preview (mic / breath work in progress)

The branch `feature/mic-breath-sensitivity` is copied into **`preview-mic/`** on `main` by GitHub Actions whenever that branch is pushed. Use it to test changes without affecting the default URL:

**[Preview build → …/Fractal-Mandala-3D/preview-mic/](https://stewalexander-com.github.io/Fractal-Mandala-3D/preview-mic/)**

Production remains **[…/Fractal-Mandala-3D/](https://stewalexander-com.github.io/Fractal-Mandala-3D/)** at the site root.

Requires **GitHub Actions** workflow permissions: *Settings → Actions → General → Workflow permissions → Read and write*. If `main` is branch-protected, allow GitHub Actions to push or use a merge queue / manual sync.

Avoid merging `main` into `feature/mic-breath-sensitivity` if that would pull the generated `preview-mic/` tree into your branch; edit the app at repo root on the feature branch only — CI copies that to `preview-mic/` on `main`.

A 3D interactive sacred geometry mandala of presence and liberation. Seven concentric layers of metacognitive awareness rendered as quantum orbital shells — fly through them in your browser. Built with Three.js, set in an astronomically-inspired nebula star field with ambient meditation audio.

The teachings distill converging ideas from Buddhism, Hinduism, Stoicism, Sufism, Taoism, and Christian mysticism, interwoven with modern physics, neuroscience, cognitive-behavioral research, process philosophy, and the mathematics of fractals and calculus — drawn from cultures across Asia, Africa, Europe, and the Americas. Where traditions separated by thousands of miles and thousands of years arrive at the same insight, that convergence is the signal.

---

## The Seven Layers (outside → core)

| Layer | Sacred Geometry | Teaching |
|-------|----------------|----------|
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
| **Navigate layers** | Scroll wheel / ↑↓ arrows / slider | Vertical swipe / slider |
| **Orbit camera** | Click-drag / ←→ arrows | Horizontal swipe |
| **Zoom** | Ctrl+scroll / +/− keys | Two-finger pinch |
| **Jump to layer** | Number keys 1–7 / click slider stops | Tap slider stops |
| **Toggle audio** | Click speaker icon (bottom-left) | Tap speaker icon |
| **Toggle mic** | Click mic icon (bottom-left) | Tap mic icon (headphones recommended) |
| **Fullscreen** | Click expand icon (bottom-left) | Tap expand icon (hidden on iOS — use Add to Home Screen) |

## 6-DOF Volumetric Depth

The orbital shells are rendered with six physical depth cues so the Z-axis reads as truly three-dimensional:

1. **Orbital tilt diversity** — each layer group has a unique XYZ base tilt; rings appear as foreshortened ellipses, not face-on circles
2. **Gyroscopic precession** — slow wobble shifts each ring's viewing angle over time
3. **Depth-dependent illuminance** — emissive intensity scales quadratically with camera proximity (inverse-square law); near layers glow warm, far layers dim
4. **Parallax camera bob** — two-frequency lateral + vertical micro-oscillation; near objects shift faster than far objects
5. **Z-axis particle drift** — sinusoidal per-particle Z displacement; electron clouds float forward/backward through the ring plane
6. **Per-ring glow halos** — additive depth-attenuated sprite behind each torus; anchors rings in Z-space
7. **Atmospheric perspective** — distant layers desaturate and cool toward the fog color, complementing the exponential fog

## Nebula Star Field

The background environment is modeled after Hubble imagery of stellar nurseries — luminous at the core, fading to dark void at the edges.

### Stars — Inverse-Square Radial Distribution
- **2,400 stars** placed with center-concentrated density (density ∝ 1/r²)
- **Spectral classification palette**: O-type blue-white, B-type blue, A-type white, F-type yellow-white, G-type gold, K-type orange, overexposed pure white
- **Center-biased luminosity**: up to 2.5× brightness boost near the core
- **5 luminosity tiers**: supergiant beacons (3%), bright giants (9%), main-sequence bright (23%), main-sequence dim (30%), red dwarfs & dust (35%)
- **Per-star twinkle**: individual shimmer at 0.3–1.8 Hz with composite sine harmonics
- **128px dual-layer glow texture**: wide soft halo + intense additive core burn (telescope point-spread function)

### Nebula Gas — 3 Radial Emission Zones
- **Inner zone** (r 0–40): 14 dense, bright clouds — warm H-II emission tones (amber, gold, pink-white, dusty gold, blue-violet)
- **Mid zone** (r 30–90): 12 clouds — dusty rose, lavender, blue mist, warm gold haze, amber dust
- **Outer zone** (r 70–150): 10 sparse dark wisps — deep indigo, near-black violet, dark brown dust
- Clouds drift and breathe with per-cloud opacity oscillation

### Additional Effects
- **Shooting stars** — occasional meteor streaks (pool of 4, ~1 every 5 seconds)
- **Cosmic dust ring** — 600-particle toroidal band at the midpoint, glacial rotation
- **Nebula accent lights** — rose, lavender, blue, and warm backlight point lights
- **ACES filmic tone mapping** at exposure 2.0 for cinematic dynamic range
- **Ambient meditation audio** — looping at 33% volume with fade-in

## UI & Design

- **Milky Way palette**: indigo-black background, warm gold accents, muted earth tones
- **Lora** base teaching text — clean serif readability at small sizes
- **Cormorant Garamond** key-phrase display, **Courier New** math notation
- **Jost** body text, **Cormorant Garamond** display titles
- **Radial glow shimmer** on explain text — Gaussian bell-curve keyframes over a 28s breathing cycle, dual-layer `::before`/`::after` pseudo-elements with 7s phase offset
- **Blur-reveal layer titles** — scale up from 94% with 6px blur dissolve on layer transitions
- **Frosted glass teaching panel** — `backdrop-filter: blur()` with layer-adaptive opacity (darkens near the bright core, lightens at outer layers). CSS `mask-image` radial gradient fades the panel edges softly into the scene with no visible border
- **Scroll indicators**: gold chevron arrows with drop-shadow glow, bouncing above/below the panel
- **Fade masks**: top/bottom inset shadows appear dynamically when content overflows
- **Layer title readability** — `::before` radial dark vignette + `::after` `backdrop-filter: brightness()` dims the WebGL canvas behind the title text; ensures readability against bright torus geometry at every layer
- **Touch-responsive navigation**: 44px invisible hit zones on slider stops (WCAG minimum), grow/glow pulse animation on activation
- **Fullscreen toggle**: Fullscreen API + webkit fallback, icon state syncs with Escape key; auto-hidden on iOS Safari where the API is absent
- **Auto-orbit resume**: after 4 seconds of no orbit input, the manual camera offset decays smoothly back to zero and the ambient drift takes over
- **Panel scroll isolation**: `overscroll-behavior: contain` + `touch-action: pan-y` + event isolation prevent text scrolling from triggering layer navigation

## The Core Teaching

**First arrow** = discomfort (unavoidable, natural, informational)
**Second arrow** = suffering (ego's addition, optional, constructed)
**Liberation** = seeing and releasing second arrows continuously

The practice is fractal: Meditate → Let revelation emerge → Ask questions → Release second arrows → Return. Each cycle breathes: *Inspiration → Relaxation → Awareness*.

## Technical Architecture

- **Three.js r170** (WebGL) via CDN import maps — no build step, pure ES modules
- **Gesture system** — unified intent-locked input: mouse drag, scroll, touch swipe, pinch zoom, keyboard, slider drag
- **6-DOF camera** — auto-orbit + user orbit + parallax bob + zoom Z-offset, all lerped with exponential ease
- **iOS hardened** — `visualViewport` API sizing, `100dvh` fallback, `viewport-fit=cover`, safe-area insets
- **Audio** — Web Audio API pipeline (AudioContext → GainNode → destination) with HTML5 Audio fallback; autoplay gate; fade-in; loop; iOS standalone safe
- **Audio-reactive geometry** — ambient track AnalyserNode + optional microphone input blended into a single normalized breath signal. Smoothed with asymmetric exponential rates (rise 0.015, fall 0.008) to feel like breathing, not a VU meter. Drives: emissive intensity/warmth, rotation speed, camera bob amplitude, particle drift rate, core glow, star brightness, fog warmth. Mic input soft-limited with `tanh()` before blending (ambient 65% / mic 35%) so the ambient track always dominates
- **Performance** — star twinkle in rolling batches (~350/frame), additive blending, depth-write disabled on particles, `powerPreference: 'high-performance'`

### Resilience

The mandala is designed to run unattended without degradation:

- **WebGL context loss recovery** — `webglcontextlost` / `webglcontextrestored` event handling; silent rebuild after mobile GPU reclaims context
- **Delta-time clamping** — `MAX_DT = 100ms` prevents physics explosions after tab-resume
- **NaN guards** — `SAFE_NUM()` wrapper on all particle position updates; camera position reset if corrupted
- **Null-safe DOM** — every `getElementById` ref guarded; missing elements can't crash the app
- **Fault-isolated animation loop** — each subsystem (orbitals, core glow, star twinkle, shooting stars, cosmic dust, nebula clouds) wrapped in independent try/catch
- **Global error handler** — catches CDN/module failures and shows graceful "unable to load" message instead of blank screen
- **CDN preconnect** — `<link rel="preconnect">` hints for jsdelivr and Google Fonts
- **Audio preload** — `<link rel="preload" as="fetch">` hint for ambient track
- **Font fallback** — `display=swap` ensures visible text during font load

### Mic Fault Tolerance

The microphone system is designed for zero-disruption operation:

- **getUserMedia constraints**: all browser DSP disabled (`echoCancellation: false`, `noiseSuppression: false`, `autoGainControl: false`) via `exact` constraints with progressive fallback — prevents the browser's AEC from fighting the ambient track
- **AudioContext state machine**: handles `suspended`, `interrupted` (iOS), and `closed` states; auto-resume on user gesture
- **Dead-stream detection**: 180 consecutive zero-energy frames triggers automatic mic disable
- **Track lifecycle listeners**: `ended` and `mute` events trigger graceful cleanup
- **Every audio API call try/caught**: `createMediaStreamSource`, `createAnalyser`, `getByteFrequencyData` all independently fault-isolated
- **NaN guards**: `safeBreathNum()` wrapper on all breath calculations
- **Secure-origin detection**: mic button auto-hidden on insecure origins where `getUserMedia` is unavailable
- **Page visibility cleanup**: mic resources released when tab is hidden

## Palette

| Role | Hex | Name |
|------|-----|------|
| Background | `#06050a` | Indigo-black |
| Core glow | `#ffeedd` | Warm white |
| Gold accent | `#d4a574` | Amber gold |
| Star O-type | `#9dc8ff` | Blue-white |
| Star B-type | `#aabfff` | Blue |
| Rose light | `#c7889a` | Dusty rose |
| Lavender | `#9b8ab8` | Soft violet |
| Blue mist | `#7eb4d4` | Ice blue |
| Star K-type | `#ffb07a` | Orange |
| Text warm | `#f0ead8` | Warm cream |
| Text muted | `#c8bca6` | Warm grey |

## Run Locally

```bash
# Any static server works
npx serve . -l 3000
# Then open http://localhost:3000
```

## Audio Credits

Ambient meditation track: "Angelic Meditation" from [Pixabay](https://pixabay.com/music/meditationspiritual-angelic-meditation-172334/) — Pixabay Content License (free for all use, no attribution required).

---

*"You are not a noun. You are verb-ing."*

*Created with [Perplexity Computer](https://www.perplexity.ai/computer)*
