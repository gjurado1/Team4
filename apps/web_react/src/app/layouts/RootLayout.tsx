import { Outlet } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function RootLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 9999,
          padding: 'var(--space-3) var(--space-5)',
          background: 'var(--btn-primary-bg)',
          color: 'var(--btn-primary-fg)',
          textDecoration: 'none',
          borderRadius: 'var(--radius-md)',
          fontWeight: 600,
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = 'var(--space-4)';
          e.currentTarget.style.top = 'var(--space-4)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = '-9999px';
        }}
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
