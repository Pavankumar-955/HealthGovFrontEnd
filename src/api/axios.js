import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9091",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    // Let the browser set the multipart boundary header
    delete config.headers['Content-Type'];
    delete config.headers['content-type'];
    if (config.headers.common) {
      delete config.headers.common['Content-Type'];
      delete config.headers.common['content-type'];
    }
  }

  return config;
});

// Response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;