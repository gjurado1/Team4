import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BackButton } from '../../app/components/BackButton';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderBackButton(props?: { label?: string; onClick?: () => void }) {
  return render(
    <MemoryRouter>
      <BackButton {...props} />
    </MemoryRouter>,
  );
}

describe('BackButton', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders with default label "Back"', () => {
    renderBackButton();
    expect(screen.getByLabelText('Back')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeVisible();
  });

  it('renders with custom label when provided', () => {
    renderBackButton({ label: 'Go back' });
    expect(screen.getByLabelText('Go back')).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeVisible();
  });

  it('calls navigate(-1) when clicked and no onClick prop', async () => {
    const user = userEvent.setup();
    renderBackButton();
    await user.click(screen.getByLabelText('Back'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('calls custom onClick when provided', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderBackButton({ onClick });
    await user.click(screen.getByLabelText('Back'));
    expect(onClick).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('applies hover styles on mouse enter/leave', async () => {
    const user = userEvent.setup();
    renderBackButton();
    const button = screen.getByLabelText('Back');
    await user.hover(button);
    expect(button.style.backgroundColor).toBe('var(--btn-secondary-hover-bg)');
    expect(button.style.color).toBe('var(--color-focus)');
    await user.unhover(button);
    expect(button.style.backgroundColor).toBe('transparent');
    expect(button.style.color).toBe('var(--color-text)');
  });

  it('applies focus and blur outline styles', () => {
    renderBackButton();
    const button = screen.getByLabelText('Back');
    button.focus();
    expect(button.style.outline).toContain('solid');
    button.blur();
    expect(button.style.outline).toBe('none');
  });
});
