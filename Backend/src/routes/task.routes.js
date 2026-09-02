import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  createTaskController,
  getTasksController,
  getTaskController,
  updateTaskController,
  updateTaskStatusController,
  deleteTaskController,
} from "../controllers/task.controller.js";

import {
  validateTaskBody,
  validateTaskId,
  validateTaskStatus,
} from "../validators/task.validation.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateTaskBody, createTaskController);
router.get("/", getTasksController);

router.get("/:taskId", validateTaskId, getTaskController);
router.put("/:taskId", validateTaskId, validateTaskBody, updateTaskController);
router.patch("/:taskId/status", validateTaskId, validateTaskStatus, updateTaskStatusController);
router.delete("/:taskId", validateTaskId, deleteTaskController);

export default router;
