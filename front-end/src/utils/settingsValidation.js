export function validateRequiredFields(values, fields) {
  return fields.reduce((errors, field) => {
    const value = values[field.name];

    if (!String(value ?? "").trim()) {
      return {
        ...errors,
        [field.name]: field.message,
      };
    }

    return errors;
  }, {});
}

export function validateEmail(value, message) {
  if (!value) {
    return "";
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    return message;
  }

  return "";
}

export function validatePassword(value) {
  if (!value) {
    return "";
  }

  if (value.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (value.length > 16) {
    return "Password must not exceed 16 characters.";
  }

  return "";
}

export function validateSettingsForm(values, rules) {
  const errors = {
    ...validateRequiredFields(
      values,
      rules.required ?? [],
    ),
  };

  (rules.email ?? []).forEach((rule) => {
    const error = validateEmail(
      values[rule.name],
      rule.message,
    );

    if (error) {
      errors[rule.name] = error;
    }
  });

  (rules.password ?? []).forEach((rule) => {
    const error = validatePassword(
      values[rule.name],
    );

    if (error) {
      errors[rule.name] = error;
    }
  });

  return errors;
}