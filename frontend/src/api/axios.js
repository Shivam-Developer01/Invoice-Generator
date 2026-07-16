import axios from "axios";
import { getToken, clearSession, isSessionExpired } from "../utils/token";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
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
    if (error.response?.status === 401) {
      clearSession();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
