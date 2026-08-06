import PropTypes from "prop-types";

import { scheduleContent } from "../../../../../Scripts/Contents/Dashboard/Schedule";

import {
  Button,
  Card,
  IconBox,
} from "../../../../../components/ui";

import styles from "./ScheduleEmptyState.module.css";

function ScheduleEmptyState({
  onCreateSchedule,
}) {
  const { emptyState } = scheduleContent;

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
        onClick={onCreateSchedule}
      >
        {emptyState.button}
      </Button>
    </Card>
  );
}

ScheduleEmptyState.propTypes = {
  onCreateSchedule: PropTypes.func.isRequired,
};

export default ScheduleEmptyState;