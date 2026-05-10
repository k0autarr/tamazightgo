import React from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    name: 'Sara M.',
    role: 'Student, Agadir',
    quote: 'TamazightGo made me feel genuinely connected to my roots. Learning Tamazight gave me a new sense of identity and pride I never expected from an app.',
    avatar: 'S',
    stars: 5,
    lang: 'ⴰⵣⵓⵍ',
  },
  {
    name: 'Youssef B.',
    role: 'Diaspora, Paris',
    quote: 'Born in France, this is the first time I can actually have a real conversation with my grandmother in her language. I cannot express what that means.',
    avatar: 'Y',
    stars: 5,
    lang: 'ⵜⴰⵏⵎⵉⵔⵜ',
  },
  {
    name: 'Dr. Amina K.',
    role: 'Language Educator, Rabat',
    quote: 'The cultural context woven into every lesson is extraordinary. This is language learning with soul — it understands that Tamazight is more than words.',
    avatar: 'A',
    stars: 5,
    lang: 'ⵉⵖⵉⵔ',
  },
] as const;

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
    <path d="M7 1L8.79 5.26L13.5 5.64L10 8.64L11.15 13.23L7 10.77L2.85 13.23L4 8.64L0.5 5.64L5.21 5.26L7 1Z"/>
  </svg>
);

const TestimonialsSection: React.FC = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__header reveal">
          <span className="section-label">Community</span>
          <h2 className="testimonials__title">
            Voices from the
            <br />
            <em>Amazigh community.</em>
          </h2>
          <p className="testimonials__subtitle">
            Thousands of learners are already on their Tamazight journey.
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`testimonials__card reveal delay-${i + 1}`}>
              <div className="testimonials__card-top">
                <div className="testimonials__stars" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <div className="testimonials__lang" aria-hidden="true">{t.lang}</div>
              </div>

              <blockquote className="testimonials__quote">
                <span className="testimonials__quote-mark" aria-hidden="true">"</span>
                {t.quote}
              </blockquote>

              <div className="testimonials__author">
                <div className="testimonials__avatar" aria-hidden="true">
                  {t.avatar}
                </div>
                <div>
                  <div className="testimonials__name">{t.name}</div>
                  <div className="testimonials__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community stats */}
        <div className="testimonials__stats reveal">
          <div className="testimonials__stat">
            <span className="testimonials__stat-num">10,000+</span>
            <span className="testimonials__stat-label">Active Learners</span>
          </div>
          <div className="testimonials__stat-sep" aria-hidden="true" />
          <div className="testimonials__stat">
            <span className="testimonials__stat-num">4.9 ★</span>
            <span className="testimonials__stat-label">Average Rating</span>
          </div>
          <div className="testimonials__stat-sep" aria-hidden="true" />
          <div className="testimonials__stat">
            <span className="testimonials__stat-num">40+</span>
            <span className="testimonials__stat-label">Countries</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
