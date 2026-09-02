import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";


import styles from "./Footer.module.css";

const footerLinks = {
  product: [
    { label: "Home", path: "/" },
    { label: "Blogs", path: "/blogs" },
  ],
  company: [
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms" },
  ],
  support: [
    { label: "Contact Support", path: "/contact" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Login", path: "/login" },
    { label: "Sign Up", path: "/signup" },
    { label: "Forgot Password", path: "/forgot-password" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    url: "https://facebook.com",
    icon: FacebookIcon,
    color: "#1877f2",
  },
  {
    label: "Instagram",
    url: "https://instagram.com",
    icon: InstagramIcon,
    color: "#e4405f",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com",
    icon: LinkedinIcon,
    color: "#0a66c2",
  },

  {
    label: "GitHub",
    url: "https://github.com",
    icon: GithubIcon,
    color: "#8b5cf6",
  },
];

function SocialIcon({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <SocialIcon {...props}>
      <path d="M15 8h-2a2 2 0 0 0-2 2v3" />
      <path d="M8 13h6" />
      <path d="M11 22v-9" />
      <path d="M18 2H6a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4Z" />
    </SocialIcon>
  );
}

function InstagramIcon(props) {
  return (
    <SocialIcon {...props}>
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </SocialIcon>
  );
}

function LinkedinIcon(props) {
  return (
    <SocialIcon {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </SocialIcon>
  );
}



function GithubIcon(props) {
  return (
    <SocialIcon {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3" />
      <path d="M15 22v-3.8a3.4 3.4 0 0 0-1-2.7c3.2-.4 6.5-1.6 6.5-7A5.4 5.4 0 0 0 19 4.8 5 5 0 0 0 18.9 1S17.7.6 15 2.5a13.4 13.4 0 0 0-7 0C5.3.6 4.1 1 4.1 1A5 5 0 0 0 4 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.3 6.6 6.5 7a3.4 3.4 0 0 0-1 2.7V22" />
    </SocialIcon>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();



  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlow} aria-hidden="true" />

      <div className={styles.container}>

        <div className={styles.footerGrid}>
          <div className={styles.brandColumn}>
            <Link
              to="/"
              className={styles.logo}
              aria-label="MindPlanAI Home"
            >
              <span className={styles.logoIcon}>
                <img
                  src="/assets/darkcirclelogo.png"
                  alt=""
                  aria-hidden="true"
                />
              </span>

              <span className={styles.logoText}>
                MindPlan<span>AI</span>
              </span>
            </Link>

            <p className={styles.brandDescription}>
              MindPlanAI helps you organize tasks, notes, goals and learning
              plans through intelligent productivity tools.
            </p>

            <div className={styles.contactList}>
              <a
                href="mailto:support@mindplanai.com"
                className={styles.contactItem}
              >
                <Mail aria-hidden="true" />
                <span>support@mindplanai.com</span>
              </a>

              <a
                href="tel:+923001234567"
                className={styles.contactItem}
              >
                <Phone aria-hidden="true" />
                <span>+92 300 1234567</span>
              </a>

              <div className={styles.contactItem}>
                <MapPin aria-hidden="true" />
                <span>Pakistan</span>
              </div>
            </div>
          </div>

          <FooterLinkColumn title="Product" links={footerLinks.product} />
          <FooterLinkColumn title="Company" links={footerLinks.company} />
          <FooterLinkColumn title="Support" links={footerLinks.support} />
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} MindPlanAI. All rights reserved.
          </p>

          <div className={styles.socialLinks}>
            {socialLinks.map(({ label, url, icon: Icon, color }) => (
              <a
                key={label}
                href={url}
                className={styles.socialLink}
                style={{ "--social-color": color }}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ title, links }) {
  return (
    <div className={styles.linkColumn}>
      <h3 className={styles.columnTitle}>{title}</h3>

      <ul className={styles.linkList}>
        {links.map(({ label, path }) => (
          <li key={path}>
            <Link to={path} className={styles.footerLink}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;