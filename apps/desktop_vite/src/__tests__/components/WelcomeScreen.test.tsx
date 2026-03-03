import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WelcomeScreen } from '../../app/components/WelcomeScreen';
import { vi } from 'vitest';

describe('WelcomeScreen', () => {
  it('renders CareConnect heading and tagline', () => {
    render(<WelcomeScreen onGetStarted={vi.fn()} />);
    expect(screen.getByText('CareConnect')).toBeInTheDocument();
    expect(screen.getByText('Care made clearer. Support that feels close.')).toBeInTheDocument();
  });

  it('renders description paragraph', () => {
    render(<WelcomeScreen onGetStarted={vi.fn()} />);
    expect(
      screen.getByText(
        /A comprehensive desktop application designed to help caregivers manage/,
      ),
    ).toBeInTheDocument();
  });

  it('renders Get Started button with aria-label', () => {
    render(<WelcomeScreen onGetStarted={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Get started with CareConnect' }),
    ).toBeInTheDocument();
    expect(screen.getByText("Let's Get Started")).toBeInTheDocument();
  });

  it('calls onGetStarted when button is clicked', async () => {
    const user = userEvent.setup();
    const onGetStarted = vi.fn();
    render(<WelcomeScreen onGetStarted={onGetStarted} />);
    await user.click(screen.getByRole('button', { name: 'Get started with CareConnect' }));
    expect(onGetStarted).toHaveBeenCalledTimes(1);
  });

  it('applies hover styles on Get Started button', () => {
    render(<WelcomeScreen onGetStarted={vi.fn()} />);
    const btn = screen.getByRole('button', { name: 'Get started with CareConnect' });
    fireEvent.mouseEnter(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-primary-hover-bg)');
    expect(btn.style.color).toBe('var(--btn-primary-hover-fg)');
    expect(btn.style.transform).toBe('translateY(-2px)');
    expect(btn.style.boxShadow).toBe('var(--shadow-lg)');
    fireEvent.mouseLeave(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-primary-bg)');
    expect(btn.style.color).toBe('var(--btn-primary-fg)');
    expect(btn.style.transform).toBe('translateY(0)');
    expect(btn.style.boxShadow).toBe('var(--shadow-panel)');
  });

  it('applies focus and blur outline on Get Started button', () => {
    render(<WelcomeScreen onGetStarted={vi.fn()} />);
    const btn = screen.getByRole('button', { name: 'Get started with CareConnect' });
    fireEvent.focus(btn);
    expect(btn.style.outline).toContain('solid');
    fireEvent.blur(btn);
    expect(btn.style.outline).toBe('none');
  });

  it('renders accessibility note with Tab and Enter kbd', () => {
    render(<WelcomeScreen onGetStarted={vi.fn()} />);
    const noteDiv = document.querySelector('.mt-8.text-center');
    expect(noteDiv).toBeInTheDocument();
    expect(noteDiv?.textContent).toContain('Tab');
    expect(noteDiv?.textContent).toContain('to navigate');
    expect(noteDiv?.textContent).toContain('Enter');
    expect(noteDiv?.textContent).toContain('to select');
    const kbdElements = document.querySelectorAll('kbd');
    expect(kbdElements.length).toBe(2);
    expect(Array.from(kbdElements).map((k) => k.textContent)).toContain('Tab');
    expect(Array.from(kbdElements).map((k) => k.textContent)).toContain('Enter');
  });

  it('renders logo SVG', () => {
    render(<WelcomeScreen onGetStarted={vi.fn()} />);
    const svg = document.querySelector('svg[viewBox="0 0 40 40"]');
    expect(svg).toBeInTheDocument();
  });
});
