import axios from "axios";
import { getToken, clearSession, isSessionExpired } from "../utils/token";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (isSessionExpired()) {
    clearSession();
    window.location.href = "/login";
    return Promise.reject(new Error("Session expired"));
  }

  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const token = getToken();

    // Logout only if the user was authenticated
    if (error.response?.status === 401 && token) {
      clearSession();

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
