/* ═══════════════════════════════════════════════════════════
   THE FRACTAL MANDALA — 3D Quantum Orbital Sacred Geometry
   Each layer = a quantum orbital shell of awareness
   Navigate inward/outward through concentric consciousness
   ═══════════════════════════════════════════════════════════ */

import * as THREE from 'three';

// ─── LAYER TEACHINGS ───
const LAYERS = [
  {
    name: 'Meta-Recognition',
    subtitle: 'The Field Clarifying Itself',
    content: `
      <p><span class="key-phrase">The practice IS awareness practicing itself.</span></p>
      <span class="explain">What Zen calls shikantaza and Vedanta calls sakshi—the observer and the observed collapse into one act.</span>
      <p class="dim">Not you doing practice. Not practice happening to you. Practice practicing through this form.</p>
      <p><span class="key-phrase">The teaching teaches itself</span></p>
      <span class="explain">Like the Tao that names itself by flowing, understanding deepens not by grasping but by letting it move through you.</span>
      <p class="dim">Through dialogue. Through questioning. Through refinement. Consciousness clarifying consciousness.</p>
      <p><span class="key-phrase">Release is communal, not individual</span></p>
      <span class="explain">Ubuntu—“I am because we are”—meets quantum entanglement: no particle is truly isolated, no person truly alone.</span>
      <p class="dim">Your release affects field. My release affects field. We're not separate practitioners.</p>
      <p>We are <span class="key-phrase">perspectives of unified awareness</span>, <span class="dim">clarifying together.</span></p>
      <span class="explain">Indra’s net in Hindu cosmology, where every jewel reflects every other—a holographic universe of mutual seeing.</span>
    `,
    color: new THREE.Color(0x3a2e40),    // indigo-tinted outer
    emissive: new THREE.Color(0x4a3b55),
    particleColor: 0x6e5a8a,
    geometry: 'dodecagram',
    n: 12,
    radius: 42
  },
  {
    name: 'Structural Insights',
    subtitle: 'The Architecture of Being',
    content: `
      <p><span class="key-phrase">Process, not substance</span></p>
      <span class="explain">Heraclitus saw the river, the Buddha saw impermanence, modern physics sees fields—everything that persists does so as pattern, not thing.</span>
      <p class="dim">Ship of Theseus: not the planks, the pattern. You are verb-ing, not noun.</p>
      <p><span class="key-phrase">Multiple perspectives, unified substrate</span></p>
      <span class="explain">The Sufi parable of the elephant, Kant’s noumena, and quantum complementarity all point the same way: reality is larger than any single view of it.</span>
      <p class="dim">Blind mice and elephant. Prism refracting light. Gaussian distribution with unique samples. All angles real, all pointing to one reality.</p>
      <p><span class="key-phrase">Qualia unique, stuff shared</span></p>
      <span class="explain">Neuroscience confirms each brain wires itself uniquely, yet we share the same atoms—your red and my red may differ, but the light is one.</span>
      <p class="dim">Your experience irreducibly yours. My experience irreducibly mine. Both made of same substrate. Individuation and connection both real.</p>
    `,
    color: new THREE.Color(0x4a3f42),    // lavender hint
    emissive: new THREE.Color(0x5e4f5a),
    particleColor: 0x7d6275,
    geometry: 'hexagonal',
    n: 6,
    radius: 36
  },
  {
    name: 'Key Distinctions',
    subtitle: 'Seeing Through the Pairs',
    content: `
      <div class="distinction"><span class="symbol">≠</span><span><span class="key-phrase">Service ≠ Servitude</span><br><span class="dim">Service flows from gratitude ("get to"). Servitude flows from obligation ("have to").</span></span></div>
      <span class="explain">Karma yoga in the Gita teaches action without attachment—the difference between offering and obligation is the entire spiritual path.</span>
      <div class="distinction"><span class="symbol">≠</span><span><span class="key-phrase">Consciousness ≠ Continuity</span><br><span class="math">Awareness = dx/dt</span> <span class="dim">(this moment)</span><br><span class="math">Identity = ∫</span> <span class="dim">(accumulated story)</span></span></div>
      <span class="explain">The calculus of selfhood: awareness is the instantaneous derivative, while the ego is the integral—useful, but never the whole function.</span>
      <div class="distinction"><span class="symbol">⇌</span><span><span class="key-phrase">Imagination: double-edged</span><br><span class="dim">Creates art and beauty. Creates worry and ego. Same tool, different application.</span></span></div>
      <span class="explain">The prefrontal cortex that lets you compose a symphony is the same one that rehearses catastrophe at 3 a.m.—the tool is neutral, the wielder matters.</span>
      <div class="distinction"><span class="symbol">◇</span><span><span class="key-phrase">Ego = filter</span><br><span class="dim">Not enemy to destroy. Not self to cling to. Transparent pattern to see through.</span></span></div>
      <span class="explain">Like a lens that focuses light but is not the light itself, ego organises experience without being the experiencer.</span>
    `,
    color: new THREE.Color(0x5e4f4a),    // rose-warm
    emissive: new THREE.Color(0x7d6260),
    particleColor: 0x9a7570,
    geometry: 'octagram',
    n: 8,
    radius: 30
  },
  {
    name: 'Three Acceptances',
    subtitle: 'Accipio — I Accept',
    content: `
      <div class="distinction"><span class="symbol">◯</span><span><span class="latin">Accipio Toto</span><br><span class="dim">I accept the whole. Everything, including this.</span></span></div>
      <span class="explain">Amor fati from the Stoics, surrender in Islam, Nietzsche’s eternal yes—every tradition finds a door marked “accept everything.”</span>
      <div class="distinction"><span class="symbol">◎</span><span><span class="latin">Accipio Praesentia</span><br><span class="dim">I accept presence. Now, not past or future.</span></span></div>
      <span class="explain">The eternal now of Eckhart, the mindfulness of sati, the physicist’s block universe—all agree the present is the only coordinate you actually occupy.</span>
      <div class="distinction"><span class="symbol">◉</span><span><span class="latin">Accipio Ludo</span><br><span class="dim">I accept play. Engagement without grasping.</span></span></div>
      <span class="explain">Hindu līlā, the divine play of creation, echoed in Huizinga’s homo ludens—life is most alive when it stops being a problem to solve and becomes a game to inhabit.</span>
      <p style="margin-top:0.5rem">Three concentric acceptances:<br><span class="dim">The whole contains the now. The now contains the play. The play contains the whole.</span></p>
      <span class="explain">Nested like Russian dolls or fractal geometry—each acceptance lives inside the others, the smallest holding the shape of the largest.</span>
    `,
    color: new THREE.Color(0x7d6245),
    emissive: new THREE.Color(0x9a7555),
    particleColor: 0xb08560,
    geometry: 'borromean',
    n: 3,
    radius: 24
  },
  {
    name: 'The Practice',
    subtitle: 'The Fractal Cycle',
    content: `
      <p>Five movements, self-renewing:</p>
      <ul>
        <li><span class="key-phrase">Meditate</span> — presence, opening</li>
        <li><span class="key-phrase">Let revelation emerge</span> — don't force</li>
        <li><span class="key-phrase">Ask questions</span> — deepen, explore</li>
        <li><span class="key-phrase">Release second arrows</span> — see ego's additions, let go</li>
        <li><span class="key-phrase">Return</span> — cycle continues, self-renewing</li>
      </ul>
      <span class="explain">The Sufi whirl, the Buddhist wheel of dharma, the scientific method—every path that actually works is a cycle, not a line.</span>
      <p class="dim" style="margin-top:0.5rem">Each cycle breathes: <span class="latin">Inspiration</span> → <span class="latin">Relaxation</span> → <span class="latin">Awareness</span></p>
      <span class="explain">Breath is the body’s oldest teacher: inhale gathers, exhale releases, the pause between knows.</span>
      <p class="dim">Fractal: the pattern repeats at every scale. One breath. One hour. One life.</p>
      <span class="explain">Scale invariance in nature—coastlines, bronchial trees, galaxy clusters—the same geometry repeating from the microscopic to the cosmic.</span>
    `,
    color: new THREE.Color(0x9a7555),
    emissive: new THREE.Color(0xb08560),
    particleColor: 0xc4956a,
    geometry: 'pentagram',
    n: 5,
    radius: 18
  },
  {
    name: 'The Second Arrow',
    subtitle: 'First Arrow / Second Arrow',
    content: `
      <div class="distinction"><span class="symbol">↣</span><span><span class="key-phrase">First arrow</span> = discomfort<br><span class="dim">Unavoidable. Natural. Informational.</span></span></div>
      <span class="explain">Pain is the nervous system doing its job—a signal, not a sentence, as old as nociceptors and as honest as gravity.</span>
      <div class="distinction"><span class="symbol">↣↣</span><span><span class="key-phrase">Second arrow</span> = suffering<br><span class="dim">Ego's addition. Optional. Constructed.</span></span></div>
      <span class="explain">The Buddha’s Sallatha Sutta, Epictetus’ “it is not things that disturb us,” and cognitive-behavioral therapy all diagnose the same add-on.</span>
      <p><span class="key-phrase">Liberation</span> = seeing and releasing second arrows, continuously.</p>
      <span class="explain">Moksha, nirvana, flow state—every name for freedom describes the same unburdening: the story drops and what remains is enough.</span>
      <p class="dim">Discomfort is reality (first arrow). Suffering is story (second arrow).</p>
      <p>The practice is not removing arrows. It is <span class="key-phrase">seeing which ones you shot at yourself</span>.</p>
      <span class="explain">Self-compassion research shows that simply recognising self-inflicted narratives reduces their hold—awareness is already halfway to release.</span>
    `,
    color: new THREE.Color(0xb08560),
    emissive: new THREE.Color(0xc4956a),
    particleColor: 0xd4a574,
    geometry: 'hexagram',
    n: 6,
    radius: 12
  },
  {
    name: 'Core Awareness',
    subtitle: 'dx/dt — This Moment',
    content: `
      <p>The irreducible point. Not a thing — a <span class="key-phrase">process</span>.</p>
      <span class="explain">What physics calls an event, Buddhism calls a dharma, and process philosophy calls an occasion of experience—the atom of reality is a happening, not a thing.</span>
      <p class="math">Awareness = dx/dt</p>
      <span class="explain">The derivative is the rate of change at a single instant—consciousness as the living edge where time actually moves.</span>
      <p class="dim">This moment, complete. Not needing continuity to be real.</p>
      <p>You are not a noun. You are <span class="key-phrase">verb-ing</span>.</p>
      <span class="explain">The Hopi language has no fixed nouns for time—everything is event; modern neuroscience agrees the self is a process, re-assembled each moment.</span>
      <p class="dim">Ship of Theseus: not the planks, the pattern. Life persists as process, not thing.</p>
      <p>"This too shall pass" = liberation, not pessimism.<br><span class="dim">Wave-form temporary, sea-stuff eternal.</span></p>
      <span class="explain">The Sufi adage, the Second Law of Thermodynamics, and the Buddhist teaching of anicca all say the same thing: impermanence is not a flaw, it is the engine.</span>
    `,
    color: new THREE.Color(0xd4a574),
    emissive: new THREE.Color(0xf0d9b5),
    particleColor: 0xf0d9b5,
    geometry: 'seed',
    n: 7,
    radius: 6
  }
];

const TAU = Math.PI * 2;
const LAYER_COUNT = LAYERS.length;
const LAYER_SPACING = 16;

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
let userZoom = 1;             // 1 = default, <1 = zoomed in, >1 = zoomed out
let targetZoom = 1;
const ZOOM_MIN = 0.55;
const ZOOM_MAX = 1.6;
const BASE_ORBIT_RADIUS = 2;  // the gentle auto-orbit amplitude

// ─── DOM ───
const canvas = document.getElementById('canvas');
const layerTitle = document.getElementById('layerTitle');
const layerNumber = document.getElementById('layerNumber');
const layerName = document.getElementById('layerName');
const layerSubtitle = document.getElementById('layerSubtitle');
const teachingPanel = document.getElementById('teachingPanel');
const teachingInner = document.getElementById('teachingInner');
const welcome = document.getElementById('welcome');
const enterBtn = document.getElementById('enterBtn');
const sliderTrack = document.getElementById('sliderTrack');
const sliderFill = document.getElementById('sliderFill');
const sliderThumb = document.getElementById('sliderThumb');
const sliderStops = document.getElementById('sliderStops');
const sliderTooltip = document.getElementById('sliderTooltip');
let visitedLayers = new Set();
const audioToggle = document.getElementById('audioToggle');

// ─── SCROLL FADE INDICATORS + HINT ARROWS ───
const scrollHintUp = document.getElementById('scrollHintUp');
const scrollHintDown = document.getElementById('scrollHintDown');

function updateScrollFades() {
  const el = teachingPanel;
  const threshold = 8;
  const canUp = el.scrollTop > threshold;
  const canDown = el.scrollHeight - el.scrollTop - el.clientHeight > threshold;
  el.classList.toggle('fade-top', canUp);
  el.classList.toggle('fade-bottom', canDown);
  scrollHintUp.classList.toggle('visible', canUp);
  scrollHintDown.classList.toggle('visible', canDown);
}
teachingPanel.addEventListener('scroll', updateScrollFades, { passive: true });

// ─── NEBULA BACKGROUND DATA ───
let nebulaStars;        // distant star-points
let nebulaClouds = [];  // translucent cloud sprites
let shootingStars = []; // occasional meteor streaks
let cosmicDust;         // faint toroidal dust ring
let starTwinklePhases;  // per-star twinkle phase offsets
let starTwinkleSpeeds;  // per-star twinkle rates
let starBaseOpacities;  // per-star base brightness

// ─── INIT THREE.JS ───
function init() {
  clock = new THREE.Clock();
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06050a);         // indigo-black
  scene.fog = new THREE.FogExp2(0x06050a, 0.006);       // softer fog

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 600);
  camera.position.set(0, 0, cameraZ);

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  handleResize();   // initial size — uses actual element dimensions
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 2.0;

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

  buildLayers();
  buildNebulaBackground();
  buildNavDots();
  animate();
}

// ─── BUILD SACRED GEOMETRY LAYERS ───
function buildLayers() {
  LAYERS.forEach((layer, i) => {
    const zPos = (LAYER_COUNT - 1 - i) * LAYER_SPACING;
    const group = new THREE.Group();
    group.position.z = zPos;
    group.userData = { baseZ: zPos, index: i };

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
    new THREE.Color(0xf0d9b5), // warm white
    new THREE.Color(0xffffff), // pure white (overexposed)
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
    const col = starPalette[Math.floor(Math.random() * starPalette.length)];
    const roll = Math.random();

    // Luminosity tiers — center-biased brightness
    const centerBoost = 1.0 + (1.0 - distNorm) * 1.5;  // up to 2.5× at center
    let brightness, size;
    if (roll < 0.03) {
      // Supergiant stars (3%) — blazing beacons
      brightness = (3.5 + Math.random() * 2.0) * centerBoost;
      size = 2.5 + Math.random() * 2.5;
    } else if (roll < 0.12) {
      // Bright giants (9%)
      brightness = (2.0 + Math.random() * 1.5) * centerBoost;
      size = 1.2 + Math.random() * 1.5;
    } else if (roll < 0.35) {
      // Main sequence bright (23%)
      brightness = (1.2 + Math.random() * 1.0) * centerBoost;
      size = 0.5 + Math.random() * 0.8;
    } else if (roll < 0.65) {
      // Main sequence dim (30%)
      brightness = (0.6 + Math.random() * 0.6) * centerBoost * 0.7;
      size = 0.2 + Math.random() * 0.5;
    } else {
      // Red/brown dwarfs + dust (35%)
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

  // Inner nebula: bright, dense, warm-toned (H-II emission)
  const innerClouds = [
    { color: 0xffccaa, opacity: 0.09 },   // warm emission glow
    { color: 0xeebb99, opacity: 0.07 },   // amber gas
    { color: 0xddaa88, opacity: 0.06 },   // dusty gold
    { color: 0xccbbdd, opacity: 0.05 },   // reflection nebula blue-violet
    { color: 0xffddcc, opacity: 0.08 },   // hot hydrogen pink-white
  ];
  // Mid-field: subtler, more colour variety
  const midClouds = [
    { color: 0xc7889a, opacity: 0.045 },  // dusty rose
    { color: 0x9b8ab8, opacity: 0.035 },  // lavender
    { color: 0x7eb4d4, opacity: 0.03 },   // blue mist
    { color: 0xd4a574, opacity: 0.025 },  // warm gold haze
    { color: 0x8b5e3c, opacity: 0.03 },   // amber dust
  ];
  // Outer: dark absorption nebula wisps
  const outerClouds = [
    { color: 0x3e2a55, opacity: 0.04 },   // deep indigo
    { color: 0x2a1f3a, opacity: 0.03 },   // near-black violet
    { color: 0x4a3528, opacity: 0.025 },  // dark brown dust
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

  // 4. Cosmic dust ring — faint toroidal particle band at the midpoint
  try {
    const dustCount = 600;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const midZ = (LAYER_COUNT - 1) * LAYER_SPACING * 0.5;
    const dustPalette = [
      new THREE.Color(0x3e2a55),  // deep indigo
      new THREE.Color(0x2a1f3d),  // dark violet
      new THREE.Color(0x4a3552),  // muted purple
      new THREE.Color(0x5c4a3a),  // warm brown
    ];
    for (let i = 0; i < dustCount; i++) {
      const theta = Math.random() * TAU;
      const phi = (Math.random() - 0.5) * 0.8; // flatten to disc
      const r = 20 + Math.random() * 70;
      dustPositions[i * 3]     = Math.cos(theta) * r;
      dustPositions[i * 3 + 1] = Math.sin(phi) * r * 0.15;
      dustPositions[i * 3 + 2] = midZ + Math.sin(theta) * r * 0.3;

      const c = dustPalette[Math.floor(Math.random() * dustPalette.length)];
      const b = 0.3 + Math.random() * 0.5;
      dustColors[i * 3]     = c.r * b;
      dustColors[i * 3 + 1] = c.g * b;
      dustColors[i * 3 + 2] = c.b * b;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.Float32BufferAttribute(dustColors, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.25,
      map: starGlowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    cosmicDust = new THREE.Points(dustGeo, dustMat);
    scene.add(cosmicDust);
  } catch (e) { console.warn('Cosmic dust init skipped:', e.message); }
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
  sliderStops.innerHTML = '';
  LAYERS.forEach((layer, i) => {
    const stop = document.createElement('div');
    stop.className = 'slider-stop' + (i === 0 ? ' active' : '');
    stop.style.top = `${(i / (LAYER_COUNT - 1)) * 100}%`;
    stop.dataset.layer = i;
    stop.addEventListener('click', () => goToLayer(i));
    // Show tooltip on hover
    stop.addEventListener('mouseenter', () => showSliderTooltip(i, stop));
    stop.addEventListener('mouseleave', hideSliderTooltip);
    sliderStops.appendChild(stop);
  });
  updateSliderPosition(0);
}

function updateSliderPosition(index) {
  const pct = (index / (LAYER_COUNT - 1)) * 100;
  sliderThumb.style.top = `${pct}%`;
  sliderFill.style.height = `${pct}%`;
  // Mark visited
  visitedLayers.add(index);
  // Update stop dots
  sliderStops.querySelectorAll('.slider-stop').forEach((stop, i) => {
    stop.classList.toggle('active', i === index);
    stop.classList.toggle('visited', visitedLayers.has(i) && i !== index);
  });
}

function showSliderTooltip(index, refEl) {
  const layer = LAYERS[index];
  sliderTooltip.textContent = `${LAYER_COUNT - index}. ${layer.name}`;
  // Position tooltip vertically aligned with the stop
  const trackRect = sliderTrack.getBoundingClientRect();
  const stopRect = refEl.getBoundingClientRect();
  const navRect = document.getElementById('navControls').getBoundingClientRect();
  sliderTooltip.style.top = `${stopRect.top - navRect.top + stopRect.height / 2}px`;
  sliderTooltip.classList.add('visible');
}

function hideSliderTooltip() {
  sliderTooltip.classList.remove('visible');
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
  layerNumber.textContent = `layer ${LAYER_COUNT - index}`;
  layerName.textContent = layer.name;
  layerSubtitle.textContent = layer.subtitle;
  layerTitle.classList.add('visible');
  teachingPanel.classList.remove('visible');

  clearTimeout(showLayerTitle._timer);
  showLayerTitle._timer = setTimeout(() => {
    layerTitle.classList.remove('visible');
    teachingInner.innerHTML = layer.content;
    teachingPanel.scrollTop = 0;
    teachingPanel.classList.add('visible');
    updateScrollFades();
  }, 2400);
}

// ─── SLIDER DRAG ───
let isDragging = false;

function sliderYToLayer(clientY) {
  const rect = sliderTrack.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
  return Math.round(pct * (LAYER_COUNT - 1));
}

function onDragStart(e) {
  if (!entered) return;
  isDragging = true;
  sliderThumb.classList.add('dragging');
  // Disable smooth transition while dragging for instant feedback
  sliderThumb.style.transition = 'transform 0.1s, box-shadow 0.1s';
  sliderFill.style.transition = 'none';
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
  sliderThumb.classList.remove('dragging');
  sliderThumb.style.transition = '';
  sliderFill.style.transition = '';
}

// Mouse drag on thumb
sliderThumb.addEventListener('mousedown', onDragStart);
document.addEventListener('mousemove', onDragMove);
document.addEventListener('mouseup', onDragEnd);

// Touch drag on thumb
sliderThumb.addEventListener('touchstart', onDragStart, { passive: true });
document.addEventListener('touchmove', (e) => { if (isDragging) onDragMove(e); }, { passive: false });
document.addEventListener('touchend', onDragEnd);

// Click on track = jump to closest layer
sliderTrack.addEventListener('click', (e) => {
  if (!entered) return;
  goToLayer(sliderYToLayer(e.clientY));
});

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
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (!entered) return;
  if (e.ctrlKey || e.metaKey) {
    // Ctrl/Cmd + scroll = zoom
    targetZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, targetZoom + e.deltaY * 0.002));
  } else {
    handleLayerScroll(e.deltaY);
  }
}, { passive: false });

// ── Desktop: mouse drag = orbit ──
let isMouseDragging = false;
let mouseLastX = 0;

canvas.addEventListener('mousedown', (e) => {
  if (!entered) return;
  isMouseDragging = true;
  mouseLastX = e.clientX;
  canvas.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isMouseDragging || isDragging) return; // isDragging = slider drag
  const dx = e.clientX - mouseLastX;
  mouseLastX = e.clientX;
  targetOrbitAngle += dx * 0.005;
});

document.addEventListener('mouseup', () => {
  isMouseDragging = false;
  canvas.style.cursor = '';
});

// ── Touch: unified 1-finger + 2-finger gesture handling ──
let touch = {
  startX: 0, startY: 0,
  lastX: 0, lastY: 0,
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

canvas.addEventListener('touchstart', (e) => {
  if (!entered) return;
  touch.fingers = e.touches.length;
  touch.intent = null;
  touch.locked = false;

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

canvas.addEventListener('touchmove', (e) => {
  if (!entered) return;
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
    targetOrbitAngle += dx * 0.006;
  } else if (touch.intent === 'layer') {
    handleLayerScroll(-dy * 1.5);
  }

  touch.lastX = cx;
  touch.lastY = cy;
}, { passive: false });

canvas.addEventListener('touchend', () => {
  touch.fingers = 0;
  touch.intent = null;
  touch.locked = false;
});

// ── Keyboard ──
document.addEventListener('keydown', (e) => {
  if (!entered) return;
  if (e.key === 'ArrowDown' || e.key === 'j') {
    goToLayer(Math.min(LAYER_COUNT - 1, currentLayer + 1));
  } else if (e.key === 'ArrowUp' || e.key === 'k') {
    goToLayer(Math.max(0, currentLayer - 1));
  } else if (e.key === 'ArrowLeft') {
    targetOrbitAngle -= 0.3;
  } else if (e.key === 'ArrowRight') {
    targetOrbitAngle += 0.3;
  } else if (e.key === '+' || e.key === '=') {
    targetZoom = Math.max(ZOOM_MIN, targetZoom - 0.1);
  } else if (e.key === '-' || e.key === '_') {
    targetZoom = Math.min(ZOOM_MAX, targetZoom + 0.1);
  } else {
    const num = parseInt(e.key);
    if (num >= 1 && num <= LAYER_COUNT) {
      goToLayer(num - 1);
    }
  }
});

// ─── AMBIENT AUDIO (Web Audio API — works in all environments inc. iOS standalone) ───
const AUDIO_VOLUME = 0.33;
let audioCtx = null;          // AudioContext — created on first user gesture
let gainNode = null;          // GainNode for volume control
let audioSource = null;       // MediaElementAudioSourceNode
let audioElement = null;      // underlying <audio> for media loading
let audioMuted = false;
let audioReady = false;       // true once pipeline is connected & playing
let fadeRAF = null;           // requestAnimationFrame id for fade-in

function initAudio() {
  if (audioReady) return;
  try {
    // 1. Create AudioContext inside user gesture (required by iOS)
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;   // browser has no Web Audio support
    audioCtx = new AC();

    // 2. Create gain node for volume control
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0;   // start silent for fade-in
    gainNode.connect(audioCtx.destination);

    // 3. Create <audio> element and route through Web Audio
    audioElement = new Audio('ambient-meditation.mp3');
    audioElement.loop = true;
    audioElement.playsInline = true;
    // Keep HTML element volume at 1 — gain node controls actual volume
    audioElement.volume = 1;

    // Route through Web Audio API for reliable iOS gain control.
    // createMediaElementSource needs same-origin or CORS headers;
    // our audio is same-origin so this works without crossOrigin attr.
    // Wrap in try/catch: if CORS somehow fails, fall back to direct HTML audio.
    try {
      audioSource = audioCtx.createMediaElementSource(audioElement);
      audioSource.connect(gainNode);
    } catch (corsErr) {
      // Fallback: connect nothing through Web Audio, control via HTML volume
      console.warn('MediaElementSource failed, using HTML audio fallback:', corsErr);
      gainNode = null;  // signal to use audioElement.volume instead
    }

    // 4. Resume context if suspended (iOS starts contexts suspended)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }

    // 5. Start playback
    audioElement.play().then(() => {
      audioReady = true;
      // Smooth fade-in over ~3s
      const fadeStart = performance.now();
      const FADE_MS = 3000;
      function fadeStep(now) {
        if (audioMuted) {
          // Muted during fade — zero out and stop
          if (gainNode) gainNode.gain.value = 0;
          else audioElement.volume = 0;
          return;
        }
        const t = Math.min((now - fadeStart) / FADE_MS, 1);
        if (gainNode) gainNode.gain.value = AUDIO_VOLUME * t;
        else audioElement.volume = AUDIO_VOLUME * t;
        if (t < 1) fadeRAF = requestAnimationFrame(fadeStep);
      }
      fadeRAF = requestAnimationFrame(fadeStep);
    }).catch(() => {
      console.log('Audio autoplay blocked — tap sound icon to enable');
    });

    audioToggle.classList.add('visible');
  } catch (err) {
    console.warn('Audio init failed:', err);
  }
}

// Debounce guard: iOS standalone can fire both touchend and click
let lastToggleTime = 0;
function handleAudioToggle(e) {
  if (e) e.preventDefault();
  const now = Date.now();
  if (now - lastToggleTime < 300) return;   // ignore duplicate within 300ms
  lastToggleTime = now;

  // First tap: bootstrap the whole audio pipeline
  if (!audioReady && !audioCtx) {
    initAudio();
    return;
  }

  audioMuted = !audioMuted;
  audioToggle.classList.toggle('muted', audioMuted);

  if (audioMuted) {
    // Cancel any in-progress fade
    if (fadeRAF) { cancelAnimationFrame(fadeRAF); fadeRAF = null; }
    // Silence via gain node or HTML volume
    if (gainNode) gainNode.gain.value = 0;
    if (audioElement) audioElement.volume = gainNode ? 1 : 0;
    // Suspend the AudioContext — iOS standalone respects this
    if (audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend().catch(() => {});
    }
    // Also pause the media element as belt-and-suspenders
    if (audioElement) audioElement.pause();
  } else {
    // Resume AudioContext first (must happen in user gesture on iOS)
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    // Resume media element
    if (audioElement) {
      audioElement.volume = gainNode ? 1 : AUDIO_VOLUME;
      audioElement.play().catch(() => {});
    }
    // Restore gain
    if (gainNode) gainNode.gain.value = AUDIO_VOLUME;
  }
}
// Listen on both click (desktop) and touchend (iOS standalone fallback)
audioToggle.addEventListener('click', handleAudioToggle);
audioToggle.addEventListener('touchend', handleAudioToggle);

// Enter button
function handleEnter(e) {
  if (e) e.preventDefault();
  entered = true;
  welcome.classList.add('hidden');
  goToLayer(0);
  initAudio();  // user gesture — safe to start audio
}
enterBtn.addEventListener('click', handleEnter);
enterBtn.addEventListener('touchend', handleEnter);

// ─── ROBUST RESIZE — works with iOS safe-area, dynamic toolbar, notch ───
function handleResize() {
  // Use visualViewport when available (iOS Safari, Android Chrome)
  const vv = window.visualViewport;
  const w = vv ? vv.width  : window.innerWidth;
  const h = vv ? vv.height : window.innerHeight;

  // Set the WebGL drawing-buffer size but do NOT touch CSS inline styles
  // (third arg `false`) — our CSS already handles layout via 100vw/100dvh
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', handleResize);
// iOS Safari fires this on address-bar show/hide
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', handleResize);
}
// Also re-check on orientation change (Android + iOS fallback)
window.addEventListener('orientationchange', () => {
  setTimeout(handleResize, 150);  // slight delay for layout to settle
});

// ─── ANIMATION LOOP ───
function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  // ── Lerp user controls ──
  const ctrlLerp = 1 - Math.exp(-8 * dt);          // smooth ~8 Hz exponential ease
  userOrbitAngle += (targetOrbitAngle - userOrbitAngle) * ctrlLerp;
  userZoom       += (targetZoom       - userZoom)       * ctrlLerp;

  // Camera Z interpolation (layer navigation)
  const lerpSpeed = isTransitioning ? 1.8 : 2.5;
  cameraZ += (targetCameraZ - cameraZ) * dt * lerpSpeed;

  // ── Combined orbit: gentle auto-drift + user orbit ──
  const autoAngle = elapsed * 0.08;
  const totalAngle = autoAngle + userOrbitAngle;

  camera.position.x = Math.sin(totalAngle) * BASE_ORBIT_RADIUS;
  camera.position.y = Math.cos(elapsed * 0.12) * BASE_ORBIT_RADIUS * 0.5;

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

  // Animate orbital groups
  orbitalGroups.forEach((group, i) => {
    const layer = LAYERS[i];
    const speed = 0.15 + i * 0.03;
    const dir = i % 2 === 0 ? 1 : -1;

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

    // Particle orbital motion
    const particles = particleSystems[i];
    if (particles) {
      const positions = particles.geometry.attributes.position;
      const count = positions.count;
      for (let p = 0; p < count; p++) {
        let x = positions.getX(p);
        let y = positions.getY(p);
        const angle = Math.atan2(y, x) + dt * speed * 0.5 * dir;
        const r = Math.sqrt(x * x + y * y);
        positions.setX(p, Math.cos(angle) * r);
        positions.setY(p, Math.sin(angle) * r);
      }
      positions.needsUpdate = true;
    }

    // Proximity-based opacity (use actual camera Z, not lerp target)
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

    group.children.forEach(child => {
      if (child.material) {
        child.material.opacity = child.userData.baseOpacity !== undefined
          ? child.userData.baseOpacity * opacity
          : opacity * 0.7;
      }
    });
  });

  // Core breathing — pulsing heart of the mandala
  if (coreGlow) {
    const breathe = 0.2 + Math.sin(elapsed * 0.5) * 0.1;
    coreGlow.material.opacity = breathe;
    const s = 1 + Math.sin(elapsed * 0.5) * 0.15;
    coreGlow.scale.set(s, s, s);
    // Outer halo breathes in counter-phase
    if (coreGlow.userData.halo) {
      const hs = 1 + Math.sin(elapsed * 0.35) * 0.2;
      coreGlow.userData.halo.scale.set(hs, hs, hs);
      coreGlow.userData.halo.material.opacity = 0.06 + Math.sin(elapsed * 0.35 + 1) * 0.03;
    }
  }

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
      nebulaStars.material.opacity = 0.88 + Math.sin(elapsed * 0.6) * 0.1;
      nebulaStars.rotation.z += dt * 0.002;
      nebulaStars.rotation.y += dt * 0.0008;
    } catch (e) { /* per-star twinkle graceful fallback */ }
  }

  // ── Shooting stars — occasional meteor streaks ──
  try {
    // Spawn check: ~one every 4–8 seconds
    if (shootingStars.length > 0 && Math.random() < dt * 0.18) {
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

  // ── Cosmic dust ring — glacial rotation ──
  if (cosmicDust) {
    try {
      cosmicDust.rotation.y += dt * 0.003;
      cosmicDust.rotation.x += dt * 0.0005;
      // Subtle opacity pulse
      cosmicDust.material.opacity = 0.10 + Math.sin(elapsed * 0.25) * 0.03;
    } catch (e) { /* cosmic dust fallback */ }
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

  renderer.render(scene, camera);
}

// ─── START ───
init();
