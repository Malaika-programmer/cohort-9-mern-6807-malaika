export function validateRequiredFields(values, fields) {
  return fields.reduce((errors, field) => {
    if (!String(values[field.name] ?? "").trim()) {
      return {
        ...errors,
        [field.name]: field.message,
      };
    }

    return errors;
  }, {});
}

export function validateEmail(value, message) {
  if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "";
  }

  return message;
}

export function validateSettingsForm(values, rules) {
  const errors = {
    ...validateRequiredFields(values, rules.required ?? []),
  };

  (rules.email ?? []).forEach((rule) => {
    const error = validateEmail(values[rule.name], rule.message);

    if (error) {
      errors[rule.name] = error;
    }
  });

  return errors;
}
