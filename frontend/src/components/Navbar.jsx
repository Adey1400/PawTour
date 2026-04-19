import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-[#0B1120]/50 border-b border-cyan-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-300">
          🐾 PawTours
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          
          {/* Start Adventure Button */}
          <Link
            to="/play"
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 hover:shadow-xl"
          >
            Start Adventure
          </Link>
        </div>
      </div>
    </nav>
  );
}
