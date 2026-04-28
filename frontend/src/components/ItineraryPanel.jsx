import { useState, useEffect } from 'react';
import { apiService } from '../service/api';

export default function ItineraryPanel() {
  const [city, setCity] = useState('Kolkata');
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItineraries = async () => {
      setLoading(true);
      try {
        // Fetch from our new Spring Boot endpoint!
        const data = await apiService.getItineraries(city);
        setItineraries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItineraries();
  }, [city]);

  return (
    <section style={{ padding: '80px 24px', position: 'relative', background: '#050510' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ height: 3, width: 60, background: 'var(--pixel-yellow)' }} />
            <span style={{ fontSize: 8, fontFamily: "'Press Start 2P'", color: 'var(--pixel-yellow)' }}>
              🗺️ CURATED ROUTES 🗺️
            </span>
            <div style={{ height: 3, width: 60, background: 'var(--pixel-yellow)' }} />
          </div>
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(16px, 3vw, 28px)', color: 'var(--pixel-white)', margin: '0 0 12px', textShadow: '4px 4px 0 #555'
          }}>
            BUDDY'S TRAVEL GUIDES
          </h2>
        </div>

        {loading && <div className="blink" style={{ textAlign: 'center', color: 'var(--pixel-cyan)' }}>LOADING ROUTE...</div>}

        {!loading && itineraries.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--pixel-grey)', fontFamily: "'VT323', monospace", fontSize: 24 }}>
            No itineraries found for {city}. Try Kolkata!
          </div>
        )}

        {/* Render Itineraries */}
        {!loading && itineraries.map(itinerary => (
          <div key={itinerary.id} style={{ marginBottom: 64 }}>
            
            {/* Itinerary Title Card */}
            <div style={{
              background: 'var(--pixel-navy)', border: '4px solid var(--pixel-cyan)', padding: '20px', marginBottom: '32px', textAlign: 'center', boxShadow: '8px 8px 0 0 rgba(0,255,245,0.2)'
            }}>
              <h3 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: 'var(--pixel-cyan)', marginBottom: 12 }}>
                {itinerary.title}
              </h3>
              <p style={{ fontFamily: "'VT323', monospace", fontSize: 18, color: 'var(--pixel-grey)', margin: 0 }}>
                {itinerary.description} • ⏳ {itinerary.duration}
              </p>
            </div>

            {/* The Timeline */}
            <div style={{ position: 'relative', paddingLeft: 30 }}>
              {/* The vertical line running down the left */}
              <div style={{ position: 'absolute', left: 14, top: 0, bottom: 0, width: 4, background: 'var(--pixel-cyan)' }} />

              {itinerary.stops.map((stop, index) => {
                const isSponsor = stop.isSponsored;
                const boxColor = isSponsor ? 'var(--pixel-yellow)' : 'var(--pixel-white)';
                const bgColor = isSponsor ? '#1a1a00' : 'var(--pixel-black)';

                return (
                  <div key={stop.id} style={{ position: 'relative', marginBottom: 32 }}>
                    
                    {/* The Timeline Dot */}
                    <div style={{
                      position: 'absolute', left: -26, top: 16, width: 20, height: 20,
                      background: isSponsor ? 'var(--pixel-yellow)' : 'var(--pixel-navy)',
                      border: `4px solid ${isSponsor ? 'var(--pixel-white)' : 'var(--pixel-cyan)'}`,
                      borderRadius: isSponsor ? '0%' : '50%', // Sponsors get square pixel blocks, normal gets circles
                      zIndex: 2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {isSponsor && <span style={{ fontSize: 10 }}>★</span>}
                    </div>

                    {/* The Stop Card */}
                    <div style={{
                      background: bgColor, border: `3px solid ${boxColor}`, padding: 16,
                      boxShadow: isSponsor ? `6px 6px 0 0 rgba(255, 215, 0, 0.4)` : `6px 6px 0 0 rgba(255, 255, 255, 0.1)`,
                      position: 'relative'
                    }}>
                      
                      {/* SPONSORED BADGE */}
                      {isSponsor && (
                        <div style={{
                          position: 'absolute', top: -12, right: 16, background: 'var(--pixel-yellow)', color: 'black', padding: '4px 8px', fontFamily: "'Press Start 2P', monospace", fontSize: 8, border: '2px solid white'
                        }}>
                          ⭐ MUST VISIT
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
                        <h4 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 11, color: boxColor, margin: 0, lineHeight: 1.4 }}>
                          {stop.stopNumber}. {stop.locationName}
                        </h4>
                        <span style={{ background: boxColor, color: 'black', padding: '4px 8px', fontFamily: "'VT323', monospace", fontSize: 16, fontWeight: 'bold' }}>
                          ⏰ {stop.timeSuggestion}
                        </span>
                      </div>
                      
                      <p style={{ fontFamily: "'VT323', monospace", fontSize: 18, color: 'var(--pixel-grey)', margin: 0 }}>
                        {stop.description}
                      </p>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}