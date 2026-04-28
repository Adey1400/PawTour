import { useState } from 'react';
import toast from 'react-hot-toast';
import { apiService } from '../service/api';

export default function ScamChecker() {
  const [city, setCity] = useState('Kolkata');
  const [category, setCategory] = useState('Food');
  const [itemName, setItemName] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false); // NEW STATE
  const [result, setResult] = useState(null);

  const categories = ['Transport', 'Food', 'Souvenir'];

  const handleVerifyPrice = async (e) => {
    e.preventDefault();
    if (!itemName.trim()) { toast.error('Enter item name!'); return; }
    if (!quotedPrice || parseFloat(quotedPrice) <= 0) { toast.error('Enter valid price!'); return; }

    try {
      setLoading(true);
      const response = await apiService.checkPrice(city, category, itemName, parseFloat(quotedPrice));
      setResult(response);
    } catch (error) {
      toast.error(error.message || 'Failed to verify price.');
    } finally {
      setLoading(false);
    }
  };

  // ── NEW: Handle User Price Reports ──
  const handleReportPrice = async () => {
    try {
      setReportSubmitting(true);
      // Hardcoding userId 1 for MVP demo
      const message = await apiService.reportPrice(1, city, category, itemName, parseFloat(quotedPrice));
      toast.success(message || 'Report submitted! 📊');
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setReportSubmitting(false);
    }
  };

  const getVerdictConfig = () => {
    if (!result) return null;
    const v = result.verdict;
    if (v === 'SCAM_ALERT') return {
      color: 'var(--pixel-pink)', shadow: '#990040',
      title: '!! SCAM ALERT !!', icon: '🚨', pulse: true,
    };
    if (v === 'FAIR_PRICE') return {
      color: 'var(--pixel-green)', shadow: '#1a6b0a',
      title: '>> FAIR PRICE <<', icon: '✅', pulse: false,
    };
    if (v === 'GREAT_DEAL') return {
      color: 'var(--pixel-yellow)', shadow: '#9a8900',
      title: '** GREAT DEAL **', icon: '🎉', pulse: false,
    };
    return null;
  };

  const verdict = getVerdictConfig();

  return (
    <section style={{ padding: '80px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>

        {/* ── Section Header ──────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24,
          }}>
            <div style={{ height: 3, width: 60, background: 'var(--pixel-pink)' }} />
            <span style={{ fontSize: 8, fontFamily: "'Press Start 2P'", color: 'var(--pixel-pink)' }}>
              🛡️ SCAM DETECTOR 🛡️
            </span>
            <div style={{ height: 3, width: 60, background: 'var(--pixel-pink)' }} />
          </div>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(16px, 2.5vw, 26px)',
            color: 'var(--pixel-white)',
            margin: '0 0 12px',
            textShadow: '4px 4px 0 var(--pixel-blue)',
          }}>
            PRICE CHECKER
          </h2>
          <p style={{
            fontFamily: "'VT323', monospace",
            fontSize: 20,
            color: 'var(--pixel-grey)',
          }}>
            Verify prices and detect scams in real-time
          </p>
        </div>

        {/* ── Input Panel ─────────────────────────────────────────────── */}
        <div style={{
          background: 'var(--pixel-navy)',
          border: '4px solid var(--pixel-cyan)',
          boxShadow: '8px 8px 0 0 rgba(0,255,245,0.4)',
          position: 'relative',
        }}>
          {/* Title bar */}
          <div style={{
            background: 'var(--pixel-cyan)',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 14 }}>⚡</span>
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 9,
              color: 'var(--pixel-black)',
            }}>QUICK PRICE CHECK</span>
          </div>

          {/* Inner border */}
          <div style={{
            position: 'absolute', left: 4, right: 4, bottom: 4,
            top: 36,
            border: '2px solid rgba(0,255,245,0.15)',
            pointerEvents: 'none',
          }} />

          <form onSubmit={handleVerifyPrice} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* City */}
              <div>
                <label className="pixel-label">CITY</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Kolkata"
                  className="pixel-input"
                />
              </div>
              {/* Category */}
              <div>
                <label className="pixel-label">CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pixel-select"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} style={{ background: 'var(--pixel-black)' }}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Item Name */}
              <div>
                <label className="pixel-label">ITEM NAME</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g., Masala Chai"
                  className="pixel-input"
                />
              </div>
              {/* Quoted Price */}
              <div>
                <label className="pixel-label">PRICE (₹)</label>
                <input
                  type="number"
                  value={quotedPrice}
                  onChange={(e) => setQuotedPrice(e.target.value)}
                  placeholder="e.g., 50"
                  step="0.01"
                  min="0"
                  className="pixel-input"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="pixel-btn pixel-btn-yellow"
              style={{
                width: '100%',
                justifyContent: 'center',
                fontSize: 11,
                padding: '14px 24px',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <span className="blink">⚡</span> VERIFYING...
                </>
              ) : (
                <>⚡ VERIFY PRICE</>
              )}
            </button>
          </form>
        </div>

        {/* ── Result Panel ────────────────────────────────────────────── */}
        {result && verdict && (
          <div style={{
            marginTop: 24,
            background: 'var(--pixel-navy)',
            border: `4px solid ${verdict.color}`,
            boxShadow: `8px 8px 0 0 ${verdict.shadow}`,
            animation: verdict.pulse ? 'blink 1.5s step-end infinite' : 'none',
          }}>
            {/* Result header */}
            <div style={{
              background: verdict.color,
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>{verdict.icon}</span>
              <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 10,
                color: 'var(--pixel-black)',
                letterSpacing: 2,
              }}>
                {verdict.title}
              </span>
            </div>

            <div style={{ padding: 24 }}>
              {/* Message */}
              <p style={{
                fontFamily: "'VT323', monospace",
                fontSize: 20,
                color: 'var(--pixel-white)',
                lineHeight: 1.6,
                marginBottom: 20,
                borderBottom: `2px solid ${verdict.color}30`,
                paddingBottom: 16,
              }}>
                {result.message}
              </p>

              {/* Stats grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                marginBottom: 24, // Added margin for spacing
              }}>
                {[
                  { label: 'ITEM', val: itemName },
                  { label: 'YOUR PRICE', val: `₹${quotedPrice}` },
                  { label: 'CATEGORY', val: category },
                ].map(({ label, val }) => (
                  <div key={label} style={{
                    background: 'var(--pixel-black)',
                    border: `2px solid ${verdict.color}`,
                    padding: 10,
                  }}>
                    <div style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: 7,
                      color: 'var(--pixel-grey)',
                      marginBottom: 4,
                    }}>{label}</div>
                    <div style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: 18,
                      color: verdict.color,
                    }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* ── NEW: CROWDSOURCING SUBMIT BUTTON ── */}
              {/* Only show if the item was found in the database */}
              {result.itemFound !== false && (
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderTop: `2px dashed ${verdict.color}50`,
                  paddingTop: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  flexWrap: 'wrap'
                }}>
                  <p style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: 16,
                    color: 'var(--pixel-grey)',
                    margin: 0,
                    flex: 1
                  }}>
                    Did you actually pay this amount? Help keep our community database accurate!
                  </p>
                  <button
                    onClick={handleReportPrice}
                    disabled={reportSubmitting}
                    className="pixel-btn"
                    style={{
                      background: 'var(--pixel-black)',
                      color: verdict.color,
                      border: `2px solid ${verdict.color}`,
                      borderBottom: `4px solid ${verdict.color}`,
                      borderRight: `4px solid ${verdict.color}`,
                      fontSize: 9,
                      opacity: reportSubmitting ? 0.6 : 1,
                      cursor: reportSubmitting ? 'wait' : 'pointer',
                    }}
                  >
                    {reportSubmitting ? 'SUBMITTING...' : '📢 REPORT AS ACTUAL'}
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}