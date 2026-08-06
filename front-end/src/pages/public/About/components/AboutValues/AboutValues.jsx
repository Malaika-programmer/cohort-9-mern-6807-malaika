import styles from "./AboutValues.module.css";

import { aboutContent } from "../../../../../Scripts/Contents/About";

import {
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

function AboutValues() {
  const { values, mission } = aboutContent;

  return (
    <section className={styles.values}>
      <div className={styles.container}>
        <SectionHeading
          badge="Core Values"
          title="What Drives MindPlanAI"
          description="Everything we build is guided by a strong set of values that keep our users at the center of every decision."
        />

        <div className={styles.grid}>
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <Card
                key={value.title}
                className={styles.card}
              >
                <IconBox variant={value.variant}>
                  <Icon size={22} />
                </IconBox>

                <h3>{value.title}</h3>

                <p>{value.description}</p>
              </Card>
            );
          })}
        </div>

        <Card className={styles.mission}>
          <div className={styles.missionIcon}>
            <IconBox variant="primary">
              <mission.icon size={24} />
            </IconBox>
          </div>

          <div>
            <h2>{mission.title}</h2>

            <p>{mission.description}</p>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default AboutValues;