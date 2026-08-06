import styles from "./SignupHero.module.css";

import { signupContent } from "../../../../../Scripts/Contents/Signup";

import {
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

function SignupHero() {
  const { page, security } = signupContent;
  const SecurityIcon = security.icon;

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <SectionHeading
          badge={page.badge}
          title={page.title}
          description={page.description}
          align="left"
        />

        <div className={styles.security}>
          <IconBox>
            <SecurityIcon size={20} />
          </IconBox>

          <p>{security.text}</p>
        </div>
      </div>
    </section>
  );
}

export default SignupHero;