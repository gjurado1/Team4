import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomePage } from '../../app/pages/HomePage';
import { AuthProvider } from '../../app/contexts/AuthContext';
import { CartProvider } from '../../app/contexts/CartContext';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
}));

function renderPage() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <HomePage />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('HomePage', () => {
  it('renders the Hero section', () => {
    renderPage();
    expect(screen.getByRole('region', { name: /hero section/i })).toBeInTheDocument();
  });

  it('renders the Features section heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /better healthcare/i })).toBeInTheDocument();
  });

  it('renders the Pricing section heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /perfect plan/i })).toBeInTheDocument();
  });

  it('renders the Downloads section heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /download careconnect/i })).toBeInTheDocument();
  });

  it('renders the Resources section heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /get started/i })).toBeInTheDocument();
  });

  it('renders the Help section heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /how can we help/i })).toBeInTheDocument();
  });
});
