import PropTypes from "prop-types";
import { Plus } from "lucide-react";

import { ScheduleCard } from "../index";

import styles from "./ScheduleDay.module.css";

function isToday(dateValue) {
  const today = new Date();

  return (
    dateValue.getFullYear() ===
      today.getFullYear() &&
    dateValue.getMonth() === today.getMonth() &&
    dateValue.getDate() === today.getDate()
  );
}

function ScheduleDay({
  date,
  dateKey,
  schedules,
  onAddSchedule,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  const formattedDay =
    new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date);

  const formattedDate =
    new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
    }).format(date);

  const currentDay = isToday(date);

  return (
    <article
      className={[
        styles.day,
        currentDay ? styles.today : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className={styles.header}>
        <div>
          <span>{formattedDay}</span>
          <strong>{formattedDate}</strong>
        </div>

        <button
          type="button"
          className={styles.addButton}
          aria-label={`Add schedule for ${formattedDate}`}
          onClick={() => onAddSchedule(dateKey)}
        >
          <Plus aria-hidden="true" />
        </button>
      </header>

      <div className={styles.list}>
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={
                onToggleComplete
              }
            />
          ))
        ) : (
          <p className={styles.empty}>
            No activities
          </p>
        )}
      </div>
    </article>
  );
}

ScheduleDay.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  dateKey: PropTypes.string.isRequired,

  schedules: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,

  onAddSchedule: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default ScheduleDay;