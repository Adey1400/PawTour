import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { MapPin, Lightbulb, Send, Zap } from 'lucide-react';
import { apiService } from '../service/api';

export default function GameView() {
  const navigate = useNavigate();
  const [clue, setClue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guessInput, setGuessInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  // ── 1. Fetch initial clue on mount ─────────────────────────────────────
  useEffect(() => {
    const fetchInitialClue = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching clue for Quest 1, Step 1...');
        const response = await apiService.getCurrentClue(1, 1); // Quest 1, Step 1
        
        console.log('✅ Clue response received:', response);
        
        // Fallback to mock data if response is empty or has no riddle
        if (!response || !response.riddleText) {
          console.warn('⚠️ No riddle text in response, using mock data');
          const mockClue = {
            locationName: 'Victoria Memorial',
            riddleText: 'I stand white and tall by the river, a symbol of love and architecture. Whiskers loves to sit on my cold stones. Find me and describe what you see.',
            sequenceOrder: 1,
            totalLocations: 5,
          };
          setClue(mockClue);
          toast('📌 Using demo clue (backend might not have data)', { icon: '⚠️' });
          return;
        }
        
        setClue(response);
      } catch (error) {
        console.error('❌ Failed to fetch clue:', error);
        console.error('📋 Error details:', error.message);
        
        // Use demo data as fallback
        const mockClue = {
          locationName: 'Victoria Memorial',
          riddleText: 'I stand white and tall by the river, a symbol of love and architecture. Whiskers loves to sit on my cold stones. Find me and describe what you see.',
          sequenceOrder: 1,
          totalLocations: 5,
        };
        setClue(mockClue);
        
        toast.error('Backend unavailable - using demo data. Is localhost:8080 running?');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialClue();
  }, []);

  // ── 2. Handle location guess submission ────────────────────────────────
  const handleGuessSubmit = async (e) => {
    e.preventDefault();

    if (!guessInput.trim()) {
      toast.error('Please enter a guess!');
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiService.verifyLocation(1, clue.sequenceOrder); // UserId 1

      if (response.correct) {
        // ✅ Correct guess
        toast.success(
          `🎉 Correct! +${response.pointsAwarded} points\nTotal: ${response.totalPoints}`,
          {
            duration: 3000,
            icon: '✅',
          }
        );

        setGuessInput('');

        // Check if quest is completed
        if (response.questCompleted) {
          setCompleted(true);
          toast.success(
            '🏆 Quest Complete! You are the ultimate explorer!',
            { duration: 4000 }
          );
        } else if (response.nextClue) {
          // Update with next clue
          setClue(response.nextClue);
        }
      } else {
        // ❌ Wrong guess
        toast.error('❌ Not quite right. Re-read the clue and try again!', {
          duration: 2500,
        });
      }
    } catch (error) {
      console.error('Verification failed:', error);
      toast.error(error.message || 'Failed to verify location. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading State ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          🐾
        </motion.div>
        <p className="ml-4 text-xl text-slate-300">Loading your first clue...</p>
      </div>
    );
  }

  // ── Completed State ────────────────────────────────────────────────────
  if (completed) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🏆</div>
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Quest Complete!
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            You've explored every location and earned incredible rewards!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/50"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Main Game View ────────────────────────────────────────────────────
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        
        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <MapPin size={18} />
            <span>
              Location <span className="font-bold text-cyan-400">{clue?.sequenceOrder}</span> of{' '}
              <span className="font-bold text-cyan-400">{clue?.totalLocations}</span>
            </span>
          </div>
        </motion.div>

        {/* Main HUD Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border-2 border-cyan-400/40 rounded-3xl p-8 shadow-2xl hover:border-cyan-400/60 transition-all duration-300"
        >
          
          {/* Location Header */}
          <div className="mb-8 pb-6 border-b border-cyan-400/20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-2"
            >
              <MapPin className="text-cyan-400" size={24} />
              <h2 className="text-3xl font-bold text-cyan-300">
                {clue?.locationName}
              </h2>
            </motion.div>
            <p className="text-slate-400 text-sm">Find this location to advance</p>
          </div>

          {/* Riddle/Clue Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-sm font-semibold text-cyan-300 mb-2 uppercase tracking-wider">
                  Your Clue
                </p>
                <p className="text-lg text-slate-100 leading-relaxed">
                  {clue?.riddleText}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Guess Input & Submit */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleGuessSubmit}
            className="space-y-4"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                placeholder="Guess the location..."
                disabled={submitting}
                className="flex-1 px-4 py-3 bg-slate-800/60 border border-cyan-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 focus:bg-slate-800/80 transition-all duration-200 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Zap size={20} />
                  </motion.div>
                ) : (
                  <>
                    <Send size={20} />
                    Submit
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Footer tip */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm text-slate-400 text-center"
          >
            💡 Read the clue carefully and explore the area around you.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
