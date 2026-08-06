import PropTypes from "prop-types";

import { notesContent } from "../../../../../Scripts/Contents/Dashboard/Notes";
import {
  Button,
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./NotesHeader.module.css";

function NotesHeader({ notes, onCreateNote }) {
  const pinnedNotes = notes.filter(
    (note) => note.isPinned,
  ).length;

  const currentWeekDate = new Date();
  currentWeekDate.setDate(currentWeekDate.getDate() - 7);

  const recentlyUpdated = notes.filter(
    (note) => new Date(note.updatedAt) >= currentWeekDate,
  ).length;

  const statValues = {
    all: notes.length,
    pinned: pinnedNotes,
    recent: recentlyUpdated,
  };

  return (
    <section className={styles.header}>
      <div className={styles.headingRow}>
        <SectionHeading
          eyebrow={notesContent.header.eyebrow}
          title={notesContent.header.title}
          description={notesContent.header.description}
          align="left"
        />

        <Button
          icon={notesContent.header.createButton.icon}
          onClick={onCreateNote}
        >
          {notesContent.header.createButton.label}
        </Button>
      </div>

      <div className={styles.statsGrid}>
        {notesContent.stats.map((stat) => (
          <Card
            key={stat.id}
            className={styles.statCard}
          >
            <IconBox
              icon={stat.icon}
              variant={stat.variant}
              size="medium"
              animated={false}
            />

            <div className={styles.statContent}>
              <strong>
                {statValues[stat.id] ?? stat.value}
              </strong>

              <span>{stat.label}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

NotesHeader.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreateNote: PropTypes.func.isRequired,
};

export default NotesHeader;