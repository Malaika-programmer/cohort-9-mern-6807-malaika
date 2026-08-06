import PropTypes from "prop-types";
import { settingsContent } from "../../../../../Scripts/Contents/Dashboard/Settings";
import { Button, Card, SectionHeading, Switch } from "../../../../../components/ui";
import styles from "./AppearanceSettings.module.css";

function AppearanceSettings({ values, onChange }) {
  const content = settingsContent.sections.appearance;

  const updateValue = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <Card className={styles.card}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        align="left"
      />

      {Object.values(content.groups).map((group) => (
        <div key={group.key} className={styles.group}>
          <h3>{group.title}</h3>

          <div className={styles.options}>
            {group.options.map((option) => (
              <Button
                key={option.value}
                variant={
                  values[group.key] === option.value
                    ? "primary"
                    : "outline"
                }
                onClick={() => updateValue(group.key, option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      ))}

      <div className={styles.switches}>
        {content.switches.map((item) => (
          <Switch
            key={item.key}
            label={item.label}
            description={item.description}
            checked={values[item.key]}
            onChange={(checked) => updateValue(item.key, checked)}
          />
        ))}
      </div>
    </Card>
  );
}

AppearanceSettings.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AppearanceSettings;
