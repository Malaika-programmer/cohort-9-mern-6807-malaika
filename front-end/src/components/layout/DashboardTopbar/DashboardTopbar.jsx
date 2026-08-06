import PropTypes from "prop-types";
import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import { dashboardSidebarContent } from "../../../Scripts/Contents/Dashboard/DashboardSidebar";
import { Input } from "../../ui";

import styles from "./DashboardTopbar.module.css";

function DashboardTopbar({ onMenuClick }) {
  const { topbar, user } = dashboardSidebarContent;

  return (
    <header className={styles.topbar}>
      <div className={styles.leftArea}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={topbar.menuLabel}
          onClick={onMenuClick}
        >
          <Menu aria-hidden="true" />
        </button>

        <div className={styles.search}>
          <Input
            name="dashboardSearch"
            type="search"
            placeholder={topbar.searchPlaceholder}
            icon={Search}
            aria-label={topbar.searchPlaceholder}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.notificationButton}
          aria-label={topbar.notificationLabel}
        >
          <Bell aria-hidden="true" />
          <span className={styles.notificationDot} />
        </button>

        <div className={styles.user}>
          <span className={styles.avatar}>
            {user.initials}
          </span>

          <div className={styles.userText}>
            <strong>{user.name}</strong>
            <span>User</span>
          </div>
        </div>
      </div>
    </header>
  );
}

DashboardTopbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default DashboardTopbar;