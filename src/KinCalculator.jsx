import React, { useState, useRef, useEffect } from 'react';

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


import {
  SEALS, TONES, SEAL_TRAITS, TONE_WORDS,
  seal1to20, tone1to13, getSeal, calcOracle, calcWavespell,
  generateChartText, calculateKin, toneSealTitle,
} from './lib/kinLogic';
import OracleDisplay from './OracleDisplay';
import ChartDiagram from './ChartDiagram';
import InfoCard from './InfoCard';
import { POSITION_INFO as PERSON_POSITION_INFO, SEAL_POSITION_TEXT as PERSON_SEAL_POSITION_TEXT } from './lib/personInfoContent';


// Matches the point where OracleDisplay's two-column flex row (hero
// glyph flex-basis 260px + cross grid flex-basis 280px + 48px gap =
// ~588px) naturally wraps to a single stacked column. Measured against
// this component's own rendered width rather than the browser
// viewport — see the note in InfoCard.jsx for why that distinction
// matters on the Squarespace embed.
const DESKTOP_CONTAINER_THRESHOLD = 620;

export default function Kin260Calculator({ initialBirthDate }) {
  const [birthDate, setBirthDate] = useState(initialBirthDate || '1990-01-01');
  const [infoCard, setInfoCard] = useState(null); // { key, seal } | null

  // Measures the wrapper div's own rendered width (not the viewport) so
  // the Info Card's desktop/mobile split always agrees with whatever
  // width OracleDisplay actually has to work with — regardless of how
  // narrow Squarespace's page template makes the surrounding column.
  const wrapperRef = useRef(null);
  const [isDesktopCard, setIsDesktopCard] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setIsDesktopCard(width >= DESKTOP_CONTAINER_THRESHOLD);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pure calculation — no state updates, just returns the result object.
  // Used both for the initial (synchronous) render and for recalculating
  // when the date field changes.
  const computeResult = (dateStr) => {
    const { kin, sealNum, toneNum, dayDiff } = calculateKin(dateStr);
    const seal = getSeal(sealNum);
    const tone = TONES.find(t => t.n === toneNum);
    const oracle = calcOracle(sealNum, toneNum);
    const wavespell = calcWavespell(kin);
    const chart = generateChartText(kin, sealNum, toneNum, oracle, wavespell);
    return { kin, seal, tone, oracle, wavespell, chart, dayDiff, sealNum, toneNum };
  };

  // Lazy initializer — runs once, synchronously, during the very first
  // render. This is what actually fixes the flash: if we have a saved
  // birth date, the chart is already correct on frame one, instead of
  // rendering the empty "Change your life..." screen first and only
  // showing the real chart on a second render a moment later.
  const [result, setResult] = useState(() =>
    initialBirthDate ? computeResult(initialBirthDate) : null
  );

  const handleCalculate = () => {
    setResult(computeResult(birthDate));
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
      padding: '40px 24px 24px',
      color: '#1a1714',
    }}>
      <div ref={wrapperRef} style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
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
              color: '#1a1714',
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

        {/* RESULT — shared cross layout, also used by the Today screen */}
        {result && (
          <OracleDisplay
            kin={result.kin}
            seal={result.seal}
            tone={result.tone}
            oracle={result.oracle}
            wavespell={result.wavespell}
            chart={result.chart}
            dailyMode
            onPositionSelect={(key, tappedSeal) => setInfoCard({ key, seal: tappedSeal })}
            headerLeft={
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
                  Kin Number {result.kin}
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
            }
          />
        )}

        {infoCard && (
          <InfoCard
            positionKey={infoCard.key}
            seal={infoCard.seal}
            onClose={() => setInfoCard(null)}
            positionInfo={PERSON_POSITION_INFO}
            sealPositionText={PERSON_SEAL_POSITION_TEXT}
            contextLabel="Your Chart"
            isDesktop={isDesktopCard}
          />
        )}

        {result && (
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <h2 style={{
              fontFamily: "'IM Fell English', 'Cormorant Garamond', 'Georgia', serif",
              fontStyle: 'italic', fontWeight: 400, fontSize: 22, marginBottom: 10,
              color: '#1a1714', textAlign: 'center',
            }}>
              How To Read Your Birth Chart
            </h2>
            <p style={{
              fontSize: 14, lineHeight: 1.6, color: '#1a1714', textAlign: 'center',
              maxWidth: 420, margin: '0 auto 8px', fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            }}>
              This is your own chart, not the day's. These positions describe your personal
              archetype — traits, tendencies and patterns that stay with you, rather than a
              mood that shifts day to day.
            </p>
            <ChartDiagram />
          </div>
        )}
      </div>
    </div>
  );
}
