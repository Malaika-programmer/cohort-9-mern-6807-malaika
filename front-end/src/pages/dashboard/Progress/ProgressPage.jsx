import { useState } from "react";

import {
  LearningProgress,
  ProductivityBreakdown,
  ProgressAchievements,
  ProgressHeader,
  ProgressStats,
  WeeklyProgress,
} from "./components";

import styles from "./ProgressPage.module.css";

function ProgressPage() {
  const [selectedRange, setSelectedRange] =
    useState("week");

  return (
    <main className={styles.progressPage}>
      <ProgressHeader
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
      />

      <ProgressStats />

      <div className={styles.analyticsGrid}>
        <WeeklyProgress />
        <ProductivityBreakdown />
      </div>

      <LearningProgress />

      <ProgressAchievements />
    </main>
  );
}

export default ProgressPage;