import { useMemo, useState } from "react";

import { notificationsContent } from "../../../Scripts/Contents/Dashboard/Notifications";

import {
  NotificationsEmptyState,
  NotificationsFilters,
  NotificationsHeader,
  NotificationsList,
} from "./components";

import styles from "./NotificationsPage.module.css";

function NotificationsPage() {
  const [notifications, setNotifications] = useState(
    notificationsContent.initialNotifications,
  );

  const [searchValue, setSearchValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [sortValue, setSortValue] =
    useState("newest");

  const filteredNotifications = useMemo(() => {
    const normalizedSearch = searchValue
      .trim()
      .toLowerCase();

    const matchedNotifications =
      notifications.filter((notification) => {
        const matchesSearch =
          !normalizedSearch ||
          notification.title
            .toLowerCase()
            .includes(normalizedSearch) ||
          notification.message
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesType =
          typeFilter === "all" ||
          notification.type === typeFilter;

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "read" &&
            notification.isRead) ||
          (statusFilter === "unread" &&
            !notification.isRead);

        return (
          matchesSearch &&
          matchesType &&
          matchesStatus
        );
      });

    return [...matchedNotifications].sort(
      (firstNotification, secondNotification) => {
        if (sortValue === "oldest") {
          return (
            new Date(firstNotification.createdAt) -
            new Date(secondNotification.createdAt)
          );
        }

        if (sortValue === "unread-first") {
          const readDifference =
            Number(firstNotification.isRead) -
            Number(secondNotification.isRead);

          if (readDifference !== 0) {
            return readDifference;
          }
        }

        if (sortValue === "important-first") {
          const importantDifference =
            Number(secondNotification.isImportant) -
            Number(firstNotification.isImportant);

          if (importantDifference !== 0) {
            return importantDifference;
          }
        }

        return (
          new Date(secondNotification.createdAt) -
          new Date(firstNotification.createdAt)
        );
      },
    );
  }, [
    notifications,
    searchValue,
    typeFilter,
    statusFilter,
    sortValue,
  ]);

  const handleToggleRead = (notificationId) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              isRead: !notification.isRead,
            }
          : notification,
      ),
    );

    /*
     * Backend:
     *
     * await notificationsService.toggleRead(
     *   notificationId
     * );
     */
  };

  const handleMarkAllRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );

    /*
     * Backend:
     *
     * await notificationsService.markAllRead();
     */
  };

  const handleDeleteNotification = (
    notificationId,
  ) => {
    const confirmed = window.confirm(
      notificationsContent.card
        .deleteConfirmation,
    );

    if (!confirmed) {
      return;
    }

    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) =>
          notification.id !== notificationId,
      ),
    );

    /*
     * Backend:
     *
     * await notificationsService.deleteNotification(
     *   notificationId
     * );
     */
  };

  const handleClearRead = () => {
    const hasReadNotifications =
      notifications.some(
        (notification) => notification.isRead,
      );

    if (!hasReadNotifications) {
      return;
    }

    const confirmed = window.confirm(
      notificationsContent.clearReadConfirmation,
    );

    if (!confirmed) {
      return;
    }

    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => !notification.isRead,
      ),
    );

    /*
     * Backend:
     *
     * await notificationsService.clearRead();
     */
  };

  const clearFilters = () => {
    setSearchValue("");
    setTypeFilter("all");
    setStatusFilter("all");
    setSortValue("newest");
  };

  return (
    <main className={styles.notificationsPage}>
      <NotificationsHeader
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onClearRead={handleClearRead}
      />

      <NotificationsFilters
        searchValue={searchValue}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        sortValue={sortValue}
        onSearchChange={setSearchValue}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        onSortChange={setSortValue}
        onClear={clearFilters}
      />

      {filteredNotifications.length > 0 ? (
        <NotificationsList
          notifications={filteredNotifications}
          onToggleRead={handleToggleRead}
          onDelete={handleDeleteNotification}
        />
      ) : (
        <NotificationsEmptyState
          onClear={clearFilters}
        />
      )}
    </main>
  );
}

export default NotificationsPage;