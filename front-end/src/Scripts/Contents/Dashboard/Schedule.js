import {
  Bell,
  BriefcaseBusiness,
  CalendarCheck2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Dumbbell,
  GraduationCap,
  Heart,
  ListTodo,
  MessageSquareMore,
  Plus,
  Search,
  UserRound,
} from "lucide-react";

export const scheduleContent = {
  header: {
    eyebrow: "Schedule Planner",
    title: "Plan Your Week",
    description:
      "Organise tasks, study sessions, meetings and personal activities in one weekly planner.",

    createButton: {
      label: "Add Schedule",
      icon: Plus,
    },
  },

  stats: [
    {
      id: "today",
      label: "Today",
      icon: CalendarDays,
      variant: "primary",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: CalendarClock,
      variant: "warning",
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle2,
      variant: "success",
    },
    {
      id: "missed",
      label: "Missed",
      icon: CircleDashed,
      variant: "danger",
    },
  ],

  weekNavigation: {
    previousLabel: "Previous week",
    nextLabel: "Next week",
    todayLabel: "Current Week",
  },

  filters: {
    search: {
      name: "scheduleSearch",
      placeholder: "Search schedules",
      icon: Search,
    },

    typeLabel: "Type",
    statusLabel: "Status",
    priorityLabel: "Priority",
    clearButton: "Clear Filters",

    types: [
      {
        label: "All Types",
        value: "all",
      },
      {
        label: "Task",
        value: "task",
      },
      {
        label: "Study",
        value: "study",
      },
      {
        label: "Meeting",
        value: "meeting",
      },
      {
        label: "Personal",
        value: "personal",
      },
      {
        label: "Health",
        value: "health",
      },
      {
        label: "Reminder",
        value: "reminder",
      },
    ],

    statuses: [
      {
        label: "All Statuses",
        value: "all",
      },
      {
        label: "Scheduled",
        value: "scheduled",
      },
      {
        label: "In Progress",
        value: "in_progress",
      },
      {
        label: "Completed",
        value: "completed",
      },
      {
        label: "Missed",
        value: "missed",
      },
      {
        label: "Cancelled",
        value: "cancelled",
      },
    ],

    priorities: [
      {
        label: "All Priorities",
        value: "all",
      },
      {
        label: "Low",
        value: "low",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "High",
        value: "high",
      },
      {
        label: "Urgent",
        value: "urgent",
      },
    ],
  },

  types: {
    task: {
      label: "Task",
      icon: ListTodo,
      variant: "primary",
    },
    study: {
      label: "Study",
      icon: GraduationCap,
      variant: "success",
    },
    meeting: {
      label: "Meeting",
      icon: MessageSquareMore,
      variant: "warning",
    },
    personal: {
      label: "Personal",
      icon: UserRound,
      variant: "neutral",
    },
    health: {
      label: "Health",
      icon: Dumbbell,
      variant: "danger",
    },
    reminder: {
      label: "Reminder",
      icon: Bell,
      variant: "dark",
    },
  },

  statuses: {
    scheduled: {
      label: "Scheduled",
      variant: "primary",
    },
    in_progress: {
      label: "In Progress",
      variant: "warning",
    },
    completed: {
      label: "Completed",
      variant: "success",
    },
    missed: {
      label: "Missed",
      variant: "danger",
    },
    cancelled: {
      label: "Cancelled",
      variant: "light",
    },
  },

  priorities: {
    low: {
      label: "Low",
      variant: "light",
    },
    medium: {
      label: "Medium",
      variant: "warning",
    },
    high: {
      label: "High",
      variant: "danger",
    },
    urgent: {
      label: "Urgent",
      variant: "danger",
    },
  },

  reminders: [
    {
      label: "No reminder",
      value: "none",
    },
    {
      label: "10 minutes before",
      value: "10_minutes",
    },
    {
      label: "30 minutes before",
      value: "30_minutes",
    },
    {
      label: "1 hour before",
      value: "1_hour",
    },
    {
      label: "1 day before",
      value: "1_day",
    },
  ],

  relatedTasks: [
    {
      id: "task-1",
      title: "Complete dashboard frontend",
    },
    {
      id: "task-2",
      title: "Review authentication validation",
    },
    {
      id: "task-3",
      title: "Study Node.js architecture",
    },
  ],

  initialSchedules: [
    {
      id: 1,
      title: "Dashboard Development",
      description:
        "Complete the weekly schedule module and test dashboard navigation.",
      type: "task",
      date: "2026-08-03",
      startTime: "09:00",
      endTime: "11:00",
      priority: "high",
      status: "scheduled",
      taskId: "task-1",
      reminder: "30_minutes",
      createdAt: "2026-08-01T08:00:00.000Z",
      updatedAt: "2026-08-01T08:00:00.000Z",
    },
    {
      id: 2,
      title: "React Architecture Study",
      description:
        "Review reusable components, clean architecture and route organisation.",
      type: "study",
      date: "2026-08-03",
      startTime: "14:00",
      endTime: "15:30",
      priority: "medium",
      status: "scheduled",
      taskId: null,
      reminder: "10_minutes",
      createdAt: "2026-08-01T08:30:00.000Z",
      updatedAt: "2026-08-01T08:30:00.000Z",
    },
    {
      id: 3,
      title: "Internship Progress Meeting",
      description:
        "Discuss completed modules, current blockers and upcoming backend work.",
      type: "meeting",
      date: "2026-08-04",
      startTime: "11:30",
      endTime: "12:30",
      priority: "high",
      status: "scheduled",
      taskId: null,
      reminder: "1_hour",
      createdAt: "2026-07-31T10:00:00.000Z",
      updatedAt: "2026-07-31T10:00:00.000Z",
    },
    {
      id: 4,
      title: "Morning Exercise",
      description:
        "Complete a thirty-minute exercise session before starting work.",
      type: "health",
      date: "2026-08-05",
      startTime: "07:00",
      endTime: "07:30",
      priority: "medium",
      status: "scheduled",
      taskId: null,
      reminder: "10_minutes",
      createdAt: "2026-07-30T06:00:00.000Z",
      updatedAt: "2026-07-30T06:00:00.000Z",
    },
    {
      id: 5,
      title: "Authentication Review",
      description:
        "Validate the login, signup and forgot-password forms.",
      type: "task",
      date: "2026-08-06",
      startTime: "10:00",
      endTime: "12:00",
      priority: "urgent",
      status: "in_progress",
      taskId: "task-2",
      reminder: "30_minutes",
      createdAt: "2026-07-31T09:00:00.000Z",
      updatedAt: "2026-08-01T09:00:00.000Z",
    },
    {
      id: 6,
      title: "Personal Planning",
      description:
        "Review weekly goals and plan priorities for the next week.",
      type: "personal",
      date: "2026-08-08",
      startTime: "17:00",
      endTime: "18:00",
      priority: "low",
      status: "scheduled",
      taskId: null,
      reminder: "1_hour",
      createdAt: "2026-07-29T12:00:00.000Z",
      updatedAt: "2026-07-29T12:00:00.000Z",
    },
  ],

  editor: {
    createEyebrow: "New Schedule",
    createTitle: "Add an activity",
    createDescription:
      "Choose a date, time and activity type to add it to your weekly planner.",

    editEyebrow: "Edit Schedule",
    editTitle: "Update your activity",
    editDescription:
      "Modify your schedule information and save your changes.",

    fields: {
      title: {
        label: "Title",
        name: "title",
        placeholder: "Enter schedule title",
      },
      description: {
        label: "Description",
        name: "description",
        placeholder: "Add schedule details...",
      },
      type: {
        label: "Schedule Type",
        name: "type",
      },
      date: {
        label: "Date",
        name: "date",
      },
      startTime: {
        label: "Start Time",
        name: "startTime",
      },
      endTime: {
        label: "End Time",
        name: "endTime",
      },
      priority: {
        label: "Priority",
        name: "priority",
      },
      status: {
        label: "Status",
        name: "status",
      },
      taskId: {
        label: "Related Task",
        name: "taskId",
      },
      reminder: {
        label: "Reminder",
        name: "reminder",
      },
    },

    selectPlaceholder: "Select an option",
    noTaskOption: "No linked task",
    saveButton: "Save Schedule",
    updateButton: "Update Schedule",
    cancelButton: "Cancel",

    pastWarning:
      "This schedule is in the past. It may be marked as missed.",

    conflictWarning:
      "This schedule overlaps another activity on the selected date.",
  },

  card: {
    editLabel: "Edit",
    deleteLabel: "Delete",
    completeLabel: "Mark Completed",
    reopenLabel: "Reopen",
    linkedTaskLabel: "Linked Task",
  },

  emptyState: {
    icon: CalendarCheck2,
    title: "No schedules found",
    description:
      "Add an activity or change your filters to view scheduled events.",
    button: "Add Your First Schedule",
  },

  deleteConfirmation: {
    message:
      "Are you sure you want to delete this scheduled activity? This action cannot be undone.",
  },

  validation: {
    titleRequired: "Schedule title is required.",
    titleMinimum:
      "Schedule title must contain at least 3 characters.",
    descriptionMaximum:
      "Description cannot exceed 500 characters.",
    typeRequired: "Please select a schedule type.",
    dateRequired: "Schedule date is required.",
    startTimeRequired: "Start time is required.",
    endTimeRequired: "End time is required.",
    endTimeInvalid:
      "End time must be later than the start time.",
    priorityRequired: "Please select a priority.",
    statusRequired: "Please select a status.",
  },

  icons: {
    time: Clock3,
    linkedTask: BriefcaseBusiness,
    reminder: Bell,
    favourite: Heart,
  },
};