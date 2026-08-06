import PropTypes from "prop-types";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
} from "lucide-react";

import { tasksContent } from "../../../../../Scripts/Contents/Dashboard/Tasks";

import {
  Badge,
  Button,
  Card,
  IconBox,
} from "../../../../../components/ui";

import styles from "./TaskCard.module.css";

function parseDate(dateValue) {
  return new Date(`${dateValue}T00:00:00`);
}

function formatDueDate(dateValue) {
  if (!dateValue) {
    return tasksContent.card.noDueDateLabel;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(parseDate(dateValue));
}

function isOverdue(task) {
  if (
    !task.dueDate ||
    task.status === "completed"
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return parseDate(task.dueDate) < today;
}

function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  const category =
    tasksContent.categories[task.category];

  const status =
    tasksContent.statuses[task.status];

  const priority =
    tasksContent.priorities[task.priority];

  const CategoryIcon =
    category?.icon ??
    tasksContent.header.createButton.icon;

  const taskIsOverdue = isOverdue(task);
  const taskIsCompleted =
    task.status === "completed";

  return (
    <Card
      className={[
        styles.card,
        taskIsCompleted
          ? styles.completedCard
          : "",
        taskIsOverdue
          ? styles.overdueCard
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.header}>
        <IconBox
          icon={CategoryIcon}
          size="medium"
          variant={
            category?.variant ?? "primary"
          }
          animated={false}
        />

        <button
          type="button"
          className={[
            styles.completeButton,
            taskIsCompleted
              ? styles.completedButton
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={
            taskIsCompleted
              ? tasksContent.card.reopenLabel
              : tasksContent.card.completeLabel
          }
          onClick={() =>
            onToggleComplete(task.id)
          }
        >
          {taskIsCompleted ? (
            <CheckCircle2
              aria-hidden="true"
            />
          ) : (
            <Circle aria-hidden="true" />
          )}
        </button>
      </div>

      <div className={styles.badges}>
        <Badge
          variant={
            category?.variant ?? "primary"
          }
        >
          {category?.label ?? task.category}
        </Badge>

        <Badge
          variant={
            priority?.variant ?? "light"
          }
        >
          {priority?.label ?? task.priority}
        </Badge>

        <Badge
          variant={
            taskIsOverdue
              ? "danger"
              : status?.variant ?? "light"
          }
        >
          {taskIsOverdue
            ? tasksContent.card.overdueLabel
            : status?.label ?? task.status}
        </Badge>
      </div>

      <div className={styles.content}>
        <h2
          className={
            taskIsCompleted
              ? styles.completedTitle
              : ""
          }
        >
          {task.title}
        </h2>

        <p>{task.description}</p>
      </div>

      <div className={styles.dueDate}>
        <CalendarDays aria-hidden="true" />

        <span>
          {task.dueDate
            ? `${tasksContent.card.dueDatePrefix} ${formatDueDate(task.dueDate)}`
            : tasksContent.card.noDueDateLabel}
        </span>
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="ghost"
          size="small"
          icon={Edit3}
          onClick={() => onEdit(task)}
        >
          {tasksContent.card.editLabel}
        </Button>

        <Button
          type="button"
          variant="danger"
          size="small"
          icon={Trash2}
          onClick={() => onDelete(task.id)}
        >
          {tasksContent.card.deleteLabel}
        </Button>
      </div>
    </Card>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
  }).isRequired,

  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete:
    PropTypes.func.isRequired,
};

export default TaskCard;