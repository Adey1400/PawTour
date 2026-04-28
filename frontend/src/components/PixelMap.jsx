import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// ── 1. Create the Companion Icon (Buddy 🐕) ──
const companionIcon = new L.divIcon({
  className: 'custom-icon',
  html: '<div class="companion-marker">🐕</div>',
  iconSize:[32,32], // Fixed icon size
});

// ── 2. Create the Location Pin Icon (for Cafes/Hotels) ──
const locationIcon = new L.divIcon({
  className: 'custom-icon',
  html: '<div style="font-size: 24px; text-shadow: 2px 2px 0 black;">📍</div>',
  iconSize:[32,32], // Fixed icon size
});

// ── NEW: Helper component to smoothly pan the map to new coordinates ──
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.5 }); // Smooth retro camera pan!
    }
  }, [center, map]);
  return null;
}

export default function PixelMap({ items, centerLat = 22.5726, centerLng = 88.3639 }) {
  // ── NEW: State for GPS Location ──
  const [gpsLocation, setGpsLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // ── NEW: Request GPS Location on Component Mount ──
  useEffect(() => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation([position.coords.latitude, position.coords.longitude]);
          setIsLocating(false);
        },
        (error) => {
          console.warn("GPS Error: Could not get location.", error.message);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  // Determine where the map should focus:
  // 1. If the user searched a city and found items, focus on the first item.
  // 2. If no items, but we found the user's GPS, focus on the user.
  // 3. Fallback to default (Kolkata).
  const mapCenter = items.length > 0 && items[0].latitude && items[0].longitude 
    ? [items[0].latitude, items[0].longitude] 
    : gpsLocation ? gpsLocation : [centerLat, centerLng];

  // Where should Buddy stand? Exactly on the GPS if we have it!
  const buddyPosition = gpsLocation ? gpsLocation : [mapCenter[0] - 0.01, mapCenter[1] - 0.01];

  return (
    <div className="pixel-map-container" style={{ height: '500px', width: '100%', position: 'relative' }}>
      
      {/* Map Title Bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        background: 'linear-gradient(90deg, var(--pixel-cyan), var(--pixel-lime))',
        padding: '8px 12px',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
      }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '11px', color: 'var(--pixel-black)', fontWeight: 'bold' }}>
          🗺️ BUDDY'S LOCATION RADAR
        </span>
        
        {/* NEW: GPS Status Indicator */}
        <span style={{ 
          fontFamily: "'Press Start 2P', monospace", 
          fontSize: '9px', 
          color: 'var(--pixel-black)',
          animation: isLocating ? 'blink 1s infinite' : 'none',
          textShadow: isLocating ? 'none' : '1px 1px 0 rgba(255,255,255,0.6)'
        }}>
          {isLocating ? 'CONNECTING SATELLITE...' : gpsLocation ? 'GPS: ACTIVE' : 'GPS: OFFLINE'}
        </span>
      </div>

      {/* The Actual Map */}
      <MapContainer 
        center={mapCenter} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} // Hiding default zoom for a cleaner retro look
      >
        {/* Triggers the smooth panning animation */}
        <MapUpdater center={mapCenter} />

        {/* The Map Tiles (with our retro CSS filter applied) */}
        <TileLayer
          className="retro-tiles"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap contributors"
          style={{ filter: 'brightness(1.1) contrast(1.1)' }}
        />

        {/* 1. Plot the User/Companion (Simulated Location) */}
        <Marker position={buddyPosition} icon={companionIcon}>
          <Popup className="pixel-popup">
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '18px' }}>
              <strong>Buddy:</strong> {gpsLocation ? "I found you! Let's explore your area!" : "I smell some great deals nearby! Let's go!"}
            </div>
          </Popup>
        </Marker>

        {/* 2. Plot all the Hotels and Vendors from your Database */}
        {items.map((item, idx) => {
          if (!item.latitude || !item.longitude) return null; // Skip if no coordinates
          
          return (
            <Marker key={idx} position={[item.latitude, item.longitude]} icon={locationIcon}>
              <Popup>
                <div style={{ fontFamily: "'VT323', monospace", fontSize: '18px' }}>
                  <strong>{item.name}</strong><br/>
                  {item.pricePerNight ? `💰 ₹${item.pricePerNight}/night` : `⭐ ${item.rating || item.googleRating}`}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}