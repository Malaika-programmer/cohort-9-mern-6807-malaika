import styles from "./AboutCTA.module.css";

import { aboutContent } from "../../../../../Scripts/Contents/About";

import {
  Badge,
  Button,
  SectionHeading,
} from "../../../../../components/ui";

function AboutCTA() {
  const { cta } = aboutContent;

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <Badge>
          {cta.badge}
        </Badge>

        <SectionHeading
          title={cta.title}
          description={cta.description}
        />

        <div className={styles.actions}>
          <Button>
            {cta.button}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;