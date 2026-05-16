import React from 'react';
import { AvatarStageDefinition, AVATAR_STAGES } from '../../services/progressService';
import './JourneyHero.css';

const LEVEL_THEMES: Record<number, {
  icon: string; tifinagh: string; theme: string; topics: readonly string[];
}> = {
  1: { icon: '🏕️', tifinagh: 'ⵙ', theme: 'Amazigh Village — First Steps',       topics: ['Greetings', 'Introductions', 'Yes & No', 'Basic replies'] },
  2: { icon: '🏡', tifinagh: 'ⵏ', theme: 'The Family Home — Bonds & Names',      topics: ['Mother', 'Father', 'Siblings', 'Extended family'] },
  3: { icon: '🪴', tifinagh: 'ⵎ', theme: 'The Souk — Daily Life',                topics: ['Food', 'Market', 'House', 'School', 'Work'] },
  4: { icon: '☀️', tifinagh: 'ⴰ', theme: 'Sky & Calendar — Numbers & Time',      topics: ['Numbers', 'Days', 'Months', 'Time expressions'] },
  5: { icon: '🏔️', tifinagh: 'ⵜ', theme: 'Atlas Summit — Culture & Fluency',    topics: ['Amazigh culture', 'Market talk', 'Family dialogue', 'Visiting customs'] },
};

interface LevelStat {
  level: number; name: string; nameAmazigh: string; tifinagh: string;
  color: string; total: number; completed: number; percent: number;
}
interface OverallStats {
  completedLessons: number; totalLessons: number; overallPercent: number;
  vocabLearned: number; totalVocab: number; streakDays: number;
}
interface JourneyHeroProps {
  xp: number;
  stage: AvatarStageDefinition;
  xpProgress: { current: number; needed: number; pct: number };
  stats: OverallStats;
  levelStats: LevelStat[];
}

// ── SVG winding path layout (viewBox 0 0 420 660) ──
// Level 1 at BOTTOM, Summit at TOP — a climbing journey up the Atlas.
// Nodes alternate right / left / right...
const NODE_POS = [
  { cx: 308, cy: 592 }, // L1 — right
  { cx: 112, cy: 472 }, // L2 — left
  { cx: 308, cy: 352 }, // L3 — right
  { cx: 112, cy: 232 }, // L4 — left
  { cx: 308, cy: 112 }, // L5 — right
  { cx: 210, cy: 28  }, // Summit — center
] as const;

// Smooth S-curve bezier segments connecting consecutive nodes
const PATH_SEGS = [
  'M308,592 C308,532 112,532 112,472',
  'M112,472 C112,412 308,412 308,352',
  'M308,352 C308,292 112,292 112,232',
  'M112,232 C112,172 308,172 308,112',
  'M308,112 C308,68  210,52  210,28',
] as const;

// ── Amazigh woman avatar (inline SVG) ────────────────────────────────────────
const AmazighWomanSVG: React.FC<{ accentColor: string; size?: number }> = ({
  accentColor, size = 96,
}) => (
  <svg
    width={size}
    height={size * 1.2}
    viewBox="0 0 80 96"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* ── Headdress crown arc ── */}
    <path d="M20,34 Q40,12 60,34" stroke="#C8920A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {/* Crown gems */}
    <circle cx="40" cy="17" r="3.5"  fill="#C8920A"/>
    <circle cx="29" cy="23" r="2.2"  fill={accentColor}/>
    <circle cx="51" cy="23" r="2.2"  fill={accentColor}/>
    {/* Side dangling ornaments */}
    <line   x1="22" y1="36" x2="16" y2="48" stroke="#C0C0C0" strokeWidth="1.2"/>
    <circle cx="16" cy="50" r="2.2"  fill="#C0C0C0"/>
    <line   x1="58" y1="36" x2="64" y2="48" stroke="#C0C0C0" strokeWidth="1.2"/>
    <circle cx="64" cy="50" r="2.2"  fill="#C0C0C0"/>
    {/* White veil */}
    <path d="M18,36 Q40,18 62,36 L68,58 Q40,48 12,58 Z" fill="rgba(255,255,255,0.88)"/>
    {/* Face */}
    <circle cx="40" cy="44" r="18"   fill="#E8C99A"/>
    {/* Eyes */}
    <ellipse cx="34" cy="41" rx="2.5" ry="2"   fill="#1A0A00"/>
    <ellipse cx="46" cy="41" rx="2.5" ry="2"   fill="#1A0A00"/>
    <circle  cx="34.8" cy="40.2" r="0.8"  fill="white"/>
    <circle  cx="46.8" cy="40.2" r="0.8"  fill="white"/>
    {/* Eyebrows */}
    <path d="M30,37 Q34,35 38,37" stroke="#2A1A08" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <path d="M42,37 Q46,35 50,37" stroke="#2A1A08" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    {/* Nose */}
    <path d="M40,46 L38,50 Q40,51.5 42,50 Z" fill="rgba(0,0,0,0.08)"/>
    {/* Lips */}
    <path d="M34,53 Q40,58 46,53" stroke="#C8502A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    {/* Earrings */}
    <circle cx="22" cy="52" r="2.5"  fill="#C0C0C0"/>
    <line   x1="22" y1="54.5" x2="20" y2="60" stroke="#C0C0C0" strokeWidth="1.2"/>
    <circle cx="20" cy="61.5" r="1.6" fill="#C8920A"/>
    <circle cx="58" cy="52" r="2.5"  fill="#C0C0C0"/>
    <line   x1="58" y1="54.5" x2="60" y2="60" stroke="#C0C0C0" strokeWidth="1.2"/>
    <circle cx="60" cy="61.5" r="1.6" fill="#C8920A"/>
    {/* Traditional red dress */}
    <path d="M22,62 Q10,82 12,94 L68,94 Q70,82 58,62 Q40,55 22,62Z" fill="#C8502A"/>
    {/* Dress geometric embroidery — vertical lines */}
    <line x1="28" y1="68" x2="28" y2="88" stroke="rgba(212,160,23,0.7)" strokeWidth="1.5"/>
    <line x1="34" y1="70" x2="34" y2="88" stroke="rgba(212,160,23,0.4)" strokeWidth="1"/>
    <line x1="46" y1="70" x2="46" y2="88" stroke="rgba(212,160,23,0.4)" strokeWidth="1"/>
    <line x1="52" y1="68" x2="52" y2="88" stroke="rgba(212,160,23,0.7)" strokeWidth="1.5"/>
    {/* Embroidery horizontal cross-lines */}
    <line x1="26" y1="76" x2="54" y2="76" stroke="rgba(212,160,23,0.35)" strokeWidth="1"/>
    <line x1="24" y1="84" x2="56" y2="84" stroke="rgba(212,160,23,0.35)" strokeWidth="1"/>
    {/* Central diamond motif */}
    <path d="M40,70 L37,76 L40,80 L43,76 Z" fill="rgba(212,160,23,0.55)"/>
    {/* Silver necklace */}
    <path d="M26,64 Q40,74 54,64" stroke="#D0D0D0" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Pendant — Tifinagh ⵣ inspired cross */}
    <line x1="40" y1="70" x2="40" y2="80" stroke="#D0D0D0" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="36" y1="74" x2="44" y2="74" stroke="#D0D0D0" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="36" y1="77" x2="44" y2="77" stroke="#D0D0D0" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── Small avatar marker placed on the active node ────────────────────────────
const NodeAvatar: React.FC<{ color: string }> = ({ color }) => (
  <svg width="28" height="34" viewBox="0 0 28 34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6,12 Q14,3 22,12" stroke="#C8920A" strokeWidth="1.5" fill="none"/>
    <circle cx="14" cy="6"  r="2"   fill="#C8920A"/>
    <path d="M4,13 Q14,6 24,13 L26,22 Q14,18 2,22 Z" fill="rgba(255,255,255,0.85)"/>
    <circle cx="14" cy="16" r="7"   fill="#E8C99A"/>
    <ellipse cx="12" cy="15" rx="1" ry="0.9" fill="#1A0A00"/>
    <ellipse cx="16" cy="15" rx="1" ry="0.9" fill="#1A0A00"/>
    <path d="M11,19 Q14,21 17,19" stroke="#C8502A" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M7,23 Q3,30 4,34 L24,34 Q25,30 21,23 Q14,20 7,23Z" fill="#C8502A"/>
    <path d="M14,24 L12,27 L14,29 L16,27Z" fill="rgba(212,160,23,0.6)"/>
    <circle cx="10" cy="23" r="1.2" fill={color}/>
    <circle cx="18" cy="23" r="1.2" fill={color}/>
  </svg>
);

// ── Main component ────────────────────────────────────────────────────────────
const JourneyHero: React.FC<JourneyHeroProps> = ({ xp, stage, xpProgress, stats, levelStats }) => {
  const nextStage  = AVATAR_STAGES.find(s => s.stage === stage.stage + 1);
  const allComplete = levelStats.every(l => l.percent === 100);

  let foundActive = false;
  const enriched = levelStats.map(lvl => {
    if (lvl.percent === 100) return { ...lvl, status: 'completed' as const };
    if (!foundActive)        { foundActive = true; return { ...lvl, status: 'active' as const }; }
    return { ...lvl, status: 'locked' as const };
  });

  // Number of completed levels → used to color completed path segments
  const doneCount   = enriched.filter(l => l.status === 'completed').length;
  const activeIdx   = enriched.findIndex(l => l.status === 'active');
  const activeLevel = activeIdx >= 0 ? enriched[activeIdx] : enriched[0];

  return (
    <div className="jhero">

      {/* ═══════════════════════════════════════════════
          Avatar Column (left — dark gradient)
          ═══════════════════════════════════════════════ */}
      <div className="jhero__avatar-col" style={{ background: stage.bgGradient }}>

        {/* Floating Tifinagh BG characters */}
        <div className="jhero__bg-chars" aria-hidden="true">
          {['ⵣ', 'ⴰ', 'ⵎ', 'ⵙ', 'ⵜ', 'ⵏ', 'ⵔ'].map((c, i) => (
            <span key={i} className={`jhero__bg-char jhero__bg-char--${i + 1}`}>{c}</span>
          ))}
        </div>
        <div className="jhero__geo" aria-hidden="true"/>

        {/* Avatar ring + Amazigh woman illustration */}
        <div className="jhero__avatar-wrap">
          <div
            className="jhero__ring-glow"
            style={{ boxShadow: `0 0 0 10px ${stage.color}1A, 0 0 0 20px ${stage.color}0D` }}
          />
          <div className="jhero__ring-spin" style={{ borderColor: `${stage.color}40` }}/>
          <div
            className="jhero__circle"
            style={{
              borderColor: `${stage.color}CC`,
              boxShadow: `0 0 40px ${stage.color}55, inset 0 0 30px rgba(0,0,0,0.35)`,
            }}
          >
            <div className="jhero__circle-pattern" aria-hidden="true"/>
            {/* Amazigh woman avatar replaces the plain Tifinagh character */}
            <div className="jhero__woman-avatar">
              <AmazighWomanSVG accentColor={stage.color} size={82}/>
            </div>
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
        <p  className="jhero__stage-amazigh">{stage.nameAmazigh}</p>

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
            { v: String(stats.vocabLearned),                         l: 'Words'   },
            { v: `${stats.streakDays}🔥`,                            l: 'Streak'  },
            { v: `${stats.overallPercent}%`,                         l: 'Overall' },
          ] as const).map((s, i, arr) => (
            <React.Fragment key={s.l}>
              <div className="jhero__mini-stat">
                <span className="jhero__mini-val">{s.v}</span>
                <span className="jhero__mini-lbl">{s.l}</span>
              </div>
              {i < arr.length - 1 && <div className="jhero__mini-sep"/>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          Journey Path Column (right — warm light bg)
          ═══════════════════════════════════════════════ */}
      <div className="jhero__path-col">

        {/* Atlas mountain texture bg */}
        <div
          className="jhero__path-texture"
          style={{ backgroundImage: "url('/assets/atlas-mountains.png')" }}
          aria-hidden="true"
        />
        {/* Amazigh pattern overlay */}
        <div
          className="jhero__path-pattern-overlay"
          style={{ backgroundImage: "url('/assets/amazigh-pattern.png')" }}
          aria-hidden="true"
        />

        {/* Header */}
        <div className="jhero__path-header">
          <span className="jhero__path-aza" aria-hidden="true">ⵣ</span>
          <div>
            <h2 className="jhero__path-title">Your Amazigh Journey</h2>
            <p  className="jhero__path-sub">
              From first words to cultural fluency — one milestone at a time.
            </p>
          </div>
        </div>

        {/* Tifinagh decorative strip */}
        <div className="jhero__path-tifi-strip" aria-hidden="true">
          {['ⵙ', 'ⵣ', 'ⵎ', 'ⴰ', 'ⵜ', 'ⵏ', 'ⵔ', 'ⴱ'].map((c, i) => <span key={i}>{c}</span>)}
        </div>

        {/* ── SVG Game Map Path ── */}
        <div className="jhero__map-wrap">
          <svg
            className="jhero__map-svg"
            viewBox="0 0 420 660"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Learning progress path"
          >
            {/* Desert/warm gradient background */}
            <defs>
              <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#F7EDD8" stopOpacity="0"/>
                <stop offset="100%" stopColor="#EED9B4" stopOpacity="0"/>
              </linearGradient>
              <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.18"/>
              </filter>
              <filter id="activeShadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.35"/>
              </filter>
              {/* Gold shimmer for completed nodes */}
              <radialGradient id="doneGlow" cx="50%" cy="40%" r="60%">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.35)"/>
                <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
              </radialGradient>
            </defs>

            {/* ── Path segments ── */}
            {PATH_SEGS.map((d, i) => {
              const isDone   = i < doneCount;
              const isActive = i === doneCount;
              return (
                <g key={i}>
                  {/* White/cream road base */}
                  <path
                    d={d}
                    stroke="#EDE0C4"
                    strokeWidth="22"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Inner road */}
                  <path
                    d={d}
                    stroke="#F5EDD6"
                    strokeWidth="16"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Colored completion fill */}
                  {isDone && (
                    <path
                      d={d}
                      stroke={enriched[i]?.color ?? '#C8502A'}
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.7"
                    />
                  )}
                  {/* Active segment — animated dash */}
                  {isActive && (
                    <path
                      d={d}
                      stroke={activeLevel.color}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray="10 8"
                      fill="none"
                      opacity="0.55"
                      className="jhero__path-dash"
                    />
                  )}
                  {/* Locked — subtle dashed */}
                  {!isDone && !isActive && (
                    <path
                      d={d}
                      stroke="#C8B08A"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="6 8"
                      fill="none"
                      opacity="0.4"
                    />
                  )}
                </g>
              );
            })}

            {/* ── Level nodes ── */}
            {enriched.map((lvl, i) => {
              const { cx, cy }  = NODE_POS[i];
              const isDone      = lvl.status === 'completed';
              const isActive    = lvl.status === 'active';
              const isLocked    = lvl.status === 'locked';
              const theme       = LEVEL_THEMES[lvl.level];
              // Label on alternate sides
              const labelLeft   = cx > 210;
              const labelX      = labelLeft ? cx - 48 : cx + 48;
              const labelAnchor = labelLeft ? 'end' : 'start';

              return (
                <g key={lvl.level} filter={isActive ? 'url(#activeShadow)' : 'url(#nodeShadow)'}>

                  {/* Outer glow ring for done/active */}
                  {(isDone || isActive) && (
                    <circle
                      cx={cx} cy={cy}
                      r={isActive ? 34 : 30}
                      fill="none"
                      stroke={lvl.color}
                      strokeWidth={isActive ? 3 : 2}
                      opacity={isActive ? 0.25 : 0.18}
                      className={isActive ? 'jhero__node-pulse-ring' : undefined}
                    />
                  )}

                  {/* Node circle */}
                  <circle
                    cx={cx} cy={cy}
                    r={isActive ? 26 : 22}
                    fill={isDone ? lvl.color : isActive ? '#FFF8EE' : '#EDE0C4'}
                    stroke={isDone ? lvl.color : isActive ? lvl.color : '#C8B08A'}
                    strokeWidth={isActive ? 3 : 2}
                    opacity={isLocked ? 0.55 : 1}
                  />

                  {/* Shine overlay for completed */}
                  {isDone && (
                    <circle cx={cx} cy={cy} r={22} fill="url(#doneGlow)"/>
                  )}

                  {/* Avatar on active node */}
                  {isActive && (
                    <foreignObject
                      x={cx - 14}
                      y={cy - 38}
                      width={28}
                      height={34}
                      className="jhero__node-avatar-fo"
                    >
                      <NodeAvatar color={lvl.color}/>
                    </foreignObject>
                  )}

                  {/* Icon / checkmark / lock inside node */}
                  {isDone && (
                    <text
                      x={cx} y={cy + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="18"
                      fontWeight="700"
                      fill="white"
                    >✓</text>
                  )}
                  {!isDone && !isActive && (
                    <text
                      x={cx} y={cy + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="13"
                    >{isLocked ? '🔒' : theme.icon}</text>
                  )}
                  {isActive && (
                    <text
                      x={cx} y={cy + 6}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="11"
                      fill={lvl.color}
                      fontWeight="700"
                    >{theme.tifinagh}</text>
                  )}

                  {/* Level badge chip */}
                  <rect
                    x={cx - 14} y={isActive ? cy + 28 : cy + 24}
                    width={28} height={14}
                    rx={7}
                    fill={isDone ? lvl.color : isActive ? lvl.color : '#C8B08A'}
                    opacity={isLocked ? 0.5 : 1}
                  />
                  <text
                    x={cx} y={isActive ? cy + 36 : cy + 32}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fontWeight="700"
                    fill="white"
                    letterSpacing="0.5"
                  >Lv.{lvl.level}</text>

                  {/* Label card on alternating side */}
                  <text
                    x={labelX}
                    y={cy - 6}
                    textAnchor={labelAnchor}
                    dominantBaseline="middle"
                    fontSize="11"
                    fontWeight={isActive ? '700' : '600'}
                    fill={isLocked ? '#C8B08A' : isDone ? '#6B4A1C' : '#8B5E2A'}
                    opacity={isLocked ? 0.6 : 1}
                  >{lvl.name}</text>

                  <text
                    x={labelX}
                    y={cy + 8}
                    textAnchor={labelAnchor}
                    dominantBaseline="middle"
                    fontSize="9"
                    fill={isLocked ? '#C8B08A' : '#9B8060'}
                    opacity={isLocked ? 0.5 : 0.85}
                  >{theme.icon} {lvl.nameAmazigh}</text>

                  {/* Progress count for active/done */}
                  {!isLocked && (
                    <text
                      x={labelX}
                      y={cy + 20}
                      textAnchor={labelAnchor}
                      dominantBaseline="middle"
                      fontSize="8.5"
                      fill={isDone ? '#1D5E40' : lvl.color}
                      fontWeight="600"
                      opacity="0.9"
                    >{lvl.completed}/{lvl.total} lessons</text>
                  )}
                </g>
              );
            })}

            {/* ── Summit / Final reward node ── */}
            {(() => {
              const { cx, cy } = NODE_POS[5];
              return (
                <g filter="url(#nodeShadow)">
                  {allComplete && (
                    <>
                      <circle cx={cx} cy={cy} r={40} fill="none" stroke="#C8920A" strokeWidth="2" opacity="0.2"/>
                      <circle cx={cx} cy={cy} r={34} fill="none" stroke="#C8920A" strokeWidth="1.5" opacity="0.15"/>
                    </>
                  )}
                  <circle
                    cx={cx} cy={cy} r={26}
                    fill={allComplete ? 'linear-gradient(135deg,#C8920A,#D4A017)' : '#EDE0C4'}
                    stroke={allComplete ? '#C8920A' : '#C8B08A'}
                    strokeWidth={allComplete ? 2.5 : 1.5}
                    strokeDasharray={allComplete ? undefined : '5 4'}
                    opacity={allComplete ? 1 : 0.6}
                  />
                  {allComplete && <circle cx={cx} cy={cy} r={26} fill="url(#doneGlow)"/>}
                  <text
                    x={cx} y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="20"
                  >{allComplete ? '🏆' : '⭐'}</text>
                  <text
                    x={cx} y={cy + 34}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="9.5"
                    fontWeight="700"
                    fill={allComplete ? '#8B6A00' : '#9B8060'}
                    opacity={allComplete ? 1 : 0.65}
                  >{allComplete ? 'Atlas Summit — Achieved!' : 'Atlas Summit — Final Goal'}</text>
                  <text
                    x={cx} y={cy + 46}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fill={allComplete ? '#A07820' : '#B09878'}
                    opacity={allComplete ? 0.85 : 0.55}
                  >{allComplete ? 'Tanemmirt! Journey complete.' : 'Complete all levels to unlock'}</text>
                </g>
              );
            })()}

            {/* Decorative Tifinagh symbols scattered near path */}
            {[
              { x: 55,  y: 545, c: 'ⵙ', op: 0.12 },
              { x: 360, y: 425, c: 'ⵎ', op: 0.10 },
              { x: 60,  y: 305, c: 'ⵏ', op: 0.11 },
              { x: 355, y: 185, c: 'ⴰ', op: 0.10 },
              { x: 70,  y: 75,  c: 'ⵜ', op: 0.12 },
            ].map(({ x, y, c, op }, i) => (
              <text
                key={i}
                x={x} y={y}
                textAnchor="middle"
                fontSize="28"
                fill="#8B5E2A"
                opacity={op}
                aria-hidden="true"
              >{c}</text>
            ))}
          </svg>

          {/* Inline level info cards (rendered as HTML, positioned via CSS grid, not SVG) */}
          {/* These appear below the map on mobile */}
          <div className="jhero__level-cards">
            {enriched.map(lvl => {
              const isDone   = lvl.status === 'completed';
              const isActive = lvl.status === 'active';
              const isLocked = lvl.status === 'locked';
              const theme    = LEVEL_THEMES[lvl.level];
              return (
                <div
                  key={lvl.level}
                  className={`jhero__lcard jhero__lcard--${lvl.status}`}
                  style={isDone || isActive ? { borderColor: `${lvl.color}44`, background: `${lvl.color}08` } : {}}
                >
                  <div className="jhero__lcard-top">
                    <span
                      className="jhero__lcard-lv"
                      style={isDone || isActive ? { background: lvl.color, color: '#fff' } : {}}
                    >Lv.{lvl.level}</span>
                    <span className={`jhero__lcard-badge jhero__lcard-badge--${lvl.status}`}>
                      {isDone   ? '✓ Complete'    : null}
                      {isActive ? '→ In Progress' : null}
                      {isLocked ? '🔒 Locked'     : null}
                    </span>
                  </div>
                  <div className="jhero__lcard-name">
                    <span className="jhero__lcard-icon">{theme.icon}</span>
                    {lvl.name}
                  </div>
                  <div className="jhero__lcard-sub">{lvl.nameAmazigh} · {lvl.tifinagh}</div>
                  {!isLocked && (
                    <div className="jhero__lcard-topics">
                      {theme.topics.map(t => (
                        <span
                          key={t}
                          className="jhero__lcard-topic"
                          style={{
                            borderColor: `${lvl.color}44`,
                            color:        isDone ? lvl.color : 'var(--muted)',
                            background:   isDone ? `${lvl.color}0C` : 'transparent',
                          }}
                        >{t}</span>
                      ))}
                    </div>
                  )}
                  {!isLocked && (
                    <div className="jhero__lcard-bar-row">
                      <div className="jhero__lcard-bar">
                        <div
                          className="jhero__lcard-fill"
                          style={{ width: `${lvl.percent}%`, background: lvl.color }}
                        />
                      </div>
                      <span className="jhero__lcard-count">{lvl.completed}/{lvl.total}</span>
                    </div>
                  )}
                  {isLocked && (
                    <p className="jhero__lcard-locked">Complete the previous level to unlock</p>
                  )}
                </div>
              );
            })}

            {/* Summit card */}
            <div className={`jhero__lcard jhero__lcard--summit${allComplete ? ' jhero__lcard--summit-done' : ''}`}>
              <div className="jhero__lcard-top">
                <span className="jhero__summit-icon-badge">{allComplete ? '🏆' : '⭐'}</span>
                <span className="jhero__lcard-sub" style={{ margin: 0 }}>
                  {allComplete ? 'Tamazight Speaker — Achieved!' : 'Atlas Summit — Final Goal'}
                </span>
              </div>
              <p className="jhero__lcard-locked" style={{ marginTop: '0.25rem', fontStyle: 'normal' }}>
                {allComplete
                  ? 'Tanemmirt! You completed the full Tamazight journey.'
                  : 'Complete all levels to claim your final achievement badge.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyHero;
