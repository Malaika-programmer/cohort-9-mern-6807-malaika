import {
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  CheckCircle2,
  ListTodo,
  NotebookPen,
  Route,
  Sparkles,
  Target,
} from "lucide-react";

export const homeHeroContent = {
  badge: "AI-powered productivity and learning platform",
  titleStart: "Organise your work.",
  titleHighlight: "Learn with direction.",
  titleEnd: "Achieve more.",
  description:
    "MindPlanAI brings your notes, tasks, schedules, progress and personalised AI learning roadmaps together in one focused workspace.",
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

export const homeStatsContent = [
  {
    id: 1,
    value: "One",
    label: "Focused workspace",
  },
  {
    id: 2,
    value: "24/7",
    label: "Access your plans",
  },
  {
    id: 3,
    value: "AI",
    label: "Personalised guidance",
  },
  {
    id: 4,
    value: "100%",
    label: "Your progress",
  },
];

export const homeFeaturesContent = {
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
      id: 4,
      title: "AI Learning Roadmaps",
      description:
        "Generate structured learning paths based on your topic, current level and learning goals.",
      icon: Route,
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

export const homeHowItWorksContent = {
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
        "Use personalised AI roadmaps and guided resources to learn with direction.",
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

export const homeBenefitsContent = {
  title: "Built for focused growth",
  description:
    "Whether you are learning a new skill, managing university work or building professional projects, MindPlanAI keeps your work structured and visible.",

  points: [
    "Reduce tool switching",
    "Build consistent routines",
    "Create structured learning plans",
    "Track goals and completed work",
    "Access everything from one dashboard",
  ],
};

export const homeCTAContent = {
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