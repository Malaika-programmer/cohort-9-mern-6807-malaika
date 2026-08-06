import PropTypes from "prop-types";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "../index";
import styles from "./ConfirmModal.module.css";

function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} role="presentation">
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          aria-label={cancelLabel}
          onClick={onCancel}
        >
          <X aria-hidden="true" />
        </button>

        <div className={styles.icon}>
          <AlertTriangle aria-hidden="true" />
        </div>

        <h2 id="confirm-modal-title">{title}</h2>
        <p>{description}</p>

        <div className={styles.actions}>
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;
