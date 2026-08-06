import { forwardRef, useId } from "react";
import PropTypes from "prop-types";
import styles from "./TextArea.module.css";

const TextArea = forwardRef(function TextArea(
  {
    label,
    name,
    value,
    defaultValue,
    placeholder = "",
    error = "",
    helperText = "",
    required = false,
    disabled = false,
    fullWidth = true,
    className = "",
    textAreaClassName = "",
    onChange,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const textAreaId = rest.id || generatedId;
  const hasError = Boolean(error);

  const wrapperClasses = [
    styles.wrapper,
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textAreaClasses = [
    styles.textArea,
    hasError ? styles.errorState : "",
    disabled ? styles.disabledState : "",
    textAreaClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const describedById = hasError
    ? `${textAreaId}-error`
    : helperText
      ? `${textAreaId}-helper`
      : undefined;

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          className={styles.label}
          htmlFor={textAreaId}
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

      <textarea
        ref={ref}
        id={textAreaId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={describedById}
        className={textAreaClasses}
        onChange={onChange}
        {...rest}
      />

      {hasError ? (
        <p
          id={`${textAreaId}-error`}
          className={styles.errorMessage}
          role="alert"
        >
          {error}
        </p>
      ) : (
        helperText && (
          <p
            id={`${textAreaId}-helper`}
            className={styles.helperText}
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
});

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  textAreaClassName: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextArea;
