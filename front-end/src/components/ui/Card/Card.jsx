import PropTypes from "prop-types";
import styles from "./Card.module.css";

function Card({
  icon: Icon,
  badge,
  title,
  description,
  footer,
  children,
  onClick,
  className = "",
}) {
  const clickable = Boolean(onClick);

  return (
    <article
      className={`${styles.card} ${
        clickable ? styles.clickable : ""
      } ${className}`}
      onClick={onClick}
    >
      {(Icon || badge) && (
        <div className={styles.header}>
          {Icon && (
            <div className={styles.icon}>
              <Icon size={22} />
            </div>
          )}

          {badge && (
            <span className={styles.badge}>
              {badge}
            </span>
          )}
        </div>
      )}

      {title && (
        <h3 className={styles.title}>
          {title}
        </h3>
      )}

      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}

      {children}

      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </article>
  );
}

Card.propTypes = {
  icon: PropTypes.elementType,
  badge: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  footer: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Card;