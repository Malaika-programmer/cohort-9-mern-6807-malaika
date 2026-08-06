import {
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  Circle,
  Clock3,
  Code2,
  Database,
  FileCode2,
  Flag,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Network,
  Play,
  Rocket,
  Save,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  Wrench,
} from "lucide-react";

export const roadmapsContent = {
  header: {
    eyebrow: "AI Learning Roadmaps",
    title: "Learn Any Topic Step by Step",
    description:
      "Enter a topic and generate a structured learning roadmap from beginner foundations to advanced practical skills.",
  },

  generator: {
    label: "What do you want to learn?",
    name: "topic",
    placeholder:
      "For example: Artificial Intelligence, React.js or Cyber Security",
    icon: Search,

    button: "Generate Roadmap",
    generatingButton: "Generating Roadmap...",

    examplesLabel: "Popular topics",
    examples: [
      "Artificial Intelligence",
      "React.js",
      "Node.js",
      "Cyber Security",
      "Data Science",
    ],
  },

  validation: {
    topicRequired: "Please enter a topic.",
    topicMinimum:
      "Topic must contain at least 3 characters.",
    topicMaximum:
      "Topic cannot exceed 100 characters.",
  },

  generation: {
    loadingTitle: "Creating your roadmap",
    loadingDescription:
      "MindPlanAI is organising the topic into beginner, intermediate and advanced learning stages.",

    errorMessage:
      "Unable to generate the roadmap. Please try again.",
  },

  overview: {
    progressLabel: "Overall Progress",
    completedLabel: "topics completed",
    saveButton: "Save Roadmap",
    savedButton: "Roadmap Saved",
    regenerateButton: "Regenerate",
    deleteButton: "Delete Roadmap",
    continueButton: "Continue Learning",
  },

  levels: {
    beginner: {
      label: "Beginner",
      badge: "Start Here",
      description:
        "Build the fundamental knowledge and skills required for the topic.",
      icon: GraduationCap,
      variant: "success",
    },

    intermediate: {
      label: "Intermediate",
      badge: "Build Skills",
      description:
        "Apply the foundations through practical concepts and projects.",
      icon: Wrench,
      variant: "warning",
    },

    advanced: {
      label: "Advanced",
      badge: "Mastery",
      description:
        "Study advanced concepts, architecture and real-world implementation.",
      icon: Rocket,
      variant: "danger",
    },
  },

  module: {
    topicsLabel: "Topics",
    practiceLabel: "Practice Tasks",
    milestoneLabel: "Milestone",
    completedLabel: "Completed",
    markCompleteLabel: "Mark topic complete",
    markIncompleteLabel: "Mark topic incomplete",
  },

  saved: {
    eyebrow: "Saved Roadmaps",
    title: "Continue Your Learning",
    description:
      "Open a saved roadmap and continue from your current progress.",

    openButton: "Open Roadmap",
    deleteButton: "Delete",
    emptyTitle: "No saved roadmaps",
    emptyDescription:
      "Generate and save a roadmap to continue learning later.",
  },

  emptyState: {
    icon: BrainCircuit,
    title: "Generate Your First AI Roadmap",
    description:
      "Enter any learning topic and MindPlanAI will organise it into beginner, intermediate and advanced stages.",
  },

  deleteConfirmation: {
    message:
      "Are you sure you want to delete this roadmap? Your progress will also be removed.",
  },

  icons: {
    roadmap: BrainCircuit,
    target: Target,
    duration: Clock3,
    modules: FolderKanban,
    completed: Trophy,
    save: Save,
    delete: Trash2,
    continue: Play,
  },

  mockTemplate: {
    beginnerModules: [
      {
        id: "foundations",
        title: "Core Foundations",
        description:
          "Understand the basic terminology, purpose and fundamental principles.",
        icon: Lightbulb,
        topics: [
          "Introduction and core terminology",
          "How the field works",
          "Common tools and technologies",
          "Basic setup and environment",
        ],
        practiceTasks: [
          "Write a short summary of the core concepts",
          "Set up the required development environment",
        ],
        milestone:
          "Explain the topic and its basic workflow in your own words.",
      },

      {
        id: "fundamentals",
        title: "Fundamental Skills",
        description:
          "Learn the essential skills required before building complete projects.",
        icon: BookOpenCheck,
        topics: [
          "Basic syntax and concepts",
          "Important patterns",
          "Common terminology",
          "Simple problem solving",
        ],
        practiceTasks: [
          "Complete small concept-based exercises",
          "Build one basic mini project",
        ],
        milestone:
          "Create a small working example using the fundamental concepts.",
      },
    ],

    intermediateModules: [
      {
        id: "applied-concepts",
        title: "Applied Concepts",
        description:
          "Combine the foundational concepts to solve realistic problems.",
        icon: Code2,
        topics: [
          "Intermediate concepts",
          "Data and state handling",
          "Error handling",
          "Reusable implementation patterns",
        ],
        practiceTasks: [
          "Build a medium-sized practical project",
          "Refactor the project into reusable modules",
        ],
        milestone:
          "Complete a project that uses multiple concepts together.",
      },

      {
        id: "tools-workflow",
        title: "Tools and Workflow",
        description:
          "Learn the supporting tools, testing process and professional workflow.",
        icon: Wrench,
        topics: [
          "Professional development tools",
          "Testing fundamentals",
          "Debugging techniques",
          "Version control workflow",
        ],
        practiceTasks: [
          "Write tests for a practical feature",
          "Use Git branches and meaningful commits",
        ],
        milestone:
          "Build, test and document a complete project module.",
      },

      {
        id: "integration",
        title: "System Integration",
        description:
          "Connect different parts of the system and manage real application flow.",
        icon: Network,
        topics: [
          "API or service integration",
          "Data persistence",
          "Authentication concepts",
          "Security fundamentals",
        ],
        practiceTasks: [
          "Connect a project with an external service",
          "Add secure data validation",
        ],
        milestone:
          "Create an integrated application with persistent data.",
      },
    ],

    advancedModules: [
      {
        id: "advanced-architecture",
        title: "Advanced Architecture",
        description:
          "Design scalable and maintainable systems using advanced patterns.",
        icon: FolderKanban,
        topics: [
          "System architecture",
          "Design patterns",
          "Performance optimisation",
          "Scalability principles",
        ],
        practiceTasks: [
          "Design the architecture of a production application",
          "Optimise a slow feature and document the results",
        ],
        milestone:
          "Present a scalable system design for a real-world application.",
      },

      {
        id: "security-deployment",
        title: "Security and Deployment",
        description:
          "Prepare applications for secure production deployment.",
        icon: ShieldCheck,
        topics: [
          "Advanced security practices",
          "Production configuration",
          "Deployment workflow",
          "Monitoring and logging",
        ],
        practiceTasks: [
          "Deploy a complete application",
          "Add logging and production error monitoring",
        ],
        milestone:
          "Deploy and monitor a secure production-ready project.",
      },

      {
        id: "mastery-project",
        title: "Mastery Project",
        description:
          "Apply everything through one complete portfolio-level project.",
        icon: Trophy,
        topics: [
          "Requirement analysis",
          "Architecture decisions",
          "Implementation and testing",
          "Documentation and presentation",
        ],
        practiceTasks: [
          "Build a complete capstone project",
          "Prepare technical documentation and a project demonstration",
        ],
        milestone:
          "Complete and present a production-quality capstone project.",
      },
    ],
  },
};

export const roadmapTopicEnhancements = {
  "artificial intelligence": {
    beginner: [
      "Python fundamentals",
      "Mathematics for AI",
      "Introduction to machine learning",
      "Data preparation",
    ],
    intermediate: [
      "Supervised and unsupervised learning",
      "Model training and evaluation",
      "Neural network fundamentals",
      "Feature engineering",
    ],
    advanced: [
      "Deep learning",
      "Natural language processing",
      "Computer vision",
      "Generative AI and AI agents",
    ],
  },

  "react.js": {
    beginner: [
      "JavaScript ES6 fundamentals",
      "React components and JSX",
      "Props and state",
      "Event handling",
    ],
    intermediate: [
      "Hooks",
      "Routing",
      "Form management",
      "API integration",
    ],
    advanced: [
      "Application architecture",
      "Performance optimisation",
      "Testing React applications",
      "Server-side rendering concepts",
    ],
  },

  "node.js": {
    beginner: [
      "JavaScript runtime concepts",
      "Node.js modules",
      "File system and events",
      "Building basic HTTP servers",
    ],
    intermediate: [
      "Express.js",
      "REST API design",
      "Database integration",
      "Authentication and validation",
    ],
    advanced: [
      "Clean backend architecture",
      "Caching and queues",
      "Security and performance",
      "Microservices fundamentals",
    ],
  },

  "data science": {
    beginner: [
      "Python for data science",
      "Statistics fundamentals",
      "NumPy and Pandas",
      "Data cleaning",
    ],
    intermediate: [
      "Exploratory data analysis",
      "Data visualisation",
      "Machine learning basics",
      "Model evaluation",
    ],
    advanced: [
      "Advanced machine learning",
      "Feature engineering",
      "Big data concepts",
      "Model deployment",
    ],
  },

  "cyber security": {
    beginner: [
      "Networking fundamentals",
      "Operating system basics",
      "Security terminology",
      "Common attack types",
    ],
    intermediate: [
      "Web application security",
      "Identity and access management",
      "Vulnerability assessment",
      "Security tools",
    ],
    advanced: [
      "Penetration testing",
      "Incident response",
      "Cloud security",
      "Security architecture",
    ],
  },
};