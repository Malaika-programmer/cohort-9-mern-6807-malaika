import { profileContent } from "../../../../../Scripts/Contents/Dashboard/Profile";

import {
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./ProfileHeader.module.css";

function ProfileHeader() {
  const { header } = profileContent;

  return (
    <section className={styles.header}>
      <IconBox
        icon={UserIcon}
        size="large"
        variant="primary"
        animated={false}
      />

      <SectionHeading
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
        align="left"
      />
    </section>
  );
}

const UserIcon =
  profileContent.information.fields.fullName
    .icon;

export default ProfileHeader;