import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  FileText,
  ListTodo,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const dashboardContent = {
  welcome: {
    badge: "Personal Workspace",
    greeting: "Welcome back",
    userName: "Malaika",
    description:
      "Organise your notes, manage your tasks and continue your learning journey from one intelligent workspace.",

    primaryAction: {
      label: "Create Note",
      path: "/dashboard/notes",
      icon: Plus,
    },

    secondaryAction: {
      label: "Generate Roadmap",
      path: "/dashboard/roadmaps/create",
      icon: Sparkles,
    },
  },

  stats: {
    heading: {
      eyebrow: "Overview",
      title: "Your productivity at a glance",
      description:
        "Track your notes, tasks, learning roadmaps and weekly progress.",
    },

    items: [
      {
        id: "notes",
        label: "Total Notes",
        value: "24",
        detail: "3 created this week",
        icon: FileText,
        variant: "primary",
      },
      {
        id: "tasks",
        label: "Pending Tasks",
        value: "08",
        detail: "5 completed today",
        icon: ListTodo,
        variant: "warning",
      },
      {
        id: "roadmaps",
        label: "Active Roadmaps",
        value: "03",
        detail: "Frontend roadmap active",
        icon: BrainCircuit,
        variant: "success",
      },
      {
        id: "progress",
        label: "Weekly Progress",
        value: "74%",
        detail: "12% improvement",
        icon: TrendingUp,
        variant: "primary",
      },
    ],
  },

  recentNotes: {
    heading: {
      eyebrow: "Recent Notes",
      title: "Continue where you left off",
      description:
        "Review and update your most recently accessed notes.",
    },

    viewAll: {
      label: "View All Notes",
      path: "/dashboard/notes",
      icon: ArrowRight,
    },

    items: [
      {
        id: 1,
        title: "React Component Architecture",
        excerpt:
          "Reusable components, page-level architecture and clean import patterns.",
        category: "Development",
        updatedAt: "10 minutes ago",
        icon: FileText,
      },
      {
        id: 2,
        title: "AI Agent Learning Plan",
        excerpt:
          "Important topics, tools and practical exercises for learning AI agents.",
        category: "Artificial Intelligence",
        updatedAt: "Yesterday",
        icon: BrainCircuit,
      },
      {
        id: 3,
        title: "Internship Project Requirements",
        excerpt:
          "MindPlanAI requirements, modules and implementation decisions.",
        category: "Project",
        updatedAt: "2 days ago",
        icon: BookOpen,
      },
    ],
  },

  tasks: {
    heading: {
      eyebrow: "Tasks",
      title: "Upcoming priorities",
      description:
        "Stay focused on the tasks that require your attention.",
    },

    viewAll: {
      label: "View All Tasks",
      path: "/dashboard/tasks",
      icon: ArrowRight,
    },

    items: [
      {
        id: 1,
        title: "Complete dashboard frontend",
        dueDate: "Today",
        priority: "High",
        priorityVariant: "danger",
        completed: false,
      },
      {
        id: 2,
        title: "Review authentication validation",
        dueDate: "Tomorrow",
        priority: "Medium",
        priorityVariant: "warning",
        completed: false,
      },
      {
        id: 3,
        title: "Update project documentation",
        dueDate: "August 5",
        priority: "Low",
        priorityVariant: "success",
        completed: true,
      },
    ],
  },

  roadmap: {
    heading: {
      eyebrow: "Learning Roadmap",
      title: "Current learning progress",
      description:
        "Continue your active roadmap and complete the next recommended topic.",
    },

    icon: BrainCircuit,
    title: "Frontend Development",
    currentTopic: "React component architecture",
    completedTopics: 12,
    totalTopics: 18,
    progress: 67,

    action: {
      label: "Continue Roadmap",
      path: "/dashboard/roadmaps",
      icon: ArrowRight,
    },
  },

  quickActions: {
    heading: {
      eyebrow: "Quick Actions",
      title: "Start something productive",
      description:
        "Access frequently used MindPlanAI tools directly.",
    },

    items: [
      {
        id: "create-note",
        title: "Create Note",
        description: "Capture a new idea or learning topic.",
        icon: FileText,
        path: "/dashboard/notes",
      },
      {
        id: "add-task",
        title: "Add Task",
        description: "Create and schedule a new task.",
        icon: ListTodo,
        path: "/dashboard/tasks",
      },
      {
        id: "schedule",
        title: "Plan Schedule",
        description: "Organise your upcoming activities.",
        icon: CalendarDays,
        path: "/dashboard/schedule",
      },
      {
        id: "roadmap",
        title: "Generate Roadmap",
        description: "Build a personalised AI learning path.",
        icon: Sparkles,
        path: "/dashboard/roadmaps/create",
      },
    ],
  },

  activity: {
    heading: {
      eyebrow: "Activity",
      title: "Recent account activity",
      description:
        "A summary of your latest productivity actions.",
    },

    items: [
      {
        id: 1,
        title: "Note created",
        description: "React Component Architecture",
        time: "10 minutes ago",
        icon: FileText,
      },
      {
        id: 2,
        title: "Task completed",
        description: "Review JavaScript concepts",
        time: "2 hours ago",
        icon: CheckCircle2,
      },
      {
        id: 3,
        title: "Roadmap updated",
        description: "Frontend Development",
        time: "Yesterday",
        icon: BrainCircuit,
      },
    ],
  },
};
