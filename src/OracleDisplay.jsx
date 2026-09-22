import React, { useState } from 'react';
import { getSeal } from './lib/kinLogic';

const COLORS = {
  crimson: '#8B0000',
  cobalt: '#1B2A8A',
  amber: '#D4A017',
  cream: '#F7F6F1',
  jungle: '#2C4A2E',
};

const sealColorMap = {
  Red: COLORS.crimson,
  White: '#A8A0A0',
  Blue: COLORS.cobalt,
  Yellow: COLORS.amber,
};



export function GlyphPlaceholder({ seal, colorMap, size = 56 }) {
  const [failed, setFailed] = useState(false);
  const initial = seal.name.split(' ').map((w) => w[0]).join('');

  if (!failed) {
    return (
      <img
        src={`/glyphs/${seal.name}.webp`}
        alt={seal.name}
        width={size}
        height={size}
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          flexShrink: 0,
          display: 'block',
        }}
      />
    );
  }

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

export function CrossCard({ label, seal, colorMap, large, active, onEnter, onLeave, onTap, supportsHover }) {
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
        fontWeight: 400,
        color: '#1a1714',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: 8,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}>
        {label}
      </div>
      <div style={{
        borderRadius: 0,
        boxShadow: active ? '0 0 0 2px #1a1714' : 'none',
        transition: 'box-shadow 0.15s ease',
      }}>
        <GlyphPlaceholder seal={seal} colorMap={colorMap} size={large ? 130 : 84} />
      </div>
      <div style={{
        fontSize: large ? 15 : 12,
        fontWeight: 700,
        color: '#1a1714',
        marginTop: 8,
        lineHeight: 1.25,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}>
        {seal.name}
      </div>
    </div>
  );
}

// The full interactive hero-glyph + cross-grid + reading-text block.
// Used identically by both the birth chart calculator and the Today
// screen, so hover/tap behavior and layout never drift apart between
// the two.
export default function OracleDisplay({
  kin, seal, tone, oracle, wavespell, chart, headerLeft, headerRight,
  // dailyMode + onPositionSelect are opt-in — only the Today page passes
  // these. Every other screen (You, Relationship, birth chart calculator)
  // is untouched and keeps the original inline tap-to-reveal behavior.
  dailyMode = false,
  onPositionSelect,
  // Optional — ref to the cross-grid column.
  crossColumnRef,
  // Optional — content rendered full-width, between the header row and
  // the cross/side-content row (e.g. the "How To Read" heading and
  // description), so both columns below it start at the same height.
  introContent,
  // Optional — content rendered to the right of the glyph cross (e.g.
  // the "How To Read Your Kin Codes" diagram), separated by a vertical
  // divider. When omitted, the cross column simply takes the full row.
  sideContent,
}) {
  const [activeKey, setActiveKey] = useState(null);
  const [supportsHover, setSupportsHover] = useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setSupportsHover(mq.matches);
  }, []);

  const sealForKey = (key) => (
    key === 'guide' ? oracle.guide :
    key === 'analog' ? oracle.analog :
    key === 'antipode' ? oracle.antipode :
    key === 'occult' ? oracle.occult :
    key === 'birthKin' ? seal :
    null
  );

  // In dailyMode, tapping a position still swaps the hero glyph (so the
  // visual feels the same) but opens the Info Card modal for the reading
  // instead of expanding the inline text panel below.
  const handleTap = (key) => {
    if (dailyMode) {
      setActiveKey(key);
      if (onPositionSelect) onPositionSelect(key, sealForKey(key));
    } else {
      setActiveKey(activeKey === key ? null : key);
    }
  };

  return (
    <div>
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
            gap: 32px !important;
          }
          .kin260-divider {
            display: none !important;
          }
        }
      `}</style>

      {(headerLeft || headerRight) && (
        <div className="kin260-header-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 32,
        }}>
          <div>{headerLeft}</div>
          <div>{headerRight}</div>
        </div>
      )}

      {introContent && (
        <div style={{ marginBottom: 24 }}>
          {introContent}
        </div>
      )}

      <div className="kin260-main-row" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 48,
        marginBottom: 40,
      }}>
        <div ref={crossColumnRef} className="kin260-cross-wrap" style={{ flex: '1 1 280px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: 'auto auto auto',
            gap: 22,
            maxWidth: 380,
          }}>
            <div />
            <CrossCard
              label="Guide" seal={oracle.guide} colorMap={sealColorMap}
              supportsHover={supportsHover && !dailyMode}
              active={activeKey === 'guide'}
              onEnter={() => setActiveKey('guide')} onLeave={() => setActiveKey(null)}
              onTap={() => handleTap('guide')}
            />
            <div />

            <CrossCard
              label="Antipode" seal={oracle.antipode} colorMap={sealColorMap}
              supportsHover={supportsHover && !dailyMode}
              active={activeKey === 'antipode'}
              onEnter={() => setActiveKey('antipode')} onLeave={() => setActiveKey(null)}
              onTap={() => handleTap('antipode')}
            />
            <CrossCard
              label="Birth Kin" seal={seal} colorMap={sealColorMap}
              supportsHover={supportsHover && !dailyMode}
              active={activeKey === 'birthKin'}
              onEnter={() => setActiveKey('birthKin')} onLeave={() => setActiveKey(null)}
              onTap={() => handleTap('birthKin')}
            />
            <CrossCard
              label="Analog" seal={oracle.analog} colorMap={sealColorMap}
              supportsHover={supportsHover && !dailyMode}
              active={activeKey === 'analog'}
              onEnter={() => setActiveKey('analog')} onLeave={() => setActiveKey(null)}
              onTap={() => handleTap('analog')}
            />

            <div />
            <CrossCard
              label="Occult" seal={oracle.occult} colorMap={sealColorMap}
              supportsHover={supportsHover && !dailyMode}
              active={activeKey === 'occult'}
              onEnter={() => setActiveKey('occult')} onLeave={() => setActiveKey(null)}
              onTap={() => handleTap('occult')}
            />
            <div />
          </div>

          <div style={{
            marginTop: 20,
            maxWidth: 380,
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          }}>
            <span style={{
              fontSize: 11,
              color: '#1a1714',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            }}>
              Tone
            </span>
            <span style={{ fontSize: 14, fontStyle: 'italic', color: '#1a1714', marginLeft: 8, fontFamily: "'IM Fell English', 'Cormorant Garamond', 'Georgia', serif" }}>
              {tone.name}
            </span>
          </div>

          <div
            onMouseEnter={supportsHover ? () => setActiveKey('wavespell') : undefined}
            onMouseLeave={supportsHover ? () => setActiveKey(null) : undefined}
            onClick={() => setActiveKey(activeKey === 'wavespell' ? null : 'wavespell')}
            style={{
              marginTop: 8,
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
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
            }}>
              Wavespell
            </span>
            <span style={{ fontSize: 14, fontStyle: 'italic', color: '#1a1714', marginLeft: 8, fontFamily: "'IM Fell English', 'Cormorant Garamond', 'Georgia', serif" }}>
              {getSeal(wavespell.seal).name} · #{wavespell.number}
            </span>
          </div>

          {dailyMode && (
            <p style={{
              marginTop: 20,
              maxWidth: 380,
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 400,
              color: '#1a1714',
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            }}>
              {supportsHover ? 'Click on a glyph to read its meaning.' : 'Tap a glyph to read its meaning.'}
            </p>
          )}
        </div>

        {sideContent && (
          <>
            <div className="kin260-divider" style={{ width: 1, alignSelf: 'stretch', background: 'rgba(26,23,20,0.15)' }} />
            <div style={{ flex: '1 1 320px' }}>
              {sideContent}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
