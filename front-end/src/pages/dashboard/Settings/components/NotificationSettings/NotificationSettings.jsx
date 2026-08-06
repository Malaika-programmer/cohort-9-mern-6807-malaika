import PropTypes from "prop-types";
import { settingsContent } from "../../../../../Scripts/Contents/Dashboard/Settings";
import { Card, SectionHeading, Switch } from "../../../../../components/ui";
import styles from "./NotificationSettings.module.css";

function NotificationSettings({ values, onChange }) {
  const content = settingsContent.sections.notifications;

  return (
    <Card className={styles.card}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        align="left"
      />

      {content.switches.map((item) => (
        <div key={item.key} className={styles.row}>
          <Switch
            label={item.label}
            description={item.description}
            checked={values[item.key]}
            onChange={(checked) => onChange({ [item.key]: checked })}
          />
        </div>
      ))}
    </Card>
  );
}

NotificationSettings.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NotificationSettings;
