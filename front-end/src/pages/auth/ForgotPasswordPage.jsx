import { useState } from "react";
import { Link } from "react-router-dom";
import {
  KeyRound,
  ShieldCheck,
  Mail,
} from "lucide-react";

import {
  Button,
  Card,
  IconBox,
  Input,
  SectionHeading,
} from "../../components/ui";

const forgotPasswordContent = {
  page: {
    badge: "Forgot Password",
    title: "Reset Your Password",
    description:
      "Enter your email address and we will help you reset your password.",
  },

  form: {
    email: {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter your email address",
      icon: Mail,
    },

    submitButton: "Send Reset Link",
    backToLogin: "Back to Login",

    successMessage:
      "If an account exists with this email address, password reset instructions will be sent.",
  },

  illustration: {
    icon: KeyRound,
  },

  security: {
    icon: ShieldCheck,
    title: "Your account is secure",
    description:
      "Your password reset request is handled securely and your account information remains protected.",
  },

  navigation: {
    icon: KeyRound,
  },
};

const initialFormValues = {
  email: "",
};

function ForgotPassword() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { page, form, illustration, security, navigation } =
    forgotPasswordContent;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name] || errors.form) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
        form: "",
      }));
    }

    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  // Form validation
  const validateForm = () => {
    const validationErrors = {};
    const normalizedEmail = formValues.email.trim();

    if (!normalizedEmail) {
      validationErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      validationErrors.email = "Enter a valid email address.";
    }

    return validationErrors;
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  if (isSubmitting) {
    return;
  }

  const validationErrors = validateForm();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setIsSubmitted(false);
    return;
  }

  setIsSubmitting(true);
  setErrors({});

  try {
    const forgotPasswordPayload = {
      email: formValues.email.trim().toLowerCase(),
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgotPasswordPayload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to process your request."
      );
    }

    setIsSubmitted(true);
    setFormValues(initialFormValues);
  } catch (error) {
    setErrors({
      form:
        error?.message ||
        "Unable to process your request. Please try again.",
    });

    setIsSubmitted(false);
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <>
      <style>{`
        .forgot-password-page {
          display: flex;
          min-height: 100vh;
          align-items: center;
          padding: 100px 0;
          background: var(--color-surface-secondary, #f8fafc);
        }

        .forgot-password-container {
          display: grid;
          width: min(1100px, 92%);
          margin: 0 auto;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-items: stretch;
          gap: 3rem;
        }

        .forgot-password-hero {
          position: relative;
          display: flex;
          min-height: 100%;
          align-items: center;
          padding: 3rem;
          overflow: hidden;
          background:
            linear-gradient(
              145deg,
              var(--color-primary-light, #eef2ff),
              var(--color-surface, #ffffff)
            );
          border: 1px solid var(--color-border, #e5e7eb);
          border-radius: 1.5rem;
        }

        .forgot-password-hero::before,
        .forgot-password-hero::after {
          position: absolute;
          content: "";
          border-radius: 50%;
          pointer-events: none;
        }

        .forgot-password-hero::before {
          top: -7rem;
          right: -7rem;
          width: 18rem;
          height: 18rem;
          background: rgb(99 102 241 / 12%);
        }

        .forgot-password-hero::after {
          bottom: -6rem;
          left: -6rem;
          width: 15rem;
          height: 15rem;
          background: rgb(59 130 246 / 10%);
        }

        .forgot-password-content {
          position: relative;
          z-index: 1;
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.75rem;
        }

        .forgot-password-security {
          display: flex;
          width: 100%;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: var(
            --color-surface,
            #ffffff
          );
          border: 1px solid var(
            --color-border,
            #e5e7eb
          );
          border-radius: 1rem;
        }

        .forgot-password-security-content {
          flex: 1;
        }

        .forgot-password-security-content h2 {
          margin: 0;
          color: var(--color-heading, #111827);
          font-size: 1rem;
        }

        .forgot-password-security-content p {
          margin: 0.4rem 0 0;
          color: var(--color-text-secondary, #64748b);
          font-size: 0.88rem;
          line-height: 1.65;
        }

        .forgot-password-card {
          width: 100%;
          padding: 2rem;
        }

        .forgot-password-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .forgot-password-form-error,
        .forgot-password-success {
          padding: 0.9rem 1rem;
          font-size: 0.88rem;
          line-height: 1.6;
          border-radius: 0.8rem;
        }

        .forgot-password-form-error {
          color: #b91c1c;
          background: #fef2f2;
          border: 1px solid #fecaca;
        }

        .forgot-password-success {
          color: #166534;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
        }

        .forgot-password-back-link {
          display: inline-flex;
          align-self: center;
          align-items: center;
          gap: 0.65rem;
          color: var(
            --color-text-secondary,
            #64748b
          );
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .forgot-password-back-link:hover {
          color: var(--color-primary, #6366f1);
        }

        .forgot-password-back-link:focus-visible {
          outline: 3px solid rgb(99 102 241 / 25%);
          outline-offset: 4px;
          border-radius: 0.75rem;
        }

        @media (max-width: 900px) {
          .forgot-password-page {
            padding: 80px 0;
          }

          .forgot-password-container {
            grid-template-columns: 1fr;
          }

          .forgot-password-hero {
            min-height: auto;
            padding: 2.5rem;
          }
        }

        @media (max-width: 576px) {
          .forgot-password-hero {
            padding: 2rem 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .forgot-password-card {
            padding: 1.5rem 1.1rem;
          }
        }
      `}</style>

      <main className="forgot-password-page">
        <div className="forgot-password-container">

          {/* Forgot password introduction */}
          <section className="forgot-password-hero">
            <div className="forgot-password-content">
              <IconBox
                icon={illustration.icon}
                size="large"
                variant="primary"
                shape="rounded"
                animated={false}
              />

              <SectionHeading
                eyebrow={page.badge}
                title={page.title}
                description={page.description}
                align="left"
              />

              <div className="forgot-password-security">
                <IconBox
                  icon={security.icon}
                  size="small"
                  variant="success"
                  shape="rounded"
                  animated={false}
                />

                <div className="forgot-password-security-content">
                  <h2>{security.title}</h2>
                  <p>{security.description}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Forgot password form */}
          <Card className="forgot-password-card">
            <form
              className="forgot-password-form"
              onSubmit={handleSubmit}
              noValidate
            >
              {errors.form && (
                <div
                  className="forgot-password-form-error"
                  role="alert"
                >
                  {errors.form}
                </div>
              )}

              {isSubmitted && (
                <div
                  className="forgot-password-success"
                  role="status"
                  aria-live="polite"
                >
                  {form.successMessage}
                </div>
              )}

              <Input
                label={form.email.label}
                name={form.email.name}
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

              <Button
                type="submit"
                fullWidth
                loading={isSubmitting}
              >
                {form.submitButton}
              </Button>

              <Link
                to="/login"
                className="forgot-password-back-link"
              >
                <IconBox
                  icon={navigation.icon}
                  size="small"
                  variant="neutral"
                  shape="circle"
                  animated={false}
                />

                <span>{form.backToLogin}</span>
              </Link>
            </form>
          </Card>

        </div>
      </main>
    </>
  );
}

export default ForgotPassword;