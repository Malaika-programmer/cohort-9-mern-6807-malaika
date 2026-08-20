import PropTypes from "prop-types";
import styles from "./Switch.module.css";

function Switch({
  checked,
  label,
  description,
  disabled = false,
  onChange,
}) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.text}>
        <span>{label}</span>
        {description && <small>{description}</small>}
      </span>

      <span className={styles.control}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
      </span>
    </label>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Switch;
