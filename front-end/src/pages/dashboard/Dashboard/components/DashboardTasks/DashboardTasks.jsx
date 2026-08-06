import { useNavigate } from "react-router-dom";
import { CheckCircle2, Circle } from "lucide-react";

import { dashboardContent } from "../../../../../Scripts/Contents/Dashboard/Dashboard";
import {
  Badge,
  Button,
  Card,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./DashboardTasks.module.css";

function DashboardTasks() {
  const navigate = useNavigate();
  const { tasks } = dashboardContent;

  return (
    <section>
      <div className={styles.headingRow}>
        <SectionHeading
          eyebrow={tasks.heading.eyebrow}
          title={tasks.heading.title}
          description={tasks.heading.description}
          align="left"
        />

        <Button
          variant="ghost"
          size="small"
          icon={tasks.viewAll.icon}
          iconPosition="right"
          onClick={() =>
            navigate(tasks.viewAll.path)
          }
        >
          {tasks.viewAll.label}
        </Button>
      </div>

      <Card className={styles.taskContainer}>
        {tasks.items.map((task) => (
          <button
            type="button"
            key={task.id}
            className={styles.task}
            onClick={() => navigate(tasks.viewAll.path)}
          >
            <span
              className={[
                styles.statusIcon,
                task.completed ? styles.completed : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {task.completed ? (
                <CheckCircle2 aria-hidden="true" />
              ) : (
                <Circle aria-hidden="true" />
              )}
            </span>

            <div className={styles.taskContent}>
              <strong
                className={
                  task.completed
                    ? styles.completedText
                    : ""
                }
              >
                {task.title}
              </strong>

              <span>{task.dueDate}</span>
            </div>

            <Badge variant={task.priorityVariant}>
              {task.priority}
            </Badge>
          </button>
        ))}
      </Card>
    </section>
  );
}

export default DashboardTasks;
