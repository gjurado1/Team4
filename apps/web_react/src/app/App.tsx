import '@/styles/fonts.css';
import '@/styles/theme.css';
import '@/styles/tokens.css';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { router } from './routes';
import { applyStoredAccessibilitySettings } from './utils/accessibility';

function RouterFallback() {
  return (
    <div className="app-route-loading" role="status" aria-live="polite">
      <div className="app-route-loading__card">
        <p className="app-route-loading__eyebrow">Loading</p>
        <h1 className="app-route-loading__title">Preparing CareConnect</h1>
        <p className="app-route-loading__text">Fetching the next screen and assets.</p>
      </div>
    </div>
  );
}

export default function App() {
  // Initialize theme on mount (prevents flash)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Initialize demo user if none exists
    const usersJson = localStorage.getItem('careconnect_users');
    if (!usersJson) {
      const demoUser = {
        id: 'demo_user_1',
        email: 'demo@careconnect.com',
        password: 'demo123',
        name: 'Demo User',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('careconnect_users', JSON.stringify([demoUser]));
    }

    applyStoredAccessibilitySettings();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} fallbackElement={<RouterFallback />} />
      </CartProvider>
    </AuthProvider>
  );
}
