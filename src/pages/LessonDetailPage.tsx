import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppLayout from '../components/learning/AppLayout';
import { getLessonById, LESSONS } from '../data/lessons';
import {
  getLessonProgress, markLessonComplete, markVocabSeen, registerStudyActivity,
} from '../services/progressService';
import './LessonDetailPage.css';

type Tab = 'vocabulary' | 'phrases' | 'dialogue' | 'practice';

const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = id ? getLessonById(id) : undefined;
  const [tab, setTab] = useState<Tab>('vocabulary');
  const [lp, setLp] = useState(() => id ? getLessonProgress(id) : { lessonId: '', completed: false, vocabSeen: [] });
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceRevealed, setPracticeRevealed] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(lp.completed);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    if (id) {
      const p = getLessonProgress(id);
      setLp(p);
      setCompleted(p.completed);
    }
  }, [id]);

  if (!lesson) {
    return (
      <AppLayout>
        <div className="lesson-detail container">
          <p>Lesson not found. <Link to="/lessons">← Back to lessons</Link></p>
        </div>
      </AppLayout>
    );
  }

  const handleVocabSeen = (vocabId: string) => {
    if (id && !lp.vocabSeen.includes(vocabId)) {
      markVocabSeen(id, vocabId);
      setLp(getLessonProgress(id));
    }
  };

  const handleAnswer = (practiceId: string, answer: string) => {
    if (practiceRevealed[practiceId]) return;
    registerStudyActivity();
    setPracticeAnswers(prev => ({ ...prev, [practiceId]: answer }));
    setPracticeRevealed(prev => ({ ...prev, [practiceId]: true }));
  };

  const handleComplete = () => {
    if (!id) return;
    markLessonComplete(id);
    setCompleted(true);
    setJustCompleted(true);
  };

  const currentIndex = LESSONS.findIndex(l => l.id === lesson.id);
  const nextLesson = currentIndex >= 0 && currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null;
  const vocabProgress = Math.round((lp.vocabSeen.length / lesson.vocabulary.length) * 100);

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'vocabulary', label: 'Vocabulary', icon: '🔤' },
    { key: 'phrases', label: 'Phrases', icon: '💬' },
    { key: 'dialogue', label: 'Dialogue', icon: '🗣️' },
    { key: 'practice', label: 'Practice', icon: '✏️' },
  ];

  return (
    <AppLayout>
      <div className="lesson-detail container">

        {/* Breadcrumb */}
        <div className="lesson-detail__breadcrumb">
          <Link to="/lessons">← All Lessons</Link>
          <span>/</span>
          <span>Level {lesson.level}</span>
          <span>/</span>
          <span>{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="lesson-detail__header">
          <div className="lesson-detail__header-left">
            <div className="lesson-detail__tifinagh">{lesson.titleTifinagh}</div>
            <h1 className="lesson-detail__title">{lesson.title}</h1>
            <p className="lesson-detail__tamazight">{lesson.titleTamazight}</p>
            <p className="lesson-detail__desc">{lesson.description}</p>
            <div className="lesson-detail__meta">
              <span className={`lesson-detail__diff lesson-detail__diff--${lesson.difficulty}`}>{lesson.difficulty}</span>
              <span>⏱ {lesson.duration} min</span>
              <span>🔤 {lesson.vocabulary.length} words</span>
              <span>Level {lesson.level}</span>
            </div>
          </div>
          <div className="lesson-detail__header-right">
            {completed ? (
              <div className="lesson-detail__done-badge">
                <span>✓</span>
                <div>
                  <div className="lesson-detail__done-title">Lesson Complete!</div>
                  {nextLesson && (
                    <Link to={`/lessons/${nextLesson.id}`} className="lesson-detail__next-link">
                      Next: {nextLesson.title} →
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="lesson-detail__progress-widget">
                <div className="lesson-detail__progress-title">Vocab Seen</div>
                <div className="lesson-detail__progress-nums">{lp.vocabSeen.length}/{lesson.vocabulary.length}</div>
                <div className="lesson-detail__progress-bar">
                  <div className="lesson-detail__progress-fill" style={{ width: `${vocabProgress}%` }} />
                </div>
                <button className="lesson-detail__complete-btn" onClick={handleComplete}>
                  Mark as Complete ✓
                </button>
              </div>
            )}
          </div>
        </div>

        {justCompleted && (
          <div className="lesson-detail__celebration">
            🎉 Tanemmirt! You completed "{lesson.title}". Keep going!
            {nextLesson && (
              <Link to={`/lessons/${nextLesson.id}`} className="lesson-detail__celebration-next">
                Continue to {nextLesson.title} →
              </Link>
            )}
          </div>
        )}

        {/* Cultural Note */}
        <div className="lesson-detail__cultural-note">
          <span className="lesson-detail__cn-icon" aria-hidden="true">ⵣ</span>
          <div>
            <div className="lesson-detail__cn-title">Cultural Note</div>
            <p className="lesson-detail__cn-text">{lesson.culturalNote}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="lesson-detail__tabs">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`lesson-detail__tab${tab === t.key ? ' lesson-detail__tab--active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── Vocabulary Tab ── */}
        {tab === 'vocabulary' && (
          <div className="lesson-detail__vocab">
            {lesson.vocabulary.map(v => {
              const seen = lp.vocabSeen.includes(v.id);
              return (
                <div
                  key={v.id}
                  className={`vocab-card${seen ? ' vocab-card--seen' : ''}`}
                  onClick={() => handleVocabSeen(v.id)}
                >
                  {seen && <div className="vocab-card__seen-badge">✓ Learned</div>}
                  <div className="vocab-card__tifinagh">{v.tifinagh}</div>
                  <div className="vocab-card__row">
                    <div className="vocab-card__tamazight">{v.tamazight}</div>
                    <div className="vocab-card__phonetic">[{v.transliteration}]</div>
                  </div>
                  <div className="vocab-card__english">{v.english}</div>
                  {v.arabic && <div className="vocab-card__arabic">{v.arabic}</div>}
                  <div className="vocab-card__example">
                    <span className="vocab-card__example-label">Example:</span>
                    <span className="vocab-card__example-text">{v.exampleTamazight}</span>
                    <span className="vocab-card__example-en">{v.exampleEnglish}</span>
                  </div>
                  {!seen && <div className="vocab-card__hint">Click to mark as learned</div>}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Phrases Tab ── */}
        {tab === 'phrases' && (
          <div className="lesson-detail__phrases">
            <p className="lesson-detail__tab-intro">Key phrases from this lesson — study them and repeat out loud.</p>
            {lesson.phrases.map((ph, i) => (
              <div key={i} className="phrase-item">
                <div className="phrase-item__tamazight">{ph.tamazight}</div>
                <div className="phrase-item__phonetic">[{ph.transliteration}]</div>
                <div className="phrase-item__english">{ph.english}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Dialogue Tab ── */}
        {tab === 'dialogue' && (
          <div className="lesson-detail__dialogue">
            <p className="lesson-detail__tab-intro">
              Read this real conversation between two Amazigh speakers.
              Notice how the vocabulary from this lesson appears in context.
            </p>
            <div className="dialogue-box">
              {lesson.dialogue.map((line, i) => (
                <div key={i} className={`dialogue-line dialogue-line--${line.speaker}`}>
                  <div className="dialogue-line__speaker">{line.speakerName}</div>
                  <div className="dialogue-line__bubble">
                    <div className="dialogue-line__tamazight">{line.tamazight}</div>
                    <div className="dialogue-line__phonetic">[{line.transliteration}]</div>
                    <div className="dialogue-line__english">{line.english}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Practice Tab ── */}
        {tab === 'practice' && (
          <div className="lesson-detail__practice">
            <p className="lesson-detail__tab-intro">Test your knowledge — choose the correct answer for each question.</p>
            {lesson.practiceItems.map((item, i) => {
              const answered = practiceRevealed[item.id];
              const selected = practiceAnswers[item.id];
              const isCorrect = selected === item.answer;
              return (
                <div key={item.id} className="practice-item">
                  <div className="practice-item__num">Q{i + 1}</div>
                  <div className="practice-item__question">{item.question}</div>
                  <div className="practice-item__options">
                    {item.options.map(opt => (
                      <button
                        key={opt}
                        className={`practice-item__opt${
                          answered && opt === item.answer ? ' practice-item__opt--correct' :
                          answered && opt === selected ? ' practice-item__opt--wrong' : ''
                        }`}
                        onClick={() => handleAnswer(item.id, opt)}
                        disabled={answered}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {answered && (
                    <div className={`practice-item__result${isCorrect ? ' practice-item__result--ok' : ' practice-item__result--no'}`}>
                      {isCorrect ? '✓ Correct!' : `✗ The answer is "${item.answer}"`}
                    </div>
                  )}
                </div>
              );
            })}
            {lesson.practiceItems.every(p => practiceRevealed[p.id]) && !completed && (
              <button className="lesson-detail__complete-btn lesson-detail__complete-btn--practice" onClick={handleComplete}>
                Mark Lesson as Complete ✓
              </button>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="lesson-detail__nav">
          {prevLesson ? (
            <Link to={`/lessons/${prevLesson.id}`} className="lesson-detail__nav-btn">
              ← {prevLesson.title}
            </Link>
          ) : <div />}
          {nextLesson && (
            <Link to={`/lessons/${nextLesson.id}`} className="lesson-detail__nav-btn lesson-detail__nav-btn--next">
              {nextLesson.title} →
            </Link>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default LessonDetailPage;
