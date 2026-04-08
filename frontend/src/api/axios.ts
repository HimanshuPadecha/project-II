import axios from 'axios';

// Create a centralized Axios instance
export const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true, // Important for sending/receiving cookies
});

// Interceptor to inject Authorization header if accessToken is in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Backend expects 'bearer <token>' based on auth middleware, but we'll use Bearer standard
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
