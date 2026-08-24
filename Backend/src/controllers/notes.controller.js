import {
  createNote,
  getNotes,
  getTrashedNotes,
  getNote,
  updateNote,
  deleteNote,
  trashNote,
  restoreNote,
} from "../services/notes.services.js";

import { validateNote } from "../validators/notes.validation.js";

export async function createNoteController(req, res, next) {
  try {
    const validationError = validateNote(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const note = await createNote(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Note created successfully.",
      data: note,
    });
  } catch (error) {
    next(error);
  }
}

export async function getNotesController(req, res, next) {
  try {
    const notes = await getNotes(req.user.id);

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
}

export async function getNoteController(req, res, next) {
  try {
    const noteId = Number(req.params.id);

    if (Number.isNaN(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID.",
      });
    }

    const note = await getNote(req.user.id, noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateNoteController(req, res, next) {
  try {
    const noteId = Number(req.params.id);

    if (Number.isNaN(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID.",
      });
    }

    const validationError = validateNote(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const note = await updateNote(
      req.user.id,
      noteId,
      req.body,
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      data: note,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTrashedNotesController(req, res, next) {
  try {
    const notes = await getTrashedNotes(req.user.id);

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
}

export async function trashNoteController(req, res, next) {
  try {
    const noteId = Number(req.params.id);

    if (Number.isNaN(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID.",
      });
    }

    const note = await trashNote(req.user.id, noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note moved to trash.",
      data: note,
    });
  } catch (error) {
    next(error);
  }
}

export async function restoreNoteController(req, res, next) {
  try {
    const noteId = Number(req.params.id);

    if (Number.isNaN(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID.",
      });
    }

    const note = await restoreNote(req.user.id, noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note restored.",
      data: note,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteNoteController(req, res, next) {
  try {
    const noteId = Number(req.params.id);

    if (Number.isNaN(noteId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID.",
      });
    }

    const note = await deleteNote(req.user.id, noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}