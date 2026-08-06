import { useState } from "react";

import PropTypes from "prop-types";

import { profileContent } from "../../../../../Scripts/Contents/Dashboard/Profile";

import {
  Button,
  Card,
  Input,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./ProfileInformation.module.css";

function isValidUrl(value) {
  if (!value.trim()) {
    return true;
  }

  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(
      url.protocol,
    );
  } catch {
    return false;
  }
}

function ProfileInformation({
  profile,
  onSave,
}) {
  const {
    information,
    validation,
    icons,
  } = profileContent;

  const [formValues, setFormValues] =
    useState(profile);

  const [errors, setErrors] =
    useState({});

  const [isSaving, setIsSaving] =
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

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    const fullName =
      formValues.fullName.trim();

    const username =
      formValues.username.trim();

    const email =
      formValues.email.trim();

    const phone =
      formValues.phone.trim();

    if (!fullName) {
      validationErrors.fullName =
        validation.fullNameRequired;
    } else if (fullName.length < 3) {
      validationErrors.fullName =
        validation.fullNameMinimum;
    }

    if (!username) {
      validationErrors.username =
        validation.usernameRequired;
    } else if (username.length < 3) {
      validationErrors.username =
        validation.usernameMinimum;
    } else if (
      !/^[a-zA-Z0-9_]+$/.test(username)
    ) {
      validationErrors.username =
        validation.usernameInvalid;
    }

    if (!email) {
      validationErrors.email =
        validation.emailRequired;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
      )
    ) {
      validationErrors.email =
        validation.emailInvalid;
    }

    if (
      phone &&
      !/^[+]?[\d\s()-]{7,20}$/.test(
        phone,
      )
    ) {
      validationErrors.phone =
        validation.phoneInvalid;
    }

    if (
      !isValidUrl(formValues.website)
    ) {
      validationErrors.website =
        validation.websiteInvalid;
    }

    if (formValues.bio.length > 300) {
      validationErrors.bio =
        validation.bioMaximum;
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSaving) {
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
    setIsSaving(true);

    try {
      const profilePayload = {
        fullName:
          formValues.fullName.trim(),

        username:
          formValues.username
            .trim()
            .toLowerCase(),

        email:
          formValues.email
            .trim()
            .toLowerCase(),

        phone: formValues.phone.trim(),

        occupation:
          formValues.occupation.trim(),

        location:
          formValues.location.trim(),

        dateOfBirth:
          formValues.dateOfBirth,

        website:
          formValues.website.trim(),

        bio: formValues.bio.trim(),
      };

      await Promise.resolve(
        onSave(profilePayload),
      );

      setSuccessMessage(
        information.successMessage,
      );
    } catch (error) {
      setErrors({
        form:
          error?.response?.data?.message ??
          "Unable to update your profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const fields = information.fields;

  return (
    <Card className={styles.card}>
      <SectionHeading
        eyebrow={information.eyebrow}
        title={information.title}
        description={information.description}
        align="left"
      />

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        {errors.form && (
          <div
            className={styles.errorMessage}
            role="alert"
          >
            {errors.form}
          </div>
        )}

        {successMessage && (
          <div
            className={styles.successMessage}
            role="status"
          >
            <icons.success
              aria-hidden="true"
            />

            <span>{successMessage}</span>
          </div>
        )}

        <div className={styles.grid}>
          <Input
            label={fields.fullName.label}
            name={fields.fullName.name}
            type={fields.fullName.type}
            value={formValues.fullName}
            placeholder={
              fields.fullName.placeholder
            }
            icon={fields.fullName.icon}
            error={errors.fullName}
            required
            onChange={handleChange}
          />

          <Input
            label={fields.username.label}
            name={fields.username.name}
            type={fields.username.type}
            value={formValues.username}
            placeholder={
              fields.username.placeholder
            }
            icon={fields.username.icon}
            error={errors.username}
            required
            onChange={handleChange}
          />

          <Input
            label={fields.email.label}
            name={fields.email.name}
            type={fields.email.type}
            value={formValues.email}
            placeholder={
              fields.email.placeholder
            }
            icon={fields.email.icon}
            error={errors.email}
            required
            onChange={handleChange}
          />

          <Input
            label={fields.phone.label}
            name={fields.phone.name}
            type={fields.phone.type}
            value={formValues.phone}
            placeholder={
              fields.phone.placeholder
            }
            icon={fields.phone.icon}
            error={errors.phone}
            onChange={handleChange}
          />

          <Input
            label={fields.occupation.label}
            name={fields.occupation.name}
            type={fields.occupation.type}
            value={formValues.occupation}
            placeholder={
              fields.occupation.placeholder
            }
            icon={fields.occupation.icon}
            onChange={handleChange}
          />

          <Input
            label={fields.location.label}
            name={fields.location.name}
            type={fields.location.type}
            value={formValues.location}
            placeholder={
              fields.location.placeholder
            }
            icon={fields.location.icon}
            onChange={handleChange}
          />

          <Input
            label={
              fields.dateOfBirth.label
            }
            name={fields.dateOfBirth.name}
            type={
              fields.dateOfBirth.type
            }
            value={
              formValues.dateOfBirth
            }
            icon={
              fields.dateOfBirth.icon
            }
            onChange={handleChange}
          />

          <Input
            label={fields.website.label}
            name={fields.website.name}
            type={fields.website.type}
            value={formValues.website}
            placeholder={
              fields.website.placeholder
            }
            icon={fields.website.icon}
            error={errors.website}
            onChange={handleChange}
          />
        </div>

        <label className={styles.field}>
          <span>{fields.bio.label}</span>

          <textarea
            name={fields.bio.name}
            value={formValues.bio}
            rows={6}
            maxLength={
              fields.bio.maximumLength
            }
            placeholder={
              fields.bio.placeholder
            }
            aria-invalid={Boolean(
              errors.bio,
            )}
            onChange={handleChange}
          />

          <div className={styles.fieldFooter}>
            {errors.bio ? (
              <small role="alert">
                {errors.bio}
              </small>
            ) : (
              <span />
            )}

            <span>
              {formValues.bio.length}/
              {fields.bio.maximumLength}
            </span>
          </div>
        </label>

        <div className={styles.actions}>
          <Button
            type="submit"
            icon={icons.save}
            loading={isSaving}
            disabled={isSaving}
          >
            {isSaving
              ? information.savingButton
              : information.saveButton}
          </Button>
        </div>
      </form>
    </Card>
  );
}

ProfileInformation.propTypes = {
  profile: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProfileInformation;
