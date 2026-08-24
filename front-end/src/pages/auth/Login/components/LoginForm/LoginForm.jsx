import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./LoginForm.module.css";

import { loginContent } from "../../../../../Scripts/Contents/Login";
import {
  Button,
  Card,
  Input,
} from "../../../../../components/ui";

const initialFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

function LoginForm() {
  const { form, divider, socialButtons, signup } = loginContent;

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formValues.email.trim()) {
      validationErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
    ) {
      validationErrors.email = "Enter a valid email address.";
    }

    if (!formValues.password) {
      validationErrors.password = "Password is required.";
    } else if (formValues.password.length < 8) {
      validationErrors.password =
        "Password must contain at least 8 characters.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const loginPayload = {
        email: formValues.email.trim().toLowerCase(),
        password: formValues.password,
        rememberMe: formValues.rememberMe,
      };

      /*
       * Backend integration:
       *
       * await authService.login(loginPayload);
       *
       * POST /api/v1/auth/login
       */

      console.log("Login payload:", loginPayload);
    } catch (error) {
      setErrors({
        form:
          error?.response?.data?.message ??
          "Unable to log in. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={styles.card}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        {errors.form && (
          <div
            className={styles.formError}
            role="alert"
          >
            {errors.form}
          </div>
        )}

        <Input
          label={form.email.label}
          name="email"
          type={form.email.type}
          value={formValues.email}
          placeholder={form.email.placeholder}
          icon={form.email.icon}
          error={errors.email}
          autoComplete="email"
          required
          onChange={handleInputChange}
        />

        <Input
          label={form.password.label}
          name="password"
          type={form.password.type}
          value={formValues.password}
          placeholder={form.password.placeholder}
          icon={form.password.icon}
          error={errors.password}
          autoComplete="current-password"
          required
          onChange={handleInputChange}
        />

        <div className={styles.options}>
          <label className={styles.rememberOption}>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formValues.rememberMe}
              onChange={handleInputChange}
            />

            <span>{form.rememberMe}</span>
          </label>

          <Link
            to="/forgot-password"
            className={styles.forgotLink}
          >
            {form.forgotPassword}
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
        >
          {form.submitButton}
        </Button>

        <div className={styles.divider}>
          <span>{divider}</span>
        </div>

        <div className={styles.socialActions}>
          <Button
            type="button"
            variant="outline"
            fullWidth
          >
            {socialButtons.google}
          </Button>

          <Button
            type="button"
            variant="outline"
            fullWidth
          >
            {socialButtons.github}
          </Button>
        </div>

        <p className={styles.signupText}>
          <span>{signup.text}</span>

          <Link
            to="/signup"
            className={styles.signupLink}
          >
            {signup.linkText}
          </Link>
        </p>
      </form>
    </Card>
  );
}

export default LoginForm;