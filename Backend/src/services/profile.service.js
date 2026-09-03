import prisma from "../config/database.js";
import {
  comparePassword,
  hashPassword,
} from "../utils/password.js";

function formatProfile(user, overrides = {}) {
  const username = user.email?.split("@")[0] || "user";

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    username,
    bio: "",
    avatar: "",
    skills: [],
    socialLinks: {
      linkedin: "",
      github: "",
      portfolio: "",
    },
    ...overrides,
  };
}

async function findUser(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  return user;
}

async function getProfile(userId) {
  const user = await findUser(userId);

  return formatProfile(user);
}

async function updateProfile(userId, profileData) {
  const data = {};

  if (profileData.fullName?.trim()) {
    data.fullName = profileData.fullName.trim();
  }

  if (profileData.email?.trim()) {
    data.email = profileData.email.trim().toLowerCase();
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return formatProfile(user, {
    bio: profileData.bio?.trim() || "",
  });
}

async function updateSkills(userId, skills) {
  const user = await findUser(userId);

  return formatProfile(user, {
    skills: Array.isArray(skills) ? skills : [],
  });
}

async function updateSocialLinks(userId, socialLinks) {
  const user = await findUser(userId);

  return formatProfile(user, {
    socialLinks: {
      linkedin: socialLinks?.linkedin || "",
      github: socialLinks?.github || "",
      portfolio: socialLinks?.portfolio || "",
    },
  });
}

async function updateAvatar(userId, avatar) {
  const user = await findUser(userId);

  return formatProfile(user, {
    avatar: avatar || "",
  });
}

async function changePassword(userId, currentPassword, newPassword) {
  const user = await findUser(userId);
  const passwordMatches = await comparePassword(
    currentPassword,
    user.password,
  );

  if (!passwordMatches) {
    const error = new Error("Current password is incorrect.");
    error.statusCode = 400;
    throw error;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: await hashPassword(newPassword),
    },
  });

  return { message: "Password updated successfully." };
}

async function deleteAccount(userId) {
  await findUser(userId);

  await prisma.user.delete({
    where: { id: userId },
  });

  return { message: "Account deleted successfully." };
}

export default {
  getProfile,
  updateProfile,
  updateSkills,
  updateSocialLinks,
  updateAvatar,
  changePassword,
  deleteAccount,
};
