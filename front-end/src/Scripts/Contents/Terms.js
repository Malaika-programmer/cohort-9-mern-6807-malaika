import {
  Ban,
  CheckCircle,
  FileText,
  Globe,
  Lock,
  Scale,
} from "lucide-react";

export const termsContent = {
  hero: {
    badge: "Terms & Conditions",

    title: "Terms of Service",

    description:
      "Please read these Terms & Conditions carefully before using MindPlanAI. By accessing or using our platform, you agree to comply with these terms.",
  },

  sections: [
    {
      id: "acceptance",

      icon: CheckCircle,

      title: "Acceptance of Terms",

      description:
        "By creating an account or using MindPlanAI, you agree to these Terms & Conditions and all applicable laws and regulations.",
    },

    {
      id: "usage",

      icon: FileText,

      title: "Acceptable Use",

      description:
        "You agree to use MindPlanAI responsibly and not misuse, disrupt, reverse engineer, or attempt unauthorized access to the platform or its services.",
    },

    {
      id: "accounts",

      icon: Lock,

      title: "Account Responsibility",

      description:
        "You are responsible for maintaining the confidentiality of your account credentials and all activities performed under your account.",
    },

    {
      id: "subscription",

      icon: Scale,

      title: "Subscriptions & Payments",

      description:
        "Paid plans are billed according to the selected subscription. Fees are non-refundable unless required by applicable law or stated otherwise.",
    },

    {
      id: "termination",

      icon: Ban,

      title: "Termination",

      description:
        "We reserve the right to suspend or terminate accounts that violate these Terms or misuse the platform.",
    },

    {
      id: "law",

      icon: Globe,

      title: "Governing Law",

      description:
        "These Terms are governed by the applicable laws of the jurisdiction in which MindPlanAI operates.",
    },
  ],

  cta: {
    badge: "Need Assistance?",

    title: "Questions About Our Terms?",

    description:
      "If you have any questions regarding these Terms & Conditions, our support team is happy to assist you.",

    primaryButton: "Contact Support",

    secondaryButton: "Contact Us",

    icon: Scale,
  },
};