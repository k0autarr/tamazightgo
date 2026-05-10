import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} aria-label="Main navigation">
      <div className="navbar__inner">
        <a href="/" className="navbar__logo" aria-label="TamazightGo home">
          <span className="navbar__logo-symbol" aria-hidden="true">ⵣ</span>
          <span className="navbar__logo-text">TamazightGo</span>
        </a>

        <div className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <a href="#why"      className="navbar__link" onClick={closeMenu}>Why TamazightGo</a>
          <a href="#features" className="navbar__link" onClick={closeMenu}>Features</a>
          <a href="#culture"  className="navbar__link" onClick={closeMenu}>Culture</a>
          <a href="#lessons"  className="navbar__link" onClick={closeMenu}>Lessons</a>
          <div className="navbar__actions navbar__actions--mobile">
            <Link to="/dashboard" className="navbar__btn navbar__btn--outline" onClick={closeMenu}>Log In</Link>
            <Link to="/dashboard" className="navbar__btn navbar__btn--primary" onClick={closeMenu}>Start Free</Link>
          </div>
        </div>

        <div className="navbar__actions navbar__actions--desktop">
          <Link to="/dashboard" className="navbar__btn navbar__btn--outline">Log In</Link>
          <Link to="/dashboard" className="navbar__btn navbar__btn--primary">Start Free</Link>
        </div>

        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
