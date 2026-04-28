import Hero from '../components/Hero';
import Features from '../components/Features';
import CompanionTeaser from '../components/CompanionTeaser';

export default function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Hero />

      {/* ── Pixel divider ────────────────────────────────────────────── */}
      <div style={{
        height: 4,
        background: 'repeating-linear-gradient(90deg, var(--pixel-cyan) 0px, var(--pixel-cyan) 16px, transparent 16px, transparent 32px)',
        margin: '0 48px',
        opacity: 0.5,
      }} />

      <Features />

      {/* ── Pixel divider ────────────────────────────────────────────── */}
      <div style={{
        height: 4,
        background: 'repeating-linear-gradient(90deg, var(--pixel-pink) 0px, var(--pixel-pink) 16px, transparent 16px, transparent 32px)',
        margin: '0 48px',
        opacity: 0.5,
      }} />

      <CompanionTeaser />

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer style={{
        padding: '32px 24px',
        borderTop: '4px solid var(--pixel-cyan)',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16,
        }}>
          <div style={{ height: 3, width: 40, background: 'var(--pixel-cyan)' }} />
          <span style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 8,
            color: 'var(--pixel-cyan)',
          }}>
            🐾 PAWTOURS 2026 🐾
          </span>
          <div style={{ height: 3, width: 40, background: 'var(--pixel-cyan)' }} />
        </div>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: 16,
          color: 'var(--pixel-grey)',
        }}>
          MADE WITH ♥ AND PIXELS
        </p>
      </footer>
    </div>
  );
}
