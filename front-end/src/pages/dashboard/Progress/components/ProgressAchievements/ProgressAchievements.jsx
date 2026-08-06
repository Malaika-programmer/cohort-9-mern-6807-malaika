import { progressContent } from "../../../../../Scripts/Contents/Dashboard/Progress";

import {
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./ProgressAchievements.module.css";

function ProgressAchievements() {
  const { achievements } = progressContent;

  return (
    <section>
      <SectionHeading
        eyebrow={achievements.eyebrow}
        title={achievements.title}
        description={achievements.description}
        align="left"
      />

      <div className={styles.grid}>
        {achievements.items.map((achievement) => (
          <Card
            key={achievement.id}
            className={styles.card}
          >
            <IconBox
              icon={achievement.icon}
              size="medium"
              variant={achievement.variant}
              animated={false}
            />

            <div>
              <h3>{achievement.title}</h3>

              <p>{achievement.description}</p>

              <span>{achievement.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ProgressAchievements;