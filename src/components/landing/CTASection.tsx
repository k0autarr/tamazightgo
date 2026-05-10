import React from 'react';
import { Link } from 'react-router-dom';
import './CTASection.css';

const CTASection: React.FC = () => {
  return (
    <section className="cta">
      {/* Decorative Tifinagh symbols */}
      <div className="cta__symbols" aria-hidden="true">
        <span className="cta__sym cta__sym--1">ⴰ</span>
        <span className="cta__sym cta__sym--2">ⵎ</span>
        <span className="cta__sym cta__sym--3">ⵣ</span>
        <span className="cta__sym cta__sym--4">ⵉ</span>
        <span className="cta__sym cta__sym--5">ⵖ</span>
      </div>

      {/* Pattern overlay */}
      <div className="cta__pattern" aria-hidden="true" />

      <div className="container">
        <div className="cta__content reveal">
          <div className="cta__badge">ⵣ TamazightGo</div>

          <h2 className="cta__title">
            Start your Tamazight
            <br />
            journey today.
          </h2>

          <p className="cta__desc">
            Join thousands of learners connecting with Amazigh Morocco —
            one word, one lesson, one story at a time.
            <br />
            It's free to start. No credit card needed.
          </p>

          <div className="cta__actions">
            <Link to="/dashboard" className="cta__btn cta__btn--primary">
              Start Learning Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="#why" className="cta__btn cta__btn--ghost">
              Learn More
            </a>
          </div>

          <div className="cta__proof">
            <div className="cta__proof-avatars" aria-hidden="true">
              {['S','Y','A','M','R'].map(l => (
                <div key={l} className="cta__proof-avatar">{l}</div>
              ))}
            </div>
            <p className="cta__proof-text">
              <strong>10,000+</strong> learners already on their journey
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decorative row */}
      <div className="cta__footer-pattern" aria-hidden="true">
        <span>ⵣ ⴰ ⵎ ⴰ ⵣ ⵉ ⵖ · ⴰⵎⴰⵣⵉⵖ · AMAZIGH · ⵣ ⴰ ⵎ ⴰ ⵣ ⵉ ⵖ</span>
      </div>
    </section>
  );
};

export default CTASection;
