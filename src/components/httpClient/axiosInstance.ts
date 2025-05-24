import axios from 'axios';
import { store } from '@/store'; // Import your Redux store directly

// Create the axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Set your backend URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const tokenmain = localStorage.getItem('token');

    // Extract and parse user object from localStorage
    const userString = localStorage.getItem('user');
    let userId = '';
    if (userString) {
      try {
        const user = JSON.parse(userString);
        userId = user?.id?.toString() ?? '';
      } catch (err) {
        console.error('Failed to parse user from localStorage:', err);
      }
    }

    const token = state.auth.token.token ?? tokenmain ?? '';

    if (token) {
      config.headers['user-id'] = userId;
      config.headers['access-token'] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
