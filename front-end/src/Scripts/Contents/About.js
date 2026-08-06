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

export const aboutContent = {
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