import {
  AlertCircle,
  Ban,
  CheckCircle,
  FileText,
  Globe,
  Lock,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import {
  Button,
  IconBox,
  SectionHeading,
} from "../../../components/ui";

import styles from "./Terms.module.css";

const termsContent = {
  hero: {
    badge: "Terms & Conditions",
    title: "Terms of Service",
    description:
      "These Terms of Service explain the rules, responsibilities, and conditions that apply when you access or use MindPlanAI. Please read them carefully before creating an account or using our platform.",
    lastUpdated: "Last updated: August 2026",
  },

  notice: {
    icon: AlertCircle,
    title: "Please Read Before Using MindPlanAI",
    description:
      "By accessing, registering for, or using MindPlanAI, you acknowledge that you have read, understood, and agreed to these Terms of Service. If you do not agree with any part of these terms, please do not use the platform.",
  },

  sections: [
    {
      number: "01",
      icon: CheckCircle,
      title: "Acceptance of Terms",
      paragraphs: [
        "By creating an account or accessing MindPlanAI, you agree to be bound by these Terms of Service and any applicable laws and regulations.",
        "These terms apply to all visitors, registered users, and individuals who access or interact with the platform.",
        "If you are using MindPlanAI on behalf of an organization, you confirm that you have the authority to accept these terms on its behalf.",
      ],
    },

    {
      number: "02",
      icon: UserCheck,
      title: "User Accounts & Responsibilities",
      paragraphs: [
        "You may need to create an account to access certain MindPlanAI features. You are responsible for providing accurate and up-to-date information during registration.",
        "You are responsible for protecting your login credentials and maintaining the confidentiality of your account.",
        "Any activity performed through your account is your responsibility. You should notify us promptly if you believe your account has been accessed without authorization.",
      ],
    },

    {
      number: "03",
      icon: FileText,
      title: "Acceptable Use",
      paragraphs: [
        "MindPlanAI is designed to help users organize information, manage tasks, plan schedules, and support learning and productivity.",
        "You agree not to misuse the platform, interfere with its operation, attempt unauthorized access, distribute malicious content, or use the service for unlawful activities.",
        "You must not attempt to reverse engineer, copy, modify, or exploit any part of the platform without appropriate authorization.",
      ],
    },

    {
      number: "04",
      icon: ShieldCheck,
      title: "Content & User Data",
      paragraphs: [
        "You retain responsibility for the information, notes, tasks, and other content that you choose to store or submit through MindPlanAI.",
        "You should ensure that the content you upload or create does not violate applicable laws or the rights of other individuals.",
        "You are responsible for maintaining appropriate backups of information that is important to you.",
      ],
    },

    {
      number: "05",
      icon: Scale,
      title: "Subscriptions & Payments",
      paragraphs: [
        "Where paid features are offered, subscriptions and payments are processed according to the plan selected by the user.",
        "You agree to provide accurate billing information and authorize applicable charges associated with your selected subscription.",
        "Fees are generally non-refundable unless a refund is required by applicable law or is otherwise expressly stated by MindPlanAI.",
      ],
    },

    {
      number: "06",
      icon: Globe,
      title: "AI-Generated Information",
      paragraphs: [
        "MindPlanAI may provide AI-powered features such as learning plans, suggestions, summaries, or productivity assistance.",
        "AI-generated information may contain inaccuracies or omissions and should be reviewed before being relied upon.",
        "AI features are intended to provide assistance and should not be treated as a substitute for professional advice where professional judgment is required.",
      ],
    },

    {
      number: "07",
      icon: Lock,
      title: "Privacy & Security",
      paragraphs: [
        "We take reasonable measures to protect information associated with the platform and user accounts.",
        "Your use of MindPlanAI is also subject to our Privacy Policy, which explains how information may be collected, used, and managed.",
        "No online platform can guarantee absolute security, so users should also take reasonable steps to protect their account information.",
      ],
    },

    {
      number: "08",
      icon: Ban,
      title: "Suspension & Termination",
      paragraphs: [
        "MindPlanAI may suspend or terminate access to an account when there is a violation of these Terms of Service, misuse of the platform, or activity that may harm the service or its users.",
        "You may also stop using the platform and request deletion of your account where applicable.",
        "Termination does not remove obligations that are intended to survive termination, including applicable legal or payment obligations.",
      ],
    },

    {
      number: "09",
      icon: ShieldCheck,
      title: "Service Availability",
      paragraphs: [
        "We aim to keep MindPlanAI available and reliable, but uninterrupted access cannot always be guaranteed.",
        "The platform may occasionally be unavailable because of maintenance, technical issues, updates, security events, or circumstances outside our reasonable control.",
        "We may modify, improve, suspend, or discontinue features when necessary to maintain or improve the service.",
      ],
    },

    {
      number: "10",
      icon: Scale,
      title: "Limitation of Liability",
      paragraphs: [
        "To the extent permitted by applicable law, MindPlanAI is not responsible for losses resulting from misuse of the platform, unauthorized account access caused by failure to protect credentials, or reliance on inaccurate user-generated or AI-generated information.",
        "Nothing in these terms is intended to exclude rights or protections that cannot legally be excluded under applicable law.",
      ],
    },

    {
      number: "11",
      icon: Globe,
      title: "Governing Law",
      paragraphs: [
        "These Terms of Service are governed by the applicable laws of the jurisdiction in which MindPlanAI operates, unless applicable law requires otherwise.",
        "Any disputes relating to the use of the platform will be handled according to the applicable legal requirements and jurisdiction.",
      ],
    },

    {
      number: "12",
      icon: FileText,
      title: "Changes to These Terms",
      paragraphs: [
        "We may update these Terms of Service when our platform, features, policies, or legal requirements change.",
        "When significant changes are made, we may provide an appropriate notice through the platform or other available communication channels.",
        "Continuing to use MindPlanAI after updated terms become effective means that you accept the revised terms.",
      ],
    },
  ],

  guidelines: {
    title: "Your Responsibilities",
    description:
      "Using MindPlanAI responsibly helps keep the platform useful, secure, and reliable for everyone.",
    items: [
      "Keep your account credentials secure.",
      "Provide accurate account information.",
      "Use the platform only for lawful purposes.",
      "Do not attempt unauthorized access.",
      "Review AI-generated information before relying on it.",
      "Respect the privacy and rights of other users.",
    ],
  },

  cta: {
    badge: "Need Assistance?",
    title: "Questions About Our Terms?",
    description:
      "If you have questions about these Terms of Service or need clarification about your responsibilities, our support team is available to help.",
    primaryButton: "Contact Support",
    secondaryButton: "Privacy Policy",
    icon: Mail,
  },
};

function Terms() {
  return (
    <main className={styles.termsPage}>
      <TermsHero />
      <TermsNotice />
      <TermsSections />
      <TermsResponsibilities />
      <TermsCTA />
    </main>
  );
}

function TermsHero() {
  const { hero } = termsContent;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <SectionHeading
          badge={hero.badge}
          title={hero.title}
          description={hero.description}
        />

        <p className={styles.lastUpdated}>
          {hero.lastUpdated}
        </p>
      </div>
    </section>
  );
}

function TermsNotice() {
  const { notice } = termsContent;
  const Icon = notice.icon;

  return (
    <section className={styles.noticeSection}>
      <div className={styles.container}>
        <div className={styles.notice}>
          <IconBox size="lg">
            <Icon size={26} />
          </IconBox>

          <div>
            <h2>{notice.title}</h2>
            <p>{notice.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TermsSections() {
  const { sections } = termsContent;

  return (
    <section className={styles.sections}>
      <div className={styles.container}>
        <SectionHeading
          badge="Terms Details"
          title="Understanding Your Use of MindPlanAI"
          description="The following sections explain the key rules and responsibilities associated with using our platform."
        />

        <div className={styles.sectionList}>
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.number}
                className={styles.termSection}
              >
                <div className={styles.sectionNumber}>
                  {section.number}
                </div>

                <div className={styles.sectionIcon}>
                  <IconBox size="md">
                    <Icon size={22} />
                  </IconBox>
                </div>

                <div className={styles.sectionContent}>
                  <h2>{section.title}</h2>

                  {section.paragraphs.map(
                    (paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ),
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TermsResponsibilities() {
  const { guidelines } = termsContent;

  return (
    <section className={styles.guidelines}>
      <div className={styles.container}>
        <div className={styles.guidelinesInner}>
          <div className={styles.guidelinesHeading}>
            <span className={styles.guidelinesLabel}>
              Good Practice
            </span>

            <h2>{guidelines.title}</h2>

            <p>{guidelines.description}</p>
          </div>

          <div className={styles.guidelinesList}>
            {guidelines.items.map((item, index) => (
              <div
                className={styles.guidelineItem}
                key={index}
              >
                <CheckCircle
                  size={20}
                  aria-hidden="true"
                />

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TermsCTA() {
  const { cta } = termsContent;
  const Icon = cta.icon;

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaIcon}>
            <IconBox size="lg">
              <Icon size={28} />
            </IconBox>
          </div>

          <SectionHeading
            badge={cta.badge}
            title={cta.title}
            description={cta.description}
          />

          <div className={styles.ctaActions}>
            <Button>{cta.primaryButton}</Button>
            <Button variant="outline">
              {cta.secondaryButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terms;