import { useState, useEffect } from 'react';
import { apiService } from '../service/api';
import toast from 'react-hot-toast';

export default function DiscoveryPanel() {
  const [activeTab, setActiveTab] = useState('accommodations');
  const [city, setCity] = useState('Kolkata');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const accommodationTypes = ['HOTEL', 'OTA', 'OYO', 'ECO_SHACK'];
  const vendorTypes = ['RESTAURANT', 'CAFE', 'SHOP', 'LOCAL_GUIDE'];

  const fetchAccommodations = async (type = null) => {
    try {
      setLoading(true);
      const data = await apiService.getAccommodations(city, type);
      setItems(data);
    } catch { 
      toast.error('Failed to load accommodations'); 
    } finally { 
      setLoading(false); 
    }
  };

  const fetchVendors = async (type = null) => {
    try {
      setLoading(true);
      const data = await apiService.getVendors(city, type);
      setItems(data);
    } catch { 
      toast.error('Failed to load vendors'); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (activeTab === 'accommodations') fetchAccommodations(selectedType);
    else fetchVendors(selectedType);
  }, [activeTab, city]);

  return (
    <section id="discover-panel" style={{ padding: '40px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24,
          }}>
            <div style={{ height: 3, width: 60, background: 'var(--pixel-cyan)' }} />
            <span style={{ fontSize: 8, fontFamily: "'Press Start 2P'", color: 'var(--pixel-cyan)' }}>
              🗺️ DISCOVER 🗺️
            </span>
            <div style={{ height: 3, width: 60, background: 'var(--pixel-cyan)' }} />
          </div>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(16px, 3vw, 28px)',
            color: 'var(--pixel-white)',
            margin: '0 0 12px',
            textShadow: '4px 4px 0 var(--pixel-blue)',
          }}>
            EXPLORE THE CITY
          </h2>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: 20,
            color: 'var(--pixel-grey)',
          }}>
            Find the best stays, restaurants, and local experiences
          </p>
        </div>

        {/* ── City search bar ─────────────────────────────────────────── */}
        <div style={{
          display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap',
        }}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            className="pixel-input"
            style={{ width: 220 }}
          />
          <button
            onClick={() => activeTab === 'accommodations' ? fetchAccommodations(selectedType) : fetchVendors(selectedType)}
            className="pixel-btn"
            style={{ fontSize: 9 }}
          >
            🔍 SEARCH
          </button>
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
          {[
            { id: 'accommodations', label: '🏠 STAYS', color: 'var(--pixel-cyan)' },
            { id: 'vendors', label: '🍜 VENDORS', color: 'var(--pixel-yellow)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedType(null); // Reset filter when switching tabs
              }}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 9,
                padding: '10px 20px',
                background: activeTab === tab.id ? tab.color : 'var(--pixel-black)',
                color: activeTab === tab.id ? 'var(--pixel-black)' : tab.color,
                border: `3px solid ${tab.color}`,
                borderBottom: activeTab === tab.id ? `3px solid ${tab.color}` : `6px solid ${tab.color}`,
                borderRight: activeTab === tab.id ? `3px solid ${tab.color}` : `6px solid ${tab.color}`,
                cursor: 'pointer',
                transition: 'transform 0.05s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Type Filters ────────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
          <button
            onClick={() => { setSelectedType(null); activeTab === 'accommodations' ? fetchAccommodations() : fetchVendors(); }}
            className="pixel-badge"
            style={{
              cursor: 'pointer',
              background: selectedType === null ? 'var(--pixel-cyan)' : 'var(--pixel-black)',
              color: selectedType === null ? 'var(--pixel-black)' : 'var(--pixel-cyan)',
              padding: '6px 12px',
            }}
          >
            ALL
          </button>
          {(activeTab === 'accommodations' ? accommodationTypes : vendorTypes).map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                activeTab === 'accommodations' ? fetchAccommodations(type) : fetchVendors(type);
              }}
              className="pixel-badge"
              style={{
                cursor: 'pointer',
                background: selectedType === type ? 'var(--pixel-cyan)' : 'var(--pixel-black)',
                color: selectedType === type ? 'var(--pixel-black)' : 'var(--pixel-cyan)',
                padding: '6px 12px',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* ── Loading ─────────────────────────────────────────────────── */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div className="blink" style={{ fontSize: 36, marginBottom: 12 }}>🔄</div>
            <p style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 10,
              color: 'var(--pixel-grey)',
            }}>LOADING...</p>
          </div>
        )}

        {/* ── Items Grid ──────────────────────────────────────────────── */}
        {!loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {items.length === 0 ? (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '48px 0',
              }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
                <p style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 10,
                  color: 'var(--pixel-grey)',
                }}>
                  NO {activeTab.toUpperCase()} IN {city.toUpperCase()}
                </p>
                <p style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: 18,
                  color: '#555',
                  marginTop: 8,
                }}>
                  Try another city!
                </p>
              </div>
            ) : (
              items.map((item, idx) => (
                <DiscoveryCard key={item.id} item={item} index={idx} type={activeTab} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Pixel Discovery Card ─────────────────────────────────────────────
function DiscoveryCard({ item, index, type }) {
  const isAd = item.isFeatured;
  const colors = ['var(--pixel-cyan)', 'var(--pixel-pink)', 'var(--pixel-green)'];
  const color = isAd ? 'var(--pixel-yellow)' : colors[index % colors.length];
  const affiliateLink = type === 'accommodations' ? item.externalUrl : item.affiliateUrl;
  
  const handleSaveToBackpack = async (e) => {
    e.preventDefault();
    try {
      const itemType = type === 'accommodations' ? 'ACCOMMODATION' : 'VENDOR';
      await apiService.addToBackpack(1, itemType, item.id);
      toast.success(`${item.name} saved! 🎒`);
    } catch (err) {
      toast.error('Failed to save or already in backpack.');
    }
  };
  
  return (
    <div
      style={{
        background: 'var(--pixel-navy)',
        border: `3px solid ${color}`,
        boxShadow: `6px 6px 0 0 ${color}60`,
        position: 'relative',
        display: 'flex',         
        flexDirection: 'column', 
        transition: 'transform 0.1s',
      }}
    >
      {isAd && (
        <div style={{
          position: 'absolute', top: -12, right: 12,
          background: 'var(--pixel-yellow)', color: 'var(--pixel-black)',
          padding: '4px 8px', fontFamily: "'Press Start 2P', monospace",
          fontSize: '8px', border: '2px solid black', zIndex: 10,
        }}>
          ★ FEATURED
        </div>
      )}

      <div style={{
        background: color, padding: '6px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: 'var(--pixel-black)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%',
        }}>
          {item.name}
        </span>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: 'var(--pixel-black)' }}>
          {item.type}
        </span>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span style={{ fontSize: 12 }}>📍</span>
          <span style={{ fontFamily: "'VT323', monospace", fontSize: 16, color: 'var(--pixel-grey)' }}>{item.city}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 12 }}>⭐</span>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: 'var(--pixel-yellow)' }}>
            {item.rating || item.googleRating || 'N/A'}
          </span>
        </div>

        <p style={{
          fontFamily: "'VT323', monospace", fontSize: 16, color: 'var(--pixel-grey)',
          lineHeight: 1.4, marginBottom: 16, display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1, 
        }}>
          {item.description || item.speciality || 'No description available'}
        </p>

        {type === 'accommodations' && item.pricePerNight && (
          <div style={{
            background: 'var(--pixel-black)', border: `2px solid ${color}`,
            padding: '6px 10px', marginBottom: 16, display: 'inline-flex',
            alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 12 }}>💰</span>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color }}>
              ₹{item.pricePerNight}/NIGHT
            </span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button
            onClick={handleSaveToBackpack}
            style={{
              background: 'var(--pixel-navy)', border: `2px solid ${color}`,
              borderBottom: `4px solid ${color}`, borderRight: `4px solid ${color}`,
              padding: '10px', color: color, cursor: 'pointer',
            }}
          >
            ♥
          </button>

          {affiliateLink ? (
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1, display: 'block', textAlign: 'center', textDecoration: 'none',
                background: 'var(--pixel-black)', border: `2px solid ${color}`,
                borderBottom: `4px solid ${color}`, borderRight: `4px solid ${color}`,
                padding: '10px 12px', fontFamily: "'Press Start 2P', monospace",
                fontSize: 9, color: color, cursor: 'pointer',
              }}
            >
              {type === 'accommodations' ? '▶ BOOK NOW' : '▶ VIEW OFFER'}
            </a>
          ) : (
            <button
              disabled
              style={{
                flex: 1, background: '#222', border: '2px solid #444',
                padding: '10px 12px', fontFamily: "'Press Start 2P', monospace",
                fontSize: 9, color: '#666', cursor: 'not-allowed',
              }}
            >
              NO OFFERS
            </button>
          )}
        </div>
      </div>
    </div>
  );
}