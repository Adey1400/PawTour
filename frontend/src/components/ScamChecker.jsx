import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { AlertTriangle, CheckCircle, Zap, TrendingUp } from 'lucide-react';
import { apiService } from '../service/api';

export default function ScamChecker() {
  const [city, setCity] = useState('Kolkata');
  const [category, setCategory] = useState('Food');
  const [itemName, setItemName] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const categories = ['Transport', 'Food', 'Souvenir'];

  // ── Handle form submission ───────────────────────────────────────────
  const handleVerifyPrice = async (e) => {
    e.preventDefault();

    // Validation
    if (!itemName.trim()) {
      toast.error('Please enter an item name');
      return;
    }

    if (!quotedPrice || parseFloat(quotedPrice) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.checkPrice(
        city,
        category,
        itemName,
        parseFloat(quotedPrice)
      );

      setResult(response);
      console.log('Price check result:', response);
    } catch (error) {
      console.error('Price verification failed:', error);
      toast.error(error.message || 'Failed to verify price. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Determine verdict styling ────────────────────────────────────────
  const getVerdictStyle = () => {
    if (!result) return {};

    const verdict = result.verdict;

    if (verdict === 'SCAM_ALERT') {
      return {
        borderColor: 'rgb(244, 63, 94)',
        glowColor: 'rgba(244, 63, 94, 0.3)',
        bgGradient: 'from-rose-500/10 via-red-500/10 to-rose-500/10',
        icon: AlertTriangle,
        iconColor: 'text-rose-400',
        title: '🚨 SCAM ALERT!',
        titleColor: 'text-rose-300',
        pulse: true,
      };
    }

    if (verdict === 'FAIR_PRICE') {
      return {
        borderColor: 'rgb(16, 185, 129)',
        glowColor: 'rgba(16, 185, 129, 0.3)',
        bgGradient: 'from-emerald-500/10 via-green-500/10 to-emerald-500/10',
        icon: CheckCircle,
        iconColor: 'text-emerald-400',
        title: '✅ Fair Price',
        titleColor: 'text-emerald-300',
        pulse: false,
      };
    }

    if (verdict === 'GREAT_DEAL') {
      return {
        borderColor: 'rgb(34, 197, 94)',
        glowColor: 'rgba(34, 197, 94, 0.3)',
        bgGradient: 'from-green-500/10 via-emerald-500/10 to-teal-500/10',
        icon: TrendingUp,
        iconColor: 'text-green-400',
        title: '🎉 Great Deal!',
        titleColor: 'text-green-300',
        pulse: false,
      };
    }

    return {};
  };

  const verdictStyle = getVerdictStyle();
  const VerdictIcon = verdictStyle.icon;

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Scam Detector
            </span>
          </h2>
          <p className="text-slate-300">
            Verify prices and detect potential scams in real-time
          </p>
        </motion.div>

        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-cyan-400/30 rounded-2xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-cyan-400/20">
            <Zap className="text-cyan-400" size={28} />
            <h3 className="text-2xl font-bold text-white">Quick Price Check</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleVerifyPrice} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* City Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Kolkata"
                  className="w-full px-4 py-3 bg-slate-800/60 border border-cyan-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:bg-slate-800/80 transition-all duration-200"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400/60 focus:bg-slate-800/80 transition-all duration-200 appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-900">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Item Name & Price Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                  Item Name
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g., Masala Chai"
                  className="w-full px-4 py-3 bg-slate-800/60 border border-cyan-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:bg-slate-800/80 transition-all duration-200"
                />
              </div>

              {/* Quoted Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                  Quoted Price (₹)
                </label>
                <input
                  type="number"
                  value={quotedPrice}
                  onChange={(e) => setQuotedPrice(e.target.value)}
                  placeholder="e.g., 50"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-slate-800/60 border border-cyan-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:bg-slate-800/80 transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Zap size={20} />
                  </motion.div>
                  Verifying...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Verify Price
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Result Panel */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
            >
              <motion.div
                animate={
                  verdictStyle.pulse
                    ? {
                        boxShadow: [
                          `0 0 20px ${verdictStyle.glowColor}`,
                          `0 0 40px ${verdictStyle.glowColor}`,
                          `0 0 20px ${verdictStyle.glowColor}`,
                        ],
                      }
                    : {}
                }
                transition={
                  verdictStyle.pulse
                    ? { duration: 1.5, repeat: Infinity }
                    : {}
                }
                style={{
                  borderColor: verdictStyle.borderColor,
                }}
                className={`backdrop-blur-xl bg-gradient-to-br ${verdictStyle.bgGradient} border-2 rounded-2xl p-8 shadow-2xl`}
              >
                {/* Result Header */}
                <div className="flex items-start gap-4 mb-6">
                  <VerdictIcon className={`${verdictStyle.iconColor} flex-shrink-0`} size={32} />
                  <div>
                    <h4 className={`text-2xl font-bold ${verdictStyle.titleColor} mb-2`}>
                      {verdictStyle.title}
                    </h4>
                  </div>
                </div>

                {/* Result Message */}
                <p className="text-slate-200 leading-relaxed mb-6">
                  {result.message}
                </p>

                {/* Result Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      Item
                    </p>
                    <p className="text-white font-semibold">{itemName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      Your Price
                    </p>
                    <p className="text-white font-semibold">₹{quotedPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      Category
                    </p>
                    <p className="text-white font-semibold">{category}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
