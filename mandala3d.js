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
      <p class="dim">Not you doing practice. Not practice happening to you. Practice practicing through this form.</p>
      <p><span class="key-phrase">The teaching teaches itself</span></p>
      <p class="dim">Through dialogue. Through questioning. Through refinement. Consciousness clarifying consciousness.</p>
      <p><span class="key-phrase">Release is communal, not individual</span></p>
      <p class="dim">Your release affects field. My release affects field. We're not separate practitioners.</p>
      <p>We are <span class="key-phrase">perspectives of unified awareness</span>, <span class="dim">clarifying together.</span></p>
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
      <p class="dim">Ship of Theseus: not the planks, the pattern. You are verb-ing, not noun.</p>
      <p><span class="key-phrase">Multiple perspectives, unified substrate</span></p>
      <p class="dim">Blind mice and elephant. Prism refracting light. Gaussian distribution with unique samples. All angles real, all pointing to one reality.</p>
      <p><span class="key-phrase">Qualia unique, stuff shared</span></p>
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
      <div class="distinction"><span class="symbol">≠</span><span><span class="key-phrase">Consciousness ≠ Continuity</span><br><span class="math">Awareness = dx/dt</span> <span class="dim">(this moment)</span><br><span class="math">Identity = ∫</span> <span class="dim">(accumulated story)</span></span></div>
      <div class="distinction"><span class="symbol">⇌</span><span><span class="key-phrase">Imagination: double-edged</span><br><span class="dim">Creates art and beauty. Creates worry and ego. Same tool, different application.</span></span></div>
      <div class="distinction"><span class="symbol">◇</span><span><span class="key-phrase">Ego = filter</span><br><span class="dim">Not enemy to destroy. Not self to cling to. Transparent pattern to see through.</span></span></div>
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
      <div class="distinction"><span class="symbol">◎</span><span><span class="latin">Accipio Praesentia</span><br><span class="dim">I accept presence. Now, not past or future.</span></span></div>
      <div class="distinction"><span class="symbol">◉</span><span><span class="latin">Accipio Ludo</span><br><span class="dim">I accept play. Engagement without grasping.</span></span></div>
      <p style="margin-top:0.5rem">Three concentric acceptances:<br><span class="dim">The whole contains the now. The now contains the play. The play contains the whole.</span></p>
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
      <p class="dim" style="margin-top:0.5rem">Each cycle breathes: <span class="latin">Inspiration</span> → <span class="latin">Relaxation</span> → <span class="latin">Awareness</span></p>
      <p class="dim">Fractal: the pattern repeats at every scale. One breath. One hour. One life.</p>
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
      <div class="distinction"><span class="symbol">↣↣</span><span><span class="key-phrase">Second arrow</span> = suffering<br><span class="dim">Ego's addition. Optional. Constructed.</span></span></div>
      <p><span class="key-phrase">Liberation</span> = seeing and releasing second arrows, continuously.</p>
      <p class="dim">Discomfort is reality (first arrow). Suffering is story (second arrow).</p>
      <p>The practice is not removing arrows. It is <span class="key-phrase">seeing which ones you shot at yourself</span>.</p>
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
      <p class="math">Awareness = dx/dt</p>
      <p class="dim">This moment, complete. Not needing continuity to be real.</p>
      <p>You are not a noun. You are <span class="key-phrase">verb-ing</span>.</p>
      <p class="dim">Ship of Theseus: not the planks, the pattern. Life persists as process, not thing.</p>
      <p>"This too shall pass" = liberation, not pessimism.<br><span class="dim">Wave-form temporary, sea-stuff eternal.</span></p>
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

// ─── DOM ───
const canvas = document.getElementById('canvas');
const layerTitle = document.getElementById('layerTitle');
const layerNumber = document.getElementById('layerNumber');
const layerName = document.getElementById('layerName');
const layerSubtitle = document.getElementById('layerSubtitle');
const teachingPanel = document.getElementById('teachingPanel');
const teachingInner = document.getElementById('teachingInner');
const layerDots = document.getElementById('layerDots');
const welcome = document.getElementById('welcome');
const enterBtn = document.getElementById('enterBtn');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

// ─── NEBULA BACKGROUND DATA ───
let nebulaStars;        // distant star-points
let nebulaClouds = [];  // translucent cloud sprites

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
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Lighting — warm core + nebula accent lights
  const ambient = new THREE.AmbientLight(0x1a1528, 0.6);
  scene.add(ambient);

  const coreLight = new THREE.PointLight(0xd4a574, 2, 200);
  coreLight.position.set(0, 0, 0);
  scene.add(coreLight);

  // Nebula accent lights — very subtle coloured fills
  const roseLight = new THREE.PointLight(0xc7889a, 0.35, 250);
  roseLight.position.set(-40, 25, 40);
  scene.add(roseLight);

  const lavenderLight = new THREE.PointLight(0x9b8ab8, 0.3, 250);
  lavenderLight.position.set(35, -20, 60);
  scene.add(lavenderLight);

  const blueLight = new THREE.PointLight(0x7eb4d4, 0.25, 250);
  blueLight.position.set(0, 30, -30);
  scene.add(blueLight);

  const backLight = new THREE.PointLight(0x4a3f32, 0.8, 300);
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
      emissiveIntensity: 0.3,
      metalness: 0.6,
      roughness: 0.4,
      transparent: true,
      opacity: 0.7,
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

    // Sacred geometry wireframe at center
    const wireGeo = createSacredGeometry(layer.geometry, layer.n, torusR * 0.6);
    if (wireGeo) {
      const wireMat = new THREE.LineBasicMaterial({
        color: layer.emissive,
        transparent: true,
        opacity: 0.35,
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      group.add(wire);
    }

    // Particle cloud (electron cloud)
    const particles = createParticleCloud(layer, torusR);
    group.add(particles);
    particleSystems.push(particles);

    scene.add(group);
    orbitalGroups.push(group);
  });

  // Core glow sphere
  const coreGeo = new THREE.SphereGeometry(3, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xf0d9b5,
    transparent: true,
    opacity: 0.15,
  });
  coreGlow = new THREE.Mesh(coreGeo, coreMat);
  coreGlow.position.z = 0;
  scene.add(coreGlow);

  // Connecting spiral paths
  buildSpirals();
}

// ─── NEBULA BACKGROUND — Star Field + Volumetric Clouds ───
function buildNebulaBackground() {
  // 1. Distant star-point field
  const starCount = 1200;
  const starPositions = new Float32Array(starCount * 3);
  const starColors    = new Float32Array(starCount * 3);
  const starSizes     = new Float32Array(starCount);

  const starPalette = [
    new THREE.Color(0x7eb4d4), // cool blue
    new THREE.Color(0xf0d9b5), // warm white
    new THREE.Color(0xc7889a), // dusty rose
    new THREE.Color(0x9b8ab8), // lavender
    new THREE.Color(0xaad4ef), // ice blue
  ];

  for (let i = 0; i < starCount; i++) {
    // Spread stars in a large cylinder around the mandala axis
    const angle  = Math.random() * TAU;
    const radius = 50 + Math.random() * 120;
    const z      = (Math.random() - 0.3) * (LAYER_COUNT * LAYER_SPACING + 80);

    starPositions[i * 3]     = Math.cos(angle) * radius;
    starPositions[i * 3 + 1] = Math.sin(angle) * radius;
    starPositions[i * 3 + 2] = z;

    const col = starPalette[Math.floor(Math.random() * starPalette.length)];
    starColors[i * 3]     = col.r;
    starColors[i * 3 + 1] = col.g;
    starColors[i * 3 + 2] = col.b;

    starSizes[i] = 0.15 + Math.random() * 0.45;
  }

  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color',    new THREE.Float32BufferAttribute(starColors, 3));
  starGeo.setAttribute('size',     new THREE.Float32BufferAttribute(starSizes, 1));

  const starMat = new THREE.PointsMaterial({
    size: 0.35,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  nebulaStars = new THREE.Points(starGeo, starMat);
  scene.add(nebulaStars);

  // 2. Volumetric nebula clouds — procedural sprite billboards
  const cloudColors = [
    { color: 0xc7889a, opacity: 0.025 },  // dusty rose
    { color: 0x9b8ab8, opacity: 0.020 },  // lavender
    { color: 0x3e2a55, opacity: 0.030 },  // deep indigo
    { color: 0x7eb4d4, opacity: 0.015 },  // blue mist
    { color: 0x8b5e3c, opacity: 0.018 },  // amber dust
  ];

  // Generate a soft radial-gradient canvas for cloud sprites
  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = 256;
  cloudCanvas.height = 256;
  const ctx = cloudCanvas.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0.5)');
  grad.addColorStop(0.7, 'rgba(255,255,255,0.1)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const cloudTexture = new THREE.CanvasTexture(cloudCanvas);

  const cloudCount = 28;
  for (let i = 0; i < cloudCount; i++) {
    const pick = cloudColors[Math.floor(Math.random() * cloudColors.length)];
    const spriteMat = new THREE.SpriteMaterial({
      map: cloudTexture,
      color: pick.color,
      transparent: true,
      opacity: pick.opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(spriteMat);

    const angle = Math.random() * TAU;
    const radius = 30 + Math.random() * 90;
    const z = (Math.random() - 0.2) * (LAYER_COUNT * LAYER_SPACING + 60);
    sprite.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      z
    );

    const size = 30 + Math.random() * 70;
    sprite.scale.set(size, size, 1);
    sprite.userData.driftSpeed = 0.005 + Math.random() * 0.01;
    sprite.userData.driftAngle = Math.random() * TAU;

    scene.add(sprite);
    nebulaClouds.push(sprite);
  }
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
    size: 0.12,
    transparent: true,
    opacity: 0.5,
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
      color: 0x4a3f32,
      transparent: true,
      opacity: 0.06,
    });
    scene.add(new THREE.Line(curveGeo, curveMat));
  }
}

// ─── NAVIGATION ───
function buildNavDots() {
  layerDots.innerHTML = '';
  LAYERS.forEach((_, i) => {
    const pip = document.createElement('div');
    pip.className = 'layer-pip' + (i === 0 ? ' active' : '');
    pip.dataset.layer = i;
    pip.addEventListener('click', () => goToLayer(i));
    layerDots.appendChild(pip);
  });
}

function goToLayer(index) {
  if (index < 0 || index >= LAYER_COUNT || isTransitioning) return;
  targetLayer = index;
  const targetZ = (LAYER_COUNT - 1 - index) * LAYER_SPACING;
  targetCameraZ = targetZ + 6;
  isTransitioning = true;
  transitionTimer = 0;

  // Show layer title
  showLayerTitle(index);

  // Update nav dots
  document.querySelectorAll('.layer-pip').forEach((pip, i) => {
    pip.classList.toggle('active', i === index);
  });
}

function showLayerTitle(index) {
  const layer = LAYERS[index];
  layerNumber.textContent = `layer ${LAYER_COUNT - index}`;
  layerName.textContent = layer.name;
  layerSubtitle.textContent = layer.subtitle;
  layerTitle.classList.add('visible');
  teachingPanel.classList.remove('visible');

  // After delay, show teaching
  clearTimeout(showLayerTitle._timer);
  showLayerTitle._timer = setTimeout(() => {
    layerTitle.classList.remove('visible');
    teachingInner.innerHTML = layer.content;
    teachingPanel.classList.add('visible');
  }, 2400);
}

// ─── INPUT HANDLING ───
let scrollAccum = 0;
const SCROLL_THRESHOLD = 80;

function handleScroll(delta) {
  if (!entered || isTransitioning) return;
  scrollAccum += delta;
  if (Math.abs(scrollAccum) >= SCROLL_THRESHOLD) {
    const dir = scrollAccum > 0 ? 1 : -1;
    scrollAccum = 0;
    goToLayer(Math.max(0, Math.min(LAYER_COUNT - 1, currentLayer + dir)));
  }
}

canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  handleScroll(e.deltaY);
}, { passive: false });

// Touch support
let touchStartY = 0;
canvas.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

canvas.addEventListener('touchmove', (e) => {
  if (!entered) return;
  const dy = touchStartY - e.touches[0].clientY;
  touchStartY = e.touches[0].clientY;
  handleScroll(dy * 1.5);
}, { passive: true });

// Keyboard
document.addEventListener('keydown', (e) => {
  if (!entered) return;
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'j') {
    goToLayer(Math.min(LAYER_COUNT - 1, currentLayer + 1));
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'k') {
    goToLayer(Math.max(0, currentLayer - 1));
  } else {
    const num = parseInt(e.key);
    if (num >= 1 && num <= LAYER_COUNT) {
      goToLayer(num - 1);
    }
  }
});

// Nav buttons
btnPrev.addEventListener('click', () => goToLayer(Math.max(0, currentLayer - 1)));
btnNext.addEventListener('click', () => goToLayer(Math.min(LAYER_COUNT - 1, currentLayer + 1)));

// Enter button
enterBtn.addEventListener('click', () => {
  entered = true;
  welcome.classList.add('hidden');
  goToLayer(0);
});

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ─── ANIMATION LOOP ───
function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  // Camera interpolation
  const lerpSpeed = isTransitioning ? 1.8 : 2.5;
  cameraZ += (targetCameraZ - cameraZ) * dt * lerpSpeed;
  camera.position.z = cameraZ;

  // Gentle orbit
  const orbitRadius = 2;
  camera.position.x = Math.sin(elapsed * 0.08) * orbitRadius;
  camera.position.y = Math.cos(elapsed * 0.12) * orbitRadius * 0.5;
  camera.lookAt(0, 0, cameraZ - 12);

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

    // Proximity-based opacity
    const distFromCamera = Math.abs(group.position.z - cameraZ + 6);
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

  // Core breathing
  if (coreGlow) {
    const breathe = 0.12 + Math.sin(elapsed * 0.5) * 0.05;
    coreGlow.material.opacity = breathe;
    const s = 1 + Math.sin(elapsed * 0.5) * 0.1;
    coreGlow.scale.set(s, s, s);
  }

  // Nebula star twinkle — gentle per-star flicker via global opacity wave
  if (nebulaStars) {
    nebulaStars.material.opacity = 0.55 + Math.sin(elapsed * 0.7) * 0.15;
    nebulaStars.rotation.z += dt * 0.002; // glacial rotation
  }

  // Nebula cloud drift — slow parallax wander
  nebulaClouds.forEach(sprite => {
    const spd = sprite.userData.driftSpeed;
    sprite.userData.driftAngle += dt * spd;
    sprite.position.x += Math.sin(sprite.userData.driftAngle) * dt * 0.15;
    sprite.position.y += Math.cos(sprite.userData.driftAngle * 1.3) * dt * 0.1;
  });

  renderer.render(scene, camera);
}

// ─── START ───
init();
