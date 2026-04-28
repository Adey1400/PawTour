import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// We still use the OpenStreetMapProvider for geocoding, but render our OWN UI
import { OpenStreetMapProvider } from 'leaflet-geosearch';

export default function SearchControl() {
  const map = useMap();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const providerRef = useRef(new OpenStreetMapProvider());
  const debounceRef = useRef(null);
  const markerRef = useRef(null);

  const search = async (value) => {
    if (!value.trim()) { setResults([]); return; }
    setIsLoading(true);
    try {
      const found = await providerRef.current.search({ query: value });
      setResults(found.slice(0, 5));
    } catch (e) {
      setResults([]);
    }
    setIsLoading(false);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 350);
  };

  const handleSelect = (result) => {
    setQuery(result.label);
    setResults([]);

    // Drop a marker and fly to the result
    if (markerRef.current) map.removeLayer(markerRef.current);
    const icon = new L.divIcon({
      className: '',
      html: `<div style="
        width:14px;height:14px;
        background:var(--pixel-cyan);
        border:3px solid #fff;
        box-shadow:0 0 0 2px var(--pixel-cyan);
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
    markerRef.current = L.marker([result.y, result.x], { icon })
      .addTo(map)
      .bindPopup(`<span style="font-family:'VT323',monospace;font-size:18px">${result.label}</span>`);
    map.flyTo([result.y, result.x], 14, { duration: 1.5 });
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    if (markerRef.current) { map.removeLayer(markerRef.current); markerRef.current = null; }
  };

  // Mount into a Leaflet control so it sits inside the map
  useEffect(() => {
    const SearchBox = L.Control.extend({
      onAdd() {
        const div = L.DomUtil.create('div');
        div.id = 'pixel-search-root';
        // Stop map interactions when clicking/scrolling inside the box
        L.DomEvent.disableClickPropagation(div);
        L.DomEvent.disableScrollPropagation(div);
        return div;
      },
    });
    const control = new SearchBox({ position: 'topleft' });
    map.addControl(control);
    return () => map.removeControl(control);
  }, [map]);

  // Render our React UI into that div via a portal-like approach
  // We use ReactDOM.createPortal alternative: just render a fixed overlay anchored to the control div
  // Simpler: render directly, use Leaflet control div as mount point via useEffect + createRoot
  useEffect(() => {
    const container = document.getElementById('pixel-search-root');
    if (!container) return;

    // We'll render by directly setting innerHTML for the shell and using
    // a real React subtree via a second approach — actually the cleanest
    // way is to just return a positioned div from this component and
    // use CSS to place it. But since we're inside MapContainer, let's
    // use a Leaflet Control with a React portal.
    // → Handled below via the DOM portal pattern.
  }, []);

  const showDropdown = isFocused && (results.length > 0 || isLoading || query.length > 0);

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1000,
        width: '320px',
        maxWidth: 'calc(100% - 20px)',
        fontFamily: "'VT323', monospace",
      }}
      // Prevent map drag/zoom when interacting with the search box
      onMouseDown={e => e.stopPropagation()}
      onTouchStart={e => e.stopPropagation()}
      onWheel={e => e.stopPropagation()}
    >
      {/* Search bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#16213e',
        border: '3px solid #00fff5',
        boxShadow: '5px 5px 0 0 #0f3460',
        height: '44px',
      }}>
        {/* Magnifier icon */}
        <div style={{
          width: '40px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="7" r="5" stroke="#00fff5" strokeWidth="2"/>
            <line x1="11" y1="11" x2="16" y2="16" stroke="#00fff5" strokeWidth="2" strokeLinecap="square"/>
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          placeholder="SEARCH LOCATION..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: "'VT323', monospace",
            fontSize: '20px',
            color: '#fff',
            caretColor: '#00fff5',
            padding: '0 8px 0 0',
            height: '100%',
          }}
        />

        {/* Clear / loading indicator */}
        {query && (
          <button
            onClick={handleClear}
            style={{
              background: 'transparent',
              border: 'none',
              color: isLoading ? '#00fff5' : '#ff2079',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: '0 12px',
              height: '44px',
              lineHeight: '44px',
              flexShrink: 0,
              fontFamily: 'monospace',
            }}
          >
            {isLoading ? '…' : '×'}
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {showDropdown && (
        <div style={{
          background: '#0a0a0a',
          border: '3px solid #00fff5',
          borderTop: 'none',
          boxShadow: '5px 5px 0 0 rgba(0,0,0,0.8)',
          maxHeight: '240px',
          overflowY: 'auto',
        }}>
          {isLoading && !results.length && (
            <div style={{ padding: '10px 14px', color: '#888', fontSize: '18px' }}>
              SCANNING...
            </div>
          )}
          {!isLoading && query && results.length === 0 && (
            <div style={{ padding: '10px 14px', color: '#888', fontSize: '18px' }}>
              NO RESULTS FOUND
            </div>
          )}
          {results.map((r, i) => (
            <div
              key={i}
              onMouseDown={() => handleSelect(r)}
              style={{
                padding: '10px 14px',
                color: '#e8e8e8',
                fontSize: '18px',
                borderBottom: '1px solid rgba(0,255,245,0.1)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'background 0.08s, padding-left 0.08s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0,255,245,0.12)';
                e.currentTarget.style.color = '#00fff5';
                e.currentTarget.style.paddingLeft = '20px';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#e8e8e8';
                e.currentTarget.style.paddingLeft = '14px';
              }}
            >
              {r.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}