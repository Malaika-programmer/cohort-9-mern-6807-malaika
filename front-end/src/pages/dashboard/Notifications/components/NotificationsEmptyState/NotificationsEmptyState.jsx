import PropTypes from "prop-types";
import { RotateCcw } from "lucide-react";

import { notificationsContent } from "../../../../../Scripts/Contents/Dashboard/Notifications";

import {
  Button,
  Card,
  IconBox,
} from "../../../../../components/ui";

import styles from "./NotificationsEmptyState.module.css";

function NotificationsEmptyState({
  onClear,
}) {
  const { emptyState } =
    notificationsContent;

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
        type="button"
        variant="outline"
        icon={RotateCcw}
        onClick={onClear}
      >
        {emptyState.clearButton}
      </Button>
    </Card>
  );
}

NotificationsEmptyState.propTypes = {
  onClear: PropTypes.func.isRequired,
};

export default NotificationsEmptyState;