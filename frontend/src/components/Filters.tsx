import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { useTableContext } from "/@/context/TableContext";
import type { Column, ColumnFilterOption } from "/@/components/table/Table";
import { useDebounce } from "/@/hooks/Debouncer";

interface DateFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <input
      type="date"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || null)}
      className="
                rounded-lg
                border border-primary/30
                bg-surface
                px-3 py-1.5
                text-xs
                font-medium
                text-textSecondary
                outline-none
                transition-colors
                duration-150
                focus:border-primary
            "
    />
  );
}

interface FilterDropdownProps {
  label: string;
  options: ColumnFilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
}

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    border
                    px-3 py-1.5
                    text-xs
                    font-medium
                    text-textSecondary
                    transition-colors
                    duration-150
                    ${
                      value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-primary/30 bg-surface hover:border-primary/30 hover:text-textPrimary"
                    }
                `}
      >
        <span>{label}</span>

        {value && selectedLabel && (
          <span
            className="
                            max-w-[110px]
                            truncate
                            rounded-md
                            bg-primary/10
                            px-1.5 py-0.5
                            text-[11px]
                            font-semibold
                            text-primary
                        "
          >
            {selectedLabel}
          </span>
        )}

        <ChevronDown
          className={`
                        h-3.5
                        w-3.5
                        shrink-0
                        transition-transform
                        duration-150
                        ${open ? "rotate-180" : ""}
                    `}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div
          className="
                        absolute
                        left-0
                        top-full
                        z-50
                        mt-1.5
                        min-w-[180px]
                        max-h-60
                        overflow-y-auto
                        rounded-xl
                        border
                        border-primary
                        bg-surface
                        py-1
                        shadow-lg
                    "
        >
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
            className={`
                            block
                            w-full
                            px-3 py-1.5
                            text-left
                            text-xs
                            transition-colors
                            duration-150
                            ${
                              !value
                                ? "font-semibold text-primary"
                                : "text-textSecondary"
                            }
                            hover:bg-primary/5
                        `}
          >
            All {label}
          </button>

          <div className="my-1 h-px bg-border" />

          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`
                                block
                                w-full
                                truncate
                                px-3 py-1.5
                                text-left
                                text-xs
                                transition-colors
                                duration-150
                                ${
                                  value === option.value
                                    ? "font-semibold text-primary"
                                    : "text-textSecondary"
                                }
                                hover:bg-primary/5
                            `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface TableFiltersProps<T> {
  columns: Column<T>[];
}

export function TableFilters<T>({ columns }: TableFiltersProps<T>) {
  const { search, setSearch, filters, setFilter, clearFilters, run } =
    useTableContext<T>();

  const debouncedSearch = useDebounce(search, 500);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    run();
  }, [debouncedSearch, run]);

  const filterableColumns = columns.filter((column) => column.filterType);

  const hasFilters =
    search.trim() !== "" ||
    Object.values(filters).some((value) => value !== null && value !== "");

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">

      <div className="relative">
        <Search
          className="
                        absolute
                        left-3
                        top-1/2
                        h-4 w-4
                        -translate-y-1/2
                        text-primary
                    "
          strokeWidth={2}
        />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
                        h-9
                        w-56
                        rounded-lg
                        border border-primary
                        bg-surface
                        pl-9 pr-3
                        text-sm
                        text-primaryDark
                        outline-none
                        focus:border-primary
                    "
        />
      </div>

      {filterableColumns.map((column) => {
        const filterKey = (column.filterKey ?? column.key) as keyof T;
        const value = filters[filterKey] ?? null;

        if (column.filterType === "date") {
          return (
            <DateFilter
              key={String(column.key)}
              value={value}
              onChange={(nextValue) => setFilter(filterKey, nextValue)}
            />
          );
        }

        if (column.filterType === "select") {
          return (
            <FilterDropdown
              key={String(column.key)}
              label={column.label}
              options={column.options ?? []}
              value={value}
              onChange={(nextValue) => setFilter(filterKey, nextValue)}
            />
          );
        }

        return null;
      })}

      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="
                        h-9
                        rounded-lg
                        border border-border
                        bg-surface
                        px-4
                        text-sm
                        font-medium
                        text-textSecondary
                        transition
                        hover:border-primary/30
                        hover:text-primary
                    "
        >
          Clear
        </button>
      )}
    </div>
  );
}

export function removeNullFilters<T extends object>(
  filters: T,
): {
  [K in keyof T]: Exclude<T[K], null>;
} {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== null),
  ) as {
    [K in keyof T]: Exclude<T[K], null>;
  };
}
