import PropTypes from "prop-types";

import { tasksContent } from "../../../../../Scripts/Contents/Dashboard/Tasks";

import {
  Button,
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./TasksHeader.module.css";

function isTaskOverdue(task) {
  if (
    !task.dueDate ||
    task.status === "completed"
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(
    `${task.dueDate}T00:00:00`,
  );

  return dueDate < today;
}

function TasksHeader({ tasks, onCreateTask }) {
  const statValues = {
    all: tasks.length,

    todo: tasks.filter(
      (task) => task.status === "todo",
    ).length,

    in_progress: tasks.filter(
      (task) => task.status === "in_progress",
    ).length,

    completed: tasks.filter(
      (task) => task.status === "completed",
    ).length,

    overdue: tasks.filter(isTaskOverdue).length,
  };

  return (
    <section className={styles.header}>
      <div className={styles.headingRow}>
        <SectionHeading
          className={styles.sectionHeading}
          eyebrow={tasksContent.header.eyebrow}
          title={tasksContent.header.title}
          description={
            tasksContent.header.description
          }
          align="left"
        />

        <Button
          icon={
            tasksContent.header.createButton.icon
          }
          onClick={onCreateTask}
        >
          {tasksContent.header.createButton.label}
        </Button>
      </div>

      <div className={styles.statsGrid}>
        {tasksContent.stats.map((stat) => (
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
                {statValues[stat.id] ?? 0}
              </strong>

              <span>{stat.label}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

TasksHeader.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  onCreateTask: PropTypes.func.isRequired,
};

export default TasksHeader;