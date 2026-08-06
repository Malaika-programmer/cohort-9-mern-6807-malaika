import styles from "./AboutTimeline.module.css";

import { aboutContent } from "../../../../../Scripts/Contents/About";

import {
  Badge,
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

function AboutTimeline() {
  const { timeline } = aboutContent;

  return (
    <section className={styles.timeline}>
      <div className={styles.container}>
        <SectionHeading
          badge="Journey"
          title="Our Journey"
          description="A quick look at how MindPlanAI has evolved from an idea into an intelligent productivity platform."
        />

        <div className={styles.grid}>
          {timeline.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.year}
                className={styles.card}
              >
                <div className={styles.header}>
                  <IconBox>
                    <Icon size={22} />
                  </IconBox>

                  <span className={styles.year}>
                    {item.year}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutTimeline;