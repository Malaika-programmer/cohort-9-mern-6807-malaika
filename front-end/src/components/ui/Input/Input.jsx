import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
} from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

function renderInputIcon(icon, className, extraProps = {}) {
  if (!icon) {
    return null;
  }

  if (isValidElement(icon)) {
    return cloneElement(icon, {
      className: [icon.props.className, className]
        .filter(Boolean)
        .join(" "),
      "aria-hidden": icon.props["aria-hidden"] ?? true,
      ...extraProps,
    });
  }

  const Icon = icon;

  return (
    <Icon
      className={className}
      aria-hidden="true"
      {...extraProps}
    />
  );
}

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    name,
    value,
    defaultValue,
    placeholder = "",
    icon: Icon,
    iconPosition = "left",
    rightIcon,
    error = "",
    helperText = "",
    required = false,
    disabled = false,
    fullWidth = true,
    className = "",
    inputClassName = "",
    onChange,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const inputId = rest.id || generatedId;

  const hasError = Boolean(error);

  const wrapperClasses = [
    styles.wrapper,
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputWrapperClasses = [
    styles.inputWrapper,
    hasError ? styles.errorState : "",
    disabled ? styles.disabledState : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    styles.input,
    Icon && iconPosition === "left" ? styles.withLeftIcon : "",
    (Icon && iconPosition === "right") || rightIcon
      ? styles.withRightIcon
      : "",
    inputClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const describedById = hasError
    ? `${inputId}-error`
    : helperText
      ? `${inputId}-helper`
      : undefined;

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          className={styles.label}
          htmlFor={inputId}
        >
          {label}

          {required && (
            <span
              className={styles.required}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      <div className={inputWrapperClasses}>
        {Icon && iconPosition === "left" && (
          renderInputIcon(
            Icon,
            `${styles.icon} ${styles.leftIcon}`,
          )
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedById}
          className={inputClasses}
          onChange={onChange}
          {...rest}
        />

        {rightIcon ? (
          renderInputIcon(
            rightIcon,
            `${styles.icon} ${styles.rightIcon} ${styles.clickableIcon}`,
          )
        ) : (
          Icon &&
          iconPosition === "right" &&
          renderInputIcon(
            Icon,
            `${styles.icon} ${styles.rightIcon}`,
          )
        )}
      </div>

      {hasError ? (
        <p
          id={`${inputId}-error`}
          className={styles.errorMessage}
          role="alert"
        >
          {error}
        </p>
      ) : (
        helperText && (
          <p
            id={`${inputId}-helper`}
            className={styles.helperText}
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
  ]),
  iconPosition: PropTypes.oneOf([
    "left",
    "right",
  ]),
  rightIcon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
  ]),
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
