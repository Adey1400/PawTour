import { Link } from 'react-router-dom';

// Pixel art sprite decorations using CSS
const PixelSprite = ({ emoji, style }) => (
  <div className="pixel-float" style={{
    fontSize: 48,
    lineHeight: 1,
    imageRendering: 'pixelated',
    filter: 'drop-shadow(3px 3px 0 rgba(0,255,245,0.5))',
    ...style,
  }}>
    {emoji}
  </div>
);

const PixelStar = ({ x, y, delay = 0 }) => (
  <div style={{
    position: 'absolute', left: x, top: y,
    width: 4, height: 4,
    background: 'var(--pixel-cyan)',
    opacity: 0.6,
    animation: `blink ${1 + delay}s step-end infinite`,
    animationDelay: `${delay}s`,
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
      padding: '48px 24px',
      overflow: 'hidden',
    }}>
      {/* ── Pixel Stars Background ──────────────────────────────────────── */}
      {[
        [8,'12%',0],[15,'35%',0.3],[92,'8%',0.6],[78,'55%',0.9],
        [45,'75%',0.2],[62,'20%',0.7],[30,'60%',0.4],[85,'80%',0.1],
        [5,'50%',0.8],[55,'45%',0.5],[20,'90%',0.3],[72,'30%',0.6],
      ].map(([x, y, d], i) => (
        <PixelStar key={i} x={`${x}%`} y={y} delay={d} />
      ))}

      <div style={{
        maxWidth: 1200,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 48,
        alignItems: 'center',
      }}>

        {/* ── Left: Text & CTA ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {/* Title */}
          <div>
            <h1 style={{ margin: 0, padding: 0, lineHeight: 1.4 }}>
              <span style={{
                display: 'block',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(20px, 3.5vw, 36px)',
                color: 'var(--pixel-cyan)',
                textShadow: '4px 4px 0 var(--pixel-blue)',
                marginBottom: 16,
              }}>
                SMART LOCAL
              </span>
              <span style={{
                display: 'block',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(20px, 3.5vw, 36px)',
                color: 'var(--pixel-pink)',
                textShadow: '4px 4px 0 #990040',
                marginBottom: 16,
              }}>
                DISCOVERY
              </span>
              <span style={{
                display: 'block',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(16px, 2.5vw, 26px)',
                color: 'var(--pixel-yellow)',
                textShadow: '4px 4px 0 #9a8900',
              }}>
                & SCAM PROTECTION
              </span>
            </h1>

            <p style={{
              fontFamily: "'VT323', monospace",
              fontSize: '20px',
              color: 'var(--pixel-grey)',
              marginTop: 24,
              lineHeight: 1.6,
              maxWidth: 420,
            }}>
              Discover hidden local gems, authentic cafes &amp; accommodations. Get AI-powered price verification to stay protected from scams.
            </p>
          </div>

          {/* Stats Row */}
          <div style={{
            display: 'flex', gap: 24, flexWrap: 'wrap',
          }}>
            {[
              { label: 'QUESTS', val: '42+', color: 'var(--pixel-cyan)' },
              { label: 'PLAYERS', val: '1337', color: 'var(--pixel-yellow)' },
              { label: 'CITIES', val: '5', color: 'var(--pixel-green)' },
            ].map(({ label, val, color }) => (
              <div key={label} style={{
                background: 'var(--pixel-black)',
                border: `3px solid ${color}`,
                boxShadow: `4px 4px 0 0 ${color}`,
                padding: '10px 16px',
                minWidth: 90,
              }}>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '16px',
                  color,
                }}>{val}</div>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '7px',
                  color: 'var(--pixel-grey)',
                  marginTop: 4,
                }}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {/* Replaced <a href> with <Link to> */}
            <Link
              to="/discover"
              className="pixel-btn pixel-btn-yellow"
              style={{ fontSize: '11px', padding: '14px 24px', textDecoration: 'none', display: 'inline-block' }}
            >
              ▶ START DISCOVERING
            </Link>
            <button
              className="pixel-btn"
              style={{
                background: 'transparent',
                color: 'var(--pixel-cyan)',
                border: '3px solid var(--pixel-cyan)',
                borderBottom: '6px solid var(--pixel-cyan)',
                borderRight: '6px solid var(--pixel-cyan)',
                fontSize: '10px',
              }}
            >
              LEARN MORE
            </button>
          </div>
        </div>

        {/* ── Right: Pixel Game Preview Window ──────────────────────────── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            background: 'var(--pixel-black)',
            border: '6px solid var(--pixel-cyan)',
            boxShadow: '12px 12px 0 0 rgba(0,255,245,0.3)',
            width: '100%',
            maxWidth: 360,
          }}>
            {/* Title bar */}
            <div style={{
              background: 'var(--pixel-cyan)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '9px',
                color: 'var(--pixel-black)',
              }}>GAME PREVIEW</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#ff2079', '#ffe600', '#39ff14'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, background: c, border: '2px solid rgba(0,0,0,0.4)' }} />
                ))}
              </div>
            </div>

            {/* Game Screen */}
            <div style={{
              padding: 24,
              position: 'relative',
              minHeight: 280,
              background: '#0a0a1a',
              overflow: 'hidden',
            }}>
              {/* Ground */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 40,
                background: 'repeating-linear-gradient(90deg, #1a3a2e 0px, #1a3a2e 16px, #0d2018 16px, #0d2018 32px)',
                borderTop: '4px solid var(--pixel-green)',
              }} />

              {/* Buildings (pixel art style) */}
              {[
                { x: 10, h: 120, w: 40, c: '#0f3460' },
                { x: 65, h: 90, w: 50, c: '#16213e' },
                { x: 135, h: 140, w: 35, c: '#0f3460' },
                { x: 185, h: 80, w: 55, c: '#16213e' },
                { x: 255, h: 110, w: 40, c: '#0f3460' },
              ].map((b, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  bottom: 40,
                  left: b.x,
                  width: b.w,
                  height: b.h,
                  background: b.c,
                  borderTop: '3px solid #00fff540',
                  borderLeft: '3px solid #00fff520',
                }}>
                  {/* Windows */}
                  {Array.from({ length: Math.floor(b.h / 24) }).map((_, wi) => (
                    <div key={wi} style={{
                      position: 'absolute',
                      top: 8 + wi * 22,
                      left: 6,
                      right: 6,
                      height: 10,
                      background: Math.random() > 0.4 ? 'var(--pixel-yellow)' : '#333',
                      opacity: 0.7,
                    }} />
                  ))}
                </div>
              ))}

              {/* Characters */}
              <div className="pixel-float" style={{ position: 'absolute', bottom: 42, left: 40, fontSize: 28 }}>🐕</div>
              <div className="pixel-float" style={{ position: 'absolute', bottom: 42, left: 90, fontSize: 28, animationDelay: '0.3s' }}>🐱</div>

              {/* Stars in sky */}
              {[,,,,].map(([x, y], i) => (
                <div key={i} className="blink" style={{
                  position: 'absolute', left: x, top: y,
                  width: 3, height: 3,
                  background: 'white',
                  animationDelay: `${i * 0.3}s`,
                }} />
              ))}

              {/* Speech bubble */}
              <div style={{
                position: 'absolute', top: 20, left: 20,
                background: 'white',
                border: '3px solid black',
                padding: '6px 10px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '7px',
                color: 'black',
                boxShadow: '3px 3px 0 0 black',
              }}>
                EXPLORE!
                <div style={{
                  position: 'absolute', bottom: -10, left: 12,
                  width: 0, height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '10px solid black',
                }} />
              </div>
            </div>

            {/* Footer controls */}
            <div style={{
              background: '#111',
              padding: '10px 16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderTop: '3px solid var(--pixel-cyan)',
            }}>
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '7px',
                color: 'var(--pixel-grey)',
              }}>TRAVEL SMARTER</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}