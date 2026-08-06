import { useState } from "react";

import PropTypes from "prop-types";

import { profileContent } from "../../../../../Scripts/Contents/Dashboard/Profile";

import {
  Button,
  Card,
  Input,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./ProfileSocialLinks.module.css";

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

function ProfileSocialLinks({
  socialLinks,
  onSave,
}) {
  const {
    socialLinks: content,
    validation,
    icons,
  } = profileContent;

  const [formValues, setFormValues] =
    useState(socialLinks);

  const [errors, setErrors] =
    useState({});

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    Object.entries(formValues).forEach(
      ([key, value]) => {
        if (!isValidUrl(value)) {
          validationErrors[key] =
            validation.urlInvalid;
        }
      },
    );

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const payload = {
      linkedin:
        formValues.linkedin.trim(),

      github:
        formValues.github.trim(),

      portfolio:
        formValues.portfolio.trim(),
    };

    onSave(payload);

    setSuccessMessage(
      content.successMessage,
    );
  };

  return (
    <Card className={styles.card}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        align="left"
      />

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        {successMessage && (
          <div
            className={styles.success}
            role="status"
          >
            <icons.success
              aria-hidden="true"
            />

            <span>{successMessage}</span>
          </div>
        )}

        {Object.values(
          content.fields,
        ).map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            type="url"
            value={
              formValues[field.name]
            }
            placeholder={
              field.placeholder
            }
            icon={field.icon}
            error={errors[field.name]}
            onChange={handleChange}
          />
        ))}

        <Button
          type="submit"
          fullWidth
          icon={icons.save}
        >
          {content.saveButton}
        </Button>
      </form>
    </Card>
  );
}

ProfileSocialLinks.propTypes = {
  socialLinks: PropTypes.shape({
    linkedin: PropTypes.string,
    github: PropTypes.string,
    portfolio: PropTypes.string,
  }).isRequired,

  onSave: PropTypes.func.isRequired,
};

export default ProfileSocialLinks;
