import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({
  children,
  as: Component = "button",
  variant = "primary",
  size = "medium",
  type = "button",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  onClick,
  ...rest
}) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isDisabled = disabled || loading;

  return (
    <Component
      type={Component === "button" ? type : undefined}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {loading && (
        <span
          className={styles.spinner}
          aria-hidden="true"
        />
      )}

      {!loading && Icon && iconPosition === "left" && (
        <Icon
          className={styles.icon}
          aria-hidden="true"
        />
      )}

      <span className={styles.label}>
        {loading ? "Please wait..." : children}
      </span>

      {!loading && Icon && iconPosition === "right" && (
        <Icon
          className={styles.icon}
          aria-hidden="true"
        />
      )}
    </Component>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.elementType,

  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "ghost",
    "danger",
  ]),

  size: PropTypes.oneOf([
    "small",
    "medium",
    "large",
  ]),

  type: PropTypes.oneOf([
    "button",
    "submit",
    "reset",
  ]),

  icon: PropTypes.elementType,

  iconPosition: PropTypes.oneOf([
    "left",
    "right",
  ]),

  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
