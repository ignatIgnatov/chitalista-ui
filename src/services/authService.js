// src/services/authService.js
import api from './api';

export const authService = {
  login: async (credentials) => {
    // Backend очаква username и password
    const loginData = {
      username: credentials.username,
      password: credentials.password
    };
    
    console.log('Sending login request:', loginData);
    
    const response = await api.post('/auth/login', loginData);
    console.log('Login response:', response.data);
    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};