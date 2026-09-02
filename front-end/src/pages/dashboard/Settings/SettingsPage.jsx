import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppPreferences } from "../../../contexts/AppPreferencesContext";
import { settingsService } from "../../../services/settingsService";
import { clearAuthData } from "../../../utils/auth";
import { useToast } from "../../../components/ui";

import styles from "./SettingsPage.module.css";

const INITIAL_SETTINGS = {
  appearance: {
    theme: "system",
  },

  language: {
    language: "english",
  },

  notifications: {
    emailNotifications: true,
    taskReminders: true,
  },

  privacy: {
    profileVisibility: "private",
  },

  security: {
    twoFactorEnabled: false,
  },

  account: {
    fullName: "",
    email: "",
  },
};

const SETTINGS_SECTIONS = [
  {
    id: "appearance",
    label: "Appearance",
  },
  {
    id: "language",
    label: "Language",
  },
  {
    id: "notifications",
    label: "Notifications",
  },
  {
    id: "privacy",
    label: "Privacy",
  },
  {
    id: "security",
    label: "Security",
  },
  {
    id: "account",
    label: "Account",
  },
  {
    id: "export",
    label: "Export Data",
  },
  {
    id: "danger",
    label: "Danger Zone",
  },
];

function SettingsPage() {
  const navigate = useNavigate();

  const { setTheme, setLanguage } = useAppPreferences();
  const { showSuccess, showError } = useToast();

  const [activeSection, setActiveSection] =
    useState("appearance");

  const [settings, setSettings] =
    useState(INITIAL_SETTINGS);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      try {
        setIsLoading(true);

        const response = await settingsService.getSettings();

        const savedSettings =
          response?.data || response;

        if (!isMounted || !savedSettings) {
          return;
        }

        setSettings((currentSettings) => ({
          ...currentSettings,
          ...savedSettings,

          appearance: {
            ...currentSettings.appearance,
            ...(savedSettings.appearance || {}),
          },

          language: {
            ...currentSettings.language,
            ...(savedSettings.language || {}),
          },

          notifications: {
            ...currentSettings.notifications,
            ...(savedSettings.notifications || {}),
          },

          privacy: {
            ...currentSettings.privacy,
            ...(savedSettings.privacy || {}),
          },

          security: {
            ...currentSettings.security,
            ...(savedSettings.security || {}),
          },

          account: {
            ...currentSettings.account,
            ...(savedSettings.account || {}),
          },
        }));

        if (savedSettings.appearance?.theme) {
          setTheme(savedSettings.appearance.theme);
        }

        if (savedSettings.language?.language) {
          setLanguage(savedSettings.language.language);
        }
      } catch (error) {
        console.error(
          "Failed to load settings:",
          error,
        );

        if (isMounted) {
          showError("Unable to load your settings.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, [setLanguage, setTheme, showError]);

  const saveSection = async (section, values) => {
    try {
      setIsSaving(true);

      const currentSection =
        settings[section] || {};

      const nextSection = {
        ...currentSection,
        ...values,
      };

      setSettings((currentSettings) => ({
        ...currentSettings,
        [section]: nextSection,
      }));

      if (
        section === "appearance" &&
        values.theme
      ) {
        setTheme(values.theme);
      }

      if (
        section === "language" &&
        values.language
      ) {
        setLanguage(values.language);
      }

      await settingsService.saveSection(
        section,
        nextSection,
      );

      showSuccess(
        "Settings saved successfully.",
      );
    } catch (error) {
      console.error(
        `Failed to save ${section} settings:`,
        error,
      );

      showError(
        "Unable to save your settings.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldChange = (
    section,
    field,
    value,
  ) => {
    setSettings((currentSettings) => ({
      ...currentSettings,

      [section]: {
        ...currentSettings[section],
        [field]: value,
      },
    }));
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      await settingsService.deleteAccount();

      clearAuthData();

      showSuccess(
        "Your account has been deleted.",
      );

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Failed to delete account:",
        error,
      );

      showError(
        "Unable to delete your account.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportData = async () => {
    try {
      setIsExporting(true);
      
      // When responseType is blob, the response from interceptor might just be the blob itself
      // depending on how apiClient is set up, but usually it returns the axios response
      // Let's get the blob using the settingsService
      const response = await settingsService.exportData();
      
      const blob = new Blob([response.data || response], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mindplanai-export.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      showSuccess("Data exported successfully.");
    } catch (error) {
      console.error("Failed to export data:", error);
      showError("Unable to export your data.");
    } finally {
      setIsExporting(false);
    }
  };

  const renderAppearance = () => (
    <section className={styles.settingsCard}>
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>
          Appearance
        </span>

        <h2>Personalise your workspace</h2>

        <p>
          Choose how MindPlanAI should look when
          you use it.
        </p>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="theme">
          Theme
        </label>

        <select
          id="theme"
          value={settings.appearance.theme}
          disabled={isSaving}
          onChange={(event) =>
            saveSection("appearance", {
              theme: event.target.value,
            })
          }
        >
          <option value="system">
            System default
          </option>

          <option value="light">
            Light
          </option>

          <option value="dark">
            Dark
          </option>
        </select>
      </div>
    </section>
  );

  const renderLanguage = () => (
    <section className={styles.settingsCard}>
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>
          Language
        </span>

        <h2>Language preferences</h2>

        <p>
          Choose your preferred application
          language.
        </p>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="language">
          Language
        </label>

        <select
          id="language"
          value={settings.language.language}
          disabled={isSaving}
          onChange={(event) =>
            saveSection("language", {
              language: event.target.value,
            })
          }
        >
          <option value="english">
            English
          </option>
        </select>
      </div>
    </section>
  );

  const renderNotifications = () => {
    const notificationOptions = [
      {
        field: "emailNotifications",
        label: "Email notifications",
      },
      {
        field: "taskReminders",
        label: "Task reminders",
      },
    ];

    return (
      <section className={styles.settingsCard}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>
            Notifications
          </span>

          <h2>Notification preferences</h2>

          <p>
            Control which updates you want to
            receive.
          </p>
        </div>

        <div className={styles.options}>
          {notificationOptions.map(
            ({ field, label }) => (
              <label
                key={field}
                className={styles.option}
              >
                <input
                  type="checkbox"
                  checked={
                    settings.notifications[field]
                  }
                  disabled={isSaving}
                  onChange={(event) =>
                    saveSection("notifications", {
                      [field]:
                        event.target.checked,
                    })
                  }
                />

                <span>{label}</span>
              </label>
            ),
          )}
        </div>
      </section>
    );
  };

  const renderPrivacy = () => (
    <section className={styles.settingsCard}>
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>
          Privacy
        </span>

        <h2>Privacy settings</h2>

        <p>
          Manage how your profile information is
          shared.
        </p>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="visibility">
          Profile visibility
        </label>

        <select
          id="visibility"
          value={
            settings.privacy.profileVisibility
          }
          disabled={isSaving}
          onChange={(event) =>
            saveSection("privacy", {
              profileVisibility:
                event.target.value,
            })
          }
        >
          <option value="private">
            Private
          </option>

          <option value="public">
            Public
          </option>
        </select>
      </div>
    </section>
  );

  const renderSecurity = () => (
    <section className={styles.settingsCard}>
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>
          Security
        </span>

        <h2>Account security</h2>

        <p>
          Manage additional security options for
          your account.
        </p>
      </div>

      <label className={styles.option}>
        <input
          type="checkbox"
          checked={
            settings.security.twoFactorEnabled
          }
          disabled={isSaving}
          onChange={(event) =>
            saveSection("security", {
              twoFactorEnabled:
                event.target.checked,
            })
          }
        />

        <span>
          Enable two-factor authentication
        </span>
      </label>
    </section>
  );

  const renderAccount = () => (
    <section className={styles.settingsCard}>
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>
          Account
        </span>

        <h2>Account information</h2>

        <p>
          Manage your basic account information.
        </p>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">
            Full name
          </label>

          <input
            id="fullName"
            type="text"
            value={settings.account.fullName}
            onChange={(event) =>
              handleFieldChange(
                "account",
                "fullName",
                event.target.value,
              )
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={settings.account.email}
            disabled
            readOnly
          />
        </div>
      </div>

      <button
        type="button"
        disabled={isSaving}
        onClick={() =>
          saveSection(
            "account",
            settings.account,
          )
        }
      >
        {isSaving
          ? "Saving..."
          : "Save changes"}
      </button>
    </section>
  );

  const renderExport = () => (
    <section className={styles.settingsCard}>
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>
          Export
        </span>

        <h2>Export your data</h2>

        <p>
          Download a copy of your MindPlanAI data.
        </p>
      </div>

      <button 
        type="button" 
        disabled={isExporting} 
        onClick={handleExportData}
      >
        {isExporting ? "Exporting..." : "Export data"}
      </button>
    </section>
  );

  const renderDanger = () => (
    <section
      className={`${styles.settingsCard} ${styles.danger}`}
    >
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>
          Danger Zone
        </span>

        <h2>Delete account</h2>

        <p>
          Permanently delete your account and
          associated data.
        </p>
      </div>

      <button
        type="button"
        disabled={isDeleting}
        onClick={handleDeleteAccount}
      >
        {isDeleting
          ? "Deleting..."
          : "Delete account"}
      </button>
    </section>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "appearance":
        return renderAppearance();

      case "language":
        return renderLanguage();

      case "notifications":
        return renderNotifications();

      case "privacy":
        return renderPrivacy();

      case "security":
        return renderSecurity();

      case "account":
        return renderAccount();

      case "export":
        return renderExport();

      case "danger":
        return renderDanger();

      default:
        return renderAppearance();
    }
  };

  if (isLoading) {
    return (
      <main className={styles.settingsPage}>
        <div className={styles.loading}>
          Loading your settings...
        </div>
      </main>
    );
  }

  return (
    <main className={styles.settingsPage}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>
          Settings
        </span>

        <h1>Manage your preferences</h1>

        <p>
          Configure your MindPlanAI workspace,
          notifications, privacy and account
          preferences.
        </p>
      </header>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <nav aria-label="Settings navigation">
            {SETTINGS_SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                className={
                  activeSection === section.id
                    ? styles.activeItem
                    : styles.sidebarItem
                }
                onClick={() =>
                  setActiveSection(section.id)
                }
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className={styles.content}>
          {renderSection()}
        </section>
      </div>
    </main>
  );
}

export default SettingsPage;