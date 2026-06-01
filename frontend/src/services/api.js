import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to include token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and basic retry mechanism
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Retry mechanism: retry up to 2 times for 5xx errors or network failures
    if (
      error.response &&
      error.response.status >= 500 &&
      !originalRequest._retry &&
      (!originalRequest.retryCount || originalRequest.retryCount < 2)
    ) {
      originalRequest._retry = true;
      originalRequest.retryCount = (originalRequest.retryCount || 0) + 1;
      
      // Exponential backoff delay
      const delay = Math.pow(2, originalRequest.retryCount) * 500;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return api(originalRequest);
    }

    // Auth error handling: If 401 is returned, clear token and logout
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // If we are not on the login/register pages, redirect to login
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
