import { dashboardContent } from "../../../../../Scripts/Contents/Dashboard/Dashboard";
import {
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./DashboardStats.module.css";

function DashboardStats() {
  const { stats } = dashboardContent;

  return (
    <section>
      <SectionHeading
        eyebrow={stats.heading.eyebrow}
        title={stats.heading.title}
        description={stats.heading.description}
        align="left"
      />

      <div className={styles.grid}>
        {stats.items.map((item) => (
          <Card
            key={item.id}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <IconBox
                icon={item.icon}
                variant={item.variant}
                size="medium"
                animated={false}
              />

              <span className={styles.label}>
                {item.label}
              </span>
            </div>

            <strong className={styles.value}>
              {item.value}
            </strong>

            <span className={styles.detail}>
              {item.detail}
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default DashboardStats;