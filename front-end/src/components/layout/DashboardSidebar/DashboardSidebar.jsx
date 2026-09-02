import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  FileText,
  ListTodo,
  User,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { logout, getUser } from "../../../utils/auth";

import styles from "./DashboardSidebar.module.css";

function DashboardSidebar({ isOpen = false, onClose }) {
  const navigate = useNavigate();

  const content = {
    brand: {
      name: "MindPlan",
      highlight: "AI",
      homePath: "/dashboard",
    },

    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        end: true,
      },
      {
        id: "notes",
        label: "Notes",
        path: "/dashboard/notes",
        icon: FileText,
      },
      {
        id: "tasks",
        label: "Tasks",
        path: "/dashboard/tasks",
        icon: ListTodo,
      },
    ],

    accountNavigation: [
      {
        id: "profile",
        label: "Profile",
        path: "/dashboard/profile",
        icon: User,
      },

      {
        id: "settings",
        label: "Settings",
        path: "/dashboard/settings",
        icon: Settings,
      },
    ],

    logout: {
      label: "Logout",
    },

    topbar: {
      closeMenuLabel: "Close dashboard menu",
    },
  };

  const authUser = getUser() || {};
  const user = {
    name: authUser.fullName || "User",
    email: authUser.email || "user",
  };

  const handleLogout = () => {
    logout();

    onClose();

    navigate("/login", {
      replace: true,
    });
  };

  const getNavLinkClass = ({ isActive }) =>
    [styles.navLink, isActive && styles.activeLink]
      .filter(Boolean)
      .join(" ");

  return (
    <aside
      className={[
        styles.sidebar,
        isOpen && styles.sidebarOpen,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.header}>
        <NavLink
          to={content.brand.homePath}
          className={styles.brand}
          onClick={onClose}
        >
          <img
            src="/assets/circlelogo.png"
            alt="MindPlanAI"
            className={styles.logo}
          />

          <span className={styles.brandName}>
            {content.brand.name}
            <span>{content.brand.highlight}</span>
          </span>
        </NavLink>

        <button
          type="button"
          className={styles.closeButton}
          aria-label={content.topbar.closeMenuLabel}
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
          {content.navigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={getNavLinkClass}
                  onClick={onClose}
                >
                  <Icon
                    className={styles.navIcon}
                    aria-hidden="true"
                  />

                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className={styles.divider} />

        <ul className={styles.navList}>
          {content.accountNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={getNavLinkClass}
                  onClick={onClose}
                >
                  <Icon
                    className={styles.navIcon}
                    aria-hidden="true"
                  />

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
            src="/assets/circlelogo.png"
            alt="MindPlanAI User"
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
          <LogOut aria-hidden="true" />

          <span>{content.logout.label}</span>
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