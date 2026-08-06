import PropTypes from "prop-types";
import { RotateCcw } from "lucide-react";

import { scheduleContent } from "../../../../../Scripts/Contents/Dashboard/Schedule";

import {
  Button,
  Card,
  Input,
} from "../../../../../components/ui";

import styles from "./ScheduleToolbar.module.css";

function ToolbarSelect({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

ToolbarSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

function ScheduleToolbar({
  searchValue,
  typeFilter,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onPriorityChange,
  onClear,
}) {
  const { filters } = scheduleContent;

  return (
    <Card className={styles.toolbar}>
      <div className={styles.search}>
        <Input
          name={filters.search.name}
          type="search"
          value={searchValue}
          placeholder={
            filters.search.placeholder
          }
          icon={filters.search.icon}
          aria-label={
            filters.search.placeholder
          }
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />
      </div>

      <div className={styles.selectGrid}>
        <ToolbarSelect
          label={filters.typeLabel}
          value={typeFilter}
          options={filters.types}
          onChange={onTypeChange}
        />

        <ToolbarSelect
          label={filters.statusLabel}
          value={statusFilter}
          options={filters.statuses}
          onChange={onStatusChange}
        />

        <ToolbarSelect
          label={filters.priorityLabel}
          value={priorityFilter}
          options={filters.priorities}
          onChange={onPriorityChange}
        />
      </div>

      <Button
        type="button"
        variant="ghost"
        icon={RotateCcw}
        onClick={onClear}
      >
        {filters.clearButton}
      </Button>
    </Card>
  );
}

ScheduleToolbar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  typeFilter: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  priorityFilter: PropTypes.string.isRequired,

  onSearchChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onPriorityChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default ScheduleToolbar;