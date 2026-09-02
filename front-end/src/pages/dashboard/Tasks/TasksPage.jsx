import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock3,
  Edit3,
  ListTodo,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { tasksService } from "../../../services/tasksService";
import styles from "./TasksPage.module.css";

const DEFAULT_FILTERS = {
  search: "",
  status: "all",
  priority: "all",
  category: "all",
  sort: "updated-desc",
};

const EMPTY_TASK = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  category: "general",
  dueDate: "",
};

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const PRIORITY_OPTIONS = [
  { value: "all", label: "All Priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "general", label: "General" },
  { value: "work", label: "Work" },
  { value: "study", label: "Study" },
  { value: "personal", label: "Personal" },
];

const SORT_OPTIONS = [
  { value: "updated-desc", label: "Recently Updated" },
  { value: "updated-asc", label: "Oldest Updated" },
  { value: "due-asc", label: "Due Date ↑" },
  { value: "due-desc", label: "Due Date ↓" },
  { value: "priority-desc", label: "Priority" },
  { value: "title-asc", label: "Title A-Z" },
];

function isTaskOverdue(task) {
  if (!task.dueDate || task.status === "completed") {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(`${task.dueDate}T00:00:00`) < today;
}

function normalizeTask(task) {
  return {
    ...task,
    title: String(task.title ?? ""),
    description: String(task.description ?? ""),
    status: task.status ?? "todo",
    priority: task.priority ?? "medium",
    category: task.category ?? "general",
    dueDate: task.dueDate ?? "",
  };
}

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskForm, setTaskForm] = useState(EMPTY_TASK);

  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await tasksService.getTasks();

        if (!isMounted) return;

        const data = response?.data ?? response ?? [];

        setTasks(
          Array.isArray(data)
            ? data.map(normalizeTask)
            : [],
        );
      } catch (err) {
        console.error("Failed to load tasks:", err);

        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load tasks.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateFilter = (name, value) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const filteredTasks = useMemo(() => {
    const normalizedSearch = filters.search
      .trim()
      .toLowerCase();

    const matchingTasks = tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        filters.status === "all" ||
        task.status === filters.status;

      const matchesPriority =
        filters.priority === "all" ||
        task.priority === filters.priority;

      const matchesCategory =
        filters.category === "all" ||
        task.category === filters.category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });

    return [...matchingTasks].sort((first, second) => {
      if (filters.sort === "updated-asc") {
        return (
          new Date(first.updatedAt) -
          new Date(second.updatedAt)
        );
      }

      if (filters.sort === "due-asc") {
        if (!first.dueDate) return 1;
        if (!second.dueDate) return -1;

        return (
          new Date(first.dueDate) -
          new Date(second.dueDate)
        );
      }

      if (filters.sort === "due-desc") {
        if (!first.dueDate) return 1;
        if (!second.dueDate) return -1;

        return (
          new Date(second.dueDate) -
          new Date(first.dueDate)
        );
      }

      if (filters.sort === "priority-desc") {
        const priorityRank = {
          low: 1,
          medium: 2,
          high: 3,
        };

        return (
          (priorityRank[second.priority] ?? 0) -
          (priorityRank[first.priority] ?? 0)
        );
      }

      if (filters.sort === "title-asc") {
        return first.title.localeCompare(second.title);
      }

      return (
        new Date(second.updatedAt) -
        new Date(first.updatedAt)
      );
    });
  }, [tasks, filters]);

  const stats = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter(
        (task) => task.status === "todo",
      ).length,
      inProgress: tasks.filter(
        (task) => task.status === "in_progress",
      ).length,
      completed: tasks.filter(
        (task) => task.status === "completed",
      ).length,
      overdue: tasks.filter(isTaskOverdue).length,
    }),
    [tasks],
  );

  const openCreateEditor = () => {
    setSelectedTask(null);
    setTaskForm(EMPTY_TASK);
    setIsEditorOpen(true);
  };

  const openEditEditor = (task) => {
    setSelectedTask(task);
    setTaskForm({
      title: task.title ?? "",
      description: task.description ?? "",
      status: task.status ?? "todo",
      priority: task.priority ?? "medium",
      category: task.category ?? "general",
      dueDate: task.dueDate ?? "",
    });
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    if (isSaving) return;

    setSelectedTask(null);
    setTaskForm(EMPTY_TASK);
    setIsEditorOpen(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setTaskForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSaveTask = async (event) => {
    event.preventDefault();

    if (!taskForm.title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      let response;

      if (selectedTask) {
        response = await tasksService.updateTask(
          selectedTask.id,
          taskForm,
        );
      } else {
        response = await tasksService.createTask(taskForm);
      }

      const savedTask = normalizeTask(
        response?.data ?? response,
      );

      if (selectedTask) {
        setTasks((current) =>
          current.map((task) =>
            task.id === selectedTask.id
              ? savedTask
              : task,
          ),
        );
      } else {
        setTasks((current) => [
          savedTask,
          ...current,
        ]);
      }

      closeEditor();
    } catch (err) {
      console.error("Failed to save task:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to save task.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      setError("");

      await tasksService.deleteTask(taskId);

      setTasks((current) =>
        current.filter((task) => task.id !== taskId),
      );
    } catch (err) {
      console.error("Failed to delete task:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to delete task.",
      );
    }
  };

  const handleToggleComplete = async (task) => {
    const nextStatus =
      task.status === "completed"
        ? "todo"
        : "completed";

    try {
      setError("");

      const response =
        await tasksService.updateTaskStatus(
          task.id,
          nextStatus,
        );

      const updatedTask = normalizeTask(
        response?.data ?? {
          ...task,
          status: nextStatus,
        },
      );

      setTasks((current) =>
        current.map((item) =>
          item.id === task.id
            ? updatedTask
            : item,
        ),
      );
    } catch (err) {
      console.error(
        "Failed to update task status:",
        err,
      );

      setError(
        err?.response?.data?.message ||
          "Unable to update task.",
      );
    }
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <main className={styles.tasksPage}>
      <section className={styles.header}>
        <div className={styles.headingRow}>
          <div>
            <span className={styles.eyebrow}>
              TASK MANAGEMENT
            </span>

            <h1>Tasks</h1>

            <p>
              Organize your work, track progress, and
              stay on top of your goals.
            </p>
          </div>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={openCreateEditor}
          >
            <Plus size={18} />
            Create Task
          </button>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <ListTodo size={22} />
            <div>
              <strong>{stats.all}</strong>
              <span>Total Tasks</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <Clock3 size={22} />
            <div>
              <strong>{stats.todo}</strong>
              <span>To Do</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <Clock3 size={22} />
            <div>
              <strong>{stats.inProgress}</strong>
              <span>In Progress</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <CheckCircle2 size={22} />
            <div>
              <strong>{stats.completed}</strong>
              <span>Completed</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <Calendar size={22} />
            <div>
              <strong>{stats.overdue}</strong>
              <span>Overdue</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.filters}>
        <div className={styles.searchBox}>
          <Search size={18} />

          <input
            type="search"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
          />
        </div>

        <div className={styles.selectGrid}>
          <select
            value={filters.status}
            onChange={(event) =>
              updateFilter("status", event.target.value)
            }
          >
            {STATUS_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.priority}
            onChange={(event) =>
              updateFilter(
                "priority",
                event.target.value,
              )
            }
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.category}
            onChange={(event) =>
              updateFilter(
                "category",
                event.target.value,
              )
            }
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.sort}
            onChange={(event) =>
              updateFilter("sort", event.target.value)
            }
          >
            {SORT_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className={styles.clearButton}
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </section>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {isLoading ? (
        <div className={styles.emptyState}>
          <div className={styles.spinner} />
          <h2>Loading tasks...</h2>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className={styles.emptyState}>
          <ListTodo size={42} />

          <h2>No tasks found</h2>

          <p>
            Create a new task or change your filters.
          </p>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={openCreateEditor}
          >
            <Plus size={18} />
            Create Task
          </button>
        </div>
      ) : (
        <section className={styles.taskGrid}>
          {filteredTasks.map((task) => (
            <article
              key={task.id}
              className={styles.taskCard}
            >
              <div className={styles.taskTop}>
                <div>
                  <span
                    className={`${styles.priority} ${styles[task.priority]}`}
                  >
                    {task.priority}
                  </span>

                  <h2>{task.title}</h2>
                </div>

                <button
                  type="button"
                  className={styles.completeButton}
                  aria-label="Toggle task completion"
                  onClick={() =>
                    handleToggleComplete(task)
                  }
                >
                  <Check
                    size={18}
                    className={
                      task.status === "completed"
                        ? styles.checked
                        : ""
                    }
                  />
                </button>
              </div>

              {task.description && (
                <p className={styles.description}>
                  {task.description}
                </p>
              )}

              <div className={styles.taskMeta}>
                <span>{task.category}</span>

                <span>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </span>
              </div>

              <div className={styles.taskStatus}>
                <span>
                  {task.status === "in_progress"
                    ? "In Progress"
                    : task.status === "completed"
                      ? "Completed"
                      : "To Do"}
                </span>
              </div>

              <div className={styles.taskActions}>
                <button
                  type="button"
                  onClick={() =>
                    openEditEditor(task)
                  }
                >
                  <Edit3 size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() =>
                    handleDeleteTask(task.id)
                  }
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {isEditorOpen && (
        <div
          className={styles.modalOverlay}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditor();
            }
          }}
        >
          <section className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.eyebrow}>
                  TASK
                </span>

                <h2>
                  {selectedTask
                    ? "Edit Task"
                    : "Create Task"}
                </h2>
              </div>

              <button
                type="button"
                className={styles.closeButton}
                onClick={closeEditor}
                disabled={isSaving}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTask}>
              <div className={styles.formGroup}>
                <label htmlFor="task-title">
                  Title
                </label>

                <input
                  id="task-title"
                  name="title"
                  value={taskForm.title}
                  onChange={handleFormChange}
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="task-description">
                  Description
                </label>

                <textarea
                  id="task-description"
                  name="description"
                  value={taskForm.description}
                  onChange={handleFormChange}
                  placeholder="Describe your task..."
                  rows={4}
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="task-status">
                    Status
                  </label>

                  <select
                    id="task-status"
                    name="status"
                    value={taskForm.status}
                    onChange={handleFormChange}
                  >
                    {STATUS_OPTIONS.filter(
                      (option) =>
                        option.value !== "all",
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="task-priority">
                    Priority
                  </label>

                  <select
                    id="task-priority"
                    name="priority"
                    value={taskForm.priority}
                    onChange={handleFormChange}
                  >
                    {PRIORITY_OPTIONS.filter(
                      (option) =>
                        option.value !== "all",
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="task-category">
                    Category
                  </label>

                  <select
                    id="task-category"
                    name="category"
                    value={taskForm.category}
                    onChange={handleFormChange}
                  >
                    {CATEGORY_OPTIONS.filter(
                      (option) =>
                        option.value !== "all",
                    ).map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="task-due-date">
                    Due Date
                  </label>

                  <input
                    id="task-due-date"
                    name="dueDate"
                    type="date"
                    value={taskForm.dueDate}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={closeEditor}
                  disabled={isSaving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={isSaving}
                >
                  {isSaving
                    ? "Saving..."
                    : selectedTask
                      ? "Update Task"
                      : "Create Task"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default TasksPage;