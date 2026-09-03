export function validateTask(data) {
  const { title, status, priority, category, dueDate } = data;

  if (!title || !title.trim()) {
    return "Task title is required.";
  }

  if (status && !["todo", "in_progress", "completed"].includes(status)) {
    return "Invalid task status.";
  }

  if (priority && !["low", "medium", "high"].includes(priority)) {
    return "Invalid task priority.";
  }

  if (category && !["general", "work", "study", "personal"].includes(category)) {
    return "Invalid task category.";
  }

  if (dueDate && Number.isNaN(Date.parse(dueDate))) {
    return "Invalid due date.";
  }

  return null;
}

export function validateTaskStatus(status) {
  if (!["todo", "in_progress", "completed"].includes(status)) {
    return "Invalid task status.";
  }

  return null;
}
