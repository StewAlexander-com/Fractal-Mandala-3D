# The Fractal Mandala — Quantum Orbital Edition

> *Seven layers of sacred geometry. One interactive journey inward.*

[![Live Demo](og-image.png)](https://stewalexander-com.github.io/Fractal-Mandala-3D/)

## [Enter the Mandala → stewalexander-com.github.io/Fractal-Mandala-3D](https://stewalexander-com.github.io/Fractal-Mandala-3D/)

A 3D interactive sacred geometry mandala of presence and liberation. Seven concentric layers of metacognitive awareness rendered as quantum orbital shells — fly through them in your browser. Built with Three.js, set in an astronomically-inspired nebula star field with ambient meditation audio.

The teachings are a distillation of converging ideas from Buddhism, Hinduism, Stoicism, Sufism, Taoism, and Christian mysticism, interwoven with modern physics, neuroscience, cognitive-behavioral research, process philosophy, and the mathematics of fractals and calculus — drawn from cultures across Asia, Africa, Europe, and the Americas. Where traditions separated by thousands of miles and thousands of years arrive at the same insight, that convergence is the signal.

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
| **Zoom** | Ctrl+scroll / +/- keys | Two-finger pinch |
| **Jump to layer** | Number keys 1–7 / click slider stops | Tap slider stops |
| **Toggle audio** | Click speaker icon (bottom-left) | Tap speaker icon |

## Nebula Star Field

The background environment is modeled after Hubble imagery of stellar nurseries — luminous at the core, fading to dark void at the edges.

### Stars — Inverse-Square Radial Distribution
- **2400 stars** placed with center-concentrated density (density ∝ 1/r², like a real stellar nursery)
- **Spectral classification palette**: O-type blue-white, B-type blue, A-type white, F-type yellow-white, G-type gold, K-type orange, plus overexposed pure white
- **Center-biased luminosity**: stars near the core receive up to 2.5× brightness boost
- **5 luminosity tiers**: supergiant beacons (3%), bright giants (9%), main-sequence bright (23%), main-sequence dim (30%), red dwarfs & dust (35%)
- **Per-star twinkle**: each star shimmers at its own frequency (0.3–1.8 Hz) with composite sine harmonics
- **128px dual-layer glow texture**: wide soft halo + intense additive core burn (mimics telescope point-spread function)

### Nebula Gas — 3 Radial Emission Zones
- **Inner zone** (r 0–40): 14 dense, bright clouds — warm H-II emission tones (amber, gold, pink-white, dusty gold, blue-violet)
- **Mid zone** (r 30–90): 12 clouds — dusty rose, lavender, blue mist, warm gold haze, amber dust
- **Outer zone** (r 70–150): 10 sparse dark wisps — deep indigo, near-black violet, dark brown dust
- Clouds drift and breathe with per-cloud opacity oscillation

### Additional Effects
- **Shooting stars** — occasional meteor streaks across the field (pool of 4, ~1 every 5 seconds)
- **Cosmic dust ring** — 600-particle toroidal band at the scene midpoint, glacial rotation
- **Nebula accent lights** — rose, lavender, blue, and warm backlight point lights
- **ACES filmic tone mapping** at exposure 2.0 for cinematic dynamic range
- **Ambient meditation audio** — "Angelic Meditation" (Pixabay License), looping at 33% volume with fade-in

All background subsystems are wrapped in try/catch fault tolerance — if any fails, the rest continues.

## UI & Design

- **Milky Way palette**: indigo-black background, warm gold accents, muted earth tones
- **Lora italic** for teaching text — clean, elegant readability at small sizes
- **Radial glow shimmer** on key text (amber/teal/rose `::before` pseudo-element, 14s cycle)
- **Scroll indicators**: gold chevron arrows with drop-shadow glow, bouncing above/below the teaching panel to signal scrollable content
- **Fade masks**: top and bottom inset shadows appear dynamically when content overflows
- **Splash screen**: centered title with high-contrast warm text, "enter the mandala" gate
- **Layer transitions**: scroll resets to top on layer switch

## The Core Teaching

**First arrow** = discomfort (unavoidable, natural, informational)
**Second arrow** = suffering (ego's addition, optional, constructed)
**Liberation** = seeing and releasing second arrows continuously

The practice is fractal: Meditate → Let revelation emerge → Ask questions → Release second arrows → Return. Each cycle breathes: *Inspiration → Relaxation → Awareness*.

## Technical Architecture

- **Three.js** (WebGL) via CDN import maps — no build step, pure ES modules
- **Gesture system** — unified input handling: mouse drag, scroll, touch swipe (intent-locked axis), pinch zoom, keyboard
- **Camera** — auto-orbit baseline + user orbit angle + zoom Z-offset, all lerped with exponential ease
- **iOS hardened** — `visualViewport` API for sizing, `100dvh` fallback, `viewport-fit=cover`, safe-area insets
- **Audio** — Web Audio API pipeline (AudioContext → GainNode → destination) for reliable mute/unmute in all environments including iOS standalone; HTML5 Audio fallback; autoplay-gate; fade-in; loop
- **Performance** — star twinkle updates in rolling batches (~350/frame), additive blending, depth-write disabled on particles
- **Fault tolerance** — all background subsystems in try/catch, shooting stars use object pooling

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
