import express from "express";

import {
  createTaskController,
  getTasksController,
  getTaskController,
  updateTaskController,
  updateTaskStatusController,
  deleteTaskController,
} from "../controllers/tasks.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTaskController);
router.get("/", getTasksController);
router.get("/:id", getTaskController);
router.put("/:id", updateTaskController);
router.patch("/:id/status", updateTaskStatusController);
router.delete("/:id", deleteTaskController);

export default router;
