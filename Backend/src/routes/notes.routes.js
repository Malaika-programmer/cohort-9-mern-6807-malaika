import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  createNoteController,
  getNotesController,
  getTrashedNotesController,
  getNoteController,
  updateNoteController,
  trashNoteController,
  restoreNoteController,
  deleteNoteController,
} from "../controllers/notes.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createNoteController);
router.get("/", getNotesController);
router.get("/trash", getTrashedNotesController);
router.get("/trashed", getTrashedNotesController);

router.get("/:id", getNoteController);
router.put("/:id", updateNoteController);

// Trash routes (Support PATCH, PUT, POST, DELETE if called via /:id/trash)
router.patch("/:id/trash", trashNoteController);
router.put("/:id/trash", trashNoteController);
router.post("/:id/trash", trashNoteController);
router.delete("/:id/trash", trashNoteController);

// Restore routes
router.patch("/:id/restore", restoreNoteController);
router.put("/:id/restore", restoreNoteController);
router.post("/:id/restore", restoreNoteController);

// Permanent delete route
router.delete("/:id", deleteNoteController);

export default router;