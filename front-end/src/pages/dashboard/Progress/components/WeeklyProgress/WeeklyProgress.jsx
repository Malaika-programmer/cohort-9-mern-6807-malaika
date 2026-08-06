import { progressContent } from "../../../../../Scripts/Contents/Dashboard/Progress";

import {
  Card,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./WeeklyProgress.module.css";

function WeeklyProgress() {
  const { weekly } = progressContent;

  const maximumValue = Math.max(
    ...weekly.items.flatMap((item) => [
      item.tasks,
      item.notes,
      item.learning,
    ]),
  );

  const getHeight = (value) =>
    `${Math.max((value / maximumValue) * 100, 8)}%`;

  return (
    <Card className={styles.card}>
      <SectionHeading
        eyebrow={weekly.eyebrow}
        title={weekly.title}
        description={weekly.description}
        align="left"
      />

      <div className={styles.legend}>
        <span>
          <i className={styles.taskLegend} />
          {weekly.legend.tasks}
        </span>

        <span>
          <i className={styles.noteLegend} />
          {weekly.legend.notes}
        </span>

        <span>
          <i className={styles.learningLegend} />
          {weekly.legend.learning}
        </span>
      </div>

      <div
        className={styles.chart}
        aria-label="Weekly productivity chart"
      >
        {weekly.items.map((item) => (
          <div
            key={item.day}
            className={styles.day}
          >
            <div className={styles.bars}>
              <span
                className={styles.taskBar}
                style={{
                  height: getHeight(item.tasks),
                }}
                title={`${item.tasks} tasks`}
              />

              <span
                className={styles.noteBar}
                style={{
                  height: getHeight(item.notes),
                }}
                title={`${item.notes} notes`}
              />

              <span
                className={styles.learningBar}
                style={{
                  height: getHeight(item.learning),
                }}
                title={`${item.learning} learning topics`}
              />
            </div>

            <strong>{item.day}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default WeeklyProgress;