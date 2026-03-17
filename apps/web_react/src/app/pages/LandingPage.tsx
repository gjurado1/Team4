import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="cc-page landing-page">
      <div className="app-ambient-grid" aria-hidden="true" />
      <div className="app-orb app-orb--primary" aria-hidden="true" />
      <div className="app-orb app-orb--secondary" aria-hidden="true" />

      <div className="landing-page__content">
        <div className="landing-page__brand">
          <div className="landing-page__brand-mark" aria-hidden="true" />
          <span className="cc-eyebrow">CareConnect</span>
        </div>

        <h1 className="landing-page__title">
          <span className="landing-page__title-line">Your Health</span>
          <span className="landing-page__title-line landing-page__title-line--gradient">Connected</span>
        </h1>

        <p className="landing-page__subtitle">
          A comprehensive healthcare portal for patients and caregivers to manage appointments,
          medications, and health data in one secure place.
        </p>

        <div className="landing-page__actions">
          <button
            type="button"
            className="cc-btn cc-btn--primary"
            onClick={() => navigate('/login')}
          >
            <span>Get Started</span>
            <ArrowRight className="cc-icon cc-icon--xl" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
