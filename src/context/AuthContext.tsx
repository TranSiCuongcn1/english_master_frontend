import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AuthResponse } from '../api/authApi';

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
}

interface AuthContextType {
  user: CurrentUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
  updateUser: (data: Partial<CurrentUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  );

  const login = useCallback((data: AuthResponse) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((data: Partial<CurrentUser>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('currentUser', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token && !!user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
