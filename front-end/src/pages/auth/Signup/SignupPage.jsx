import styles from "./SignupPage.module.css";

import {
  SignupHero,
  SignupForm,
} from "./components";

function SignupPage() {
  return (
    <main className={styles.signupPage}>
      <div className={styles.container}>
        <SignupHero />
        <SignupForm />
      </div>
    </main>
  );
}

export default SignupPage;