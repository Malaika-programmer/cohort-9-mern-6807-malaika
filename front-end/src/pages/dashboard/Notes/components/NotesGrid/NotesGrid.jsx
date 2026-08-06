import PropTypes from "prop-types";

import { NoteCard } from "../index";

import styles from "./NotesGrid.module.css";

function NotesGrid({
  notes,
  onEdit,
  onDelete,
  onTogglePin,
}) {
  const sortedNotes = [...notes].sort(
    (firstNote, secondNote) =>
      Number(secondNote.isPinned) -
      Number(firstNote.isPinned),
  );

  return (
    <section
      className={styles.grid}
      aria-label="Notes list"
    >
      {sortedNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
        />
      ))}
    </section>
  );
}

NotesGrid.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTogglePin: PropTypes.func.isRequired,
};

export default NotesGrid;