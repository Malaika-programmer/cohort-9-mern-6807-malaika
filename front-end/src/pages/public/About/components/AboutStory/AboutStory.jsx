import styles from "./AboutStory.module.css";

import { aboutContent } from "../../../../../Scripts/Contents/About";

import {
  Badge,
  Card,
  SectionHeading,
} from "../../../../../components/ui";

function AboutStory() {
  const { story } = aboutContent;

  return (
    <section className={styles.story}>
      <div className={styles.container}>
        <div className={styles.images}>
          <img
            src={story.imageOne}
            alt={story.title}
            className={styles.primaryImage}
          />

          <img
            src={story.imageTwo}
            alt={story.title}
            className={styles.secondaryImage}
          />
        </div>

        <div className={styles.content}>
          <Badge>
            {story.eyebrow}
          </Badge>

          <SectionHeading
            title={story.title}
            description={story.description}
            align="left"
          />

          <div className={styles.features}>
            {story.features.map((feature) => (
              <Card
                key={feature}
                className={styles.featureCard}
              >
                {feature}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;