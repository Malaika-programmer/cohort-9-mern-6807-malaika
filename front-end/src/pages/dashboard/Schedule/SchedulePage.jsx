import { useMemo, useState } from "react";

import { scheduleContent } from "../../../Scripts/Contents/Dashboard/Schedule";

import {
  ScheduleEditor,
  ScheduleEmptyState,
  ScheduleHeader,
  ScheduleStats,
  ScheduleToolbar,
  ScheduleWeek,
} from "./components";

import styles from "./SchedulePage.module.css";

function getStartOfWeek(dateValue) {
  const date = new Date(dateValue);
  const day = date.getDay();

  const difference =
    date.getDate() - day + (day === 0 ? -6 : 1);

  date.setDate(difference);
  date.setHours(0, 0, 0, 0);

  return date;
}

function addDays(dateValue, numberOfDays) {
  const date = new Date(dateValue);
  date.setDate(date.getDate() + numberOfDays);
  return date;
}

function formatDateKey(dateValue) {
  const year = dateValue.getFullYear();
  const month = String(
    dateValue.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    dateValue.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function SchedulePage() {
  const [schedules, setSchedules] = useState(
    scheduleContent.initialSchedules,
  );

  const [weekStart, setWeekStart] = useState(() =>
    getStartOfWeek(new Date()),
  );

  const [searchValue, setSearchValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [priorityFilter, setPriorityFilter] =
    useState("all");

  const [selectedSchedule, setSelectedSchedule] =
    useState(null);

  const [defaultDate, setDefaultDate] = useState("");
  const [isEditorOpen, setIsEditorOpen] =
    useState(false);

  const weekDates = useMemo(
    () =>
      Array.from(
        {
          length: 7,
        },
        (_, index) => addDays(weekStart, index),
      ),
    [weekStart],
  );

  const filteredSchedules = useMemo(() => {
    const normalizedSearch = searchValue
      .trim()
      .toLowerCase();

    const weekDateKeys = new Set(
      weekDates.map(formatDateKey),
    );

    return schedules
      .filter((schedule) =>
        weekDateKeys.has(schedule.date),
      )
      .filter((schedule) => {
        const matchesSearch =
          !normalizedSearch ||
          schedule.title
            .toLowerCase()
            .includes(normalizedSearch) ||
          schedule.description
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesType =
          typeFilter === "all" ||
          schedule.type === typeFilter;

        const matchesStatus =
          statusFilter === "all" ||
          schedule.status === statusFilter;

        const matchesPriority =
          priorityFilter === "all" ||
          schedule.priority === priorityFilter;

        return (
          matchesSearch &&
          matchesType &&
          matchesStatus &&
          matchesPriority
        );
      })
      .sort((firstSchedule, secondSchedule) =>
        firstSchedule.startTime.localeCompare(
          secondSchedule.startTime,
        ),
      );
  }, [
    schedules,
    searchValue,
    typeFilter,
    statusFilter,
    priorityFilter,
    weekDates,
  ]);

  const openCreateEditor = (dateValue = "") => {
    setSelectedSchedule(null);
    setDefaultDate(dateValue);
    setIsEditorOpen(true);
  };

  const openEditEditor = (schedule) => {
    setSelectedSchedule(schedule);
    setDefaultDate(schedule.date);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setSelectedSchedule(null);
    setDefaultDate("");
    setIsEditorOpen(false);
  };

  const handleSaveSchedule = (scheduleValues) => {
    const currentDate = new Date().toISOString();

    if (selectedSchedule) {
      setSchedules((currentSchedules) =>
        currentSchedules.map((schedule) =>
          schedule.id === selectedSchedule.id
            ? {
                ...schedule,
                ...scheduleValues,
                updatedAt: currentDate,
              }
            : schedule,
        ),
      );

      /*
       * Backend:
       *
       * await scheduleService.updateSchedule(
       *   selectedSchedule.id,
       *   scheduleValues
       * );
       */
    } else {
      const createdSchedule = {
        id: Date.now(),
        ...scheduleValues,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      setSchedules((currentSchedules) => [
        createdSchedule,
        ...currentSchedules,
      ]);

      /*
       * Backend:
       *
       * await scheduleService.createSchedule(
       *   scheduleValues
       * );
       */
    }

    closeEditor();
  };

  const handleDeleteSchedule = (scheduleId) => {
    const confirmed = window.confirm(
      scheduleContent.deleteConfirmation.message,
    );

    if (!confirmed) {
      return;
    }

    setSchedules((currentSchedules) =>
      currentSchedules.filter(
        (schedule) => schedule.id !== scheduleId,
      ),
    );

    /*
     * Backend:
     *
     * await scheduleService.deleteSchedule(
     *   scheduleId
     * );
     */
  };

  const handleToggleComplete = (scheduleId) => {
    setSchedules((currentSchedules) =>
      currentSchedules.map((schedule) =>
        schedule.id === scheduleId
          ? {
              ...schedule,
              status:
                schedule.status === "completed"
                  ? "scheduled"
                  : "completed",
              updatedAt: new Date().toISOString(),
            }
          : schedule,
      ),
    );
  };

  const moveWeek = (numberOfDays) => {
    setWeekStart((currentWeekStart) =>
      addDays(currentWeekStart, numberOfDays),
    );
  };

  const goToCurrentWeek = () => {
    setWeekStart(getStartOfWeek(new Date()));
  };

  const clearFilters = () => {
    setSearchValue("");
    setTypeFilter("all");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  return (
    <main className={styles.schedulePage}>
      <ScheduleHeader
        weekStart={weekStart}
        weekEnd={weekDates[6]}
        onCreateSchedule={() =>
          openCreateEditor()
        }
        onPreviousWeek={() => moveWeek(-7)}
        onNextWeek={() => moveWeek(7)}
        onCurrentWeek={goToCurrentWeek}
      />

      <ScheduleStats schedules={schedules} />

      <ScheduleToolbar
        searchValue={searchValue}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onSearchChange={setSearchValue}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onClear={clearFilters}
      />

      {filteredSchedules.length > 0 ? (
        <ScheduleWeek
          weekDates={weekDates}
          schedules={filteredSchedules}
          onAddSchedule={openCreateEditor}
          onEdit={openEditEditor}
          onDelete={handleDeleteSchedule}
          onToggleComplete={handleToggleComplete}
        />
      ) : (
        <ScheduleEmptyState
          onCreateSchedule={() =>
            openCreateEditor()
          }
        />
      )}

      {isEditorOpen && (
        <ScheduleEditor
          key={
            selectedSchedule?.id ??
            defaultDate ??
            "create-schedule"
          }
          schedule={selectedSchedule}
          defaultDate={defaultDate}
          schedules={schedules}
          onSave={handleSaveSchedule}
          onCancel={closeEditor}
        />
      )}
    </main>
  );
}

export default SchedulePage;
