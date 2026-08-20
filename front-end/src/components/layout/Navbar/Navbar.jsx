import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";

import { Button } from "../../ui";
import { useAppPreferences } from "../../../contexts/AppPreferencesContext";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Features", path: "/features" },
  { label: "Pricing", path: "/pricing" },
  { label: "Blogs", path: "/blogs" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const lightLogo = "/assets/circlelogo.png";
const darkLogo = "/assets/darkcirclelogo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { effectiveTheme, setTheme } = useAppPreferences();

  const isDarkTheme = effectiveTheme === "dark";
  const logoSrc = isDarkTheme ? darkLogo : lightLogo;

  const closeMenu = () => setIsMenuOpen(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");

    if (favicon) {
      favicon.href = logoSrc;
      favicon.type = "image/png";
    }
  }, [logoSrc]);

  const getNavClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.activeLink : ""}`;

  const getMobileNavClass = ({ isActive }) =>
    `${styles.mobileLink} ${isActive ? styles.activeMobileLink : ""}`;

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link
          to="/"
          className={styles.logo}
          onClick={closeMenu}
          aria-label="MindPlanAI Home"
        >
          <span className={styles.logoIcon}>
            <img src={logoSrc} alt="" aria-hidden="true" />
          </span>

          <span className={styles.logoText}>
            MindPlan<span>AI</span>
          </span>
        </Link>

        <div className={styles.desktopMenu}>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={getNavClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={
                isDarkTheme
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              title={isDarkTheme ? "Light theme" : "Dark theme"}
            >
              {isDarkTheme ? (
                <Sun aria-hidden="true" />
              ) : (
                <Moon aria-hidden="true" />
              )}
            </button>

            <Link to="/login" className={styles.loginLink}>
              Login
            </Link>

            <Button as={Link} to="/signup" size="small">
              Get Started
            </Button>
          </div>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </button>

        <div
          id="mobile-navigation"
          className={`${styles.mobileMenu} ${
            isMenuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          <ul className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={closeMenu}
                  className={getMobileNavClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.mobileActions}>
            <button
              type="button"
              className={styles.mobileThemeToggle}
              onClick={toggleTheme}
            >
              {isDarkTheme ? (
                <Sun aria-hidden="true" />
              ) : (
                <Moon aria-hidden="true" />
              )}

              <span>
                {isDarkTheme ? "Light theme" : "Dark theme"}
              </span>
            </button>

            <Link
              to="/login"
              className={styles.mobileLogin}
              onClick={closeMenu}
            >
              Login
            </Link>

            <Button
              as={Link}
              to="/signup"
              fullWidth
              onClick={closeMenu}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;