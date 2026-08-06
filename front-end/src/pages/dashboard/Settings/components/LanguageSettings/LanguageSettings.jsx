import PropTypes from "prop-types";
import { settingsContent } from "../../../../../Scripts/Contents/Dashboard/Settings";
import { Card, SectionHeading } from "../../../../../components/ui";
import styles from "./LanguageSettings.module.css";

function LanguageSettings({ values, onChange }) {
  const content = settingsContent.sections.language;

  return (
    <Card className={styles.card}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        align="left"
      />

      {content.fields.map((field) => (
        <div key={field.name} className={styles.field}>
          <label>{field.label}</label>

          <select
            value={values[field.name]}
            onChange={(event) =>
              onChange({ [field.name]: event.target.value })
            }
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </Card>
  );
}

LanguageSettings.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LanguageSettings;
