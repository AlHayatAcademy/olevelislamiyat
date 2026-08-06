'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/lib/badge-service';

interface AchievementUnlockedProps {
  badge: Badge;
  isVisible?: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
}

export function AchievementUnlocked({
  badge,
  isVisible = true,
  onClose,
  autoHideDuration = 5000,
}: AchievementUnlockedProps) {
  const [show, setShow] = useState(isVisible);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDuration, onClose]);

  if (!show) return null;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-500';
      case 'rare':
        return 'from-blue-400 to-blue-500';
      case 'epic':
        return 'from-purple-400 to-purple-500';
      case 'legendary':
        return 'from-yellow-400 to-yellow-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999]">
      <style>{`
        @keyframes pop-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-out {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(30px);
          }
        }

        .achievement-container {
          animation: ${isAnimating ? 'pop-in 0.6s ease-out' : 'fade-out 0.6s ease-in forwards'};
        }

        .badge-icon {
          animation: bounce 0.8s ease-in-out infinite;
        }
      `}</style>

      <div className="achievement-container flex flex-col items-center gap-4 pointer-events-auto">
        {/* Confetti Background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: [
                  '#fbbf24',
                  '#60a5fa',
                  '#a78bfa',
                  '#34d399',
                  '#fb7185',
                ][i % 5],
                animation: `bounce ${1 + Math.random() * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Main Card */}
        <div
          className={`bg-gradient-to-br ${getRarityColor(badge.rarity)} rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 relative`}
        >
          <div className="text-center">
            {/* Achievement Label */}
            <div className="text-white text-sm font-bold uppercase tracking-widest mb-3 opacity-90">
              🎉 Achievement Unlocked!
            </div>

            {/* Badge Icon */}
            <div className="badge-icon text-7xl mb-4 inline-block">
              {badge.icon}
            </div>

            {/* Badge Name */}
            <h2 className="text-2xl font-bold text-white mb-2">
              {badge.name}
            </h2>

            {/* Badge Description */}
            <p className="text-white text-sm mb-4 opacity-95">
              {badge.description}
            </p>

            {/* Rarity Badge */}
            <div className="inline-block">
              <span
                className={`px-4 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm ${
                  badge.rarity === 'legendary'
                    ? 'bg-yellow-500/60'
                    : badge.rarity === 'epic'
                      ? 'bg-purple-600/60'
                      : badge.rarity === 'rare'
                        ? 'bg-blue-600/60'
                        : 'bg-gray-600/60'
                }`}
              >
                {badge.rarity.toUpperCase()}
              </span>
            </div>

            {/* Badge Details */}
            {Object.keys(badge.metadata).length > 0 && (
              <div className="mt-4 text-xs text-white/80 space-y-1">
                {Object.entries(badge.metadata).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-semibold capitalize">{key}:</span>{' '}
                    {String(value)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            setShow(false);
            onClose?.();
          }}
          className="pointer-events-auto px-6 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium shadow-lg"
        >
          Awesome! 🎊
        </button>
      </div>
    </div>
  );
}
