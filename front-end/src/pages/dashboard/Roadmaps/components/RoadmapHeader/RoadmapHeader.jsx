import { roadmapsContent } from "../../../../../Scripts/Contents/Dashboard/Roadmaps";

import {
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./RoadmapHeader.module.css";

function RoadmapHeader() {
  const { header, icons } = roadmapsContent;

  return (
    <section className={styles.header}>
      <IconBox
        icon={icons.roadmap}
        size="large"
        variant="primary"
        animated={false}
      />

      <SectionHeading
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
        align="left"
      />
    </section>
  );
}

export default RoadmapHeader;