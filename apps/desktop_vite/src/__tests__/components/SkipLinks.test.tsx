import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkipLinks } from '../../app/components/SkipLinks';
import { vi } from 'vitest';

describe('SkipLinks', () => {
  it('renders skip to main content link', () => {
    render(<SkipLinks />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders skip to navigation menu link', () => {
    render(<SkipLinks />);
    expect(screen.getByText('Skip to navigation menu')).toBeInTheDocument();
  });

  it('skip links are anchor elements with correct href', () => {
    render(<SkipLinks />);
    const mainLink = screen.getByText('Skip to main content').closest('a');
    const navLink = screen.getByText('Skip to navigation menu').closest('a');
    expect(mainLink).toHaveAttribute('href', '#main-content');
    expect(navLink).toHaveAttribute('href', '#radial-menu');
  });

  it('skip to main content focuses main-content when clicked', async () => {
    const user = userEvent.setup();
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    mainContent.tabIndex = -1;
    mainContent.scrollIntoView = vi.fn();
    document.body.appendChild(mainContent);

    render(<SkipLinks />);
    await user.click(screen.getByText('Skip to main content'));

    expect(document.activeElement).toBe(mainContent);
    document.body.removeChild(mainContent);
  });

  it('skip to navigation focuses radial-menu when clicked', async () => {
    const user = userEvent.setup();
    const radialMenu = document.createElement('div');
    radialMenu.id = 'radial-menu';
    radialMenu.tabIndex = -1;
    document.body.appendChild(radialMenu);

    render(<SkipLinks />);
    await user.click(screen.getByText('Skip to navigation menu'));

    expect(document.activeElement).toBe(radialMenu);
    document.body.removeChild(radialMenu);
  });

  it('skip to main content link has focus styles', () => {
    render(<SkipLinks />);
    const link = screen.getByText('Skip to main content').closest('a')!;
    link.focus();
    expect(link.style.outline).toContain('solid');
    link.blur();
    expect(link.style.outline).toBe('none');
  });

  it('skip to main content does not throw when main-content is missing', async () => {
    const user = userEvent.setup();
    render(<SkipLinks />);
    await user.click(screen.getByText('Skip to main content'));
    expect(document.getElementById('main-content')).toBeNull();
  });

  it('skip to navigation does not throw when radial-menu is missing', async () => {
    const user = userEvent.setup();
    render(<SkipLinks />);
    await user.click(screen.getByText('Skip to navigation menu'));
    expect(document.getElementById('radial-menu')).toBeNull();
  });
});
