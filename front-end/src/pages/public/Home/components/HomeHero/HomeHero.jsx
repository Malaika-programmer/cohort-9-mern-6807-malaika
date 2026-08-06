import { useEffect, useState, lazy, Suspense } from "react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  ListTodo,
  NotebookPen,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "../../../../../components/layout";
import { Badge } from "../../../../../components/ui";
import { homeHeroContent } from "../../../../../Scripts/Contents/Home";

import styles from "./HomeHero.module.css";

const HeroScene = lazy(() => import("../../../../../components/three/HeroScene"));

function HomeHero() {
  const [currentTime, setCurrentTime] = useState(() => formatPreviewTime());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(formatPreviewTime());
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const scrollToFeatures = (event) => {
    event.preventDefault();

    const featuresSection = document.querySelector(
      homeHeroContent.secondaryButton.path,
    );

    featuresSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <Suspense fallback={<div className={styles.heroBackgroundFallback} />}>
        <HeroScene />
      </Suspense>
      <div className={styles.gridPattern} aria-hidden="true" />

      <Container className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <Badge className={styles.badge}>
            <Sparkles size={16} aria-hidden="true" />
            <span>{homeHeroContent.badge}</span>
          </Badge>

          <h1 id="home-hero-title" className={styles.title}>
            <span>{homeHeroContent.titleStart}</span>{" "}
            <span className={styles.highlight}>
              {homeHeroContent.titleHighlight}
            </span>{" "}
            <span>{homeHeroContent.titleEnd}</span>
          </h1>

          <p className={styles.description}>
            {homeHeroContent.description}
          </p>

          <div className={styles.actions}>
            <Link
              to={homeHeroContent.primaryButton.path}
              className={styles.primaryButton}
            >
              <span>{homeHeroContent.primaryButton.label}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <a
              href={homeHeroContent.secondaryButton.path}
              className={styles.secondaryButton}
              onClick={scrollToFeatures}
            >
              <PlayCircle size={19} aria-hidden="true" />
              <span>{homeHeroContent.secondaryButton.label}</span>
            </a>
          </div>

          <div className={styles.trustArea}>
            <span className={styles.trustText}>
              {homeHeroContent.trustText}
            </span>

            <div className={styles.supportingPoints}>
              {homeHeroContent.supportingPoints.map((point) => (
                <div key={point} className={styles.supportingPoint}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.previewWrapper}>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <div>
                <span className={styles.previewEyebrow}>
                  Your productivity
                </span>
                <h2>Good morning, Malaika</h2>
              </div>

              <div className={styles.previewHeaderActions}>
                <div className={styles.timeChip} aria-label={`Current time ${currentTime}`}>
                  <Clock3 size={15} aria-hidden="true" />
                  <span>{currentTime}</span>
                </div>

                <div className={styles.profileCircle}>M</div>
              </div>
            </div>

            <div className={styles.progressCard}>
              <div className={styles.progressHeader}>
                <div>
                  <span>Weekly progress</span>
                  <strong>74%</strong>
                </div>

                <div className={styles.progressBadge}>+12%</div>
              </div>

              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-label="Weekly progress"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="74"
              >
                <div className={styles.progressValue} />
              </div>
            </div>

            <div className={styles.previewGrid}>
              <article className={styles.smallCard}>
                <div className={styles.smallCardIcon}>
                  <NotebookPen size={20} aria-hidden="true" />
                </div>
                <span>Notes</span>
                <strong>24</strong>
                <small>3 added today</small>
              </article>

              <article className={styles.smallCard}>
                <div className={styles.smallCardIcon}>
                  <ListTodo size={20} aria-hidden="true" />
                </div>
                <span>Tasks</span>
                <strong>08</strong>
                <small>5 completed</small>
              </article>
            </div>

            <div className={styles.roadmapCard}>
              <div className={styles.roadmapIcon}>
                <BrainCircuit size={22} aria-hidden="true" />
              </div>

              <div className={styles.roadmapContent}>
                <span>AI learning roadmap</span>
                <strong>Frontend Development</strong>
                <small>Next: React component architecture</small>
              </div>

              <ArrowRight size={18} aria-hidden="true" />
            </div>

            <div className={styles.floatingTask}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <div>
                <strong>Task completed</strong>
                <span>Review JavaScript notes</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function formatPreviewTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

export default HomeHero;
