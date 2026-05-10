import React from 'react';
import './CultureSection.css';

const topics = [
  { icon: '👨‍👩‍👧‍👦', label: 'Family & Relationships' },
  { icon: '🏪',       label: 'Market & Daily Life' },
  { icon: '🍲',       label: 'Food & Cuisine' },
  { icon: '👋',       label: 'Greetings & Expressions' },
  { icon: '🔢',       label: 'Numbers & Time' },
  { icon: '🏔',       label: 'Nature & Landscape' },
  { icon: '🎭',       label: 'Traditions & Festivals' },
  { icon: '🤝',       label: 'Community & Values' },
] as const;

const CultureSection: React.FC = () => {
  return (
    <section className="culture" id="culture">
      {/* Decorative Tifinagh wall */}
      <div className="culture__tifinagh-wall" aria-hidden="true">
        ⵣⴰⵎⴱⵙⵏⵜⴳⵔⵡⴰⵎⵣⵉⵖⴰⵎⴰⵣⵉⵖⵣⴰⵎⴱⵙⵏ
      </div>

      <div className="container">
        <div className="culture__layout">
          {/* Left — Image mosaic */}
          <div className="culture__mosaic reveal-left">
            <div className="culture__mosaic-grid">
              <div className="culture__mosaic-img culture__mosaic-img--1">
                <img src="/assets/moroccan-details.png" alt="Atlas Mountains" onError={e => (e.currentTarget.style.display='none')} />
                <div className="culture__mosaic-fallback culture__mosaic-fallback--1">
                  <span>ⵜⵉⴷⴷⵓⴽⵍⴰ</span>
                  <small>Atlas Mountains</small>
                </div>
              </div>
              <div className="culture__mosaic-img culture__mosaic-img--2">
                <img src="/assets/amazigh-patern.png" alt="Moroccan Amazigh village" onError={e => (e.currentTarget.style.display='none')} />
                <div className="culture__mosaic-fallback culture__mosaic-fallback--2">
                  <span>ⵜⴰⵎⴷⴷⵉⵏⵜ</span>
                  <small>Amazigh Village</small>
                </div>
              </div>
              <div className="culture__mosaic-img culture__mosaic-img--3">
                <img src="/assets/amazigh-pattern.png" alt="Traditional Amazigh pattern" onError={e => (e.currentTarget.style.display='none')} />
                <div className="culture__mosaic-fallback culture__mosaic-fallback--3">
                  <span>ⵣⵣⵉⴽⵏ</span>
                  <small>Traditional Art</small>
                </div>
              </div>
            </div>
            <div className="culture__mosaic-quote">
              <span className="culture__mosaic-quote-mark" aria-hidden="true">ⵣ</span>
              <p>"Language is the memory of a people — and Tamazight is ancient memory, alive."</p>
            </div>
          </div>

          {/* Right — Content */}
          <div className="culture__content reveal-right">
            <span className="section-label section-label--light">Cultural Experience</span>
            <h2 className="culture__title">
              Not just language.
              <br />
              <em>An entire identity.</em>
            </h2>
            <p className="culture__desc">
              Tamazight is not simply a collection of words — it carries centuries of Amazigh
              wisdom, poetry, customs, and Moroccan heritage. TamazightGo puts culture at the
              center of every lesson.
            </p>
            <p className="culture__desc">
              From the weekly souk to the warmth of a family meal, from wedding chants in
              the High Atlas to the ancient Tifinagh script carved into stone — you learn
              Tamazight through the stories of its people.
            </p>

            <div className="culture__topics">
              {topics.map(t => (
                <div key={t.label} className="culture__topic">
                  <span className="culture__topic-icon">{t.icon}</span>
                  <span className="culture__topic-label">{t.label}</span>
                </div>
              ))}
            </div>

            <a href="#" className="culture__btn">
              Explore the Culture Modules
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

export default CultureSection;
