import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../services/task.service.js";

export async function createTaskController(req, res, next) {
  try {
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
    const taskId = Number(req.params.taskId);
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
    const taskId = Number(req.params.taskId);
    const result = await updateTask(req.user.id, taskId, req.body);

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized to update.",
      });
    }
    
    // We can fetch the updated task or just return success
    const updatedTask = await getTask(req.user.id, taskId);

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTaskStatusController(req, res, next) {
  try {
    const taskId = Number(req.params.taskId);
    const { status } = req.body;
    const result = await updateTaskStatus(req.user.id, taskId, status);

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized to update.",
      });
    }
    
    const updatedTask = await getTask(req.user.id, taskId);

    res.status(200).json({
      success: true,
      message: "Task status updated.",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTaskController(req, res, next) {
  try {
    const taskId = Number(req.params.taskId);
    const result = await deleteTask(req.user.id, taskId);

    if (result.count === 0) {
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
