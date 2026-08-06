import { useState } from "react";

import PropTypes from "prop-types";

import { profileContent } from "../../../../../Scripts/Contents/Dashboard/Profile";

import {
  Button,
  Card,
  IconBox,
  Input,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./ProfileSecurity.module.css";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function validateStrongPassword(
  password,
  validation,
) {
  if (password.length < 8) {
    return validation.passwordMinimum;
  }

  if (!/[A-Z]/.test(password)) {
    return validation.passwordUppercase;
  }

  if (!/[a-z]/.test(password)) {
    return validation.passwordLowercase;
  }

  if (!/\d/.test(password)) {
    return validation.passwordNumber;
  }

  if (
    !/[!@#$%^&*(),.?":{}|<>]/.test(
      password,
    )
  ) {
    return validation.passwordSpecial;
  }

  return "";
}

function ProfileSecurity({
  onUpdatePassword,
}) {
  const {
    security,
    validation,
    icons,
  } = profileContent;

  const [formValues, setFormValues] =
    useState(initialValues);

  const [errors, setErrors] =
    useState({});

  const [isUpdating, setIsUpdating] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }

    setSuccessMessage("");
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formValues.currentPassword) {
      validationErrors.currentPassword =
        validation.currentPasswordRequired;
    }

    if (!formValues.newPassword) {
      validationErrors.newPassword =
        validation.newPasswordRequired;
    } else {
      const passwordError =
        validateStrongPassword(
          formValues.newPassword,
          validation,
        );

      if (passwordError) {
        validationErrors.newPassword =
          passwordError;
      }
    }

    if (!formValues.confirmPassword) {
      validationErrors.confirmPassword =
        validation.confirmPasswordRequired;
    } else if (
      formValues.newPassword !==
      formValues.confirmPassword
    ) {
      validationErrors.confirmPassword =
        validation.passwordMismatch;
    }

    if (
      formValues.currentPassword &&
      formValues.currentPassword ===
        formValues.newPassword
    ) {
      validationErrors.newPassword =
        validation.samePassword;
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isUpdating) {
      return;
    }

    const validationErrors =
      validateForm();

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsUpdating(true);

    try {
      const payload = {
        currentPassword:
          formValues.currentPassword,

        newPassword:
          formValues.newPassword,
      };

      await onUpdatePassword(payload);

      setFormValues(initialValues);

      setSuccessMessage(
        security.successMessage,
      );
    } catch (error) {
      setErrors({
        form:
          error?.response?.data?.message ??
          "Unable to update your password.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <IconBox
          icon={security.icon}
          size="large"
          variant="success"
          animated={false}
        />

        <SectionHeading
          eyebrow={security.eyebrow}
          title={security.title}
          description={
            security.description
          }
          align="left"
        />
      </div>

      <div className={styles.content}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
        >
          {errors.form && (
            <div
              className={styles.error}
              role="alert"
            >
              {errors.form}
            </div>
          )}

          {successMessage && (
            <div
              className={styles.success}
              role="status"
            >
              <icons.success
                aria-hidden="true"
              />

              <span>
                {successMessage}
              </span>
            </div>
          )}

          <Input
            label={
              security.fields
                .currentPassword.label
            }
            name={
              security.fields
                .currentPassword.name
            }
            type="password"
            value={
              formValues.currentPassword
            }
            placeholder={
              security.fields
                .currentPassword
                .placeholder
            }
            icon={
              security.fields
                .currentPassword.icon
            }
            error={
              errors.currentPassword
            }
            autoComplete="current-password"
            required
            onChange={handleChange}
          />

          <div className={styles.passwordGrid}>
            <Input
              label={
                security.fields
                  .newPassword.label
              }
              name={
                security.fields
                  .newPassword.name
              }
              type="password"
              value={
                formValues.newPassword
              }
              placeholder={
                security.fields
                  .newPassword
                  .placeholder
              }
              icon={
                security.fields
                  .newPassword.icon
              }
              error={
                errors.newPassword
              }
              autoComplete="new-password"
              required
              onChange={handleChange}
            />

            <Input
              label={
                security.fields
                  .confirmPassword.label
              }
              name={
                security.fields
                  .confirmPassword.name
              }
              type="password"
              value={
                formValues.confirmPassword
              }
              placeholder={
                security.fields
                  .confirmPassword
                  .placeholder
              }
              icon={
                security.fields
                  .confirmPassword.icon
              }
              error={
                errors.confirmPassword
              }
              autoComplete="new-password"
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.actions}>
            <Button
              type="submit"
              icon={icons.save}
              loading={isUpdating}
              disabled={isUpdating}
            >
              {isUpdating
                ? security.updatingButton
                : security.updateButton}
            </Button>
          </div>
        </form>

        <aside className={styles.rules}>
          <h3>Password Requirements</h3>

          <ul>
            {security.passwordRules.map(
              (rule) => (
                <li key={rule}>
                  <icons.success
                    aria-hidden="true"
                  />

                  <span>{rule}</span>
                </li>
              ),
            )}
          </ul>
        </aside>
      </div>
    </Card>
  );
}

ProfileSecurity.propTypes = {
  onUpdatePassword:
    PropTypes.func.isRequired,
};

export default ProfileSecurity;