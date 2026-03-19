# The Fractal Mandala — Quantum Orbital Edition

> *Seven layers of sacred geometry. One interactive journey inward.*

[![Live Demo](og-image.png)](https://stewalexander-com.github.io/Fractal-Mandala-3D/)

## [Enter the Mandala → stewalexander-com.github.io/Fractal-Mandala-3D](https://stewalexander-com.github.io/Fractal-Mandala-3D/)

A 3D interactive sacred geometry mandala of presence and liberation. Seven concentric layers of metacognitive awareness rendered as quantum orbital shells — fly through them in your browser. Built with Three.js, set in a living nebula star field with ambient meditation audio.

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

## Background Effects

The nebula environment is designed to feel alive without pulling attention from the foreground geometry:

- **1400 stars** with per-star brightness variation — 5% are "blue giant" accent stars
- **Individual star twinkle** — each star shimmers at its own frequency (0.3–1.8 Hz) with composite harmonics
- **Shooting stars** — occasional meteor streaks across the field (pool of 4, ~1 every 5 seconds)
- **28 volumetric nebula clouds** — soft sprite billboards with additive blending and opacity breathing
- **Cosmic dust ring** — 600-particle toroidal band at the scene midpoint, glacial rotation
- **Nebula accent lights** — rose, lavender, and blue point lights for subtle coloured fill
- **Ambient meditation audio** — "Angelic Meditation" (Pixabay License), looping at 33% volume with fade-in

All background enhancements are wrapped in try/catch fault tolerance — if any subsystem fails, the rest continues.

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
| Core glow | `#f0d9b5` | Warm white |
| Gold accent | `#d4a574` | Amber gold |
| Rose light | `#c7889a` | Dusty rose |
| Lavender | `#9b8ab8` | Soft violet |
| Blue star | `#7eb4d4` | Ice blue |
| Muted text | `#9a8e7a` | Warm grey |

## Run Locally

```bash
# Any static server works
python -m http.server 8000
# Then open http://localhost:8000
```

## Audio Credits

Ambient meditation track: "Angelic Meditation" from [Pixabay](https://pixabay.com/music/meditationspiritual-angelic-meditation-172334/) — Pixabay Content License (free for all use, no attribution required).

---

*"You are not a noun. You are verb-ing."*

*Created with [Perplexity Computer](https://www.perplexity.ai/computer)*
