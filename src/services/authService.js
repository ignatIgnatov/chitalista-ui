import api from './api';

export const authService = {
  login: async (credentials) => {
    try {
      console.log('Sending login request:', credentials);
      const response = await api.post('/auth/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });
      console.log('Login response:', response);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  }
};

export default authService;