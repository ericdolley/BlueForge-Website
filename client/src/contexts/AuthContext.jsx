import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('startup_auth_token') || '');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('startup_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token) {
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem('startup_auth_token', token);
    } else {
      delete API.defaults.headers.common.Authorization;
      localStorage.removeItem('startup_auth_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('startup_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('startup_user');
    }
  }, [user]);

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
