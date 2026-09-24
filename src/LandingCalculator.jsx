import React, { useState } from 'react';

// ============================================================================
// LANDING PAGE — bio-link destination, no nav bar
// ============================================================================
// This is intentionally a separate, much simpler component from
// KinCalculator.jsx — it never computes or shows a chart itself. It just
// captures a birthdate and hands the person off to the real "Calculate My
// Kin" page (full site, nav bar included), which reads the date back out
// of the URL and shows the result immediately on arrival.
//
// IMPORTANT — update this before going live:
// Set this to the actual published URL of your "Calculate My Kin" page
// (the Squarespace page with the full nav bar), NOT this landing page and
// NOT the raw Vercel URL. e.g. 'https://kintwosixty.com/calculate-my-kin'
const CALCULATE_PAGE_URL = 'https://kintwosixty.com/calculate-my-kin';

const COLORS = { cream: '#F7F6F1', ink: '#1a1714' };

export default function LandingCalculator() {
  const [birthDate, setBirthDate] = useState('1990-01-01');

  const handleGo = () => {
    const url = `${CALCULATE_PAGE_URL}?birthdate=${encodeURIComponent(birthDate)}`;
    // Escapes the Squarespace iframe so the person actually navigates the
    // real browser tab (with the nav bar) rather than just changing what's
    // shown inside this small embed.
    if (window.top) {
      window.top.location.href = url;
    } else {
      window.location.href = url;
    }
  };

  return (
    <div style={{
      minHeight: 600,
      background: COLORS.cream,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      boxSizing: 'border-box',
    }}>
      <style>{`
        @keyframes kin260-flip {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(-360deg); }
        }
      `}</style>

      {/* Wordmark — flips end-over-end around its own vertical centre like a
          solid plaque with real thickness, briefly showing the mirrored
          "back" of the text mid-spin before landing the right way round
          again. The illusion of depth comes from stacking several copies
          of the same text at slightly different Z depths (translateZ) —
          as the whole stack rotates together, the browser's real 3D
          perspective reveals the gap between layers as a visible edge
          near the 90°/270° points, the same way a thick coin shows its
          rim side-on. Each layer is tinted a touch darker moving back, so
          that edge reads as shaded material rather than a flat sliver.
          Perspective on the outer wrapper is what makes any of this look
          3D rather than just squashing flat; backfaceVisibility is left
          at its default (visible) so the reversed text still shows
          through rather than disappearing. Transform-only animation, so
          it can't nudge the page's own scrollHeight. */}
      <div style={{ perspective: 600, marginBottom: 40 }}>
        <div style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          animation: 'kin260-flip 8s linear infinite',
          display: 'inline-block',
        }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                fontFamily: "'IM Fell English', 'Georgia', serif",
                fontStyle: 'italic',
                fontSize: 44,
                color: i === 0 ? COLORS.ink : `rgba(26, 23, 20, ${0.85 - i * 0.12})`,
                transform: `translateZ(${-i * 0.8}px)`,
                whiteSpace: 'nowrap',
              }}
            >
              Kin260
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <p style={{
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 400,
          fontSize: 15,
          color: COLORS.ink,
          marginBottom: 28,
        }}>
          Enter your birthdate.
        </p>

        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={{
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            fontSize: 20,
            color: COLORS.ink,
            background: 'transparent',
            border: 'none',
            borderBottom: `1px solid ${COLORS.ink}`,
            padding: '8px 0',
            marginBottom: 40,
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />

        <div>
          <button
            onClick={handleGo}
            style={{
              padding: '16px 40px',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              background: 'none',
              color: COLORS.ink,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Calculate your codes <span style={{ textDecoration: 'underline' }}>here</span>
          </button>
        </div>
      </div>
    </div>
  );
}
