import styles from "./NotFoundHero.module.css";

import { notFoundContent } from "../../../../../Scripts/Contents/NotFound";

import {
  Button,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

function NotFoundHero() {
  const { hero } = notFoundContent;
  const Icon = hero.icon;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <IconBox size="xl">
          <Icon size={42} />
        </IconBox>

        <div className={styles.errorCode}>404</div>

        <SectionHeading
          badge={hero.badge}
          title={hero.title}
          description={hero.description}
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
    </section>
  );
}

export default NotFoundHero;