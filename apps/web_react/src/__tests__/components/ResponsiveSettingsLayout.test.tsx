import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Eye, Shield, Bell, Globe } from 'lucide-react';
import { ResponsiveSettingsLayout } from '../../app/components/ResponsiveSettingsLayout';
import { PwaInstallProvider } from '../../app/contexts/PwaInstallContext';

let mockNavigate: jest.Mock;
const mockSetActiveSection = jest.fn();
const mockHandleSaveSettings = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const testUser = { name: 'Cameron' };
const sections = [
  { id: 'accessibility', label: 'Accessibility', icon: Eye },
  { id: 'privacy', label: 'Privacy & Data', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'general', label: 'General', icon: Globe },
];

function renderLayout(saved = false) {
  return render(
    <MemoryRouter>
      <PwaInstallProvider>
        <ResponsiveSettingsLayout
          user={testUser}
          activeSection="accessibility"
          setActiveSection={mockSetActiveSection}
          sections={sections}
          content={<p data-testid="section-content">Accessibility content</p>}
          handleSaveSettings={mockHandleSaveSettings}
          saved={saved}
        />
      </PwaInstallProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  mockNavigate = jest.fn();
  mockSetActiveSection.mockReset();
  mockHandleSaveSettings.mockReset();
});

describe('ResponsiveSettingsLayout', () => {
  it('renders the Settings heading', () => {
    renderLayout();
    expect(screen.getByRole('heading', { name: /^settings$/i, level: 1 })).toBeInTheDocument();
  });

  it('renders the injected section content', () => {
    renderLayout();
    expect(screen.getByTestId('section-content')).toBeInTheDocument();
  });

  it('renders all section nav buttons', () => {
    renderLayout();
    expect(screen.getByRole('button', { name: /accessibility/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /privacy/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /notifications/i })[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /general/i })).toBeInTheDocument();
  });

  it('active section nav button has aria-current="page"', () => {
    renderLayout();
    expect(screen.getByRole('button', { name: /accessibility/i })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('clicking a section nav button calls setActiveSection', async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(screen.getAllByRole('button', { name: /privacy/i })[0]);
    expect(mockSetActiveSection).toHaveBeenCalledWith('privacy');
  });

  it('save settings button calls handleSaveSettings', async () => {
    const user = userEvent.setup();
    renderLayout();
    await user.click(screen.getByRole('button', { name: /save settings/i }));
    expect(mockHandleSaveSettings).toHaveBeenCalled();
  });

  it('shows "Settings saved!" when saved prop is true', () => {
    renderLayout(true);
    expect(screen.getByText(/settings saved/i)).toBeInTheDocument();
  });

  it('does not show "Settings saved!" when saved prop is false', () => {
    renderLayout(false);
    expect(screen.queryByText(/settings saved/i)).not.toBeInTheDocument();
  });

  it('mobile menu button toggles the menu', async () => {
    const user = userEvent.setup();
    renderLayout();
    const menuBtn = screen.getByRole('button', { name: /open settings menu/i });
    await user.click(menuBtn);
    expect(screen.getAllByRole('button', { name: /close settings menu/i })[0]).toBeInTheDocument();
  });

  it('user initial is shown in the header avatar', () => {
    renderLayout();
    // Cameron → 'C'
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});
