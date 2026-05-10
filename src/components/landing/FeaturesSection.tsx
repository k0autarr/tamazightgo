import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturesSection.css';

const features = [
  {
    icon: '📖',
    title: 'Structured Lessons',
    desc: '50+ carefully designed lessons from beginner to conversational. Each lesson builds on the last.',
    tag: '50+ lessons',
  },
  {
    icon: '🔊',
    title: 'Vocabulary & Pronunciation',
    desc: '1,200+ words with phonetic guides and audio. Learn to speak, not just read Tamazight.',
    tag: '1,200+ words',
  },
  {
    icon: '💬',
    title: 'Real Dialogues',
    desc: 'Practice authentic conversations — souks, family gatherings, travel, greetings, and more.',
    tag: 'Conversational',
  },
  {
    icon: '🏺',
    title: 'Culture Modules',
    desc: 'Explore Amazigh art, history, customs, and Moroccan traditions woven into every lesson.',
    tag: 'Immersive',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    desc: 'Track your streak, vocabulary growth, lesson completion, and celebrate every milestone.',
    tag: 'Motivating',
  },
  {
    icon: '📱',
    title: 'Mobile-First',
    desc: 'Learn anywhere — from the Atlas mountains to any corner of the world. Any device, any time.',
    tag: 'Any device',
  },
] as const;

const FeaturesSection: React.FC = () => {
  return (
    <section className="features" id="features">
      {/* Background pattern */}
      <div className="features__bg" aria-hidden="true" />

      <div className="container">
        <div className="features__header reveal">
          <span className="section-label">Features</span>
          <h2 className="features__title">
            Everything you need to
            <br />
            <em>master Tamazight.</em>
          </h2>
          <p className="features__subtitle">
            Designed from the ground up for Amazigh learners — structured, cultural, and effective.
          </p>
        </div>

        <div className="features__grid">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className={`features__card reveal delay-${(i % 3) + 1}`}
            >
              <div className="features__card-icon">{feat.icon}</div>
              <div className="features__card-body">
                <div className="features__card-top">
                  <h3 className="features__card-title">{feat.title}</h3>
                  <span className="features__card-tag">{feat.tag}</span>
                </div>
                <p className="features__card-desc">{feat.desc}</p>
              </div>
              <div className="features__card-shine" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Bottom CTA teaser */}
        <div className="features__cta reveal">
          <p className="features__cta-text">
            Ready to start learning Tamazight the right way?
          </p>
          <Link to="/lessons" className="features__cta-btn">
            Begin Your Journey
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
