import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button, Card, Input } from "../../components/ui";

const loginContent = {
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
    },

    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    submitButton: "Log In",
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

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

function Login() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { page, form, signup, security } = loginContent;

  const SecurityIcon = security.icon;

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (errors.form) {
      setErrors((prev) => ({
        ...prev,
        form: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formValues.email.trim(),
      )
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formValues.password) {
      newErrors.password = "Password is required.";
    } else if (formValues.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const loginPayload = {
        email: formValues.email.trim().toLowerCase(),
        password: formValues.password,
        rememberMe: formValues.rememberMe,
      };

      /*
       * Backend login API will be connected here.
       *
       * Example:
       * const response = await authService.login(loginPayload);
       */

      console.log("Login payload:", loginPayload);

      // Temporary navigation until the API is connected.
      // Remove this after the real login response is handled.
      // navigate("/dashboard");

    } catch (error) {
      setErrors({
        form:
          error?.response?.data?.message ||
          "Unable to log in. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .loginPage {
          min-height: 100vh;
          padding: 4rem 1.5rem;
          background: var(--color-background);
        }

        .loginContainer {
          width: min(100%, 1100px);
          min-height: 70vh;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 460px;
          align-items: center;
          gap: 5rem;
        }

        .loginHero {
          max-width: 500px;
        }

        .loginBadge {
          display: inline-flex;
          padding: 0.45rem 0.9rem;
          color: #4f46e5;
          background: #eef2ff;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .loginTitle {
          margin: 1rem 0 0;
          color: var(--color-heading);
          font-size: clamp(2rem, 4vw, 3.25rem);
          line-height: 1.1;
        }

        .loginDescription {
          max-width: 480px;
          margin-top: 1.25rem;
          color: var(--color-text-muted);
          line-height: 1.7;
        }

        .security {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2rem;
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }

        .securityIcon {
          display: grid;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          color: #4f46e5;
          background: #eef2ff;
          border-radius: 50%;
          place-items: center;
        }

        .loginCard {
          width: 100%;
        }

        .loginForm {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .formError {
          padding: 0.75rem 1rem;
          color: #dc2626;
          background: #fee2e2;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .formOptions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          font-size: 0.875rem;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-muted);
          cursor: pointer;
        }

        .remember input {
          width: 16px;
          height: 16px;
        }

        .forgotLink,
        .signupLink {
          color: var(--color-primary);
          font-weight: 600;
          text-decoration: none;
        }

        .forgotLink:hover,
        .signupLink:hover {
          text-decoration: underline;
        }

        .signup {
          margin: 0;
          color: var(--color-text-muted);
          font-size: 0.875rem;
          text-align: center;
        }

        .mobileIntro {
          display: none;
        }

        @media (max-width: 900px) {
          .loginContainer {
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 520px;
          }

          .loginHero {
            display: none;
          }

          .mobileIntro {
            display: block;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 520px) {
          .loginPage {
            padding: 2rem 1rem;
          }

          .formOptions {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <main className="loginPage">
        <div className="loginContainer">

          {/* Left side of the login page */}
          <section className="loginHero">
            <span className="loginBadge">
              {page.badge}
            </span>

            <h1 className="loginTitle">
              {page.title}
            </h1>

            <p className="loginDescription">
              {page.description}
            </p>

            <div className="security">
              <span className="securityIcon">
                <SecurityIcon size={20} />
              </span>

              <span>{security.text}</span>
            </div>
          </section>

          {/* Login form */}
          <section className="loginCard">
            <Card>
              <div className="mobileIntro">
                <span className="loginBadge">
                  {page.badge}
                </span>

                <h1 className="loginTitle">
                  {page.title}
                </h1>

                <p className="loginDescription">
                  {page.description}
                </p>
              </div>

              <form
                className="loginForm"
                onSubmit={handleSubmit}
                noValidate
              >
                {errors.form && (
                  <div
                    className="formError"
                    role="alert"
                  >
                    {errors.form}
                  </div>
                )}

                <Input
                  label={form.email.label}
                  name="email"
                  type={form.email.type}
                  value={formValues.email}
                  placeholder={form.email.placeholder}
                  icon={form.email.icon}
                  error={errors.email}
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  onChange={handleInputChange}
                />

                <Input
                  label={form.password.label}
                  name="password"
                  type={form.password.type}
                  value={formValues.password}
                  placeholder={form.password.placeholder}
                  icon={form.password.icon}
                  error={errors.password}
                  autoComplete="current-password"
                  required
                  disabled={isSubmitting}
                  onChange={handleInputChange}
                />

                <div className="formOptions">
                  <label className="remember">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formValues.rememberMe}
                      disabled={isSubmitting}
                      onChange={handleInputChange}
                    />

                    <span>{form.rememberMe}</span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="forgotLink"
                  >
                    {form.forgotPassword}
                  </Link>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  loading={isSubmitting}
                >
                  {form.submitButton}
                </Button>

                <p className="signup">
                  {signup.text}{" "}

                  <Link
                    to="/signup"
                    className="signupLink"
                  >
                    {signup.linkText}
                  </Link>
                </p>
              </form>
            </Card>
          </section>

        </div>
      </main>
    </>
  );
}

export default Login;