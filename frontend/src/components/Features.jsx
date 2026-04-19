import { motion } from 'framer-motion';
import { Shield, Zap, Target } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Scam Protection',
    description: 'AI-powered price verification to protect you from overcharging and tourist traps.',
  },
  {
    icon: Zap,
    title: 'AI Guide',
    description: 'Smart companion that provides riddles and hints tailored to your location.',
  },
  {
    icon: Target,
    title: 'Gamified Quests',
    description: 'Earn points, unlock achievements, and compete on leaderboards.',
  },
];

export default function Features() {
  return (
    <section className="relative py-20 px-6">
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
              Why Join PawTours?
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Experience the city with confidence, fun, and furry friends
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-8 h-full transition-all duration-300 hover:border-cyan-400/60 hover:bg-gradient-to-br hover:from-cyan-500/20 hover:via-blue-500/15 hover:to-purple-500/20">
                
                {/* Icon */}
                <div className="mb-6 p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl w-fit group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                  <feature.icon className="text-cyan-400 group-hover:text-cyan-300" size={32} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
