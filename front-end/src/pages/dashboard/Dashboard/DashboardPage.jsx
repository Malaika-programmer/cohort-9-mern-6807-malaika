import {
  DashboardRecentNotes,
  DashboardRoadmap,
  DashboardStats,
  DashboardTasks,
  DashboardWelcome,
} from "./components";

import styles from "./DashboardPage.module.css";

function DashboardPage() {
  return (
    <main className={styles.dashboardPage}>
      <DashboardWelcome />
      <DashboardStats />

      <div className={styles.primaryGrid}>
        <DashboardRecentNotes />
        <DashboardTasks />
      </div>

      <DashboardRoadmap />
    </main>
  );
}

export default DashboardPage;