import PropTypes from "prop-types";

import { tasksContent } from "../../../../../Scripts/Contents/Dashboard/Tasks";

import {
  Button,
  Card,
  IconBox,
} from "../../../../../components/ui";

import styles from "./TasksEmptyState.module.css";

function TasksEmptyState({ onCreateTask }) {
  const { emptyState } = tasksContent;

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
        onClick={onCreateTask}
      >
        {emptyState.button}
      </Button>
    </Card>
  );
}

TasksEmptyState.propTypes = {
  onCreateTask: PropTypes.func.isRequired,
};

export default TasksEmptyState;