/**
 * ONTOLOGY — invariant data only: seven layers, spacing, physical tilts, communal lineage.
 * No dynamics; no session variance. Import from here wherever the shell is referenced.
 */
import * as THREE from 'three';

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
      <p class="quote">“Observe the wonders as they occur around you. Don’t claim them. Feel the artistry moving through, and be silent.”</p>
      <p class="quote-author">— Rumi</p>
      <p class="quote">“The quieter you become, the more you are able to hear.”</p>
      <p class="quote-author">— Rumi</p>
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
      <p class="quote">“No man ever steps in the same river twice, for it’s not the same river and he’s not the same man.”</p>
      <p class="quote-author">— Heraclitus</p>
      <p class="quote">“To see a world in a grain of sand and a heaven in a wild flower, hold infinity in the palm of your hand and eternity in an hour.”</p>
      <p class="quote-author">— William Blake, <em>Auguries of Innocence</em></p>
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
      <p class="quote">“It is not things that disturb us, but our judgments about things.”</p>
      <p class="quote-author">— Epictetus, <em>Enchiridion</em></p>
      <p class="quote">“Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.”</p>
      <p class="quote-author">— Albert Einstein</p>
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
      <p class="quote">“My formula for greatness in a human being is amor fati: that one wants nothing to be different, not forward, not backward, not in all eternity.”</p>
      <p class="quote-author">— Friedrich Nietzsche, <em>Ecce Homo</em></p>
      <p class="quote">“Accept the things to which fate binds you, and love the people with whom fate brings you together.”</p>
      <p class="quote-author">— Marcus Aurelius, <em>Meditations</em></p>
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
      <p class="quote">“Water is fluid, soft, and yielding. But water will wear away rock, which is rigid and cannot yield.”</p>
      <p class="quote-author">— Lao Tzu, <em>Tao Te Ching</em></p>
      <p class="quote">“I slept and dreamt that life was joy. I awoke and saw that life was service. I acted and behold, service was joy.”</p>
      <p class="quote-author">— Rabindranath Tagore</p>
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
      <p class="quote">“In life, we cannot always control the first arrow. However, the second arrow is our reaction to the first.”</p>
      <p class="quote-author">— The Buddha, <em>Sallatha Sutta</em></p>
      <p class="quote">“The wound is the place where the Light enters you.”</p>
      <p class="quote-author">— Rumi</p>
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
      <p class="quote">“The art of progress is to preserve order amid change and to preserve change amid order.”</p>
      <p class="quote-author">— Alfred North Whitehead, <em>Process and Reality</em></p>
      <p class="quote">“There is only one moment for you to be alive, and that is the present moment.”</p>
      <p class="quote-author">— Thich Nhat Hanh</p>
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
const LAYER_TILTS = [
  { x:  0.25, y:  0.15, z:  0.0  },   // outermost — gentle forward lean
  { x: -0.18, y:  0.30, z:  0.12 },
  { x:  0.35, y: -0.10, z: -0.15 },
  { x: -0.12, y: -0.25, z:  0.20 },
  { x:  0.20, y:  0.20, z: -0.10 },
  { x: -0.30, y:  0.08, z:  0.15 },
  { x:  0.10, y: -0.35, z: -0.08 },   // innermost — tilt away
];
// ─── COMMUNAL PRESENCE — lineage of minds who sat here ───
const LINEAGE = [
  // Layer 1 — Meta-Recognition
  ['Dōgen', 'Śaṅkara', 'Rumi', 'Desmond Tutu', 'David Bohm'],
  // Layer 2 — Structural Insights
  ['Heraclitus', 'The Buddha', 'William Blake', 'Kant', 'Niels Bohr'],
  // Layer 3 — Key Distinctions
  ['Epictetus', 'Einstein', 'Bhagavad Gītā', 'Aaron Beck', 'Spinoza'],
  // Layer 4 — Three Acceptances
  ['Nietzsche', 'Marcus Aurelius', 'Meister Eckhart', 'Huizinga', 'Ibn Arabi'],
  // Layer 5 — The Practice
  ['Lao Tzu', 'Tagore', 'Jalāl ad-Dīn Rūmī', 'Patañjali', 'Karl Popper'],
  // Layer 6 — The Second Arrow
  ['The Buddha', 'Epictetus', 'Rumi', 'Kristin Neff', 'Viktor Frankl'],
  // Layer 7 — Core Awareness
  ['Whitehead', 'Thich Nhat Hanh', 'Benjamin Lee Whorf', 'Nāgārjuna', 'Ilya Prigogine'],
];

export {
  LAYERS,
  TAU,
  LAYER_COUNT,
  LAYER_SPACING,
  LAYER_TILTS,
  LINEAGE,
};
