import { progressContent } from "../../../../../Scripts/Contents/Dashboard/Progress";

import {
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./ProductivityBreakdown.module.css";

function ProductivityBreakdown() {
  const { breakdown, streak } = progressContent;

  return (
    <div className={styles.wrapper}>
      <Card className={styles.breakdown}>
        <SectionHeading
          eyebrow={breakdown.eyebrow}
          title={breakdown.title}
          description={breakdown.description}
          align="left"
        />

        <div className={styles.list}>
          {breakdown.items.map((item) => (
            <div
              key={item.id}
              className={styles.item}
            >
              <IconBox
                icon={item.icon}
                size="small"
                variant={item.variant}
                animated={false}
              />

              <div className={styles.itemContent}>
                <div className={styles.itemHeader}>
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>

                  <strong>
                    {item.percentage}%
                  </strong>
                </div>

                <div className={styles.track}>
                  <span
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className={styles.streak}>
        <IconBox
          icon={streak.icon}
          size="large"
          variant="danger"
          animated={false}
        />

        <div>
          <span>{streak.eyebrow}</span>
          <h3>{streak.title}</h3>
          <p>{streak.description}</p>
        </div>

        <strong className={styles.streakValue}>
          {streak.value}
          <small>{streak.unit}</small>
        </strong>

        <div className={styles.bestStreak}>
          <span>{streak.bestLabel}</span>
          <strong>{streak.bestValue}</strong>
        </div>
      </Card>
    </div>
  );
}

export default ProductivityBreakdown;