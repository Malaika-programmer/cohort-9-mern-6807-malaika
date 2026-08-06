import {
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";

export const loginContent = {
  page: {
    badge: "Welcome Back",
    title: "Log In To MindPlanAI",
    description:
      "Access your notes, learning plans, AI tools and personalized workspace.",
  },

  form: {
    email: {
      label: "Email Address",
      placeholder: "Enter your email address",
      type: "email",
      icon: Mail,
    },

    password: {
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      icon: Lock,
      showIcon: Eye,
      hideIcon: EyeOff,
    },

    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    submitButton: "Log In",
    submitIcon: LogIn,
  },

  divider: "Or continue with",

  socialButtons: {
    google: "Continue with Google",
    github: "Continue with GitHub",
  },

  signup: {
    text: "Don't have an account?",
    linkText: "Create Account",
  },

  security: {
    icon: ShieldCheck,
    text: "Your account information is securely protected.",
  },
};