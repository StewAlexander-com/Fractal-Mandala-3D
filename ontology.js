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
      <p class="teaching-layer-lede">Something in you is aware right now. You didn’t start it. You can’t stop it. That’s where we begin.</p>
      <section class="teaching-block">
        <p><span class="key-phrase">The practice IS awareness practicing itself.</span></p>
        <p class="teaching-lede">You don’t have to create awareness — it’s already running. Practice is just noticing that it’s here.</p>
        <p class="dim">You can’t force yourself to fall asleep — you create the conditions and sleep comes. Awareness works the same way.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">If you look carefully, there is no little “you” standing outside awareness, switching it on. What Zen calls shikantaza and Vedanta calls sakshi is simply this: noticing and what is noticed arise together—they are one movement, not two players.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p><span class="key-phrase">The teaching teaches itself</span></p>
        <p class="teaching-lede">Understanding arrives — you don’t fetch it. Like fruit ripening: you can’t rush it, but you can stop blocking the sun.</p>
        <p class="dim">Getting confused, asking again, starting over — these aren’t failures. They’re how understanding actually grows.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Truth does not arrive only as a finished package in the head. Like water finding its level, understanding often comes when you stop forcing and let life move through you—questions, mistakes, conversations, silence.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p><span class="key-phrase">Release is communal, not individual</span></p>
        <p class="teaching-lede">When one person in a room calms down, the whole room shifts. We’re more connected than we think.</p>
        <p class="dim">Your peace is not private. It ripples outward. This is physics, not poetry.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">When one heart softens, the whole room can feel it. Ubuntu—“I am because we are”—rhymes with what physics says about relatedness: nothing lives in perfect isolation; we participate in one field.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p>We are <span class="key-phrase">perspectives of unified awareness</span>, <span class="dim">clarifying together.</span></p>
        <p class="teaching-lede">Many eyes, one world. Every viewpoint is real. Every viewpoint is incomplete.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Indra’s net pictures every jewel reflecting every other jewel. You can take that as poetry or as physics: each vantage is real, partial, and inseparable from the whole pattern of mutual seeing.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block teaching-block--quotes">
        <p class="quote">“Observe the wonders as they occur around you. Don’t claim them. Feel the artistry moving through, and be silent.”</p>
        <p class="quote-author">— Rumi</p>
        <p class="quote">“The quieter you become, the more you are able to hear.”</p>
        <p class="quote-author">— Rumi</p>
      </section>
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
      <p class="teaching-layer-lede">What looks solid is mostly movement. What looks separate is mostly connected.</p>
      <section class="teaching-block">
        <p><span class="key-phrase">Process, not substance</span></p>
        <p class="teaching-lede">A river isn’t the water — it’s the flowing. You aren’t your atoms — you’re what they’re doing right now.</p>
        <p class="dim">Every cell in your body replaces itself. The “you” from seven years ago is physically gone. And yet — here you are.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Stand in a river: the water you touch is never the same twice, yet we still say “the river.” Heraclitus, the Buddha on impermanence, and a physicist describing fields are naming one humble fact—what lasts is pattern and flow, not frozen “stuff.”</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p><span class="key-phrase">Multiple perspectives, unified substrate</span></p>
        <p class="teaching-lede">Three people touch an elephant in the dark. They each describe something different. They’re all right. They’re all incomplete.</p>
        <p class="dim">Your view and my view can both be honest and both be partial. That’s not a problem — that’s how reality is shaped.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">In the old story, each blind friend touches one part of an elephant and argues from that alone. Kant’s “thing in itself,” quantum complementarity, and honest disagreement between good people all say the same generous thing: one reality can look like many truths from different angles.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p><span class="key-phrase">Qualia unique, stuff shared</span></p>
        <p class="teaching-lede">Your experience is uniquely yours. And it’s made of the same stuff as everyone else’s.</p>
        <p class="dim">Your red and my red might look different inside our heads. But the light that makes them is the same light.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">No one else can wear your shoes from the inside—your pain, your joy, is privately felt. Yet we are built of the same elements, the same light. Brains differ; the world they meet is shared.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block teaching-block--quotes">
        <p class="quote">“No man ever steps in the same river twice, for it’s not the same river and he’s not the same man.”</p>
        <p class="quote-author">— Heraclitus</p>
        <p class="quote">“To see a world in a grain of sand and a heaven in a wild flower, hold infinity in the palm of your hand and eternity in an hour.”</p>
        <p class="quote-author">— William Blake, <em>Auguries of Innocence</em></p>
      </section>
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
      <p class="teaching-layer-lede">Four gentle untanglings. None of them asks you to feel bad for being confused — they just help you see more clearly.</p>
      <section class="teaching-block">
        <div class="distinction"><span class="symbol">≠</span><span><span class="key-phrase">Service ≠ Servitude</span><br><span class="dim">Service flows from gratitude ("get to"). Servitude flows from obligation ("have to").</span></span></div>
        <p class="teaching-lede">“Get to” feels completely different from “have to” — even when the action is the same.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">The heart can offer the same action in two opposite climates. Karma yoga in the Gita points to the difference: work offered without clinging to the fruit feels alive; the same task done only from fear of judgment feels like a cage. Learning to tell them apart is a whole life’s practice, taken one choice at a time.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <div class="distinction"><span class="symbol">≠</span><span><span class="key-phrase">Consciousness ≠ Continuity</span><br><span class="math">Awareness = dx/dt</span> <span class="dim">(this moment)</span><br><span class="math">Identity = ∫</span> <span class="dim">(accumulated story)</span></span></div>
        <p class="teaching-lede">Awareness is what’s happening right now. Identity is the story about all your nows. The story is useful — but it isn’t you.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Think of awareness as the living edge of now—like speed read off a speedometer at an instant (<span class="math">dx/dt</span>). The story of “who I am” is built over time, like an area under a curve (<span class="math">∫</span>). Both matter: the story helps you navigate; only the present moment is actually lived. Confusing the two is a common source of suffering—and it can be unwound with patience.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <div class="distinction"><span class="symbol">⇌</span><span><span class="key-phrase">Imagination: double-edged</span><br><span class="dim">Creates art and beauty. Creates worry and ego. Same tool, different application.</span></span></div>
        <p class="teaching-lede">The same brain that composes music also rehearses catastrophe at 3 a.m. The tool is neutral — what matters is how you hold it.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Imagination is not a mistake; it is one of our great gifts. The same mental machinery that composes music or loves a child can spin worry at night. The organ is not evil; how we train and meet it—with curiosity instead of war—changes everything.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <div class="distinction"><span class="symbol">◇</span><span><span class="key-phrase">Ego = filter</span><br><span class="dim">Not enemy to destroy. Not self to cling to. Transparent pattern to see through.</span></span></div>
        <p class="teaching-lede">A lens focuses light but isn’t the light. See through it, don’t fight it.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">“Ego” here means the sorting layer—preferences, protection, narrative—not the devil. Like eyeglasses, it shapes what you notice; it is not the seeing itself. We do not have to smash the glasses; we learn to notice when they are smudged.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block teaching-block--quotes">
        <p class="quote">“It is not things that disturb us, but our judgments about things.”</p>
        <p class="quote-author">— Epictetus, <em>Enchiridion</em></p>
        <p class="quote">“Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.”</p>
        <p class="quote-author">— Albert Einstein</p>
      </section>
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
      <p class="teaching-layer-lede">Three ways of saying “yes” to life. Not yes to harm — yes to reality. The difference between giving up and letting go.</p>
      <section class="teaching-block">
        <div class="distinction"><span class="symbol">◯</span><span><span class="latin">Accipio Toto</span><br><span class="dim">I accept the whole. Everything, including this.</span></span></div>
        <p class="teaching-lede">Not just the parts you like. All of it — including this moment, exactly as it is.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">This is the widest ring: the weather of a life includes loss and beauty together. Stoic amor fati, Islamic surrender, Nietzsche’s “eternal yes” are not commands to cheer for pain; they are invitations to stop wrestling the entire universe as if it owed you a different script.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <div class="distinction"><span class="symbol">◎</span><span><span class="latin">Accipio Praesentia</span><br><span class="dim">I accept presence. Now, not past or future.</span></span></div>
        <p class="teaching-lede">The past is memory. The future is imagination. Now is the only place anything actually happens.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Inside the whole lives the only moment your body can breathe: now. Memory and plan are useful; when we live only there, we miss the room we are in. Mindfulness (sati) is simply coming home to the coordinate we actually occupy.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <div class="distinction"><span class="symbol">◉</span><span><span class="latin">Accipio Ludo</span><br><span class="dim">I accept play. Engagement without grasping.</span></span></div>
        <p class="teaching-lede">Life gets lighter when you stop treating it as a problem to solve and start treating it as something to participate in.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Līlā—divine play—and Huizinga’s idea of homo ludens remind us that seriousness and joy can coexist. Play here means wholehearted participation without the white-knuckle need to control every outcome. Life breathes better when it is allowed to be lived, not only solved.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p style="margin-top:0.15rem;margin-bottom:0.35rem">Three concentric acceptances:<br><span class="dim">The whole contains the now. The now contains the play. The play contains the whole.</span></p>
        <p class="teaching-lede">These three nest like rings in a tree. The whole holds the now. The now holds the play. The play holds the whole.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">You can picture them as nested rings or Russian dolls: each layer fits inside the next. Turn the smallest ring—full presence in one playful breath—and you touch the shape of the largest.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block teaching-block--quotes">
        <p class="quote">“My formula for greatness in a human being is amor fati: that one wants nothing to be different, not forward, not backward, not in all eternity.”</p>
        <p class="quote-author">— Friedrich Nietzsche, <em>Ecce Homo</em></p>
        <p class="quote">“Accept the things to which fate binds you, and love the people with whom fate brings you together.”</p>
        <p class="quote-author">— Marcus Aurelius, <em>Meditations</em></p>
      </section>
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
      <p class="teaching-layer-lede">Five movements that renew themselves. Not a checklist — a cycle you walk kindly, every time you forget and remember.</p>
      <section class="teaching-block">
        <p>Five movements:</p>
        <ul>
          <li><span class="key-phrase">Meditate</span> — just be present, nothing to fix.</li>
          <li><span class="key-phrase">Let revelation emerge</span> — don’t force; make room.</li>
          <li><span class="key-phrase">Get curious</span> — “I don’t know yet” is an honest and brave thing to say.</li>
          <li><span class="key-phrase">Release second arrows</span> — the stories, the worry — put them down gently.</li>
          <li><span class="key-phrase">Return</span> — wandering is human; returning is the practice.</li>
        </ul>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context — why cycles work <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Wisdom traditions and honest science both trust loops over straight lines: try, learn, return, refine. A line promises a finish line and often burns people out; a cycle promises rest and renewal.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p class="teaching-lede">Every path that actually works is a circle, not a line.</p>
        <p class="dim">Each cycle breathes: <span class="latin">Inspiration</span> → <span class="latin">Relaxation</span> → <span class="latin">Awareness</span></p>
        <p class="dim">This pattern repeats at every scale. One breath. One conversation. One lifetime.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Inhale gathers attention; exhale softens grip; the still point between teaches what words cannot. You do not have to force this—your body already knows the rhythm.</span>
            <span class="explain">Nature is full of such echoes—river branches, lungs, lightning—different materials, similar pattern. Your inner work participates in that same generous grammar.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block teaching-block--quotes">
        <p class="quote">“Water is fluid, soft, and yielding. But water will wear away rock, which is rigid and cannot yield.”</p>
        <p class="quote-author">— Lao Tzu, <em>Tao Te Ching</em></p>
        <p class="quote">“I slept and dreamt that life was joy. I awoke and saw that life was service. I acted and behold, service was joy.”</p>
        <p class="quote-author">— Rabindranath Tagore</p>
      </section>
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
    subtitle: 'What You Add to What Happens',
    content: `
      <p class="teaching-layer-lede">A simple idea that changes everything — once you see it, you can’t unsee it. And there’s no blame here.</p>
      <section class="teaching-block">
        <div class="distinction"><span class="symbol">↣</span><span><span class="key-phrase">First arrow</span> = discomfort<br><span class="dim">Unavoidable. Natural. Informational.</span></span></div>
        <p class="teaching-lede">You stubbed your toe. That hurts. That’s real.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">The first arrow is whatever life delivers—pain, loss, illness, another person’s words, a mistake you cannot undo. Bodies and hearts signal trouble the way a fire alarm signals heat. The signal can be sharp and still be honest, not personal punishment.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <div class="distinction"><span class="symbol">↣↣</span><span><span class="key-phrase">Second arrow</span> = suffering<br><span class="dim">Ego's addition. Optional. Constructed.</span></span></div>
        <p class="teaching-lede">“Why does this always happen to me?” “I’m so clumsy.” That part — you added that.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">The second arrow is what we add: “I should not feel this,” “I am ruined,” “it will always be this way,” endless rehearsal. The Sallatha Sutta, Epictetus, and modern CBT all point here—the extra layer is real in experience, yet it is built from thoughts and habits we can meet and soften.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p><span class="key-phrase">Liberation</span> = seeing and releasing second arrows, continuously.</p>
        <p class="teaching-lede">The first arrow is life. The second arrow is the commentary. Most of our suffering lives in the commentary.</p>
        <p class="dim">Discomfort is reality (first arrow). Suffering is story (second arrow).</p>
        <p>The practice is not removing arrows. It is <span class="key-phrase">seeing which ones you shot at yourself</span>.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Freedom is not a one-time escape from pain; it is an ongoing friendship with truth—letting the first arrow be what it is while refusing, when we can, to pour salt in the wound.</span>
            <span class="explain">Research on self-compassion supports what contemplatives have long said: naming our self-inflicted layer without cruelty loosens its grip. Awareness is not magic, but it is often the first half of healing.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block teaching-block--quotes">
        <p class="quote">“In life, we cannot always control the first arrow. However, the second arrow is our reaction to the first.”</p>
        <p class="quote-author">— The Buddha, <em>Sallatha Sutta</em></p>
        <p class="quote">“The wound is the place where the Light enters you.”</p>
        <p class="quote-author">— Rumi</p>
      </section>
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
    subtitle: 'This Moment, Complete',
    content: `
      <p class="teaching-layer-lede">The center of everything isn’t a thing. It’s a happening.</p>
      <section class="teaching-block">
        <p>The irreducible point. Not a thing — a <span class="key-phrase">process</span>.</p>
        <p class="teaching-lede">Right now, you are aware. That’s it. That’s the whole miracle.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Physics speaks of events, Buddhism of dharmas as momentary phenomena, Whitehead of “occasions of experience.” Different words; one picture: the smallest unit of reality is something happening, not a lump sitting on a shelf.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p class="math">Awareness = dx/dt</p>
        <p class="teaching-lede">Not awareness of something — just the fact of being aware at all.</p>
        <p class="dim">This moment is complete. It doesn’t need yesterday’s approval or tomorrow’s permission.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">If you have not touched calculus in years, read this only as poetry with a little math: <span class="math">dx/dt</span> is “how fast something is changing, right at this instant.” Awareness is like that edge—alive, moving, never a frozen statue of itself.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p>You are not a noun. You are <span class="key-phrase">verb-ing</span>.</p>
        <p class="teaching-lede">Not a fixed self moving through time — a process, renewing itself each moment. Like a flame that persists by constantly changing.</p>
        <p class="dim">You are not a frozen snapshot. You are the river itself.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Some languages lean toward events rather than objects; neuroscience describes a self reassembled from signals each moment. Nothing here cancels memory or care—it simply says: your depth is in the living, not in a label.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block">
        <p>"This too shall pass" = liberation, not pessimism.<br><span class="dim">Wave-form temporary, sea-stuff eternal.</span></p>
        <p class="teaching-lede">“This too shall pass” isn’t sad. It’s the most liberating sentence in any language.</p>
        <details class="teaching-details">
          <summary class="teaching-details__summary">Additional context <span class="teaching-details__chevron" aria-hidden="true"></span></summary>
          <div class="teaching-details__inner">
            <span class="explain">Grief and joy both arrive and change; that is not coldness—it is room to begin again. Sufi wisdom, thermodynamics, and anicca agree on a gentle fact: letting go is how life keeps moving, and movement is how anything new can reach you.</span>
          </div>
        </details>
      </section>
      <section class="teaching-block teaching-block--quotes">
        <p class="quote">“The art of progress is to preserve order amid change and to preserve change amid order.”</p>
        <p class="quote-author">— Alfred North Whitehead, <em>Process and Reality</em></p>
        <p class="quote">“There is only one moment for you to be alive, and that is the present moment.”</p>
        <p class="quote-author">— Thich Nhat Hanh</p>
      </section>
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
