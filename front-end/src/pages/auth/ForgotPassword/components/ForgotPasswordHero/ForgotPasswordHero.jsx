import styles from "./ForgotPasswordHero.module.css";

import { forgotPasswordContent } from "../../../../../Scripts/Contents/ForgotPassword";
import {
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

function ForgotPasswordHero() {
  const { page, security, illustration } = forgotPasswordContent;

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
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

        <div className={styles.security}>
          <IconBox
            icon={security.icon}
            size="small"
            variant="success"
            shape="rounded"
            animated={false}
          />

          <div className={styles.securityContent}>
            <h2>{security.title}</h2>
            <p>{security.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordHero;