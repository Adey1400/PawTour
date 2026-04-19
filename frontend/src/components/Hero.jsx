import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* ── Left Side: Text & CTA ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div>
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Explore the City.
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                Avoid the Scams.
              </span>
            </h1>
            <p className="text-xl text-slate-300 mt-6 leading-relaxed max-w-md">
              Join Buddy & Whiskers on an AI-powered quest through the city. Solve riddles, discover hidden locations, and earn rewards while staying protected from scams.
            </p>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/play')}
            className="w-fit px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-lg trans transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 hover:shadow-2xl flex items-center gap-3 group"
          >
            Start Adventure
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </motion.button>
        </motion.div>

        {/* ── Right Side: Floating Card ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:flex justify-center items-center"
        >
          {/* Floating Card */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-8 w-80 shadow-2xl">
              <div className="space-y-6">
                <div className="h-48 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl opacity-20"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-cyan-400/30 rounded w-3/4"></div>
                  <div className="h-4 bg-cyan-400/20 rounded w-1/2"></div>
                </div>
              </div>

              {/* Flowing gradient border animation */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-transparent to-purple-500 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          {/* Glow orbs behind the card */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-500/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
}
