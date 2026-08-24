import express from "express";

import {
  createNoteController,
  getNotesController,
  getTrashedNotesController,
  getNoteController,
  updateNoteController,
  deleteNoteController,
  trashNoteController,
  restoreNoteController,
} from "../controllers/notes.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createNoteController);
router.get("/", getNotesController);
router.get("/trash", getTrashedNotesController);
router.get("/:id", getNoteController);
router.put("/:id", updateNoteController);
router.put("/:id/trash", trashNoteController);
router.put("/:id/restore", restoreNoteController);
router.delete("/:id", deleteNoteController);

export default router;