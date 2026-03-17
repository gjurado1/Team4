import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Bell, LogOut, Menu, Settings, X, type LucideIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

type UserRole = 'patient' | 'caregiver';

interface DashboardSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ResponsiveDashboardLayoutProps {
  user: {
    name?: string;
  } | null;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  setCurrentSection: (section: string) => void;
  currentSection: string;
  sections: DashboardSection[];
  children: ReactNode;
  onLogout: () => void;
}

function RoleToggle({
  currentRole,
  onSelect,
  patientLabel,
  caregiverLabel,
  className = '',
}: {
  currentRole: UserRole;
  onSelect: (role: UserRole) => void;
  patientLabel: string;
  caregiverLabel: string;
  className?: string;
}) {
  return (
    <div className={`dashboard-role-toggle ${className}`.trim()}>
      <button
        type="button"
        className="dashboard-role-toggle__button"
        data-active={currentRole === 'patient'}
        onClick={() => onSelect('patient')}
      >
        {patientLabel}
      </button>
      <button
        type="button"
        className="dashboard-role-toggle__button"
        data-active={currentRole === 'caregiver'}
        onClick={() => onSelect('caregiver')}
      >
        {caregiverLabel}
      </button>
    </div>
  );
}

export function ResponsiveDashboardLayout({
  user,
  currentRole,
  setCurrentRole,
  setCurrentSection,
  currentSection,
  sections,
  children,
  onLogout,
}: ResponsiveDashboardLayoutProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentSection]);

  const userInitial = user?.name?.charAt(0).toUpperCase() || 'D';

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentSection('overview');
  };

  return (
    <div className={`dashboard-shell${mobileMenuOpen ? ' is-menu-open' : ''}`}>
      <button
        type="button"
        className="dashboard-overlay"
        onClick={() => setMobileMenuOpen(false)}
        aria-label="Close navigation menu"
      />

      <header className="dashboard-header">
        <div className="cc-container dashboard-header__inner">
          <div className="dashboard-header__group dashboard-header__group--stretch">
            <button
              type="button"
              className="dashboard-menu-button dashboard-mobile-only"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="cc-icon cc-icon--lg" aria-hidden="true" />
              ) : (
                <Menu className="cc-icon cc-icon--lg" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              className="dashboard-brand"
              onClick={() => navigate('/')}
              aria-label="CareConnect home"
            >
              <span className="dashboard-brand__mark">CC</span>
              <span className="dashboard-brand__text">CareConnect</span>
            </button>

            <RoleToggle
              currentRole={currentRole}
              onSelect={handleRoleSelect}
              patientLabel="Patient Portal"
              caregiverLabel="Caregiver Portal"
              className="dashboard-desktop-only"
            />
          </div>

          <div className="dashboard-header__group">
            <ThemeToggle />

            <button
              type="button"
              className="dashboard-icon-button dashboard-desktop-only"
              aria-label="Notifications"
            >
              <Bell className="cc-icon cc-icon--md" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="dashboard-user-chip"
              onClick={() => navigate('/profile')}
              aria-label="User profile"
            >
              <span className="cc-avatar cc-avatar--md">{userInitial}</span>
              <span className="dashboard-user-chip__name dashboard-desktop-only">
                {user?.name || 'Demo User'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <aside className="dashboard-sidebar">
        <div className="dashboard-mobile-only">
          <RoleToggle
            currentRole={currentRole}
            onSelect={handleRoleSelect}
            patientLabel="Patient"
            caregiverLabel="Caregiver"
          />
        </div>

        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className="dashboard-nav__button"
              data-active={currentSection === id}
              aria-current={currentSection === id ? 'page' : undefined}
              onClick={() => setCurrentSection(id)}
            >
              <Icon className="cc-icon cc-icon--md" aria-hidden="true" />
              <span className="dashboard-nav__label">{label}</span>
            </button>
          ))}

          <div className="cc-divider" />

          <button
            type="button"
            className="dashboard-nav__button"
            onClick={() => navigate('/settings')}
          >
            <Settings className="cc-icon cc-icon--md" aria-hidden="true" />
            <span className="dashboard-nav__label">Settings</span>
          </button>

          <button
            type="button"
            className="dashboard-nav__button"
            data-tone="danger"
            onClick={onLogout}
          >
            <LogOut className="cc-icon cc-icon--md" aria-hidden="true" />
            <span className="dashboard-nav__label">Logout</span>
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="cc-container">{children}</div>
      </main>
    </div>
  );
}
