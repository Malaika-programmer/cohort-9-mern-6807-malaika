import authService from "../services/auth.service.js";

import {
  validateRegister,
  validateLogin,
} from "../validators/auth.validator.js";

async function register(req, res) {
  try {
    const errors = validateRegister(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please check the provided information.",
        errors,
      });
    }

    const user = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Unable to create account.",
    });
  }
}

async function login(req, res) {
  try {
    const errors = validateLogin(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please check the provided information.",
        errors,
      });
    }

    const result = await authService.login(
      req.body.email.trim().toLowerCase(),
      req.body.password,
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Unable to login.",
    });
  }
}

export {
  register,
  login,
};