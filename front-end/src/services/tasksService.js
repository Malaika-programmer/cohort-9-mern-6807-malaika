import apiClient from "./apiClient";

export const tasksService = {
  async getTasks() {
    const response = await apiClient.get("/tasks");
    return response.data;
  },

  async getTask(taskId) {
    const response = await apiClient.get(`/tasks/${taskId}`);
    return response.data;
  },

  async createTask(taskData) {
    const response = await apiClient.post("/tasks", taskData);
    return response.data;
  },

  async updateTask(taskId, taskData) {
    const response = await apiClient.put(
      `/tasks/${taskId}`,
      taskData,
    );

    return response.data;
  },

  async updateTaskStatus(taskId, status) {
    const response = await apiClient.patch(
      `/tasks/${taskId}/status`,
      { status },
    );

    return response.data;
  },

  async deleteTask(taskId) {
    const response = await apiClient.delete(
      `/tasks/${taskId}`,
    );

    return response.data;
  },
};