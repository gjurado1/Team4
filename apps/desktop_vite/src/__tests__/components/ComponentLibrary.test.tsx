import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentLibrary } from '../../app/components/ComponentLibrary';

describe('ComponentLibrary', () => {
  it('renders heading and description', () => {
    render(<ComponentLibrary />);
    expect(screen.getByText('CareConnect Component Library')).toBeInTheDocument();
    expect(
      screen.getByText('All components use design tokens - no hard-coded values'),
    ).toBeInTheDocument();
  });

  it('renders all section headings', () => {
    render(<ComponentLibrary />);
    expect(screen.getByText('A) Buttons')).toBeInTheDocument();
    expect(screen.getByText('B) Input Fields')).toBeInTheDocument();
    expect(screen.getByText('C) Panels & Cards')).toBeInTheDocument();
    expect(screen.getByText('D) Typography Scale')).toBeInTheDocument();
    expect(screen.getByText('E) Status Colors')).toBeInTheDocument();
  });

  it('renders primary, secondary, destructive, and disabled button labels', () => {
    render(<ComponentLibrary />);
    expect(screen.getByText('Primary Button')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
    expect(screen.getByText('Secondary Button')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Disabled Button')).toBeInTheDocument();
  });

  it('applies hover and leave on primary button', async () => {
    const user = userEvent.setup();
    render(<ComponentLibrary />);
    const btn = screen.getByText('Primary Button').closest('button')!;
    await user.hover(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-primary-hover-bg)');
    expect(btn.style.color).toBe('var(--btn-primary-hover-fg)');
    await user.unhover(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-primary-bg)');
    expect(btn.style.color).toBe('var(--btn-primary-fg)');
  });

  it('applies focus and blur on primary button', () => {
    render(<ComponentLibrary />);
    const btn = screen.getByText('Primary Button').closest('button')!;
    btn.focus();
    btn.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    expect(btn.style.outline).toContain('solid');
    btn.blur();
    btn.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    expect(btn.style.outline).toBe('none');
  });

  it('applies hover and leave on primary With Icon button', async () => {
    const user = userEvent.setup();
    render(<ComponentLibrary />);
    const btn = screen.getByText('With Icon').closest('button')!;
    await user.hover(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-primary-hover-bg)');
    await user.unhover(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-primary-bg)');
  });

  it('applies focus and blur on primary With Icon button', () => {
    render(<ComponentLibrary />);
    const btn = screen.getByText('With Icon').closest('button')!;
    fireEvent.focus(btn);
    expect(btn.style.outline).toContain('solid');
    fireEvent.blur(btn);
    expect(btn.style.outline).toBe('none');
  });

  it('applies hover and leave on secondary button', async () => {
    const user = userEvent.setup();
    render(<ComponentLibrary />);
    const btn = screen.getByText('Secondary Button').closest('button')!;
    await user.hover(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-secondary-hover-bg)');
    await user.unhover(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-secondary-bg)');
  });

  it('applies focus and blur on secondary button', () => {
    render(<ComponentLibrary />);
    const btn = screen.getByText('Secondary Button').closest('button')!;
    fireEvent.focus(btn);
    expect(btn.style.outline).toContain('solid');
    fireEvent.blur(btn);
    expect(btn.style.outline).toBe('none');
  });

  it('applies hover and leave on destructive Delete button', async () => {
    const user = userEvent.setup();
    render(<ComponentLibrary />);
    const btn = screen.getByText('Delete').closest('button')!;
    await user.hover(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-danger-hover-bg)');
    await user.unhover(btn);
    expect(btn.style.backgroundColor).toBe('var(--btn-danger-bg)');
  });

  it('applies focus and blur on destructive Delete button', () => {
    render(<ComponentLibrary />);
    const btn = screen.getByText('Delete').closest('button')!;
    fireEvent.focus(btn);
    expect(btn.style.outline).toContain('solid');
    fireEvent.blur(btn);
    expect(btn.style.outline).toBe('none');
  });

  it('renders disabled button as disabled', () => {
    render(<ComponentLibrary />);
    const btn = screen.getByText('Disabled Button').closest('button')!;
    expect(btn).toBeDisabled();
  });

  it('updates text input and applies focus/blur', async () => {
    const user = userEvent.setup();
    render(<ComponentLibrary />);
    const input = screen.getByLabelText(/Text Input \(Hover & Focus States\)/);
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
    input.focus();
    input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    expect(input.style.borderColor).toBe('var(--input-border-focus)');
    expect(input.style.outline).toContain('solid');
    input.blur();
    input.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    expect(input.style.borderColor).toBe('var(--input-border)');
    expect(input.style.outline).toBe('none');
  });

  it('updates password input and toggles show/hide', async () => {
    const user = userEvent.setup();
    render(<ComponentLibrary />);
    const input = document.getElementById('demo-password')!;
    await user.type(input, 'secret');
    expect(input).toHaveValue('secret');
    expect(input).toHaveAttribute('type', 'password');
    const toggle = screen.getByText('Show').closest('button')!;
    await user.click(toggle);
    expect(screen.getByText('Hide')).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    await user.click(screen.getByText('Hide').closest('button')!);
    expect(screen.getByText('Show')).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('applies focus and blur on password input', () => {
    render(<ComponentLibrary />);
    const input = document.getElementById('demo-password')!;
    fireEvent.focus(input);
    expect(input.style.borderColor).toBe('var(--input-border-focus)');
    fireEvent.blur(input);
    expect(input.style.borderColor).toBe('var(--input-border)');
  });

  it('updates search input and applies focus/blur', async () => {
    const user = userEvent.setup();
    render(<ComponentLibrary />);
    const input = screen.getByLabelText('Search Field');
    await user.type(input, 'query');
    expect(input).toHaveValue('query');
    fireEvent.focus(input);
    expect(input.style.borderColor).toBe('var(--input-border-focus)');
    fireEvent.blur(input);
    expect(input.style.borderColor).toBe('var(--input-border)');
  });

  it('renders input with error state and message', () => {
    render(<ComponentLibrary />);
    expect(screen.getByLabelText('Input with Error')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders panels and typography labels', () => {
    render(<ComponentLibrary />);
    expect(screen.getByText('Standard Panel')).toBeInTheDocument();
    expect(screen.getByText('Nested Panel')).toBeInTheDocument();
    expect(screen.getByText('Section Heading')).toBeInTheDocument();
    expect(screen.getByText('Body Text')).toBeInTheDocument();
    expect(screen.getByText('Label Text')).toBeInTheDocument();
    expect(screen.getByText(/Small\/Caption Text/)).toBeInTheDocument();
  });

  it('renders status colors section', () => {
    render(<ComponentLibrary />);
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Focus/Info')).toBeInTheDocument();
  });
});
