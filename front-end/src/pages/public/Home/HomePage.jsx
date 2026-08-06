import { useEffect } from "react";

import {
  HomeHero,
  HomeStats,
  HomeFeatures,
  HomeHowItWorks,
  HomeCTA,
} from "./components";

import styles from "./HomePage.module.css";

function HomePage() {
  useEffect(() => {
    const sections = document.querySelectorAll("[data-reveal-section]");

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
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className={styles.homePage}>
      <HomeHero />
      <div data-reveal-section data-reveal-direction="up">
        <HomeStats />
      </div>
      <div data-reveal-section data-reveal-direction="left">
        <HomeFeatures />
      </div>
      <div data-reveal-section data-reveal-direction="right">
        <HomeHowItWorks />
      </div>
      <div data-reveal-section data-reveal-direction="up">
        <HomeCTA />
      </div>
    </main>
  );
}

export default HomePage;
