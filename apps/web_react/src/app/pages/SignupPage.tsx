import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { AlertCircle, ArrowLeft, Lock, Mail, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      await signup(email, password, name);
      navigate('/role-selection', { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cc-page auth-page">
      <div className="auth-page__backdrop" data-tone="secondary" aria-hidden="true" />

      <div className="auth-shell">
        <Link to="/" className="auth-back">
          <ArrowLeft className="cc-icon cc-icon--md" aria-hidden="true" />
          <span>Back to home</span>
        </Link>

        <div className="cc-card auth-card">
          <div className="auth-card__brand">
            <div className="auth-card__brand-mark">CC</div>
          </div>

          <h1 className="auth-card__title">Create Your Account</h1>
          <p className="auth-card__subtitle">
            Join CareConnect and start managing your health.
          </p>

          {error ? (
            <div className="auth-error" role="alert">
              <AlertCircle className="cc-icon cc-icon--md" aria-hidden="true" />
              <p>{error}</p>
            </div>
          ) : null}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="name" className="auth-label">
                Full Name
              </label>
              <div className="auth-input-wrap">
                <UserIcon className="auth-input-icon cc-icon cc-icon--md" aria-hidden="true" />
                <input
                  id="name"
                  className="auth-input"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="email" className="auth-label">
                Email Address
              </label>
              <div className="auth-input-wrap">
                <Mail className="auth-input-icon cc-icon cc-icon--md" aria-hidden="true" />
                <input
                  id="email"
                  className="auth-input"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <div className="auth-input-wrap">
                <Lock className="auth-input-icon cc-icon cc-icon--md" aria-hidden="true" />
                <input
                  id="password"
                  className="auth-input"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="confirmPassword" className="auth-label">
                Confirm Password
              </label>
              <div className="auth-input-wrap">
                <Lock className="auth-input-icon cc-icon cc-icon--md" aria-hidden="true" />
                <input
                  id="confirmPassword"
                  className="auth-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <button type="submit" className="cc-btn cc-btn--primary cc-btn--wide" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
