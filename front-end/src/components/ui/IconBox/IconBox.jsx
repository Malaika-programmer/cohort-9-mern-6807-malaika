import PropTypes from "prop-types";
import styles from "./IconBox.module.css";

function IconBox({
  icon: Icon,
  children,
  size = "medium",
  variant = "primary",
  shape = "rounded",
  animated = true,
  className = "",
}) {
  const normalizedSize =
    {
      sm: "small",
      md: "medium",
      lg: "large",
      xl: "large",
    }[size] || size;

  const iconBoxClasses = [
    styles.iconBox,
    styles[normalizedSize],
    styles[variant],
    styles[shape],
    animated ? styles.animated : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={iconBoxClasses}>
      {children ||
        (Icon && (
          <Icon
            className={styles.icon}
            aria-hidden="true"
          />
        ))}
    </span>
  );
}

IconBox.propTypes = {
  icon: PropTypes.elementType,
  children: PropTypes.node,

  size: PropTypes.oneOf([
    "sm",
    "small",
    "md",
    "medium",
    "lg",
    "large",
    "xl",
  ]),

  variant: PropTypes.oneOf([
    "primary",
    "success",
    "warning",
    "danger",
    "dark",
    "neutral",
  ]),

  shape: PropTypes.oneOf([
    "rounded",
    "circle",
    "square",
  ]),

  animated: PropTypes.bool,
  className: PropTypes.string,
};

export default IconBox;
