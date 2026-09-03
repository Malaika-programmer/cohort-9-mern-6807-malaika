import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../services/tasks.service.js";

import {
  validateTask,
  validateTaskStatus,
} from "../validators/tasks.validation.js";

function getTaskId(req, res) {
  const taskId = Number(req.params.id);

  if (Number.isNaN(taskId)) {
    res.status(400).json({
      success: false,
      message: "Invalid task ID.",
    });

    return null;
  }

  return taskId;
}

export async function createTaskController(req, res, next) {
  try {
    const validationError = validateTask(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const task = await createTask(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTasksController(req, res, next) {
  try {
    const tasks = await getTasks(req.user.id);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTaskController(req, res, next) {
  try {
    const taskId = getTaskId(req, res);

    if (!taskId) return;

    const task = await getTask(req.user.id, taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTaskController(req, res, next) {
  try {
    const taskId = getTaskId(req, res);

    if (!taskId) return;

    const validationError = validateTask(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const task = await updateTask(req.user.id, taskId, req.body);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTaskStatusController(req, res, next) {
  try {
    const taskId = getTaskId(req, res);

    if (!taskId) return;

    const validationError = validateTaskStatus(req.body.status);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const task = await updateTaskStatus(
      req.user.id,
      taskId,
      req.body.status,
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTaskController(req, res, next) {
  try {
    const taskId = getTaskId(req, res);

    if (!taskId) return;

    const task = await deleteTask(req.user.id, taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}
