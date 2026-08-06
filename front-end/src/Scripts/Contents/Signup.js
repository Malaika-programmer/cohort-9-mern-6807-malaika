import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";

export const signupContent = {
  page: {
    badge: "Create Account",
    title: "Join MindPlanAI",
    description:
      "Create your account to generate smart notes, learning plans, quizzes and personalized roadmaps.",
  },

  form: {
    fullName: {
      label: "Full Name",
      name: "fullName",
      type: "text",
      placeholder: "Enter your full name",
      icon: User,
    },

    email: {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter your email address",
      icon: Mail,
    },

    password: {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Create a strong password",
      icon: Lock,
      showIcon: Eye,
      hideIcon: EyeOff,
    },

    confirmPassword: {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      icon: Lock,
      showIcon: Eye,
      hideIcon: EyeOff,
    },

    termsText: "I agree to the",
    termsLink: "Terms & Conditions",
    privacyLink: "Privacy Policy",

    submitButton: "Create Account",
    submitIcon: UserPlus,
  },

  divider: "Or sign up with",

  socialButtons: {
    google: "Continue with Google",
    github: "Continue with GitHub",
  },

  login: {
    text: "Already have an account?",
    linkText: "Log In",
  },

  security: {
    icon: ShieldCheck,
    text: "Your personal information is securely protected.",
  },
};