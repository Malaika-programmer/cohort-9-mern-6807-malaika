import prisma from "../config/database.js";

export async function getSettings(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { preferences: true }
  });
  return user?.preferences || {};
}

export async function saveSettingsSection(userId, section, values) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { preferences: true }
  });

  const currentPrefs = (user?.preferences && typeof user.preferences === 'object') ? user.preferences : {};
  
  const updatedPrefs = {
    ...currentPrefs,
    [section]: {
      ...(currentPrefs[section] || {}),
      ...values
    }
  };

  return await prisma.user.update({
    where: { id: userId },
    data: { preferences: updatedPrefs }
  });
}

export async function deleteAccount(userId) {
  return await prisma.user.delete({
    where: { id: userId }
  });
}

export async function exportUserData(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
      tasks: true,
      notes: true,
    }
  });
  
  if (user) {
    // Exclude password and sensitive info
    delete user.password;
    delete user.resetToken;
    delete user.resetTokenExpiry;
  }
  
  return user;
}
