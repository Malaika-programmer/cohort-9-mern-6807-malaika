import { useEffect, useState } from "react";

import { settingsContent } from "../../../Scripts/Contents/Dashboard/Settings";
import { useAppPreferences } from "../../../contexts/AppPreferencesContext";
import { settingsService } from "../../../services/settingsService";
import { useToast } from "../../../components/ui";

import {
  SettingsHeader,
  SettingsSidebar,
  AppearanceSettings,
  LanguageSettings,
  NotificationSettings,
  PrivacySettings,
  SecuritySettings,
  AccountSettings,
  ExportData,
  DangerZone,
} from "./components";

import styles from "./SettingsPage.module.css";

function SettingsPage() {
  const [activeSection, setActiveSection] = useState(
    settingsContent.defaults.activeSection,
  );
  const [settings, setSettings] = useState(
    settingsContent.initialSettings,
  );
  const { setTheme, setLanguage } = useAppPreferences();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    let isMounted = true;

    settingsService
      .getSettings(settingsContent.initialSettings)
      .then((savedSettings) => {
        if (isMounted) {
          setSettings(savedSettings);
          setTheme(savedSettings.appearance.theme);
          setLanguage(savedSettings.language.language);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [setLanguage, setTheme]);

  const saveSection = async (section, values) => {
    try {
      const nextValues = {
        ...settings[section],
        ...values,
      };

      setSettings((currentSettings) => ({
        ...currentSettings,
        [section]: nextValues,
      }));

      if (section === "appearance" && values.theme) {
        setTheme(values.theme);
      }

      if (section === "language" && values.language) {
        setLanguage(values.language);
      }

      await settingsService.saveSection(section, nextValues);
      showSuccess(settingsContent.status.saveSuccess);
    } catch {
      showError(settingsContent.status.saveError);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "appearance":
        return (
          <AppearanceSettings
            values={settings.appearance}
            onChange={(values) => saveSection("appearance", values)}
          />
        );

      case "language":
        return (
          <LanguageSettings
            values={settings.language}
            onChange={(values) => saveSection("language", values)}
          />
        );

      case "notifications":
        return (
          <NotificationSettings
            values={settings.notifications}
            onChange={(values) => saveSection("notifications", values)}
          />
        );

      case "privacy":
        return (
          <PrivacySettings
            values={settings.privacy}
            onChange={(values) => saveSection("privacy", values)}
          />
        );

      case "security":
        return (
          <SecuritySettings
            values={settings.security}
            onChange={(values) => saveSection("security", values)}
          />
        );

      case "account":
        return (
          <AccountSettings
            values={settings.account}
            onSave={(values) => saveSection("account", values)}
          />
        );

      case "export":
        return <ExportData />;

      case "danger":
        return <DangerZone />;

      default:
        return <AppearanceSettings />;
    }
  };

  return (
    <main className={styles.settingsPage}>
      <SettingsHeader />

      <div className={styles.container}>
        <SettingsSidebar
          activeSection={activeSection}
          onChange={setActiveSection}
        />

        <section className={styles.content}>
          {renderSection()}
        </section>
      </div>
    </main>
  );
}

export default SettingsPage;
