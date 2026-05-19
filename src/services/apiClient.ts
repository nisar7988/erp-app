import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = "http://192.168.1.209:3000/api"; // Adjust if needed for Android Emulator (10.0.2.2)

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    // Read token synchronously from Zustand store memory!
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login or refresh token)
      console.warn("Unauthorized access, maybe token expired");
    }
    if (error.code == "ECONNABORTED") {
      console.warn("Timeout exceeded, try again later");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
