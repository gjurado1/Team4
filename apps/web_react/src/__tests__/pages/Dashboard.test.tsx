import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Dashboard } from '../../app/pages/Dashboard';

let mockNavigate: jest.Mock;
const mockLogout = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

function makeAuthMock(role: 'patient' | 'caregiver') {
  return {
    user: {
      id: 'user_1',
      email: 'test@example.com',
      name: 'Sam',
      createdAt: new Date().toISOString(),
      role,
    },
    logout: mockLogout,
  };
}

const mockAuth = { current: makeAuthMock('patient') };

jest.mock('../../app/contexts/AuthContext', () => ({
  useAuth: () => mockAuth.current,
}));

function renderPage() {
  return render(<Dashboard />, {
    wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
  });
}

beforeEach(() => {
  mockNavigate = jest.fn();
  mockLogout.mockReset();
  mockAuth.current = makeAuthMock('patient');
});

describe('Dashboard — patient', () => {
  it('renders the patient welcome heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /welcome back, sam/i })).toBeInTheDocument();
  });

  it('shows "Upcoming Appointments" stat card', () => {
    renderPage();
    expect(screen.getByText(/upcoming appointments/i)).toBeInTheDocument();
  });

  it('shows "Active Medications" stat card', () => {
    renderPage();
    expect(screen.getByText(/active medications/i)).toBeInTheDocument();
  });

  it('shows Overview nav item as active by default', () => {
    renderPage();
    const overviewBtn = screen.getByRole('button', { name: /^overview$/i });
    expect(overviewBtn).toHaveAttribute('aria-current', 'page');
  });

  it('navigating to Appointments shows appointment list', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /^appointments$/i }));
    expect(screen.getByRole('heading', { name: /^appointments$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /new appointment/i })).toBeInTheDocument();
  });

  it('navigating to Medications shows medication list', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /^medications$/i }));
    expect(screen.getByRole('heading', { name: /^medications$/i })).toBeInTheDocument();
  });

  it('navigating to Check-ins shows check-in list', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /^check-ins$/i }));
    expect(screen.getByRole('heading', { name: /^check-ins$/i })).toBeInTheDocument();
  });
});

describe('Dashboard — caregiver', () => {
  beforeEach(() => {
    mockAuth.current = makeAuthMock('caregiver');
  });

  it('renders the caregiver dashboard heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /caregiver dashboard/i })).toBeInTheDocument();
  });

  it('shows "Total Patients" stat card', () => {
    renderPage();
    expect(screen.getByText(/total patients/i)).toBeInTheDocument();
  });

  it('navigating to My Patients shows patient cards', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /my patients/i }));
    expect(screen.getByRole('heading', { name: /my patients/i })).toBeInTheDocument();
  });

  it('navigating to Medical Data shows patient select', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /medical data/i }));
    expect(screen.getByRole('combobox', { name: /select patient/i })).toBeInTheDocument();
  });

  it('changing patient select updates the view', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: /medical data/i }));
    const select = screen.getByRole('combobox', { name: /select patient/i });
    await user.selectOptions(select, 'Mary Williams');
    expect(select).toHaveValue('2');
  });
});
