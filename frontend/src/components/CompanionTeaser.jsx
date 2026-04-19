import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const companions = [
  {
    name: 'Buddy',
    breed: 'Golden Retriever',
    role: 'Adventure Guide',
    color: 'from-amber-400 to-orange-500',
    icon: '🐕',
  },
  {
    name: 'Whiskers',
    breed: 'Tabby Cat',
    role: 'Scam Detector',
    color: 'from-purple-400 to-pink-500',
    icon: '🐱',
  },
];

export default function CompanionTeaser() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Meet Your Companions
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Two adorable pets ready to help you navigate the city
          </p>
        </motion.div>

        {/* Companions Grid */}
        <div className="relative flex justify-center items-center gap-8 lg:gap-16 flex-wrap">
          
          {/* Background glowing orb */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -z-10"></div>
          </div>

          {/* Companion Cards */}
          {companions.map((companion, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                rotateX: 5,
                rotateY: 10,
                z: 20,
              }}
              className="h-96 w-72"
              style={{ perspective: '1000px' }}
            >
              {/* 3D Card Container */}
              <motion.div
                className="relative w-full h-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Card */}
                <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border border-cyan-400/40 rounded-2xl p-8 overflow-hidden shadow-2xl">
                  
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${companion.color} opacity-10`}></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    
                    {/* Top Section */}
                    <div className="text-center mb-8">
                      <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-8xl mb-4"
                      >
                        {companion.icon}
                      </motion.div>
                      <h3 className="text-3xl font-bold text-white mb-1">
                        {companion.name}
                      </h3>
                      <p className="text-sm text-cyan-400 font-semibold uppercase tracking-wider">
                        {companion.breed}
                      </p>
                    </div>

                    {/* Middle Section */}
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-slate-300 text-center">
                        {companion.role}
                      </p>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex items-center justify-center gap-2 text-cyan-400">
                      <Heart size={20} fill="currentColor" />
                      <span className="font-semibold">Ready to Explore</span>
                    </div>
                  </div>

                  {/* Border shine effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
