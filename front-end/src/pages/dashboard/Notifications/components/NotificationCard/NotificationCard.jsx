import PropTypes from "prop-types";
import {
  CheckCheck,
  Circle,
  ExternalLink,
  MailOpen,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { notificationsContent } from "../../../../../Scripts/Contents/Dashboard/Notifications";

import {
  Badge,
  Button,
  Card,
  IconBox,
} from "../../../../../components/ui";

import styles from "./NotificationCard.module.css";

function formatNotificationDate(dateValue) {
  const date = new Date(dateValue);
  const now = new Date();

  const differenceInMilliseconds =
    now.getTime() - date.getTime();

  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / 60000,
  );

  if (differenceInMinutes < 1) {
    return "Just now";
  }

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minutes ago`;
  }

  const differenceInHours = Math.floor(
    differenceInMinutes / 60,
  );

  if (differenceInHours < 24) {
    return `${differenceInHours} hours ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function NotificationCard({
  notification,
  onToggleRead,
  onDelete,
}) {
  const navigate = useNavigate();

  const type =
    notificationsContent.types[
      notification.type
    ];

  const TypeIcon =
    type?.icon ??
    notificationsContent.icons.notification;

  return (
    <Card
      className={[
        styles.card,
        !notification.isRead
          ? styles.unreadCard
          : "",
        notification.isImportant
          ? styles.importantCard
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.iconArea}>
        <IconBox
          icon={TypeIcon}
          size="medium"
          variant={type?.variant ?? "primary"}
          animated={false}
        />

        {!notification.isRead && (
          <span
            className={styles.unreadDot}
            aria-label="Unread notification"
          />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <div className={styles.badges}>
            <Badge
              variant={
                type?.variant ?? "primary"
              }
            >
              {type?.label ??
                notification.type}
            </Badge>

            {!notification.isRead && (
              <Badge variant="warning">
                {
                  notificationsContent.card
                    .unreadLabel
                }
              </Badge>
            )}

            {notification.isImportant && (
              <Badge variant="danger">
                {
                  notificationsContent.card
                    .importantLabel
                }
              </Badge>
            )}
          </div>

          <time
            dateTime={notification.createdAt}
          >
            {formatNotificationDate(
              notification.createdAt,
            )}
          </time>
        </div>

        <h2>{notification.title}</h2>

        <p>{notification.message}</p>

        <div className={styles.actions}>
          {notification.actionPath && (
            <Button
              type="button"
              size="small"
              icon={ExternalLink}
              onClick={() =>
                navigate(
                  notification.actionPath,
                )
              }
            >
              {notification.actionLabel ||
                notificationsContent.card
                  .openButton}
            </Button>
          )}

          <Button
            type="button"
            size="small"
            variant="outline"
            icon={
              notification.isRead
                ? Circle
                : CheckCheck
            }
            onClick={() =>
              onToggleRead(notification.id)
            }
          >
            {notification.isRead
              ? notificationsContent.card
                  .unreadButton
              : notificationsContent.card
                  .readButton}
          </Button>

          <Button
            type="button"
            size="small"
            variant="danger"
            icon={Trash2}
            onClick={() =>
              onDelete(notification.id)
            }
          >
            {
              notificationsContent.card
                .deleteButton
            }
          </Button>
        </div>
      </div>
    </Card>
  );
}

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,

    type: PropTypes.string.isRequired,

    title: PropTypes.string.isRequired,

    message: PropTypes.string.isRequired,

    createdAt: PropTypes.string.isRequired,

    isRead: PropTypes.bool.isRequired,

    isImportant: PropTypes.bool.isRequired,

    actionPath: PropTypes.string,

    actionLabel: PropTypes.string,
  }).isRequired,

  onToggleRead: PropTypes.func.isRequired,

  onDelete: PropTypes.func.isRequired,
};

export default NotificationCard;