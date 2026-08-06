import { useMemo, useState } from "react";

import { notesContent } from "../../../Scripts/Contents/Dashboard/Notes";

import {
  NoteEditor,
  NotesEmptyState,
  NotesFilters,
  NotesGrid,
  NotesHeader,
} from "./components";

import styles from "./NotesPage.module.css";

function NotesPage() {
  const [notes, setNotes] = useState(notesContent.initialNotes);
  const [searchValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortValue, setSortValue] = useState("updated-desc");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const filteredNotes = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    const matchingNotes = notes.filter((note) => {
      const matchesSearch =
        !normalizedSearch ||
        note.title.toLowerCase().includes(normalizedSearch) ||
        note.content.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        categoryFilter === "all" ||
        note.category === categoryFilter;

      return matchesSearch && matchesCategory;
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
  }, [notes, searchValue, categoryFilter, sortValue]);

  const openCreateEditor = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };

  const openEditEditor = (note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setSelectedNote(null);
    setIsEditorOpen(false);
  };

  const handleSaveNote = (noteValues) => {
    const currentDate = new Date().toISOString();

    if (selectedNote) {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === selectedNote.id
            ? {
                ...note,
                ...noteValues,
                updatedAt: currentDate,
              }
            : note,
        ),
      );
    } else {
      const createdNote = {
        id: Date.now(),
        ...noteValues,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      setNotes((currentNotes) => [
        createdNote,
        ...currentNotes,
      ]);
    }

    /*
     * Backend integration:
     *
     * Create:
     * await notesService.createNote(noteValues);
     *
     * Edit:
     * await notesService.updateNote(
     *   selectedNote.id,
     *   noteValues
     * );
     */

    closeEditor();
  };

  const handleDeleteNote = (noteId) => {
    const confirmed = window.confirm(
      notesContent.deleteConfirmation.message,
    );

    if (!confirmed) {
      return;
    }

    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId),
    );

    /*
     * Backend integration:
     *
     * await notesService.deleteNote(noteId);
     */
  };

  const handleTogglePin = (noteId) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              isPinned: !note.isPinned,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );

    /*
     * Backend integration:
     *
     * await notesService.togglePin(noteId);
     */
  };

  const clearFilters = () => {
    setSearchValue("");
    setCategoryFilter("all");
    setSortValue("updated-desc");
  };

  return (
    <main className={styles.notesPage}>
      <NotesHeader
        notes={notes}
        onCreateNote={openCreateEditor}
      />

      <NotesFilters
        searchValue={searchValue}
        categoryFilter={categoryFilter}
        sortValue={sortValue}
        onSearchChange={setSearchValue}
        onCategoryChange={setCategoryFilter}
        onSortChange={setSortValue}
        onClear={clearFilters}
      />

      {filteredNotes.length > 0 ? (
        <NotesGrid
          notes={filteredNotes}
          onEdit={openEditEditor}
          onDelete={handleDeleteNote}
          onTogglePin={handleTogglePin}
        />
      ) : (
        <NotesEmptyState onCreateNote={openCreateEditor} />
      )}

      {isEditorOpen && (
        <NoteEditor
          key={selectedNote?.id ?? "create-note"}
          note={selectedNote}
          onSave={handleSaveNote}
          onCancel={closeEditor}
        />
      )}
    </main>
  );
}

export default NotesPage;
