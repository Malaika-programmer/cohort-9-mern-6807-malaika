import { getToken, getUser, setAuthData } from "../utils/auth";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

const getProfile = async () => {
  const data = await request("/profile");

  if (data?.data) {
    const currentUser = getUser() || {};
    setAuthData({
      user: {
        ...currentUser,
        fullName: data.data.fullName || currentUser.fullName,
        email: data.data.email || currentUser.email,
        avatar: data.data.avatar || currentUser.avatar,
      },
    });
  }

  return data;
};

const updateProfile = async (profileData) => {
  const data = await request("/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });

  if (data?.data) {
    const currentUser = getUser() || {};
    setAuthData({
      user: {
        ...currentUser,
        fullName: data.data.fullName || currentUser.fullName,
        email: data.data.email || currentUser.email,
      },
    });
  }

  return data;
};

const updateSkills = async (skills) => {
  return request("/profile/skills", {
    method: "PUT",
    body: JSON.stringify({ skills }),
  });
};

const updateSocialLinks = async (socialLinks) => {
  return request("/profile/social-links", {
    method: "PUT",
    body: JSON.stringify({ socialLinks }),
  });
};

const updateAvatar = async (avatar) => {
  return request("/profile/avatar", {
    method: "PUT",
    body: JSON.stringify({ avatar }),
  });
};

const changePassword = async (passwordValues) => {
  return request("/profile/password", {
    method: "PUT",
    body: JSON.stringify(passwordValues),
  });
};

const deleteAccount = async () => {
  return request("/profile", {
    method: "DELETE",
  });
};

export default {
  getProfile,
  updateProfile,
  updateSkills,
  updateSocialLinks,
  updateAvatar,
  changePassword,
  deleteAccount,
};
