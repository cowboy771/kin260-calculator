import React, { useState, useEffect } from 'react';
import { GlyphPlaceholder } from './OracleDisplay';
import { POSITION_INFO as DAILY_POSITION_INFO, SEAL_POSITION_TEXT as DAILY_SEAL_POSITION_TEXT } from './lib/dailyInfoContent';

const sealColorMap = {
  Red: '#8B0000',
  White: '#A8A0A0',
  Blue: '#1B2A8A',
  Yellow: '#D4A017',
};

// Fixed glyph size across every card, regardless of position —
// Guide, Analog, Antipode, Occult and Birth Kin all render the
// same size so the cards feel like one consistent set.
const GLYPH_SIZE = 96;

// Same breakpoint OracleDisplay uses to switch from the two-column
// desktop layout (glyph left, cross right) down to a single stacked
// column on mobile — kept in sync so the card's behaviour switches
// at the same point the layout itself does.
const DESKTOP_BREAKPOINT = '(min-width: 701px)';

// Roughly where the hero glyph sits inside the calculator's own
// max-width: 900px container (which the parent, KinCalculator, has
// made position: relative for exactly this purpose). Because this is
// position: absolute rather than fixed, the card scrolls together
// with the page — it stays visually anchored to the glyph instead of
// floating at a fixed spot on the screen.
const DESKTOP_TOP_OFFSET = 90;
const DESKTOP_LEFT_OFFSET = 30;

export default function InfoCard({
  positionKey,
  seal,
  onClose,
  // Defaults to the Daily content so nothing changes for existing callers;
  // the You page passes personInfoContent's POSITION_INFO/SEAL_POSITION_TEXT instead.
  positionInfo = DAILY_POSITION_INFO,
  sealPositionText = DAILY_SEAL_POSITION_TEXT,
  // Small badge above the title making it obvious which chart this card
  // belongs to, e.g. "Today's Chart" or "Your Chart".
  contextLabel,
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_BREAKPOINT);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!positionKey || !seal) return null;

  const info = positionInfo[positionKey];
  const paragraphs = sealPositionText[seal.name]?.[positionKey] || [];

  const cardContent = (
    <>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: 14,
          right: 16,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: 20,
          lineHeight: 1,
          color: '#1a1714',
          padding: 0,
        }}
      >
        ×
      </button>

      {contextLabel && (
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <span style={{
            display: 'inline-block',
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#D4A017',
            border: '1px solid #D4A017',
            borderRadius: 999,
            padding: '3px 12px',
          }}>
            {contextLabel}
          </span>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: "'IM Fell English', 'Cormorant Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 40,
          margin: '4px 0 0',
          lineHeight: 1.1,
        }}>
          {info.title}
        </h2>
        <div style={{
          fontFamily: "'IM Fell English', 'Cormorant Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontSize: 20,
          marginTop: 2,
          marginBottom: 14,
        }}>
          {info.subtitle}
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontWeight: 600,
          letterSpacing: '0.02em',
          fontSize: 14,
          textTransform: 'uppercase',
          lineHeight: 1.5,
          margin: '0 0 20px',
        }}>
          {info.description}
        </p>

        <div style={{
          fontFamily: "'IM Fell English', 'Cormorant Garamond', 'Georgia', serif",
          fontStyle: 'italic',
          fontSize: 20,
          textDecoration: 'underline',
          textUnderlineOffset: 4,
          marginBottom: 14,
        }}>
          {seal.name}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
          <GlyphPlaceholder seal={seal} colorMap={sealColorMap} size={GLYPH_SIZE} />
        </div>
      </div>

      <div style={{ textAlign: 'left' }}>
        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontSize: 15,
              lineHeight: 1.6,
              margin: i === 0 ? '0 0 16px' : '0',
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </>
  );

  if (isDesktop) {
    // Two separate siblings rather than a nested modal: an invisible,
    // full-viewport click-catcher (fixed — it only needs to sit on top
    // of everything to detect an outside click, so being viewport-fixed
    // is fine here) and the card itself, which is position: absolute
    // against the calculator's own relatively-positioned container.
    // Because absolute (unlike fixed) participates in normal page
    // scrolling, the card now moves with the glyph instead of staying
    // pinned to a fixed spot on the screen.
    return (
      <>
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 199 }}
        />
        <div
          style={{
            position: 'absolute',
            top: DESKTOP_TOP_OFFSET,
            left: DESKTOP_LEFT_OFFSET,
            width: '100%',
            maxWidth: 380,
            maxHeight: '80vh',
            overflowY: 'auto',
            background: '#F5F0E4',
            color: '#1a1714',
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            padding: '28px 26px 32px',
            border: '1.2px solid #1a1714',
            boxShadow: '0 12px 32px rgba(26, 23, 20, 0.22)',
            zIndex: 201,
          }}
        >
          {cardContent}
        </div>
      </>
    );
  }

  // Mobile — unchanged from the app: a full-screen dimmed modal with
  // the card centred on top of it.
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26, 23, 20, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        zIndex: 200,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 380,
          maxHeight: '85vh',
          overflowY: 'auto',
          background: '#F5F0E4',
          color: '#1a1714',
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          padding: '28px 26px 32px',
          border: '1.2px solid #1a1714',
          borderRadius: 0,
        }}
      >
        {cardContent}
      </div>
    </div>
  );
}
