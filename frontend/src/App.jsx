import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DiscoverPage from './pages/DiscoverPage';
import ToolsPage from './pages/ToolsPage';
import MapPage from './pages/MapPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="scanlines screen-on" style={{ minHeight: '100vh', background: 'var(--pixel-dark)', overflowX: 'hidden' }}>
        
        {/* ── Pixel Grid Background ─────────────────────────────────────── */}
        <div className="pixel-bg" style={{ position: 'fixed', inset: 0, zIndex: -1 }} />

        {/* ── Corner Decorations ─────────────────────────────────────────── */}
        <div style={{
          position: 'fixed', top: 0, left: 0,
          width: 80, height: 80,
          borderTop: '4px solid var(--pixel-cyan)',
          borderLeft: '4px solid var(--pixel-cyan)',
          zIndex: 9990, pointerEvents: 'none', opacity: 0.5
        }} />
        <div style={{
          position: 'fixed', top: 0, right: 0,
          width: 80, height: 80,
          borderTop: '4px solid var(--pixel-cyan)',
          borderRight: '4px solid var(--pixel-cyan)',
          zIndex: 9990, pointerEvents: 'none', opacity: 0.5
        }} />
        <div style={{
          position: 'fixed', bottom: 0, left: 0,
          width: 80, height: 80,
          borderBottom: '4px solid var(--pixel-cyan)',
          borderLeft: '4px solid var(--pixel-cyan)',
          zIndex: 9990, pointerEvents: 'none', opacity: 0.5
        }} />
        <div style={{
          position: 'fixed', bottom: 0, right: 0,
          width: 80, height: 80,
          borderBottom: '4px solid var(--pixel-cyan)',
          borderRight: '4px solid var(--pixel-cyan)',
          zIndex: 9990, pointerEvents: 'none', opacity: 0.5
        }} />

        {/* ── React Hot Toast Notifications ─────────────────────────────── */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a2e',
              color: '#00fff5',
              border: '3px solid #00fff5',
              borderRadius: '0',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              boxShadow: '4px 4px 0 0 #007a73',
              padding: '12px 16px',
            },
            success: {
              iconTheme: { primary: '#39ff14', secondary: '#1a1a2e' },
            },
            error: {
              iconTheme: { primary: '#ff2079', secondary: '#1a1a2e' },
            },
          }}
        />

        {/* ── Navbar ─────────────────────────────────────────────────────── */}
        <Navbar />

        {/* ── Routes ─────────────────────────────────────────────────────── */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
