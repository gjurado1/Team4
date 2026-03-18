import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { HeroLayout } from '../../app/layouts/HeroLayout';

function renderLayout() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<HeroLayout />}>
          <Route path="/" element={<p data-testid="outlet-content">Hero page content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('HeroLayout', () => {
  it('renders the "Skip to main content" skip link', () => {
    renderLayout();
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders the main content area', () => {
    renderLayout();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders outlet content via child route', () => {
    renderLayout();
    expect(screen.getByTestId('outlet-content')).toBeInTheDocument();
  });
});
