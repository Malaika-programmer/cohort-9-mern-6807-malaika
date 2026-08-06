import {
  AtSign,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  Code,
  ExternalLink,
  Globe2,
  KeyRound,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

export const profileContent = {
  header: {
    eyebrow: "Account Profile",

    title: "Manage Your Profile",

    description:
      "Update your personal information, professional details, skills, social links and account security.",
  },

  overview: {
    avatarFallback: "MA",

    changePhotoLabel: "Change Photo",

    removePhotoLabel: "Remove",

    photoHelpText:
      "Use a JPG, PNG or WebP image. Maximum file size: 2 MB.",

    memberSinceLabel: "Member Since",

    memberSince: "July 2026",

    accountStatusLabel: "Account Status",

    accountStatus: "Active",

    roleLabel: "Account Role",

    role: "User",

    completionLabel: "Profile Completion",

    completion: 82,
  },

  information: {
    eyebrow: "Personal Information",

    title: "Basic Details",

    description:
      "Keep your personal and professional profile information up to date.",

    fields: {
      fullName: {
        label: "Full Name",
        name: "fullName",
        type: "text",
        placeholder: "Enter your full name",
        icon: UserRound,
      },

      username: {
        label: "Username",
        name: "username",
        type: "text",
        placeholder: "Enter your username",
        icon: AtSign,
      },

      email: {
        label: "Email Address",
        name: "email",
        type: "email",
        placeholder: "Enter your email address",
        icon: Mail,
      },

      phone: {
        label: "Phone Number",
        name: "phone",
        type: "tel",
        placeholder: "Enter your phone number",
        icon: Phone,
      },

      occupation: {
        label: "Occupation",
        name: "occupation",
        type: "text",
        placeholder: "For example: Software Engineer",
        icon: BriefcaseBusiness,
      },

      location: {
        label: "Location",
        name: "location",
        type: "text",
        placeholder: "Enter your city and country",
        icon: MapPin,
      },

      dateOfBirth: {
        label: "Date of Birth",
        name: "dateOfBirth",
        type: "date",
        icon: CalendarDays,
      },

      website: {
        label: "Personal Website",
        name: "website",
        type: "url",
        placeholder: "https://example.com",
        icon: Globe2,
      },

      bio: {
        label: "Professional Bio",
        name: "bio",
        placeholder:
          "Write a short description about yourself, your skills and your professional goals.",
        maximumLength: 300,
      },
    },

    saveButton: "Save Profile",

    savingButton: "Saving Profile...",

    successMessage:
      "Your profile information has been updated successfully.",
  },

  skills: {
    eyebrow: "Skills",

    title: "Your Expertise",

    description:
      "Add the technologies, tools and professional skills that represent your experience.",

    inputLabel: "Add Skill",

    inputPlaceholder:
      "For example: React.js",

    addButton: "Add Skill",

    removeLabel: "Remove skill",

    maximumSkills: 15,

    maximumMessage:
      "You can add a maximum of 15 skills.",

    duplicateMessage:
      "This skill has already been added.",

    requiredMessage:
      "Enter a skill before adding it.",
  },

  socialLinks: {
    eyebrow: "Social Profiles",

    title: "Professional Links",

    description:
      "Add links to your professional profiles and portfolio.",

    fields: {
      linkedin: {
        label: "LinkedIn",
        name: "linkedin",
        placeholder:
          "https://linkedin.com/in/username",
        icon: BriefcaseBusiness,
      },

      github: {
        label: "GitHub",
        name: "github",
        placeholder:
          "https://github.com/username",
        icon: Code,
      },

      portfolio: {
        label: "Portfolio",
        name: "portfolio",
        placeholder:
          "https://yourportfolio.com",
        icon: Globe2,
      },
    },

    saveButton: "Save Social Links",

    successMessage:
      "Your social links have been updated.",
  },

  security: {
    eyebrow: "Account Security",

    title: "Change Password",

    description:
      "Use a strong and unique password to keep your MindPlanAI account secure.",

    icon: ShieldCheck,

    fields: {
      currentPassword: {
        label: "Current Password",
        name: "currentPassword",
        placeholder: "Enter your current password",
        icon: LockKeyhole,
      },

      newPassword: {
        label: "New Password",
        name: "newPassword",
        placeholder: "Create a new password",
        icon: KeyRound,
      },

      confirmPassword: {
        label: "Confirm New Password",
        name: "confirmPassword",
        placeholder: "Confirm your new password",
        icon: KeyRound,
      },
    },

    updateButton: "Update Password",

    updatingButton: "Updating Password...",

    successMessage:
      "Your password has been changed successfully.",

    passwordRules: [
      "At least 8 characters",
      "At least one uppercase letter",
      "At least one lowercase letter",
      "At least one number",
      "At least one special character",
    ],
  },

  dangerZone: {
    eyebrow: "Danger Zone",

    title: "Delete Account",

    description:
      "Permanently delete your MindPlanAI account and all associated notes, tasks, schedules and roadmaps.",

    warning:
      "This action is permanent and cannot be undone.",

    confirmationLabel:
      'Type "DELETE" to confirm account deletion.',

    confirmationText: "DELETE",

    inputPlaceholder: "Type DELETE",

    deleteButton: "Delete My Account",

    deletingButton: "Deleting Account...",

    icon: Trash2,
  },

  validation: {
    fullNameRequired:
      "Full name is required.",

    fullNameMinimum:
      "Full name must contain at least 3 characters.",

    usernameRequired:
      "Username is required.",

    usernameMinimum:
      "Username must contain at least 3 characters.",

    usernameInvalid:
      "Username can contain letters, numbers and underscores only.",

    emailRequired:
      "Email address is required.",

    emailInvalid:
      "Enter a valid email address.",

    phoneInvalid:
      "Enter a valid phone number.",

    websiteInvalid:
      "Enter a valid website URL.",

    bioMaximum:
      "Bio cannot exceed 300 characters.",

    urlInvalid:
      "Enter a valid URL.",

    currentPasswordRequired:
      "Current password is required.",

    newPasswordRequired:
      "New password is required.",

    passwordMinimum:
      "Password must contain at least 8 characters.",

    passwordUppercase:
      "Password must include an uppercase letter.",

    passwordLowercase:
      "Password must include a lowercase letter.",

    passwordNumber:
      "Password must include a number.",

    passwordSpecial:
      "Password must include a special character.",

    confirmPasswordRequired:
      "Please confirm your new password.",

    passwordMismatch:
      "Passwords do not match.",

    samePassword:
      "New password must be different from the current password.",

    imageType:
      "Upload a JPG, PNG or WebP image.",

    imageSize:
      "Profile image must be smaller than 2 MB.",
  },

  initialProfile: {
    fullName: "Malaika Azam",

    username: "malaikaazam",

    email: "malaika@example.com",

    phone: "+92 300 1234567",

    occupation: "Software Engineering Student",

    location: "Pakistan",

    dateOfBirth: "",

    website: "",

    bio:
      "Software engineering student interested in web development, artificial intelligence, automation and scalable software architecture.",

    avatar: "",

    skills: [
      "React.js",
      "JavaScript",
      "Node.js",
      "Flutter",
      "SQL",
      "Artificial Intelligence",
    ],

    socialLinks: {
      linkedin: "",
      github: "",
      portfolio: "",
    },
  },

  icons: {
    camera: Camera,
    save: Save,
    close: X,
    external: ExternalLink,
    success: CheckCircle2,
  },
};
