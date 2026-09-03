import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SettingsPage from "./SettingsPage";
import { settingsService } from "../../../services/settingsService";
import { clearAuthData } from "../../../utils/auth";

const mockNavigate = vi.fn();
const mockSetTheme = vi.fn();
const mockSetLanguage = vi.fn();
const mockShowSuccess = vi.fn();
const mockShowError = vi.fn();

vi.mock("react-router-dom", async importActual => ({
  ...(await importActual("react-router-dom")),
  useNavigate: () => mockNavigate
}));

vi.mock("../../../contexts/AppPreferencesContext", () => ({
  useAppPreferences: () => ({
    setTheme: mockSetTheme,
    setLanguage: mockSetLanguage,
  }),
}));

vi.mock("../../../components/ui", () => ({
  useToast: () => ({
    showSuccess: mockShowSuccess,
    showError: mockShowError,
  }),
}));

vi.mock("../../../services/settingsService");
vi.mock("../../../utils/auth");

describe("SettingsPage Component", () => {
  const mockSettingsData = {
    appearance: { theme: "dark" },
    language: { language: "english" },
    notifications: { emailNotifications: true, taskReminders: false },
    privacy: { profileVisibility: "public" },
    security: { twoFactorEnabled: true },
    account: { fullName: "Alex Smith", email: "alex@example.com" },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
    global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/mock-url");
    global.URL.revokeObjectURL = vi.fn();
  });

  it("renders loading state initially and populates preferences on load", async () => {
    settingsService.getSettings.mockResolvedValueOnce({ data: mockSettingsData });

    render(<SettingsPage />);

    expect(screen.getByText("Loading your settings...")).toBeInTheDocument();

    await waitFor(() => {
      expect(settingsService.getSettings).toHaveBeenCalledTimes(1);
    });

    expect(mockSetTheme).toHaveBeenCalledWith("dark");
    expect(mockSetLanguage).toHaveBeenCalledWith("english");
    expect(screen.getByRole("combobox", { name: /theme/i })).toHaveValue("dark");
  });

  it("displays error toast if settings load fails", async () => {
    settingsService.getSettings.mockRejectedValueOnce(new Error("Fetch failed"));

    render(<SettingsPage />);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith("Unable to load your settings.");
    });
  });

  it("switches sections using sidebar navigation", async () => {
    settingsService.getSettings.mockResolvedValueOnce({ data: mockSettingsData });

    render(<SettingsPage />);
    await waitFor(() => expect(settingsService.getSettings).toHaveBeenCalled());

    // Switch to Language section
    fireEvent.click(screen.getByRole("button", { name: "Language" }));
    expect(screen.getByRole("heading", { name: "Language preferences" })).toBeInTheDocument();

    // Switch to Security section
    fireEvent.click(screen.getByRole("button", { name: "Security" }));
    expect(screen.getByRole("heading", { name: "Account security" })).toBeInTheDocument();
  });

  it("updates appearance setting and invokes preferences context", async () => {
    settingsService.getSettings.mockResolvedValueOnce({ data: mockSettingsData });
    settingsService.saveSection.mockResolvedValueOnce({});

    render(<SettingsPage />);
    await waitFor(() => expect(settingsService.getSettings).toHaveBeenCalled());

    const themeSelect = screen.getByRole("combobox", { name: /theme/i });
    fireEvent.change(themeSelect, { target: { value: "light" } });

    await waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith("light");
      expect(settingsService.saveSection).toHaveBeenCalledWith("appearance", {
        theme: "light",
      });
      expect(mockShowSuccess).toHaveBeenCalledWith("Settings saved successfully.");
    });
  });

  it("updates and saves account information", async () => {
    settingsService.getSettings.mockResolvedValueOnce({ data: mockSettingsData });
    settingsService.saveSection.mockResolvedValueOnce({});

    render(<SettingsPage />);
    await waitFor(() => expect(settingsService.getSettings).toHaveBeenCalled());

    // Navigate to Account section
    fireEvent.click(screen.getByRole("button", { name: "Account" }));

    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: "Alex Taylor" } });

    const saveBtn = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(settingsService.saveSection).toHaveBeenCalledWith("account", {
        fullName: "Alex Taylor",
        email: "alex@example.com",
      });
      expect(mockShowSuccess).toHaveBeenCalledWith("Settings saved successfully.");
    });
  });

  it("exports user data as a downloadable file", async () => {
    const mockExportBlob = new Blob(['{"data":"test"}'], { type: "application/json" });
    settingsService.getSettings.mockResolvedValueOnce({ data: mockSettingsData });
    settingsService.exportData.mockResolvedValueOnce({ data: mockExportBlob });

    render(<SettingsPage />);
    await waitFor(() => expect(settingsService.getSettings).toHaveBeenCalled());

    // Navigate to Export section
    fireEvent.click(screen.getByRole("button", { name: "Export Data" }));

    const exportBtn = screen.getByRole("button", { name: "Export data" });
    fireEvent.click(exportBtn);

    await waitFor(() => {
      expect(settingsService.exportData).toHaveBeenCalledTimes(1);
      expect(global.URL.createObjectURL).toHaveBeenCalled();
      expect(mockShowSuccess).toHaveBeenCalledWith("Data exported successfully.");
    });
  });

  it("deletes account upon user confirmation and redirects to login", async () => {
    settingsService.getSettings.mockResolvedValueOnce({ data: mockSettingsData });
    settingsService.deleteAccount.mockResolvedValueOnce({});

    render(<SettingsPage />);
    await waitFor(() => expect(settingsService.getSettings).toHaveBeenCalled());

    // Navigate to Danger Zone section
    fireEvent.click(screen.getByRole("button", { name: "Danger Zone" }));

    const deleteBtn = screen.getByRole("button", { name: "Delete account" });
    fireEvent.click(deleteBtn);

    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );

    await waitFor(() => {
      expect(settingsService.deleteAccount).toHaveBeenCalledTimes(1);
      expect(clearAuthData).toHaveBeenCalledTimes(1);
      expect(mockShowSuccess).toHaveBeenCalledWith("Your account has been deleted.");
      expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
    });
  });
});