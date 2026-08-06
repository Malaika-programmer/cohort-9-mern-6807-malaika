import {
  BookOpen,
  BriefcaseBusiness,
  Code2,
  FilePlus2,
  FileText,
  GraduationCap,
  Lightbulb,
  NotebookPen,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

export const notesContent = {
  header: {
    eyebrow: "Knowledge Workspace",
    title: "Your Notes",
    description:
      "Create, organise, search and update your personal notes from one focused workspace.",

    createButton: {
      label: "Create Note",
      icon: Plus,
    },
  },

  stats: [
    {
      id: "all",
      label: "Total Notes",
      value: "6",
      icon: FileText,
      variant: "primary",
    },
    {
      id: "pinned",
      label: "Pinned Notes",
      value: "2",
      icon: Sparkles,
      variant: "warning",
    },
    {
      id: "recent",
      label: "Updated This Week",
      value: "4",
      icon: NotebookPen,
      variant: "success",
    },
  ],

  filters: {
    search: {
      name: "notesSearch",
      placeholder: "Search notes by title or content",
      icon: Search,
    },

    categoryLabel: "Category",
    sortLabel: "Sort by",

    categories: [
      { label: "All Categories", value: "all" },
      { label: "Development", value: "development" },
      { label: "Artificial Intelligence", value: "ai" },
      { label: "Learning", value: "learning" },
      { label: "Project", value: "project" },
      { label: "Personal", value: "personal" },
    ],

    sortOptions: [
      { label: "Recently Updated", value: "updated-desc" },
      { label: "Oldest Updated", value: "updated-asc" },
      { label: "Title A–Z", value: "title-asc" },
      { label: "Title Z–A", value: "title-desc" },
    ],
  },

  categories: {
    development: {
      label: "Development",
      icon: Code2,
      variant: "primary",
    },
    ai: {
      label: "Artificial Intelligence",
      icon: Sparkles,
      variant: "warning",
    },
    learning: {
      label: "Learning",
      icon: GraduationCap,
      variant: "success",
    },
    project: {
      label: "Project",
      icon: BriefcaseBusiness,
      variant: "dark",
    },
    personal: {
      label: "Personal",
      icon: Lightbulb,
      variant: "neutral",
    },
  },

  initialNotes: [
    {
      id: 1,
      title: "React Component Architecture",
      content:
        "Reusable components should remain independent from page-specific business logic. Pages compose UI building blocks while features handle services and API calls.",
      category: "development",
      isPinned: true,
      createdAt: "2026-07-25T09:30:00.000Z",
      updatedAt: "2026-08-01T08:40:00.000Z",
    },
    {
      id: 2,
      title: "AI Agent Learning Plan",
      content:
        "Start with Python, APIs, prompt engineering, retrieval-augmented generation, tool calling, agent memory and workflow orchestration.",
      category: "ai",
      isPinned: true,
      createdAt: "2026-07-22T10:10:00.000Z",
      updatedAt: "2026-07-31T15:20:00.000Z",
    },
    {
      id: 3,
      title: "MindPlanAI Project Requirements",
      content:
        "The application includes notes, tasks, schedules, AI roadmaps, user authentication, role management, logging, testing and SQL integration.",
      category: "project",
      isPinned: false,
      createdAt: "2026-07-18T13:15:00.000Z",
      updatedAt: "2026-07-30T12:00:00.000Z",
    },
    {
      id: 4,
      title: "JavaScript Revision",
      content:
        "Review closures, promises, async and await, event loop, prototypes, modules, array methods and error handling.",
      category: "learning",
      isPinned: false,
      createdAt: "2026-07-15T11:30:00.000Z",
      updatedAt: "2026-07-29T07:40:00.000Z",
    },
    {
      id: 5,
      title: "Internship Weekly Goals",
      content:
        "Complete the dashboard interface, validate authentication forms, review clean architecture and prepare the project documentation.",
      category: "personal",
      isPinned: false,
      createdAt: "2026-07-27T08:00:00.000Z",
      updatedAt: "2026-07-28T17:15:00.000Z",
    },
    {
      id: 6,
      title: "Node.js Backend Decisions",
      content:
        "Use controllers, services, repositories and validation middleware. Keep authentication, notes and users in independent modules.",
      category: "development",
      isPinned: false,
      createdAt: "2026-07-20T08:25:00.000Z",
      updatedAt: "2026-07-27T14:25:00.000Z",
    },
  ],

  editor: {
    createEyebrow: "New Note",
    createTitle: "Create a new note",
    createDescription:
      "Add a clear title, select a category and write your note.",

    editEyebrow: "Edit Note",
    editTitle: "Update your note",
    editDescription:
      "Make changes to your note and save the updated version.",

    fields: {
      title: {
        label: "Note Title",
        name: "title",
        placeholder: "Enter a descriptive note title",
      },
      category: {
        label: "Category",
        name: "category",
      },
      content: {
        label: "Note Content",
        name: "content",
        placeholder: "Write your note here...",
      },
      pinned: {
        label: "Pin this note",
        name: "isPinned",
      },
    },

    saveButton: "Save Note",
    updateButton: "Update Note",
    cancelButton: "Cancel",
  },

  card: {
    pinnedLabel: "Pinned",
    editLabel: "Edit",
    deleteLabel: "Delete",
    pinLabel: "Pin note",
    unpinLabel: "Unpin note",
    updatedPrefix: "Updated",
  },

  emptyState: {
    icon: FilePlus2,
    title: "No notes found",
    description:
      "Create a new note or change your filters to find existing notes.",
    button: "Create Your First Note",
  },

  deleteConfirmation: {
    message:
      "Are you sure you want to delete this note? This action cannot be undone.",
  },

  validation: {
    titleRequired: "Note title is required.",
    titleMinimum: "Title must contain at least 3 characters.",
    categoryRequired: "Please select a category.",
    contentRequired: "Note content is required.",
    contentMinimum: "Note content must contain at least 10 characters.",
  },

  icons: {
    defaultNote: BookOpen,
  },
};