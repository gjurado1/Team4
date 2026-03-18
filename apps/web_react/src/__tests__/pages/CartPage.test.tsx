import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { CartPage } from '../../app/pages/CartPage';
import { mockUser, mockCartItem, setUpUser, setUpCart } from '../helpers/renderWithProviders';
import { AuthProvider } from '../../app/contexts/AuthContext';
import { CartProvider } from '../../app/contexts/CartContext';

let mockNavigate: jest.Mock;

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

function renderPage() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <CartPage />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  mockNavigate = jest.fn();
});

describe('CartPage — unauthenticated', () => {
  it('redirects to /login when user is not authenticated', () => {
    renderPage();
    expect(mockNavigate).toHaveBeenCalledWith('/login', expect.any(Object));
  });
});

describe('CartPage — empty cart', () => {
  beforeEach(() => setUpUser(mockUser));

  it('shows "Your Cart is Empty" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument();
  });

  it('"View Pricing Plans" button calls navigate', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /view pricing plans/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/#pricing');
  });
});

describe('CartPage — with items', () => {
  beforeEach(() => {
    setUpUser(mockUser);
    setUpCart([mockCartItem]);
  });

  it('displays "Shopping Cart" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /shopping cart/i })).toBeInTheDocument();
  });

  it('shows item plan name', () => {
    renderPage();
    expect(screen.getByText(/professional plan/i)).toBeInTheDocument();
  });

  it('shows item description', () => {
    renderPage();
    expect(screen.getByText(mockCartItem.description)).toBeInTheDocument();
  });

  it('shows order summary with subtotal, tax, and total', () => {
    renderPage();
    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/tax/i)).toBeInTheDocument();
    expect(screen.getByText(/^total$/i)).toBeInTheDocument();
  });

  it('shows correct subtotal ($29.00)', () => {
    renderPage();
    expect(screen.getByText('$29.00')).toBeInTheDocument();
  });

  it('increases quantity when + button is clicked', async () => {
    const user = userEvent.setup();
    renderPage();
    const increaseBtn = screen.getByRole('button', { name: /increase quantity/i });
    await user.click(increaseBtn);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('decreases quantity when − button is clicked', async () => {
    const user = userEvent.setup();
    renderPage();
    const decreaseBtn = screen.getByRole('button', { name: /decrease quantity/i });
    await user.click(decreaseBtn);
    // quantity 1 → 0 removes the item, showing empty state
    expect(screen.getByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument();
  });

  it('removes item when Remove button is clicked', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /remove/i }));
    expect(screen.getByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument();
  });

  it('shows "Proceed to Checkout" button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
  });

  it('shows "Processing…" and disables checkout button during processing', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    renderPage();
    await user.click(screen.getByRole('button', { name: /proceed to checkout/i }));
    expect(screen.getByRole('button', { name: /processing/i })).toBeDisabled();
    jest.useRealTimers();
  });

  it('shows "Purchase Successful!" after checkout completes', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    renderPage();
    await user.click(screen.getByRole('button', { name: /proceed to checkout/i }));
    act(() => jest.advanceTimersByTime(2000));
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /purchase successful/i })).toBeInTheDocument()
    );
    jest.useRealTimers();
  });
});
