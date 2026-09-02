import prisma from "../config/database.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { generateResetToken, calculateTokenExpiry } from "../utils/resetToken.js";
import { sendPasswordResetEmail } from "../config/mail.js";

async function register(userData) {
  const { fullName, email, password } = userData;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const error = new Error(
      "An account with this email already exists.",
    );

    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
}

async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await comparePassword(
    password,
    user.password,
  );

  if (!passwordMatches) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    token,
  };
}

async function logout() {
  return {
    message: "Logged out successfully.",
  };
}

async function forgotPassword(email) {
  if (!email) {
    const error = new Error("Email address is required.");
    error.statusCode = 400;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user) {
    const error = new Error("No account found with this email address.");
    error.statusCode = 404;
    throw error;
  }

  const resetToken = generateResetToken();
  const resetTokenExpiry = calculateTokenExpiry(1);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });

  await sendPasswordResetEmail(user.email, resetToken);

  return {
    message: "Password reset link has been sent to your email address.",
  };
}

async function resetPassword(token, newPassword) {
  if (!token) {
    const error = new Error("Reset token is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!newPassword || newPassword.length < 6) {
    const error = new Error("New password must be at least 6 characters long.");
    error.statusCode = 400;
    throw error;
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    const error = new Error("Invalid or expired password reset token.");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return {
    message: "Your password has been reset successfully.",
  };
}

export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};