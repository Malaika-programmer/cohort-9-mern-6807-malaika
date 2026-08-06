import PropTypes from "prop-types";

import {
  Badge,
  Card,
  IconBox,
} from "../../../../../components/ui";

import { RoadmapModule } from "../index";

import styles from "./RoadmapLevel.module.css";

function RoadmapLevel({
  level,
  levelNumber,
  onToggleTopic,
}) {
  return (
    <Card className={styles.level}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.number}>
            {String(levelNumber).padStart(2, "0")}
          </span>

          <IconBox
            icon={level.icon}
            size="medium"
            variant={level.variant}
            animated={false}
          />

          <div>
            <Badge variant={level.variant}>
              {level.badge}
            </Badge>

            <h2>{level.label}</h2>
            <p>{level.description}</p>
          </div>
        </div>
      </header>

      <div className={styles.modules}>
        {level.modules.map((module) => (
          <RoadmapModule
            key={module.id}
            levelId={level.id}
            module={module}
            variant={level.variant}
            onToggleTopic={onToggleTopic}
          />
        ))}
      </div>
    </Card>
  );
}

RoadmapLevel.propTypes = {
  level: PropTypes.object.isRequired,
  levelNumber: PropTypes.number.isRequired,
  onToggleTopic: PropTypes.func.isRequired,
};

export default RoadmapLevel;