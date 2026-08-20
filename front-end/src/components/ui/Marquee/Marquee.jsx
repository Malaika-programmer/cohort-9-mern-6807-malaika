import PropTypes from "prop-types";
import styles from "./Marquee.module.css";

function Marquee({
  items,
  speed = 24,
  pauseOnHover = true,
  reverse = false,
  className = "",
}) {
  const repeatedItems = [...items, ...items];

  const marqueeClasses = [
    styles.marquee,
    pauseOnHover ? styles.pauseOnHover : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={marqueeClasses}>
      <div
        className={`${styles.track} ${
          reverse ? styles.reverse : ""
        }`}
        style={{
          "--marquee-duration": `${speed}s`,
        }}
      >
        {repeatedItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              className={styles.item}
              key={`${item.label}-${index}`}
            >
              {Icon && (
                <Icon
                  className={styles.icon}
                  aria-hidden="true"
                />
              )}

              <span className={styles.label}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Marquee.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
    })
  ).isRequired,

  speed: PropTypes.number,
  pauseOnHover: PropTypes.bool,
  reverse: PropTypes.bool,
  className: PropTypes.string,
};

export default Marquee;