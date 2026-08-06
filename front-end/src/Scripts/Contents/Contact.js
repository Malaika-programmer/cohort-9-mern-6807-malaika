import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  BriefcaseBusiness,
  Camera,
  Code2,
  MessageCircle,
} from "lucide-react";

export const contactContent = {
  hero: {
    badge: "Contact Us",

    title: "Let's Build Something Amazing Together",

    description:
      "Have a question, feedback, or partnership idea? We'd love to hear from you. Our team is always ready to help.",

    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
  },

  contactInfo: {
    badge: "Get In Touch",

    title: "Contact Information",

    description:
      "Reach us through any of the following communication channels.",

    cards: [
      {
        icon: Phone,
        title: "Phone",
        value: "+92 300 1234567",
      },

      {
        icon: Mail,
        title: "Email",
        value: "support@mindplanai.com",
      },

      {
        icon: MapPin,
        title: "Address",
        value: "Islamabad, Pakistan",
      },

      {
        icon: Clock,
        title: "Working Hours",
        value: "Mon - Fri | 9:00 AM - 6:00 PM",
      },
    ],
  },

  form: {
    badge: "Send Message",

    title: "We're Here To Help",

    description:
      "Fill out the form below and we'll get back to you as soon as possible.",

    fields: {
      name: "Full Name",
      email: "Email Address",
      subject: "Subject",
      message: "Message",
    },

    button: "Send Message",
  },

  faq: {
    badge: "FAQs",

    title: "Frequently Asked Questions",

    description:
      "Some common questions our users ask before contacting us.",

    items: [
      {
        question: "How quickly do you reply?",
        answer:
          "Most inquiries receive a response within one business day.",
      },

      {
        question: "Do you offer technical support?",
        answer:
          "Yes. Our support team is available during business hours.",
      },

      {
        question: "Can I request a demo?",
        answer:
          "Absolutely. Contact us and we'll schedule a personalized demo.",
      },
    ],
  },

  cta: {
    badge: "Start Today",

    title: "Need More Information?",

    description:
      "Our team is always available to answer your questions and discuss your ideas.",

    button: "Contact Our Team",
  },

  socials: [
    {
      icon: Globe,
      name: "Facebook",
      url: "#",
    },

    {
      icon: BriefcaseBusiness,
      name: "LinkedIn",
      url: "#",
    },

    {
      icon: Camera,
      name: "Instagram",
      url: "#",
    },

    {
      icon: Code2,
      name: "GitHub",
      url: "#",
    },

    {
      icon: MessageCircle,
      name: "WhatsApp",
      url: "#",
    },
  ],
};
