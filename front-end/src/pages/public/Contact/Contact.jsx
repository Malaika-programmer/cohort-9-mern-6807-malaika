import { useState } from "react";
import {
  BriefcaseBusiness,
  Camera,
  Clock,
  Code2,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import {
  Badge,
  Button,
  Card,
  IconBox,
  Input,
  SectionHeading,
  TextArea,
} from "../../../components/ui";

import styles from "./Contact.module.css";
import Heroimg from "../../../assets/images/contacther.webp"

const contactContent = {
  hero: {
    badge: "Contact Us",
    title: "Let's Build Something Amazing Together",
    description:
      "Have a question, feedback, or partnership idea? We'd love to hear from you. Our team is always ready to help.",
    image:Heroimg,
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

function Contact() {
  return (
    <main className={styles.contact}>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactFAQ />
      <ContactCTA />
    </main>
  );
}

/* =========================================================
   HERO
========================================================= */

function ContactHero() {
  const { hero } = contactContent;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <Badge>{hero.badge}</Badge>

          <SectionHeading
            title={hero.title}
            description={hero.description}
            align="left"
          />

          <div className={styles.heroActions}>
            <Button>Contact Us</Button>

            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        <div className={styles.heroImageWrapper}>
          <img
            src={hero.image}
            alt={hero.title}
            className={styles.heroImage}
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT INFORMATION
========================================================= */

function ContactInfo() {
  const { contactInfo, socials } = contactContent;

  return (
    <section className={styles.contactInfo}>
      <div className={styles.container}>
        <SectionHeading
          badge={contactInfo.badge}
          title={contactInfo.title}
          description={contactInfo.description}
        />

        <div className={styles.infoGrid}>
          {contactInfo.cards.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className={styles.infoCard}
              >
                <IconBox>
                  <Icon size={22} />
                </IconBox>

                <h3>{item.title}</h3>

                <p>{item.value}</p>
              </Card>
            );
          })}
        </div>

        <div className={styles.socials}>
          {socials.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.url}
                className={styles.social}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
              >
                <IconBox>
                  <Icon size={20} />
                </IconBox>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT FORM
========================================================= */

function ContactForm() {
  const { form } = contactContent;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      setStatus({ type: "success", message: data.message });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contactForm}>
      <div className={styles.formContainer}>
        <SectionHeading
          badge={form.badge}
          title={form.title}
          description={form.description}
        />

        <Card className={styles.formCard}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            {status && (
              <div
                style={{
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  backgroundColor: status.type === "success" ? "#dcfce7" : "#fee2e2",
                  color: status.type === "success" ? "#166534" : "#991b1b",
                  fontSize: "0.9rem",
                }}
              >
                {status.message}
              </div>
            )}

            <Input
              label={form.fields.name}
              placeholder={form.fields.name}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label={form.fields.email}
              placeholder={form.fields.email}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label={form.fields.subject}
              placeholder={form.fields.subject}
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />

            <TextArea
              label={form.fields.message}
              placeholder={form.fields.message}
              rows={6}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : form.button}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ
========================================================= */

function ContactFAQ() {
  const { faq } = contactContent;

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <SectionHeading
          badge={faq.badge}
          title={faq.title}
          description={faq.description}
        />

        <div className={styles.faqGrid}>
          {faq.items.map((item) => (
            <Card
              key={item.question}
              className={styles.faqCard}
            >
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CTA
========================================================= */

function ContactCTA() {
  const { cta } = contactContent;

  return (
    <section className={styles.cta}>
      <div className={styles.ctaContainer}>
        <SectionHeading
          badge={cta.badge}
          title={cta.title}
          description={cta.description}
        />

        <div className={styles.ctaActions}>
          <Button>{cta.button}</Button>
        </div>
      </div>
    </section>
  );
}

export default Contact;