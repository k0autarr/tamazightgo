import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/learning/AppLayout';
import JourneyHero from '../components/learning/JourneyHero';
import AchievementBadges from '../components/learning/AchievementBadges';
import {
  getOverallStats, getLevelStats, getWeeklyActivity,
  getNextLesson, getLastAccessedLesson, loadProgress,
  calculateXP, getAvatarStage, getXPProgress, getBadges,
} from '../services/progressService';
import { getLessonById, LESSONS } from '../data/lessons';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const [stats, setStats]         = useState(getOverallStats);
  const [levelStats, setLvlStats] = useState(getLevelStats);
  const [activity, setActivity]   = useState(getWeeklyActivity);
  const [nextId, setNextId]       = useState(getNextLesson);
  const [lastId, setLastId]       = useState(getLastAccessedLesson);
  const [xp, setXP]               = useState(calculateXP);
  const [badges, setBadges]       = useState(getBadges);

  useEffect(() => {
    setStats(getOverallStats());
    setLvlStats(getLevelStats());
    setActivity(getWeeklyActivity());
    setNextId(getNextLesson());
    setLastId(getLastAccessedLesson());
    setXP(calculateXP());
    setBadges(getBadges());
  }, []);

  const stage      = getAvatarStage(xp);
  const xpProgress = getXPProgress(xp, stage);

  const nextLesson    = nextId ? getLessonById(nextId) : null;
  const lastLesson    = lastId ? getLessonById(lastId) : null;
  const continueLesson = lastLesson ?? nextLesson;
  const progress      = loadProgress();

  return (
    <AppLayout>
      <div className="dashboard container">

        {/* ── Header ── */}
        <div className="dashboard__header">
          <div>
            <h1 className="dashboard__title">
              Azul! <em>Welcome back.</em>
            </h1>
            <p className="dashboard__subtitle">
              Continue your Tamazight journey — every word brings you closer to Amazigh Morocco.
            </p>
          </div>
        </div>

        {/* ── Avatar + Journey Path ── */}
        <JourneyHero
          xp={xp}
          stage={stage}
          xpProgress={xpProgress}
          stats={stats}
          levelStats={levelStats}
        />

        {/* ── Achievement Badges ── */}
        <AchievementBadges badges={badges} />

        {/* ── Main Grid ── */}
        <div className="dashboard__grid">

          {/* Left column */}
          <div className="dashboard__left">

            {/* Continue learning */}
            {continueLesson && (
              <div className="dashboard__continue">
                <h2 className="dashboard__section-title">
                  {progress.lessons[continueLesson.id]?.completed ? '🎯 Next Up' : '▶ Continue Learning'}
                </h2>
                <Link to={`/lessons/${continueLesson.id}`} className="dashboard__continue-card">
                  <div className="dashboard__continue-level">Level {continueLesson.level}</div>
                  <div className="dashboard__continue-title">{continueLesson.title}</div>
                  <div className="dashboard__continue-sub">{continueLesson.titleTamazight}</div>
                  <div className="dashboard__continue-meta">
                    <span>⏱ {continueLesson.duration} min</span>
                    <span>📝 {continueLesson.vocabulary.length} words</span>
                    <span>{continueLesson.difficulty}</span>
                  </div>
                  <div className="dashboard__continue-cta">
                    {progress.lessons[continueLesson.id]?.completed ? 'Review Lesson →' : 'Start Lesson →'}
                  </div>
                </Link>
              </div>
            )}

            {/* Level progress */}
            <div className="dashboard__levels">
              <h2 className="dashboard__section-title">Level Progress</h2>
              <div className="dashboard__level-list">
                {levelStats.map(lvl => (
                  <div key={lvl.level} className="dashboard__level-item">
                    <div className="dashboard__level-header">
                      <div className="dashboard__level-info">
                        <span className="dashboard__level-tifinagh" style={{ color: lvl.color }}>
                          {lvl.tifinagh}
                        </span>
                        <span className="dashboard__level-name">Lv.{lvl.level} — {lvl.name}</span>
                      </div>
                      <span className="dashboard__level-count">{lvl.completed}/{lvl.total}</span>
                    </div>
                    <div className="dashboard__level-bar">
                      <div
                        className="dashboard__level-fill"
                        style={{ width: `${lvl.percent}%`, background: lvl.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="dashboard__right">

            {/* Weekly activity chart */}
            <div className="dashboard__chart-card">
              <h2 className="dashboard__section-title">Weekly Activity</h2>
              <p className="dashboard__chart-sub">Words practiced this week</p>
              <div className="dashboard__chart-wrap">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={activity} barSize={28}>
                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#9B8B7C' }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ background: '#FDF7ED', border: '1px solid #D9C8A0', borderRadius: 8, fontSize: 13 }}
                      formatter={(v) => [`${v} words`, 'Practiced']}
                    />
                    <Bar dataKey="count" radius={[6,6,0,0]}>
                      {activity.map((entry, i) => (
                        <Cell key={i} fill={entry.count > 0 ? '#C8502A' : '#E8D5B0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lessons by level chart */}
            <div className="dashboard__chart-card">
              <h2 className="dashboard__section-title">Lessons by Level</h2>
              <div className="dashboard__chart-wrap">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={levelStats} barSize={32} layout="vertical">
                    <XAxis type="number" hide domain={[0, 'dataMax']} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#9B8B7C' }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip
                      contentStyle={{ background: '#FDF7ED', border: '1px solid #D9C8A0', borderRadius: 8, fontSize: 13 }}
                      formatter={(v, _, p: any) => [`${v}/${p.payload.total}`, 'Completed']}
                    />
                    <Bar dataKey="completed" radius={[0,4,4,0]}>
                      {levelStats.map((lvl, i) => (
                        <Cell key={i} fill={lvl.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick actions */}
            <div className="dashboard__actions">
              <Link to="/lessons" className="dashboard__action-btn dashboard__action-btn--primary">
                Browse All Lessons
              </Link>
              <Link to="/vocabulary" className="dashboard__action-btn dashboard__action-btn--ghost">
                Review Vocabulary
              </Link>
            </div>
          </div>
        </div>

        {/* ── All Lessons quick grid ── */}
        <div className="dashboard__all-lessons">
          <div className="dashboard__all-header">
            <h2 className="dashboard__section-title">All Lessons</h2>
            <Link to="/lessons" className="dashboard__view-all">View all →</Link>
          </div>
          <div className="dashboard__lessons-grid">
            {LESSONS.slice(0, 6).map(lesson => {
              const lp = progress.lessons[lesson.id];
              return (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className={`dashboard__lesson-card${lp?.completed ? ' dashboard__lesson-card--done' : ''}`}
                >
                  {lp?.completed && <div className="dashboard__lesson-badge">✓</div>}
                  <div className="dashboard__lesson-level">Level {lesson.level}</div>
                  <div className="dashboard__lesson-title">{lesson.title}</div>
                  <div className="dashboard__lesson-tifinagh">{lesson.titleTifinagh}</div>
                  <div className="dashboard__lesson-meta">{lesson.duration}min · {lesson.vocabulary.length} words</div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
