const TOKEN_KEY = "invoice_token";
const USER_KEY = "invoice_user";
const EXPIRES_AT_KEY = "expiresAt";

/* ---------------- Token ---------------- */

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/* ---------------- User ---------------- */

export const getStoredUser = () => {
  const user = localStorage.getItem(USER_KEY);

  if (!user || user === "undefined") {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeStoredUser = () => {
  localStorage.removeItem(USER_KEY);
};

/* ---------------- Session ---------------- */

export const clearSession = () => {
  removeToken();
  removeStoredUser();
  localStorage.removeItem(EXPIRES_AT_KEY);
};

/* ---------------- TTL ---------------- */

export const isSessionExpired = () => {
  const expiresAt = Number(localStorage.getItem(EXPIRES_AT_KEY));

  if (!expiresAt) {
    return false;
  }

  return Date.now() > expiresAt;
};
