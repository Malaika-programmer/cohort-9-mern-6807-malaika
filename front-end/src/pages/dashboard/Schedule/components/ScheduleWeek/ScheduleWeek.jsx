import PropTypes from "prop-types";

import { ScheduleDay } from "../index";

import styles from "./ScheduleWeek.module.css";

function formatDateKey(dateValue) {
  const year = dateValue.getFullYear();

  const month = String(
    dateValue.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    dateValue.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function ScheduleWeek({
  weekDates,
  schedules,
  onAddSchedule,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  return (
    <section
      className={styles.week}
      aria-label="Weekly schedule"
    >
      {weekDates.map((dateValue) => {
        const dateKey = formatDateKey(dateValue);

        const daySchedules = schedules.filter(
          (schedule) =>
            schedule.date === dateKey,
        );

        return (
          <ScheduleDay
            key={dateKey}
            date={dateValue}
            dateKey={dateKey}
            schedules={daySchedules}
            onAddSchedule={onAddSchedule}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        );
      })}
    </section>
  );
}

ScheduleWeek.propTypes = {
  weekDates: PropTypes.arrayOf(
    PropTypes.instanceOf(Date),
  ).isRequired,

  schedules: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,

  onAddSchedule: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default ScheduleWeek;