import {
  useMemo,
  useState,
} from "react";

import PropTypes from "prop-types";
import { Save, X } from "lucide-react";

import { tasksContent } from "../../../../../Scripts/Contents/Dashboard/Tasks";

import {
  Button,
  Card,
  Input,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./TaskEditor.module.css";

const initialValues = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  category: "",
  dueDate: "",
};

function getInitialValues(task) {
  if (!task) {
    return initialValues;
  }

  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    category: task.category,
    dueDate: task.dueDate ?? "",
  };
}

function isPastDate(dateValue) {
  if (!dateValue) {
    return false;
  }

  const selectedDate = new Date(
    `${dateValue}T00:00:00`,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate < today;
}

function TaskEditor({
  task,
  onSave,
  onCancel,
}) {
  const {
    editor,
    filters,
    validation,
  } = tasksContent;

  const [formValues, setFormValues] =
    useState(() => getInitialValues(task));

  const [errors, setErrors] = useState({});

  const isEditing = Boolean(task);

  const hasPastDueDate = useMemo(
    () => isPastDate(formValues.dueDate),
    [formValues.dueDate],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    const normalizedTitle =
      formValues.title.trim();

    const normalizedDescription =
      formValues.description.trim();

    if (!normalizedTitle) {
      validationErrors.title =
        validation.titleRequired;
    } else if (
      normalizedTitle.length < 3
    ) {
      validationErrors.title =
        validation.titleMinimum;
    }

    if (
      normalizedDescription.length > 500
    ) {
      validationErrors.description =
        validation.descriptionMaximum;
    }

    if (!formValues.status) {
      validationErrors.status =
        validation.statusRequired;
    }

    if (!formValues.priority) {
      validationErrors.priority =
        validation.priorityRequired;
    }

    if (!formValues.category) {
      validationErrors.category =
        validation.categoryRequired;
    }

    if (
      formValues.dueDate &&
      Number.isNaN(
        new Date(
          `${formValues.dueDate}T00:00:00`,
        ).getTime(),
      )
    ) {
      validationErrors.dueDate =
        validation.dueDateInvalid;
    }

    return validationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors =
      validateForm();

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      title: formValues.title.trim(),
      description:
        formValues.description.trim(),
      status: formValues.status,
      priority: formValues.priority,
      category: formValues.category,
      dueDate:
        formValues.dueDate || null,
    });
  };

  return (
    <div className={styles.overlay}>
      <Card className={styles.editor}>
        <button
          type="button"
          className={styles.closeButton}
          aria-label={editor.cancelButton}
          onClick={onCancel}
        >
          <X aria-hidden="true" />
        </button>

        <SectionHeading
          eyebrow={
            isEditing
              ? editor.editEyebrow
              : editor.createEyebrow
          }
          title={
            isEditing
              ? editor.editTitle
              : editor.createTitle
          }
          description={
            isEditing
              ? editor.editDescription
              : editor.createDescription
          }
          align="left"
        />

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            label={editor.fields.title.label}
            name={editor.fields.title.name}
            value={formValues.title}
            placeholder={
              editor.fields.title.placeholder
            }
            error={errors.title}
            required
            onChange={handleChange}
          />

          <label className={styles.field}>
            <span>
              {editor.fields.description.label}
            </span>

            <textarea
              name={
                editor.fields.description.name
              }
              value={formValues.description}
              rows={5}
              maxLength={500}
              placeholder={
                editor.fields.description
                  .placeholder
              }
              aria-invalid={Boolean(
                errors.description,
              )}
              onChange={handleChange}
            />

            <div className={styles.fieldFooter}>
              {errors.description ? (
                <small role="alert">
                  {errors.description}
                </small>
              ) : (
                <span />
              )}

              <span>
                {
                  formValues.description
                    .length
                }
                /500
              </span>
            </div>
          </label>

          <div className={styles.selectGrid}>
            <EditorSelect
              label={editor.fields.status.label}
              name={editor.fields.status.name}
              value={formValues.status}
              options={filters.statuses.filter(
                (option) =>
                  option.value !== "all",
              )}
              error={errors.status}
              placeholder={
                editor.selectPlaceholder
              }
              onChange={handleChange}
            />

            <EditorSelect
              label={
                editor.fields.priority.label
              }
              name={
                editor.fields.priority.name
              }
              value={formValues.priority}
              options={filters.priorities.filter(
                (option) =>
                  option.value !== "all",
              )}
              error={errors.priority}
              placeholder={
                editor.selectPlaceholder
              }
              onChange={handleChange}
            />

            <EditorSelect
              label={
                editor.fields.category.label
              }
              name={
                editor.fields.category.name
              }
              value={formValues.category}
              options={filters.categories.filter(
                (option) =>
                  option.value !== "all",
              )}
              error={errors.category}
              placeholder={
                editor.selectPlaceholder
              }
              onChange={handleChange}
            />
          </div>

          <Input
            label={editor.fields.dueDate.label}
            name={editor.fields.dueDate.name}
            type="date"
            value={formValues.dueDate}
            error={errors.dueDate}
            onChange={handleChange}
          />

          {hasPastDueDate && (
            <div
              className={styles.warning}
              role="status"
            >
              {editor.pastDateWarning}
            </div>
          )}

          <div className={styles.actions}>
            <Button
              type="button"
              variant="outline"
              icon={X}
              onClick={onCancel}
            >
              {editor.cancelButton}
            </Button>

            <Button
              type="submit"
              icon={Save}
            >
              {isEditing
                ? editor.updateButton
                : editor.saveButton}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function EditorSelect({
  label,
  name,
  value,
  options,
  error,
  placeholder,
  onChange,
}) {
  return (
    <label className={styles.field}>
      <span>
        {label}
        <strong aria-hidden="true">
          *
        </strong>
      </span>

      <select
        name={name}
        value={value}
        aria-invalid={Boolean(error)}
        onChange={onChange}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <small role="alert">
          {error}
        </small>
      )}
    </label>
  );
}

EditorSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,

  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,

  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TaskEditor.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    priority: PropTypes.string,
    category: PropTypes.string,
    dueDate: PropTypes.string,
  }),

  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TaskEditor;
