import styles from "./LoginHero.module.css";

import { loginContent } from "../../../../../Scripts/Contents/Login";
import {
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

function LoginHero() {
  const { page, security } = loginContent;
  const SecurityIcon = security.icon;

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <SectionHeading
          eyebrow={page.badge}
          title={page.title}
          description={page.description}
          align="left"
        />

        <div className={styles.security}>
          <IconBox
            icon={SecurityIcon}
            size="medium"
            variant="primary"
            animated={false}
          />

          <p>{security.text}</p>
        </div>
      </div>
    </section>
  );
}

export default LoginHero;