import PropTypes from "prop-types";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

import { scheduleContent } from "../../../../../Scripts/Contents/Dashboard/Schedule";

import {
  Button,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./ScheduleHeader.module.css";

function formatWeekDate(dateValue) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dateValue);
}

function ScheduleHeader({
  weekStart,
  weekEnd,
  onCreateSchedule,
  onPreviousWeek,
  onNextWeek,
  onCurrentWeek,
}) {
  const { header, weekNavigation } = scheduleContent;

  return (
    <section className={styles.header}>
      <div className={styles.headingRow}>
        <SectionHeading
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
          align="left"
        />

        <Button
          icon={header.createButton.icon}
          onClick={onCreateSchedule}
        >
          {header.createButton.label}
        </Button>
      </div>

      <div className={styles.weekNavigation}>
        <div className={styles.weekLabel}>
          <strong>
            {formatWeekDate(weekStart)}
          </strong>

          <span>—</span>

          <strong>
            {formatWeekDate(weekEnd)}
          </strong>
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="outline"
            size="small"
            icon={ChevronLeft}
            onClick={onPreviousWeek}
          >
            {weekNavigation.previousLabel}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="small"
            icon={RotateCcw}
            onClick={onCurrentWeek}
          >
            {weekNavigation.todayLabel}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="small"
            icon={ChevronRight}
            iconPosition="right"
            onClick={onNextWeek}
          >
            {weekNavigation.nextLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

ScheduleHeader.propTypes = {
  weekStart: PropTypes.instanceOf(Date).isRequired,
  weekEnd: PropTypes.instanceOf(Date).isRequired,
  onCreateSchedule: PropTypes.func.isRequired,
  onPreviousWeek: PropTypes.func.isRequired,
  onNextWeek: PropTypes.func.isRequired,
  onCurrentWeek: PropTypes.func.isRequired,
};

export default ScheduleHeader;