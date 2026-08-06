import {
  Bell,
  Download,
  Globe,
  MonitorCog,
  Palette,
  Settings as SettingsIcon,
  ShieldCheck,
  Trash2,
  UserCog,
} from "lucide-react";

export const settingsContent = {
  header: {
    icon: SettingsIcon,
    eyebrow: "Settings",
    title: "Application Settings",
    description:
      "Manage your account preferences, security, privacy and application settings.",
  },

  menu: [
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "language", label: "Language", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: ShieldCheck },
    { id: "security", label: "Security", icon: MonitorCog },
    { id: "account", label: "Account", icon: UserCog },
    { id: "export", label: "Export Data", icon: Download },
    { id: "danger", label: "Danger Zone", icon: Trash2 },
  ],

  defaults: {
    activeSection: "appearance",
  },

  status: {
    enabled: "Enabled",
    disabled: "Disabled",
    saveSuccess: "Settings saved successfully.",
    saveError: "Unable to save settings.",
    deleteSuccess: "Account deletion request confirmed.",
    deleteError: "Unable to delete account.",
  },

  initialSettings: {
    appearance: {
      theme: "system",
      accent: "blue",
      animations: true,
      compactMode: false,
      reduceMotion: false,
    },
    language: {
      language: "english",
      timeFormat: "24-hour",
      timezone: "UTC",
    },
    notifications: {
      email: true,
      push: true,
      tasks: true,
      schedule: true,
      roadmap: true,
      weekly: false,
      marketing: false,
    },
    privacy: {
      profile: true,
      email: false,
      phone: false,
      search: true,
      activity: true,
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
      trustedDevices: true,
      autoLogout: false,
      passwordReminder: true,
    },
    account: {
      username: "malaikaazam",
      email: "malaika@example.com",
      defaultDashboard: "dashboard",
      autoSave: true,
      autoLogout: false,
    },
  },

  sections: {
    appearance: {
      eyebrow: "Appearance",
      title: "Customize Application Appearance",
      description: "Personalize how MindPlanAI looks and feels.",
      groups: {
        theme: {
          title: "Theme",
          key: "theme",
          options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
            { label: "System", value: "system" },
          ],
        },
        accent: {
          title: "Accent Color",
          key: "accent",
          options: [
            { label: "Blue", value: "blue" },
            { label: "Purple", value: "purple" },
            { label: "Green", value: "green" },
            { label: "Orange", value: "orange" },
          ],
        },
      },
      switches: [
        {
          key: "animations",
          label: "Enable Animations",
          description: "Use motion and transition effects across the app.",
        },
        {
          key: "compactMode",
          label: "Compact Mode",
          description: "Reduce spacing for denser dashboard screens.",
        },
        {
          key: "reduceMotion",
          label: "Reduce Motion",
          description: "Limit non-essential animations.",
        },
      ],
    },

    language: {
      eyebrow: "Language",
      title: "Regional Preferences",
      description: "Configure language, date, time and timezone.",
      fields: [
        {
          label: "Application Language",
          name: "language",
          options: [
            { label: "English", value: "english" },
            { label: "Urdu", value: "urdu" },
            { label: "Arabic", value: "arabic" },
          ],
        },
        {
          label: "Time Format",
          name: "timeFormat",
          options: [
            { label: "24 Hour", value: "24-hour" },
            { label: "12 Hour", value: "12-hour" },
          ],
        },
        {
          label: "Timezone",
          name: "timezone",
          options: [
            { label: "UTC", value: "UTC" },
            { label: "Asia/Karachi", value: "Asia/Karachi" },
            { label: "Asia/Dubai", value: "Asia/Dubai" },
            { label: "Europe/London", value: "Europe/London" },
            { label: "America/New_York", value: "America/New_York" },
          ],
        },
      ],
    },

    notifications: {
      eyebrow: "Notifications",
      title: "Notification Preferences",
      description: "Choose how you want to receive notifications.",
      switches: [
        {
          key: "email",
          label: "Email Notifications",
          description: "Receive important updates through email.",
        },
        {
          key: "push",
          label: "Push Notifications",
          description: "Browser push notifications.",
        },
        {
          key: "tasks",
          label: "Task Reminders",
          description: "Upcoming task reminders.",
        },
        {
          key: "schedule",
          label: "Schedule Reminders",
          description: "Meeting and schedule reminders.",
        },
        {
          key: "roadmap",
          label: "Roadmap Notifications",
          description: "Roadmap completion updates.",
        },
        {
          key: "weekly",
          label: "Weekly Summary",
          description: "Weekly productivity report.",
        },
        {
          key: "marketing",
          label: "Marketing Emails",
          description: "Receive product updates.",
        },
      ],
    },

    privacy: {
      eyebrow: "Privacy",
      title: "Privacy Settings",
      description: "Control what information other users can see.",
      switches: [
        {
          key: "profile",
          label: "Public Profile",
          description: "Allow others to view your public profile.",
        },
        {
          key: "email",
          label: "Show Email",
          description: "Display your email publicly.",
        },
        {
          key: "phone",
          label: "Show Phone",
          description: "Display your phone number.",
        },
        {
          key: "search",
          label: "Search Visibility",
          description: "Allow profile in search results.",
        },
        {
          key: "activity",
          label: "Activity Visibility",
          description: "Show recent activity.",
        },
      ],
    },

    security: {
      eyebrow: "Security",
      title: "Security Preferences",
      description: "Manage account security and login preferences.",
      switches: [
        {
          key: "twoFactor",
          label: "Two Factor Authentication",
          description:
            "Increase your account security using OTP verification.",
        },
        {
          key: "loginAlerts",
          label: "Login Alerts",
          description: "Receive alerts whenever a new login is detected.",
        },
        {
          key: "trustedDevices",
          label: "Trusted Devices",
          description:
            "Remember trusted devices after successful login.",
        },
        {
          key: "autoLogout",
          label: "Auto Logout",
          description: "Automatically logout after inactivity.",
        },
        {
          key: "passwordReminder",
          label: "Password Expiry Reminder",
          description: "Receive reminders to update your password.",
        },
      ],
      actions: {
        viewSessions: "View Active Sessions",
        logoutDevices: "Logout All Devices",
      },
    },

    account: {
      eyebrow: "Account",
      title: "Account Settings",
      description: "Manage your account preferences.",
      fields: {
        username: {
          label: "Username",
          name: "username",
          placeholder: "Enter your username",
        },
        email: {
          label: "Email",
          name: "email",
          type: "email",
          placeholder: "Enter your email",
        },
        defaultDashboard: {
          label: "Default Dashboard",
          name: "defaultDashboard",
          options: [
            { label: "Dashboard", value: "dashboard" },
            { label: "Notes", value: "notes" },
            { label: "Tasks", value: "tasks" },
          ],
        },
      },
      switches: [
        {
          key: "autoSave",
          label: "Auto Save",
          description: "Save edits automatically while working.",
        },
        {
          key: "autoLogout",
          label: "Auto Logout",
          description: "End sessions after inactivity.",
        },
      ],
      saveButton: "Save Changes",
      validation: {
        requiredUsername: "Username is required.",
        requiredEmail: "Email is required.",
        invalidEmail: "Enter a valid email address.",
      },
    },

    export: {
      eyebrow: "Export",
      title: "Export Your Data",
      description: "Download your information securely.",
      actions: [
        "Download Notes",
        "Download Tasks",
        "Download Schedule",
        "Download Roadmaps",
        "Download Profile",
        "Download Complete Data",
      ],
    },

    danger: {
      eyebrow: "Danger Zone",
      title: "Delete or Deactivate Account",
      description: "These actions are permanent.",
      deactivateButton: "Deactivate Account",
      deleteButton: "Delete Account",
      modal: {
        title: "Delete Account?",
        description:
          "This will permanently remove your account and all associated notes, tasks, schedules and roadmaps.",
        confirmLabel: "Delete Account",
        cancelLabel: "Cancel",
      },
    },
  },
};
