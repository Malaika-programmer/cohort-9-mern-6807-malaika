import { progressContent } from "../../../../../Scripts/Contents/Dashboard/Progress";

import {
  Card,
  IconBox,
} from "../../../../../components/ui";

import styles from "./ProgressStats.module.css";

function ProgressStats() {
  const { overview } = progressContent;
  const score = overview.score;

  return (
    <section className={styles.section}>
      <Card className={styles.scoreCard}>
        <div className={styles.scoreContent}>
          <IconBox
            icon={score.icon}
            size="large"
            variant={score.variant}
            animated={false}
          />

          <div>
            <span>{score.label}</span>

            <strong>
              {score.value}
              <small>/100</small>
            </strong>

            <p>{score.description}</p>
          </div>
        </div>

        <div
          className={styles.scoreCircle}
          style={{
            "--score": `${score.value * 3.6}deg`,
          }}
          role="progressbar"
          aria-label={score.label}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={score.value}
        >
          <div>
            <strong>{score.value}%</strong>
          </div>
        </div>
      </Card>

      <div className={styles.statsGrid}>
        {overview.stats.map((stat) => (
          <Card
            key={stat.id}
            className={styles.statCard}
          >
            <div className={styles.statHeader}>
              <IconBox
                icon={stat.icon}
                size="medium"
                variant={stat.variant}
                animated={false}
              />

              <span>{stat.label}</span>
            </div>

            <strong>{stat.value}</strong>

            <small>{stat.detail}</small>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ProgressStats;