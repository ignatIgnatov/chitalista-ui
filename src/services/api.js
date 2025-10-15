import axios from "axios";

// Използвай правилния URL - без /api накрая
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

console.log("API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Увеличи timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      `Making ${config.method?.toUpperCase()} request to:`,
      config.url
    );
    console.log("Request data:", config.data);

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(
      `Response from ${response.config.url}:`,
      response.status,
      response.data
    );
    return response;
  },
  (error) => {
    console.error("Response error:", error);

    if (error.response) {
      // Server responded with error status
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something else happened
      console.error("Error message:", error.message);
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      // Don't redirect automatically - let component handle it
    }

    return Promise.reject(error);
  }
);

export default api;
