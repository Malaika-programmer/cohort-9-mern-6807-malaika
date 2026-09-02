import prisma from "../config/database.js";

export async function getTasks(userId) {
  return await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTask(userId, taskId) {
  return await prisma.task.findFirst({
    where: { id: taskId, userId },
  });
}

export async function createTask(userId, data) {
  const formattedData = { ...data };
  if (formattedData.dueDate) {
    formattedData.dueDate = new Date(formattedData.dueDate).toISOString();
  }
  return await prisma.task.create({
    data: {
      ...formattedData,
      userId,
    },
  });
}

export async function updateTask(userId, taskId, data) {
  const formattedData = { ...data };
  if (formattedData.dueDate) {
    formattedData.dueDate = new Date(formattedData.dueDate).toISOString();
  }
  return await prisma.task.updateMany({
    where: { id: taskId, userId },
    data: formattedData,
  });
}

export async function updateTaskStatus(userId, taskId, status) {
  return await prisma.task.updateMany({
    where: { id: taskId, userId },
    data: { status },
  });
}

export async function deleteTask(userId, taskId) {
  return await prisma.task.deleteMany({
    where: { id: taskId, userId },
  });
}
