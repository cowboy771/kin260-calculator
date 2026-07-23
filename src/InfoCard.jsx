import React from 'react';
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
  if (!positionKey || !seal) return null;

  const info = positionInfo[positionKey];
  const paragraphs = sealPositionText[seal.name]?.[positionKey] || [];

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
      </div>
    </div>
  );
}
