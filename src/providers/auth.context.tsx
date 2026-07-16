import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { authApi } from '../api/auth.api';

export interface AuthContextType {
  user: User | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const login = async (username: string) => {
    const userData = await authApi.register(username);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}