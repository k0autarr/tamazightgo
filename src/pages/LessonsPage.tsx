import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/learning/AppLayout';
import { LESSONS, LEVELS, getLessonsByLevel } from '../data/lessons';
import { loadProgress, getLevelStats } from '../services/progressService';
import './LessonsPage.css';

const DIFF_LABELS: Record<string, string> = { beginner: 'Beginner', elementary: 'Elementary', intermediate: 'Intermediate' };

const LessonsPage: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<number | 'all'>('all');
  const progress = loadProgress();
  const levelStats = getLevelStats();

  const displayLessons = activeLevel === 'all'
    ? LESSONS
    : getLessonsByLevel(activeLevel as number);

  return (
    <AppLayout>
      <div className="lessons-page container">

        {/* Header */}
        <div className="lessons-page__header reveal">
          <div>
            <h1 className="lessons-page__title">
              All Lessons <em>— {LESSONS.length} total</em>
            </h1>
            <p className="lessons-page__subtitle">
              Five levels of structured Tamazight learning, from first greetings to cultural fluency.
            </p>
          </div>
        </div>

        {/* Level tabs */}
        <div className="lessons-page__tabs">
          <button
            className={`lessons-page__tab${activeLevel === 'all' ? ' lessons-page__tab--active' : ''}`}
            onClick={() => setActiveLevel('all')}
          >
            All Levels
          </button>
          {LEVELS.map(lvl => {
            const ls = levelStats.find(s => s.level === lvl.level);
            return (
              <button
                key={lvl.level}
                className={`lessons-page__tab${activeLevel === lvl.level ? ' lessons-page__tab--active' : ''}`}
                style={activeLevel === lvl.level ? { borderColor: lvl.color, color: lvl.color } : undefined}
                onClick={() => setActiveLevel(lvl.level)}
              >
                <span className="lessons-page__tab-tifinagh">{lvl.tifinagh}</span>
                Lv.{lvl.level} {lvl.name}
                {ls && ls.completed > 0 && (
                  <span className="lessons-page__tab-badge" style={{ background: lvl.color }}>
                    {ls.completed}/{ls.total}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Level summary strip (when a level is selected) */}
        {activeLevel !== 'all' && (() => {
          const lvl = LEVELS.find(l => l.level === activeLevel)!;
          const ls = levelStats.find(s => s.level === activeLevel)!;
          return (
            <div className="lessons-page__level-banner" style={{ borderColor: lvl.color }}>
              <div>
                <div className="lessons-page__level-banner-tifinagh" style={{ color: lvl.color }}>{lvl.tifinagh}</div>
                <div className="lessons-page__level-banner-name">Level {lvl.level} — {lvl.name} ({lvl.nameAmazigh})</div>
                <div className="lessons-page__level-banner-desc">{lvl.description}</div>
              </div>
              <div className="lessons-page__level-banner-progress">
                <div className="lessons-page__level-banner-pct" style={{ color: lvl.color }}>{ls.percent}%</div>
                <div className="lessons-page__level-banner-sub">{ls.completed} of {ls.total} done</div>
                <div className="lessons-page__level-banner-bar">
                  <div className="lessons-page__level-banner-fill" style={{ width: `${ls.percent}%`, background: lvl.color }} />
                </div>
              </div>
            </div>
          );
        })()}

        {/* Lessons grid */}
        <div className="lessons-page__grid">
          {displayLessons.map((lesson, i) => {
            const lp = progress.lessons[lesson.id];
            const lvlData = LEVELS.find(l => l.level === lesson.level)!;
            const isLocked = lesson.level > 1 && !LESSONS.filter(l => l.level === lesson.level - 1).every(l => progress.lessons[l.id]?.completed);

            return (
              <Link
                key={lesson.id}
                to={isLocked ? '#' : `/lessons/${lesson.id}`}
                className={`lesson-card${lp?.completed ? ' lesson-card--done' : ''}${isLocked ? ' lesson-card--locked' : ''}`}
                onClick={e => isLocked && e.preventDefault()}
              >
                {/* Top accent */}
                <div className="lesson-card__accent" style={{ background: lvlData.color }} />

                {/* Status badge */}
                {lp?.completed && <div className="lesson-card__check">✓ Complete</div>}
                {isLocked && <div className="lesson-card__lock">🔒 Locked</div>}

                <div className="lesson-card__level" style={{ color: lvlData.color }}>
                  Level {lesson.level} · {lesson.category}
                </div>

                <div className="lesson-card__tifinagh">{lesson.titleTifinagh}</div>
                <h3 className="lesson-card__title">{lesson.title}</h3>
                <p className="lesson-card__amazigh">{lesson.titleTamazight}</p>
                <p className="lesson-card__desc">{lesson.description}</p>

                <div className="lesson-card__meta">
                  <span className={`lesson-card__diff lesson-card__diff--${lesson.difficulty}`}>
                    {DIFF_LABELS[lesson.difficulty]}
                  </span>
                  <span>⏱ {lesson.duration}min</span>
                  <span>🔤 {lesson.vocabulary.length} words</span>
                  <span>💬 {lesson.dialogue.length} lines</span>
                </div>

                <div className="lesson-card__cta">
                  {isLocked ? 'Complete previous level' : lp?.completed ? 'Review →' : 'Start lesson →'}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default LessonsPage;
