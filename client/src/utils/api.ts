import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup interceptors with store parameter for dispatching actions
export const setupAxiosInterceptors = (store: any) => {
  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      // Add token if exists
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_NAME || 'bandmate_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle session expiration
      if (error.response?.status === 401) {
        // Clear token and auth state
        localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_NAME || 'bandmate_token');
        store.dispatch({ type: 'auth/logout' });
        
        // Show toast notification
        toast.error('Your session has expired. Please login again.');
      }
      
      // Handle network errors
      if (!error.response) {
        toast.error('Network error. Please check your connection.');
      }
      
      return Promise.reject(error);
    }
  );
};

export default api;
