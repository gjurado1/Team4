import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../../app/contexts/AuthContext';
import { CartProvider } from '../../app/contexts/CartContext';
import { PwaInstallProvider } from '../../app/contexts/PwaInstallContext';
import type { CartItem } from '../../app/contexts/CartContext';

export const mockUser = {
  id: 'user_test_1',
  email: 'test@example.com',
  name: 'Test User',
  createdAt: new Date('2024-01-01').toISOString(),
};

export const mockPatientUser = { ...mockUser, role: 'patient' as const };
export const mockCaregiverUser = { ...mockUser, role: 'caregiver' as const };

export const mockCartItem: CartItem = {
  id: 'plan-professional',
  planName: 'Professional',
  price: '29',
  period: 'per month',
  description: 'Advanced features for comprehensive health monitoring',
  features: ['Everything in Basic', 'Family sharing'],
  quantity: 1,
  addedAt: new Date('2024-01-01').toISOString(),
};

export function setUpUser(user = mockUser) {
  localStorage.setItem('careconnect_user', JSON.stringify(user));
  localStorage.setItem(
    'careconnect_users',
    JSON.stringify([{ ...user, password: 'pass123' }])
  );
}

export function setUpCart(items: CartItem[] = [mockCartItem]) {
  localStorage.setItem('careconnect_cart', JSON.stringify(items));
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

export function renderWithProviders(
  ui: React.ReactElement,
  { initialEntries = ['/'], ...options }: RenderWithProvidersOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        <PwaInstallProvider>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </PwaInstallProvider>
      </MemoryRouter>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}
