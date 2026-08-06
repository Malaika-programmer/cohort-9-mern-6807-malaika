import PropTypes from "prop-types";
import {
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
} from "lucide-react";

import { scheduleContent } from "../../../../../Scripts/Contents/Dashboard/Schedule";

import {
  Badge,
  Button,
  IconBox,
} from "../../../../../components/ui";

import styles from "./ScheduleCard.module.css";

function ScheduleCard({
  schedule,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  const type =
    scheduleContent.types[schedule.type];

  const status =
    scheduleContent.statuses[schedule.status];

  const priority =
    scheduleContent.priorities[
      schedule.priority
    ];

  const TypeIcon =
    type?.icon ?? scheduleContent.icons.time;

  const isCompleted =
    schedule.status === "completed";

  const linkedTask =
    scheduleContent.relatedTasks.find(
      (task) => task.id === schedule.taskId,
    );

  return (
    <article
      className={[
        styles.card,
        isCompleted
          ? styles.completedCard
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.top}>
        <IconBox
          icon={TypeIcon}
          size="small"
          variant={type?.variant ?? "primary"}
          animated={false}
        />

        <button
          type="button"
          className={[
            styles.completeButton,
            isCompleted
              ? styles.completedButton
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={
            isCompleted
              ? scheduleContent.card.reopenLabel
              : scheduleContent.card.completeLabel
          }
          onClick={() =>
            onToggleComplete(schedule.id)
          }
        >
          {isCompleted ? (
            <CheckCircle2
              aria-hidden="true"
            />
          ) : (
            <Circle aria-hidden="true" />
          )}
        </button>
      </div>

      <div className={styles.time}>
        {schedule.startTime} – {schedule.endTime}
      </div>

      <h3
        className={
          isCompleted
            ? styles.completedTitle
            : ""
        }
      >
        {schedule.title}
      </h3>

      <p>{schedule.description}</p>

      <div className={styles.badges}>
        <Badge
          variant={status?.variant ?? "light"}
        >
          {status?.label ?? schedule.status}
        </Badge>

        <Badge
          variant={
            priority?.variant ?? "light"
          }
        >
          {priority?.label ??
            schedule.priority}
        </Badge>
      </div>

      {linkedTask && (
        <div className={styles.linkedTask}>
          <span>
            {scheduleContent.card.linkedTaskLabel}
          </span>

          <strong>{linkedTask.title}</strong>
        </div>
      )}

      <div className={styles.actions}>
        <Button
          type="button"
          size="small"
          variant="ghost"
          icon={Edit3}
          onClick={() => onEdit(schedule)}
        >
          {scheduleContent.card.editLabel}
        </Button>

        <Button
          type="button"
          size="small"
          variant="danger"
          icon={Trash2}
          onClick={() =>
            onDelete(schedule.id)
          }
        >
          {scheduleContent.card.deleteLabel}
        </Button>
      </div>
    </article>
  );
}

ScheduleCard.propTypes = {
  schedule: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,

    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    taskId: PropTypes.string,
  }).isRequired,

  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default ScheduleCard;