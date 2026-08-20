import PropTypes from "prop-types";
import styles from "./Badge.module.css";

function Badge({
  children,
  variant = "primary",
  rounded = true,
  className = "",
}) {
  return (
    <span
      className={[
        styles.badge,
        styles[variant],
        rounded ? styles.rounded : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "success",
    "warning",
    "danger",
    "dark",
    "light",
  ]),
  rounded: PropTypes.bool,
  className: PropTypes.string,
};

export default Badge;