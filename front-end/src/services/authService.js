import {
  clearAuthData,
  setAuthData,
} from "../utils/auth";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data?.message || "Something went wrong.",
    );

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
};

const register = async (userData) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

const login = async (credentials) => {
  const response = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  /*
   * Supports both:
   *
   * { token, user }
   *
   * and:
   *
   * { data: { token, user } }
   */

  const authData = response?.data || response;

  if (authData?.token) {
    setAuthData({
      token: authData.token,
      user: authData.user,
    });
  }

  return response;
};

const logout = () => {
  /*
   * JWT authentication is stateless.
   * Removing the token from the browser logs
   * the current user out from the frontend.
   */
  clearAuthData();
};

export default {
  register,
  login,
  logout,
};