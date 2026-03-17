import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../app/contexts/AuthContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    // Make the simulated network delay instant
    jest.spyOn(global, 'setTimeout').mockImplementation((fn: any) => {
      fn();
      return 0 as any;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws when used outside of AuthProvider', () => {
    // Suppress expected error output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth must be used within an AuthProvider'
    );
    consoleSpy.mockRestore();
  });

  it('starts unauthenticated with no user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('restores user from localStorage on mount', () => {
    const storedUser = {
      id: 'user_1',
      email: 'stored@example.com',
      name: 'Stored User',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('careconnect_user', JSON.stringify(storedUser));
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user?.email).toBe('stored@example.com');
    expect(result.current.isAuthenticated).toBe(true);
  });

  describe('signup', () => {
    it('creates a new user and authenticates them', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('new@example.com', 'pass123', 'New User');
      });
      expect(result.current.user?.email).toBe('new@example.com');
      expect(result.current.user?.name).toBe('New User');
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('persists the user to localStorage', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('new@example.com', 'pass123', 'New User');
      });
      const stored = JSON.parse(localStorage.getItem('careconnect_user') ?? 'null');
      expect(stored.email).toBe('new@example.com');
    });

    it('does not store the password in the user object', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('new@example.com', 'pass123', 'New User');
      });
      expect((result.current.user as any).password).toBeUndefined();
    });

    it('throws when email is already registered', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('dup@example.com', 'pass123', 'First');
      });
      await expect(
        act(async () => {
          await result.current.signup('dup@example.com', 'pass456', 'Second');
        })
      ).rejects.toThrow('User with this email already exists');
    });
  });

  describe('login', () => {
    it('authenticates an existing user with correct credentials', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('user@example.com', 'secret', 'User');
      });
      act(() => result.current.logout());

      await act(async () => {
        await result.current.login('user@example.com', 'secret');
      });
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user?.email).toBe('user@example.com');
    });

    it('throws on wrong password', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('user@example.com', 'secret', 'User');
      });
      act(() => result.current.logout());

      await expect(
        act(async () => {
          await result.current.login('user@example.com', 'wrongpassword');
        })
      ).rejects.toThrow('Invalid email or password');
    });

    it('throws for unknown email', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await expect(
        act(async () => {
          await result.current.login('nobody@example.com', 'pass');
        })
      ).rejects.toThrow('Invalid email or password');
    });
  });

  describe('logout', () => {
    it('clears the user and marks as unauthenticated', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('user@example.com', 'pass', 'User');
      });
      act(() => result.current.logout());
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('removes user from localStorage', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('user@example.com', 'pass', 'User');
      });
      act(() => result.current.logout());
      expect(localStorage.getItem('careconnect_user')).toBeNull();
    });
  });

  describe('updateProfile', () => {
    it('updates user name', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('user@example.com', 'pass', 'Original');
      });
      await act(async () => {
        await result.current.updateProfile({ name: 'Updated' });
      });
      expect(result.current.user?.name).toBe('Updated');
    });

    it('throws when no user is logged in', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await expect(
        act(async () => {
          await result.current.updateProfile({ name: 'Test' });
        })
      ).rejects.toThrow('No user logged in');
    });
  });

  describe('setUserRole', () => {
    it('sets the role on the current user', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('user@example.com', 'pass', 'User');
      });
      act(() => result.current.setUserRole('patient'));
      expect(result.current.user?.role).toBe('patient');
    });

    it('can switch role to caregiver', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      await act(async () => {
        await result.current.signup('user@example.com', 'pass', 'User');
      });
      act(() => result.current.setUserRole('caregiver'));
      expect(result.current.user?.role).toBe('caregiver');
    });

    it('does nothing when no user is logged in', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });
      expect(() => act(() => result.current.setUserRole('patient'))).not.toThrow();
      expect(result.current.user).toBeNull();
    });
  });
});
