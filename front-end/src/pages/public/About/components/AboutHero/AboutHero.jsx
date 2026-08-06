import styles from "./AboutHero.module.css";

import { aboutContent } from "../../../../../Scripts/Contents/About";

import {
  Badge,
  Button,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

function AboutHero() {
  const { hero } = aboutContent;
  const FloatingIcon = hero.floatingCard.icon;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Badge>
            {hero.badge}
          </Badge>

          <SectionHeading
            title={hero.title}
            description={hero.description}
            align="left"
          />

          <div className={styles.actions}>
            <Button>
              {hero.primaryButton}
            </Button>

            <Button variant="outline">
              {hero.secondaryButton}
            </Button>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src={hero.image}
            alt={hero.title}
            className={styles.image}
          />

          <div className={styles.floatingCard}>
            <IconBox>
              <FloatingIcon size={22} />
            </IconBox>

            <div>
              <h4>{hero.floatingCard.title}</h4>
              <p>{hero.floatingCard.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;