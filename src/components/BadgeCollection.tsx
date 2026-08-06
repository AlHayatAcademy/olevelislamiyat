'use client';

import { useState } from 'react';
import { Badge, Rarity } from '@/lib/badge-service';

interface BadgeCollectionProps {
  badges: Badge[];
  isLoading?: boolean;
  onBadgeClick?: (badge: Badge) => void;
}

const RARITY_COLORS = {
  common: 'from-gray-400 to-gray-500',
  rare: 'from-blue-400 to-blue-500',
  epic: 'from-purple-400 to-purple-500',
  legendary: 'from-yellow-400 to-yellow-500',
};

const RARITY_LABELS = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

export function BadgeCollection({
  badges,
  isLoading = false,
  onBadgeClick,
}: BadgeCollectionProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [sortBy, setSortBy] = useState<'earned' | 'rarity' | 'type'>(
    'earned'
  );
  const [filterRarity, setFilterRarity] = useState<Rarity | 'all'>('all');

  // Sort badges
  const sortedBadges = [...badges].sort((a, b) => {
    switch (sortBy) {
      case 'earned':
        return (
          b.awardedDate.toDate?.()?.getTime() -
          a.awardedDate.toDate?.()?.getTime()
        );
      case 'rarity':
        const rarityOrder = { common: 0, rare: 1, epic: 2, legendary: 3 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      case 'type':
        return a.badgeType.localeCompare(b.badgeType);
      default:
        return 0;
    }
  });

  // Filter badges
  const filteredBadges =
    filterRarity === 'all'
      ? sortedBadges
      : sortedBadges.filter((b) => b.rarity === filterRarity);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (badges.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          No badges earned yet. Keep studying to unlock achievements! 🎯
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {badges.length}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide mt-1">
            Total Badges
          </p>
        </div>

        {(['common', 'rare', 'epic', 'legendary'] as const).map((rarity) => {
          const count = badges.filter((b) => b.rarity === rarity).length;
          return (
            <div
              key={rarity}
              className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700"
            >
              <div className="text-2xl font-bold">
                {rarity === 'common' && '🟤'}
                {rarity === 'rare' && '🔵'}
                {rarity === 'epic' && '🟣'}
                {rarity === 'legendary' && '🟡'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide mt-1">
                {RARITY_LABELS[rarity]}
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1">
                {count}
              </p>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg text-sm"
          >
            <option value="earned">Recently Earned</option>
            <option value="rarity">Rarity</option>
            <option value="type">Badge Type</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
            Filter by rarity
          </label>
          <select
            value={filterRarity}
            onChange={(e) => setFilterRarity(e.target.value as any)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg text-sm"
          >
            <option value="all">All Rarities</option>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
          </select>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            onClick={() => {
              setSelectedBadge(badge);
              onBadgeClick?.(badge);
            }}
            className="cursor-pointer group"
          >
            <div
              className={`bg-gradient-to-br ${RARITY_COLORS[badge.rarity]} rounded-lg p-4 text-center transition-transform group-hover:scale-110 group-hover:shadow-lg`}
            >
              <div className="text-5xl mb-2">{badge.icon}</div>
              <p className="text-white text-xs font-bold line-clamp-2">
                {badge.name}
              </p>
            </div>

            {/* Tooltip on hover */}
            <div className="hidden group-hover:block absolute bg-slate-900 dark:bg-slate-800 text-white text-xs rounded p-2 mt-1 z-10 w-32 shadow-lg">
              <p className="font-bold mb-1">{badge.name}</p>
              <p className="text-slate-200">{badge.description}</p>
              <p className="text-slate-400 text-xs mt-1">
                {RARITY_LABELS[badge.rarity]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">{selectedBadge.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {selectedBadge.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {selectedBadge.description}
              </p>

              <div className="flex justify-center gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${
                    RARITY_COLORS[selectedBadge.rarity]
                  }`}
                >
                  {RARITY_LABELS[selectedBadge.rarity]}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold capitalize">
                  {selectedBadge.badgeType}
                </span>
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Earned on{' '}
                <strong>
                  {selectedBadge.awardedDate
                    .toDate?.()
                    ?.toLocaleDateString()}
                </strong>
              </div>

              {Object.keys(selectedBadge.metadata).length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-700 rounded p-3 text-sm mb-4">
                  <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Details
                  </p>
                  {Object.entries(selectedBadge.metadata).map(
                    ([key, value]) => (
                      <p
                        key={key}
                        className="text-slate-600 dark:text-slate-400"
                      >
                        <span className="capitalize">{key}:</span> {String(value)}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
