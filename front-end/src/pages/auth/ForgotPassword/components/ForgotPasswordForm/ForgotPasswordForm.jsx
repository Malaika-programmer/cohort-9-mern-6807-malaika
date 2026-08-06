import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./ForgotPasswordForm.module.css";

import { forgotPasswordContent } from "../../../../../Scripts/Contents/ForgotPassword";
import {
  Button,
  Card,
  Input,
  IconBox,
} from "../../../../../components/ui";

const initialFormValues = {
  email: "",
};

function ForgotPasswordForm() {
  const { form, navigation } = forgotPasswordContent;

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name] || errors.form) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
        form: "",
      }));
    }

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    const normalizedEmail = formValues.email.trim();

    if (!normalizedEmail) {
      validationErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      validationErrors.email = "Enter a valid email address.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const forgotPasswordPayload = {
        email: formValues.email.trim().toLowerCase(),
      };

      /*
       * Backend integration:
       *
       * await authService.forgotPassword(
       *   forgotPasswordPayload
       * );
       *
       * POST /api/v1/auth/forgot-password
       */

      console.log(
        "Forgot password payload:",
        forgotPasswordPayload,
      );

      setIsSubmitted(true);
      setFormValues(initialFormValues);
    } catch (error) {
      setErrors({
        form:
          error?.response?.data?.message ??
          "Unable to process your request. Please try again.",
      });

      setIsSubmitted(false);
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

        {isSubmitted && (
          <div
            className={styles.successMessage}
            role="status"
            aria-live="polite"
          >
            {form.successMessage}
          </div>
        )}

        <Input
          label={form.email.label}
          name={form.email.name}
          type={form.email.type}
          value={formValues.email}
          placeholder={form.email.placeholder}
          icon={form.email.icon}
          error={errors.email}
          autoComplete="email"
          required
          disabled={isSubmitting}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
        >
          {form.submitButton}
        </Button>

        <Link
          to="/login"
          className={styles.backLink}
        >
          <IconBox
            icon={navigation.icon}
            size="small"
            variant="neutral"
            shape="circle"
            animated={false}
          />

          <span>{form.backToLogin}</span>
        </Link>
      </form>
    </Card>
  );
}

export default ForgotPasswordForm;