import prisma from "../config/database.js";

export async function createNote(userId, noteData) {
  const { title, content } = noteData;

  return prisma.note.create({
    data: {
      title: title.trim(),
      content: content.trim(),
      userId,
    },
  });
}

export async function getNotes(userId) {
  return prisma.note.findMany({
    where: {
      userId,
      isTrashed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getTrashedNotes(userId) {
  return prisma.note.findMany({
    where: {
      userId,
      isTrashed: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getNote(userId, noteId) {
  return prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
  });
}

export async function updateNote(userId, noteId, noteData) {
  const { title, content } = noteData;

  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
  });

  if (!note) {
    return null;
  }

  return prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      title: title.trim(),
      content: content.trim(),
    },
  });
}

export async function deleteNote(userId, noteId) {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
  });

  if (!note) {
    return null;
  }

  await prisma.note.delete({
    where: {
      id: noteId,
    },
  });

  return note;
}

export async function trashNote(userId, noteId) {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
      isTrashed: false,
    },
  });

  if (!note) {
    return null;
  }

  return prisma.note.update({
    where: { id: noteId },
    data: { isTrashed: true },
  });
}

export async function restoreNote(userId, noteId) {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
      isTrashed: true,
    },
  });

  if (!note) {
    return null;
  }

  return prisma.note.update({
    where: { id: noteId },
    data: { isTrashed: false },
  });
}