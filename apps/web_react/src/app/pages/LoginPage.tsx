import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { AlertCircle, ArrowLeft, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError('Email address is required');
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setError('Enter a valid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setIsLoading(true);

    try {
      await login(normalizedEmail, password);
      navigate('/role-selection', { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cc-page auth-page">
      <div className="auth-page__backdrop" data-tone="info" aria-hidden="true" />

      <div className="auth-shell">
        <Link to="/" className="auth-back">
          <ArrowLeft className="cc-icon cc-icon--md" aria-hidden="true" />
          <span>Back to home</span>
        </Link>

        <div className="cc-card auth-card">
          <div className="auth-card__brand">
            <div className="auth-card__brand-mark">CC</div>
          </div>

          <h1 className="auth-card__title">Welcome Back</h1>
          <p className="auth-card__subtitle">Sign in to access your CareConnect account.</p>

          {error ? (
            <div className="auth-error" role="alert">
              <AlertCircle className="cc-icon cc-icon--md" aria-hidden="true" />
              <p>{error}</p>
            </div>
          ) : null}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <div className="auth-input-wrap auth-input-wrap--floating">
                <Mail className="auth-input-icon cc-icon cc-icon--md" aria-hidden="true" />
                <input
                  id="email"
                  className="auth-input auth-input--floating"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder=" "
                  autoComplete="email"
                  required
                />
                <label htmlFor="email" className="auth-floating-label">
                  Email Address
                </label>
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-input-wrap auth-input-wrap--floating">
                <Lock className="auth-input-icon cc-icon cc-icon--md" aria-hidden="true" />
                <input
                  id="password"
                  className="auth-input auth-input--floating"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder=" "
                  autoComplete="current-password"
                  required
                />
                <label htmlFor="password" className="auth-floating-label">
                  Password
                </label>
              </div>
            </div>

            <button type="submit" className="cc-btn cc-btn--primary cc-btn--wide" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </div>

          <div className="auth-note">
            <p className="auth-note__title">Demo Account</p>
            <p className="auth-note__body">
              Email: demo@careconnect.com
              <br />
              Password: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
