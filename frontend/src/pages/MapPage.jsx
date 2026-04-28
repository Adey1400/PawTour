import React, { useState, useEffect } from 'react';
import PixelMap from '../components/PixelMap';
import { apiService } from '../service/api';

export default function MapPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await apiService.getAccommodations('Kolkata', 'HOTEL');
        setItems(data);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--pixel-dark)',
      padding: '40px 24px',
      marginTop: '20px'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        position: 'relative',
        zIndex: 10
      }}>
        <h1 style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '32px',
          color: 'var(--pixel-cyan)',
          textShadow: '4px 4px 0 var(--pixel-pink), -2px -2px 0 var(--pixel-purple)',
          margin: 0,
          marginBottom: '8px',
          letterSpacing: '2px'
        }}>
          🗺️ BUDDY'S WORLD MAP
        </h1>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: '14px',
          color: 'var(--pixel-lime)',
          margin: '12px 0 0 0',
          textShadow: '2px 2px 0 rgba(0,0,0,0.5)'
        }}>
          Discover amazing places for your furry friend!
        </p>
      </div>

      {/* Map Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 0 30px rgba(0, 255, 245, 0.3), inset 0 0 20px rgba(0, 255, 245, 0.1)',
        border: '4px solid var(--pixel-cyan)',
        borderRadius: '4px',
        overflow: 'hidden',
        background: 'var(--pixel-black)'
      }}>
        {loading ? (
          <div style={{
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Press Start 2P', monospace",
            color: 'var(--pixel-cyan)',
            fontSize: '16px'
          }}>
            🐕 Loading buddy's locations...
          </div>
        ) : (
          <PixelMap items={items} />
        )}
      </div>

      {/* Footer Info */}
      <div style={{
        maxWidth: '1200px',
        margin: '40px auto 0',
        padding: '24px',
        background: 'rgba(0, 255, 245, 0.05)',
        border: '2px solid var(--pixel-cyan)',
        borderRadius: '4px',
        fontFamily: "'VT323', monospace",
        color: 'var(--pixel-white)',
        fontSize: '12px',
        lineHeight: '1.8',
        textShadow: '1px 1px 0 rgba(0,0,0,0.5)'
      }}>
        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: 'var(--pixel-lime)' }}>🐕 BUDDY'S TIP:</strong> Click on any marker to see details about that location. Use your mouse wheel to zoom in and out!
        </div>
        <div>
          <strong style={{ color: 'var(--pixel-pink)' }}>📍 MARKERS:</strong> Blue dog icon shows your current location, location pins show nearby pet-friendly spots.
        </div>
      </div>
    </div>
  );
}
