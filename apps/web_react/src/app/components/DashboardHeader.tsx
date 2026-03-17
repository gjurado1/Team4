import React from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';

export function DashboardHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="dashboard-topbar" role="banner">
      <nav className="dashboard-topbar__inner" aria-label="Dashboard navigation">
        <button type="button" className="dashboard-topbar__brand" onClick={() => navigate('/')} aria-label="CareConnect home">
          <span className="site-nav__brand-mark" aria-hidden="true">
            CC
          </span>
          <span className="site-nav__brand-text">CareConnect</span>
        </button>

        <div className="dashboard-topbar__actions">
          <ThemeToggle />

          <button type="button" className="dashboard-topbar__icon-button dashboard-topbar__notification" aria-label="Notifications">
            <Bell className="cc-icon cc-icon--md" aria-hidden="true" />
            <span className="dashboard-topbar__notification-dot" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="dashboard-topbar__user-button"
            onClick={() => navigate('/profile')}
            aria-label="User profile"
          >
            <span className="dashboard-topbar__avatar">{user?.name?.charAt(0).toUpperCase() || 'D'}</span>
            <span className="dashboard-topbar__name">{user?.name || 'Demo User'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
