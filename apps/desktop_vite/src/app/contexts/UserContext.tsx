import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'caregiver' | 'patient';

interface UserContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Load saved role from localStorage or default to caregiver
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('careconnect-user-role');
    return (saved as UserRole) || 'caregiver';
  });

  const [userName, setUserNameState] = useState<string>(() => {
    const saved = localStorage.getItem('careconnect-user-name');
    return saved || '';
  });

  // Save role to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('careconnect-user-role', userRole);
  }, [userRole]);

  // Save name to localStorage whenever it changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem('careconnect-user-name', userName);
    }
  }, [userName]);

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
  };

  return (
    <UserContext.Provider value={{ userRole, setUserRole, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
