import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero" id="hero">
      {/* Floating Tifinagh background symbols */}
      <div className="hero__bg-symbols" aria-hidden="true">
        {['ⵣ','ⴰ','ⵎ','ⴱ','ⵙ','ⵏ','ⵜ','ⴳ','ⵔ','ⵡ'].map((ch, i) => (
          <span key={i} className={`hero__bg-char hero__bg-char--${i + 1}`}>{ch}</span>
        ))}
      </div>

      {/* Geometric pattern overlay */}
      <div className="hero__pattern-overlay" aria-hidden="true" />

      <div className="container">
        <div className="hero__layout">
          {/* ── Left: Text Content ── */}
          <div className="hero__content">
            <div className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true">✦</span>
              Moroccan Amazigh Language &amp; Heritage
            </div>

            <h1 className="hero__title">
              Learn Tamazight.
              <br />
              <em className="hero__title-em">Connect with</em>
              <br />
              Amazigh Morocco.
            </h1>

            <p className="hero__subtitle">
              An interactive way to discover the language, words, traditions,
              and identity of Amazigh Morocco — step by step, word by word.
            </p>

            <div className="hero__cta-group">
              <Link to="/dashboard" className="hero__btn hero__btn--primary">
                Start Learning Free
                <svg className="hero__btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a href="#culture" className="hero__btn hero__btn--secondary">
                <svg className="hero__btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor"/>
                </svg>
                Explore Culture
              </a>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">1,200+</span>
                <span className="hero__stat-label">Words</span>
              </div>
              <div className="hero__stat-sep" aria-hidden="true" />
              <div className="hero__stat">
                <span className="hero__stat-number">50+</span>
                <span className="hero__stat-label">Lessons</span>
              </div>
              <div className="hero__stat-sep" aria-hidden="true" />
              <div className="hero__stat">
                <span className="hero__stat-number">Free</span>
                <span className="hero__stat-label">To Start</span>
              </div>
            </div>
          </div>

          {/* ── Right: Visual ── */}
          <div className="hero__visual">
            {/* Main image frame */}
            <div className="hero__frame">
              <div className="hero__image-wrap">
                <img
                  src="/assets/amazigh-hero.png"
                  alt="Moroccan Amazigh mountain landscape"
                  className="hero__img"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                {/* CSS fallback — beautiful landscape gradient */}
                <div className="hero__img-fallback" aria-hidden="true">
                  <div className="hero__img-overlay" />
                  <div className="hero__img-text">
                    <span className="hero__img-aza">ⵣ</span>
                    <span className="hero__img-amazigh">ⴰⵎⴰⵣⵉⵖ</span>
                    <span className="hero__img-label">Amazigh</span>
                  </div>
                </div>
              </div>

              {/* Floating vocabulary card */}
              <div className="hero__card hero__card--word" aria-label="Sample vocabulary: Azul means Hello">
                <div className="hero__card-icon">🗣️</div>
                <div className="hero__card-body">
                  <div className="hero__card-tifinagh">ⴰⵣⵓⵍ</div>
                  <div className="hero__card-translation">Azul — Hello</div>
                </div>
                <div className="hero__card-audio" aria-label="Play pronunciation">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5.5 4.5L9.5 7L5.5 9.5V4.5Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>

              {/* Floating progress card */}
              <div className="hero__card hero__card--progress" aria-label="Daily progress card">
                <div className="hero__progress-title">Today's Progress</div>
                <div className="hero__progress-bar">
                  <div className="hero__progress-fill" />
                </div>
                <div className="hero__progress-meta">
                  <span>12 words learned</span>
                  <span className="hero__streak">🔥 3 day streak</span>
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="hero__frame-deco hero__frame-deco--tl" aria-hidden="true" />
              <div className="hero__frame-deco hero__frame-deco--br" aria-hidden="true" />
            </div>

            {/* Outer glow elements */}
            <div className="hero__glow hero__glow--1" aria-hidden="true" />
            <div className="hero__glow hero__glow--2" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <div className="hero__scroll-dot" />
      </div>
    </section>
  );
};

export default HeroSection;
