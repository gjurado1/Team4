import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RoleSelection } from '../../app/components/RoleSelection';
import { vi } from 'vitest';

describe('RoleSelection', () => {
  it('renders welcome heading and role cards when both roles allowed', () => {
    const onRoleSelect = vi.fn();
    render(<RoleSelection onRoleSelect={onRoleSelect} />);
    expect(screen.getByText('Welcome to CareConnect')).toBeInTheDocument();
    expect(screen.getByText('How will you be using the app today?')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign in as Caregiver')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign in as Patient')).toBeInTheDocument();
  });

  it('shows only caregiver card when allowedRoles is ["caregiver"]', () => {
    render(<RoleSelection onRoleSelect={vi.fn()} allowedRoles={['caregiver']} />);
    expect(screen.getByLabelText('Sign in as Caregiver')).toBeInTheDocument();
    expect(screen.queryByLabelText('Sign in as Patient')).not.toBeInTheDocument();
  });

  it('shows only patient card when allowedRoles is ["patient"]', () => {
    render(<RoleSelection onRoleSelect={vi.fn()} allowedRoles={['patient']} />);
    expect(screen.getByLabelText('Sign in as Patient')).toBeInTheDocument();
    expect(screen.queryByLabelText('Sign in as Caregiver')).not.toBeInTheDocument();
  });

  it('shows no roles message when allowedRoles is empty', () => {
    render(<RoleSelection onRoleSelect={vi.fn()} allowedRoles={[]} />);
    expect(screen.getByText(/No roles are available for this account/)).toBeInTheDocument();
  });

  it('shows name input after selecting caregiver', async () => {
    const user = userEvent.setup();
    render(<RoleSelection onRoleSelect={vi.fn()} />);
    await user.click(screen.getByLabelText('Sign in as Caregiver'));
    expect(screen.getByText("What's your name?")).toBeInTheDocument();
    expect(screen.getByLabelText('Enter your name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go back to role selection' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue to dashboard' })).toBeInTheDocument();
  });

  it('shows name input after selecting patient', async () => {
    const user = userEvent.setup();
    render(<RoleSelection onRoleSelect={vi.fn()} />);
    await user.click(screen.getByLabelText('Sign in as Patient'));
    expect(screen.getByText("What's your name?")).toBeInTheDocument();
  });

  it('calls onRoleSelect with role and name when Continue is clicked', async () => {
    const user = userEvent.setup();
    const onRoleSelect = vi.fn();
    render(<RoleSelection onRoleSelect={onRoleSelect} />);
    await user.click(screen.getByLabelText('Sign in as Caregiver'));
    await user.type(screen.getByLabelText('Enter your name'), 'Jane Doe');
    await user.click(screen.getByRole('button', { name: 'Continue to dashboard' }));
    expect(onRoleSelect).toHaveBeenCalledWith('caregiver', 'Jane Doe');
  });

  it('calls onRoleSelect for patient with trimmed name', async () => {
    const user = userEvent.setup();
    const onRoleSelect = vi.fn();
    render(<RoleSelection onRoleSelect={onRoleSelect} allowedRoles={['patient']} />);
    await user.click(screen.getByLabelText('Sign in as Patient'));
    await user.type(screen.getByLabelText('Enter your name'), '  John  ');
    await user.click(screen.getByRole('button', { name: 'Continue to dashboard' }));
    expect(onRoleSelect).toHaveBeenCalledWith('patient', 'John');
  });

  it('Continue is disabled when name is empty', async () => {
    const user = userEvent.setup();
    render(<RoleSelection onRoleSelect={vi.fn()} />);
    await user.click(screen.getByLabelText('Sign in as Caregiver'));
    expect(screen.getByRole('button', { name: 'Continue to dashboard' })).toBeDisabled();
  });

  it('Continue is enabled when name has content', async () => {
    const user = userEvent.setup();
    render(<RoleSelection onRoleSelect={vi.fn()} />);
    await user.click(screen.getByLabelText('Sign in as Caregiver'));
    await user.type(screen.getByLabelText('Enter your name'), 'A');
    expect(screen.getByRole('button', { name: 'Continue to dashboard' })).not.toBeDisabled();
  });

  it('Enter key submits when name is filled', async () => {
    const user = userEvent.setup();
    const onRoleSelect = vi.fn();
    render(<RoleSelection onRoleSelect={onRoleSelect} />);
    await user.click(screen.getByLabelText('Sign in as Caregiver'));
    await user.type(screen.getByLabelText('Enter your name'), 'Alice{Enter}');
    expect(onRoleSelect).toHaveBeenCalledWith('caregiver', 'Alice');
  });

  it('Back returns to role selection and calls onBack when provided', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(<RoleSelection onRoleSelect={vi.fn()} onBack={onBack} />);
    await user.click(screen.getByLabelText('Sign in as Caregiver'));
    await user.click(screen.getByRole('button', { name: 'Go back to role selection' }));
    expect(screen.getByText('Welcome to CareConnect')).toBeInTheDocument();
    expect(onBack).toHaveBeenCalled();
  });

  it('Back does not throw when onBack is undefined', async () => {
    const user = userEvent.setup();
    render(<RoleSelection onRoleSelect={vi.fn()} />);
    await user.click(screen.getByLabelText('Sign in as Caregiver'));
    await user.click(screen.getByRole('button', { name: 'Go back to role selection' }));
    expect(screen.getByText('Welcome to CareConnect')).toBeInTheDocument();
  });

  it('applies hover and focus on caregiver card', () => {
    render(<RoleSelection onRoleSelect={vi.fn()} />);
    const card = screen.getByLabelText('Sign in as Caregiver');
    fireEvent.mouseEnter(card);
    expect(card.style.borderColor).toBe('var(--color-focus)');
    fireEvent.mouseLeave(card);
    expect(card.style.borderColor).toBe('var(--color-border)');
    fireEvent.focus(card);
    expect(card.style.outline).toContain('solid');
    fireEvent.blur(card);
    expect(card.style.outline).toBe('none');
  });

  it('applies hover and focus on patient card', () => {
    render(<RoleSelection onRoleSelect={vi.fn()} />);
    const card = screen.getByLabelText('Sign in as Patient');
    fireEvent.mouseEnter(card);
    expect(card.style.borderColor).toBe('var(--color-focus)');
    fireEvent.mouseLeave(card);
    expect(card.style.borderColor).toBe('var(--color-border)');
  });

  it('applies hover and focus on Back button', async () => {
    const user = userEvent.setup();
    render(<RoleSelection onRoleSelect={vi.fn()} />);
    await user.click(screen.getByLabelText('Sign in as Caregiver'));
    const backBtn = screen.getByRole('button', { name: 'Go back to role selection' });
    fireEvent.mouseEnter(backBtn);
    expect(backBtn.style.backgroundColor).toBe('var(--btn-secondary-hover-bg)');
    fireEvent.mouseLeave(backBtn);
    expect(backBtn.style.backgroundColor).toBe('var(--btn-secondary-bg)');
    fireEvent.focus(backBtn);
    expect(backBtn.style.outline).toContain('solid');
    fireEvent.blur(backBtn);
    expect(backBtn.style.outline).toBe('none');
  });

  it('applies hover and focus on Continue when enabled', async () => {
    const user = userEvent.setup();
    render(<RoleSelection onRoleSelect={vi.fn()} />);
    await user.click(screen.getByLabelText('Sign in as Caregiver'));
    await user.type(screen.getByLabelText('Enter your name'), 'Test');
    const continueBtn = screen.getByRole('button', { name: 'Continue to dashboard' });
    fireEvent.mouseEnter(continueBtn);
    expect(continueBtn.style.backgroundColor).toBe('var(--btn-primary-hover-bg)');
    fireEvent.mouseLeave(continueBtn);
    expect(continueBtn.style.backgroundColor).toBe('var(--btn-primary-bg)');
    fireEvent.focus(continueBtn);
    expect(continueBtn.style.outline).toContain('solid');
    fireEvent.blur(continueBtn);
    expect(continueBtn.style.outline).toBe('none');
  });

  it('name input applies focus and blur styles', async () => {
    const user = userEvent.setup();
    render(<RoleSelection onRoleSelect={vi.fn()} />);
    await user.click(screen.getByLabelText('Sign in as Caregiver'));
    const input = screen.getByLabelText('Enter your name');
    fireEvent.focus(input);
    expect(input.style.borderColor).toBe('var(--color-focus)');
    fireEvent.blur(input);
    expect(input.style.borderColor).toBe('var(--color-border)');
  });
});
