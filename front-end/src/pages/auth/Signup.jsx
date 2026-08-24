import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import {
  Button,
  Card,
  IconBox,
  Input,
  SectionHeading,
} from "../../components/ui";

const signupContent = {
  badge: "Create Account",
  title: "Join MindPlanAI",
  description:
    "Create your account to generate smart notes, learning plans, quizzes and personalized roadmaps.",
};

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      navigate("/login");
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .signupPage {
          min-height: 100vh;
          padding: 4rem 1.5rem;
          background: var(--color-background);
        }

        .signupContainer {
          width: min(100%, 1120px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(420px, 480px);
          align-items: stretch;
          gap: 3rem;
        }

        .signupIntro {
          min-height: 520px;
          display: flex;
          align-items: center;
          padding: 3rem;
          background: var(--color-primary-light);
          border-radius: 1.5rem;
        }

        .signupIntroInner {
          width: 100%;
        }

        .signupHeading {
          margin-bottom: 2.5rem;
        }

        .securityNote {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .securityTitle {
          margin: 0;
          color: var(--color-heading);
          font-size: 1rem;
          font-weight: 700;
        }

        .securityText {
          margin: 0.25rem 0 0;
          color: var(--color-text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .signupCard {
          min-height: 520px;
          display: flex;
          align-items: center;
          padding: 2.5rem;
        }

        .signupForm {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .termsRow {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--color-text-muted);
          font-size: 0.875rem;
          line-height: 1.6;
          cursor: pointer;
        }

        .termsRow input {
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
          margin-top: 0.25rem;
          accent-color: var(--color-primary);
        }

        .termsLink,
        .loginLink {
          color: var(--color-primary);
          font-weight: 700;
          text-decoration: none;
        }

        .termsLink:hover,
        .loginLink:hover {
          text-decoration: underline;
        }

        .formError {
          margin: 0;
          padding: 0.75rem 1rem;
          color: #dc2626;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 0.625rem;
          font-size: 0.875rem;
        }

        .loginPrompt {
          margin: 0;
          color: var(--color-text-muted);
          font-size: 0.875rem;
          text-align: center;
        }

        @media (max-width: 900px) {
          .signupContainer {
            max-width: 560px;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .signupIntro,
          .signupCard {
            min-height: auto;
          }
        }

        @media (max-width: 560px) {
          .signupPage {
            padding: 2rem 1rem;
          }

          .signupIntro,
          .signupCard {
            padding: 1.5rem;
            border-radius: 1rem;
          }

          .securityNote {
            align-items: flex-start;
          }
        }
      `}</style>

      <main className="signupPage">
        <div className="signupContainer">
          <section className="signupIntro">
            <div className="signupIntroInner">
              <SectionHeading
                eyebrow={signupContent.badge}
                title={signupContent.title}
                description={signupContent.description}
                align="left"
                className="signupHeading"
              />

              <div className="securityNote">
                <IconBox>
                  <ShieldCheck size={22} />
                </IconBox>

                <div>
                  <h3 className="securityTitle">
                    Your information is secure
                  </h3>

                  <p className="securityText">
                    Your personal information is securely protected.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Card className="signupCard">
            <form
              className="signupForm"
              onSubmit={handleSubmit}
            >
              <Input
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                icon={User}
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email address"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                rightIcon={
                  showPassword ? (
                    <EyeOff
                      size={18}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <Eye
                      size={18}
                      onClick={() => setShowPassword(true)}
                    />
                  )
                }
                required
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                icon={Lock}
                value={formData.confirmPassword}
                onChange={handleChange}
                rightIcon={
                  showConfirmPassword ? (
                    <EyeOff
                      size={18}
                      onClick={() => setShowConfirmPassword(false)}
                    />
                  ) : (
                    <Eye
                      size={18}
                      onClick={() => setShowConfirmPassword(true)}
                    />
                  )
                }
                required
              />

              <label className="termsRow">
                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="termsLink"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="termsLink"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {error && (
                <p className="formError">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Create Account
              </Button>

              <p className="loginPrompt">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="loginLink"
                >
                  Log In
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
}

export default Signup;
