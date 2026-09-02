import { Compass } from "lucide-react";

import {
  Button,
  IconBox,
  SectionHeading,
} from "../../../components/ui";

import styles from "./NotFound.module.css";

const notFoundContent = {
  badge: "404 Error",

  title: "Oops! Page Not Found",

  description:
    "The page you are looking for doesn't exist or may have been moved. Let's help you get back on track.",

  primaryButton: "Go Home",

  secondaryButton: "Contact Support",
};

function NotFound() {
  const Icon = Compass;

  return (
    <main className={styles.notFound}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <IconBox size="xl">
            <Icon size={42} />
          </IconBox>

          <div className={styles.errorCode}>404</div>

          <SectionHeading
            badge={notFoundContent.badge}
            title={notFoundContent.title}
            description={notFoundContent.description}
          />

          <div className={styles.actions}>
            <Button>
              {notFoundContent.primaryButton}
            </Button>

            <Button variant="outline">
              {notFoundContent.secondaryButton}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;