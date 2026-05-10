import React, { useState } from 'react';
import { Badge } from '../../services/progressService';
import './AchievementBadges.css';

interface AchievementBadgesProps {
  badges: Badge[];
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ badges }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="badges-strip">
      <div className="badges-strip__header">
        <div>
          <h2 className="badges-strip__title">Achievements</h2>
          <p className="badges-strip__sub">Unlock badges as you progress through your Tamazight journey.</p>
        </div>
        <div className="badges-strip__counter">
          <span className="badges-strip__counter-num">{unlockedCount}</span>
          <span className="badges-strip__counter-total">/ {badges.length}</span>
          <span className="badges-strip__counter-label">unlocked</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="badges-strip__progress-bar">
        <div
          className="badges-strip__progress-fill"
          style={{ width: `${badges.length ? (unlockedCount / badges.length) * 100 : 0}%` }}
        />
      </div>

      <div className="badges-strip__grid">
        {badges.map(badge => (
          <div
            key={badge.id}
            className={`badge-item${badge.unlocked ? ' badge-item--unlocked' : ' badge-item--locked'}`}
            onMouseEnter={() => setHovered(badge.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Tooltip */}
            {hovered === badge.id && (
              <div className="badge-item__tooltip">
                <strong>{badge.name}</strong>
                <span>{badge.desc}</span>
              </div>
            )}

            {/* Icon circle */}
            <div className="badge-item__circle">
              {badge.unlocked && <div className="badge-item__glow" />}
              <span className="badge-item__icon">{badge.icon}</span>
              {!badge.unlocked && (
                <div className="badge-item__lock-overlay">
                  <span>🔒</span>
                </div>
              )}
            </div>

            <span className="badge-item__name">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;
