import { useNavigate } from "react-router-dom";

import { dashboardContent } from "../../../../../Scripts/Contents/Dashboard/Dashboard";
import {
  Badge,
  Button,
  Card,
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./DashboardRecentNotes.module.css";

function DashboardRecentNotes() {
  const navigate = useNavigate();
  const { recentNotes } = dashboardContent;

  return (
    <section>
      <div className={styles.headingRow}>
        <SectionHeading
          eyebrow={recentNotes.heading.eyebrow}
          title={recentNotes.heading.title}
          description={recentNotes.heading.description}
          align="left"
        />

        <Button
          variant="ghost"
          size="small"
          icon={recentNotes.viewAll.icon}
          iconPosition="right"
          onClick={() =>
            navigate(recentNotes.viewAll.path)
          }
        >
          {recentNotes.viewAll.label}
        </Button>
      </div>

      <div className={styles.list}>
        {recentNotes.items.map((note) => (
          <Card
            key={note.id}
            className={styles.noteCard}
            onClick={() =>
              navigate(recentNotes.viewAll.path)
            }
          >
            <IconBox
              icon={note.icon}
              size="medium"
              variant="primary"
              animated={false}
            />

            <div className={styles.noteContent}>
              <div className={styles.noteTop}>
                <h3>{note.title}</h3>

                <Badge variant="light">
                  {note.category}
                </Badge>
              </div>

              <p>{note.excerpt}</p>
              <span>{note.updatedAt}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default DashboardRecentNotes;
