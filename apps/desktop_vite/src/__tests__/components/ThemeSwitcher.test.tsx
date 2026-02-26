import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeSwitcher } from '../../app/components/ThemeSwitcher';
import { vi } from 'vitest';

describe('ThemeSwitcher', () => {
  it('renders theme updated header', () => {
    render(<ThemeSwitcher currentTheme="warm" onRequestClose={vi.fn()} />);
    expect(screen.getByText('Theme Updated')).toBeVisible();
  });

  it('shows current theme name for warm', () => {
    render(<ThemeSwitcher currentTheme="warm" onRequestClose={vi.fn()} />);
    expect(screen.getByText('Warm Care')).toBeVisible();
    expect(screen.getByText('Welcoming, comforting atmosphere')).toBeVisible();
  });

  it('shows current theme name for medical', () => {
    render(<ThemeSwitcher currentTheme="medical" onRequestClose={vi.fn()} />);
    expect(screen.getByText('Medical Blue/Teal')).toBeVisible();
    expect(screen.getByText('Calm, professional medical tones')).toBeVisible();
  });

  it('shows current theme name for dark', () => {
    render(<ThemeSwitcher currentTheme="dark" onRequestClose={vi.fn()} />);
    expect(screen.getByText('Deep Focus Purple')).toBeVisible();
    expect(screen.getByText('Low vision dark theme')).toBeVisible();
  });

  it('shows Alt+T hint', () => {
    render(<ThemeSwitcher currentTheme="warm" onRequestClose={vi.fn()} />);
    expect(screen.getByText(/Alt\+T/)).toBeVisible();
    expect(screen.getByText('Alt+T')).toBeInTheDocument();
  });

  it('calls onRequestClose when clicking outside', async () => {
    const user = userEvent.setup();
    const onRequestClose = vi.fn();
    render(
      <div>
        <ThemeSwitcher currentTheme="warm" onRequestClose={onRequestClose} />
        <button type="button">Outside</button>
      </div>,
    );
    await user.click(screen.getByText('Outside'));
    expect(onRequestClose).toHaveBeenCalled();
  });

  it('does not call onRequestClose when clicking inside', async () => {
    const user = userEvent.setup();
    const onRequestClose = vi.fn();
    render(<ThemeSwitcher currentTheme="warm" onRequestClose={onRequestClose} />);
    await user.click(screen.getByText('Theme Updated'));
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('falls back to first theme when currentTheme does not match', () => {
    render(<ThemeSwitcher currentTheme="unknown-theme" onRequestClose={vi.fn()} />);
    expect(screen.getByText('Warm Care')).toBeVisible();
  });
});
