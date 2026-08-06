import {
  BrainCircuit,
  Check,
  Crown,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";

export const pricingContent = {
  hero: {
    badge: "Simple Pricing",

    title: "Choose The Right Plan For Your Goals",

    description:
      "Start for free and upgrade whenever you need more intelligent planning, collaboration and productivity tools.",
  },

  plans: {
    badge: "Pricing Plans",

    title: "Flexible Plans For Everyone",

    description:
      "Choose a plan that matches your personal, professional or team productivity needs.",

    items: [
      {
        id: "free",

        icon: Sparkles,

        name: "Free",

        description:
          "A simple plan for individuals starting their productivity journey.",

        price: "0",

        currency: "$",

        period: "/month",

        button: "Start For Free",

        buttonVariant: "outline",

        popular: false,

        features: [
          "Basic task management",
          "Personal notes",
          "One active roadmap",
          "Basic progress tracking",
          "Community support",
        ],
      },

      {
        id: "pro",

        icon: Rocket,

        name: "Pro",

        description:
          "Advanced AI-powered tools for students and professionals.",

        price: "12",

        currency: "$",

        period: "/month",

        button: "Choose Pro",

        buttonVariant: "primary",

        popular: true,

        popularLabel: "Most Popular",

        features: [
          "Everything in Free",
          "Unlimited AI plans",
          "Smart learning roadmaps",
          "Advanced goal tracking",
          "Priority support",
          "Productivity analytics",
        ],
      },

      {
        id: "team",

        icon: Users,

        name: "Team",

        description:
          "Powerful planning and collaboration tools for growing teams.",

        price: "29",

        currency: "$",

        period: "/month",

        button: "Choose Team",

        buttonVariant: "outline",

        popular: false,

        features: [
          "Everything in Pro",
          "Up to 10 team members",
          "Shared workspaces",
          "Team task management",
          "Role-based permissions",
          "Team productivity reports",
        ],
      },
    ],
  },

  comparison: {
    badge: "Plan Comparison",

    title: "Compare All Features",

    description:
      "Review the features included in each plan and select the best option for your needs.",

    columns: ["Feature", "Free", "Pro", "Team"],

    rows: [
      {
        feature: "Task management",
        free: true,
        pro: true,
        team: true,
      },
      {
        feature: "Personal notes",
        free: true,
        pro: true,
        team: true,
      },
      {
        feature: "Unlimited AI plans",
        free: false,
        pro: true,
        team: true,
      },
      {
        feature: "Learning roadmaps",
        free: false,
        pro: true,
        team: true,
      },
      {
        feature: "Shared workspaces",
        free: false,
        pro: false,
        team: true,
      },
      {
        feature: "Team analytics",
        free: false,
        pro: false,
        team: true,
      },
    ],

    availableIcon: Check,
  },

  faq: {
    badge: "Pricing FAQs",

    title: "Frequently Asked Questions",

    description:
      "Find answers to common questions about MindPlanAI plans and billing.",

    items: [
      {
        question: "Can I use MindPlanAI for free?",
        answer:
          "Yes. The Free plan includes essential productivity features and does not require a paid subscription.",
      },
      {
        question: "Can I change my plan later?",
        answer:
          "Yes. You can upgrade or downgrade your plan whenever your requirements change.",
      },
      {
        question: "Is the Team plan charged per user?",
        answer:
          "The displayed Team plan includes up to ten team members. Additional member pricing can be added later.",
      },
      {
        question: "Can I cancel my subscription?",
        answer:
          "Yes. You can cancel your subscription from your account settings at any time.",
      },
    ],
  },

  cta: {
    icon: BrainCircuit,

    badge: "Get Started",

    title: "Start Planning Smarter Today",

    description:
      "Create your free MindPlanAI account and upgrade only when you need more advanced features.",

    primaryButton: "Start For Free",

    secondaryButton: "Contact Sales",
  },

  decoration: {
    icon: Crown,
  },
};