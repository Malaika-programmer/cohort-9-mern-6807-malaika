const STORAGE_KEY = "mindplanai-settings";

function readSettings() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function writeSettings(settings) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export const settingsService = {
  async getSettings(defaultSettings) {
    return {
      ...defaultSettings,
      ...readSettings(),
    };
  },

  async saveSection(section, values) {
    const currentSettings = readSettings();
    const nextSettings = {
      ...currentSettings,
      [section]: {
        ...(currentSettings[section] ?? {}),
        ...values,
      },
    };

    writeSettings(nextSettings);
    return nextSettings[section];
  },

  async deleteAccount() {
    window.localStorage.removeItem(STORAGE_KEY);
    return { deleted: true };
  },
};
