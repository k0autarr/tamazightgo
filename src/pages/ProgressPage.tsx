import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/learning/AppLayout';
import {
  getOverallStats, getLevelStats, getWeeklyActivity, loadProgress,
} from '../services/progressService';
import { LESSONS } from '../data/lessons';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Cell as PieCell,
} from 'recharts';
import './ProgressPage.css';

const ProgressPage: React.FC = () => {
  const stats = getOverallStats();
  const levelStats = getLevelStats();
  const activity = getWeeklyActivity();
  const progress = loadProgress();

  const completedLessons = LESSONS.filter(l => progress.lessons[l.id]?.completed);

  const pieData = [
    { name: 'Completed', value: stats.completedLessons, color: '#C8502A' },
    { name: 'Remaining', value: stats.totalLessons - stats.completedLessons, color: '#E8D5B0' },
  ];

  const vocabPie = [
    { name: 'Learned', value: stats.vocabLearned, color: '#1D5E40' },
    { name: 'Remaining', value: stats.totalVocab - stats.vocabLearned, color: '#E8D5B0' },
  ];

  return (
    <AppLayout>
      <div className="progress-page container">

        {/* Header */}
        <div className="progress-page__header">
          <div>
            <h1 className="progress-page__title">
              Your Progress <em>— ⵣ Tamazight Journey</em>
            </h1>
            <p className="progress-page__subtitle">
              Every word learned is a step deeper into Amazigh culture. Keep going.
            </p>
          </div>
          {stats.streakDays > 0 && (
            <div className="progress-page__streak">
              <span>🔥</span>
              <span className="progress-page__streak-num">{stats.streakDays}</span>
              <span>day streak</span>
            </div>
          )}
        </div>

        {/* Top stats */}
        <div className="progress-page__top-stats">
          {[
            { label: 'Lessons Completed', value: stats.completedLessons, total: stats.totalLessons, pct: stats.overallPercent, color: '#C8502A' },
            { label: 'Words Learned', value: stats.vocabLearned, total: stats.totalVocab, pct: Math.round((stats.vocabLearned / Math.max(stats.totalVocab,1))*100), color: '#1D5E40' },
            { label: 'Overall Progress', value: `${stats.overallPercent}%`, total: null, pct: stats.overallPercent, color: '#C8920A' },
            { label: 'Day Streak', value: stats.streakDays, total: null, pct: Math.min(stats.streakDays * 10, 100), color: '#1E3D72' },
          ].map(s => (
            <div key={s.label} className="progress-page__top-stat">
              <div className="progress-page__top-stat-value">{s.value}</div>
              {s.total !== null && <div className="progress-page__top-stat-of">of {s.total}</div>}
              <div className="progress-page__top-stat-label">{s.label}</div>
              <div className="progress-page__top-stat-bar">
                <div className="progress-page__top-stat-fill" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="progress-page__charts">

          {/* Weekly activity */}
          <div className="progress-page__chart-card progress-page__chart-card--wide">
            <h2 className="progress-page__chart-title">Weekly Learning Activity</h2>
            <p className="progress-page__chart-sub">Words practiced each day this week</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activity} barSize={36}>
                <XAxis dataKey="label" tick={{ fontSize: 13, fill: '#9B8B7C' }} axisLine={false} tickLine={false} />
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

          {/* Lessons pie */}
          <div className="progress-page__chart-card">
            <h2 className="progress-page__chart-title">Lessons</h2>
            <div className="progress-page__pie-wrap">
              <PieChart width={160} height={160}>
                <Pie data={pieData} cx={75} cy={75} innerRadius={48} outerRadius={72} dataKey="value" startAngle={90} endAngle={-270}>
                  {pieData.map((entry, i) => <PieCell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
              <div className="progress-page__pie-center">
                <span className="progress-page__pie-pct">{stats.overallPercent}%</span>
                <span className="progress-page__pie-label">done</span>
              </div>
            </div>
            <div className="progress-page__pie-legend">
              {pieData.map(d => (
                <div key={d.name} className="progress-page__pie-legend-item">
                  <span className="progress-page__pie-dot" style={{ background: d.color }} />
                  {d.name}: {d.value}
                </div>
              ))}
            </div>
          </div>

          {/* Vocab pie */}
          <div className="progress-page__chart-card">
            <h2 className="progress-page__chart-title">Vocabulary</h2>
            <div className="progress-page__pie-wrap">
              <PieChart width={160} height={160}>
                <Pie data={vocabPie} cx={75} cy={75} innerRadius={48} outerRadius={72} dataKey="value" startAngle={90} endAngle={-270}>
                  {vocabPie.map((entry, i) => <PieCell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
              <div className="progress-page__pie-center">
                <span className="progress-page__pie-pct" style={{ color: '#1D5E40' }}>
                  {stats.totalVocab > 0 ? Math.round((stats.vocabLearned / stats.totalVocab) * 100) : 0}%
                </span>
                <span className="progress-page__pie-label">learned</span>
              </div>
            </div>
            <div className="progress-page__pie-legend">
              {vocabPie.map(d => (
                <div key={d.name} className="progress-page__pie-legend-item">
                  <span className="progress-page__pie-dot" style={{ background: d.color }} />
                  {d.name}: {d.value}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Level breakdown */}
        <div className="progress-page__levels-card">
          <h2 className="progress-page__section-title">Level Breakdown</h2>
          <div className="progress-page__level-chart">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={levelStats} barSize={48}>
                <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#9B8B7C' }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 'dataMax']} />
                <Tooltip
                  contentStyle={{ background: '#FDF7ED', border: '1px solid #D9C8A0', borderRadius: 8, fontSize: 13 }}
                  formatter={(v, _, p: any) => [`${v}/${p.payload.total} lessons`, p.payload.name]}
                />
                <Bar dataKey="completed" radius={[6,6,0,0]}>
                  {levelStats.map((lvl, i) => (
                    <Cell key={i} fill={lvl.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="progress-page__level-rows">
            {levelStats.map(lvl => (
              <div key={lvl.level} className="progress-page__level-row">
                <div className="progress-page__level-label">
                  <span className="progress-page__level-tifinagh" style={{ color: lvl.color }}>{lvl.tifinagh}</span>
                  <span>Lv.{lvl.level} — {lvl.name} ({lvl.nameAmazigh})</span>
                </div>
                <div className="progress-page__level-bar-wrap">
                  <div className="progress-page__level-bar">
                    <div className="progress-page__level-fill" style={{ width: `${lvl.percent}%`, background: lvl.color }} />
                  </div>
                  <span className="progress-page__level-pct">{lvl.completed}/{lvl.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed lessons */}
        {completedLessons.length > 0 && (
          <div className="progress-page__done-card">
            <h2 className="progress-page__section-title">Completed Lessons ✓</h2>
            <div className="progress-page__done-grid">
              {completedLessons.map(lesson => (
                <Link key={lesson.id} to={`/lessons/${lesson.id}`} className="progress-page__done-item">
                  <span className="progress-page__done-check">✓</span>
                  <div>
                    <div className="progress-page__done-title">{lesson.title}</div>
                    <div className="progress-page__done-meta">Level {lesson.level} · {lesson.titleTamazight}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="progress-page__cta">
          <div className="progress-page__cta-text">
            <div className="progress-page__cta-tifinagh" aria-hidden="true">ⵣ</div>
            <h2>Keep your momentum going.</h2>
            <p>Every lesson completed brings you closer to speaking Tamazight with confidence.</p>
          </div>
          <Link to="/lessons" className="progress-page__cta-btn">Continue Learning →</Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProgressPage;
