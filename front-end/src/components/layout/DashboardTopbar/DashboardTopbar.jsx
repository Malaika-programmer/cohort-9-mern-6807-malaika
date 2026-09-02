import PropTypes from "prop-types";
import { Bell, Menu, Search } from "lucide-react";

import { Input } from "../../ui";

import { getUser } from "../../../utils/auth";
import styles from "./DashboardTopbar.module.css";

function DashboardTopbar({ onMenuClick }) {
  const user = getUser() || { fullName: "MindPlanAI User" };
  
  const content = {
    searchPlaceholder: "Search...",
    menuLabel: "Open dashboard menu",

    user: {
      name: user.fullName || "User",
      role: "User",
      avatar: "/assets/circlelogo.png",
    },
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.leftArea}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={content.menuLabel}
          onClick={onMenuClick}
        >
          <Menu aria-hidden="true" />
        </button>

        <div className={styles.search}>
          <Input
            name="dashboardSearch"
            type="search"
            placeholder={content.searchPlaceholder}
            icon={Search}
            aria-label={content.searchPlaceholder}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.user}>
          <img
            src={content.user.avatar}
            alt="User avatar"
            className={styles.avatar}
          />

          <div className={styles.userText}>
            <strong>{content.user.name}</strong>
            <span>{content.user.role}</span>
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