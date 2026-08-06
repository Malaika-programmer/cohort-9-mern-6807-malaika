import { useEffect, useRef, useState } from "react";

import { Container } from "../../../../../components/layout";
import { homeStatsContent } from "../../../../../Scripts/Contents/Home";

import styles from "./HomeStats.module.css";

function HomeStats() {
  return (
    <section className={styles.section} aria-label="MindPlanAI statistics">
      <Container>
        <div className={styles.statsGrid}>
          {homeStatsContent.map((stat) => (
            <article key={stat.id} className={styles.statItem}>
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

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted || stat.type !== "number") {
      return undefined;
    }

    const duration = 1200;
    const startedAt = performance.now();
    let frameId;

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(stat.target * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [hasStarted, stat.target, stat.type]);

  if (stat.type === "text") {
    return (
      <span ref={valueRef} className={styles.letterStat}>
        {String(value)
          .split("")
          .map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              style={{ "--letter-delay": `${index * 90}ms` }}
            >
              {letter}
            </span>
          ))}
      </span>
    );
  }

  return (
    <span ref={valueRef} className={styles.countStat}>
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

  const numericMatch = String(value).match(/^(\D*)(\d+)(.*)$/);

  if (!numericMatch) {
    return {
      type: "text",
    };
  }

  return {
    type: "number",
    prefix: numericMatch[1],
    target: Number(numericMatch[2]),
    suffix: numericMatch[3],
  };
}

export default HomeStats;
