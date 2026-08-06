import { useNavigate } from "react-router-dom";

import { progressContent } from "../../../../../Scripts/Contents/Dashboard/Progress";

import {
  Badge,
  Button,
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./LearningProgress.module.css";

function LearningProgress() {
  const navigate = useNavigate();
  const { learning } = progressContent;

  return (
    <section>
      <SectionHeading
        eyebrow={learning.eyebrow}
        title={learning.title}
        description={learning.description}
        align="left"
      />

      <div className={styles.grid}>
        {learning.items.map((roadmap) => (
          <Card
            key={roadmap.id}
            className={styles.card}
          >
            <div className={styles.header}>
              <IconBox
                icon={roadmap.icon}
                size="medium"
                variant="primary"
                animated={false}
              />

              <Badge variant="primary">
                {roadmap.level}
              </Badge>
            </div>

            <h3>{roadmap.title}</h3>

            <p>{roadmap.description}</p>

            <div className={styles.progressInfo}>
              <span>
                {roadmap.completedTopics} of{" "}
                {roadmap.totalTopics} topics
              </span>

              <strong>{roadmap.progress}%</strong>
            </div>

            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label={`${roadmap.title} progress`}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={roadmap.progress}
            >
              <span
                style={{
                  width: `${roadmap.progress}%`,
                }}
              />
            </div>

            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => navigate(roadmap.path)}
            >
              {learning.continueButton}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default LearningProgress;