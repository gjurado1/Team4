import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get the page user was trying to access before being redirected to login
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Redirect to the page they were trying to access, or home
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-5)',
        background: 'var(--color-bg)',
        position: 'relative',
      }}
    >
      {/* Background Gradient */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Back Button */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            marginBottom: 'var(--space-6)',
            fontSize: 'var(--font-size-body)',
            transition: 'color var(--duration-fast) var(--ease-standard)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-text)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-muted)';
          }}
        >
          <ArrowLeft size={20} />
          Back to home
        </Link>

        {/* Login Card */}
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 'var(--space-6)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                background: 'var(--btn-primary-bg)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.75rem',
                color: 'var(--btn-primary-fg)',
                boxShadow: '0 0 24px rgba(59, 130, 246, 0.5)',
              }}
            >
              CC
            </div>
          </div>

          <h1
            style={{
              fontSize: 'var(--font-size-h2)',
              fontWeight: 800,
              color: 'var(--color-text)',
              textAlign: 'center',
              marginBottom: 'var(--space-2)',
            }}
          >
            Welcome Back
          </h1>

          <p
            style={{
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
              textAlign: 'center',
              marginBottom: 'var(--space-6)',
            }}
          >
            Sign in to access your CareConnect account
          </p>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                padding: 'var(--space-4)',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-5)',
              }}
            >
              <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: '#ef4444',
                  margin: 0,
                }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={20}
                  style={{
                    position: 'absolute',
                    left: 'var(--space-4)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-text-muted)',
                    pointerEvents: 'none',
                  }}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: 'var(--space-4) var(--space-4) var(--space-4) var(--space-10)',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    transition: 'all var(--duration-fast) var(--ease-standard)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand-primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={20}
                  style={{
                    position: 'absolute',
                    left: 'var(--space-4)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-text-muted)',
                    pointerEvents: 'none',
                  }}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: 'var(--space-4) var(--space-4) var(--space-4) var(--space-10)',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    transition: 'all var(--duration-fast) var(--ease-standard)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand-primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: 'var(--space-4)',
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-fg)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-body)',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all var(--duration-fast) var(--ease-standard)',
                opacity: isLoading ? 0.6 : 1,
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = 'var(--btn-primary-hover-bg)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--btn-primary-bg)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '3px solid var(--color-brand-primary)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div
            style={{
              marginTop: 'var(--space-6)',
              textAlign: 'center',
              fontSize: 'var(--font-size-body)',
              color: 'var(--color-text-muted)',
            }}
          >
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: 'var(--color-brand-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color var(--duration-fast) var(--ease-standard)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-link-hover)';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-brand-primary)';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Sign up
            </Link>
          </div>

          {/* Demo Credentials */}
          <div
            style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-4)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <p
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-text-muted)',
                margin: 0,
                marginBottom: 'var(--space-2)',
                fontWeight: 600,
              }}
            >
              Demo Account:
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-text-muted)',
                margin: 0,
                fontFamily: 'monospace',
              }}
            >
              Email: demo@careconnect.com<br />
              Password: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
