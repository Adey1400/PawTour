import React from 'react';

const companions = [
  {
    name: 'BUDDY',
    breed: 'DISCOVERY GUIDE',
    role: 'LOCAL EXPLORER',
    icon: '🐕',
    color: 'var(--pixel-yellow)',
    shadow: '#9a8900',
    tip: 'Helps you uncover hidden local gems, authentic cafes, and unique places locals love.',
  },
  {
    name: 'WHISKERS',
    breed: 'SECURITY EXPERT',
    role: 'SCAM DETECTOR',
    icon: '🐱',
    color: 'var(--pixel-pink)',
    shadow: '#990040',
    tip: 'Analyzes prices and provides real-time alerts to keep you safe from tourist scams.',
  },
];

function CompanionCard({ companion }) {
  return (
    <div
      style={{
        background: 'var(--pixel-navy)',
        border: `4px solid ${companion.color}`,
        boxShadow: `10px 10px 0 0 ${companion.shadow}`,
        padding: 0,
        width: 280,
        cursor: 'pointer',
        transition: 'transform 0.1s',
        position: 'relative',
        display: 'flex',          // Added for height alignment
        flexDirection: 'column',   // Added for height alignment
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translate(-4px, -4px)';
        e.currentTarget.style.boxShadow = `14px 14px 0 0 ${companion.shadow}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = `10px 10px 0 0 ${companion.shadow}`;
      }}
    >
      {/* Card header */}
      <div style={{
        background: companion.color,
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 10,
          color: 'var(--pixel-black)',
          textAlign: 'center',
        }}>
          {companion.role}
        </span>
      </div>

      {/* Character display */}
      <div style={{
        background: '#0a0a1a',
        padding: '32px 24px',
        textAlign: 'center',
        borderBottom: `3px solid ${companion.color}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }} />

        {/* Character sprite */}
        <div className="pixel-float" style={{ fontSize: 72, lineHeight: 1, marginBottom: 16 }}>
          {companion.icon}
        </div>
      </div>

      {/* Character info */}
      <div style={{ padding: '20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 16,
          color: companion.color,
          margin: '0 0 4px',
          textShadow: `2px 2px 0 ${companion.shadow}`,
        }}>
          {companion.name}
        </h3>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: 16,
          color: 'var(--pixel-grey)',
          margin: '0 0 16px',
          letterSpacing: 1,
        }}>
          {companion.breed}
        </p>

        {/* Tip - Pushed to bottom with margin-top auto */}
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: 15,
          color: 'var(--pixel-grey)',
          lineHeight: 1.5,
          margin: 'auto 0 0 0',
          padding: '12px',
          background: 'rgba(0, 255, 245, 0.1)',
          border: `2px solid ${companion.color}40`,
          borderRadius: 2,
        }}>
          {companion.tip}
        </p>
      </div>
    </div>
  );
}

export default function CompanionTeaser() {
  return (
    <section style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24,
          }}>
            <div style={{ height: 3, width: 60, background: 'var(--pixel-pink)' }} />
            <span style={{ fontSize: 8, fontFamily: "'Press Start 2P'", color: 'var(--pixel-pink)' }}>
              ★ AI GUIDES ★
            </span>
            <div style={{ height: 3, width: 60, background: 'var(--pixel-pink)' }} />
          </div>

          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(18px, 3vw, 32px)',
            color: 'var(--pixel-white)',
            margin: '0 0 16px',
            textShadow: '4px 4px 0 var(--pixel-blue)',
          }}>
            CHOOSE YOUR COMPANION
          </h2>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: 22,
            color: 'var(--pixel-grey)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
            Meet your AI-powered travel companions
          </p>
        </div>

        {/* ── Centered Card Container ─────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center', // Centers cards horizontally
          alignItems: 'stretch',     // Ensures cards are same height
          gap: '40px',               // Balanced spacing
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {companions.map((companion, idx) => (
            <CompanionCard key={idx} companion={companion} />
          ))}
        </div>

        {/* ── Bottom decoration ─────────────────────────────────────────────── */}
        <div style={{
          textAlign: 'center',
          marginTop: 64,
          fontFamily: "'VT323', monospace",
          fontSize: 18,
          color: 'var(--pixel-grey)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}>
          <div style={{ height: 2, width: 80, background: 'var(--pixel-grey)', opacity: 0.3 }} />
          ★ MORE COMPANIONS COMING SOON ★
          <div style={{ height: 2, width: 80, background: 'var(--pixel-grey)', opacity: 0.3 }} />
        </div>

      </div>
    </section>
  );
}