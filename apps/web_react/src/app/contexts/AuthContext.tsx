import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  role?: 'patient' | 'caregiver';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  setUserRole: (role: 'patient' | 'caregiver') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readStoredUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedUser = localStorage.getItem('careconnect_user');
  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem('careconnect_user');
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if user exists in "database" (localStorage)
    const usersJson = localStorage.getItem('careconnect_users');
    const users: Array<User & { password: string }> = usersJson ? JSON.parse(usersJson) : [];
    
    const foundUser = users.find((u) => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    // Don't store password in user object
    const { password: _, ...userWithoutPassword } = foundUser;
    
    setUser(userWithoutPassword);
    localStorage.setItem('careconnect_user', JSON.stringify(userWithoutPassword));
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if user already exists
    const usersJson = localStorage.getItem('careconnect_users');
    const users: Array<User & { password: string }> = usersJson ? JSON.parse(usersJson) : [];
    
    if (users.find((u) => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: `user_${Date.now()}`,
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('careconnect_users', JSON.stringify(users));

    // Don't store password in user object
    const { password: _, ...userWithoutPassword } = newUser;
    
    setUser(userWithoutPassword);
    localStorage.setItem('careconnect_user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('careconnect_user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('careconnect_user', JSON.stringify(updatedUser));

    // Update in users list
    const usersJson = localStorage.getItem('careconnect_users');
    const users: Array<User & { password: string }> = usersJson ? JSON.parse(usersJson) : [];
    const userIndex = users.findIndex((u) => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('careconnect_users', JSON.stringify(users));
    }
  };

  const setUserRole = (role: 'patient' | 'caregiver') => {
    if (!user) return;
    
    const updatedUser = { ...user, role };
    setUser(updatedUser);
    localStorage.setItem('careconnect_user', JSON.stringify(updatedUser));

    // Update in users list
    const usersJson = localStorage.getItem('careconnect_users');
    const users: Array<User & { password: string }> = usersJson ? JSON.parse(usersJson) : [];
    const userIndex = users.findIndex((u) => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], role };
      localStorage.setItem('careconnect_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
