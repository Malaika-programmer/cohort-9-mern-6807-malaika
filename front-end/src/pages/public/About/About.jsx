import { useEffect } from "react";
import {
  BrainCircuit,
  Flag,
  HeartHandshake,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import {
  Badge,
  Button,
  Card,
  IconBox,
  SectionHeading,
} from "../../../components/ui";

import styles from "./About.module.css";

const aboutContent = {
  hero: {
    badge: "About MindPlanAI",
    title: "Helping People Plan Smarter Every Day",
    description:
      "MindPlanAI combines Artificial Intelligence with productivity tools to help students, professionals and teams organize their work, learning and goals in one intelligent workspace.",
    primaryButton: "Get Started",
    secondaryButton: "Explore Features",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    floatingCard: {
      title: "AI Powered",
      description: "Smart planning for everyone",
      icon: BrainCircuit,
    },
  },

  story: {
    eyebrow: "Our Story",
    title: "Why We Built MindPlanAI",
    description:
      "Managing tasks, notes, schedules and learning across different applications wastes time. MindPlanAI was created to bring everything together into one intelligent platform.",
    imageOne:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80",
    imageTwo:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80",
    features: [
      "AI Powered Planning",
      "Smart Notes",
      "Goal Tracking",
      "Learning Roadmaps",
    ],
  },

  timeline: [
    {
      year: "2024",
      title: "Idea Started",
      description:
        "The idea of creating an intelligent productivity platform was born.",
      icon: Lightbulb,
    },
    {
      year: "2025",
      title: "Research",
      description:
        "User research helped define the platform and identify productivity challenges.",
      icon: Target,
    },
    {
      year: "2026",
      title: "Platform Development",
      description:
        "Development started with AI planning, notes and task management.",
      icon: BrainCircuit,
    },
    {
      year: "Future",
      title: "Global Expansion",
      description:
        "MindPlanAI aims to become an intelligent workspace used worldwide.",
      icon: Rocket,
    },
  ],

  values: [
    {
      title: "Innovation",
      description:
        "Continuously improving productivity using Artificial Intelligence.",
      icon: Lightbulb,
      variant: "primary",
    },
    {
      title: "Trust",
      description:
        "Keeping user information secure and private at every level.",
      icon: ShieldCheck,
      variant: "success",
    },
    {
      title: "People First",
      description:
        "Every feature is designed to solve real user problems.",
      icon: Users,
      variant: "warning",
    },
    {
      title: "Growth",
      description:
        "Helping people improve their learning and productivity every day.",
      icon: HeartHandshake,
      variant: "danger",
    },
  ],

  mission: {
    icon: Flag,
    title: "Our Mission",
    description:
      "Empower people with intelligent productivity tools that simplify planning, learning and personal growth.",
  },

  cta: {
    badge: "Start Today",
    title: "Ready To Plan Smarter?",
    description:
      "Join MindPlanAI and experience a better way to organize your work and life.",
    button: "Get Started",
  },
};

function About() {
  useEffect(() => {
    const sections = document.querySelectorAll(
      "[data-reveal-section]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className={styles.about}>
      <AboutHero />

      <div
        data-reveal-section
        data-reveal-direction="up"
      >
        <AboutStory />
      </div>

      <div
        data-reveal-section
        data-reveal-direction="right"
      >
        <AboutTimeline />
      </div>

      <div
        data-reveal-section
        data-reveal-direction="left"
      >
        <AboutValues />
      </div>

      <div
        data-reveal-section
        data-reveal-direction="up"
      >
        <AboutCTA />
      </div>
    </main>
  );
}

function AboutHero() {
  const { hero } = aboutContent;
  const FloatingIcon = hero.floatingCard.icon;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <Badge>{hero.badge}</Badge>

          <SectionHeading
            title={hero.title}
            description={hero.description}
            align="left"
          />

          <div className={styles.heroActions}>
            <Button>{hero.primaryButton}</Button>

            <Button variant="outline">
              {hero.secondaryButton}
            </Button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <img
            src={hero.image}
            alt="MindPlanAI team"
            className={styles.heroImage}
          />

          <Card className={styles.floatingCard}>
            <IconBox
              icon={FloatingIcon}
              variant="primary"
              size="small"
            />

            <div>
              <h3>{hero.floatingCard.title}</h3>
              <p>{hero.floatingCard.description}</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function AboutStory() {
  const { story } = aboutContent;

  return (
    <section className={styles.story}>
      <div className={styles.container}>
        <div className={styles.storyImages}>
          <img
            src={story.imageOne}
            alt="MindPlanAI team collaboration"
            className={styles.storyImageOne}
          />

          <img
            src={story.imageTwo}
            alt="Productivity workspace"
            className={styles.storyImageTwo}
          />
        </div>

        <div className={styles.storyContent}>
          <SectionHeading
            eyebrow={story.eyebrow}
            title={story.title}
            description={story.description}
            align="left"
          />

          <div className={styles.storyFeatures}>
            {story.features.map((feature) => (
              <div
                key={feature}
                className={styles.storyFeature}
              >
                <IconBox
                  icon={CheckIcon}
                  variant="success"
                  size="small"
                  animated={false}
                />

                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutTimeline() {
  const { timeline } = aboutContent;

  return (
    <section className={styles.timeline}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Our Journey"
          title="From an Idea to an Intelligent Workspace"
          description="A quick look at how MindPlanAI has evolved."
        />

        <div className={styles.timelineList}>
          {timeline.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.year}
                className={styles.timelineCard}
              >
                <div className={styles.timelineIcon}>
                  <IconBox
                    icon={Icon}
                    variant="primary"
                    size="small"
                    animated={false}
                  />
                </div>

                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>
                    {item.year}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutValues() {
  const { values, mission } = aboutContent;
  const MissionIcon = mission.icon;

  return (
    <section className={styles.values}>
      <div className={styles.container}>
        <SectionHeading
          eyebrow="Our Values"
          title="What Drives MindPlanAI"
          description="Everything we build is guided by values that keep our users at the center."
        />

        <div className={styles.valuesGrid}>
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <Card
                key={value.title}
                className={styles.valueCard}
              >
                <IconBox
                  icon={Icon}
                  variant={value.variant}
                  animated={false}
                />

                <h3>{value.title}</h3>

                <p>{value.description}</p>
              </Card>
            );
          })}
        </div>

        <Card className={styles.mission}>
          <IconBox
            icon={MissionIcon}
            variant="primary"
            animated={false}
          />

          <div>
            <h3>{mission.title}</h3>
            <p>{mission.description}</p>
          </div>
        </Card>
      </div>
    </section>
  );
}

function AboutCTA() {
  const { cta } = aboutContent;

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <Card className={styles.ctaCard}>
          <Badge>{cta.badge}</Badge>

          <SectionHeading
            title={cta.title}
            description={cta.description}
          />

          <Button>{cta.button}</Button>
        </Card>
      </div>
    </section>
  );
}

function CheckIcon({ size = 20 }) {
  return <Target size={size} />;
}

export default About;