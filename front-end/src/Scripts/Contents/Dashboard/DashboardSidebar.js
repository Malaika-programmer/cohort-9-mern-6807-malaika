import {
  Bell,
  BrainCircuit,
  CalendarDays,
  ChartNoAxesCombined,
  FileText,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";

export const dashboardSidebarContent = {
  brand: {
    name: "MindPlanAI",
    shortName: "MP",
    homePath: "/dashboard",
  },

  navigation: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      id: "notes",
      label: "Notes",
      path: "/dashboard/notes",
      icon: FileText,
    },
    {
      id: "tasks",
      label: "Tasks",
      path: "/dashboard/tasks",
      icon: ListTodo,
    },
    {
      id: "schedule",
      label: "Schedule",
      path: "/dashboard/schedule",
      icon: CalendarDays,
    },
    {
      id: "roadmaps",
      label: "AI Roadmaps",
      path: "/dashboard/roadmaps",
      icon: BrainCircuit,
    },
    {
      id: "progress",
      label: "Progress",
      path: "/dashboard/progress",
      icon: ChartNoAxesCombined,
    },
    {
      id: "notifications",
      label: "Notifications",
      path: "/dashboard/notifications",
      icon: Bell,
    },
  ],

  accountNavigation: [
    {
      id: "profile",
      label: "Profile",
      path: "/dashboard/profile",
      icon: UserRound,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ],

  logout: {
    label: "Log Out",
    icon: LogOut,
  },

  user: {
    name: "Malaika Azam",
    email: "malaika@example.com",
    initials: "MA",
  },

  topbar: {
    searchPlaceholder: "Search notes, tasks or roadmaps",
    notificationLabel: "Open notifications",
    menuLabel: "Open dashboard menu",
    closeMenuLabel: "Close dashboard menu",
  },
};