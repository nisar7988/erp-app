import apiClient from "./apiClient";
import safeStorage from "../utils/storage";
import { LoginFormState } from "../types/auth";
import { useAuthStore } from "../store/authStore";

export const authService = {
  async login(credentials: Pick<LoginFormState, "email" | "password">) {
    console.log("credentials", credentials);
    const response = await apiClient.post("/auth/login", credentials);
    const { access_token, user } = response.data.data; // Backend uses a standard response wrapper

    // Update global Zustand store which automatically persists
    useAuthStore.getState().login(user, access_token);

    return { access_token, user };
  },

  async logout() {
    useAuthStore.getState().logout();
  },

  async getMe() {
    const response = await apiClient.get("/users/me");
    return response.data.data;
  },

  async getUser() {
    // We can fetch from store if needed
    return useAuthStore.getState().user;
  },
};
