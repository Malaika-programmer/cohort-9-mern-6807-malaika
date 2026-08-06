import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  DashboardSidebar,
  DashboardTopbar,
} from "../index";

import styles from "./DashboardLayout.module.css";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {isSidebarOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close dashboard navigation"
          onClick={closeSidebar}
        />
      )}

      <div className={styles.mainArea}>
        <DashboardTopbar onMenuClick={openSidebar} />

        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;