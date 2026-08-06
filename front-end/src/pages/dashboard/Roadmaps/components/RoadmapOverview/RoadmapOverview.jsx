import PropTypes from "prop-types";
import {
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";

import { roadmapsContent } from "../../../../../Scripts/Contents/Dashboard/Roadmaps";

import {
  Badge,
  Button,
  Card,
  IconBox,
} from "../../../../../components/ui";

import { RoadmapLevel } from "../index";

import styles from "./RoadmapOverview.module.css";

function RoadmapOverview({
  roadmap,
  progress,
  onToggleTopic,
  onSave,
  onRegenerate,
  onDelete,
}) {
  const { overview, icons } = roadmapsContent;

  return (
    <section className={styles.roadmap}>
      <Card className={styles.overview}>
        <div className={styles.overviewHeader}>
          <div className={styles.titleArea}>
            <IconBox
              icon={icons.roadmap}
              size="large"
              variant="primary"
              animated={false}
            />

            <div>
              <Badge variant="primary">
                {roadmap.topic}
              </Badge>

              <h1>{roadmap.title}</h1>
              <p>{roadmap.overview}</p>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="outline"
              icon={RefreshCw}
              onClick={onRegenerate}
            >
              {overview.regenerateButton}
            </Button>

            <Button
              type="button"
              icon={Save}
              disabled={roadmap.isSaved}
              onClick={onSave}
            >
              {roadmap.isSaved
                ? overview.savedButton
                : overview.saveButton}
            </Button>

            <Button
              type="button"
              variant="danger"
              icon={Trash2}
              onClick={onDelete}
            >
              {overview.deleteButton}
            </Button>
          </div>
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <IconBox
              icon={icons.modules}
              size="small"
              variant="primary"
              animated={false}
            />

            <div>
              <span>Learning Stages</span>
              <strong>
                {roadmap.levels.length}
              </strong>
            </div>
          </div>

          <div className={styles.summaryItem}>
            <IconBox
              icon={icons.duration}
              size="small"
              variant="warning"
              animated={false}
            />

            <div>
              <span>Learning Path</span>
              <strong>
                {roadmap.estimatedDuration}
              </strong>
            </div>
          </div>

          <div className={styles.summaryItem}>
            <IconBox
              icon={icons.completed}
              size="small"
              variant="success"
              animated={false}
            />

            <div>
              <span>{overview.completedLabel}</span>

              <strong>
                {progress.completed}/{progress.total}
              </strong>
            </div>
          </div>
        </div>

        <div className={styles.progressArea}>
          <div className={styles.progressInfo}>
            <span>{overview.progressLabel}</span>
            <strong>{progress.percentage}%</strong>
          </div>

          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label={overview.progressLabel}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress.percentage}
          >
            <span
              style={{
                width: `${progress.percentage}%`,
              }}
            />
          </div>
        </div>
      </Card>

      <div className={styles.levels}>
        {roadmap.levels.map((level, index) => (
          <RoadmapLevel
            key={level.id}
            level={level}
            levelNumber={index + 1}
            onToggleTopic={onToggleTopic}
          />
        ))}
      </div>
    </section>
  );
}

RoadmapOverview.propTypes = {
  roadmap: PropTypes.object.isRequired,

  progress: PropTypes.shape({
    completed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
  }).isRequired,

  onToggleTopic: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onRegenerate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RoadmapOverview;