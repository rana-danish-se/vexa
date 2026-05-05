import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRetrying = false;

// Response interceptor for handling errors globally and silent token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRetrying) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRetrying = true;

      try {
        await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        isRetrying = false;
        return api(originalRequest);
      } catch (refreshError) {
        isRetrying = false;
        useAuthStore.getState().clearAuthStore();
        if (typeof window !== "undefined" && window.location.pathname.startsWith('/dashboard')) {
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
