import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  CheckCircle2,
  Clock3,
  KeyRound,
  ListTodo,
  NotebookPen,
  PlayCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Link } from "react-router-dom";

import { Container } from "../../../components/layout";
import {
  Badge,
  Card,
  IconBox,
  SectionHeading,
} from "../../../components/ui";

import dashboardImg from "../../../assets/images/saas-dashboard.webp";

import styles from "./Home.module.css";

const HeroScene = lazy(
  () => import("../../../components/three/HeroScene")
);

const homeHeroContent = {
  badge: "AI-powered productivity and learning platform",
  titleStart: "Organise your work.",
  titleHighlight: "Learn with direction.",
  titleEnd: "Achieve more.",
  description:
    "MindPlanAI brings your notes, tasks, schedules and progress together in one focused workspace.",
  primaryButton: {
    label: "Get Started Free",
    path: "/register",
  },
  secondaryButton: {
    label: "Explore Features",
    path: "#features",
  },
  trustText: "No credit card required",
  supportingPoints: [
    "Smart productivity tools",
    "Personalised learning",
    "Progress tracking",
  ],
};

const homeStatsContent = [
  { id: 1, value: "One", label: "Focused workspace" },
  { id: 2, value: "24/7", label: "Access your plans" },
  { id: 3, value: "AI", label: "Personalised guidance" },
  { id: 4, value: "100%", label: "Your progress" },
];

const homeFeaturesContent = {
  eyebrow: "Everything in one place",
  title: "Tools designed to help you move forward",
  description:
    "MindPlanAI combines productivity and learning tools so you can spend less time managing different applications and more time achieving meaningful goals.",
  features: [
    {
      id: 1,
      title: "Smart Notes",
      description:
        "Capture ideas, organise knowledge and keep important information available whenever you need it.",
      icon: NotebookPen,
    },
    {
      id: 2,
      title: "Task Management",
      description:
        "Create tasks, set priorities, manage deadlines and stay focused on what matters most.",
      icon: ListTodo,
    },
    {
      id: 3,
      title: "Intelligent Scheduling",
      description:
        "Plan your day, organise study sessions and manage important events from one calendar.",
      icon: CalendarDays,
    },

    {
      id: 5,
      title: "Progress Tracking",
      description:
        "Understand your productivity patterns and monitor your progress through clear insights.",
      icon: ChartNoAxesCombined,
    },
    {
      id: 6,
      title: "AI Assistance",
      description:
        "Receive intelligent recommendations that help you plan, learn and improve more effectively.",
      icon: BrainCircuit,
    },
  ],
};

const homeHowItWorksContent = {
  eyebrow: "Simple and focused",
  title: "From idea to achievement in three steps",
  description:
    "MindPlanAI gives you a clear workflow for organising your responsibilities and building consistent progress.",
  steps: [
    {
      id: 1,
      number: "01",
      title: "Organise",
      description:
        "Add your notes, tasks, goals and schedule to one organised workspace.",
      icon: BookOpenCheck,
    },
    {
      id: 2,
      number: "02",
      title: "Learn",
      description:
        "Use guided resources to learn with direction.",
      icon: Sparkles,
    },
    {
      id: 3,
      number: "03",
      title: "Achieve",
      description:
        "Track completed work, measure progress and continue improving consistently.",
      icon: Target,
    },
  ],
};

const homeBenefitsContent = {
  title: "Built for focused growth",
  description:
    "Whether you are learning a new skill, managing university work or building professional projects, MindPlanAI keeps your work structured and visible.",
  points: [
    "Reduce tool switching",
    "Build consistent routines",
    "Track goals and completed work",
    "Access everything from one dashboard",
  ],
};

const homeCTAContent = {
  icon: CheckCircle2,
  eyebrow: "Start building better habits",
  title: "Turn your plans into measurable progress",
  description:
    "Create your MindPlanAI workspace and start organising your knowledge, tasks and learning goals today.",
  primaryButton: {
    label: "Create Free Account",
    path: "/register",
  },
  secondaryButton: {
    label: "Learn More",
    path: "/about",
  },
};

const iconThemes = [
  ["#2563eb", "#22c55e"],
  ["#7c3aed", "#06b6d4"],
  ["#0891b2", "#f59e0b"],
  ["#4f46e5", "#ec4899"],
  ["#16a34a", "#2563eb"],
  ["#0f172a", "#38bdf8"],
];

function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll(
      "[data-reveal-section]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.home}>
      <HomeHero />

      <div
        data-reveal-section
        data-reveal-direction="up"
      >
        <HomeStats />
      </div>

      <div
        data-reveal-section
        data-reveal-direction="left"
      >
        <HomeFeatures />
      </div>

      <div
        data-reveal-section
        data-reveal-direction="right"
      >
        <HomeHowItWorks />
      </div>

      <div
        data-reveal-section
        data-reveal-direction="up"
      >
        <HomeCTA />
      </div>
    </main>
  );
}

/* =========================
   Hero
========================= */

function HomeHero() {
  const [currentTime, setCurrentTime] = useState(
    formatPreviewTime()
  );

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(formatPreviewTime());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const scrollToFeatures = (event) => {
    event.preventDefault();

    document
      .querySelector(homeHeroContent.secondaryButton.path)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      className={styles.hero}
      aria-labelledby="home-hero-title"
    >
      <Suspense
        fallback={
          <div className={styles.heroBackgroundFallback} />
        }
      >
        <HeroScene />
      </Suspense>

      <div
        className={styles.gridPattern}
        aria-hidden="true"
      />

      <Container className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <Badge className={styles.badge}>
            <Sparkles size={16} />
            <span>{homeHeroContent.badge}</span>
          </Badge>

          <h1
            id="home-hero-title"
            className={styles.title}
          >
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
              {homeHeroContent.primaryButton.label}
              <ArrowRight size={18} />
            </Link>

            <a
              href={homeHeroContent.secondaryButton.path}
              className={styles.secondaryButton}
              onClick={scrollToFeatures}
            >
              <PlayCircle size={19} />
              {homeHeroContent.secondaryButton.label}
            </a>
          </div>

          <div className={styles.trustArea}>
            <span className={styles.trustText}>
              {homeHeroContent.trustText}
            </span>

            <div className={styles.supportingPoints}>
              {homeHeroContent.supportingPoints.map((point) => (
                <div
                  key={point}
                  className={styles.supportingPoint}
                >
                  <CheckCircle2 size={16} />
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
                <div
                  className={styles.timeChip}
                  aria-label={`Current time ${currentTime}`}
                >
                  <Clock3 size={15} />
                  <span>{currentTime}</span>
                </div>

                <div className={styles.profileCircle}>
                  M
                </div>
              </div>
            </div>

            <div className={styles.progressCard}>
              <div className={styles.progressHeader}>
                <div>
                  <span>Weekly progress</span>
                  <strong>74%</strong>
                </div>

                <div className={styles.progressBadge}>
                  +12%
                </div>
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
                  <NotebookPen size={20} />
                </div>

                <span>Notes</span>
                <strong>24</strong>
                <small>3 added today</small>
              </article>

              <article className={styles.smallCard}>
                <div className={styles.smallCardIcon}>
                  <ListTodo size={20} />
                </div>

                <span>Tasks</span>
                <strong>08</strong>
                <small>5 completed</small>
              </article>
            </div>


            <div className={styles.floatingTask}>
              <CheckCircle2 size={18} />

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

/* =========================
   Stats
========================= */

function HomeStats() {
  return (
    <section
      className={styles.statsSection}
      aria-label="MindPlanAI statistics"
    >
      <Container>
        <div className={styles.statsGrid}>
          {homeStatsContent.map((stat) => (
            <article
              key={stat.id}
              className={styles.statItem}
            >
              <strong>
                <AnimatedStatValue value={stat.value} />
              </strong>

              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AnimatedStatValue({ value }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [count, setCount] = useState(0);
  const valueRef = useRef(null);

  const stat = getStatParts(value);

  useEffect(() => {
    const node = valueRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || stat.type !== "number") {
      return;
    }

    const duration = 1200;
    const startedAt = performance.now();
    let frameId;

    const animate = (now) => {
      const progress = Math.min(
        (now - startedAt) / duration,
        1
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setCount(
        Math.round(stat.target * easedProgress)
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, stat.target, stat.type]);

  if (stat.type === "text") {
    return (
      <span
        ref={valueRef}
        className={styles.letterStat}
      >
        {String(value)
          .split("")
          .map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              style={{
                "--letter-delay": `${index * 90}ms`,
              }}
            >
              {letter}
            </span>
          ))}
      </span>
    );
  }

  return (
    <span
      ref={valueRef}
      className={styles.countStat}
    >
      {stat.prefix}
      {count}
      {stat.suffix}
    </span>
  );
}

function getStatParts(value) {
  if (value === "One") {
    return {
      type: "number",
      target: 1,
      prefix: "",
      suffix: "",
    };
  }

  const match = String(value).match(
    /^(\D*)(\d+)(.*)$/
  );

  if (!match) {
    return { type: "text" };
  }

  return {
    type: "number",
    prefix: match[1],
    target: Number(match[2]),
    suffix: match[3],
  };
}

/* =========================
   Features
========================= */

function HomeFeatures() {
  return (
    <section
      id="features"
      className={styles.featuresSection}
      aria-labelledby="home-features-title"
    >
      <Container>
        <SectionHeading
          eyebrow={homeFeaturesContent.eyebrow}
          title={homeFeaturesContent.title}
          titleId="home-features-title"
          description={homeFeaturesContent.description}
          className={styles.sectionHeader}
        />

        <div className={styles.featuresShowcase}>
          <div
            className={styles.orbitStage}
            aria-hidden="true"
          >
            <Canvas
              camera={{
                position: [0, 0, 5.5],
                fov: 45,
              }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={1.4} />
              <pointLight
                position={[3, 3, 4]}
                intensity={2}
              />

              <FeatureConstellation />
            </Canvas>
          </div>

          <div className={styles.featuresList}>
            {homeFeaturesContent.features.map(
              (feature, index) => (
                <article
                  key={feature.id}
                  className={styles.featureItem}
                  style={{
                    "--item-delay": `${index * 85}ms`,
                  }}
                >
                  <div className={styles.featureTop}>
                    <div
                      className={styles.featureIcon}
                      aria-hidden="true"
                    >
                      <Canvas
                        camera={{
                          position: [0, 0, 4],
                          fov: 48,
                        }}
                        dpr={[1, 1.5]}
                      >
                        <ambientLight intensity={1.2} />
                        <pointLight
                          position={[2, 2, 3]}
                          intensity={1.8}
                        />

                        <FeatureIconShape
                          index={index}
                          colors={
                            iconThemes[
                              index % iconThemes.length
                            ]
                          }
                        />
                      </Canvas>
                    </div>

                    <span className={styles.featureIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className={styles.featureCopy}>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureConstellation() {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.elapsedTime;

    groupRef.current.rotation.y =
      Math.sin(time * 0.3) * 0.15;

    groupRef.current.rotation.x =
      Math.cos(time * 0.2) * 0.1;
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.2, -0.2, 0]}
    >
      <mesh
        scale={[2.5, 3.2, 0.05]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      <mesh
        position={[0.8, -0.5, 0.4]}
        rotation={[0, 0, 0.1]}
        scale={[1.8, 2.4, 0.05]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      <group
        position={[0.4, 0.5, 0.8]}
        rotation={[0.4, -0.2, 0.5]}
      >
        <mesh
          scale={[0.12, 1.8, 0.12]}
          castShadow
        >
          <cylinderGeometry args={[1, 1, 1, 16]} />
          <meshStandardMaterial
            color="#38bdf8"
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>

        <mesh
          position={[0, -1, 0]}
          scale={[0.12, 0.3, 0.12]}
          castShadow
        >
          <cylinderGeometry
            args={[1, 0.1, 1, 16]}
          />

          <meshStandardMaterial
            color="#fbbf24"
            roughness={0.8}
          />
        </mesh>

        <mesh
          position={[0, -1.2, 0]}
          scale={[0.04, 0.1, 0.04]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      <mesh
        position={[-1.2, 1.2, 0.3]}
        rotation={[0.1, 0.1, -0.1]}
        scale={[0.8, 0.3, 0.1]}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#2563eb"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      <mesh
        position={[-1, 0.7, 0.5]}
        rotation={[0.2, 0.1, -0.15]}
        scale={[0.6, 0.3, 0.1]}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#7c3aed"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      <mesh
        position={[1.5, 1.5, -0.5]}
        castShadow
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh
        position={[-1.5, -1.2, 0.2]}
        castShadow
      >
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

function FeatureIconShape({ index, colors }) {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.elapsedTime;

    groupRef.current.rotation.y = time * 0.5;
    groupRef.current.rotation.x =
      Math.sin(time * 0.5) * 0.2;
  });

  const type = index % 3;

  return (
    <group ref={groupRef}>
      {type === 0 && (
        <group>
          <mesh
            scale={[1, 1.3, 0.1]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={colors[0]}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>

          <mesh
            position={[0.25, 0.4, 0.06]}
            scale={[0.3, 0.3, 0.05]}
            rotation={[0, 0, -Math.PI / 4]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={colors[1]}
              roughness={0.2}
            />
          </mesh>
        </group>
      )}

      {type === 1 && (
        <group>
          <mesh
            position={[0, -0.2, 0.1]}
            rotation={[0, 0, -0.1]}
            scale={[1.2, 0.8, 0.1]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={colors[0]}
              roughness={0.3}
            />
          </mesh>

          <mesh
            position={[0, 0.2, -0.1]}
            rotation={[0, 0, 0.1]}
            scale={[1.2, 0.8, 0.1]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={colors[1]}
              roughness={0.3}
            />
          </mesh>
        </group>
      )}

      {type === 2 && (
        <group>
          <mesh
            scale={[1.1, 1.1, 0.1]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={colors[0]}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>

          <mesh
            position={[0.1, 0, 0.1]}
            scale={[0.4, 0.4, 0.1]}
            rotation={[0, 0, Math.PI / 4]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={colors[1]}
              emissive={colors[1]}
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

/* =========================
   How It Works
========================= */

function HomeHowItWorks() {
  return (
    <section
      className={styles.howItWorksSection}
      aria-labelledby="home-how-it-works-title"
    >
      <Container>
        <SectionHeading
          eyebrow={homeHowItWorksContent.eyebrow}
          title={homeHowItWorksContent.title}
          titleId="home-how-it-works-title"
          description={
            homeHowItWorksContent.description
          }
          className={styles.sectionHeader}
        />

        <div className={styles.stepsGrid}>
          {homeHowItWorksContent.steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card
                key={step.id}
                className={styles.stepCard}
              >
                <div className={styles.number}>
                  {step.number}
                </div>

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

        <div className={styles.benefitsWrapper}>
          <div className={styles.benefitsContent}>
            <span className={styles.eyebrow}>
              Why MindPlanAI
            </span>

            <h2>{homeBenefitsContent.title}</h2>

            <p>{homeBenefitsContent.description}</p>

            <ul className={styles.benefitsList}>
              {homeBenefitsContent.points.map(
                (point) => (
                  <li key={point}>
                    <CheckCircle2 size={19} />
                    <span>{point}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div
            className={styles.imageCard}
            aria-hidden="true"
          >
            <img
              src={dashboardImg}
              alt="SaaS Dashboard Interface"
              className={styles.showcaseImg}
            />
          </div>
        </div>


      </Container>
    </section>
  );
}

/* =========================
   CTA
========================= */

function HomeCTA() {
  const Icon = homeCTAContent.icon;

  return (
    <section
      className={styles.ctaSection}
      aria-labelledby="home-cta-title"
    >
      <Container>
        <div className={styles.ctaCard}>
          <div
            className={styles.backgroundShapeOne}
            aria-hidden="true"
          />

          <div
            className={styles.backgroundShapeTwo}
            aria-hidden="true"
          />

          <IconBox
            icon={Icon}
            variant="primary"
            className={styles.iconWrapper}
          />

          <Badge
            variant="light"
            className={styles.eyebrow}
          >
            {homeCTAContent.eyebrow}
          </Badge>

          <h2 id="home-cta-title">
            {homeCTAContent.title}
          </h2>

          <p>{homeCTAContent.description}</p>

          <div className={styles.ctaActions}>
            <Link
              to={homeCTAContent.primaryButton.path}
              className={styles.primaryButton}
            >
              {homeCTAContent.primaryButton.label}
              <ArrowRight size={18} />
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

function formatPreviewTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

export default Home;