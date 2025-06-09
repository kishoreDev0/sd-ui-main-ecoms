import axios from 'axios';
import { store } from '@/store'; // Redux store
import { toast } from 'react-toastify'; // Or use your custom snackbar

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const tokenmain = localStorage.getItem('token');

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

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 401 || response?.status === 403) {
      // Clear session
      localStorage.clear();

    }

    return Promise.reject(error);
  }
);
