import { useState } from "react";
import PropTypes from "prop-types";
import { Save, X } from "lucide-react";

import { notesContent } from "../../../../../Scripts/Contents/Dashboard/Notes";
import {
  Button,
  Card,
  Input,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./NoteEditor.module.css";

const initialValues = {
  title: "",
  category: "",
  content: "",
  isPinned: false,
};

function getInitialValues(note) {
  if (!note) {
    return initialValues;
  }

  return {
    title: note.title,
    category: note.category,
    content: note.content,
    isPinned: note.isPinned,
  };
}

function NoteEditor({
  note,
  onSave,
  onCancel,
}) {
  const { editor, filters, validation } = notesContent;

  const [formValues, setFormValues] =
    useState(() => getInitialValues(note));
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(note);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
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
    const normalizedTitle = formValues.title.trim();
    const normalizedContent = formValues.content.trim();

    if (!normalizedTitle) {
      validationErrors.title =
        validation.titleRequired;
    } else if (normalizedTitle.length < 3) {
      validationErrors.title =
        validation.titleMinimum;
    }

    if (!formValues.category) {
      validationErrors.category =
        validation.categoryRequired;
    }

    if (!normalizedContent) {
      validationErrors.content =
        validation.contentRequired;
    } else if (normalizedContent.length < 10) {
      validationErrors.content =
        validation.contentMinimum;
    }

    return validationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      title: formValues.title.trim(),
      category: formValues.category,
      content: formValues.content.trim(),
      isPinned: formValues.isPinned,
    });
  };

  return (
    <div
      className={styles.overlay}
      role="presentation"
    >
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
            placeholder={editor.fields.title.placeholder}
            error={errors.title}
            required
            onChange={handleChange}
          />

          <label className={styles.field}>
            <span>
              {editor.fields.category.label}
              <strong aria-hidden="true">*</strong>
            </span>

            <select
              name={editor.fields.category.name}
              value={formValues.category}
              aria-invalid={Boolean(errors.category)}
              onChange={handleChange}
            >
              <option value="">
                Select a category
              </option>

              {filters.categories
                .filter(
                  (category) =>
                    category.value !== "all",
                )
                .map((category) => (
                  <option
                    key={category.value}
                    value={category.value}
                  >
                    {category.label}
                  </option>
                ))}
            </select>

            {errors.category && (
              <small role="alert">
                {errors.category}
              </small>
            )}
          </label>

          <label className={styles.field}>
            <span>
              {editor.fields.content.label}
              <strong aria-hidden="true">*</strong>
            </span>

            <textarea
              name={editor.fields.content.name}
              value={formValues.content}
              rows={9}
              placeholder={
                editor.fields.content.placeholder
              }
              aria-invalid={Boolean(errors.content)}
              onChange={handleChange}
            />

            {errors.content && (
              <small role="alert">
                {errors.content}
              </small>
            )}
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name={editor.fields.pinned.name}
              checked={formValues.isPinned}
              onChange={handleChange}
            />

            <span>{editor.fields.pinned.label}</span>
          </label>

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

NoteEditor.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    content: PropTypes.string,
    isPinned: PropTypes.bool,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default NoteEditor;
