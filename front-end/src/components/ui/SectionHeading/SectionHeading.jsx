import PropTypes from "prop-types";
import styles from "./SectionHeading.module.css";

function SectionHeading({
  eyebrow,
  badge,
  title,
  titleId,
  description,
  align = "center",
  className = "",
}) {
  const displayEyebrow = eyebrow || badge;
  return (
    <div
      className={`${styles.wrapper} ${styles[align]} ${className}`}
    >
      {displayEyebrow && (
        <span className={styles.eyebrow}>
          {displayEyebrow}
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
  badge: PropTypes.string,
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
