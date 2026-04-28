import { Link } from 'react-router-dom';

const PixelStar = ({ x, y, delay = 0 }) => (
  <div style={{
    position: 'absolute', left: x, top: y,
    width: 4, height: 4,
    background: 'var(--pixel-cyan)',
    opacity: 0.6,
    animation: `blink ${1 + delay}s step-end infinite`,
    animationDelay: `${delay}s`,
    zIndex: 0
  }} />
);

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: 'calc(100vh - 68px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px', // Increased padding for breathing room
      overflow: 'hidden',
      background: '#050510',
    }}>
      {/* ── Background Stars ── */}
      {[
        [8,'12%',0],[15,'35%',0.3],[92,'8%',0.6],[78,'55%',0.9],
        [45,'75%',0.2],[62,'20%',0.7],[30,'60%',0.4],[85,'80%',0.1],
        [5,'50%',0.8],[55,'45%',0.5],[20,'90%',0.3],[72,'30%',0.6],
      ].map(([x, y, d], i) => (
        <PixelStar key={i} x={`${x}%`} y={y} delay={d} />
      ))}

      <div style={{
        maxWidth: 1100, // Slightly tighter container for better focus
        width: '100%',
        display: 'grid',
        // Changed to use 1fr 1fr for desktop, media queries handle the rest via auto-fit logic
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '64px', // More gap prevents visual clutter
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>

        {/* ── Left Side: Content ── */}
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ margin: 0, padding: 0, lineHeight: 1.2 }}>
            <span style={{
              display: 'block',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(24px, 4vw, 42px)',
              color: 'var(--pixel-cyan)',
              textShadow: '4px 4px 0 var(--pixel-blue)',
              marginBottom: 12,
            }}>
              SMART LOCAL
            </span>
            <span style={{
              display: 'block',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(24px, 4vw, 42px)',
              color: 'var(--pixel-pink)',
              textShadow: '4px 4px 0 #990040',
              marginBottom: 12,
            }}>
              DISCOVERY
            </span>
            <span style={{
              display: 'block',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              color: 'var(--pixel-yellow)',
              textShadow: '4px 4px 0 #9a8900',
            }}>
              & SCAM PROTECTION
            </span>
          </h1>

          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: '22px',
            color: 'var(--pixel-grey)',
            marginTop: 32,
            lineHeight: 1.5,
            maxWidth: 480, // Allow more width
          }}>
            Discover hidden gems, authentic cafes & accommodations. 
            Stay protected with AI-powered price verification and Buddy's local insights.
          </p>

          {/* Stats Row - Centered alignment fix */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', margin: '40px 0' }}>
            {[
              { label: 'QUESTS', val: '100+', color: 'var(--pixel-cyan)' },
              { label: 'PLAYERS', val: '1.2k', color: 'var(--pixel-yellow)' },
              { label: 'CITIES', val: '5', color: 'var(--pixel-green)' },
            ].map(({ label, val, color }) => (
              <div key={label} style={{
                background: 'rgba(0,0,0,0.4)',
                border: `2px solid ${color}`,
                padding: '12px 20px',
                minWidth: 100,
                textAlign: 'center'
              }}>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: '14px', color }}>{val}</div>
                <div style={{ fontFamily: "'Press Start 2P'", fontSize: '7px', color: '#888', marginTop: 8 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Link to="/discover" className="pixel-btn pixel-btn-yellow" style={{ textDecoration: 'none', textAlign: 'center' }}>
              ▶ START DISCOVERING
            </Link>
            <button className="pixel-btn" style={{ background: 'none', color: 'var(--pixel-cyan)', border: '2px solid var(--pixel-cyan)', boxShadow: '4px 4px 0 var(--pixel-cyan)' }}>
              LEARN MORE
            </button>
          </div>
        </div>

        {/* ── Right Side: Game Window ── */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: 'var(--pixel-black)',
            border: '6px solid var(--pixel-cyan)',
            boxShadow: '15px 15px 0 0 rgba(0,255,245,0.15)',
            width: '100%',
            maxWidth: 400,
          }}>
            {/* Window Header */}
            <div style={{ background: 'var(--pixel-cyan)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Press Start 2P'", fontSize: '9px', color: 'black' }}>LOCAL_PREVIEW.EXE</span>
              <div style={{ display: 'flex', gap: 5 }}>
                <div style={{ width: 8, height: 8, background: '#ff4b2b', border: '1px solid black' }} />
                <div style={{ width: 8, height: 8, background: '#ffb400', border: '1px solid black' }} />
                <div style={{ width: 8, height: 8, background: '#2ecc71', border: '1px solid black' }} />
              </div>
            </div>

            {/* Game Content */}
            <div style={{ padding: 20, background: '#0a0a1a', minHeight: 320, position: 'relative', overflow: 'hidden' }}>
              {/* Retro Sky Grid Background */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'linear-gradient(var(--pixel-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--pixel-cyan) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

              {/* Character & Ground */}
              <div style={{ position: 'absolute', bottom: 50, left: '20%', fontSize: 40 }} className="pixel-float">🐕</div>
              <div style={{ position: 'absolute', bottom: 50, left: '50%', fontSize: 40, animationDelay: '0.5s' }} className="pixel-float">🏨</div>
              
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, background: '#1a3a2e', borderTop: '4px solid var(--pixel-green)' }} />

              {/* Dynamic Speech Bubble */}
              <div style={{
                position: 'absolute', top: 40, right: 30,
                background: 'white', padding: '10px', border: '3px solid black',
                fontFamily: "'Press Start 2P'", fontSize: '8px', color: 'black',
                boxShadow: '4px 4px 0 black'
              }}>
                HELLO EXPLORER!
                <div style={{ position: 'absolute', bottom: -12, left: 10, width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid black' }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}