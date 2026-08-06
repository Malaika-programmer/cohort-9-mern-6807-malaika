import PropTypes from "prop-types";

import styles from "./Container.module.css";

function Container({ children, className = "", as: Component = "div" }) {
  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  return <Component className={containerClasses}>{children}</Component>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

export default Container;