const allowedStatuses = [
  "todo",
  "in_progress",
  "completed",
];

const allowedPriorities = [
  "low",
  "medium",
  "high",
];

export function validateTaskBody(req, res, next) {
  const {
    title,
    description,
    status,
    priority,
    category,
    dueDate,
  } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Task title is required.",
    });
  }

  if (title.trim().length > 150) {
    return res.status(400).json({
      success: false,
      message: "Task title cannot exceed 150 characters.",
    });
  }

  if (
    status !== undefined &&
    !allowedStatuses.includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid task status.",
    });
  }

  if (
    priority !== undefined &&
    !allowedPriorities.includes(priority)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid task priority.",
    });
  }

  if (dueDate && Number.isNaN(Date.parse(dueDate))) {
    return res.status(400).json({
      success: false,
      message: "Invalid due date.",
    });
  }

  next();
}

export function validateTaskId(req, res, next) {
  const taskId = Number(req.params.taskId);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid task id.",
    });
  }

  next();
}

export function validateTaskStatus(req, res, next) {
  const { status } = req.body;

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task status.",
    });
  }

  next();
}