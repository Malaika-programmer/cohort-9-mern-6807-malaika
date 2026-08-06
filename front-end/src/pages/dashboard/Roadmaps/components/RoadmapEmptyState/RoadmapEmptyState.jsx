import { roadmapsContent } from "../../../../../Scripts/Contents/Dashboard/Roadmaps";

import {
  Card,
  IconBox,
} from "../../../../../components/ui";

import styles from "./RoadmapEmptyState.module.css";

function RoadmapEmptyState() {
  const { emptyState } = roadmapsContent;

  return (
    <Card className={styles.emptyState}>
      <div className={styles.decoration}>
        <span />
        <span />
        <span />

        <IconBox
          icon={emptyState.icon}
          size="large"
          variant="primary"
          animated={false}
        />
      </div>

      <h2>{emptyState.title}</h2>
      <p>{emptyState.description}</p>
    </Card>
  );
}

export default RoadmapEmptyState;