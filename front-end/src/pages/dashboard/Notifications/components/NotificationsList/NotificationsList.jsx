import PropTypes from "prop-types";

import { NotificationCard } from "../index";

import styles from "./NotificationsList.module.css";

function NotificationsList({
  notifications,
  onToggleRead,
  onDelete,
}) {
  return (
    <section
      className={styles.list}
      aria-label="Notifications list"
    >
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onToggleRead={onToggleRead}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

NotificationsList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,

  onToggleRead: PropTypes.func.isRequired,

  onDelete: PropTypes.func.isRequired,
};

export default NotificationsList;