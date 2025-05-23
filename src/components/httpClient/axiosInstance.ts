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
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.user?.access_token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);