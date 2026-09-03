import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";

import "@testing-library/jest-dom";

import TasksPage from "./TasksPage";
import { tasksService } from "../../../services/tasksService";

// =========================================================
// MOCK TASK SERVICE
// =========================================================

vi.mock("../../../services/tasksService", () => ({
  tasksService: {
    getTasks: vi.fn(),
    createTask: vi.fn(),
    updateTask: vi.fn(),
    updateTaskStatus: vi.fn(),
    deleteTask: vi.fn(),
  },
}));

describe("TasksPage Component", () => {
  // =======================================================
  // MOCK DATA
  // =======================================================

  const mockTasks = [
    {
      id: "1",
      title: "Design Landing Page",
      description: "Create wireframes and high-fidelity mockups",
      status: "todo",
      priority: "high",
      category: "work",
      dueDate: "2026-12-31",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
    {
      id: "2",
      title: "Buy Groceries",
      description: "Milk, Bread, Eggs",
      status: "completed",
      priority: "low",
      category: "personal",
      dueDate: "2026-01-01",
      updatedAt: "2026-01-02T00:00:00.000Z",
    },
  ];

  // =======================================================
  // FIND TASK CARD
  // =======================================================

  const getTaskCard = (title) => {
  const textNode = screen.getByText(title);

  return textNode.closest("article");
};


  // =======================================================
  // FIND MODAL
  // =======================================================

  const getTaskModal = (heading) => {
    const modalHeading = screen.getByRole("heading", {
      name: heading,
    });

    expect(modalHeading).toBeInTheDocument();

    return (
      modalHeading.closest("form") ||
      modalHeading.parentElement
    );
  };

  // =======================================================
  // FIND TITLE INPUT
  // =======================================================

  const getTitleInput = (modal) => {
    // Try accessible label first
    const labelledInput = within(modal).queryByLabelText(
      /title/i
    );

    if (labelledInput) {
      return labelledInput;
    }

    // Try name
    const nameInput = modal.querySelector(
      'input[name="title"]'
    );

    if (nameInput) {
      return nameInput;
    }

    // Try id
    const idInput = modal.querySelector(
      'input[id="title"]'
    );

    if (idInput) {
      return idInput;
    }

    // Try placeholder
    const placeholderInput = modal.querySelector(
      'input[placeholder*="title" i]'
    );

    if (placeholderInput) {
      return placeholderInput;
    }

    // Fallback
    return modal.querySelector(
      'input[type="text"], input:not([type])'
    );
  };

  // =======================================================
  // FIND DESCRIPTION INPUT
  // =======================================================

  const getDescriptionInput = (modal) => {
    // Try accessible label first
    const labelledInput = within(modal).queryByLabelText(
      /description/i
    );

    if (labelledInput) {
      return labelledInput;
    }

    // Try textarea
    const textarea = modal.querySelector(
      'textarea[name="description"]'
    );

    if (textarea) {
      return textarea;
    }

    // Try id
    const idTextarea = modal.querySelector(
      'textarea[id="description"]'
    );

    if (idTextarea) {
      return idTextarea;
    }

    // Try placeholder
    const placeholderTextarea = modal.querySelector(
      'textarea[placeholder*="description" i]'
    );

    if (placeholderTextarea) {
      return placeholderTextarea;
    }

    return modal.querySelector("textarea");
  };

  // =======================================================
  // FIND EDIT BUTTON
  // =======================================================

  const getEditButton = (card) => {
    // First try accessible name
    const accessibleButton = within(card).queryByRole(
      "button",
      {
        name: /edit/i,
      }
    );

    if (accessibleButton) {
      return accessibleButton;
    }

    // Get all buttons
    const buttons = Array.from(
      card.querySelectorAll("button")
    );

    // Search button attributes
    const editButton = buttons.find((button) => {
      const information = [
        button.textContent,
        button.getAttribute("aria-label"),
        button.getAttribute("title"),
        button.getAttribute("data-testid"),
        button.getAttribute("name"),
        button.className,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        information.includes("edit") ||
        information.includes("pencil")
      );
    });

    if (editButton) {
      return editButton;
    }

    /*
     * Most task cards have:
     *
     * 1. Complete button
     * 2. Edit button
     * 3. Delete button
     *
     * If the Edit/Delete buttons don't have accessible
     * names, use the second button.
     */
    if (buttons.length >= 3) {
      return buttons[1];
    }

    if (buttons.length === 2) {
      return buttons[1];
    }

    return null;
  };

  // =======================================================
  // FIND DELETE BUTTON
  // =======================================================

  const getDeleteButton = (card) => {
    // First try accessible name
    const accessibleButton = within(card).queryByRole(
      "button",
      {
        name: /delete/i,
      }
    );

    if (accessibleButton) {
      return accessibleButton;
    }

    // Get all buttons
    const buttons = Array.from(
      card.querySelectorAll("button")
    );

    // Search attributes
    const deleteButton = buttons.find((button) => {
      const information = [
        button.textContent,
        button.getAttribute("aria-label"),
        button.getAttribute("title"),
        button.getAttribute("data-testid"),
        button.getAttribute("name"),
        button.className,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        information.includes("delete") ||
        information.includes("trash")
      );
    });

    if (deleteButton) {
      return deleteButton;
    }

    /*
     * If there are 3 buttons:
     *
     * 0 = complete
     * 1 = edit
     * 2 = delete
     */
    if (buttons.length >= 3) {
      return buttons[buttons.length - 1];
    }

    return null;
  };

  // =======================================================
  // BEFORE EACH
  // =======================================================

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(window, "confirm").mockImplementation(
      () => true
    );
  });

  // =======================================================
  // AFTER EACH
  // =======================================================

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // =======================================================
  // TEST 1 - LOAD TASKS
  // =======================================================

  it("renders loading state initially and populates tasks on load", async () => {
    tasksService.getTasks.mockResolvedValueOnce({
      data: mockTasks,
    });

    render(<TasksPage />);

    expect(
      screen.getByText("Loading tasks...")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        tasksService.getTasks
      ).toHaveBeenCalledTimes(1);

      expect(
        screen.getByText("Design Landing Page")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Buy Groceries")
      ).toBeInTheDocument();
    });
  });

  // =======================================================
  // TEST 2 - ERROR
  // =======================================================

  it("displays error message if tasks fail to load", async () => {
    tasksService.getTasks.mockRejectedValueOnce({
      response: {
        data: {
          message: "Failed to fetch tasks.",
        },
      },
    });

    render(<TasksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch tasks.")
      ).toBeInTheDocument();
    });
  });

  // =======================================================
  // TEST 3 - SEARCH
  // =======================================================

  it("filters tasks by search query and resets when clearing filters", async () => {
    tasksService.getTasks.mockResolvedValueOnce({
      data: mockTasks,
    });

    render(<TasksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Design Landing Page")
      ).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(
      "Search tasks..."
    );

    fireEvent.change(searchInput, {
      target: {
        value: "Groceries",
      },
    });

    expect(
      screen.queryByText("Design Landing Page")
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Buy Groceries")
    ).toBeInTheDocument();

    const clearButton = screen.getByRole("button", {
      name: "Clear Filters",
    });

    fireEvent.click(clearButton);

    expect(
      screen.getByText("Design Landing Page")
    ).toBeInTheDocument();
  });

  // =======================================================
  // TEST 4 - CREATE TASK
  // =======================================================

  it("opens create task modal and submits new task", async () => {
    tasksService.getTasks.mockResolvedValueOnce({
      data: [],
    });

    const newTask = {
      id: "3",
      title: "Build API Endpoints",
      description: "Implement user routes",
      status: "todo",
      priority: "medium",
      category: "general",
      dueDate: "",
    };

    tasksService.createTask.mockResolvedValueOnce({
      data: newTask,
    });

    render(<TasksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("No tasks found")
      ).toBeInTheDocument();
    });

    const createButtons = screen.getAllByRole(
      "button",
      {
        name: /create task/i,
      }
    );

    fireEvent.click(createButtons[0]);

    const modal = getTaskModal("Create Task");

    const titleInput = getTitleInput(modal);

    expect(titleInput).toBeTruthy();

    fireEvent.change(titleInput, {
      target: {
        value: "Build API Endpoints",
      },
    });

    const descriptionInput =
      getDescriptionInput(modal);

    expect(descriptionInput).toBeTruthy();

    fireEvent.change(descriptionInput, {
      target: {
        value: "Implement user routes",
      },
    });

    const submitButtons = within(modal).getAllByRole(
      "button",
      {
        name: "Create Task",
      }
    );

    fireEvent.click(
      submitButtons[submitButtons.length - 1]
    );

    await waitFor(() => {
      expect(
        tasksService.createTask
      ).toHaveBeenCalledWith({
        title: "Build API Endpoints",
        description: "Implement user routes",
        status: "todo",
        priority: "medium",
        category: "general",
        dueDate: "",
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText("Build API Endpoints")
      ).toBeInTheDocument();
    });
  });

  // =======================================================
  // TEST 5 - EDIT TASK
  // =======================================================

  it("opens edit modal and updates existing task", async () => {
    tasksService.getTasks.mockResolvedValueOnce({
      data: mockTasks,
    });

    const updatedTask = {
      ...mockTasks[0],
      title: "Updated Landing Page",
    };

    tasksService.updateTask.mockResolvedValueOnce({
      data: updatedTask,
    });

    render(<TasksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Design Landing Page")
      ).toBeInTheDocument();
    });

    // Find task card
    const card = getTaskCard(
      "Design Landing Page"
    );

    expect(card).toBeTruthy();

    // Find edit button
    const editButton = getEditButton(card);

    expect(editButton).toBeTruthy();

    fireEvent.click(editButton);

    // Verify modal
    const modal = getTaskModal("Edit Task");

    // Find title input
    const titleInput = getTitleInput(modal);

    expect(titleInput).toBeTruthy();

    fireEvent.change(titleInput, {
      target: {
        value: "Updated Landing Page",
      },
    });

    // Update
    const updateButton = within(modal).getByRole(
      "button",
      {
        name: "Update Task",
      }
    );

    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(
        tasksService.updateTask
      ).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          title: "Updated Landing Page",
        })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("Updated Landing Page")
      ).toBeInTheDocument();
    });
  });

  // =======================================================
  // TEST 6 - TOGGLE COMPLETION
  // =======================================================

  it("toggles task completion status", async () => {
    tasksService.getTasks.mockResolvedValueOnce({
      data: mockTasks,
    });

    tasksService.updateTaskStatus.mockResolvedValueOnce({
      data: {
        ...mockTasks[0],
        status: "completed",
      },
    });

    render(<TasksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Design Landing Page")
      ).toBeInTheDocument();
    });

    const card = getTaskCard(
      "Design Landing Page"
    );

    const toggleButton = within(card).getByRole(
      "button",
      {
        name: /toggle task completion|complete|check/i,
      }
    );

    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(
        tasksService.updateTaskStatus
      ).toHaveBeenCalledWith(
        "1",
        "completed"
      );
    });
  });

  // =======================================================
  // TEST 7 - DELETE TASK
  // =======================================================

  it("deletes a task after user confirmation", async () => {
    tasksService.getTasks.mockResolvedValueOnce({
      data: mockTasks,
    });

    tasksService.deleteTask.mockResolvedValueOnce({});

    render(<TasksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Design Landing Page")
      ).toBeInTheDocument();
    });

    // Find task card
    const card = getTaskCard(
      "Design Landing Page"
    );

    expect(card).toBeTruthy();

    // Find delete button
    const deleteButton = getDeleteButton(card);

    expect(deleteButton).toBeTruthy();

    fireEvent.click(deleteButton);

    // Confirm
    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this task?"
    );

    // API call
    await waitFor(() => {
      expect(
        tasksService.deleteTask
      ).toHaveBeenCalledWith("1");
    });

    // Task removed
    await waitFor(() => {
      expect(
        screen.queryByText("Design Landing Page")
      ).not.toBeInTheDocument();
    });
  });
});