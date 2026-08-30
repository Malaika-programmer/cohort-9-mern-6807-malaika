import { useMemo, useState } from "react";

import { tasksContent } from "../../../Scripts/Contents/Dashboard/Tasks";

import {
  TaskEditor,
  TasksEmptyState,
  TasksFilters,
  TasksHeader,
  TasksList,
} from "./components";

import styles from "./TasksPage.module.css";

function TasksPage() {
  const [tasks, setTasks] = useState(tasksContent.initialTasks);

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortValue, setSortValue] = useState("updated-desc");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchValue
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
        statusFilter === "all" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        task.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });

    return [...matchingTasks].sort(
      (firstTask, secondTask) => {
        if (sortValue === "updated-asc") {
          return (
            new Date(firstTask.updatedAt) -
            new Date(secondTask.updatedAt)
          );
        }

        if (sortValue === "due-asc") {
          if (!firstTask.dueDate) return 1;
          if (!secondTask.dueDate) return -1;

          return (
            new Date(firstTask.dueDate) -
            new Date(secondTask.dueDate)
          );
        }

        if (sortValue === "due-desc") {
          if (!firstTask.dueDate) return 1;
          if (!secondTask.dueDate) return -1;

          return (
            new Date(secondTask.dueDate) -
            new Date(firstTask.dueDate)
          );
        }

        if (sortValue === "priority-desc") {
          const firstPriority =
            tasksContent.priorities[firstTask.priority]
              ?.rank ?? 0;

          const secondPriority =
            tasksContent.priorities[secondTask.priority]
              ?.rank ?? 0;

          return secondPriority - firstPriority;
        }

        if (sortValue === "title-asc") {
          return firstTask.title.localeCompare(
            secondTask.title,
          );
        }

        return (
          new Date(secondTask.updatedAt) -
          new Date(firstTask.updatedAt)
        );
      },
    );
  }, [
    tasks,
    searchValue,
    statusFilter,
    priorityFilter,
    categoryFilter,
    sortValue,
  ]);

  const openCreateEditor = () => {
    setSelectedTask(null);
    setIsEditorOpen(true);
  };

  const openEditEditor = (task) => {
    setSelectedTask(task);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setSelectedTask(null);
    setIsEditorOpen(false);
  };

  const handleSaveTask = (taskValues) => {
    const currentDate = new Date().toISOString();

    if (selectedTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === selectedTask.id
            ? {
                ...task,
                ...taskValues,
                updatedAt: currentDate,
              }
            : task,
        ),
      );

      /*
       * Backend:
       *
       * await tasksService.updateTask(
       *   selectedTask.id,
       *   taskValues
       * );
       */
    } else {
      const createdTask = {
        id: Date.now(),
        ...taskValues,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      setTasks((currentTasks) => [
        createdTask,
        ...currentTasks,
      ]);

      /*
       * Backend:
       *
       * await tasksService.createTask(taskValues);
       */
    }

    closeEditor();
  };

  const handleDeleteTask = (taskId) => {
    const confirmed = window.confirm(
      tasksContent.deleteConfirmation.message,
    );

    if (!confirmed) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId,
      ),
    );

    /*
     * Backend:
     *
     * await tasksService.deleteTask(taskId);
     */
  };

  const handleToggleComplete = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === "completed"
                  ? "todo"
                  : "completed",
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );

    /*
     * Backend:
     *
     * await tasksService.updateTaskStatus(
     *   taskId,
     *   nextStatus
     * );
     */
  };

  const clearFilters = () => {
    setSearchValue("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setCategoryFilter("all");
    setSortValue("updated-desc");
  };

  return (
    <main className={styles.tasksPage}>
      <TasksHeader
        tasks={tasks}
        onCreateTask={openCreateEditor}
      />

      <TasksFilters
        searchValue={searchValue}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        categoryFilter={categoryFilter}
        sortValue={sortValue}
        onSearchChange={setSearchValue}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onCategoryChange={setCategoryFilter}
        onSortChange={setSortValue}
        onClear={clearFilters}
      />

      {filteredTasks.length > 0 ? (
        <TasksList
          tasks={filteredTasks}
          onEdit={openEditEditor}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      ) : (
        <TasksEmptyState
          onCreateTask={openCreateEditor}
        />
      )}

      {isEditorOpen && (
        <TaskEditor
          key={selectedTask?.id ?? "create-task"}
          task={selectedTask}
          onSave={handleSaveTask}
          onCancel={closeEditor}
        />
      )}
    </main>
  );
}

export default TasksPage;
