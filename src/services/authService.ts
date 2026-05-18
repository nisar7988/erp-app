import apiClient from "./apiClient";
import safeStorage from "../utils/storage";
import { LoginFormState } from "../types/auth";

export const authService = {
  async login(credentials: Pick<LoginFormState, "email" | "password">) {
    console.log("credentials", credentials);
    const response = await apiClient.post("/auth/login", credentials);
    const { access_token, user } = response.data.data; // Backend uses a standard response wrapper

    await safeStorage.setItem("access_token", access_token);
    await safeStorage.setItem("user", JSON.stringify(user));

    return { access_token, user };
  },

  async logout() {
    await safeStorage.removeItem("access_token");
    await safeStorage.removeItem("user");
  },

  async getMe() {
    const response = await apiClient.get("/users/me");
    return response.data.data;
  },

  async getUser() {
    const userStr = await safeStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};
