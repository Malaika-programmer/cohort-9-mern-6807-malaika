import {
  AlertTriangle,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  Dumbbell,
  FolderKanban,
  ListTodo,
  Plus,
  Search,
  UserRound,
} from "lucide-react";

export const tasksContent = {
  header: {
    eyebrow: "Task Management",
    title: "Your Tasks",
    description:
      "Create, organise and complete your daily tasks from one focused workspace.",

    createButton: {
      label: "Create Task",
      icon: Plus,
    },
  },

  stats: [
    {
      id: "all",
      label: "Total Tasks",
      icon: ClipboardList,
      variant: "primary",
    },
    {
      id: "todo",
      label: "To Do",
      icon: CircleDashed,
      variant: "warning",
    },
    {
      id: "in_progress",
      label: "In Progress",
      icon: CalendarClock,
      variant: "primary",
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle2,
      variant: "success",
    },
    {
      id: "overdue",
      label: "Overdue",
      icon: AlertTriangle,
      variant: "danger",
    },
  ],

  filters: {
    search: {
      name: "taskSearch",
      placeholder: "Search tasks by title or description",
      icon: Search,
    },

    statusLabel: "Status",
    priorityLabel: "Priority",
    categoryLabel: "Category",
    sortLabel: "Sort by",
    clearButton: "Clear Filters",

    statuses: [
      {
        label: "All Statuses",
        value: "all",
      },
      {
        label: "To Do",
        value: "todo",
      },
      {
        label: "In Progress",
        value: "in_progress",
      },
      {
        label: "Completed",
        value: "completed",
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

    categories: [
      {
        label: "All Categories",
        value: "all",
      },
      {
        label: "Work",
        value: "work",
      },
      {
        label: "Study",
        value: "study",
      },
      {
        label: "Personal",
        value: "personal",
      },
      {
        label: "Project",
        value: "project",
      },
      {
        label: "Health",
        value: "health",
      },
    ],

    sortOptions: [
      {
        label: "Recently Updated",
        value: "updated-desc",
      },
      {
        label: "Oldest Updated",
        value: "updated-asc",
      },
      {
        label: "Due Date: Earliest",
        value: "due-asc",
      },
      {
        label: "Due Date: Latest",
        value: "due-desc",
      },
      {
        label: "Priority: Highest",
        value: "priority-desc",
      },
      {
        label: "Title A–Z",
        value: "title-asc",
      },
    ],
  },

  statuses: {
    todo: {
      label: "To Do",
      variant: "light",
    },
    in_progress: {
      label: "In Progress",
      variant: "primary",
    },
    completed: {
      label: "Completed",
      variant: "success",
    },
  },

  priorities: {
    low: {
      label: "Low",
      variant: "light",
      rank: 1,
    },
    medium: {
      label: "Medium",
      variant: "warning",
      rank: 2,
    },
    high: {
      label: "High",
      variant: "danger",
      rank: 3,
    },
    urgent: {
      label: "Urgent",
      variant: "danger",
      rank: 4,
    },
  },

  categories: {
    work: {
      label: "Work",
      icon: BriefcaseBusiness,
      variant: "primary",
    },
    study: {
      label: "Study",
      icon: BookOpenCheck,
      variant: "success",
    },
    personal: {
      label: "Personal",
      icon: UserRound,
      variant: "neutral",
    },
    project: {
      label: "Project",
      icon: FolderKanban,
      variant: "dark",
    },
    health: {
      label: "Health",
      icon: Dumbbell,
      variant: "warning",
    },
  },

  initialTasks: [
    {
      id: 1,
      title: "Complete dashboard frontend",
      description:
        "Finish the dashboard, notes and tasks modules according to the approved frontend architecture.",
      status: "in_progress",
      priority: "high",
      category: "project",
      dueDate: "2026-08-03",
      createdAt: "2026-07-29T10:00:00.000Z",
      updatedAt: "2026-08-01T09:20:00.000Z",
    },
    {
      id: 2,
      title: "Review authentication validation",
      description:
        "Check login, signup and forgot-password form validation before backend integration.",
      status: "todo",
      priority: "medium",
      category: "work",
      dueDate: "2026-08-04",
      createdAt: "2026-07-30T08:30:00.000Z",
      updatedAt: "2026-07-31T15:10:00.000Z",
    },
    {
      id: 3,
      title: "Study Node.js service architecture",
      description:
        "Review controller, service, repository and middleware responsibilities.",
      status: "todo",
      priority: "high",
      category: "study",
      dueDate: "2026-08-06",
      createdAt: "2026-07-27T11:00:00.000Z",
      updatedAt: "2026-07-30T12:35:00.000Z",
    },
    {
      id: 4,
      title: "Update project documentation",
      description:
        "Update the README and frontend architecture documentation.",
      status: "completed",
      priority: "low",
      category: "project",
      dueDate: "2026-07-31",
      createdAt: "2026-07-25T09:20:00.000Z",
      updatedAt: "2026-07-31T13:10:00.000Z",
    },
    {
      id: 5,
      title: "Prepare weekly internship report",
      description:
        "Summarise completed modules, current blockers and next development steps.",
      status: "todo",
      priority: "urgent",
      category: "work",
      dueDate: "2026-08-02",
      createdAt: "2026-07-31T10:15:00.000Z",
      updatedAt: "2026-08-01T07:40:00.000Z",
    },
    {
      id: 6,
      title: "Morning exercise",
      description:
        "Complete a thirty-minute exercise session before starting development work.",
      status: "completed",
      priority: "low",
      category: "health",
      dueDate: "2026-08-01",
      createdAt: "2026-07-28T06:30:00.000Z",
      updatedAt: "2026-08-01T06:45:00.000Z",
    },
  ],

  editor: {
    createEyebrow: "New Task",
    createTitle: "Create a new task",
    createDescription:
      "Add the task details, select its priority and choose a due date.",

    editEyebrow: "Edit Task",
    editTitle: "Update your task",
    editDescription:
      "Update the task information and save your changes.",

    fields: {
      title: {
        label: "Task Title",
        name: "title",
        placeholder: "Enter a clear task title",
      },

      description: {
        label: "Description",
        name: "description",
        placeholder: "Add useful task details...",
      },

      status: {
        label: "Status",
        name: "status",
      },

      priority: {
        label: "Priority",
        name: "priority",
      },

      category: {
        label: "Category",
        name: "category",
      },

      dueDate: {
        label: "Due Date",
        name: "dueDate",
      },
    },

    selectPlaceholder: "Select an option",
    saveButton: "Save Task",
    updateButton: "Update Task",
    cancelButton: "Cancel",

    pastDateWarning:
      "The selected due date is in the past. The task will be marked as overdue.",
  },

  card: {
    editLabel: "Edit",
    deleteLabel: "Delete",
    completeLabel: "Mark Complete",
    reopenLabel: "Reopen Task",
    dueDatePrefix: "Due",
    overdueLabel: "Overdue",
    noDueDateLabel: "No due date",
  },

  emptyState: {
    icon: ListTodo,
    title: "No tasks found",
    description:
      "Create a new task or change your filters to view existing tasks.",
    button: "Create Your First Task",
  },

  deleteConfirmation: {
    message:
      "Are you sure you want to delete this task? This action cannot be undone.",
  },

  validation: {
    titleRequired: "Task title is required.",
    titleMinimum: "Task title must contain at least 3 characters.",
    descriptionMaximum:
      "Task description cannot exceed 500 characters.",
    statusRequired: "Please select a task status.",
    priorityRequired: "Please select a priority.",
    categoryRequired: "Please select a category.",
    dueDateInvalid: "Enter a valid due date.",
  },
};