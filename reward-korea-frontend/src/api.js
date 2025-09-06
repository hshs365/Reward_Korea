import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Add a request interceptor
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

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // We are in a JS file, not a React component, so we can't use useNavigate.
      // window.location is a direct way to force a page change.
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;