const features = [
  {
    icon: '🛡️',
    title: 'SCAM\nPROTECT',
    description: 'AI-powered price verification to protect you from overcharging and tourist traps.',
    color: 'var(--pixel-pink)',
    shadow: '#990040',
    badge: 'ACTIVE',
    badgeColor: 'var(--pixel-green)',
  },
  {
    icon: '⚡',
    title: 'AI\nGUIDE',
    description: 'Smart companion that provides travel tips and local insights tailored to your location.',
    color: 'var(--pixel-cyan)',
    shadow: 'var(--pixel-blue)',
    badge: 'NEW',
    badgeColor: 'var(--pixel-yellow)',
  },
  {
    icon: '🏘️',
    title: 'LOCAL\nDISCOVERY',
    description: 'Find hidden local gems, authentic cafes, unique accommodations, and off-the-beaten-path attractions.',
    color: 'var(--pixel-yellow)',
    shadow: '#9a8900',
    badge: 'HOT',
    badgeColor: 'var(--pixel-pink)',
  },
];

export default function Features() {
  return (
    <section style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          {/* Decorative top border */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24,
          }}>
            <div style={{ height: 3, width: 60, background: 'var(--pixel-cyan)' }} />
            <span style={{ fontSize: 8, fontFamily: "'Press Start 2P'", color: 'var(--pixel-cyan)' }}>
              ★ FEATURES ★
            </span>
            <div style={{ height: 3, width: 60, background: 'var(--pixel-cyan)' }} />
          </div>

          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(18px, 3vw, 32px)',
            color: 'var(--pixel-white)',
            margin: '0 0 16px',
            textShadow: '4px 4px 0 var(--pixel-blue)',
          }}>
            WHY JOIN PAWTOURS?
          </h2>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: 22,
            color: 'var(--pixel-grey)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
            Experience the city with confidence, fun, and furry pixel friends
          </p>
        </div>

        {/* ── Features Grid ───────────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 32,
        }}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--pixel-navy)',
                border: `4px solid ${feature.color}`,
                boxShadow: `8px 8px 0 0 ${feature.shadow}`,
                padding: 32,
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.1s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                e.currentTarget.style.boxShadow = `12px 12px 0 0 ${feature.shadow}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `8px 8px 0 0 ${feature.shadow}`;
              }}
            >
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: -14, right: 16,
                background: feature.badgeColor,
                padding: '4px 10px',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                color: 'var(--pixel-black)',
                border: '2px solid black',
              }}>
                {feature.badge}
              </div>

              {/* Inner border */}
              <div style={{
                position: 'absolute', inset: 4,
                border: `2px solid ${feature.color}20`,
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                fontSize: 48,
                marginBottom: 20,
                lineHeight: 1,
                filter: `drop-shadow(3px 3px 0 ${feature.shadow})`,
              }}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 13,
                color: feature.color,
                marginBottom: 16,
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "'VT323', monospace",
                fontSize: 18,
                color: 'var(--pixel-grey)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {feature.description}
              </p>

              {/* Bottom decoration */}
              <div style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: `2px solid ${feature.color}30`,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ width: 8, height: 8, background: feature.color }} />
                <div style={{ width: 6, height: 6, background: feature.color, opacity: 0.6 }} />
                <div style={{ width: 4, height: 4, background: feature.color, opacity: 0.3 }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
