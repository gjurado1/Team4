import { render, screen } from '@testing-library/react';
import { Dashboard } from '../../app/components/Dashboard';
import { MemoryRouter, Routes, Route } from 'react-router';

describe('Dashboard', () => {
  it('renders a container with overflow-auto and flex-1', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>,
    );
    const container = document.querySelector('.flex-1.overflow-auto');
    expect(container).toBeInTheDocument();
  });

  it('renders Outlet with child route content', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<span>Dashboard content</span>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('Dashboard content')).toBeInTheDocument();
  });
});
