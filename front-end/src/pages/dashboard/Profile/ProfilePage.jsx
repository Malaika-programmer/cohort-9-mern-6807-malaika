import { useState } from "react";

import { profileContent } from "../../../Scripts/Contents/Dashboard/Profile";

import {
  ProfileDangerZone,
  ProfileHeader,
  ProfileInformation,
  ProfileOverview,
  ProfileSecurity,
  ProfileSkills,
  ProfileSocialLinks,
} from "./components";

import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const [profile, setProfile] = useState(
    profileContent.initialProfile,
  );

  const handleProfileUpdate = (profileValues) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      ...profileValues,
    }));

    /*
     * Backend integration:
     *
     * await profileService.updateProfile(
     *   profileValues
     * );
     */
  };

  const handleAvatarUpdate = (avatarUrl) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      avatar: avatarUrl,
    }));

    /*
     * Backend:
     *
     * const formData = new FormData();
     * formData.append("avatar", file);
     *
     * await profileService.uploadAvatar(
     *   formData
     * );
     */
  };

  const handleSkillsUpdate = (skills) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      skills,
    }));

    /*
     * Backend:
     *
     * await profileService.updateSkills({
     *   skills
     * });
     */
  };

  const handleSocialLinksUpdate = (
    socialLinks,
  ) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      socialLinks,
    }));

    /*
     * Backend:
     *
     * await profileService.updateSocialLinks(
     *   socialLinks
     * );
     */
  };

  const handlePasswordUpdate = async (
    passwordValues,
  ) => {
    /*
     * Backend:
     *
     * await authService.changePassword(
     *   passwordValues
     * );
     */

    console.log(
      "Password update payload:",
      passwordValues,
    );
  };

  const handleDeleteAccount = async () => {
    /*
     * Backend:
     *
     * await profileService.deleteAccount();
     * clear authentication state
     * navigate("/login");
     */

    console.log("Delete account");
  };

  return (
    <main className={styles.profilePage}>
      <ProfileHeader />

      <ProfileOverview
        profile={profile}
        onAvatarUpdate={handleAvatarUpdate}
      />

      <div className={styles.contentGrid}>
        <ProfileInformation
          profile={profile}
          onSave={handleProfileUpdate}
        />

        <div className={styles.sideColumn}>
          <ProfileSkills
            skills={profile.skills}
            onSave={handleSkillsUpdate}
          />

          <ProfileSocialLinks
            socialLinks={profile.socialLinks}
            onSave={handleSocialLinksUpdate}
          />
        </div>
      </div>

      <ProfileSecurity
        onUpdatePassword={
          handlePasswordUpdate
        }
      />

      <ProfileDangerZone
        onDeleteAccount={
          handleDeleteAccount
        }
      />
    </main>
  );
}

export default ProfilePage;