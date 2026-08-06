import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "../../../../../components/layout";
import { Badge, IconBox } from "../../../../../components/ui";
import { homeCTAContent } from "../../../../../Scripts/Contents/Home";

import styles from "./HomeCTA.module.css";

function HomeCTA() {
  const Icon = homeCTAContent.icon;

  return (
    <section className={styles.section} aria-labelledby="home-cta-title">
      <Container>
        <div className={styles.ctaCard}>
          <div className={styles.backgroundShapeOne} aria-hidden="true" />
          <div className={styles.backgroundShapeTwo} aria-hidden="true" />

          <IconBox
            icon={Icon}
            variant="primary"
            className={styles.iconWrapper}
          />

          <Badge variant="light" className={styles.eyebrow}>
            {homeCTAContent.eyebrow}
          </Badge>

          <h2 id="home-cta-title">{homeCTAContent.title}</h2>

          <p>{homeCTAContent.description}</p>

          <div className={styles.actions}>
            <Link
              to={homeCTAContent.primaryButton.path}
              className={styles.primaryButton}
            >
              <span>{homeCTAContent.primaryButton.label}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link
              to={homeCTAContent.secondaryButton.path}
              className={styles.secondaryButton}
            >
              {homeCTAContent.secondaryButton.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HomeCTA;
