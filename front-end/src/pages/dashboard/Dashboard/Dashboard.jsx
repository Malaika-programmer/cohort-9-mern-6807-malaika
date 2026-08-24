import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Circle,
  FileText,
  ListTodo,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  Badge,
  Button,
  Card,
  IconBox,
  SectionHeading,
} from "../../../components/ui";

import styles from "./Dashboard.module.css";

const NOTES_API_URL = "http://localhost:5000/api/notes";

const dashboardContent = {
  welcome: {
    badge: "Personal Workspace",
    greeting: "Welcome back",
    description:
      "Organise your notes, manage your tasks and continue your learning journey from one intelligent workspace.",

    primaryAction: {
      label: "Create Note",
      path: "/dashboard/notes",
      icon: Plus,
    },

    secondaryAction: {
      label: "Generate Roadmap",
      path: "/dashboard/roadmaps/create",
      icon: Sparkles,
    },
  },

  stats: {
    heading: {
      eyebrow: "Overview",
      title: "Your productivity at a glance",
      description:
        "Track your notes, tasks, learning roadmaps and weekly progress.",
    },

    items: [
      {
        id: "notes",
        label: "Total Notes",
        detail: "Your saved notes",
        icon: FileText,
        variant: "primary",
      },
      {
        id: "tasks",
        label: "Pending Tasks",
        detail: "Tasks that need attention",
        icon: ListTodo,
        variant: "warning",
      },
      {
        id: "roadmaps",
        label: "Active Roadmaps",
        detail: "Learning paths in progress",
        icon: BrainCircuit,
        variant: "success",
      },
      {
        id: "progress",
        label: "Weekly Progress",
        detail: "Your progress this week",
        icon: TrendingUp,
        variant: "primary",
      },
    ],
  },

  recentNotes: {
    heading: {
      eyebrow: "Recent Notes",
      title: "Continue where you left off",
      description:
        "Review and update your most recently accessed notes.",
    },

    viewAll: {
      label: "View All Notes",
      path: "/dashboard/notes",
      icon: ArrowRight,
    },
  },

  tasks: {
    heading: {
      eyebrow: "Tasks",
      title: "Upcoming priorities",
      description:
        "Stay focused on the tasks that require your attention.",
    },

    viewAll: {
      label: "View All Tasks",
      path: "/dashboard/tasks",
      icon: ArrowRight,
    },

    /*
     * Temporary UI data.
     * Replace with Tasks API when Tasks module is built.
     */
    items: [
      {
        id: 1,
        title: "Complete dashboard frontend",
        dueDate: "Today",
        priority: "High",
        priorityVariant: "danger",
        completed: false,
      },
      {
        id: 2,
        title: "Review authentication validation",
        dueDate: "Tomorrow",
        priority: "Medium",
        priorityVariant: "warning",
        completed: false,
      },
      {
        id: 3,
        title: "Update project documentation",
        dueDate: "August 5",
        priority: "Low",
        priorityVariant: "success",
        completed: true,
      },
    ],
  },

  roadmap: {
    heading: {
      eyebrow: "Learning Roadmap",
      title: "Current learning progress",
      description:
        "Continue your active roadmap and complete the next recommended topic.",
    },

    /*
     * Temporary UI data.
     * Replace with Roadmap API when that module is built.
     */
    data: {
      icon: BrainCircuit,
      title: "Frontend Development",
      currentTopic: "React component architecture",
      completedTopics: 12,
      totalTopics: 18,
      progress: 67,
    },

    action: {
      label: "Continue Roadmap",
      path: "/dashboard/roadmaps",
      icon: ArrowRight,
    },
  },

  quickActions: {
    heading: {
      eyebrow: "Quick Actions",
      title: "Start something productive",
      description:
        "Access frequently used MindPlanAI tools directly.",
    },

    items: [
      {
        id: "create-note",
        title: "Create Note",
        description:
          "Capture a new idea or learning topic.",
        icon: FileText,
        path: "/dashboard/notes",
      },
      {
        id: "add-task",
        title: "Add Task",
        description:
          "Create and schedule a new task.",
        icon: ListTodo,
        path: "/dashboard/tasks",
      },
      {
        id: "schedule",
        title: "Plan Schedule",
        description:
          "Organise your upcoming activities.",
        icon: CalendarDays,
        path: "/dashboard/schedule",
      },
      {
        id: "roadmap",
        title: "Generate Roadmap",
        description:
          "Build a personalised AI learning path.",
        icon: Sparkles,
        path: "/dashboard/roadmaps/create",
      },
    ],
  },

  activity: {
    heading: {
      eyebrow: "Activity",
      title: "Recent account activity",
      description:
        "A summary of your latest productivity actions.",
    },
  },
};

function getToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("authToken")
  );
}

async function getNotes() {
  const token = getToken();

  const response = await fetch(NOTES_API_URL, {
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to load notes.",
    );
  }

  return data.data || [];
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

function DashboardPage() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesError, setNotesError] = useState("");

  const loadDashboardNotes = async () => {
    try {
      setNotesLoading(true);
      setNotesError("");

      const latestNotes = await getNotes();

      setNotes(latestNotes);
    } catch (error) {
      setNotesError(error.message);
    } finally {
      setNotesLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardNotes();
  }, []);

  const recentNotes = useMemo(() => {
    return [...notes]
      .sort(
        (firstNote, secondNote) =>
          new Date(secondNote.updatedAt) -
          new Date(firstNote.updatedAt),
      )
      .slice(0, 4);
  }, [notes]);

  const notesCreatedThisWeek = useMemo(() => {
    const lastWeek = new Date();

    lastWeek.setDate(lastWeek.getDate() - 7);

    return notes.filter(
      (note) =>
        new Date(note.createdAt) >= lastWeek,
    ).length;
  }, [notes]);

  const roadmap = dashboardContent.roadmap.data;

  return (
    <main className={styles.dashboardPage}>
      {/* Welcome */}
      <section className={styles.welcome}>
        <div className={styles.welcomeContent}>
          <Badge variant="primary">
            {dashboardContent.welcome.badge}
          </Badge>

          <h1>
            {dashboardContent.welcome.greeting}{" "}
            <span>User</span>
          </h1>

          <p>{dashboardContent.welcome.description}</p>

          <div className={styles.actions}>
            <Button
              icon={
                dashboardContent.welcome.primaryAction.icon
              }
              onClick={() =>
                navigate(
                  dashboardContent.welcome.primaryAction
                    .path,
                )
              }
            >
              {
                dashboardContent.welcome.primaryAction
                  .label
              }
            </Button>

            <Button
              variant="outline"
              icon={
                dashboardContent.welcome.secondaryAction
                  .icon
              }
              onClick={() =>
                navigate(
                  dashboardContent.welcome.secondaryAction
                    .path,
                )
              }
            >
              {
                dashboardContent.welcome.secondaryAction
                  .label
              }
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

      {/* Stats */}
      <section>
        <SectionHeading
          eyebrow={
            dashboardContent.stats.heading.eyebrow
          }
          title={
            dashboardContent.stats.heading.title
          }
          description={
            dashboardContent.stats.heading.description
          }
          align="left"
        />

        <div className={styles.statsGrid}>
          {dashboardContent.stats.items.map((item) => {
            let value = "--";
            let detail = item.detail;

            if (item.id === "notes") {
              value = notesLoading
                ? "..."
                : notes.length;

              detail = `${notesCreatedThisWeek} created this week`;
            }

            return (
              <Card
                key={item.id}
                className={styles.statCard}
              >
                <div className={styles.statHeader}>
                  <IconBox
                    icon={item.icon}
                    variant={item.variant}
                    size="medium"
                    animated={false}
                  />

                  <span>{item.label}</span>
                </div>

                <strong>{value}</strong>

                <small>{detail}</small>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Main Grid */}
      <div className={styles.primaryGrid}>
        {/* Recent Notes */}
        <section>
          <div className={styles.headingRow}>
            <SectionHeading
              eyebrow={
                dashboardContent.recentNotes.heading
                  .eyebrow
              }
              title={
                dashboardContent.recentNotes.heading
                  .title
              }
              description={
                dashboardContent.recentNotes.heading
                  .description
              }
              align="left"
            />

            <Button
              variant="ghost"
              size="small"
              icon={
                dashboardContent.recentNotes.viewAll.icon
              }
              iconPosition="right"
              onClick={() =>
                navigate(
                  dashboardContent.recentNotes.viewAll
                    .path,
                )
              }
            >
              {
                dashboardContent.recentNotes.viewAll
                  .label
              }
            </Button>
          </div>

          {notesLoading ? (
            <Card className={styles.loadingCard}>
              <span className={styles.spinner} />
              <p>Loading your recent notes...</p>
            </Card>
          ) : notesError ? (
            <Card className={styles.messageCard}>
              <IconBox
                icon={FileText}
                size="medium"
                variant="primary"
                animated={false}
              />

              <p>{notesError}</p>

              <Button
                variant="ghost"
                size="small"
                onClick={loadDashboardNotes}
              >
                Try Again
              </Button>
            </Card>
          ) : recentNotes.length === 0 ? (
            <Card className={styles.messageCard}>
              <IconBox
                icon={FileText}
                size="medium"
                variant="primary"
                animated={false}
              />

              <h3>No notes yet</h3>

              <p>
                Start by creating your first note.
              </p>

              <Button
                icon={Plus}
                size="small"
                onClick={() =>
                  navigate("/dashboard/notes")
                }
              >
                Create Note
              </Button>
            </Card>
          ) : (
            <div className={styles.notesList}>
              {recentNotes.map((note) => (
                <Card
                  key={note.id}
                  className={styles.noteCard}
                  onClick={() =>
                    navigate("/dashboard/notes")
                  }
                >
                  <IconBox
                    icon={FileText}
                    size="medium"
                    variant="primary"
                    animated={false}
                  />

                  <div className={styles.noteContent}>
                    <div className={styles.noteTop}>
                      <h3>{note.title}</h3>

                      <Badge variant="light">
                        Note
                      </Badge>
                    </div>

                    <p>{note.content}</p>

                    <span>
                      Updated{" "}
                      {formatDate(note.updatedAt)}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Tasks - temporary until Tasks API */}
        <section>
          <div className={styles.headingRow}>
            <SectionHeading
              eyebrow={
                dashboardContent.tasks.heading.eyebrow
              }
              title={
                dashboardContent.tasks.heading.title
              }
              description={
                dashboardContent.tasks.heading
                  .description
              }
              align="left"
            />

            <Button
              variant="ghost"
              size="small"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() =>
                navigate(
                  dashboardContent.tasks.viewAll.path,
                )
              }
            >
              {dashboardContent.tasks.viewAll.label}
            </Button>
          </div>

          <Card className={styles.taskContainer}>
            {dashboardContent.tasks.items.map(
              (task) => (
                <button
                  type="button"
                  key={task.id}
                  className={styles.task}
                  onClick={() =>
                    navigate(
                      dashboardContent.tasks.viewAll
                        .path,
                    )
                  }
                >
                  <span
                    className={[
                      styles.statusIcon,
                      task.completed
                        ? styles.completed
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {task.completed ? (
                      <CheckCircle2 />
                    ) : (
                      <Circle />
                    )}
                  </span>

                  <span className={styles.taskContent}>
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
                  </span>

                  <Badge variant={task.priorityVariant}>
                    {task.priority}
                  </Badge>
                </button>
              ),
            )}
          </Card>
        </section>
      </div>

      {/* Roadmap - temporary until Roadmap API */}
      <section>
        <SectionHeading
          eyebrow={
            dashboardContent.roadmap.heading.eyebrow
          }
          title={
            dashboardContent.roadmap.heading.title
          }
          description={
            dashboardContent.roadmap.heading
              .description
          }
          align="left"
        />

        <Card className={styles.roadmapCard}>
          <IconBox
            icon={roadmap.icon}
            size="large"
            variant="primary"
            animated={false}
          />

          <div className={styles.roadmapContent}>
            <span className={styles.roadmapLabel}>
              Active roadmap
            </span>

            <h3>{roadmap.title}</h3>

            <p>
              Next topic:{" "}
              <strong>
                {roadmap.currentTopic}
              </strong>
            </p>

            <div className={styles.progressInfo}>
              <span>
                {roadmap.completedTopics} of{" "}
                {roadmap.totalTopics} topics completed
              </span>

              <strong>{roadmap.progress}%</strong>
            </div>

            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={roadmap.progress}
              aria-label="Roadmap progress"
            >
              <span
                className={styles.progressValue}
                style={{
                  width: `${roadmap.progress}%`,
                }}
              />
            </div>
          </div>

          <Button
            icon={
              dashboardContent.roadmap.action.icon
            }
            iconPosition="right"
            onClick={() =>
              navigate(
                dashboardContent.roadmap.action.path,
              )
            }
          >
            {dashboardContent.roadmap.action.label}
          </Button>
        </Card>
      </section>
    </main>
  );
}

export default DashboardPage;