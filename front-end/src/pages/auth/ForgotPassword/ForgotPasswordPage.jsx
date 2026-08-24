import styles from "./ForgotPasswordPage.module.css";

import {
  ForgotPasswordForm,
  ForgotPasswordHero,
} from "./components";

function ForgotPasswordPage() {
  return (
    <main className={styles.forgotPasswordPage}>
      <div className={styles.container}>
        <ForgotPasswordHero />
        <ForgotPasswordForm />
      </div>
    </main>
  );
}

export default ForgotPasswordPage;