import { useEffect } from "react";
import styles from "./AboutPage.module.css";

import {
    AboutHero,
    AboutStory,
    AboutTimeline,
    AboutValues,
    AboutCTA,
} from "./components";

function AboutPage() {
    useEffect(() => {
        const sections = document.querySelectorAll("[data-reveal-section]");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <main className={styles.about}>
            <AboutHero />
            <div data-reveal-section data-reveal-direction="up">
                <AboutStory />
            </div>
            <div data-reveal-section data-reveal-direction="right">
                <AboutTimeline />
            </div>
            <div data-reveal-section data-reveal-direction="left">
                <AboutValues />
            </div>
            <div data-reveal-section data-reveal-direction="up">
                <AboutCTA />
            </div>
        </main>
    );
}

export default AboutPage;