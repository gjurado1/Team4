import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Activity, Calendar } from 'lucide-react';
import { ResponsiveDashboardLayout } from '../../app/components/ResponsiveDashboardLayout';

let mockNavigate: jest.Mock;
const mockSetCurrentRole = jest.fn();
const mockSetCurrentSection = jest.fn();
const mockOnLogout = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const testUser = { name: 'Morgan' };
const testSections = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
];

function renderLayout(currentRole: 'patient' | 'caregiver' = 'patient') {
  return render(
    <MemoryRouter>
      <ResponsiveDashboardLayout
        user={testUser}
        currentRole={currentRole}
        setCurrentRole={mockSetCurrentRole}
        setCurrentSection={mockSetCurrentSection}
        currentSection="overview"
        sections={testSections}
        onLogout={mockOnLogout}
      >
        <div data-testid="page-content">Dashboard content</div>
      </ResponsiveDashboardLayout>
    </MemoryRouter>
  );
}

beforeEach(() => {
  mockNavigate = jest.fn();
  mockSetCurrentRole.mockReset();
  mockSetCurrentSection.mockReset();
  mockOnLogout.mockReset();
});

describe('ResponsiveDashboardLayout', () => {
  it('renders children', () => {
    renderLayout();
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });

  it('renders the brand name', () => {
    renderLayout();
    expect(screen.getByText('CareConnect')).toBeInTheDocument();
  });

  it('brand button navigates to /', async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(screen.getByRole('button', { name: /careconnect home/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('user chip navigates to /profile', async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(screen.getByRole('button', { name: /user profile/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  it('mobile menu button toggles the menu open/closed', async () => {
    const user = userEvent.setup();
    renderLayout();
    const menuBtn = screen.getByRole('button', { name: /open navigation menu/i });
    await user.click(menuBtn);
    expect(screen.getAllByRole('button', { name: /close navigation menu/i })[0]).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: /close navigation menu/i })[1]);
    expect(screen.getByRole('button', { name: /open navigation menu/i })).toBeInTheDocument();
  });

  it('clicking "Appointments" nav button calls setCurrentSection', async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(screen.getByRole('button', { name: /^appointments$/i }));
    expect(mockSetCurrentSection).toHaveBeenCalledWith('appointments');
  });

  it('"Overview" nav button is marked as current page', () => {
    renderLayout();
    const overviewBtn = screen.getAllByRole('button', { name: /^overview$/i })[0];
    expect(overviewBtn).toHaveAttribute('aria-current', 'page');
  });

  it('"Patient Portal" role button calls setCurrentRole and resets section', async () => {
    const user = userEvent.setup();
    renderLayout('caregiver');
    // Find the desktop-only patient button in the header
    const patientBtns = screen.getAllByRole('button', { name: /patient portal/i });
    await user.click(patientBtns[0]);
    expect(mockSetCurrentRole).toHaveBeenCalledWith('patient');
    expect(mockSetCurrentSection).toHaveBeenCalledWith('overview');
  });

  it('"Caregiver Portal" role button calls setCurrentRole and resets section', async () => {
    const user = userEvent.setup();
    renderLayout('patient');
    const caregiverBtns = screen.getAllByRole('button', { name: /caregiver portal/i });
    await user.click(caregiverBtns[0]);
    expect(mockSetCurrentRole).toHaveBeenCalledWith('caregiver');
    expect(mockSetCurrentSection).toHaveBeenCalledWith('overview');
  });

  it('Logout button calls onLogout', async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(screen.getByRole('button', { name: /logout/i }));
    expect(mockOnLogout).toHaveBeenCalled();
  });

  it('Settings button navigates to /settings', async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(screen.getByRole('button', { name: /settings/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/settings');
  });
});
