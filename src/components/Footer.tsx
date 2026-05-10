import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <a href="/" className="footer__logo">
                <span className="footer__logo-symbol">ⵣ</span>
                <span className="footer__logo-text">TamazightGo</span>
              </a>
              <p className="footer__tagline">
                Learn Tamazight. Connect with Amazigh Morocco.
              </p>
              <p className="footer__tifinagh" aria-label="Amazigh in Tifinagh script">
                ⴰⵎⴰⵣⵉⵖ ⵏ ⵍⵎⵖⵔⵉⴱ
              </p>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Learn</h4>
              <ul className="footer__links">
                <li><a href="#" className="footer__link">Beginner Lessons</a></li>
                <li><a href="#" className="footer__link">Vocabulary</a></li>
                <li><a href="#" className="footer__link">Daily Conversations</a></li>
                <li><a href="#" className="footer__link">Cultural Stories</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Explore</h4>
              <ul className="footer__links">
                <li><a href="#" className="footer__link">Amazigh Culture</a></li>
                <li><a href="#" className="footer__link">Tifinagh Script</a></li>
                <li><a href="#" className="footer__link">Moroccan Heritage</a></li>
                <li><a href="#" className="footer__link">Atlas Traditions</a></li>
              </ul>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Company</h4>
              <ul className="footer__links">
                <li><a href="#" className="footer__link">About Us</a></li>
                <li><a href="#" className="footer__link">Blog</a></li>
                <li><a href="#" className="footer__link">Privacy Policy</a></li>
                <li><a href="#" className="footer__link">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p className="footer__copy">
              &copy; {year} TamazightGo. Made with pride for Amazigh heritage.
            </p>
            <div className="footer__pattern" aria-hidden="true">
              {['ⵣ','ⴰ','ⵎ','ⴱ','ⵙ','ⵏ'].map((ch, i) => (
                <span key={i} className="footer__pattern-char">{ch}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
