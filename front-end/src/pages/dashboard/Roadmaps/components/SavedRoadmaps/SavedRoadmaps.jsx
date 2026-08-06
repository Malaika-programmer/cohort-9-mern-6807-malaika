import PropTypes from "prop-types";
import {
  ExternalLink,
  Trash2,
} from "lucide-react";

import { roadmapsContent } from "../../../../../Scripts/Contents/Dashboard/Roadmaps";

import {
  Badge,
  Button,
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./SavedRoadmaps.module.css";

function calculateProgress(roadmap) {
  const topics = roadmap.levels.flatMap((level) =>
    level.modules.flatMap((module) => module.topics),
  );

  const completed = topics.filter(
    (topic) => topic.isCompleted,
  ).length;

  return topics.length > 0
    ? Math.round((completed / topics.length) * 100)
    : 0;
}

function SavedRoadmaps({
  roadmaps,
  onOpen,
  onDelete,
}) {
  const { saved, icons } = roadmapsContent;

  return (
    <section>
      <SectionHeading
        eyebrow={saved.eyebrow}
        title={saved.title}
        description={saved.description}
        align="left"
      />

      {roadmaps.length > 0 ? (
        <div className={styles.grid}>
          {roadmaps.map((roadmap) => {
            const progress =
              calculateProgress(roadmap);

            return (
              <Card
                key={roadmap.id}
                className={styles.card}
              >
                <div className={styles.header}>
                  <IconBox
                    icon={icons.roadmap}
                    size="medium"
                    variant="primary"
                    animated={false}
                  />

                  <Badge variant="primary">
                    {roadmap.topic}
                  </Badge>
                </div>

                <h3>{roadmap.title}</h3>
                <p>{roadmap.overview}</p>

                <div className={styles.progressInfo}>
                  <span>
                    {saved.title}
                  </span>

                  <strong>{progress}%</strong>
                </div>

                <div className={styles.progressTrack}>
                  <span
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className={styles.actions}>
                  <Button
                    type="button"
                    size="small"
                    icon={ExternalLink}
                    onClick={() => onOpen(roadmap)}
                  >
                    {saved.openButton}
                  </Button>

                  <Button
                    type="button"
                    size="small"
                    variant="danger"
                    icon={Trash2}
                    onClick={() =>
                      onDelete(roadmap.id)
                    }
                  >
                    {saved.deleteButton}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className={styles.empty}>
          <IconBox
            icon={icons.roadmap}
            size="large"
            variant="neutral"
            animated={false}
          />

          <h3>{saved.emptyTitle}</h3>
          <p>{saved.emptyDescription}</p>
        </Card>
      )}
    </section>
  );
}

SavedRoadmaps.propTypes = {
  roadmaps: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,

  onOpen: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SavedRoadmaps;