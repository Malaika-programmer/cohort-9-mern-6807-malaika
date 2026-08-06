import PropTypes from "prop-types";

import { scheduleContent } from "../../../../../Scripts/Contents/Dashboard/Schedule";

import {
  Card,
  IconBox,
} from "../../../../../components/ui";

import styles from "./ScheduleStats.module.css";

function getTodayKey() {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

function ScheduleStats({ schedules }) {
  const todayKey = getTodayKey();

  const statValues = {
    today: schedules.filter(
      (schedule) => schedule.date === todayKey,
    ).length,

    upcoming: schedules.filter(
      (schedule) =>
        schedule.date >= todayKey &&
        ![
          "completed",
          "cancelled",
          "missed",
        ].includes(schedule.status),
    ).length,

    completed: schedules.filter(
      (schedule) =>
        schedule.status === "completed",
    ).length,

    missed: schedules.filter(
      (schedule) =>
        schedule.status === "missed" ||
        (schedule.date < todayKey &&
          schedule.status !== "completed" &&
          schedule.status !== "cancelled"),
    ).length,
  };

  return (
    <section className={styles.grid}>
      {scheduleContent.stats.map((stat) => (
        <Card
          key={stat.id}
          className={styles.card}
        >
          <IconBox
            icon={stat.icon}
            size="medium"
            variant={stat.variant}
            animated={false}
          />

          <div className={styles.content}>
            <strong>
              {statValues[stat.id] ?? 0}
            </strong>

            <span>{stat.label}</span>
          </div>
        </Card>
      ))}
    </section>
  );
}

ScheduleStats.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default ScheduleStats;