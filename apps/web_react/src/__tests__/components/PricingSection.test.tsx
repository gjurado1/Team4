import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { PricingSection } from '../../app/components/PricingSection';
import { AuthProvider } from '../../app/contexts/AuthContext';
import { CartProvider } from '../../app/contexts/CartContext';
import { setUpUser, mockUser } from '../helpers/renderWithProviders';

let mockNavigate: jest.Mock;

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

function renderSection(authenticated = false) {
  if (authenticated) setUpUser(mockUser);
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <PricingSection />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  mockNavigate = jest.fn();
});

describe('PricingSection', () => {
  it('renders all three plan names', () => {
    renderSection();
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('shows "Most Popular" badge on Professional plan', () => {
    renderSection();
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('Basic "Get Started" button navigates to /signup', async () => {
    const user = userEvent.setup();
    renderSection();
    await user.click(screen.getByRole('button', { name: /get started for basic plan/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });

  it('Professional "Start Free Trial" when unauthenticated navigates to /signup', async () => {
    const user = userEvent.setup();
    renderSection(false);
    await user.click(screen.getByRole('button', { name: /start free trial for professional plan/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });

  it('Professional "Start Free Trial" when authenticated adds to cart and navigates to /cart', async () => {
    const user = userEvent.setup();
    renderSection(true);
    await user.click(screen.getByRole('button', { name: /start free trial for professional plan/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
    // Verify item was added to cart via localStorage
    const cart = JSON.parse(localStorage.getItem('careconnect_cart') ?? '[]');
    expect(cart.some((item: { planName: string }) => item.planName === 'Professional')).toBe(true);
  });

  it('Enterprise "Contact Sales" sets window.location.hash to #help', async () => {
    const user = userEvent.setup();
    renderSection();
    await user.click(screen.getByRole('button', { name: /contact sales for enterprise plan/i }));
    expect(window.location.hash).toBe('#help');
  });

  it('renders feature lists for each plan', () => {
    renderSection();
    expect(screen.getByText('Health records storage')).toBeInTheDocument();
    expect(screen.getByText('Family account sharing up to 5 users')).toBeInTheDocument();
    expect(screen.getByText('Unlimited users')).toBeInTheDocument();
  });
});
