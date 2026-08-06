import styles from "./NotFoundPage.module.css";

import { NotFoundHero } from "./components";

function NotFoundPage() {
  return (
    <main className={styles.notFound}>
      <NotFoundHero />
    </main>
  );
}

export default NotFoundPage;