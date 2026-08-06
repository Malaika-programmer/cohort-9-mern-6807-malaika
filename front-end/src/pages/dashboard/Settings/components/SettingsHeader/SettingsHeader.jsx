import { settingsContent } from "../../../../../Scripts/Contents/Dashboard/Settings";

import {
  SectionHeading,
  IconBox,
} from "../../../../../components/ui";

import styles from "./SettingsHeader.module.css";

function SettingsHeader() {
  return (
    <section className={styles.header}>
      <IconBox
        icon={settingsContent.header.icon}
        size="large"
        variant="primary"
        animated={false}
      />

      <SectionHeading
        eyebrow={settingsContent.header.eyebrow}
        title={settingsContent.header.title}
        description={settingsContent.header.description}
        align="left"
      />
    </section>
  );
}

export default SettingsHeader;