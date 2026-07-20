import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const DUMMY_USER = {
  id: 1,
  name: 'John Mitchell',
  email: 'admin@medicos.com',
  role: 'Super Admin',
  avatar: 'https://ui-avatars.com/api/?name=John+Mitchell&background=0F6CBD&color=fff',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, remember) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@medicos.com' && password === 'password') {
          setUser(DUMMY_USER);
          if (remember) {
            localStorage.setItem('authUser', JSON.stringify(DUMMY_USER));
          } else {
            sessionStorage.setItem('authUser', JSON.stringify(DUMMY_USER));
          }
          resolve(DUMMY_USER);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    sessionStorage.removeItem('authUser');
  };

  const forgotPassword = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Password reset link sent to ' + email });
      }, 1500);
    });
  };

  const resetPassword = async (token, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Password has been reset successfully' });
      }, 1500);
    });
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
