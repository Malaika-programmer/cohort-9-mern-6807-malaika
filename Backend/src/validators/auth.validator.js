function validateRegister(data) {
  const errors = {};

  const fullName = data.fullName?.trim();
  const email = data.email?.trim().toLowerCase();
  const password = data.password;

  if (!fullName) {
    errors.fullName = "Full name is required.";
  }

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password =
      "Password must contain at least 8 characters.";
  }

  return errors;
}

function validateLogin(data) {
  const errors = {};

  const email = data.email?.trim();
  const password = data.password;

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
}

export {
  validateRegister,
  validateLogin,
};