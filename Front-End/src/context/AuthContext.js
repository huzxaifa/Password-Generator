// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem('token', data.access_token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Login failed');
      console.error('Login failed', error);
    }
  };

  const register = async (email, password) => {
    try {
      await apiRegister(email, password);
      navigate('/login');
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Registration failed');
      console.error('Registration failed', error);
    }
  };

  const logout = () => {
    apiLogout();
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
