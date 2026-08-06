import {
  ArrowLeft,
  KeyRound,
  Mail,
  ShieldCheck,
} from "lucide-react";

export const forgotPasswordContent = {
  page: {
    badge: "Account Recovery",
    title: "Forgot Your Password?",
    description:
      "Enter your email address and we will send you instructions to reset your password.",
  },

  form: {
    email: {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter your registered email",
      icon: Mail,
    },

    submitButton: "Send Reset Instructions",

    successMessage:
      "If an account exists for this email, reset instructions have been sent.",

    backToLogin: "Back to login",
  },

  security: {
    icon: ShieldCheck,
    title: "Secure account recovery",
    description:
      "For your protection, reset links expire after a limited time and can only be used once.",
  },

  illustration: {
    icon: KeyRound,
  },

  navigation: {
    icon: ArrowLeft,
  },
};