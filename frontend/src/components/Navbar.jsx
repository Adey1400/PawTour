import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--pixel-black)',
      borderBottom: '4px solid var(--pixel-cyan)',
      boxShadow: '0 4px 0 0 rgba(0,255,245,0.3)',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link
          to="/"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '14px',
            color: 'var(--pixel-cyan)',
            textDecoration: 'none',
            textShadow: '2px 2px 0 var(--pixel-pink), -1px -1px 0 var(--pixel-purple)',
            letterSpacing: '2px',
          }}
          className="glitch"
        >
          🐾 PAWTOURS
        </Link>

        {/* ── Nav Links ─────────────────────────────────────────────────── */}
       {/* ── Nav Links ─────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          
          <Link
            to="/"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              color: 'var(--pixel-white)',
              textDecoration: 'none',
              padding: '6px 12px',
              border: '2px solid transparent',
              transition: 'all 0.1s',
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--pixel-cyan)';
              e.target.style.borderBottom = '2px solid var(--pixel-cyan)';
            }}
            onMouseLeave={e => {
              e.target.style.color = 'var(--pixel-white)';
              e.target.style.borderBottom = '2px solid transparent';
            }}
          >
            HOME
          </Link>

          {/* New Scam Check Link */}
          <Link
            to="/tools"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              color: 'var(--pixel-white)',
              textDecoration: 'none',
              padding: '6px 12px',
              border: '2px solid transparent',
              transition: 'all 0.1s',
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--pixel-pink)';
              e.target.style.borderBottom = '2px solid var(--pixel-pink)';
            }}
            onMouseLeave={e => {
              e.target.style.color = 'var(--pixel-white)';
              e.target.style.borderBottom = '2px solid transparent';
            }}
          >
            SCAM CHECK
          </Link>

          {/* Map Link */}
          <Link
            to="/map"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              color: 'var(--pixel-white)',
              textDecoration: 'none',
              padding: '6px 12px',
              border: '2px solid transparent',
              transition: 'all 0.1s',
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--pixel-lime)';
              e.target.style.borderBottom = '2px solid var(--pixel-lime)';
            }}
            onMouseLeave={e => {
              e.target.style.color = 'var(--pixel-white)';
              e.target.style.borderBottom = '2px solid transparent';
            }}
          >
            MAP
          </Link>

          {/* Discover Button Link */}
          <Link to="/discover" className="pixel-btn" style={{ fontSize: '9px', padding: '10px 16px' }}>
            ▶ DISCOVER
          </Link>
        </div>
      </div>
    </nav>
  );
}
