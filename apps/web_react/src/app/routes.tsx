import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { HeroLayout } from './layouts/HeroLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { RoleSelection } from './pages/RoleSelection';
import { ProfilePage } from './pages/ProfilePage';
import { CartPage } from './pages/CartPage';
import { Dashboard } from './pages/Dashboard';
import { SettingsPage } from './pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HeroLayout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
    ],
  },
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        path: 'role-selection',
        Component: RoleSelection,
      },
      {
        path: 'dashboard',
        Component: Dashboard,
      },
      {
        path: 'profile',
        Component: ProfilePage,
      },
      {
        path: 'settings',
        Component: SettingsPage,
      },
      {
        path: 'cart',
        Component: CartPage,
      },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignupPage,
  },
]);