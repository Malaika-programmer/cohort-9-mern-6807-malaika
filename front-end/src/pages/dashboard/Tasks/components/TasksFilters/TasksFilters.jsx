import PropTypes from "prop-types";
import { RotateCcw } from "lucide-react";

import { tasksContent } from "../../../../../Scripts/Contents/Dashboard/Tasks";

import {
  Button,
  Card,
  Input,
} from "../../../../../components/ui";

import styles from "./TasksFilters.module.css";

function FilterSelect({
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

FilterSelect.propTypes = {
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

function TasksFilters({
  searchValue,
  statusFilter,
  priorityFilter,
  categoryFilter,
  sortValue,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
  onSortChange,
  onClear,
}) {
  const { filters } = tasksContent;

  return (
    <Card className={styles.filters}>
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
        <FilterSelect
          label={filters.statusLabel}
          value={statusFilter}
          options={filters.statuses}
          onChange={onStatusChange}
        />

        <FilterSelect
          label={filters.priorityLabel}
          value={priorityFilter}
          options={filters.priorities}
          onChange={onPriorityChange}
        />

        <FilterSelect
          label={filters.categoryLabel}
          value={categoryFilter}
          options={filters.categories}
          onChange={onCategoryChange}
        />

        <FilterSelect
          label={filters.sortLabel}
          value={sortValue}
          options={filters.sortOptions}
          onChange={onSortChange}
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

TasksFilters.propTypes = {
  searchValue: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  priorityFilter:
    PropTypes.string.isRequired,
  categoryFilter:
    PropTypes.string.isRequired,
  sortValue: PropTypes.string.isRequired,

  onSearchChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onPriorityChange:
    PropTypes.func.isRequired,
  onCategoryChange:
    PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default TasksFilters;