import { useEffect, useMemo, useState } from "react";
import {
  Edit3,
  FileText,
  Plus,
  RotateCcw,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  Badge,
  Button,
  Card,
  IconBox,
  Input,
  SectionHeading,
} from "../../../components/ui";

import styles from "./Notes.module.css";

const API_URL = "http://localhost:5000/api/notes";

function getToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("authToken")
  );
}

async function notesRequest(endpoint = "", options = {}) {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("updated-desc");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
  });

  const [activeTab, setActiveTab] = useState("active");
  const [restoringId, setRestoringId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const endpoint = activeTab === "trash" ? "/trash" : "";
      const response = await notesRequest(endpoint);

      setNotes(response.data || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [activeTab]);

  const filteredNotes = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    const matchingNotes = notes.filter((note) => {
      if (!normalizedSearch) {
        return true;
      }

      return (
        note.title.toLowerCase().includes(normalizedSearch) ||
        note.content.toLowerCase().includes(normalizedSearch)
      );
    });

    return [...matchingNotes].sort((firstNote, secondNote) => {
      if (sortValue === "updated-asc") {
        return (
          new Date(firstNote.updatedAt) -
          new Date(secondNote.updatedAt)
        );
      }

      if (sortValue === "title-asc") {
        return firstNote.title.localeCompare(secondNote.title);
      }

      if (sortValue === "title-desc") {
        return secondNote.title.localeCompare(firstNote.title);
      }

      return (
        new Date(secondNote.updatedAt) -
        new Date(firstNote.updatedAt)
      );
    });
  }, [notes, searchValue, sortValue]);

  const recentNotesCount = useMemo(() => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    return notes.filter(
      (note) => new Date(note.updatedAt) >= lastWeek,
    ).length;
  }, [notes]);

  const openCreateEditor = () => {
    setSelectedNote(null);
    setFormValues({
      title: "",
      content: "",
    });
    setFormErrors({});
    setIsEditorOpen(true);
  };

  const openEditEditor = (note) => {
    setSelectedNote(note);
    setFormValues({
      title: note.title || "",
      content: note.content || "",
    });
    setFormErrors({});
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    if (saving) {
      return;
    }

    setSelectedNote(null);
    setFormValues({
      title: "",
      content: "",
    });
    setFormErrors({});
    setIsEditorOpen(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.title.trim()) {
      errors.title = "Title is required.";
    } else if (formValues.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters.";
    }

    if (!formValues.content.trim()) {
      errors.content = "Content is required.";
    } else if (formValues.content.trim().length < 10) {
      errors.content =
        "Content must be at least 10 characters.";
    }

    return errors;
  };

  const handleSaveNote = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: formValues.title.trim(),
        content: formValues.content.trim(),
      };

      if (selectedNote) {
        const response = await notesRequest(
          `/${selectedNote.id}`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          },
        );

        setNotes((currentNotes) =>
          currentNotes.map((note) =>
            note.id === selectedNote.id
              ? response.data
              : note,
          ),
        );
      } else {
        const response = await notesRequest("", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        setNotes((currentNotes) => [
          response.data,
          ...currentNotes,
        ]);
      }

      closeEditor();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const isTrash = activeTab === "trash";
    const message = isTrash 
      ? "Are you sure you want to permanently delete this note? This action cannot be undone."
      : "Are you sure you want to move this note to trash?";
    const confirmed = window.confirm(message);

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(noteId);
      setError("");

      if (isTrash) {
        await notesRequest(`/${noteId}`, { method: "DELETE" });
      } else {
        await notesRequest(`/${noteId}/trash`, { method: "PUT" });
      }

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== noteId),
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleRestoreNote = async (noteId) => {
    try {
      setRestoringId(noteId);
      setError("");

      await notesRequest(`/${noteId}/restore`, { method: "PUT" });

      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.id !== noteId),
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setRestoringId(null);
    }
  };

  const clearFilters = () => {
    setSearchValue("");
    setSortValue("updated-desc");
  };

  return (
    <main className={styles.notesPage}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.headingRow}>
          <SectionHeading
            eyebrow="Notes"
            title="Your Notes"
            description="Create, organize, and manage your personal notes in one place."
            align="left"
          />

          <Button icon={Plus} onClick={openCreateEditor}>
            Create Note
          </Button>
        </div>

        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <IconBox
              icon={FileText}
              size="medium"
              variant="primary"
              animated={false}
            />

            <div className={styles.statContent}>
              <strong>{notes.length}</strong>
              <span>Total Notes</span>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <IconBox
              icon={Edit3}
              size="medium"
              variant="success"
              animated={false}
            />

            <div className={styles.statContent}>
              <strong>{recentNotesCount}</strong>
              <span>Updated This Week</span>
            </div>
          </Card>

          <Card className={styles.statCard}>
            <IconBox
              icon={Search}
              size="medium"
              variant="warning"
              animated={false}
            />

            <div className={styles.statContent}>
              <strong>{filteredNotes.length}</strong>
              <span>Visible Notes</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className={styles.errorMessage} role="alert">
          <span>{error}</span>

          <Button
            type="button"
            variant="ghost"
            size="small"
            onClick={loadNotes}
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Tabs */}
      <div className={styles.tabs}>
        <Button 
          variant={activeTab === "active" ? "primary" : "ghost"}
          onClick={() => setActiveTab("active")}
        >
          Active Notes
        </Button>
        <Button 
          variant={activeTab === "trash" ? "primary" : "ghost"}
          onClick={() => setActiveTab("trash")}
        >
          Trash
        </Button>
      </div>

      {/* Filters */}
      <Card className={styles.filters}>
        <div className={styles.search}>
          <Input
            name="search"
            type="search"
            value={searchValue}
            placeholder="Search your notes..."
            icon={Search}
            aria-label="Search notes"
            onChange={(event) =>
              setSearchValue(event.target.value)
            }
          />
        </div>

        <label className={styles.field}>
          <span>Sort By</span>

          <select
            value={sortValue}
            onChange={(event) =>
              setSortValue(event.target.value)
            }
          >
            <option value="updated-desc">
              Recently Updated
            </option>

            <option value="updated-asc">
              Oldest Updated
            </option>

            <option value="title-asc">
              Title A-Z
            </option>

            <option value="title-desc">
              Title Z-A
            </option>
          </select>
        </label>

        <Button
          type="button"
          variant="ghost"
          icon={RotateCcw}
          onClick={clearFilters}
        >
          Clear
        </Button>
      </Card>

      {/* Notes */}
      {loading ? (
        <div className={styles.loadingState}>
          <span className={styles.spinner} />
          <p>Loading your notes...</p>
        </div>
      ) : filteredNotes.length > 0 ? (
        <section
          className={styles.grid}
          aria-label="Notes list"
        >
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className={styles.noteCard}
            >
              <div className={styles.noteHeader}>
                <IconBox
                  icon={FileText}
                  size="medium"
                  variant="primary"
                  animated={false}
                />

                <Badge variant="primary">
                  Note
                </Badge>
              </div>

              <div className={styles.noteContent}>
                <h2>{note.title}</h2>

                <p>{note.content}</p>
              </div>

              <div className={styles.noteFooter}>
                <span>
                  Updated {formatDate(note.updatedAt)}
                </span>

                <div className={styles.actions}>
                  {activeTab === "active" ? (
                    <>
                      <Button
                        type="button"
                        variant="ghost"
                        size="small"
                        icon={Edit3}
                        onClick={() => openEditEditor(note)}
                      >
                        Edit
                      </Button>

                      <Button
                        type="button"
                        variant="danger"
                        size="small"
                        icon={Trash2}
                        disabled={deletingId === note.id}
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        {deletingId === note.id ? "Moving..." : "Trash"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="ghost"
                        size="small"
                        icon={RefreshCw}
                        disabled={restoringId === note.id}
                        onClick={() => handleRestoreNote(note.id)}
                      >
                        {restoringId === note.id ? "Restoring..." : "Restore"}
                      </Button>

                      <Button
                        type="button"
                        variant="danger"
                        size="small"
                        icon={Trash2}
                        disabled={deletingId === note.id}
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        {deletingId === note.id ? "Deleting..." : "Delete Forever"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <Card className={styles.emptyState}>
          <IconBox
            icon={FileText}
            size="large"
            variant="primary"
            animated={false}
          />

          <h2>
            {searchValue
              ? "No notes found"
              : "No notes yet"}
          </h2>

          <p>
            {searchValue
              ? "Try a different search term."
              : "Create your first note and start keeping your ideas organized."}
          </p>

          {!searchValue && (
            <Button icon={Plus} onClick={openCreateEditor}>
              Create Your First Note
            </Button>
          )}
        </Card>
      )}

      {/* Editor */}
      {isEditorOpen && (
        <div
          className={styles.overlay}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditor();
            }
          }}
        >
          <Card className={styles.editor}>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close note editor"
              onClick={closeEditor}
            >
              <X aria-hidden="true" />
            </button>

            <SectionHeading
              eyebrow={
                selectedNote
                  ? "Edit Note"
                  : "New Note"
              }
              title={
                selectedNote
                  ? "Update your note"
                  : "Create a new note"
              }
              description={
                selectedNote
                  ? "Make your changes and save the updated note."
                  : "Write down your thoughts, ideas, or anything you want to remember."
              }
              align="left"
            />

            <form
              className={styles.form}
              onSubmit={handleSaveNote}
              noValidate
            >
              <Input
                label="Title"
                name="title"
                value={formValues.title}
                placeholder="Enter note title"
                error={formErrors.title}
                required
                onChange={handleFormChange}
              />

              <label className={styles.field}>
                <span>
                  Content
                  <strong aria-hidden="true">*</strong>
                </span>

                <textarea
                  name="content"
                  value={formValues.content}
                  rows={9}
                  placeholder="Write your note here..."
                  aria-invalid={Boolean(
                    formErrors.content,
                  )}
                  onChange={handleFormChange}
                />

                {formErrors.content && (
                  <small role="alert">
                    {formErrors.content}
                  </small>
                )}
              </label>

              <div className={styles.actions}>
                <Button
                  type="button"
                  variant="outline"
                  icon={X}
                  disabled={saving}
                  onClick={closeEditor}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  icon={Save}
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : selectedNote
                      ? "Update Note"
                      : "Save Note"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </main>
  );
}

export default NotesPage;