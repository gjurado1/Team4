import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginScreen } from '../../app/components/LoginScreen';
import { vi } from 'vitest';

const REGISTRATION_STORAGE_KEY = 'careconnect-registered-users';

describe('LoginScreen', () => {
  const onBack = vi.fn();
  const onLogin = vi.fn();

  beforeEach(() => {
    onBack.mockClear();
    onLogin.mockClear();
    localStorage.clear();
  });

  it('renders sign-in mode with heading and form', () => {
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Sign in to access your care dashboard')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('calls onBack when Back is clicked in sign-in mode', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByLabelText('Go back to welcome screen'));
    expect(screen.getByText('Back')).toBeInTheDocument();
    await user.click(screen.getByText('Back'));
    expect(onBack).toHaveBeenCalled();
  });

  it('calls onLogin with default roles when email not in localStorage', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.type(screen.getByLabelText('Email Address'), 'new@example.com');
    await user.type(screen.getByPlaceholderText('Enter your password'), 'any');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(onLogin).toHaveBeenCalledWith(['caregiver', 'patient']);
  });

  it('calls onLogin with stored roles for registered email', async () => {
    const user = userEvent.setup();
    const users: Record<
      string,
      { firstName: string; lastName: string; email: string; allowedRoles: ('caregiver' | 'patient')[] }
    > = {
      'user@example.com': {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'user@example.com',
        allowedRoles: ['caregiver'],
      },
    };
    localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(users));
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.type(screen.getByLabelText('Email Address'), 'User@Example.COM');
    await user.type(screen.getByPlaceholderText('Enter your password'), 'pass');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(onLogin).toHaveBeenCalledWith(['caregiver']);
  });

  it('calls onLogin with default roles when stored data has empty allowedRoles', async () => {
    const user = userEvent.setup();
    const users: Record<string, { firstName: string; lastName: string; email: string; allowedRoles: string[] }> = {
      'empty@example.com': { firstName: 'E', lastName: 'M', email: 'empty@example.com', allowedRoles: [] },
    };
    localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(users));
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.type(screen.getByLabelText('Email Address'), 'empty@example.com');
    await user.type(screen.getByPlaceholderText('Enter your password'), 'p');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(onLogin).toHaveBeenCalledWith(['caregiver', 'patient']);
  });

  it('calls onLogin with default roles when localStorage has invalid JSON', async () => {
    const user = userEvent.setup();
    localStorage.setItem(REGISTRATION_STORAGE_KEY, 'invalid');
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.type(screen.getByLabelText('Email Address'), 'x@x.com');
    await user.type(screen.getByPlaceholderText('Enter your password'), 'p');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(onLogin).toHaveBeenCalledWith(['caregiver', 'patient']);
  });

  it('filters to valid roles only when stored roles include invalid', async () => {
    const user = userEvent.setup();
    const users: Record<string, { firstName: string; lastName: string; email: string; allowedRoles: string[] }> = {
      'mixed@example.com': {
        firstName: 'M',
        lastName: 'X',
        email: 'mixed@example.com',
        allowedRoles: ['caregiver', 'other', 'patient'],
      },
    };
    localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(users));
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.type(screen.getByLabelText('Email Address'), 'mixed@example.com');
    await user.type(screen.getByPlaceholderText('Enter your password'), 'p');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(onLogin).toHaveBeenCalledWith(['caregiver', 'patient']);
  });

  it('switches to register mode when Register is clicked', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByText('Back to Sign In')).toBeInTheDocument();
  });

  it('Back to Sign In returns to sign-in and clears register errors', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    await user.click(screen.getByLabelText('Go back to welcome screen'));
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(onBack).not.toHaveBeenCalled();
  });

  it('toggles show password', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    await user.click(screen.getByLabelText('Show password'));
    expect(passwordInput).toHaveAttribute('type', 'text');
    await user.click(screen.getByLabelText('Hide password'));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('applies focus and blur on email input', () => {
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    const input = screen.getByLabelText('Email Address');
    fireEvent.focus(input);
    expect(input.style.borderColor).toBe('var(--input-border-focus)');
    fireEvent.blur(input);
    expect(input.style.borderColor).toBe('var(--input-border)');
  });

  it('applies focus and blur on sign-in submit button', () => {
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    const btn = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.focus(btn);
    expect(btn.style.outline).toContain('solid');
    fireEvent.blur(btn);
    expect(btn.style.outline).toBe('none');
  });

  it('applies hover on back button', () => {
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    const back = screen.getByLabelText('Go back to welcome screen');
    fireEvent.mouseEnter(back);
    expect(back.style.color).toBe('var(--color-text)');
    fireEvent.mouseLeave(back);
    expect(back.style.color).toBe('var(--color-text-muted)');
  });

  it('shows success message after registration and switch to sign-in', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    await user.type(screen.getByLabelText('First Name'), 'Jane');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.type(screen.getByLabelText('Email Address'), 'newuser@example.com');
    await user.type(screen.getByLabelText('Phone Number'), '5551234567');
    await user.type(screen.getByLabelText('Street Address'), '123 Main Street');
    await user.type(screen.getByLabelText('City'), 'Boston');
    await user.selectOptions(screen.getByLabelText('State / Territory'), 'MA');
    await user.type(screen.getByLabelText('ZIP Code'), '02101');
    await user.selectOptions(screen.getByLabelText('Register As'), 'Caregiver Only');
    await user.type(screen.getByLabelText('Password'), 'SecurePass123!@#');
    await user.type(screen.getByLabelText('Confirm Password'), 'SecurePass123!@#');
    await user.click(screen.getByRole('button', { name: 'Submit Registration' }));
    expect(screen.getByText(/Registration details accepted/)).toBeInTheDocument();
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });

  it('shows validation errors for invalid registration', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    await user.click(screen.getByRole('button', { name: 'Submit Registration' }));
    expect(screen.getByText(/First name must be/)).toBeInTheDocument();
    expect(screen.getByText(/Select an account role/)).toBeInTheDocument();
  });

  it('validates password rules', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    await user.type(screen.getByLabelText('First Name'), 'Jane');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.type(screen.getByLabelText('Email Address'), 'j@j.com');
    await user.type(screen.getByLabelText('Phone Number'), '5551234567');
    await user.type(screen.getByLabelText('Street Address'), '123 Main Street');
    await user.type(screen.getByLabelText('City'), 'Boston');
    await user.selectOptions(screen.getByLabelText('State / Territory'), 'MA');
    await user.type(screen.getByLabelText('ZIP Code'), '02101');
    await user.selectOptions(screen.getByLabelText('Register As'), 'Caregiver Only');
    await user.type(screen.getByLabelText('Password'), 'short');
    await user.type(screen.getByLabelText('Confirm Password'), 'short');
    await user.click(screen.getByRole('button', { name: 'Submit Registration' }));
    expect(screen.getByText(/Password needs 12\+ chars/)).toBeInTheDocument();
  });

  it('validates password match', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    await user.type(screen.getByLabelText('First Name'), 'Jane');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.type(screen.getByLabelText('Email Address'), 'j@j.com');
    await user.type(screen.getByLabelText('Phone Number'), '5551234567');
    await user.type(screen.getByLabelText('Street Address'), '123 Main St');
    await user.type(screen.getByLabelText('City'), 'Boston');
    await user.selectOptions(screen.getByLabelText('State / Territory'), 'MA');
    await user.type(screen.getByLabelText('ZIP Code'), '02101');
    await user.selectOptions(screen.getByLabelText('Register As'), 'Caregiver Only');
    await user.type(screen.getByLabelText('Password'), 'ValidPass123!@#');
    await user.type(screen.getByLabelText('Confirm Password'), 'Different123!@#');
    await user.click(screen.getByRole('button', { name: 'Submit Registration' }));
    expect(screen.getByText(/Passwords do not match/)).toBeInTheDocument();
  });

  it('registers with role "both" and stores both roles', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    await user.type(screen.getByLabelText('First Name'), 'Jane');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.type(screen.getByLabelText('Email Address'), 'both@example.com');
    await user.type(screen.getByLabelText('Phone Number'), '5551234567');
    await user.type(screen.getByLabelText('Street Address'), '123 Main Street');
    await user.type(screen.getByLabelText('City'), 'Boston');
    await user.selectOptions(screen.getByLabelText('State / Territory'), 'MA');
    await user.type(screen.getByLabelText('ZIP Code'), '02101');
    await user.selectOptions(screen.getByLabelText('Register As'), 'Both Caregiver and Patient');
    await user.type(screen.getByLabelText('Password'), 'SecurePass123!@#');
    await user.type(screen.getByLabelText('Confirm Password'), 'SecurePass123!@#');
    await user.click(screen.getByRole('button', { name: 'Submit Registration' }));
    const stored = JSON.parse(localStorage.getItem(REGISTRATION_STORAGE_KEY)!);
    expect(stored['both@example.com'].allowedRoles).toEqual(['caregiver', 'patient']);
  });

  it('formats phone number on change', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    const phone = screen.getByLabelText('Phone Number');
    await user.type(phone, '5551234567');
    expect(phone).toHaveValue('(555) 123-4567');
  });

  it('sanitizes and limits email in register', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, '  Test@Example.COM  ');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('sanitizes postal code and limits length', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    const zip = screen.getByLabelText('ZIP Code');
    await user.type(zip, '02101-1234');
    expect(zip).toHaveValue('02101-1234');
  });

  it('register role select only accepts caregiver, patient, both', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    const roleSelect = screen.getByLabelText('Register As');
    await user.selectOptions(roleSelect, 'Caregiver Only');
    expect(roleSelect).toHaveValue('caregiver');
  });

  it('toggles register password visibility', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    const pw = screen.getByLabelText('Password');
    expect(pw).toHaveAttribute('type', 'password');
    await user.click(screen.getByLabelText('Show password'));
    expect(pw).toHaveAttribute('type', 'text');
    await user.click(screen.getByLabelText('Hide password'));
    expect(pw).toHaveAttribute('type', 'password');
  });

  it('toggles register confirm password visibility', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    const confirm = screen.getByLabelText('Confirm Password');
    await user.click(screen.getByLabelText('Show confirm password'));
    expect(confirm).toHaveAttribute('type', 'text');
    await user.click(screen.getByLabelText('Hide confirm password'));
    expect(confirm).toHaveAttribute('type', 'password');
  });

  it('clears success message when switching to register', async () => {
    const user = userEvent.setup();
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    await user.type(screen.getByLabelText('First Name'), 'Jane');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.type(screen.getByLabelText('Email Address'), 'clear@example.com');
    await user.type(screen.getByLabelText('Phone Number'), '5551234567');
    await user.type(screen.getByLabelText('Street Address'), '123 Main Street');
    await user.type(screen.getByLabelText('City'), 'Boston');
    await user.selectOptions(screen.getByLabelText('State / Territory'), 'MA');
    await user.type(screen.getByLabelText('ZIP Code'), '02101');
    await user.selectOptions(screen.getByLabelText('Register As'), 'Caregiver Only');
    await user.type(screen.getByLabelText('Password'), 'SecurePass123!@#');
    await user.type(screen.getByLabelText('Confirm Password'), 'SecurePass123!@#');
    await user.click(screen.getByRole('button', { name: 'Submit Registration' }));
    expect(screen.getByText(/Registration details accepted/)).toBeInTheDocument();
    await user.click(screen.getByText('Register'));
    expect(screen.queryByText(/Registration details accepted/)).not.toBeInTheDocument();
  });

  it('handles localStorage failure on register submit gracefully', async () => {
    const user = userEvent.setup();
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceeded');
    });
    render(<LoginScreen onBack={onBack} onLogin={onLogin} />);
    await user.click(screen.getByText('Register'));
    await user.type(screen.getByLabelText('First Name'), 'Jane');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.type(screen.getByLabelText('Email Address'), 'fail@example.com');
    await user.type(screen.getByLabelText('Phone Number'), '5551234567');
    await user.type(screen.getByLabelText('Street Address'), '123 Main Street');
    await user.type(screen.getByLabelText('City'), 'Boston');
    await user.selectOptions(screen.getByLabelText('State / Territory'), 'MA');
    await user.type(screen.getByLabelText('ZIP Code'), '02101');
    await user.selectOptions(screen.getByLabelText('Register As'), 'Caregiver Only');
    await user.type(screen.getByLabelText('Password'), 'SecurePass123!@#');
    await user.type(screen.getByLabelText('Confirm Password'), 'SecurePass123!@#');
    await user.click(screen.getByRole('button', { name: 'Submit Registration' }));
    expect(screen.getByText(/Registration details accepted/)).toBeInTheDocument();
    setItem.mockRestore();
  });
});
