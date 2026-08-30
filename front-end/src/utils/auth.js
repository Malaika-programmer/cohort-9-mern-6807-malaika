const TOKEN_KEY = "token";
const USER_KEY = "user";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export const setAuthData = ({ token, user }) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const logout = () => {
  clearAuthData();
};

export default {
  getToken,
  getUser,
  setAuthData,
  isAuthenticated,
  clearAuthData,
  logout,
};