import PropTypes from "prop-types";
import {
  Edit3,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";

import { notesContent } from "../../../../../Scripts/Contents/Dashboard/Notes";
import {
  Badge,
  Button,
  Card,
  IconBox,
} from "../../../../../components/ui";

import styles from "./NoteCard.module.css";

function formatUpdatedDate(dateValue) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

function NoteCard({
  note,
  onEdit,
  onDelete,
  onTogglePin,
}) {
  const category =
    notesContent.categories[note.category];

  const CategoryIcon =
    category?.icon ?? notesContent.icons.defaultNote;

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <IconBox
          icon={CategoryIcon}
          size="medium"
          variant={category?.variant ?? "primary"}
          animated={false}
        />

        <button
          type="button"
          className={[
            styles.pinButton,
            note.isPinned ? styles.pinnedButton : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={
            note.isPinned
              ? notesContent.card.unpinLabel
              : notesContent.card.pinLabel
          }
          onClick={() => onTogglePin(note.id)}
        >
          {note.isPinned ? (
            <PinOff aria-hidden="true" />
          ) : (
            <Pin aria-hidden="true" />
          )}
        </button>
      </div>

      <div className={styles.badges}>
        <Badge variant={category?.variant ?? "primary"}>
          {category?.label ?? note.category}
        </Badge>

        {note.isPinned && (
          <Badge variant="warning">
            {notesContent.card.pinnedLabel}
          </Badge>
        )}
      </div>

      <div className={styles.content}>
        <h2>{note.title}</h2>

        <p>{note.content}</p>
      </div>

      <div className={styles.footer}>
        <span className={styles.updatedAt}>
          {notesContent.card.updatedPrefix}{" "}
          {formatUpdatedDate(note.updatedAt)}
        </span>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="ghost"
            size="small"
            icon={Edit3}
            onClick={() => onEdit(note)}
          >
            {notesContent.card.editLabel}
          </Button>

          <Button
            type="button"
            variant="danger"
            size="small"
            icon={Trash2}
            onClick={() => onDelete(note.id)}
          >
            {notesContent.card.deleteLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isPinned: PropTypes.bool.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTogglePin: PropTypes.func.isRequired,
};

export default NoteCard;