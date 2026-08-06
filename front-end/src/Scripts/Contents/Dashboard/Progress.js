import {
  Award,
  BookOpenCheck,
  BrainCircuit,
  CalendarCheck2,
  CheckCircle2,
  CircleGauge,
  Clock3,
  FileText,
  Flame,
  ListTodo,
  NotebookPen,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

export const progressContent = {
  header: {
    eyebrow: "Progress Analytics",

    title: "Track Your Growth",

    description:
      "Review your productivity, completed tasks, learning progress and weekly activity from one dashboard.",

    ranges: [
      {
        label: "This Week",
        value: "week",
      },
      {
        label: "This Month",
        value: "month",
      },
      {
        label: "Last 3 Months",
        value: "quarter",
      },
      {
        label: "All Time",
        value: "all",
      },
    ],
  },

  overview: {
    score: {
      label: "Productivity Score",

      value: 78,

      description:
        "Your productivity increased by 12% compared with the previous period.",

      icon: CircleGauge,

      variant: "primary",
    },

    stats: [
      {
        id: "tasks",
        label: "Completed Tasks",
        value: 34,
        detail: "8 completed this week",
        icon: CheckCircle2,
        variant: "success",
      },
      {
        id: "notes",
        label: "Notes Created",
        value: 24,
        detail: "5 created this week",
        icon: FileText,
        variant: "primary",
      },
      {
        id: "roadmaps",
        label: "Roadmap Topics",
        value: 18,
        detail: "6 completed this week",
        icon: BrainCircuit,
        variant: "warning",
      },
      {
        id: "focus",
        label: "Focus Hours",
        value: "27h",
        detail: "4.5 hours today",
        icon: Clock3,
        variant: "dark",
      },
    ],
  },

  weekly: {
    eyebrow: "Weekly Activity",

    title: "Your Productive Week",

    description:
      "Compare your completed tasks, notes and learning topics throughout the week.",

    legend: {
      tasks: "Tasks",
      notes: "Notes",
      learning: "Learning Topics",
    },

    items: [
      {
        day: "Mon",
        tasks: 5,
        notes: 2,
        learning: 3,
      },
      {
        day: "Tue",
        tasks: 7,
        notes: 3,
        learning: 4,
      },
      {
        day: "Wed",
        tasks: 4,
        notes: 4,
        learning: 2,
      },
      {
        day: "Thu",
        tasks: 8,
        notes: 2,
        learning: 5,
      },
      {
        day: "Fri",
        tasks: 6,
        notes: 5,
        learning: 4,
      },
      {
        day: "Sat",
        tasks: 3,
        notes: 2,
        learning: 3,
      },
      {
        day: "Sun",
        tasks: 1,
        notes: 1,
        learning: 2,
      },
    ],
  },

  learning: {
    eyebrow: "Learning Progress",

    title: "Active Roadmaps",

    description:
      "Continue your saved roadmaps and review completed learning topics.",

    continueButton: "Continue",

    items: [
      {
        id: 1,

        title: "Frontend Development",

        description:
          "React architecture, routing, state management and frontend testing.",

        level: "Intermediate",

        completedTopics: 12,

        totalTopics: 18,

        progress: 67,

        icon: BookOpenCheck,

        path: "/dashboard/roadmaps",
      },
      {
        id: 2,

        title: "Artificial Intelligence",

        description:
          "Python, machine learning, deep learning and AI agent foundations.",

        level: "Beginner",

        completedTopics: 8,

        totalTopics: 25,

        progress: 32,

        icon: BrainCircuit,

        path: "/dashboard/roadmaps",
      },
      {
        id: 3,

        title: "Node.js Backend",

        description:
          "REST APIs, clean architecture, SQL integration and authentication.",

        level: "Beginner",

        completedTopics: 5,

        totalTopics: 20,

        progress: 25,

        icon: NotebookPen,

        path: "/dashboard/roadmaps",
      },
    ],
  },

  breakdown: {
    eyebrow: "Productivity Breakdown",

    title: "Where Your Time Goes",

    description:
      "Understand how your productive activity is distributed across MindPlanAI modules.",

    items: [
      {
        id: "tasks",

        label: "Task Management",

        percentage: 38,

        value: "34 activities",

        icon: ListTodo,

        variant: "primary",
      },
      {
        id: "learning",

        label: "Learning Roadmaps",

        percentage: 26,

        value: "18 topics",

        icon: BrainCircuit,

        variant: "warning",
      },
      {
        id: "notes",

        label: "Notes",

        percentage: 22,

        value: "24 notes",

        icon: FileText,

        variant: "success",
      },
      {
        id: "schedule",

        label: "Schedule Planner",

        percentage: 14,

        value: "16 activities",

        icon: CalendarCheck2,

        variant: "dark",
      },
    ],
  },

  streak: {
    eyebrow: "Consistency",

    title: "Current Learning Streak",

    description:
      "You have completed at least one productive activity every day.",

    value: 9,

    unit: "days",

    bestLabel: "Best streak",

    bestValue: "14 days",

    icon: Flame,
  },

  achievements: {
    eyebrow: "Achievements",

    title: "Recent Milestones",

    description:
      "Milestones earned through consistent productivity and learning.",

    items: [
      {
        id: 1,

        title: "Task Master",

        description:
          "Completed 25 tasks successfully.",

        date: "August 1, 2026",

        icon: Trophy,

        variant: "warning",
      },
      {
        id: 2,

        title: "Knowledge Builder",

        description:
          "Created and organised 20 notes.",

        date: "July 30, 2026",

        icon: NotebookPen,

        variant: "primary",
      },
      {
        id: 3,

        title: "Consistent Learner",

        description:
          "Maintained a 7-day learning streak.",

        date: "July 28, 2026",

        icon: Flame,

        variant: "danger",
      },
      {
        id: 4,

        title: "Roadmap Explorer",

        description:
          "Generated three AI learning roadmaps.",

        date: "July 25, 2026",

        icon: Sparkles,

        variant: "success",
      },
    ],
  },

  emptyState: {
    icon: Target,

    title: "No progress data available",

    description:
      "Complete tasks, create notes and continue learning to build your progress report.",
  },

  icons: {
    trending: TrendingUp,
    award: Award,
  },
};