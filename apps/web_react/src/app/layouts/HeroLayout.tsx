import { Outlet } from 'react-router';

export function HeroLayout() {
  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
