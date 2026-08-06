import PropTypes from "prop-types";

import { notesContent } from "../../../../../Scripts/Contents/Dashboard/Notes";
import {
  Button,
  Card,
  IconBox,
} from "../../../../../components/ui";

import styles from "./NotesEmptyState.module.css";

function NotesEmptyState({ onCreateNote }) {
  const { emptyState } = notesContent;

  return (
    <Card className={styles.emptyState}>
      <IconBox
        icon={emptyState.icon}
        size="large"
        variant="primary"
        animated={false}
      />

      <h2>{emptyState.title}</h2>
      <p>{emptyState.description}</p>

      <Button
        icon={emptyState.icon}
        onClick={onCreateNote}
      >
        {emptyState.button}
      </Button>
    </Card>
  );
}

NotesEmptyState.propTypes = {
  onCreateNote: PropTypes.func.isRequired,
};

export default NotesEmptyState;