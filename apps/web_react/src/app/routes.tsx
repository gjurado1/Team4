import type { ComponentType } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router';

function lazyComponent<TModule extends Record<string, unknown>>(
  loader: () => Promise<TModule>,
  exportName: keyof TModule,
) {
  return async () => {
    const module = await loader();

    return {
      Component: module[exportName] as ComponentType,
    };
  };
}

const routes: RouteObject[] = [
  {
    path: '/',
    lazy: lazyComponent(() => import('./layouts/HeroLayout'), 'HeroLayout'),
    children: [
      {
        index: true,
        lazy: lazyComponent(() => import('./pages/LandingPage'), 'LandingPage'),
      },
    ],
  },
  {
    path: '/',
    lazy: lazyComponent(() => import('./layouts/RootLayout'), 'RootLayout'),
    children: [
      {
        path: 'role-selection',
        lazy: lazyComponent(() => import('./pages/RoleSelection'), 'RoleSelection'),
      },
      {
        path: 'dashboard',
        lazy: lazyComponent(() => import('./pages/Dashboard'), 'Dashboard'),
      },
      {
        path: 'profile',
        lazy: lazyComponent(() => import('./pages/ProfilePage'), 'ProfilePage'),
      },
      {
        path: 'settings',
        lazy: lazyComponent(() => import('./pages/SettingsPage'), 'SettingsPage'),
      },
      {
        path: 'cart',
        lazy: lazyComponent(() => import('./pages/CartPage'), 'CartPage'),
      },
    ],
  },
  {
    path: '/login',
    lazy: lazyComponent(() => import('./pages/LoginPage'), 'LoginPage'),
  },
  {
    path: '/signup',
    lazy: lazyComponent(() => import('./pages/SignupPage'), 'SignupPage'),
  },
];

const basename =
  import.meta.env.BASE_URL === '/'
    ? '/'
    : import.meta.env.BASE_URL.replace(/\/$/, '');

export const router = createBrowserRouter(routes, { basename });
