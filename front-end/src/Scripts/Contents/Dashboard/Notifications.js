import {
  Bell,
  BellDot,
  BrainCircuit,
  CalendarClock,
  CheckCheck,
  CircleUserRound,
  Info,
  ListTodo,
  MailCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

export const notificationsContent = {
  header: {
    eyebrow: "Notification Center",

    title: "Your Notifications",

    description:
      "Review task reminders, schedule updates, roadmap activity and important account notifications.",

    markAllButton: "Mark All as Read",

    clearReadButton: "Clear Read",

    markAllIcon: CheckCheck,

    clearReadIcon: Trash2,
  },

  stats: [
    {
      id: "all",
      label: "All Notifications",
      icon: Bell,
      variant: "primary",
    },
    {
      id: "unread",
      label: "Unread",
      icon: BellDot,
      variant: "warning",
    },
    {
      id: "today",
      label: "Received Today",
      icon: MailCheck,
      variant: "success",
    },
    {
      id: "important",
      label: "Important",
      icon: ShieldCheck,
      variant: "danger",
    },
  ],

  filters: {
    search: {
      name: "notificationSearch",
      placeholder:
        "Search notifications by title or message",
      icon: Search,
    },

    typeLabel: "Notification Type",

    statusLabel: "Read Status",

    sortLabel: "Sort By",

    clearButton: "Clear Filters",

    types: [
      {
        label: "All Types",
        value: "all",
      },
      {
        label: "Tasks",
        value: "task",
      },
      {
        label: "Schedule",
        value: "schedule",
      },
      {
        label: "Roadmaps",
        value: "roadmap",
      },
      {
        label: "Account",
        value: "account",
      },
      {
        label: "System",
        value: "system",
      },
    ],

    statuses: [
      {
        label: "All Notifications",
        value: "all",
      },
      {
        label: "Unread",
        value: "unread",
      },
      {
        label: "Read",
        value: "read",
      },
    ],

    sortOptions: [
      {
        label: "Newest First",
        value: "newest",
      },
      {
        label: "Oldest First",
        value: "oldest",
      },
      {
        label: "Unread First",
        value: "unread-first",
      },
      {
        label: "Important First",
        value: "important-first",
      },
    ],
  },

  types: {
    task: {
      label: "Task",
      icon: ListTodo,
      variant: "primary",
    },

    schedule: {
      label: "Schedule",
      icon: CalendarClock,
      variant: "warning",
    },

    roadmap: {
      label: "Roadmap",
      icon: BrainCircuit,
      variant: "success",
    },

    account: {
      label: "Account",
      icon: CircleUserRound,
      variant: "dark",
    },

    system: {
      label: "System",
      icon: Info,
      variant: "neutral",
    },
  },

  initialNotifications: [
    {
      id: 1,

      type: "task",

      title: "Task deadline approaching",

      message:
        'Your task "Complete dashboard frontend" is due tomorrow.',

      createdAt: "2026-08-01T12:40:00.000Z",

      isRead: false,

      isImportant: true,

      actionPath: "/dashboard/tasks",

      actionLabel: "View Task",
    },

    {
      id: 2,

      type: "schedule",

      title: "Upcoming schedule reminder",

      message:
        "React Architecture Study begins in 30 minutes.",

      createdAt: "2026-08-01T11:15:00.000Z",

      isRead: false,

      isImportant: false,

      actionPath: "/dashboard/schedule",

      actionLabel: "View Schedule",
    },

    {
      id: 3,

      type: "roadmap",

      title: "Roadmap progress updated",

      message:
        "You completed another topic in your Frontend Development roadmap.",

      createdAt: "2026-08-01T09:10:00.000Z",

      isRead: true,

      isImportant: false,

      actionPath: "/dashboard/roadmaps",

      actionLabel: "Open Roadmap",
    },

    {
      id: 4,

      type: "account",

      title: "Profile information updated",

      message:
        "Your personal profile information was updated successfully.",

      createdAt: "2026-07-31T15:25:00.000Z",

      isRead: true,

      isImportant: false,

      actionPath: "/dashboard/profile",

      actionLabel: "View Profile",
    },

    {
      id: 5,

      type: "system",

      title: "Welcome to MindPlanAI",

      message:
        "Your account is ready. Start creating notes, tasks and AI learning roadmaps.",

      createdAt: "2026-07-31T09:00:00.000Z",

      isRead: false,

      isImportant: true,

      actionPath: "/dashboard",

      actionLabel: "Open Dashboard",
    },

    {
      id: 6,

      type: "task",

      title: "Task completed",

      message:
        'You successfully completed "Update project documentation".',

      createdAt: "2026-07-30T18:10:00.000Z",

      isRead: true,

      isImportant: false,

      actionPath: "/dashboard/tasks",

      actionLabel: "View Tasks",
    },

    {
      id: 7,

      type: "roadmap",

      title: "New AI roadmap generated",

      message:
        "Your Artificial Intelligence learning roadmap is ready.",

      createdAt: "2026-07-30T14:35:00.000Z",

      isRead: false,

      isImportant: false,

      actionPath: "/dashboard/roadmaps",

      actionLabel: "View Roadmap",
    },

    {
      id: 8,

      type: "account",

      title: "Security reminder",

      message:
        "Use a strong password and keep your account information secure.",

      createdAt: "2026-07-29T10:20:00.000Z",

      isRead: false,

      isImportant: true,

      actionPath: "/dashboard/profile",

      actionLabel: "Review Security",
    },
  ],

  card: {
    unreadLabel: "Unread",

    importantLabel: "Important",

    readButton: "Mark as Read",

    unreadButton: "Mark as Unread",

    deleteButton: "Delete",

    openButton: "Open",

    deleteConfirmation:
      "Are you sure you want to delete this notification?",
  },

  emptyState: {
    icon: Sparkles,

    title: "No notifications found",

    description:
      "There are no notifications matching your current search or filters.",

    clearButton: "Clear Filters",
  },

  clearReadConfirmation:
    "Delete all read notifications? This action cannot be undone.",

  icons: {
    notification: Bell,

    unread: BellDot,

    read: CheckCheck,

    delete: Trash2,
  },
};