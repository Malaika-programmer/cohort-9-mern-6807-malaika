import {
  useEffect,
  useRef,
  useState,
} from "react";

import PropTypes from "prop-types";

import { profileContent } from "../../../../../Scripts/Contents/Dashboard/Profile";

import {
  Badge,
  Button,
  Card,
} from "../../../../../components/ui";

import styles from "./ProfileOverview.module.css";

function ProfileOverview({
  profile,
  onAvatarUpdate,
}) {
  const {
    overview,
    validation,
    icons,
  } = profileContent;

  const fileInputRef = useRef(null);

  const [imageError, setImageError] =
    useState("");

  const [previewUrl, setPreviewUrl] =
    useState(profile.avatar || "");

  useEffect(
    () => () => {
      if (
        previewUrl &&
        previewUrl.startsWith("blob:")
      ) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl],
  );

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const supportedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!supportedTypes.includes(file.type)) {
      setImageError(validation.imageType);
      event.target.value = "";
      return;
    }

    const maximumSize = 2 * 1024 * 1024;

    if (file.size > maximumSize) {
      setImageError(validation.imageSize);
      event.target.value = "";
      return;
    }

    setImageError("");

    const objectUrl =
      URL.createObjectURL(file);

    if (
      previewUrl &&
      previewUrl.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(objectUrl);
    onAvatarUpdate(objectUrl);

    /*
     * Backend ko actual `file` send hoga.
     */
  };

  const handleRemovePhoto = () => {
    if (
      previewUrl &&
      previewUrl.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl("");
    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onAvatarUpdate("");
  };

  return (
    <Card className={styles.overview}>
      <div className={styles.profileArea}>
        <div className={styles.avatarWrapper}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={profile.fullName}
              className={styles.avatarImage}
            />
          ) : (
            <span className={styles.avatarFallback}>
              {overview.avatarFallback}
            </span>
          )}

          <button
            type="button"
            className={styles.cameraButton}
            aria-label={overview.changePhotoLabel}
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            <icons.camera aria-hidden="true" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className={styles.hiddenInput}
            onChange={handleImageChange}
          />
        </div>

        <div className={styles.identity}>
          <div className={styles.nameRow}>
            <h2>{profile.fullName}</h2>

            <Badge variant="success">
              {overview.accountStatus}
            </Badge>
          </div>

          <p>@{profile.username}</p>

          <span>{profile.email}</span>

          <div className={styles.photoActions}>
            <Button
              type="button"
              size="small"
              icon={icons.camera}
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              {overview.changePhotoLabel}
            </Button>

            {previewUrl && (
              <Button
                type="button"
                size="small"
                variant="outline"
                icon={icons.close}
                onClick={handleRemovePhoto}
              >
                {overview.removePhotoLabel}
              </Button>
            )}
          </div>

          <small>{overview.photoHelpText}</small>

          {imageError && (
            <span
              className={styles.imageError}
              role="alert"
            >
              {imageError}
            </span>
          )}
        </div>
      </div>

      <div className={styles.accountDetails}>
        <div className={styles.detail}>
          <span>
            {overview.memberSinceLabel}
          </span>

          <strong>
            {overview.memberSince}
          </strong>
        </div>

        <div className={styles.detail}>
          <span>
            {overview.accountStatusLabel}
          </span>

          <strong>
            {overview.accountStatus}
          </strong>
        </div>

        <div className={styles.detail}>
          <span>{overview.roleLabel}</span>
          <strong>{overview.role}</strong>
        </div>

        <div className={styles.completion}>
          <div>
            <span>
              {overview.completionLabel}
            </span>

            <strong>
              {overview.completion}%
            </strong>
          </div>

          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label={overview.completionLabel}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={
              overview.completion
            }
          >
            <span
              style={{
                width: `${overview.completion}%`,
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

ProfileOverview.propTypes = {
  profile: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,

  onAvatarUpdate:
    PropTypes.func.isRequired,
};

export default ProfileOverview;
