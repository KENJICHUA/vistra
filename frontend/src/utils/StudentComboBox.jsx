import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { FieldLabel } from "./FieldLabel";

export function StudentCombobox({ studentList, selectedStudent, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return studentList;
    return studentList.filter(
      (s) => s.name.toLowerCase().includes(q) || s.course.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    );
  }, [query, studentList]);

  const handleSelect = (student) => {
    onSelect(student);
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const handleKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) handleSelect(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="relative sm:col-span-2" ref={wrapperRef}>
      <FieldLabel htmlFor="studentSearch">Name</FieldLabel>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted" strokeWidth={2} />
        <input
          id="studentSearch"
          type="text"
          autoComplete="off"
          value={open ? query : selectedStudent ? selectedStudent.name : query}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
            if (!open) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search existing student by name..."
          className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-9 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <ChevronDown
          className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </div>

      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-border bg-surface py-1.5 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-3.5 py-3 text-sm text-textMuted">No matching student found.</li>
          ) : (
            filtered.map((student, i) => {
              const isSelected = selectedStudent?.id === student.id;
              const isActive = i === activeIndex;
              return (
                <li
                  key={student.id}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(student)}
                  className={`flex cursor-pointer items-center justify-between gap-2 px-3.5 py-2.5 text-sm transition-colors duration-150 ${
                    isActive ? "bg-primary/10" : ""
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="font-medium text-textPrimary">{student.name}</span>
                    <span className="text-xs text-textMuted">{student.course} &middot; {student.id}</span>
                  </span>
                  {isSelected && <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}