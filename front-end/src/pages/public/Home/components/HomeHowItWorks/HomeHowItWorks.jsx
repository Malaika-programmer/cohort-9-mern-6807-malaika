import { CheckCircle2 } from "lucide-react";

import { Container } from "../../../../../components/layout";
import { Card, IconBox, SectionHeading } from "../../../../../components/ui";
import {
  homeBenefitsContent,
  homeHowItWorksContent,
} from "../../../../../Scripts/Contents/Home";

import dashboardImg from "../../../../../assets/images/saas-dashboard.png";
import roadmapImg from "../../../../../assets/images/learning-roadmap.png";
import styles from "./HomeHowItWorks.module.css";

function HomeHowItWorks() {
  return (
    <section
      className={styles.section}
      aria-labelledby="home-how-it-works-title"
    >
      <Container>
        <SectionHeading
          eyebrow={homeHowItWorksContent.eyebrow}
          title={homeHowItWorksContent.title}
          titleId="home-how-it-works-title"
          description={homeHowItWorksContent.description}
          className={styles.sectionHeader}
        />

        <div className={styles.stepsGrid}>
          {homeHowItWorksContent.steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card key={step.id} className={styles.stepCard}>
                <div className={styles.number}>{step.number}</div>

                <IconBox
                  icon={Icon}
                  variant="dark"
                  className={styles.iconWrapper}
                />

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Card>
            );
          })}
        </div>

        {/* First Image Showcase */}
        <div className={styles.benefitsWrapper}>
          <div className={styles.benefitsContent}>
            <span className={styles.eyebrow}>Why MindPlanAI</span>
            <h2>{homeBenefitsContent.title}</h2>
            <p>{homeBenefitsContent.description}</p>

            <ul className={styles.benefitsList}>
              {homeBenefitsContent.points.map((point) => (
                <li key={point}>
                  <CheckCircle2 size={19} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.imageCard} aria-hidden="true">
            <img src={dashboardImg} alt="SaaS Dashboard Interface" className={styles.showcaseImg} />
          </div>
        </div>

        {/* Second Image Showcase (Roadmap) */}
        <div className={`${styles.benefitsWrapper} ${styles.reverseWrapper}`} data-reveal-section data-reveal-direction="right">
          <div className={styles.imageCard} aria-hidden="true">
            <img src={roadmapImg} alt="Learning Roadmap Visualization" className={styles.showcaseImg} />
          </div>

          <div className={styles.benefitsContent}>
            <span className={styles.eyebrow}>Personalized Growth</span>
            <h2>AI-Powered Learning Roadmaps</h2>
            <p>
              Experience a continuous growth journey. Our advanced AI tracks your learning patterns
              and crafts interconnected, dynamic roadmaps that adapt to your speed and preferences.
              Every node is a step closer to mastery.
            </p>

            <ul className={styles.benefitsList}>
              <li><CheckCircle2 size={19} /><span>Dynamic Path Adjustments</span></li>
              <li><CheckCircle2 size={19} /><span>Visual Skill Tracking</span></li>
              <li><CheckCircle2 size={19} /><span>Interactive Milestones</span></li>
            </ul>
          </div>
        </div>

      </Container>
    </section>
  );
}

export default HomeHowItWorks;
