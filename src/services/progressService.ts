import { LESSONS, LEVELS } from '../data/lessons';

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  vocabSeen: string[];
  lastAccessed?: string;
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  totalVocabLearned: number;
  streakDays: number;
  longestStreak: number;
  lastActiveDate: string; // ISO date, or '' before any study activity
  joinedDate: string;
  weeklyActivity: Record<string, number>; // ISO date → words practiced
}

const STORAGE_KEY = 'tamazightgo_progress';

const defaultProgress = (): UserProgress => ({
  lessons: {},
  totalVocabLearned: 0,
  streakDays: 0,
  longestStreak: 0,
  // Empty string means "never studied" — first activity will correctly set streak to 1
  lastActiveDate: '',
  joinedDate: new Date().toISOString().split('T')[0],
  weeklyActivity: {},
});

export const loadProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore storage errors
  }
};

export const getLessonProgress = (lessonId: string): LessonProgress => {
  const p = loadProgress();
  return p.lessons[lessonId] ?? { lessonId, completed: false, vocabSeen: [] };
};

export const markLessonComplete = (lessonId: string): UserProgress => {
  const p = loadProgress();
  const existing = p.lessons[lessonId] ?? { lessonId, completed: false, vocabSeen: [] };
  const lesson = LESSONS.find(l => l.id === lessonId);
  const newVocab = lesson ? lesson.vocabulary.map(v => v.id) : [];
  const allVocabSeen = Array.from(new Set([...existing.vocabSeen, ...newVocab]));

  const wasCompleted = existing.completed;
  const updated: LessonProgress = {
    ...existing,
    completed: true,
    completedAt: existing.completedAt ?? new Date().toISOString(),
    vocabSeen: allVocabSeen,
    lastAccessed: new Date().toISOString(),
  };

  const today = getTodayKey();
  const newTotalVocab = wasCompleted
    ? p.totalVocabLearned
    : Math.max(p.totalVocabLearned, countUniqueVocab({ ...p, lessons: { ...p.lessons, [lessonId]: updated } }));

  const activity = { ...p.weeklyActivity };
  activity[today] = (activity[today] ?? 0) + (wasCompleted ? 0 : newVocab.length);

  const { streakDays, longestStreak } = calcStreak(p.lastActiveDate, p.streakDays, p.longestStreak ?? 0, today);

  const newProgress: UserProgress = {
    ...p,
    lessons: { ...p.lessons, [lessonId]: updated },
    totalVocabLearned: newTotalVocab,
    lastActiveDate: today,
    streakDays,
    longestStreak,
    weeklyActivity: activity,
  };
  saveProgress(newProgress);
  return newProgress;
};

export const markVocabSeen = (lessonId: string, vocabId: string): void => {
  const p = loadProgress();
  const existing = p.lessons[lessonId] ?? { lessonId, completed: false, vocabSeen: [] };
  if (existing.vocabSeen.includes(vocabId)) return;

  const updated = { ...existing, vocabSeen: [...existing.vocabSeen, vocabId], lastAccessed: new Date().toISOString() };
  const today = getTodayKey();
  const activity = { ...p.weeklyActivity };
  activity[today] = (activity[today] ?? 0) + 1;
  const { streakDays, longestStreak } = calcStreak(p.lastActiveDate, p.streakDays, p.longestStreak ?? 0, today);

  saveProgress({
    ...p,
    lessons: { ...p.lessons, [lessonId]: updated },
    totalVocabLearned: p.totalVocabLearned + 1,
    lastActiveDate: today,
    streakDays,
    longestStreak,
    weeklyActivity: activity,
  });
};

const countUniqueVocab = (p: UserProgress): number => {
  const all = new Set<string>();
  Object.values(p.lessons).forEach(lp => lp.vocabSeen.forEach(v => all.add(v)));
  return all.size;
};

// ── Public streak helpers ────────────────────────────────────────────────────

export const getTodayKey = (): string =>
  new Date().toISOString().split('T')[0];

/** Register generic study activity (e.g. browsing the vocabulary page).
 *  Updates streak, longestStreak, lastActiveDate, and weeklyActivity
 *  without requiring a specific lesson or vocab item. */
export const registerStudyActivity = (): void => {
  const p = loadProgress();
  const today = getTodayKey();
  // If we already recorded activity for today, nothing new to compute
  const alreadyToday = p.lastActiveDate === today && (p.weeklyActivity[today] ?? 0) > 0;
  if (alreadyToday) return;

  const activity = { ...p.weeklyActivity };
  activity[today] = (activity[today] ?? 0) + 1;
  const { streakDays, longestStreak } = calcStreak(p.lastActiveDate, p.streakDays, p.longestStreak ?? 0, today);

  saveProgress({ ...p, lastActiveDate: today, streakDays, longestStreak, weeklyActivity: activity });
};

/** Returns all ISO date strings on which the user had any study activity. */
export const getStudyDates = (): string[] =>
  Object.entries(loadProgress().weeklyActivity)
    .filter(([, count]) => count > 0)
    .map(([date]) => date)
    .sort();

const calcStreak = (
  lastDate: string,
  currentStreak: number,
  longestStreak: number,
  today: string,
): { streakDays: number; longestStreak: number } => {
  let next: number;
  if (!lastDate) {
    // No previous activity — first ever study day
    next = 1;
  } else {
    const diffDays = Math.floor(
      (new Date(today).getTime() - new Date(lastDate).getTime()) / 86400000,
    );
    if (diffDays === 0) {
      // Already counted today — keep as-is but ensure it's at least 1
      next = currentStreak || 1;
    } else if (diffDays === 1) {
      // Studied yesterday — extend the streak
      next = currentStreak + 1;
    } else {
      // Gap of 2+ days — reset
      next = 1;
    }
  }
  return { streakDays: next, longestStreak: Math.max(next, longestStreak) };
};

// ── Statistics helpers ──

export const getCompletedLessons = (): string[] => {
  const p = loadProgress();
  return Object.values(p.lessons).filter(l => l.completed).map(l => l.lessonId);
};

export const getLevelStats = () => {
  const p = loadProgress();
  return LEVELS.map(lvl => {
    const levelLessons = LESSONS.filter(l => l.level === lvl.level);
    const completed = levelLessons.filter(l => p.lessons[l.id]?.completed).length;
    return {
      level: lvl.level,
      name: lvl.name,
      nameAmazigh: lvl.nameAmazigh,
      tifinagh: lvl.tifinagh,
      color: lvl.color,
      total: levelLessons.length,
      completed,
      percent: levelLessons.length ? Math.round((completed / levelLessons.length) * 100) : 0,
    };
  });
};

export const getOverallStats = () => {
  const p = loadProgress();
  const completed = Object.values(p.lessons).filter(l => l.completed).length;
  const total = LESSONS.length;
  return {
    completedLessons: completed,
    totalLessons: total,
    overallPercent: total ? Math.round((completed / total) * 100) : 0,
    vocabLearned: countUniqueVocab(p),
    totalVocab: LESSONS.reduce((acc, l) => acc + l.vocabulary.length, 0),
    streakDays: p.streakDays,
    longestStreak: p.longestStreak ?? 0,
    joinedDate: p.joinedDate,
  };
};

export const getWeeklyActivity = (): { day: string; label: string; count: number }[] => {
  const p = loadProgress();
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en', { weekday: 'short' });
    result.push({ day: key, label, count: p.weeklyActivity[key] ?? 0 });
  }
  return result;
};

export const getNextLesson = (): string | null => {
  const p = loadProgress();
  for (const lesson of LESSONS) {
    if (!p.lessons[lesson.id]?.completed) return lesson.id;
  }
  return null;
};

export const getLastAccessedLesson = (): string | null => {
  const p = loadProgress();
  const entries = Object.values(p.lessons)
    .filter(l => l.lastAccessed)
    .sort((a, b) => (b.lastAccessed! > a.lastAccessed! ? 1 : -1));
  return entries[0]?.lessonId ?? null;
};

export const resetProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// ─── XP & Avatar System ───────────────────────────────────────────────────────

export interface AvatarStageDefinition {
  stage: number;
  name: string;
  nameAmazigh: string;
  tifinagh: string;
  color: string;
  bgGradient: string;
  minXP: number;
  maxXP: number | null;
}

export const AVATAR_STAGES: AvatarStageDefinition[] = [
  {
    stage: 1, name: 'New Learner', nameAmazigh: 'Asurag Amaynut',
    tifinagh: 'ⵙ', color: '#9B8B7C', bgGradient: 'linear-gradient(170deg,#2A1F18,#4A3828)',
    minXP: 0, maxXP: 200,
  },
  {
    stage: 2, name: 'Amazigh Explorer', nameAmazigh: 'Amrabbay Amazigh',
    tifinagh: 'ⵣ', color: '#C8502A', bgGradient: 'linear-gradient(170deg,#2A1F18,#8B3A1A)',
    minXP: 200, maxXP: 500,
  },
  {
    stage: 3, name: 'Vocabulary Builder', nameAmazigh: 'Amseẓfaṛ n Tira',
    tifinagh: 'ⵎ', color: '#C8920A', bgGradient: 'linear-gradient(170deg,#2A1F18,#7A560A)',
    minXP: 500, maxXP: 1000,
  },
  {
    stage: 4, name: 'Culture Learner', nameAmazigh: 'Amussu n Tmazight',
    tifinagh: 'ⴰ', color: '#1D5E40', bgGradient: 'linear-gradient(170deg,#0D2E1A,#1D5E40)',
    minXP: 1000, maxXP: 1800,
  },
  {
    stage: 5, name: 'Tamazight Speaker', nameAmazigh: 'Ameslaw n Tmazight',
    tifinagh: 'ⵜ', color: '#1E3D72', bgGradient: 'linear-gradient(170deg,#0A1628,#1E3D72)',
    minXP: 1800, maxXP: null,
  },
];

export const calculateXP = (): number => {
  const p = loadProgress();
  const completedCount = Object.values(p.lessons).filter(l => l.completed).length;
  const vocabCount = countUniqueVocab(p);
  return completedCount * 100 + vocabCount * 5 + p.streakDays * 20;
};

export const getAvatarStage = (xp: number): AvatarStageDefinition => {
  for (let i = AVATAR_STAGES.length - 1; i >= 0; i--) {
    if (xp >= AVATAR_STAGES[i].minXP) return AVATAR_STAGES[i];
  }
  return AVATAR_STAGES[0];
};

export const getXPProgress = (xp: number, stage: AvatarStageDefinition) => {
  if (stage.maxXP === null) return { current: xp - stage.minXP, needed: 0, pct: 100 };
  const current = xp - stage.minXP;
  const needed = stage.maxXP - stage.minXP;
  return { current, needed, pct: Math.min(Math.round((current / needed) * 100), 100) };
};

// ─── Achievement Badges ────────────────────────────────────────────────────────

export interface Badge {
  id: string;
  name: string;
  desc: string;
  icon: string;
  unlocked: boolean;
}

export const getBadges = (): Badge[] => {
  const p = loadProgress();
  const completedIds = Object.entries(p.lessons)
    .filter(([, lp]) => lp.completed)
    .map(([id]) => id);
  const completedCount = completedIds.length;
  const vocabCount = countUniqueVocab(p);
  const xp = calculateXP();
  const stage = getAvatarStage(xp);

  return [
    {
      id: 'first_lesson',
      name: 'First Steps',
      desc: 'Complete your first lesson',
      icon: '🌱',
      unlocked: completedCount >= 1,
    },
    {
      id: 'greeting_master',
      name: 'Greeting Master',
      desc: 'Complete the Greetings lesson',
      icon: '👋',
      unlocked: completedIds.includes('l1-greetings'),
    },
    {
      id: 'word_10',
      name: 'Word Collector',
      desc: 'Learn 10 vocabulary words',
      icon: '🔤',
      unlocked: vocabCount >= 10,
    },
    {
      id: 'on_fire',
      name: 'On Fire',
      desc: 'Maintain a 3-day learning streak',
      icon: '🔥',
      unlocked: p.streakDays >= 3,
    },
    {
      id: 'vocab_25',
      name: 'Vocab Builder',
      desc: 'Learn 25+ vocabulary words',
      icon: '📚',
      unlocked: vocabCount >= 25,
    },
    {
      id: 'lessons_5',
      name: 'Dedicated',
      desc: 'Complete 5 or more lessons',
      icon: '⭐',
      unlocked: completedCount >= 5,
    },
    {
      id: 'culture_explorer',
      name: 'Culture Explorer',
      desc: 'Complete a Level 4+ lesson',
      icon: '🏔️',
      unlocked: completedIds.some(id => {
        const lesson = LESSONS.find(l => l.id === id);
        return lesson != null && lesson.level >= 4;
      }),
    },
    {
      id: 'level_up',
      name: 'Level Up',
      desc: 'Reach Amazigh Explorer stage',
      icon: '🚀',
      unlocked: stage.stage >= 2,
    },
  ];
};
