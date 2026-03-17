import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, Check, Menu, Save, X, type LucideIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface SettingsSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ResponsiveSettingsLayoutProps {
  user: {
    name?: string;
  } | null;
  activeSection: string;
  setActiveSection: (section: string) => void;
  sections: SettingsSection[];
  content: ReactNode;
  handleSaveSettings: () => void;
  saved: boolean;
}

export function ResponsiveSettingsLayout({
  user,
  activeSection,
  setActiveSection,
  sections,
  content,
  handleSaveSettings,
  saved,
}: ResponsiveSettingsLayoutProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeSection]);

  const activeLabel = sections.find((section) => section.id === activeSection)?.label ?? 'Settings';
  const userInitial = user?.name?.charAt(0).toUpperCase() || 'D';

  return (
    <div className={`settings-shell${mobileMenuOpen ? ' is-menu-open' : ''}`}>
      <button
        type="button"
        className="settings-overlay"
        onClick={() => setMobileMenuOpen(false)}
        aria-label="Close settings menu"
      />

      <header className="settings-header">
        <div className="cc-container settings-header__inner">
          <div className="settings-header__group">
            <button
              type="button"
              className="settings-menu-button dashboard-mobile-only"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Close settings menu' : 'Open settings menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="cc-icon cc-icon--lg" aria-hidden="true" />
              ) : (
                <Menu className="cc-icon cc-icon--lg" aria-hidden="true" />
              )}
            </button>

            <button type="button" className="cc-btn cc-btn--secondary dashboard-desktop-only" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="cc-icon cc-icon--sm" aria-hidden="true" />
              <span>Back to Dashboard</span>
            </button>

            <button type="button" className="dashboard-brand" onClick={() => navigate('/')} aria-label="CareConnect home">
              <span className="dashboard-brand__mark">CC</span>
              <span className="dashboard-brand__text">CareConnect</span>
            </button>
          </div>

          <div className="settings-header__group">
            <ThemeToggle />
            <button type="button" className="settings-icon-button dashboard-desktop-only" aria-label="Notifications">
              <Bell className="cc-icon cc-icon--md" aria-hidden="true" />
            </button>
            <div className="dashboard-user-chip">
              <span className="cc-avatar cc-avatar--md">{userInitial}</span>
              <span className="dashboard-user-chip__name dashboard-desktop-only">
                {user?.name || 'Demo User'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <aside className="settings-sidebar">
        <button type="button" className="cc-btn cc-btn--secondary dashboard-mobile-only" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="cc-icon cc-icon--sm" aria-hidden="true" />
          <span>Back to Dashboard</span>
        </button>

        <h3 className="settings-sidebar__title">Settings</h3>

        <nav className="settings-nav" aria-label="Settings sections">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className="settings-nav__button"
              data-active={activeSection === id}
              aria-current={activeSection === id ? 'page' : undefined}
              onClick={() => setActiveSection(id)}
            >
              <Icon className="cc-icon cc-icon--md" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="settings-main">
        <div className="settings-shell__content">
          <header className="settings-page__header">
            <h1 className="settings-page__title">Settings</h1>
            <p className="settings-page__subtitle">
              Manage your preferences, accessibility options, and privacy settings.
            </p>
          </header>

          <div className="settings-layout">
            <section className="settings-content">
              <div className="cc-card settings-panel">
                <h2 className="settings-panel__title">{activeLabel}</h2>
                {content}
              </div>

              <div className="settings-actions">
                <button type="button" className="cc-btn cc-btn--primary" onClick={handleSaveSettings}>
                  <Save className="cc-icon cc-icon--md" aria-hidden="true" />
                  <span>Save Settings</span>
                </button>

                {saved ? (
                  <div className="settings-saved">
                    <Check className="cc-icon cc-icon--sm" aria-hidden="true" />
                    <span>Settings saved!</span>
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
