import {
  Database,
  Eye,
  FileText,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import {
  Button,
  Card,
  IconBox,
  SectionHeading,
} from "../../../components/ui";

import styles from "./PrivacyPolicy.module.css";

const privacyPolicyContent = {
  hero: {
    badge: "Privacy Policy",
    title: "Your Privacy Matters",
    description:
      "Learn how MindPlanAI collects, uses, stores, and protects your information while using our platform.",
  },

  sections: [
    {
      id: "information",
      icon: Database,
      title: "Information We Collect",
      description:
        "We collect information you provide directly such as your name, email address, account details, notes, AI-generated content, and subscription information. We may also collect basic usage analytics to improve our services.",
    },
    {
      id: "usage",
      icon: Eye,
      title: "How We Use Your Information",
      description:
        "Your information is used to provide AI-powered features, personalize your experience, improve platform performance, process subscriptions, respond to support requests, and communicate important service updates.",
    },
    {
      id: "security",
      icon: Lock,
      title: "Data Security",
      description:
        "We implement industry-standard security measures including encrypted communication, secure authentication, controlled access, and continuous monitoring to protect your personal information.",
    },
    {
      id: "sharing",
      icon: ShieldCheck,
      title: "Information Sharing",
      description:
        "We never sell your personal information. Data is shared only with trusted service providers when necessary to operate the platform or when required by applicable law.",
    },
    {
      id: "rights",
      icon: FileText,
      title: "Your Rights",
      description:
        "You may request access to your personal information, update inaccurate data, download your content, or permanently delete your account in accordance with applicable privacy regulations.",
    },
    {
      id: "contact",
      icon: Mail,
      title: "Contact Us",
      description:
        "If you have any questions regarding this Privacy Policy or your personal information, please contact our support team for assistance.",
    },
  ],

  cta: {
    badge: "Questions?",
    title: "Need More Information?",
    description:
      "If you have concerns about how your data is handled, our support team is here to help.",
    primaryButton: "Contact Support",
    secondaryButton: "Contact Us",
    icon: ShieldCheck,
  },
};

function PrivacyPolicy() {
  return (
    <main className={styles.privacyPolicy}>
      <PrivacyHero />
      <PrivacySections />
      <PrivacyCTA />
    </main>
  );
}

/* =========================
   Hero
========================= */

function PrivacyHero() {
  const { hero } = privacyPolicyContent;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <SectionHeading
          badge={hero.badge}
          title={hero.title}
          description={hero.description}
        />
      </div>
    </section>
  );
}

/* =========================
   Privacy Sections
========================= */

function PrivacySections() {
  const { sections } = privacyPolicyContent;

  return (
    <section className={styles.sections}>
      <div className={styles.container}>
        <SectionHeading
          badge="Privacy Details"
          title="How We Protect Your Information"
          description="Understand how we collect, use, store and safeguard your personal information."
        />

        <div className={styles.grid}>
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Card
                key={section.id}
                className={styles.card}
              >
                <IconBox size="lg">
                  <Icon size={24} />
                </IconBox>

                <h3>{section.title}</h3>

                <p>{section.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================
   CTA
========================= */

function PrivacyCTA() {
  const { cta } = privacyPolicyContent;
  const Icon = cta.icon;

  return (
    <section className={styles.cta}>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaIcon}>
          <IconBox size="lg">
            <Icon size={30} />
          </IconBox>
        </div>

        <SectionHeading
          badge={cta.badge}
          title={cta.title}
          description={cta.description}
        />

        <div className={styles.ctaActions}>
          <Button>
            {cta.primaryButton}
          </Button>

          <Button variant="outline">
            {cta.secondaryButton}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;