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
        @keyframes kin260-bimble {
          0%   { transform: translate(0px, 0px) rotate(0deg); }
          20%  { transform: translate(6px, -4px) rotate(-1.5deg); }
          40%  { transform: translate(-5px, 3px) rotate(1deg); }
          60%  { transform: translate(4px, 5px) rotate(1.5deg); }
          80%  { transform: translate(-6px, -3px) rotate(-1deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
      `}</style>

      {/* Wordmark — a playful, gentle "bimble" using transform only (never
          margin/position), so it never nudges the page's own scrollHeight —
          that would fight the iframe auto-resize script the same way a
          100vh height did earlier, and send the page into a growth loop. */}
      <div style={{
        fontFamily: "'IM Fell English', 'Georgia', serif",
        fontStyle: 'italic',
        fontSize: 44,
        color: COLORS.ink,
        marginBottom: 40,
        animation: 'kin260-bimble 11s ease-in-out infinite',
        display: 'inline-block',
      }}>
        Kin260
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
