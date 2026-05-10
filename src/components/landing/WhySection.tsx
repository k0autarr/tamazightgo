import React from 'react';
import './WhySection.css';

const cards = [
  {
    icon: 'ⵣ',
    iconType: 'tifinagh',
    title: 'Preserve Heritage',
    desc: 'Amazigh language is one of the oldest living languages on earth. Learning it is an act of cultural preservation and pride.',
    color: 'primary',
  },
  {
    icon: '📖',
    iconType: 'emoji',
    title: 'Structured Learning',
    desc: 'Begin from zero with carefully designed beginner lessons. Progress step by step at your own pace, with clear milestones.',
    color: 'secondary',
  },
  {
    icon: '💬',
    iconType: 'emoji',
    title: 'Daily Conversations',
    desc: 'Learn phrases you will actually use — greetings, markets, family, food, directions — real Moroccan Amazigh life.',
    color: 'gold',
  },
  {
    icon: '🏔',
    iconType: 'emoji',
    title: 'Cultural Context',
    desc: 'Language lives through culture. Every lesson is woven with Moroccan traditions, Atlas landscapes, and Amazigh identity.',
    color: 'green',
  },
] as const;

const WhySection: React.FC = () => {
  return (
    <section className="why" id="why">
      <div className="container">
        <div className="why__header reveal">
          <span className="section-label">Why TamazightGo</span>
          <h2 className="why__title">
            More than language.
            <br />
            <em>A cultural journey.</em>
          </h2>
          <p className="why__subtitle">
            TamazightGo was built to make Amazigh accessible — for diaspora reconnecting with roots,
            for learners curious about Morocco, for anyone who feels the call of the Atlas.
          </p>
        </div>

        <div className="why__grid">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`why__card why__card--${card.color} reveal delay-${i + 1}`}
            >
              <div className={`why__card-icon why__card-icon--${card.iconType}`}>
                {card.icon}
              </div>
              <h3 className="why__card-title">{card.title}</h3>
              <p className="why__card-desc">{card.desc}</p>
              <div className="why__card-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.75 9H14.25M14.25 9L10.5 5.25M14.25 9L10.5 12.75"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
