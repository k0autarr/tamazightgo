import React, { useState } from 'react';
import './LearningPreview.css';

const lessonWords = [
  { tifinagh: 'ⴰⵣⵓⵍ',  latin: 'Azul',      arabic: 'مرحبا',   english: 'Hello',     category: 'Greetings' },
  { tifinagh: 'ⵜⴰⵏⵎⵉⵔⵜ', latin: 'Tanmirt',   arabic: 'شكرا',    english: 'Thank you', category: 'Expressions' },
  { tifinagh: 'ⴰⴼⵓⵍⵍⵓⵙ', latin: 'Afullus',   arabic: 'دجاج',    english: 'Chicken',   category: 'Food' },
  { tifinagh: 'ⵜⴰⴼⵓⴽⵜ',  latin: 'Tafukt',    arabic: 'الشمس',   english: 'Sun',       category: 'Nature' },
  { tifinagh: 'ⴰⵔⵖ',     latin: 'Argh',      arabic: 'اشتري',   english: 'Buy',       category: 'Market' },
] as const;

const choices = ['Hello', 'Goodbye', 'Water', 'Mountain'];

const LearningPreview: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const word = lessonWords[current];
  const isCorrect = selected === word.english;

  const handleChoice = (choice: string) => {
    if (revealed) return;
    setSelected(choice);
    setRevealed(true);
  };

  const handleNext = () => {
    setCurrent(c => (c + 1) % lessonWords.length);
    setSelected(null);
    setRevealed(false);
  };

  return (
    <section className="learn" id="lessons">
      <div className="container">
        <div className="learn__layout">
          {/* Left — Lesson card */}
          <div className="learn__card-wrap reveal-left">
            <div className="learn__card">
              {/* Card header */}
              <div className="learn__card-header">
                <div className="learn__lesson-info">
                  <span className="learn__lesson-tag">{word.category}</span>
                  <span className="learn__lesson-num">
                    Word {current + 1} / {lessonWords.length}
                  </span>
                </div>
                <div className="learn__progress-dots">
                  {lessonWords.map((_, i) => (
                    <button
                      key={i}
                      className={`learn__dot${i === current ? ' learn__dot--active' : i < current ? ' learn__dot--done' : ''}`}
                      onClick={() => { setCurrent(i); setSelected(null); setRevealed(false); }}
                      aria-label={`Go to word ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Word display */}
              <div className="learn__word-display">
                <div className="learn__tifinagh">{word.tifinagh}</div>
                <div className="learn__phonetic">{word.latin}</div>
                <div className="learn__arabic">{word.arabic}</div>
                <button className="learn__audio" aria-label="Hear pronunciation">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 6.5H6L9.5 3.5V14.5L6 11.5H3V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M12 6A4 4 0 0 1 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M13.5 4A7 7 0 0 1 13.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Hear it
                </button>
              </div>

              {/* Practice */}
              <div className="learn__practice">
                <p className="learn__practice-label">
                  {revealed
                    ? isCorrect ? '✓ Correct! Great job!' : `✗ The answer is "${word.english}"`
                    : 'What does this mean?'}
                </p>
                <div className="learn__choices">
                  {choices.map(c => (
                    <button
                      key={c}
                      className={`learn__choice${
                        revealed && c === word.english ? ' learn__choice--correct' :
                        revealed && c === selected && !isCorrect ? ' learn__choice--wrong' : ''
                      }`}
                      onClick={() => handleChoice(c)}
                      disabled={revealed}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Next */}
              {revealed && (
                <button className="learn__next" onClick={handleNext}>
                  Next Word →
                </button>
              )}
            </div>

            {/* Behind decorative card */}
            <div className="learn__card-shadow" aria-hidden="true" />
          </div>

          {/* Right — Learning journey info */}
          <div className="learn__info reveal-right">
            <span className="section-label">Interactive Learning</span>
            <h2 className="learn__title">
              See how learning
              <br />
              <em>Tamazight feels.</em>
            </h2>
            <p className="learn__desc">
              Every lesson combines reading, listening, and practice.
              Try the interactive word card — click an answer to begin.
            </p>

            <div className="learn__journey">
              {[
                { num: '01', title: 'Read the Tifinagh', desc: 'See the word in its native Amazigh script.' },
                { num: '02', title: 'Hear the pronunciation', desc: 'Listen and repeat the Tamazight sound.' },
                { num: '03', title: 'Practice & recall', desc: 'Test yourself with interactive exercises.' },
                { num: '04', title: 'Learn through culture', desc: 'Understand the word in its cultural context.' },
              ].map(step => (
                <div key={step.num} className="learn__step">
                  <div className="learn__step-num">{step.num}</div>
                  <div>
                    <h4 className="learn__step-title">{step.title}</h4>
                    <p className="learn__step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#" className="learn__cta">
              Start First Lesson
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningPreview;
