import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./SignupForm.module.css";

import { signupContent } from "../../../../../Scripts/Contents/Signup";

import {
  Button,
  Card,
  Input,
} from "../../../../../components/ui";

function SignupForm() {
  const { form, divider, socialButtons, login } = signupContent;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const PasswordIcon = showPassword
    ? form.password.hideIcon
    : form.password.showIcon;

  const ConfirmPasswordIcon = showConfirmPassword
    ? form.confirmPassword.hideIcon
    : form.confirmPassword.showIcon;

  return (
    <Card className={styles.card}>
      <form className={styles.form}>
        <Input
          label={form.fullName.label}
          name={form.fullName.name}
          type={form.fullName.type}
          placeholder={form.fullName.placeholder}
          icon={form.fullName.icon}
        />

        <Input
          label={form.email.label}
          name={form.email.name}
          type={form.email.type}
          placeholder={form.email.placeholder}
          icon={form.email.icon}
        />

        <Input
          label={form.password.label}
          name={form.password.name}
          type={showPassword ? "text" : "password"}
          placeholder={form.password.placeholder}
          icon={form.password.icon}
          rightIcon={
            <PasswordIcon
              size={18}
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />

        <Input
          label={form.confirmPassword.label}
          name={form.confirmPassword.name}
          type={showConfirmPassword ? "text" : "password"}
          placeholder={form.confirmPassword.placeholder}
          icon={form.confirmPassword.icon}
          rightIcon={
            <ConfirmPasswordIcon
              size={18}
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />
          }
        />

        <label className={styles.checkbox}>
          <input type="checkbox" />

          <span>
            {form.termsText}{" "}
            <Link to="/terms">
              {form.termsLink}
            </Link>{" "}
            &{" "}
            <Link to="/privacy-policy">
              {form.privacyLink}
            </Link>
          </span>
        </label>

        <Button type="submit">
          {form.submitButton}
        </Button>

        <div className={styles.divider}>
          <span>{divider}</span>
        </div>

        <Button variant="outline">
          {socialButtons.google}
        </Button>

        <Button variant="outline">
          {socialButtons.github}
        </Button>

        <p className={styles.login}>
          {login.text}{" "}
          <Link to="/login">
            {login.linkText}
          </Link>
        </p>
      </form>
    </Card>
  );
}

export default SignupForm;
