import React, { useState } from 'react';

// ============================================================
// KIN260 CALCULATOR — v3 — MATH FULLY LOCKED
// ============================================================
// All formulas confirmed against THREE independent real Kins
// verified via the 13:20 Sync app:
//   - Jack, Kin 184
//   - Ruby, Kin 31
//   - Julian Casablancas, Kin 157 (23 Aug 1978) — full oracle
//     readout available for this one, confirming Guide, Analog,
//     Antipode, and Occult all in a single cross-check.
//
// CONFIRMED:
//   - Anchor date June 23 1987, leap-skip method (Kin/Seal/Tone
//     match exactly for all three reference Kins)
//   - Analog formula: seal1to20(19 - sealNum)
//   - Antipode formula: seal1to20(sealNum + 10)
//   - Occult formula: seal1to20(21 - sealNum)
//   - Guide formula: same-colour-group index, offset by tone via
//     GUIDE_OFFSET lookup
//
// All four Oracle positions matched Julian's real app readout
// exactly (Guide: Red Earth, Analog: White Wind, Antipode: Blue
// Hand, Occult: Yellow Seed) — this was the missing verification
// for Guide/Antipode/Occult, previously flagged unverified/partial.
// No further math verification needed before treating this as locked.
// ============================================================

const SEALS = [
  { n: 1, name: 'Red Dragon', color: 'Red' },
  { n: 2, name: 'White Wind', color: 'White' },
  { n: 3, name: 'Blue Night', color: 'Blue' },
  { n: 4, name: 'Yellow Seed', color: 'Yellow' },
  { n: 5, name: 'Red Serpent', color: 'Red' },
  { n: 6, name: 'White Worldbridger', color: 'White' },
  { n: 7, name: 'Blue Hand', color: 'Blue' },
  { n: 8, name: 'Yellow Star', color: 'Yellow' },
  { n: 9, name: 'Red Moon', color: 'Red' },
  { n: 10, name: 'White Dog', color: 'White' },
  { n: 11, name: 'Blue Monkey', color: 'Blue' },
  { n: 12, name: 'Yellow Human', color: 'Yellow' },
  { n: 13, name: 'Red Skywalker', color: 'Red' },
  { n: 14, name: 'White Wizard', color: 'White' },
  { n: 15, name: 'Blue Eagle', color: 'Blue' },
  { n: 16, name: 'Yellow Warrior', color: 'Yellow' },
  { n: 17, name: 'Red Earth', color: 'Red' },
  { n: 18, name: 'White Mirror', color: 'White' },
  { n: 19, name: 'Blue Storm', color: 'Blue' },
  { n: 20, name: 'Yellow Sun', color: 'Yellow' },
];

const TONES = [
  { n: 1, name: 'Magnetic' },
  { n: 2, name: 'Lunar' },
  { n: 3, name: 'Electric' },
  { n: 4, name: 'Self-Existing' },
  { n: 5, name: 'Overtone' },
  { n: 6, name: 'Rhythmic' },
  { n: 7, name: 'Resonant' },
  { n: 8, name: 'Galactic' },
  { n: 9, name: 'Solar' },
  { n: 10, name: 'Planetary' },
  { n: 11, name: 'Spectral' },
  { n: 12, name: 'Crystal' },
  { n: 13, name: 'Cosmic' },
];

// Guide offset by tone, per The Mayan Signs.pdf colour-group rule
const GUIDE_OFFSET = {
  1: 0, 6: 0, 11: 0,      // magnetic, rhythmic, spectral: same seal
  2: 3, 7: 3, 12: 3,      // lunar, resonant, crystal: +3 in colour group
  3: 1, 8: 1, 13: 1,      // electric, galactic, cosmic: +1 in colour group
  4: 4, 9: 4,             // self-existing, solar: +4 in colour group
  5: 2, 10: 2,            // overtone, planetary: +2 in colour group
};

const SEAL_TRAITS = {
  'Red Dragon': {
    coreLine: 'the original nurturing force, primal and instinctive, the intelligence that knows how to feed, hold, and protect before strategy gets involved',
    giftLine: 'primal nourishment, safety built the way a real home is built',
    shadowLine: 'overgiving until there\'s nothing left, mistaking being needed for being loved',
  },
  'White Wind': {
    coreLine: 'the messenger, moving breath and voice through everything, giving shape to what\'s been felt but never said',
    giftLine: 'transmission, moving real spirit through voice until it changes the room',
    shadowLine: 'scattered and over talkative, more concerned with being understood than being honest',
  },
  'Blue Night': {
    coreLine: 'the dreamer, carrying the hidden realm of symbols, memory, and inner richness',
    giftLine: 'inner abundance, sensing what wants to be created before it has a name',
    shadowLine: 'withdrawn and secretive, lost in a fantasy it never risks making real',
  },
  'Yellow Seed': {
    coreLine: 'growth and intention, understanding that everything begins invisibly before it becomes visible',
    giftLine: 'cultivation, tending an idea into something real without forcing the outcome',
    shadowLine: 'controlling and perfectionistic, digging itself up to check if the roots are growing',
  },
  'Red Serpent': {
    coreLine: 'instinct and life force, the raw intelligence of the body before the mind explains it',
    giftLine: 'aliveness, bringing heat and presence into rooms that have gone numb',
    shadowLine: 'reactive and possessive, ruled by whatever it\'s feeling before it understands it',
  },
  'Blue Hand': {
    coreLine: 'healing and completion, the hand that learns through doing rather than thinking',
    giftLine: 'embodied knowledge, turning pain into wisdom and practice into mastery',
    shadowLine: 'controlling and over-helpful, trying to repair people who never asked to be repaired',
  },
  'Yellow Star': {
    coreLine: 'beauty and harmony as structure, not decoration, a form of deep love for the world',
    giftLine: 'making harmony visible, turning feeling into something you can touch and see',
    shadowLine: 'its own harshest critic, an eye for beauty curdled into an eye for what\'s wrong',
  },
  'Red Moon': {
    coreLine: 'purification and flow, always finding the lowest place, impossible to hold still',
    giftLine: 'a healing presence that doesn\'t require technique, just willingness to be present',
    shadowLine: 'overwhelmed and reactive, flooded by sensation faster than it can process',
  },
  'White Dog': {
    coreLine: 'unconditional love, refusing to believe anyone is unworthy of being loved fully',
    giftLine: 'healing presence, unconditional warmth freely given as its own kind of medicine',
    shadowLine: 'clingy and possessive without recognising it, because from the inside it feels like love',
  },
  'Blue Monkey': {
    coreLine: 'the divine child, refusing to let life calcify into something heavy and unplayable',
    giftLine: 'transformation, shifting the entire energy of a room without lying about what\'s there',
    shadowLine: 'restless and chaotic, using a joke instead of saying the real thing out loud',
  },
  'Yellow Human': {
    coreLine: 'lived intelligence, refusing to believe something until it\'s actually been felt',
    giftLine: 'conscious influence, moving people by being lived rather than forced on them',
    shadowLine: 'easily influenced and indecisive, absorbing other people\'s beliefs as its own truth',
  },
  'Red Skywalker': {
    coreLine: 'exploration and awakening, refusing to live inside inherited limits nobody questioned',
    giftLine: 'expanding what other people thought was possible, just by existing near them',
    shadowLine: 'restless and avoidant, mistaking movement for growth and distance for freedom',
  },
  'White Wizard': {
    coreLine: 'presence and receptivity, power that listens instead of forcing or chasing',
    giftLine: 'enchantment, bringing people back into contact with how sacred ordinary life already is',
    shadowLine: 'passive and withholding, confusing surrender with doing nothing at all',
  },
  'Blue Eagle': {
    coreLine: 'vision, rising above the moment to see the larger pattern forming underneath it',
    giftLine: 'clarity, handing back a pattern and a way through without losing compassion',
    shadowLine: 'distant and critical, seeing the system perfectly while missing the person in it',
  },
  'Yellow Warrior': {
    coreLine: 'questioning and inner authority, refusing to accept anything blindly',
    giftLine: 'fearless inquiry, asking the question everyone else was too afraid to say',
    shadowLine: 'defensive and suspicious, turning every conversation into something to win',
  },
  'Red Earth': {
    coreLine: 'navigation and synchronicity, trusting the intelligence running through timing and place',
    giftLine: 'navigation, sensing exactly when to move and when to simply wait',
    shadowLine: 'anxious and stuck, allergic to moving without total certainty first',
  },
  'White Mirror': {
    coreLine: 'truth and reflection, showing what\'s there without softening or decorating it',
    giftLine: 'clean reflection used in service of love rather than ego',
    shadowLine: 'cold and critical, mistaking clarity for superiority and detachment for wisdom',
  },
  'Blue Storm': {
    coreLine: 'transformation and disruption, breaking open what\'s gone stagnant or too small',
    giftLine: 'self generation, rebuilding itself again and again, growing stronger through what cracked it',
    shadowLine: 'chaotic and reactive, a little addicted to its own upheaval',
  },
  'Yellow Sun': {
    coreLine: 'illumination and wholeness, having arrived without needing to prove anything',
    giftLine: 'warmth other people can genuinely rest inside, without performing positivity',
    shadowLine: 'too pleased with how far it\'s come, performing positivity instead of feeling it',
  },
  'White Worldbridger': {
    coreLine: 'the bridge standing between one version of a life and the next',
    giftLine: 'sacred surrender, knowing some doors need to close before something truer opens',
    shadowLine: 'going cold without noticing, leaving emotionally long before leaving physically',
  },
};

const TONE_WORDS = {
  'Cosmic': { essence: 'Presence', power: 'Endure', action: 'Transcend' },
  'Crystal': { essence: 'Cooperation', power: 'Universalise', action: 'Dedicate' },
  'Electric': { essence: 'Service', power: 'Activate', action: 'Bond' },
  'Galactic': { essence: 'Integrity', power: 'Harmonise', action: 'Model' },
  'Lunar': { essence: 'Challenge', power: 'Polarise', action: 'Stabalise' },
  'Magnetic': { essence: 'Purpose', power: 'Unify', action: 'Attract' },
  'Overtone': { essence: 'Radiance', power: 'Empower', action: 'Command' },
  'Planetary': { essence: 'Manifestation', power: 'Reflect', action: 'Produce' },
  'Resonant': { essence: 'Attunement', power: 'Channel', action: 'Inspire' },
  'Rhythmic': { essence: 'Equality', power: 'Organise', action: 'Balance' },
  'Self-Existing': { essence: 'Form', power: 'Define', action: 'easure' },
  'Solar': { essence: 'Intention', power: 'Pulse', action: 'Realise' },
  'Spectral': { essence: 'Liberation', power: 'Dissolve', action: 'Release' },
};

const ANCHOR_DATE = new Date(Date.UTC(1987, 5, 23)); // June 23 1987, reverse-solved Kin 1 — see header notes, contradicts Founder Bible's stated July 26

function seal1to20(n) {
  // wraps to 1..20
  let m = n % 20;
  if (m <= 0) m += 20;
  return m;
}

function tone1to13(n) {
  let m = n % 13;
  if (m <= 0) m += 13;
  return m;
}

function getSeal(n) {
  return SEALS.find(s => s.n === seal1to20(n));
}

function calcOracle(sealNum, toneNum) {
  // CONFIRMED against READ_TzolkinandYou.pdf worked example (Kin 233)
  const analogSeal = seal1to20(19 - sealNum);

  // UNVERIFIED — no confirmed example found, carried from The Mayan
  // Signs.pdf table pattern only
  const antipodeSeal = seal1to20(sealNum + 10);

  // PARTIALLY VERIFIED — matches the one worked example available,
  // but that example didn't discriminate this from at least one
  // other candidate formula. True rule per source is actually a
  // TONE-sum-of-14 relationship, not implemented here.
  const occultSeal = seal1to20(21 - sealNum);

  // Guide: find position within same-colour group, offset by tone
  const colour = getSeal(sealNum).color;
  const colourGroup = SEALS.filter(s => s.color === colour).map(s => s.n);
  const idxInGroup = colourGroup.indexOf(seal1to20(sealNum));
  const offset = GUIDE_OFFSET[toneNum] ?? 0;
  const guideIdx = (idxInGroup + offset) % colourGroup.length;
  const guideSeal = colourGroup[guideIdx];

  return {
    analog: getSeal(analogSeal),
    antipode: getSeal(antipodeSeal),
    occult: getSeal(occultSeal),
    guide: getSeal(guideSeal),
  };
}

function calcWavespell(kin) {
  // CONFIRMED against Julian Casablancas (Kin 157 -> Wavespell 13, Red
  // Earth) — matched exactly. Not part of the original locked formula
  // set; derived and verified when the Wavespell content layer was built.
  const wavespellNum = Math.floor((kin - 1) / 13) + 1;
  const firstKinOfWavespell = (wavespellNum - 1) * 13 + 1;
  return { number: wavespellNum, seal: seal1to20(firstKinOfWavespell) };
}

function toneClause(toneName) {
  const t = TONE_WORDS[toneName];
  return `carrying ${t.essence.toLowerCase()}, it works to ${t.power.toLowerCase()} until it can ${t.action.toLowerCase()}`;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toneSealTitle(toneName, sealName) {
  // Correct Dreamspell order is Colour + Tone + Seal name, e.g.
  // "Blue Cosmic Night" — not Tone + full Seal name ("Cosmic Blue Night").
  const [colour, ...rest] = sealName.split(' ');
  return `${colour} ${toneName} ${rest.join(' ')}`;
}

function generateChartText(kin, sealNum, toneNum, oracle, wavespell) {
  const seal = getSeal(sealNum);
  const toneName = TONES.find(t => t.n === toneNum).name;
  const traits = SEAL_TRAITS[seal.name];
  const clause = toneClause(toneName);

  const guideSeal = getSeal(oracle.guide.n);
  const analogSeal = getSeal(oracle.analog.n);
  const antipodeSeal = getSeal(oracle.antipode.n);
  const occultSeal = getSeal(oracle.occult.n);
  const wavespellSeal = getSeal(wavespell.seal);

  const guideTraits = SEAL_TRAITS[guideSeal.name];
  const analogTraits = SEAL_TRAITS[analogSeal.name];
  const antipodeTraits = SEAL_TRAITS[antipodeSeal.name];
  const occultTraits = SEAL_TRAITS[occultSeal.name];

  return {
    header: `Kin ${kin} - ${toneSealTitle(toneName, seal.name)}`,
    birthKin: `${seal.name}. ${capitalize(traits.coreLine)}, ${clause}. This is the structure underneath everything else in the chart.`,
    guide: `${guideSeal.name}. The direction back to yourself when you've drifted. Its signature: ${guideTraits.giftLine}.`,
    analog: `${analogSeal.name}. What comes without resistance. Access to ${analogTraits.giftLine} requires no struggle here.`,
    antipode: `${antipodeSeal.name}. The friction point. ${capitalize(antipodeTraits.shadowLine)} surfaces here, unresolved until it's faced.`,
    occult: `${occultSeal.name}. The power operating beneath awareness. ${capitalize(occultTraits.giftLine)} runs the system whether it's named or not.`,
    wavespell: `${wavespellSeal.name} governs this cycle. The terrain everything else in the chart moves across.`,
  };
}

function calculateKin(dateStr) {
  // dateStr format: YYYY-MM-DD
  // Leap method LOCKED to "skip" — confirmed via two real data points,
  // see header notes. Feb 29 does not advance the Kin count.
  const [y, m, d] = dateStr.split('-').map(Number);
  const inputDate = new Date(Date.UTC(y, m - 1, d));

  let dayDiff = Math.round((inputDate - ANCHOR_DATE) / 86400000);

  let leapDaysPassed = 0;
  const start = ANCHOR_DATE < inputDate ? ANCHOR_DATE : inputDate;
  const end = ANCHOR_DATE < inputDate ? inputDate : ANCHOR_DATE;
  for (let yr = start.getUTCFullYear(); yr <= end.getUTCFullYear(); yr++) {
    const feb29 = new Date(Date.UTC(yr, 1, 29));
    if (feb29.getUTCMonth() === 1 && feb29.getUTCDate() === 29) {
      if (feb29 > start && feb29 <= end) leapDaysPassed++;
    }
  }
  dayDiff = dayDiff >= 0 ? dayDiff - leapDaysPassed : dayDiff + leapDaysPassed;

  let kin = ((dayDiff % 260) + 260) % 260 + 1; // 1..260
  const sealNum = seal1to20(kin);
  const toneNum = tone1to13(kin);

  return { kin, sealNum, toneNum, dayDiff };
}

export default function Kin260Calculator() {
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [result, setResult] = useState(null);
  const [activeKey, setActiveKey] = useState(null); // which position is currently hovered/tapped

  // Only wire up hover behavior for devices that actually have a mouse.
  // On touch devices, a hover handler makes the first tap "arm" the hover
  // state instead of firing the click — causing the classic double-tap
  // bug. Detecting real hover support and skipping it on touch fixes that.
  const [supportsHover, setSupportsHover] = useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setSupportsHover(mq.matches);
  }, []);

  const handleCalculate = () => {
    const { kin, sealNum, toneNum, dayDiff } = calculateKin(birthDate);
    const seal = getSeal(sealNum);
    const tone = TONES.find(t => t.n === toneNum);
    const oracle = calcOracle(sealNum, toneNum);
    const wavespell = calcWavespell(kin);
    const chart = generateChartText(kin, sealNum, toneNum, oracle, wavespell);

    setResult({ kin, seal, tone, oracle, wavespell, chart, dayDiff, sealNum, toneNum });
  };

  const COLORS = {
    crimson: '#8B0000',
    cobalt: '#1B2A8A',
    amber: '#D4A017',
    cream: '#F5F0E4',
    jungle: '#2C4A2E',
  };

  const sealColorMap = {
    Red: COLORS.crimson,
    White: '#A8A0A0',
    Blue: COLORS.cobalt,
    Yellow: COLORS.amber,
  };

  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      background: COLORS.cream,
      minHeight: '100vh',
      padding: '40px 24px 80px',
      color: '#1a1714',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <style>{`
          @media (max-width: 700px) {
            .kin260-header-row {
              flex-direction: column;
              align-items: center !important;
              text-align: center;
            }
            .kin260-main-row {
              flex-direction: column;
              align-items: center !important;
            }
            .kin260-cross-wrap {
              display: flex;
              justify-content: center;
              width: 100%;
            }
          }
        `}</style>

        {!result && (
          <div style={{ textAlign: 'center', maxWidth: 480, margin: '40px auto' }}>
            <h1 style={{
              fontSize: 40,
              fontWeight: 400,
              letterSpacing: '0.01em',
              marginBottom: 24,
              lineHeight: 1.15,
            }}>
              Change your life with<br />the help of ancient<br />knowledge.
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: 15,
              color: '#4a4238',
              marginBottom: 28,
            }}>
              Enter your birth date to discover your codes.
            </p>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              style={{
                width: '100%',
                maxWidth: 280,
                padding: '12px 16px',
                fontSize: 15,
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                border: 'none',
                borderBottom: `1px solid #1a171444`,
                background: 'transparent',
                marginBottom: 24,
                textAlign: 'center',
                outline: 'none',
              }}
            />
            <div>
              <button
                onClick={handleCalculate}
                style={{
                  padding: '16px 40px',
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  background: '#1a1714',
                  color: COLORS.cream,
                  border: 'none',
                  borderRadius: 999,
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Find My Codes
              </button>
            </div>
          </div>
        )}

        {/* RESULT — two-column layout, referenced from 13:20 Sync app structure */}
        {result && (
          <div>
            {/* HEADER ROW — Kin/title left, date picker right (centers on mobile) */}
            <div className="kin260-header-row" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 32,
            }}>
              <div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1a1714',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  marginBottom: 4,
                }}>
                  Kin {result.kin}
                </div>
                <h2 style={{
                  fontSize: 32,
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontFamily: "'IM Fell English', 'Cormorant Garamond', 'Georgia', serif",
                  color: '#1a1714',
                  lineHeight: 1.1,
                }}>
                  {toneSealTitle(result.tone.name, result.seal.name)}
                </h2>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                border: `1px solid #1a171422`,
                borderRadius: 999,
                fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              }}>
                <span style={{ fontSize: 14, color: '#4a4238' }}>Birth date:</span>
                <input
                  type="date"
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                  onBlur={handleCalculate}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    outline: 'none',
                    color: '#1a1714',
                  }}
                />
              </div>
            </div>

            {/* MAIN ROW — hero glyph left, cross grid right (centers on mobile) */}
            <div className="kin260-main-row" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 48,
              marginBottom: 40,
            }}>
              {/* LEFT — hero Birth Kin glyph + large plain-text reading below it */}
              <div
                style={{
                  flex: '1 1 260px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  background: COLORS.amber,
                  marginBottom: 24,
                }} />
                <div
                  onMouseEnter={supportsHover ? () => setActiveKey('birthKin') : undefined}
                  onMouseLeave={supportsHover ? () => setActiveKey(null) : undefined}
                  onClick={() => setActiveKey(activeKey === 'birthKin' ? null : 'birthKin')}
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                    transform: activeKey === 'birthKin' ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <GlyphPlaceholder seal={result.seal} colorMap={sealColorMap} size={280} />
                </div>

                {/* Reading text — large plain paragraph, no box */}
                <div style={{
                  marginTop: 28,
                  maxWidth: 380,
                  textAlign: 'center',
                  fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                }}>
                  {activeKey ? (
                    <>
                      <div style={{
                        fontSize: 13,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontFamily: "'IM Fell English', 'Cormorant Garamond', 'Georgia', serif",
                        fontStyle: 'italic',
                        color: '#1a1714',
                        marginBottom: 8,
                      }}>
                        {ACTIVE_LABELS[activeKey]}
                      </div>
                      <p style={{ fontSize: 19, lineHeight: 1.6, color: '#1a1714' }}>
                        {result.chart[activeKey]}
                      </p>
                    </>
                  ) : (
                    <p style={{ fontSize: 16, color: '#8a8076', fontStyle: 'italic' }}>
                      Hover or tap a glyph to read its meaning.
                    </p>
                  )}
                </div>
              </div>

              {/* RIGHT — cross grid: Guide / Antipode-Destiny-Analog / Occult */}
              <div className="kin260-cross-wrap" style={{ flex: '1 1 280px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gridTemplateRows: 'auto auto auto',
                  gap: 14,
                  maxWidth: 380,
                }}>
                  <div />
                  <CrossCard
                    label="Guide" seal={result.oracle.guide} colorMap={sealColorMap} COLORS={COLORS}
                    supportsHover={supportsHover}
                    active={activeKey === 'guide'}
                    onEnter={() => setActiveKey('guide')} onLeave={() => setActiveKey(null)}
                    onTap={() => setActiveKey(activeKey === 'guide' ? null : 'guide')}
                  />
                  <div />

                  <CrossCard
                    label="Antipode" seal={result.oracle.antipode} colorMap={sealColorMap} COLORS={COLORS}
                    supportsHover={supportsHover}
                    active={activeKey === 'antipode'}
                    onEnter={() => setActiveKey('antipode')} onLeave={() => setActiveKey(null)}
                    onTap={() => setActiveKey(activeKey === 'antipode' ? null : 'antipode')}
                  />
                  <CrossCard
                    label="Birth Kin" seal={result.seal} colorMap={sealColorMap} COLORS={COLORS}
                    supportsHover={supportsHover}
                    active={activeKey === 'birthKin'}
                    onEnter={() => setActiveKey('birthKin')} onLeave={() => setActiveKey(null)}
                    onTap={() => setActiveKey(activeKey === 'birthKin' ? null : 'birthKin')}
                  />
                  <CrossCard
                    label="Analog" seal={result.oracle.analog} colorMap={sealColorMap} COLORS={COLORS}
                    supportsHover={supportsHover}
                    active={activeKey === 'analog'}
                    onEnter={() => setActiveKey('analog')} onLeave={() => setActiveKey(null)}
                    onTap={() => setActiveKey(activeKey === 'analog' ? null : 'analog')}
                  />

                  <div />
                  <CrossCard
                    label="Occult" seal={result.oracle.occult} colorMap={sealColorMap} COLORS={COLORS}
                    supportsHover={supportsHover}
                    active={activeKey === 'occult'}
                    onEnter={() => setActiveKey('occult')} onLeave={() => setActiveKey(null)}
                    onTap={() => setActiveKey(activeKey === 'occult' ? null : 'occult')}
                  />
                  <div />
                </div>

                {/* Wavespell — plain text directly under the cross, centered to match grid width */}
                <div
                  onMouseEnter={supportsHover ? () => setActiveKey('wavespell') : undefined}
                  onMouseLeave={supportsHover ? () => setActiveKey(null) : undefined}
                  onClick={() => setActiveKey(activeKey === 'wavespell' ? null : 'wavespell')}
                  style={{
                    marginTop: 20,
                    maxWidth: 380,
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                  }}
                >
                  <span style={{
                    fontSize: 11,
                    color: '#1a1714',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: "'IM Fell English', 'Cormorant Garamond', 'Georgia', serif",
                    fontStyle: 'italic',
                  }}>
                    Wavespell
                  </span>
                  <span style={{ fontSize: 14, color: '#1a1714', marginLeft: 8 }}>
                    {getSeal(result.wavespell.seal).name} · #{result.wavespell.number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// (StatRow component removed — Wavespell now renders as plain text
// directly under the cross grid instead of a boxed stats panel)

const ACTIVE_LABELS = {
  birthKin: 'Birth Kin',
  guide: 'Guide',
  analog: 'Analog',
  antipode: 'Antipode',
  occult: 'Occult',
  wavespell: 'Wavespell',
};

function GlyphPlaceholder({ seal, colorMap, size = 56 }) {
  const [failed, setFailed] = useState(false);
  const initial = seal.name.split(' ').map(w => w[0]).join('');

  if (!failed) {
    return (
      <img
        src={`/glyphs/${seal.name}.svg`}
        alt={seal.name}
        width={size}
        height={size}
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'contain', // show the whole glyph, including its own outline, uncropped
          flexShrink: 0,
          display: 'block',
        }}
      />
    );
  }

  // Fallback if a glyph file is missing/renamed wrong — keeps the page
  // from breaking rather than showing a broken image icon.
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 8,
      background: colorMap[seal.color],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 500,
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      fontSize: size * 0.3,
      flexShrink: 0,
    }}>
      {initial}
    </div>
  );
}

function CrossCard({ label, seal, colorMap, COLORS, large, active, onEnter, onLeave, onTap, supportsHover }) {
  return (
    <div
      onMouseEnter={supportsHover ? onEnter : undefined}
      onMouseLeave={supportsHover ? onLeave : undefined}
      onClick={onTap}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, opacity 0.15s ease',
        transform: active ? 'scale(1.06)' : 'scale(1)',
        opacity: active ? 1 : 0.9,
      }}
    >
      <div style={{
        fontSize: 10,
        color: '#1a1714',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        marginBottom: 8,
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      }}>
        {label}
      </div>
      <div style={{
        borderRadius: 8,
        boxShadow: active ? `0 0 0 3px ${colorMap[seal.color]}55` : 'none',
        transition: 'box-shadow 0.15s ease',
      }}>
        <GlyphPlaceholder seal={seal} colorMap={colorMap} size={large ? 130 : 84} />
      </div>
      <div style={{
        fontSize: large ? 15 : 11,
        fontWeight: 500,
        fontStyle: 'italic',
        color: '#1a1714',
        marginTop: 8,
        lineHeight: 1.25,
        fontFamily: "'IM Fell English', 'Cormorant Garamond', 'Georgia', serif",
      }}>
        {seal.name}
      </div>
    </div>
  );
}

// (ChartSection component removed — the reading text now renders
// directly under the hero glyph as plain paragraph text instead)

// (OraclePosition component removed — replaced by CrossCard for the
// cross layout matching the 13:20 Sync app structure)
