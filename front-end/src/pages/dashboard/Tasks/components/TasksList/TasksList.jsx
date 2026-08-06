import PropTypes from "prop-types";

import { TaskCard } from "../index";

import styles from "./TasksList.module.css";

function TasksList({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  return (
    <section
      className={styles.list}
      aria-label="Tasks list"
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </section>
  );
}

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete:
    PropTypes.func.isRequired,
};

export default TasksList;