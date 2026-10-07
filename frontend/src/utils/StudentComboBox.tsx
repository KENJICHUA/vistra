import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
    type MouseEvent,
} from "react";
import { Check, ChevronDown, Search } from "lucide-react";

import { usePatientDebouncedQuery } from "/@/hooks/query/PatientQuery";
import { FieldLabel } from "/@/utils/FieldLabel";
import { PatientProfile } from "/@/api/schema/PatientSchema";

interface StudentComboboxProps {
    selectedStudent: PatientProfile | null;
    onSelect: (student: PatientProfile) => void;
}

export function StudentCombobox({
                                    selectedStudent,
                                    onSelect,
                                }: StudentComboboxProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const patientFilters = {
        search: query.trim() || undefined,
        page: 1,
        page_size: 10,
    };

    const {
        data,
        isLoading,
    } = usePatientDebouncedQuery(patientFilters);
    const patients = data?.items ?? [];
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
            const target = event.target as Node;

            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(target)
            ) {
                setOpen(false);
                setQuery("");
                setActiveIndex(0);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleSelect = (student: PatientProfile): void => {
        onSelect(student);

        setOpen(false);
        setQuery("");
        setActiveIndex(0);
    };

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setQuery(event.target.value);
        setActiveIndex(0);

        if (!open) {
            setOpen(true);
        }
    };

    const handleKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ): void => {
        if (
            !open &&
            (event.key === "ArrowDown" || event.key === "Enter")
        ) {
            setOpen(true);
            return;
        }

        if (!open) {
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();

            setActiveIndex((index) =>
                Math.min(index + 1, patients.length - 1)
            );

            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            setActiveIndex((index) =>
                Math.max(index - 1, 0)
            );

            return;
        }

        if (event.key === "Enter") {
            event.preventDefault();

            const student = patients[activeIndex];

            if (student) {
                handleSelect(student);
            }

            return;
        }

        if (event.key === "Escape") {
            setOpen(false);
            setQuery("");
            setActiveIndex(0);
        }
    };

    const handleFocus = (): void => {
        setOpen(true);
        setQuery("");
        setActiveIndex(0);
    };

    const handleMouseDown = (
        event: React.MouseEvent<HTMLLIElement>
    ): void => {
        // Prevent input from losing focus before onClick runs.
        event.preventDefault();
    };

    return (
        <div
            ref={wrapperRef}
            className="relative sm:col-span-2"
        >
            <FieldLabel htmlFor="studentSearch">
                Name
            </FieldLabel>

            <div className="relative">
                <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted"
                    strokeWidth={2}
                />

                <input
                    id="studentSearch"
                    type="text"
                    autoComplete="off"
                    value={
                        open
                            ? query
                            : selectedStudent
                                ? [
                                    selectedStudent.first_name,
                                    selectedStudent.middle_name,
                                    selectedStudent.last_name,
                                ]
                                    .filter(Boolean)
                                    .join(" ")
                                : query
                    }
                    onFocus={handleFocus}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search existing student by name..."
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-9 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />

                <ChevronDown
                    className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                    strokeWidth={2}
                />
            </div>

            {open && (
                <ul
                    role="listbox"
                    className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border border-border bg-surface py-1.5 shadow-lg"
                >
                    {isLoading ? (
                        <li className="px-3.5 py-3 text-sm text-textMuted">
                            Searching students...
                        </li>
                    ) : patients.length === 0 ? (
                        <li className="px-3.5 py-3 text-sm text-textMuted">
                            No matching student found.
                        </li>
                    ) : (
                        patients.map(
                            (
                                student: PatientProfile,
                                index: number
                            ) => {
                                const isSelected =
                                    selectedStudent?.patient_id === student.patient_id;

                                const isActive =
                                    index === activeIndex;

                                return (
                                    <li
                                        key={student.patient_id}
                                        role="option"
                                        aria-selected={isSelected}
                                        onMouseEnter={() =>
                                            setActiveIndex(index)
                                        }
                                        onMouseDown={handleMouseDown}
                                        onClick={() =>
                                            handleSelect(student)
                                        }
                                        className={`flex cursor-pointer items-center justify-between gap-2 px-3.5 py-2.5 text-sm transition-colors duration-150 ${
                                            isActive
                                                ? "bg-primary/10"
                                                : ""
                                        }`}
                                    >
                                        <span className="flex flex-col">
                                            <span className="font-medium text-textPrimary">
                                                {[student.first_name, student.middle_name, student.last_name]
                                                    .filter(Boolean)
                                                    .join(" ")}
                                            </span>

                                            <span className="text-xs text-textMuted">
                                                {student.course ??
                                                    student.department}
                                                {" · "}
                                                {student.patient_id}
                                            </span>
                                        </span>

                                        {isSelected && (
                                            <Check
                                                className="h-4 w-4 shrink-0 text-primary"
                                                strokeWidth={2}
                                            />
                                        )}
                                    </li>
                                );
                            }
                        )
                    )}
                </ul>
            )}
        </div>
    );
}
