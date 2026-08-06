import PropTypes from "prop-types";

import { notificationsContent } from "../../../../../Scripts/Contents/Dashboard/Notifications";

import {
  Button,
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./NotificationsHeader.module.css";

function isToday(dateValue) {
  const notificationDate = new Date(dateValue);
  const today = new Date();

  return (
    notificationDate.getFullYear() ===
      today.getFullYear() &&
    notificationDate.getMonth() ===
      today.getMonth() &&
    notificationDate.getDate() ===
      today.getDate()
  );
}

function NotificationsHeader({
  notifications,
  onMarkAllRead,
  onClearRead,
}) {
  const { header, stats } =
    notificationsContent;

  const statValues = {
    all: notifications.length,

    unread: notifications.filter(
      (notification) => !notification.isRead,
    ).length,

    today: notifications.filter(
      (notification) =>
        isToday(notification.createdAt),
    ).length,

    important: notifications.filter(
      (notification) =>
        notification.isImportant,
    ).length,
  };

  const hasUnread = notifications.some(
    (notification) => !notification.isRead,
  );

  const hasRead = notifications.some(
    (notification) => notification.isRead,
  );

  return (
    <section className={styles.header}>
      <div className={styles.headingRow}>
        <SectionHeading
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
          align="left"
        />

        <div className={styles.actions}>
          <Button
            type="button"
            variant="outline"
            icon={header.markAllIcon}
            disabled={!hasUnread}
            onClick={onMarkAllRead}
          >
            {header.markAllButton}
          </Button>

          <Button
            type="button"
            variant="danger"
            icon={header.clearReadIcon}
            disabled={!hasRead}
            onClick={onClearRead}
          >
            {header.clearReadButton}
          </Button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <Card
            key={stat.id}
            className={styles.statCard}
          >
            <IconBox
              icon={stat.icon}
              size="medium"
              variant={stat.variant}
              animated={false}
            />

            <div>
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

NotificationsHeader.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,

  onMarkAllRead: PropTypes.func.isRequired,

  onClearRead: PropTypes.func.isRequired,
};

export default NotificationsHeader;