import {
  useMemo,
  useState,
} from "react";

import PropTypes from "prop-types";
import { Save, X } from "lucide-react";

import { scheduleContent } from "../../../../../Scripts/Contents/Dashboard/Schedule";

import {
  Button,
  Card,
  Input,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./ScheduleEditor.module.css";

const initialValues = {
  title: "",
  description: "",
  type: "",
  date: "",
  startTime: "",
  endTime: "",
  priority: "medium",
  status: "scheduled",
  taskId: "",
  reminder: "none",
};

function getInitialValues(schedule, defaultDate) {
  if (!schedule) {
    return {
      ...initialValues,
      date: defaultDate ?? "",
    };
  }

  return {
    title: schedule.title,
    description: schedule.description,
    type: schedule.type,
    date: schedule.date,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    priority: schedule.priority,
    status: schedule.status,
    taskId: schedule.taskId ?? "",
    reminder: schedule.reminder ?? "none",
  };
}

function isPastSchedule(values) {
  if (!values.date || !values.startTime) {
    return false;
  }

  const scheduleDate = new Date(
    `${values.date}T${values.startTime}:00`,
  );

  return scheduleDate < new Date();
}

function ScheduleEditor({
  schedule,
  defaultDate,
  schedules,
  onSave,
  onCancel,
}) {
  const {
    editor,
    filters,
    reminders,
    relatedTasks,
    validation,
  } = scheduleContent;

  const [formValues, setFormValues] =
    useState(() =>
      getInitialValues(schedule, defaultDate),
    );

  const [errors, setErrors] = useState({});

  const isEditing = Boolean(schedule);

  const hasPastWarning = useMemo(
    () => isPastSchedule(formValues),
    [formValues],
  );

  const hasConflict = useMemo(() => {
    if (
      !formValues.date ||
      !formValues.startTime ||
      !formValues.endTime
    ) {
      return false;
    }

    return schedules.some(
      (currentSchedule) => {
        if (
          schedule &&
          currentSchedule.id === schedule.id
        ) {
          return false;
        }

        if (
          currentSchedule.date !==
          formValues.date
        ) {
          return false;
        }

        return (
          formValues.startTime <
            currentSchedule.endTime &&
          formValues.endTime >
            currentSchedule.startTime
        );
      },
    );
  }, [
    formValues.date,
    formValues.startTime,
    formValues.endTime,
    schedule,
    schedules,
  ]);

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

    if (!normalizedTitle) {
      validationErrors.title =
        validation.titleRequired;
    } else if (normalizedTitle.length < 3) {
      validationErrors.title =
        validation.titleMinimum;
    }

    if (
      formValues.description.trim().length >
      500
    ) {
      validationErrors.description =
        validation.descriptionMaximum;
    }

    if (!formValues.type) {
      validationErrors.type =
        validation.typeRequired;
    }

    if (!formValues.date) {
      validationErrors.date =
        validation.dateRequired;
    }

    if (!formValues.startTime) {
      validationErrors.startTime =
        validation.startTimeRequired;
    }

    if (!formValues.endTime) {
      validationErrors.endTime =
        validation.endTimeRequired;
    }

    if (
      formValues.startTime &&
      formValues.endTime &&
      formValues.endTime <=
        formValues.startTime
    ) {
      validationErrors.endTime =
        validation.endTimeInvalid;
    }

    if (!formValues.priority) {
      validationErrors.priority =
        validation.priorityRequired;
    }

    if (!formValues.status) {
      validationErrors.status =
        validation.statusRequired;
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
      type: formValues.type,
      date: formValues.date,
      startTime: formValues.startTime,
      endTime: formValues.endTime,
      priority: formValues.priority,
      status: formValues.status,
      taskId: formValues.taskId || null,
      reminder: formValues.reminder,
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
              rows={4}
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
                {formValues.description.length}
                /500
              </span>
            </div>
          </label>

          <div className={styles.grid}>
            <EditorSelect
              label={editor.fields.type.label}
              name={editor.fields.type.name}
              value={formValues.type}
              options={filters.types.filter(
                (option) =>
                  option.value !== "all",
              )}
              error={errors.type}
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
          </div>

          <div className={styles.grid}>
            <Input
              label={editor.fields.date.label}
              name={editor.fields.date.name}
              type="date"
              value={formValues.date}
              error={errors.date}
              required
              onChange={handleChange}
            />

            <Input
              label={
                editor.fields.startTime.label
              }
              name={
                editor.fields.startTime.name
              }
              type="time"
              value={formValues.startTime}
              error={errors.startTime}
              required
              onChange={handleChange}
            />

            <Input
              label={editor.fields.endTime.label}
              name={editor.fields.endTime.name}
              type="time"
              value={formValues.endTime}
              error={errors.endTime}
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.gridTwo}>
            <EditorSelect
              label={editor.fields.taskId.label}
              name={editor.fields.taskId.name}
              value={formValues.taskId}
              options={relatedTasks.map(
                (task) => ({
                  label: task.title,
                  value: task.id,
                }),
              )}
              placeholder={editor.noTaskOption}
              onChange={handleChange}
            />

            <EditorSelect
              label={
                editor.fields.reminder.label
              }
              name={
                editor.fields.reminder.name
              }
              value={formValues.reminder}
              options={reminders}
              placeholder={
                editor.selectPlaceholder
              }
              onChange={handleChange}
            />
          </div>

          {hasPastWarning && (
            <div
              className={styles.warning}
              role="status"
            >
              {editor.pastWarning}
            </div>
          )}

          {hasConflict && (
            <div
              className={styles.conflict}
              role="alert"
            >
              {editor.conflictWarning}
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
      <span>{label}</span>

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
        <small role="alert">{error}</small>
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

ScheduleEditor.propTypes = {
  schedule: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
    taskId: PropTypes.string,
    reminder: PropTypes.string,
  }),

  defaultDate: PropTypes.string,

  schedules: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,

  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ScheduleEditor;
