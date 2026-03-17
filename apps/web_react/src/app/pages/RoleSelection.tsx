import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Heart, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function RoleSelection() {
  const navigate = useNavigate();
  const { user, setUserRole } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleRoleSelect = (role: 'patient' | 'caregiver') => {
    setUserRole?.(role);
    navigate('/dashboard');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="cc-page selection-page">
      <div className="app-ambient-grid" aria-hidden="true" />
      <div className="app-orb app-orb--primary" aria-hidden="true" />
      <div className="app-orb app-orb--secondary" aria-hidden="true" />

      <div className="selection-page__content">
        <header className="selection-page__header">
          <h1 className="dashboard-page__title">Welcome, {user.name}!</h1>
          <p className="landing-page__subtitle">How would you like to use CareConnect today?</p>
        </header>

        <div className="selection-page__grid">
          <button
            type="button"
            className="selection-card"
            data-tone="info"
            onClick={() => handleRoleSelect('patient')}
          >
            <span className="selection-card__icon">
              <Heart className="cc-icon cc-icon--xl" aria-hidden="true" />
            </span>
            <h2 className="selection-card__title">Patient Portal</h2>
            <p className="selection-card__text">
              Manage your health journey with appointments, medication tracking, and daily
              check-ins.
            </p>
            <ul className="selection-card__list">
              {['Schedule appointments', 'Track medications', 'Log health check-ins', 'View medical records'].map((feature) => (
                <li key={feature} className="selection-card__list-item">
                  <span className="selection-card__list-dot" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <span className="selection-card__cta">
              <span>Continue as Patient</span>
              <ArrowRight className="cc-icon cc-icon--md" aria-hidden="true" />
            </span>
          </button>

          <button
            type="button"
            className="selection-card"
            data-tone="secondary"
            onClick={() => handleRoleSelect('caregiver')}
          >
            <span className="selection-card__icon">
              <Users className="cc-icon cc-icon--xl" aria-hidden="true" />
            </span>
            <h2 className="selection-card__title">Caregiver Portal</h2>
            <p className="selection-card__text">
              Monitor and coordinate care for patients with shared health data and oversight tools.
            </p>
            <ul className="selection-card__list">
              {['Manage patient list', 'View medical data', 'Coordinate appointments', 'Track patient progress'].map((feature) => (
                <li key={feature} className="selection-card__list-item">
                  <span className="selection-card__list-dot" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <span className="selection-card__cta">
              <span>Continue as Caregiver</span>
              <ArrowRight className="cc-icon cc-icon--md" aria-hidden="true" />
            </span>
          </button>
        </div>

        <p className="selection-page__note">
          You can switch between portals any time from your dashboard.
        </p>
      </div>
    </div>
  );
}
