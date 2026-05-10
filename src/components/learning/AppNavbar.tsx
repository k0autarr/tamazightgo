import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './AppNavbar.css';
import { getOverallStats } from '../../services/progressService';

const AppNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const stats = getOverallStats();

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/lessons',   label: 'Lessons' },
    { to: '/vocabulary',label: 'Vocabulary' },
    { to: '/progress',  label: 'Progress' },
  ];

  return (
    <nav className="app-nav" aria-label="App navigation">
      <div className="app-nav__inner">
        <Link to="/" className="app-nav__logo">
          <span className="app-nav__logo-sym" aria-hidden="true">ⵣ</span>
          <span className="app-nav__logo-text">TamazightGo</span>
        </Link>

        <div className={`app-nav__links${menuOpen ? ' app-nav__links--open' : ''}`}>
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `app-nav__link${isActive ? ' app-nav__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="app-nav__right">
          {stats.streakDays > 0 && (
            <div className="app-nav__streak" title="Current streak">
              🔥 {stats.streakDays}d
            </div>
          )}
          <div className="app-nav__progress-pill" title={`${stats.overallPercent}% complete`}>
            <div className="app-nav__progress-bar" style={{ width: `${stats.overallPercent}%` }} />
            <span>{stats.overallPercent}%</span>
          </div>
          <button
            className="app-nav__ham"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
