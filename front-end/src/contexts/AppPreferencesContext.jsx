import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AppPreferencesContext = createContext(null);

function getStoredValue(key, fallback) {
  return window.localStorage.getItem(key) || fallback;
}

function resolveTheme(theme) {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return theme;
}

export function AppPreferencesProvider({ children }) {
  const [theme, setThemeState] = useState(() =>
    getStoredValue("theme", "system"),
  );
  const [language, setLanguageState] = useState(() =>
    getStoredValue("language", "english"),
  );

  const effectiveTheme = resolveTheme(theme);

  const setTheme = useCallback((nextTheme) => {
    setThemeState(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
  }, []);

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = effectiveTheme;
  }, [effectiveTheme]);

  const value = useMemo(
    () => ({
      theme,
      effectiveTheme,
      language,
      setTheme,
      setLanguage,
    }),
    [effectiveTheme, language, setLanguage, setTheme, theme],
  );

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  );
}

AppPreferencesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);

  if (!context) {
    throw new Error(
      "useAppPreferences must be used within AppPreferencesProvider",
    );
  }

  return context;
}
