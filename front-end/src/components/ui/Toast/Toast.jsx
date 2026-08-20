import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import PropTypes from "prop-types";

import {
  CheckCircle2,
  X,
  XCircle,
} from "lucide-react";

import styles from "./Toast.module.css";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  const showToast = useCallback(
    ({ type = "success", message }) => {
      const id = crypto.randomUUID();

      setToasts((currentToasts) => [
        ...currentToasts,
        {
          id,
          type,
          message,
        },
      ]);

      // Automatically remove the toast after a few seconds.
      window.setTimeout(() => {
        dismissToast(id);
      }, 3500);
    },
    [dismissToast]
  );

  const toastActions = useMemo(
    () => ({
      showSuccess: (message) => {
        showToast({
          type: "success",
          message,
        });
      },

      showError: (message) => {
        showToast({
          type: "error",
          message,
        });
      },
    }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={toastActions}>
      {children}

      <div
        className={styles.viewport}
        role="status"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          const Icon =
            toast.type === "error"
              ? XCircle
              : CheckCircle2;

          const toastClasses = [
            styles.toast,
            styles[toast.type],
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={toast.id}
              className={toastClasses}
            >
              <Icon aria-hidden="true" />

              <span>{toast.message}</span>

              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => dismissToast(toast.id)}
              >
                <X aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useToast() {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error(
      "useToast must be used within ToastProvider"
    );
  }

  return toast;
}