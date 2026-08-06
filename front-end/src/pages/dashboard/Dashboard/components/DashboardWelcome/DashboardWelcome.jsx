import { useNavigate } from "react-router-dom";

import { dashboardContent } from "../../../../../Scripts/Contents/Dashboard/Dashboard";
import {
  Badge,
  Button,
} from "../../../../../components/ui";

import styles from "./DashboardWelcome.module.css";

function DashboardWelcome() {
  const navigate = useNavigate();
  const { welcome } = dashboardContent;

  return (
    <section className={styles.welcome}>
      <div className={styles.content}>
        <Badge variant="primary">
          {welcome.badge}
        </Badge>

        <h1>
          {welcome.greeting},{" "}
          <span>{welcome.userName}</span>
        </h1>

        <p>{welcome.description}</p>

        <div className={styles.actions}>
          <Button
            icon={welcome.primaryAction.icon}
            onClick={() =>
              navigate(welcome.primaryAction.path)
            }
          >
            {welcome.primaryAction.label}
          </Button>

          <Button
            variant="outline"
            icon={welcome.secondaryAction.icon}
            onClick={() =>
              navigate(welcome.secondaryAction.path)
            }
          >
            {welcome.secondaryAction.label}
          </Button>
        </div>
      </div>

      <div
        className={styles.decoration}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

export default DashboardWelcome;