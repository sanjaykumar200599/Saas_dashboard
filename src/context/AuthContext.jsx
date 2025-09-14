import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token, username: localStorage.getItem('username') });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    if (password !== 'test123') {
      throw new Error('Invalid password. Use "test123"');
    }
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    const userData = { username, token: mockToken };
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('username', username);
    setUser(userData);
    
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};