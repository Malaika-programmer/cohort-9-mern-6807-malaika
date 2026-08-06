import PropTypes from "prop-types";
import styles from "./SectionHeading.module.css";

function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  align = "center",
  className = "",
}) {
  return (
    <div
      className={`${styles.wrapper} ${styles[align]} ${className}`}
    >
      {eyebrow && (
        <span className={styles.eyebrow}>
          {eyebrow}
        </span>
      )}

      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>

      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
    </div>
  );
}

SectionHeading.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string,
  description: PropTypes.string,
  align: PropTypes.oneOf([
    "left",
    "center",
    "right",
  ]),
  className: PropTypes.string,
};

export default SectionHeading;
