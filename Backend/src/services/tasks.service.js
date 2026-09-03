import prisma from "../config/database.js";

function normalizeTaskData(taskData) {
  const data = {
    title: taskData.title.trim(),
    description: taskData.description?.trim() || "",
    status: taskData.status || "todo",
    priority: taskData.priority || "medium",
    category: taskData.category || "general",
    dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
  };

  return data;
}

export async function createTask(userId, taskData) {
  return prisma.task.create({
    data: {
      ...normalizeTaskData(taskData),
      userId,
    },
  });
}

export async function getTasks(userId) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getTask(userId, taskId) {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });
}

export async function updateTask(userId, taskId, taskData) {
  const task = await getTask(userId, taskId);

  if (!task) {
    return null;
  }

  return prisma.task.update({
    where: { id: taskId },
    data: normalizeTaskData(taskData),
  });
}

export async function updateTaskStatus(userId, taskId, status) {
  const task = await getTask(userId, taskId);

  if (!task) {
    return null;
  }

  return prisma.task.update({
    where: { id: taskId },
    data: { status },
  });
}

export async function deleteTask(userId, taskId) {
  const task = await getTask(userId, taskId);

  if (!task) {
    return null;
  }

  await prisma.task.delete({
    where: { id: taskId },
  });

  return task;
}
