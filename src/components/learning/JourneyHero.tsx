import React from 'react';
import { AvatarStageDefinition, AVATAR_STAGES } from '../../services/progressService';
import './JourneyHero.css';

// Cultural theme per level — icons, Tifinagh, topics
const LEVEL_THEMES: Record<number, {
  icon: string;
  tifinagh: string;
  theme: string;
  topics: readonly string[];
}> = {
  1: {
    icon: '🏕️',
    tifinagh: 'ⵙ',
    theme: 'Amazigh Village — First Steps',
    topics: ['Greetings', 'Introductions', 'Yes & No', 'Basic replies'] as const,
  },
  2: {
    icon: '🏡',
    tifinagh: 'ⵏ',
    theme: 'The Family Home — Bonds & Names',
    topics: ['Mother', 'Father', 'Siblings', 'Extended family'] as const,
  },
  3: {
    icon: '🪴',
    tifinagh: 'ⵎ',
    theme: 'The Souk — Daily Life',
    topics: ['Food', 'Market', 'House', 'School', 'Work'] as const,
  },
  4: {
    icon: '☀️',
    tifinagh: 'ⴰ',
    theme: 'Sky & Calendar — Numbers & Time',
    topics: ['Numbers', 'Days', 'Months', 'Time expressions'] as const,
  },
  5: {
    icon: '🏔️',
    tifinagh: 'ⵜ',
    theme: 'Atlas Summit — Culture & Fluency',
    topics: ['Amazigh culture', 'Market talk', 'Family dialogue', 'Visiting customs'] as const,
  },
};

interface LevelStat {
  level: number;
  name: string;
  nameAmazigh: string;
  tifinagh: string;
  color: string;
  total: number;
  completed: number;
  percent: number;
}

interface OverallStats {
  completedLessons: number;
  totalLessons: number;
  overallPercent: number;
  vocabLearned: number;
  totalVocab: number;
  streakDays: number;
}

interface JourneyHeroProps {
  xp: number;
  stage: AvatarStageDefinition;
  xpProgress: { current: number; needed: number; pct: number };
  stats: OverallStats;
  levelStats: LevelStat[];
}

const JourneyHero: React.FC<JourneyHeroProps> = ({ xp, stage, xpProgress, stats, levelStats }) => {
  const nextStage = AVATAR_STAGES.find(s => s.stage === stage.stage + 1);
  const allComplete = levelStats.every(l => l.percent === 100);

  let foundActive = false;
  const enriched = levelStats.map(lvl => {
    if (lvl.percent === 100) return { ...lvl, status: 'completed' as const };
    if (!foundActive) { foundActive = true; return { ...lvl, status: 'active' as const }; }
    return { ...lvl, status: 'locked' as const };
  });

  return (
    <div className="jhero">

      {/* ── Avatar Column ── */}
      <div className="jhero__avatar-col" style={{ background: stage.bgGradient }}>

        {/* Floating Tifinagh BG symbols */}
        <div className="jhero__bg-chars" aria-hidden="true">
          {['ⵣ', 'ⴰ', 'ⵎ', 'ⵙ', 'ⵜ', 'ⵏ', 'ⵔ'].map((c, i) => (
            <span key={i} className={`jhero__bg-char jhero__bg-char--${i + 1}`}>{c}</span>
          ))}
        </div>
        <div className="jhero__geo" aria-hidden="true" />

        {/* Avatar ring + circle */}
        <div className="jhero__avatar-wrap">
          <div
            className="jhero__ring-glow"
            style={{ boxShadow: `0 0 0 10px ${stage.color}1A, 0 0 0 20px ${stage.color}0D` }}
          />
          <div className="jhero__ring-spin" style={{ borderColor: `${stage.color}40` }} />
          <div
            className="jhero__circle"
            style={{
              borderColor: `${stage.color}CC`,
              boxShadow: `0 0 40px ${stage.color}55, inset 0 0 30px rgba(0,0,0,0.35)`,
            }}
          >
            <div className="jhero__circle-pattern" aria-hidden="true" />
            <span
              className="jhero__char"
              style={{ textShadow: `0 0 20px ${stage.color}, 0 0 50px ${stage.color}88` }}
            >
              {stage.tifinagh}
            </span>
          </div>
        </div>

        {/* Stage progress dots */}
        <div className="jhero__dots">
          {AVATAR_STAGES.map(s => (
            <div
              key={s.stage}
              title={s.name}
              className={`jhero__dot${
                s.stage === stage.stage ? ' jhero__dot--active'
                : s.stage < stage.stage ? ' jhero__dot--done' : ''
              }`}
              style={s.stage <= stage.stage ? { background: s.color, borderColor: s.color } : {}}
            />
          ))}
        </div>

        <div className="jhero__stage-label">STAGE {stage.stage} OF {AVATAR_STAGES.length}</div>
        <h2 className="jhero__stage-name">{stage.name}</h2>
        <p className="jhero__stage-amazigh">{stage.nameAmazigh}</p>

        {/* XP bar */}
        <div className="jhero__xp">
          <div className="jhero__xp-row">
            <span className="jhero__xp-key">XP Progress</span>
            <span className="jhero__xp-val">
              {stage.maxXP === null
                ? `${xp} XP · Max Stage!`
                : `${xpProgress.current} / ${xpProgress.needed}`}
            </span>
          </div>
          <div className="jhero__xp-track">
            <div
              className="jhero__xp-fill"
              style={{
                width: `${xpProgress.pct}%`,
                background: `linear-gradient(90deg, ${stage.color}, ${stage.color}CC)`,
                boxShadow: `0 0 10px ${stage.color}AA`,
              }}
            />
          </div>
          {stage.maxXP !== null && nextStage && (
            <p className="jhero__xp-hint">
              {xpProgress.needed - xpProgress.current} XP until {nextStage.name}
            </p>
          )}
        </div>

        {/* Mini stats */}
        <div className="jhero__mini-stats">
          {([
            { v: `${stats.completedLessons}/${stats.totalLessons}`, l: 'Lessons' },
            { v: String(stats.vocabLearned), l: 'Words' },
            { v: `${stats.streakDays}🔥`, l: 'Streak' },
            { v: `${stats.overallPercent}%`, l: 'Overall' },
          ] as const).map((s, i, arr) => (
            <React.Fragment key={s.l}>
              <div className="jhero__mini-stat">
                <span className="jhero__mini-val">{s.v}</span>
                <span className="jhero__mini-lbl">{s.l}</span>
              </div>
              {i < arr.length - 1 && <div className="jhero__mini-sep" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Journey Path Column ── */}
      <div className="jhero__path-col">

        <div className="jhero__path-header">
          <span className="jhero__path-aza" aria-hidden="true">ⵣ</span>
          <div>
            <h2 className="jhero__path-title">Your Amazigh Journey</h2>
            <p className="jhero__path-sub">
              From first words to cultural fluency — one milestone at a time.
            </p>
          </div>
        </div>

        {/* Tifinagh decorative strip */}
        <div className="jhero__path-pattern" aria-hidden="true">
          {['ⵙ', 'ⵣ', 'ⵎ', 'ⴰ', 'ⵜ', 'ⵏ', 'ⵔ', 'ⴱ'].map((c, i) => <span key={i}>{c}</span>)}
        </div>

        {/* Amazigh pattern texture overlay on path col */}
        <div
          className="jhero__path-texture"
          style={{ backgroundImage: "url('/assets/amazigh-pattern.png')" }}
          aria-hidden="true"
        />

        <div className="jhero__milestones">
          {enriched.map((lvl, i) => {
            const isLast     = i === enriched.length - 1;
            const isDone     = lvl.status === 'completed';
            const isActive   = lvl.status === 'active';
            const isLocked   = lvl.status === 'locked';
            const theme      = LEVEL_THEMES[lvl.level];
            // Alternate indent: even items (0,2,4) flush, odd items (1,3) indented
            const indent     = i % 2 === 1;
            const nextColor  = enriched[i + 1]?.color ?? lvl.color;

            return (
              <div
                key={lvl.level}
                className={`jhero__ms jhero__ms--${lvl.status}${indent ? ' jhero__ms--indent' : ''}`}
              >
                {/* ── Left: icon pill + node + connector ── */}
                <div className="jhero__ms-left">

                  {/* Cultural icon pill floating above the node */}
                  <div className={`jhero__ms-icon-pill jhero__ms-icon-pill--${lvl.status}`}>
                    <span className="jhero__ms-icon-emoji" aria-hidden="true">{theme.icon}</span>
                    <span
                      className="jhero__ms-icon-tifi"
                      style={isDone || isActive ? { color: lvl.color } : {}}
                      aria-hidden="true"
                    >
                      {theme.tifinagh}
                    </span>
                  </div>

                  {/* Main circular node */}
                  <div
                    className={`jhero__ms-node jhero__ms-node--${lvl.status}`}
                    style={
                      isDone ? {
                        background: lvl.color,
                        borderColor: lvl.color,
                        boxShadow: `0 0 0 5px ${lvl.color}1E, 0 4px 18px ${lvl.color}50`,
                      } : isActive ? {
                        borderColor: lvl.color,
                        boxShadow: `0 0 0 7px ${lvl.color}18, 0 4px 20px ${lvl.color}30`,
                        color: lvl.color,
                      } : {}
                    }
                    aria-label={`Level ${lvl.level}: ${lvl.status}`}
                  >
                    {isDone && (
                      <span className="jhero__ms-checkmark" aria-label="Completed">✓</span>
                    )}
                    {isActive && (
                      <>
                        {/* Avatar Tifinagh character placed on the active node */}
                        <span
                          className="jhero__ms-avatar-char"
                          style={{ color: lvl.color }}
                          aria-label={`Your avatar: ${stage.name}`}
                        >
                          {stage.tifinagh}
                        </span>
                        {/* Pulsing ring */}
                        <div
                          className="jhero__ms-pulse"
                          style={{ boxShadow: `0 0 0 8px ${lvl.color}18, 0 0 0 16px ${lvl.color}0C` }}
                          aria-hidden="true"
                        />
                      </>
                    )}
                    {isLocked && (
                      <span className="jhero__ms-padlock" aria-label="Locked">🔒</span>
                    )}
                  </div>

                  {/* YOU badge under active node */}
                  {isActive && (
                    <div className="jhero__you" style={{ background: stage.color }} aria-hidden="true">
                      YOU
                    </div>
                  )}

                  {/* Connector line to next milestone */}
                  {!isLast && (
                    <div
                      className={`jhero__ms-line jhero__ms-line--${isDone ? 'done' : 'locked'}`}
                      style={isDone ? {
                        background: `linear-gradient(to bottom, ${lvl.color}CC, ${nextColor}44)`,
                      } : {}}
                    />
                  )}
                </div>

                {/* ── Right: content body ── */}
                <div className="jhero__ms-body">
                  {/* Level chip + status label */}
                  <div className="jhero__ms-head">
                    <span
                      className="jhero__ms-lv"
                      style={isDone || isActive ? { background: lvl.color, color: '#fff' } : {}}
                    >
                      Lv.{lvl.level}
                    </span>
                    <span className={`jhero__ms-status jhero__ms-status--${lvl.status}`}>
                      {isDone   ? '✓ Complete'    : null}
                      {isActive ? '→ In Progress' : null}
                      {isLocked ? '🔒 Locked'     : null}
                    </span>
                  </div>

                  {/* Level name */}
                  <div className="jhero__ms-row">
                    <div>
                      <div className={`jhero__ms-name${isLocked ? ' jhero__ms-name--locked' : ''}`}>
                        {lvl.name}
                      </div>
                      <div className="jhero__ms-sub">{lvl.nameAmazigh} · {lvl.tifinagh}</div>
                    </div>
                  </div>

                  {/* Cultural theme label */}
                  <div className="jhero__ms-theme">{theme.theme}</div>

                  {/* Topic tags — shown for active + completed */}
                  {!isLocked && (
                    <div className="jhero__ms-topics" aria-label="Topics covered">
                      {theme.topics.map(t => (
                        <span
                          key={t}
                          className="jhero__ms-topic"
                          style={{
                            borderColor: `${lvl.color}50`,
                            color: isDone ? lvl.color : 'var(--medium)',
                            background: isDone ? `${lvl.color}0C` : 'transparent',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Lesson progress bar */}
                  {!isLocked && (
                    <div className="jhero__ms-progress">
                      <div className="jhero__ms-bar">
                        <div
                          className="jhero__ms-fill"
                          style={{ width: `${lvl.percent}%`, background: lvl.color }}
                        />
                      </div>
                      <span className="jhero__ms-count">{lvl.completed}/{lvl.total}</span>
                    </div>
                  )}

                  {isLocked && (
                    <div className="jhero__ms-locked-hint">
                      Complete the previous level to unlock
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* ── Summit / Final Reward ── */}
          <div className={`jhero__summit${allComplete ? ' jhero__summit--done' : ''}`}>
            <div
              className="jhero__summit-node"
              style={allComplete ? { background: 'linear-gradient(135deg, #C8920A, #D4A017)', borderColor: '#D4A017' } : {}}
            >
              <span className="jhero__summit-icon" aria-hidden="true">
                {allComplete ? '🏆' : '⭐'}
              </span>
            </div>
            <div className="jhero__summit-content">
              <div className="jhero__summit-title">
                {allComplete ? 'Tamazight Speaker — Achieved!' : 'Atlas Summit — Final Goal'}
              </div>
              <div className="jhero__summit-sub">
                {allComplete
                  ? 'Tanemmirt! You completed the full Tamazight journey.'
                  : 'Complete all levels to claim your final achievement badge.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyHero;
