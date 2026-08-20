import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

import { dashboardSidebarContent } from "../../../Scripts/Contents/Dashboard/DashboardSidebar";
import styles from "./DashboardSidebar.module.css";

function DashboardSidebar({ isOpen = false, onClose }) {
  const {
    brand,
    navigation,
    accountNavigation,
    logout,
    user,
    topbar,
  } = dashboardSidebarContent;

  const handleLogout = () => {
    /*
     * Backend logout will be connected here later.
     */
    console.log("Logout");
  };

  const getNavLinkClass = ({ isActive }) =>
    [styles.navLink, isActive && styles.activeLink]
      .filter(Boolean)
      .join(" ");

  return (
    <aside
      className={[styles.sidebar, isOpen && styles.sidebarOpen]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.header}>
        <NavLink
          to={brand.homePath}
          className={styles.brand}
          onClick={onClose}
        >
          <img
            src="/assets/circlelogo.png"
            alt="MindPlanAI"
            className={styles.logo}
          />

          <span className={styles.brandName}>
            MindPlan<span>AI</span>
          </span>
        </NavLink>

        <button
          type="button"
          className={styles.closeButton}
          aria-label={topbar.closeMenuLabel}
          onClick={onClose}
        >
          <X aria-hidden="true" />
        </button>
      </div>

      <nav
        className={styles.navigation}
        aria-label="Dashboard navigation"
      >
        <ul className={styles.navList}>
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={getNavLinkClass}
                  onClick={onClose}
                >
                  <Icon className={styles.navIcon} aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className={styles.divider} />

        <ul className={styles.navList}>
          {accountNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={getNavLinkClass}
                  onClick={onClose}
                >
                  <Icon className={styles.navIcon} aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.user}>
          <img
            src="/assets/logo.png"
            alt="MindPlanAI"
            className={styles.avatar}
          />

          <div className={styles.userDetails}>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          <logout.icon aria-hidden="true" />
          <span>{logout.label}</span>
        </button>
      </div>
    </aside>
  );
}

DashboardSidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default DashboardSidebar;