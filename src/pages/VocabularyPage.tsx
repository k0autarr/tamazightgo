import React, { useState, useMemo } from 'react';
import AppLayout from '../components/learning/AppLayout';
import { getAllVocabulary, VocabularyItem } from '../data/lessons';
import { loadProgress, registerStudyActivity } from '../services/progressService';
import './VocabularyPage.css';

const VocabularyPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const progress = loadProgress();
  const allVocab = useMemo(() => getAllVocabulary(), []);
  const seenIds = useMemo(() => {
    const s = new Set<string>();
    Object.values(progress.lessons).forEach(lp => lp.vocabSeen.forEach(v => s.add(v)));
    return s;
  }, [progress]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    allVocab.forEach(v => cats.add(v.category));
    return ['all', ...Array.from(cats).sort()];
  }, [allVocab]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allVocab.filter(v => {
      const matchCat = activeCategory === 'all' || v.category === activeCategory;
      const matchQ = !q
        || v.tamazight.toLowerCase().includes(q)
        || v.english.toLowerCase().includes(q)
        || v.transliteration.toLowerCase().includes(q)
        || (v.arabic ?? '').includes(q);
      return matchCat && matchQ;
    });
  }, [allVocab, search, activeCategory]);

  const toggleFlip = (id: string) => {
    setFlipped(prev => {
      const next = new Set(prev);
      if (!next.has(id)) {
        // First reveal of this card in this session → count as study activity
        registerStudyActivity();
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const learnedCount = allVocab.filter(v => seenIds.has(v.id)).length;

  return (
    <AppLayout>
      <div className="vocab-page container">
        {/* Header */}
        <div className="vocab-page__header">
          <div>
            <h1 className="vocab-page__title">
              Vocabulary <em>— {allVocab.length} words</em>
            </h1>
            <p className="vocab-page__subtitle">
              All Tamazight words from every lesson. Click any card to reveal the translation.
            </p>
          </div>
          <div className="vocab-page__stats">
            <div className="vocab-page__stat">
              <span className="vocab-page__stat-num">{learnedCount}</span>
              <span className="vocab-page__stat-label">Learned</span>
            </div>
            <div className="vocab-page__stat-sep" />
            <div className="vocab-page__stat">
              <span className="vocab-page__stat-num">{allVocab.length - learnedCount}</span>
              <span className="vocab-page__stat-label">Remaining</span>
            </div>
            <div className="vocab-page__stat-sep" />
            <div className="vocab-page__stat">
              <span className="vocab-page__stat-num">{allVocab.length > 0 ? Math.round((learnedCount / allVocab.length) * 100) : 0}%</span>
              <span className="vocab-page__stat-label">Complete</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="vocab-page__progress-bar">
          <div
            className="vocab-page__progress-fill"
            style={{ width: `${allVocab.length > 0 ? (learnedCount / allVocab.length) * 100 : 0}%` }}
          />
        </div>

        {/* Search */}
        <div className="vocab-page__search-row">
          <div className="vocab-page__search-wrap">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search in Tamazight, English, or Arabic..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="vocab-page__search"
            />
            {search && (
              <button onClick={() => setSearch('')} className="vocab-page__search-clear">✕</button>
            )}
          </div>
          <span className="vocab-page__count">{filtered.length} words</span>
        </div>

        {/* Category filters */}
        <div className="vocab-page__filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`vocab-page__filter${activeCategory === cat ? ' vocab-page__filter--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="vocab-page__empty">
            <div className="vocab-page__empty-icon">🔍</div>
            <p>No words match your search. Try something else.</p>
          </div>
        ) : (
          <div className="vocab-page__grid">
            {filtered.map(v => {
              const isFlipped = flipped.has(v.id);
              const isLearned = seenIds.has(v.id);
              return (
                <div
                  key={v.id}
                  className={`vcard${isFlipped ? ' vcard--flipped' : ''}${isLearned ? ' vcard--learned' : ''}`}
                  onClick={() => toggleFlip(v.id)}
                >
                  <div className="vcard__inner">
                    {/* Front */}
                    <div className="vcard__front">
                      {isLearned && <div className="vcard__learned-dot" title="Learned" />}
                      <div className="vcard__cat">{v.category}</div>
                      <div className="vcard__tifinagh">{v.tifinagh}</div>
                      <div className="vcard__tamazight">{v.tamazight}</div>
                      <div className="vcard__phonetic">[{v.transliteration}]</div>
                      <div className="vcard__hint">Click to see translation</div>
                    </div>
                    {/* Back */}
                    <div className="vcard__back">
                      <div className="vcard__back-tifinagh">{v.tifinagh}</div>
                      <div className="vcard__english">{v.english}</div>
                      {v.arabic && <div className="vcard__arabic">{v.arabic}</div>}
                      <div className="vcard__example-label">Example:</div>
                      <div className="vcard__example">{v.exampleTamazight}</div>
                      <div className="vcard__example-en">{v.exampleEnglish}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default VocabularyPage;
