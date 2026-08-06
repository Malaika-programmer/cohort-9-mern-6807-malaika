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

import styles from "./ProfileDangerZone.module.css";

function ProfileDangerZone({
  onDeleteAccount,
}) {
  const { dangerZone } =
    profileContent;

  const [confirmation, setConfirmation] =
    useState("");

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [error, setError] =
    useState("");

  const canDelete =
    confirmation ===
    dangerZone.confirmationText;

  const handleDelete = async () => {
    if (!canDelete || isDeleting) {
      setError(
        `Type ${dangerZone.confirmationText} to continue.`,
      );

      return;
    }

    const confirmed = window.confirm(
      dangerZone.warning,
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      await onDeleteAccount();
    } catch (deleteError) {
      setError(
        deleteError?.response?.data
          ?.message ??
          "Unable to delete your account.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <IconBox
          icon={dangerZone.icon}
          size="large"
          variant="danger"
          animated={false}
        />

        <SectionHeading
          eyebrow={dangerZone.eyebrow}
          title={dangerZone.title}
          description={
            dangerZone.description
          }
          align="left"
        />
      </div>

      <div
        className={styles.warning}
        role="alert"
      >
        {dangerZone.warning}
      </div>

      <div className={styles.confirmation}>
        <div className={styles.input}>
          <Input
            label={
              dangerZone.confirmationLabel
            }
            name="deleteConfirmation"
            value={confirmation}
            placeholder={
              dangerZone.inputPlaceholder
            }
            error={error}
            onChange={(event) => {
              setConfirmation(
                event.target.value,
              );

              if (error) {
                setError("");
              }
            }}
          />
        </div>

        <Button
          type="button"
          variant="danger"
          icon={dangerZone.icon}
          loading={isDeleting}
          disabled={
            !canDelete || isDeleting
          }
          onClick={handleDelete}
        >
          {isDeleting
            ? dangerZone.deletingButton
            : dangerZone.deleteButton}
        </Button>
      </div>
    </Card>
  );
}

ProfileDangerZone.propTypes = {
  onDeleteAccount:
    PropTypes.func.isRequired,
};

export default ProfileDangerZone;