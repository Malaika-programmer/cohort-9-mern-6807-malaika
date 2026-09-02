import prisma from "../config/database.js";
import { comparePassword, hashPassword } from "../utils/password.js";

async function getProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  return {
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    username: user.profile?.username || "",
    phone: user.profile?.phone || "",
    occupation: user.profile?.occupation || "",
    location: user.profile?.location || "",
    dateOfBirth: user.profile?.dateOfBirth || "",
    website: user.profile?.website || "",
    bio: user.profile?.bio || "",
    avatar: user.profile?.avatar || "",
    skills: user.profile?.skills || [],
    socialLinks: user.profile?.socialLinks || {
      linkedin: "",
      github: "",
      portfolio: "",
    },
  };
}

async function updateProfile(userId, profileData) {
  const {
    fullName,
    username,
    email,
    phone,
    occupation,
    location,
    dateOfBirth,
    website,
    bio,
  } = profileData;

  if (username) {
    const existingUsername = await prisma.profile.findFirst({
      where: {
        username,
        NOT: { userId },
      },
    });

    if (existingUsername) {
      const error = new Error("Username is already taken.");
      error.statusCode = 409;
      throw error;
    }
  }

  if (email) {
    const existingEmail = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: userId },
      },
    });

    if (existingEmail) {
      const error = new Error("Email is already taken.");
      error.statusCode = 409;
      throw error;
    }
  }

  if (fullName || email) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        ...(fullName && { fullName }),
        ...(email && { email }),
      },
    });
  }

  await prisma.profile.upsert({
    where: { userId },
    create: {
      userId,
      username,
      phone,
      occupation,
      location,
      dateOfBirth,
      website,
      bio,
    },
    update: {
      username,
      phone,
      occupation,
      location,
      dateOfBirth,
      website,
      bio,
    },
  });

  return getProfile(userId);
}

async function updateSkills(userId, skills) {
  await prisma.profile.upsert({
    where: { userId },
    create: {
      userId,
      skills,
    },
    update: {
      skills,
    },
  });

  return getProfile(userId);
}

async function updateSocialLinks(userId, socialLinks) {
  await prisma.profile.upsert({
    where: { userId },
    create: {
      userId,
      socialLinks,
    },
    update: {
      socialLinks,
    },
  });

  return getProfile(userId);
}

async function updateAvatar(userId, avatar) {
  await prisma.profile.upsert({
    where: { userId },
    create: {
      userId,
      avatar,
    },
    update: {
      avatar,
    },
  });

  return getProfile(userId);
}

async function changePassword(userId, currentPassword, newPassword) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  const matches = await comparePassword(currentPassword, user.password);

  if (!matches) {
    const error = new Error("Current password is incorrect.");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { message: "Password updated successfully." };
}

async function deleteAccount(userId) {
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
