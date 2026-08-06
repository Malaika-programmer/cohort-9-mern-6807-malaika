import { useNavigate } from "react-router-dom";

import { dashboardContent } from "../../../../../Scripts/Contents/Dashboard/Dashboard";
import {
  Button,
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./DashboardRoadmap.module.css";

function DashboardRoadmap() {
  const navigate = useNavigate();
  const { roadmap } = dashboardContent;

  return (
    <section>
      <SectionHeading
        eyebrow={roadmap.heading.eyebrow}
        title={roadmap.heading.title}
        description={roadmap.heading.description}
        align="left"
      />

      <Card className={styles.card}>
        <div className={styles.iconArea}>
          <IconBox
            icon={roadmap.icon}
            size="large"
            variant="primary"
            animated={false}
          />
        </div>

        <div className={styles.content}>
          <span className={styles.label}>
            Active roadmap
          </span>

          <h3>{roadmap.title}</h3>

          <p>
            Next topic:{" "}
            <strong>{roadmap.currentTopic}</strong>
          </p>

          <div className={styles.progressInfo}>
            <span>
              {roadmap.completedTopics} of{" "}
              {roadmap.totalTopics} topics completed
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
              className={styles.progressValue}
              style={{
                width: `${roadmap.progress}%`,
              }}
            />
          </div>
        </div>

        <Button
          icon={roadmap.action.icon}
          iconPosition="right"
          onClick={() =>
            navigate(roadmap.action.path)
          }
        >
          {roadmap.action.label}
        </Button>
      </Card>
    </section>
  );
}

export default DashboardRoadmap;