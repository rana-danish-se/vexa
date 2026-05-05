import { create } from "zustand";
import {
  registerUser,
  verifyOtp,
  loginUser,
  logoutUser,
  getMe,
} from "../services/authService";

export const useAuthStore = create((set, get) => ({
  business: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  pendingEmail: null,

  register: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      await registerUser(formData);
      set({ pendingEmail: formData.email, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed",
        isLoading: false,
      });
      throw error;
    }
  },

  verify: async (email, otp) => {
    set({ isLoading: true, error: null });
    try {
      const result = await verifyOtp({ email, otp });
      set({
        business: result.data,
        isAuthenticated: true,
        pendingEmail: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Verification failed",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await loginUser(formData);
      set({
        business: result.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await logoutUser();
    } catch (error) {
      // Intentionally ignoring network errors during clear down so client still resets
    } finally {
      set({
        business: null,
        isAuthenticated: false,
        pendingEmail: null,
        error: null,
        isLoading: false,
      });
    }
  },

  clearAuthStore: () => {
    set({
      business: null,
      isAuthenticated: false,
      pendingEmail: null,
      error: null,
      isLoading: false,
    });
  },

  fetchMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await getMe();
      set({
        business: result.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        business: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
