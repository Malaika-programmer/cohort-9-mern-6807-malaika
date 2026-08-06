import {
  BrainCircuit,
  CalendarDays,
  Clock,
  FileText,
  Lightbulb,
  ListChecks,
  Rocket,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

export const blogsContent = {
  hero: {
    badge: "MindPlanAI Blog",

    title: "Ideas To Help You Work And Learn Smarter",

    description:
      "Explore practical insights about productivity, artificial intelligence, planning, goal setting and personal growth.",

    primaryButton: "Explore Articles",

    secondaryButton: "Latest Posts",

    image:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&q=80",
  },

  featured: {
    badge: "Featured Article",

    title: "Editor's Pick",

    description:
      "Discover our featured guide for building better planning and productivity habits.",

    article: {
      id: 1,

      category: "Artificial Intelligence",

      title: "How AI Can Transform Your Daily Planning",

      excerpt:
        "Learn how artificial intelligence can help you organize tasks, prioritize goals and create smarter daily schedules.",

      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",

      author: "MindPlanAI Team",

      date: "July 28, 2026",

      readTime: "6 min read",

      button: "Read Article",

      icon: BrainCircuit,
    },
  },

  posts: {
    badge: "Latest Articles",

    title: "Explore Our Latest Insights",

    description:
      "Helpful guides and ideas designed to improve your productivity, learning and personal development.",

    categories: [
      "All",
      "Productivity",
      "Artificial Intelligence",
      "Learning",
      "Goal Setting",
    ],

    search: {
      icon: Search,
      placeholder: "Search articles",
    },

    items: [
      {
        id: 1,

        category: "Productivity",

        title: "7 Simple Ways To Improve Daily Productivity",

        excerpt:
          "Practical methods that can help you stay focused and complete your most important work.",

        image:
          "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80",

        author: "MindPlanAI Team",

        date: "July 25, 2026",

        readTime: "5 min read",

        icon: ListChecks,
      },

      {
        id: 2,

        category: "Artificial Intelligence",

        title: "Using AI To Build Smarter Learning Plans",

        excerpt:
          "Understand how AI-generated learning roadmaps can make complex subjects easier to study.",

        image:
          "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",

        author: "MindPlanAI Team",

        date: "July 22, 2026",

        readTime: "7 min read",

        icon: Sparkles,
      },

      {
        id: 3,

        category: "Goal Setting",

        title: "How To Turn Large Goals Into Small Actions",

        excerpt:
          "Break difficult goals into manageable steps and maintain steady progress.",

        image:
          "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=900&q=80",

        author: "MindPlanAI Team",

        date: "July 18, 2026",

        readTime: "4 min read",

        icon: Target,
      },

      {
        id: 4,

        category: "Learning",

        title: "Create A Learning Routine That Actually Works",

        excerpt:
          "Build a practical learning schedule that fits your daily responsibilities and energy levels.",

        image:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80",

        author: "MindPlanAI Team",

        date: "July 15, 2026",

        readTime: "6 min read",

        icon: FileText,
      },

      {
        id: 5,

        category: "Productivity",

        title: "Why Time Blocking Improves Focus",

        excerpt:
          "Learn how assigning dedicated time blocks can reduce distractions and improve concentration.",

        image:
          "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=900&q=80",

        author: "MindPlanAI Team",

        date: "July 10, 2026",

        readTime: "5 min read",

        icon: Clock,
      },

      {
        id: 6,

        category: "Personal Growth",

        title: "Build Better Habits Through Consistent Progress",

        excerpt:
          "Simple strategies for developing routines that support long-term personal growth.",

        image:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80",

        author: "MindPlanAI Team",

        date: "July 6, 2026",

        readTime: "5 min read",

        icon: Rocket,
      },
    ],

    loadMoreButton: "Load More Articles",
  },

  newsletter: {
    icon: Lightbulb,

    badge: "Stay Updated",

    title: "Get Smarter Ideas In Your Inbox",

    description:
      "Subscribe to receive productivity guides, AI insights and MindPlanAI updates.",

    emailPlaceholder: "Enter your email address",

    button: "Subscribe",

    privacyText:
      "By subscribing, you agree to receive helpful updates from MindPlanAI.",
  },

  cta: {
    icon: CalendarDays,

    badge: "Start Planning",

    title: "Turn These Ideas Into Action",

    description:
      "Use MindPlanAI to organize your goals, tasks and learning plans in one intelligent workspace.",

    primaryButton: "Get Started",

    secondaryButton: "Explore Features",
  },
};