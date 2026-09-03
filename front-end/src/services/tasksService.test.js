import { beforeEach, describe, expect, it } from "vitest";
import { tasksService } from "./tasksService";
import apiClient from "./apiClient";

vi.mock("./apiClient");

describe("tasksService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getTasks", () => {
    it("fetches all tasks and returns response data", async () => {
      const mockTasks = [
        { id: "1", title: "Task 1", status: "todo" },
        { id: "2", title: "Task 2", status: "completed" },
      ];
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockTasks });

      const result = await tasksService.getTasks();

      expect(apiClient.get).toHaveBeenCalledWith("/tasks");
      expect(result).toEqual(mockTasks);
    });
  });

  describe("getTask", () => {
    it("fetches a single task by ID and returns response data", async () => {
      const mockTask = { id: "1", title: "Task 1", priority: "high" };
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockTask });

      const result = await tasksService.getTask("1");

      expect(apiClient.get).toHaveBeenCalledWith("/tasks/1");
      expect(result).toEqual(mockTask);
    });
  });

  describe("createTask", () => {
    it("sends POST request with task payload and returns response data", async () => {
      const taskData = {
        title: "New Task",
        description: "Task description",
        priority: "medium",
      };
      const mockResponse = { id: "3", ...taskData };
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockResponse });

      const result = await tasksService.createTask(taskData);

      expect(apiClient.post).toHaveBeenCalledWith("/tasks", taskData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateTask", () => {
    it("sends PUT request to update task and returns response data", async () => {
      const taskId = "1";
      const updateData = { title: "Updated Title", priority: "low" };
      const mockResponse = { id: taskId, ...updateData };
      vi.mocked(apiClient.put).mockResolvedValueOnce({ data: mockResponse });

      const result = await tasksService.updateTask(taskId, updateData);

      expect(apiClient.put).toHaveBeenCalledWith("/tasks/1", updateData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("updateTaskStatus", () => {
    it("sends PATCH request with new status and returns response data", async () => {
      const taskId = "1";
      const status = "completed";
      const mockResponse = { id: taskId, status };
      vi.mocked(apiClient.patch).mockResolvedValueOnce({ data: mockResponse });

      const result = await tasksService.updateTaskStatus(taskId, status);

      expect(apiClient.patch).toHaveBeenCalledWith("/tasks/1/status", {
        status: "completed",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("deleteTask", () => {
    it("sends DELETE request for specified task ID and returns response data", async () => {
      const taskId = "1";
      const mockResponse = { message: "Task deleted successfully" };
      vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: mockResponse });

      const result = await tasksService.deleteTask(taskId);

      expect(apiClient.delete).toHaveBeenCalledWith("/tasks/1");
      expect(result).toEqual(mockResponse);
    });
  });
});