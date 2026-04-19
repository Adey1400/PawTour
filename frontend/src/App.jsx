import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import GameView from './pages/GameView';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0B1120] text-slate-50 selection:bg-cyan-500/30 overflow-hidden relative">
        
        {/* ── Glowing Background Effects ────────────────────────────────── */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

        {/* ── React Hot Toast Notifications ────────────────────────────────── */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0B1120',
              color: '#ffffff',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: {
                primary: '#06B6D4',
                secondary: '#0B1120',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#0B1120',
              },
            },
          }}
        />

        {/* ── Navbar (Persistent) ──────────────────────────────────────────── */}
        <Navbar />

        {/* ── Routes ───────────────────────────────────────────────────────── */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/play" element={<GameView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
