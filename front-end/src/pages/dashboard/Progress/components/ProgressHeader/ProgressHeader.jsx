import PropTypes from "prop-types";

import { progressContent } from "../../../../../Scripts/Contents/Dashboard/Progress";

import {
  IconBox,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./ProgressHeader.module.css";

function ProgressHeader({
  selectedRange,
  onRangeChange,
}) {
  const { header, icons } = progressContent;

  return (
    <section className={styles.header}>
      <div className={styles.heading}>
        <IconBox
          icon={icons.trending}
          size="large"
          variant="primary"
          animated={false}
        />

        <SectionHeading
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
          align="left"
        />
      </div>

      <label className={styles.range}>
        <span>Report Period</span>

        <select
          value={selectedRange}
          onChange={(event) =>
            onRangeChange(event.target.value)
          }
        >
          {header.ranges.map((range) => (
            <option
              key={range.value}
              value={range.value}
            >
              {range.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

ProgressHeader.propTypes = {
  selectedRange: PropTypes.string.isRequired,
  onRangeChange: PropTypes.func.isRequired,
};

export default ProgressHeader;