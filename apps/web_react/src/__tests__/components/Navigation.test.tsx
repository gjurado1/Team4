import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Navigation } from '../../app/components/Navigation';
import { AuthProvider } from '../../app/contexts/AuthContext';
import { CartProvider } from '../../app/contexts/CartContext';
import { setUpUser, setUpCart, mockUser, mockCartItem } from '../helpers/renderWithProviders';

let mockNavigate: jest.Mock;

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
}));

function renderNav(authenticated = false, withCartItems = false) {
  if (authenticated) setUpUser(mockUser);
  if (withCartItems) setUpCart([mockCartItem]);
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <Navigation />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  mockNavigate = jest.fn();
});

describe('Navigation', () => {
  it('renders "CareConnect" brand text', () => {
    renderNav();
    expect(screen.getByText('CareConnect')).toBeInTheDocument();
  });

  it('brand button navigates to /', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: /careconnect home/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('renders all navigation items', () => {
    renderNav();
    ['Home', 'Features', 'Pricing', 'Downloads', 'Resources', 'Help'].forEach((label) => {
      expect(screen.getAllByRole('button', { name: new RegExp(label, 'i') })[0]).toBeInTheDocument();
    });
  });

  it('search button opens the search input', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: /open search/i }));
    expect(screen.getByRole('textbox', { name: /search features/i })).toBeInTheDocument();
  });

  it('typing in search shows matching results', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: /open search/i }));
    await user.type(screen.getByRole('textbox', { name: /search features/i }), 'basic');
    expect(screen.getByText('Basic Plan')).toBeInTheDocument();
  });

  it('typing non-matching query shows "No results found"', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: /open search/i }));
    await user.type(screen.getByRole('textbox', { name: /search features/i }), 'xyzxyzxyz');
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('close search button closes the search input', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: /open search/i }));
    await user.click(screen.getAllByRole('button', { name: /close search/i })[0]);
    expect(screen.queryByRole('textbox', { name: /search features/i })).not.toBeInTheDocument();
  });

  it('Escape key closes the open search', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: /open search/i }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('textbox', { name: /search features/i })).not.toBeInTheDocument();
  });

  it('mobile menu button opens the mobile drawer', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('dialog', { name: /mobile navigation menu/i })).toBeInTheDocument();
  });

  it('mobile menu button toggles aria-expanded', async () => {
    const user = userEvent.setup();
    renderNav();
    const menuBtn = screen.getByRole('button', { name: /open menu/i });
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    await user.click(menuBtn);
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('Escape key closes the open mobile menu', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: /open menu/i }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /mobile navigation menu/i })).not.toBeInTheDocument();
  });

  it('cart button navigates to /cart', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: /shopping cart/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });

  it('shows cart badge when items exist', () => {
    renderNav(false, true);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('user button navigates to /login when unauthenticated', async () => {
    const user = userEvent.setup();
    renderNav(false);
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('user button navigates to /profile when authenticated', async () => {
    const user = userEvent.setup();
    renderNav(true);
    await user.click(screen.getByRole('button', { name: /user profile/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });
});
