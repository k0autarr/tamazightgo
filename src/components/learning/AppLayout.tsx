import React from 'react';
import AppNavbar from './AppNavbar';
import './AppLayout.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <div className="app-layout">
    <AppNavbar />
    <main className="app-layout__main">
      {children}
    </main>
    <footer className="app-layout__footer">
      <div className="container">
        <span className="app-layout__footer-brand">
          <span aria-hidden="true">ⵣ</span> TamazightGo — Learn Tamazight, connect with Amazigh Morocco.
        </span>
      </div>
    </footer>
  </div>
);

export default AppLayout;
