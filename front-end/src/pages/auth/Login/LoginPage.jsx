import styles from "./LoginPage.module.css";

import {
  LoginHero,
  LoginForm,
} from "./components";

function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <div className={styles.container}>
        <LoginHero />
        <LoginForm />
      </div>
    </main>
  );
}

export default LoginPage;