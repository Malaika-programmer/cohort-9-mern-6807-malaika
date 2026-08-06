import PropTypes from "prop-types";
import { RotateCcw } from "lucide-react";

import { notesContent } from "../../../../../Scripts/Contents/Dashboard/Notes";
import {
  Button,
  Card,
  Input,
} from "../../../../../components/ui";

import styles from "./NotesFilters.module.css";

function NotesFilters({
  searchValue,
  categoryFilter,
  sortValue,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClear,
}) {
  const { filters } = notesContent;

  return (
    <Card className={styles.filters}>
      <div className={styles.search}>
        <Input
          name={filters.search.name}
          type="search"
          value={searchValue}
          placeholder={filters.search.placeholder}
          icon={filters.search.icon}
          aria-label={filters.search.placeholder}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />
      </div>

      <label className={styles.field}>
        <span>{filters.categoryLabel}</span>

        <select
          value={categoryFilter}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
        >
          {filters.categories.map((category) => (
            <option
              key={category.value}
              value={category.value}
            >
              {category.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span>{filters.sortLabel}</span>

        <select
          value={sortValue}
          onChange={(event) =>
            onSortChange(event.target.value)
          }
        >
          {filters.sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <Button
        type="button"
        variant="ghost"
        icon={RotateCcw}
        onClick={onClear}
      >
        Clear
      </Button>
    </Card>
  );
}

NotesFilters.propTypes = {
  searchValue: PropTypes.string.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  sortValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default NotesFilters;