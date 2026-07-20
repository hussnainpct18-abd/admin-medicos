import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Point to the Node.js backend
  withCredentials: true, // Important for sending/receiving cookies (JWT)
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
