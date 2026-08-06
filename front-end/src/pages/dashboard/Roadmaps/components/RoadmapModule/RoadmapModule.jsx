import PropTypes from "prop-types";
import {
  CheckCircle2,
  Circle,
  Flag,
  ListChecks,
} from "lucide-react";

import { roadmapsContent } from "../../../../../Scripts/Contents/Dashboard/Roadmaps";

import {
  Badge,
  IconBox,
} from "../../../../../components/ui";

import styles from "./RoadmapModule.module.css";

function RoadmapModule({
  levelId,
  module,
  variant,
  onToggleTopic,
}) {
  const completedTopics = module.topics.filter(
    (topic) => topic.isCompleted,
  ).length;

  const moduleCompleted =
    completedTopics === module.topics.length;

  return (
    <article
      className={[
        styles.module,
        moduleCompleted
          ? styles.completedModule
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.header}>
        <IconBox
          icon={module.icon}
          size="small"
          variant={variant}
          animated={false}
        />

        <div>
          <h3>{module.title}</h3>

          <span>
            {completedTopics}/{module.topics.length}{" "}
            {roadmapsContent.module.completedLabel}
          </span>
        </div>

        {moduleCompleted && (
          <Badge variant="success">
            {roadmapsContent.module.completedLabel}
          </Badge>
        )}
      </div>

      <p className={styles.description}>
        {module.description}
      </p>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <ListChecks aria-hidden="true" />

          <strong>
            {roadmapsContent.module.topicsLabel}
          </strong>
        </div>

        <ul className={styles.topicList}>
          {module.topics.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                aria-label={
                  topic.isCompleted
                    ? roadmapsContent.module
                        .markIncompleteLabel
                    : roadmapsContent.module
                        .markCompleteLabel
                }
                onClick={() =>
                  onToggleTopic({
                    levelId,
                    moduleId: module.id,
                    topicId: topic.id,
                  })
                }
              >
                {topic.isCompleted ? (
                  <CheckCircle2
                    aria-hidden="true"
                  />
                ) : (
                  <Circle aria-hidden="true" />
                )}

                <span
                  className={
                    topic.isCompleted
                      ? styles.completedTopic
                      : ""
                  }
                >
                  {topic.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <ListChecks aria-hidden="true" />

          <strong>
            {roadmapsContent.module.practiceLabel}
          </strong>
        </div>

        <ul className={styles.practiceList}>
          {module.practiceTasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>

      <div className={styles.milestone}>
        <Flag aria-hidden="true" />

        <div>
          <span>
            {roadmapsContent.module.milestoneLabel}
          </span>

          <strong>{module.milestone}</strong>
        </div>
      </div>
    </article>
  );
}

RoadmapModule.propTypes = {
  levelId: PropTypes.string.isRequired,
  module: PropTypes.object.isRequired,
  variant: PropTypes.string.isRequired,
  onToggleTopic: PropTypes.func.isRequired,
};

export default RoadmapModule;