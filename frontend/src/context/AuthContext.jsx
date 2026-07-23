import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, remember) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { user: authUser } = res.data;
      setUser(authUser);
      if (remember) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
      } else {
        sessionStorage.setItem('authUser', JSON.stringify(authUser));
      }
      return authUser;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('authUser');
      sessionStorage.removeItem('authUser');
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await api.post('/auth/forgot-password', { email });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const res = await api.post('/auth/reset-password', { token, password });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
