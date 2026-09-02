import { useState } from "react";
import { Outlet } from "react-router-dom";

import { DashboardSidebar, DashboardTopbar } from "../index";
import styles from "./DashboardLayout.module.css";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
    <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Close sidebar */}
  {isSidebarOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close dashboard navigation"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={styles.mainArea}>
                <DashboardTopbar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;