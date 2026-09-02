import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Camera,
  Save,
  Lock,
  Trash2,
  Plus,
  X,
  Link,
  Code,
  Globe,
  Shield,
} from "lucide-react";

import profileService from "../../../services/profileService";
import { clearAuthData } from "../../../utils/auth";

import styles from "./ProfilePage.module.css";

const defaultProfile = {
  fullName: "",
  email: "",
  bio: "",
  avatar: "",
  skills: [],
  socialLinks: {
    linkedin: "",
    github: "",
    portfolio: "",
  },
};

function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    bio: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [newSkill, setNewSkill] = useState("");

  const [socialLinks, setSocialLinks] = useState(
    defaultProfile.socialLinks,
  );

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingSkills, setSavingSkills] = useState(false);
  const [savingSocials, setSavingSocials] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileService.getProfile();

        if (response?.data) {
          const data = {
            ...defaultProfile,
            ...response.data,
            skills: response.data.skills || [],
            socialLinks: {
              ...defaultProfile.socialLinks,
              ...(response.data.socialLinks || {}),
            },
          };

          setProfile(data);

          setProfileForm({
            fullName: data.fullName || "",
            email: data.email || "",
            bio: data.bio || "",
          });

          setSocialLinks(data.socialLinks);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfileForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    try {
      setSavingProfile(true);

      const response =
        await profileService.updateProfile(profileForm);

      if (response?.data) {
        setProfile((current) => ({
          ...current,
          ...response.data,
        }));
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAvatarUpdate = async (event) => {
    const avatarUrl = event.target.value;

    setProfile((current) => ({
      ...current,
      avatar: avatarUrl,
    }));

    try {
      await profileService.updateAvatar(avatarUrl);
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };

  const addSkill = async () => {
    const skill = newSkill.trim();

    if (!skill || profile.skills.includes(skill)) {
      return;
    }

    const updatedSkills = [...profile.skills, skill];

    setProfile((current) => ({
      ...current,
      skills: updatedSkills,
    }));

    setNewSkill("");

    try {
      setSavingSkills(true);
      await profileService.updateSkills(updatedSkills);
    } catch (error) {
      console.error("Failed to update skills:", error);
    } finally {
      setSavingSkills(false);
    }
  };

  const removeSkill = async (skillToRemove) => {
    const updatedSkills = profile.skills.filter(
      (skill) => skill !== skillToRemove,
    );

    setProfile((current) => ({
      ...current,
      skills: updatedSkills,
    }));

    try {
      setSavingSkills(true);
      await profileService.updateSkills(updatedSkills);
    } catch (error) {
      console.error("Failed to update skills:", error);
    } finally {
      setSavingSkills(false);
    }
  };

  const handleSocialChange = (event) => {
    const { name, value } = event.target;

    setSocialLinks((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSocialLinksUpdate = async (event) => {
    event.preventDefault();

    try {
      setSavingSocials(true);

      await profileService.updateSocialLinks(socialLinks);

      setProfile((current) => ({
        ...current,
        socialLinks,
      }));
    } catch (error) {
      console.error("Failed to update social links:", error);
    } finally {
      setSavingSocials(false);
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      return;
    }

    try {
      setSavingPassword(true);

      await profileService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Failed to change password:", error);
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingAccount(true);

      await profileService.deleteAccount();

      clearAuthData();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setDeletingAccount(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.profilePage}>
        <div className={styles.loadingState}>
          Loading your profile...
        </div>
      </main>
    );
  }

  return (
    <main className={styles.profilePage}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Account</span>
          <h1>Profile</h1>
          <p>
            Manage your personal information, skills and
            account security.
          </p>
        </div>
      </header>

      <section className={styles.overview}>
        <div className={styles.avatarWrapper}>
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.fullName || "Profile"}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <User aria-hidden="true" />
            </div>
          )}
        </div>

        <div className={styles.overviewInfo}>
          <span className={styles.eyebrow}>Personal Workspace</span>
          <h2>{profile.fullName || "Your Profile"}</h2>
          <p>{profile.email}</p>
        </div>

        <div className={styles.avatarField}>
          <label htmlFor="avatar">Avatar URL</label>
          <div className={styles.inputWithIcon}>
            <Camera aria-hidden="true" />
            <input
              id="avatar"
              type="url"
              value={profile.avatar || ""}
              onChange={handleAvatarUpdate}
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.eyebrow}>
                Information
              </span>
              <h2>Personal information</h2>
            </div>
          </div>

          <form
            className={styles.form}
            onSubmit={handleProfileUpdate}
          >
            <div className={styles.field}>
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={profileForm.bio}
                onChange={handleProfileChange}
                placeholder="Tell us a little about yourself"
                rows={5}
              />
            </div>

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={savingProfile}
            >
              <Save aria-hidden="true" />
              {savingProfile ? "Saving..." : "Save changes"}
            </button>
          </form>
        </section>

        <div className={styles.sideColumn}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.eyebrow}>Skills</span>
                <h2>Your skills</h2>
              </div>
            </div>

            <div className={styles.skillInput}>
              <input
                value={newSkill}
                onChange={(event) =>
                  setNewSkill(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill"
              />

              <button
                type="button"
                onClick={addSkill}
                disabled={savingSkills}
                aria-label="Add skill"
              >
                <Plus aria-hidden="true" />
              </button>
            </div>

            <div className={styles.skills}>
              {profile.skills.length > 0 ? (
                profile.skills.map((skill) => (
                  <span key={skill} className={styles.skill}>
                    {skill}

                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}
                    >
                      <X aria-hidden="true" />
                    </button>
                  </span>
                ))
              ) : (
                <p className={styles.muted}>
                  No skills added yet.
                </p>
              )}
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.eyebrow}>Social</span>
                <h2>Social links</h2>
              </div>
            </div>

            <form
              className={styles.form}
              onSubmit={handleSocialLinksUpdate}
            >
              <div className={styles.field}>
                <label htmlFor="linkedin">LinkedIn</label>
                <div className={styles.inputWithIcon}>
                  <Link aria-hidden="true" />
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    value={socialLinks.linkedin}
                    onChange={handleSocialChange}
                    placeholder="LinkedIn profile URL"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="github">GitHub</label>
                <div className={styles.inputWithIcon}>
                  <Code aria-hidden="true" />
                  <input
                    id="github"
                    name="github"
                    type="url"
                    value={socialLinks.github}
                    onChange={handleSocialChange}
                    placeholder="GitHub profile URL"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="portfolio">Portfolio</label>
                <div className={styles.inputWithIcon}>
                  <Globe aria-hidden="true" />
                  <input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    value={socialLinks.portfolio}
                    onChange={handleSocialChange}
                    placeholder="Portfolio URL"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.secondaryButton}
                disabled={savingSocials}
              >
                {savingSocials ? "Saving..." : "Save links"}
              </button>
            </form>
          </section>
        </div>
      </div>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <span className={styles.eyebrow}>Security</span>
            <h2>Change password</h2>
          </div>

          <div className={styles.cardIcon}>
            <Lock aria-hidden="true" />
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={handlePasswordUpdate}
        >
          <div className={styles.securityGrid}>
            <div className={styles.field}>
              <label htmlFor="currentPassword">
                Current password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                autoComplete="current-password"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="newPassword">
                New password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                autoComplete="new-password"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={savingPassword}
          >
            <Shield aria-hidden="true" />
            {savingPassword
              ? "Updating..."
              : "Update password"}
          </button>
        </form>
      </section>

      <section className={styles.dangerCard}>
        <div>
          <span className={styles.dangerEyebrow}>
            Danger zone
          </span>
          <h2>Delete your account</h2>
          <p>
            Permanently remove your account and associated
            profile information. This action cannot be undone.
          </p>
        </div>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteAccount}
          disabled={deletingAccount}
        >
          <Trash2 aria-hidden="true" />
          {deletingAccount
            ? "Deleting..."
            : "Delete account"}
        </button>
      </section>
    </main>
  );
}

export default ProfilePage;