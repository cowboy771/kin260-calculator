import React from 'react';

const COLORS = { ink: '#1a1714', body: '#4a4238', label: '#8a8076' };

const boxStyle = {
  border: `1px solid ${COLORS.ink}`,
  width: 84,
  height: 84,
};

const labelStyle = {
  fontSize: 10, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em',
  color: COLORS.ink, marginBottom: 8, textAlign: 'center',
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
};

const captionStyle = {
  fontSize: 12, fontWeight: 400, color: COLORS.body, textAlign: 'center',
  marginTop: 8, lineHeight: 1.35, maxWidth: 110,
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
};

function Slot({ label, caption }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={labelStyle}>{label}</p>
      <div style={boxStyle} />
      <p style={captionStyle}>{caption}</p>
    </div>
  );
}

const DEFAULT_CAPTIONS = {
  guide: 'Shows direction.',
  antipode: 'Shows conflict (growth).',
  birthKin: 'Shows the identity.',
  analog: 'Shows support.',
  occult: 'Shows hidden capacity.',
  tone: 'shows how the entire structure functions.',
  wavespell: 'shows the larger developmental theme.',
};

export default function ChartDiagram({ captions, birthKinLabel = 'Birth Kin' }) {
  const c = { ...DEFAULT_CAPTIONS, ...captions };

  return (
    <div style={{ padding: '8px 0 16px' }}>
      {/* The five Oracle positions, in the same 3x3 cross grid the real chart uses */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        justifyContent: 'center',
        rowGap: 28,
        columnGap: 22,
        marginBottom: 28,
      }}>
        <div />
        <Slot label="Guide" caption={c.guide} />
        <div />

        <Slot label="Antipode" caption={c.antipode} />
        <Slot label={birthKinLabel} caption={c.birthKin} />
        <Slot label="Analog" caption={c.analog} />

        <div />
        <Slot label="Occult" caption={c.occult} />
        <div />
      </div>

      {/* Tone and Wavespell — not boxed on the real chart either, they read as
          plain lines rather than positions on the cross */}
      <div style={{ textAlign: 'center', maxWidth: 320, margin: '0 auto' }}>
        <p style={{ fontSize: 12, color: COLORS.body, marginBottom: 6 }}>
          <strong style={{ color: COLORS.ink }}>Tone</strong> — {c.tone}
        </p>
        <p style={{ fontSize: 12, color: COLORS.body }}>
          <strong style={{ color: COLORS.ink }}>Wavespell</strong> — {c.wavespell}
        </p>
      </div>
    </div>
  );
}
