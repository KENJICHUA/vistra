import React from "react";
import { CalendarX, ChevronRight, RotateCcw } from "lucide-react";

import {
  Appointment,
  AppointmentStatus,
  STATUS_META,
  getEffectiveSlot,
} from "/@/pages/patient/appointments/appointmentsData";
import { getDateParts } from "/@/utils/DateUtils";

export const STATUS_KEYS: AppointmentStatus[] = ["pending", "approved", "rescheduled", "rejected"];

export type UpcomingFilter = "all" | Exclude<AppointmentStatus, "rejected">;

export const UPCOMING_FILTERS: { key: UpcomingFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rescheduled", label: "Rescheduled" },
];

export interface FilterOption<T extends string> {
  key: T;
  label: string;
  count: number;
  dot?: string;
}

export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: FilterOption<T>[];
  value: T;
  onChange: (key: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex gap-2 overflow-x-auto pb-1">
      {options.map((option) => {
        const active = option.key === value;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.key)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              active
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-textSecondary hover:bg-surfaceMuted/60 hover:text-textPrimary"
            }`}
          >
            {option.dot && <span className={`h-2 w-2 rounded-full ${option.dot}`} />}
            {option.label}
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] leading-none ${
                active ? "bg-white/20 text-white" : "bg-surfaceMuted text-textMuted"
              }`}
            >
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function AppointmentCard({
  appointment,
  onOpen,
}: {
  appointment: Appointment;
  onOpen: () => void;
}) {
  const meta = STATUS_META[appointment.status];
  const slot = getEffectiveSlot(appointment);
  const date = getDateParts(slot.date);
  const original = appointment.status === "rescheduled" ? getDateParts(appointment.date) : null;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-left shadow-sm transition-all hover:border-textMuted/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-surfaceMuted">
        <span className="text-[11px] font-medium uppercase leading-none tracking-wide text-textMuted">
          {date?.monthShort}
        </span>
        <span className="mt-1 font-heading text-xl font-semibold leading-none text-textPrimary">
          {date?.day}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-textPrimary">{appointment.type}</p>
        <p className="mt-0.5 text-xs text-textMuted">
          {date?.weekdayShort}, {slot.time}
        </p>
        {original && (
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-textMuted">
            <RotateCcw className="h-3 w-3 shrink-0" strokeWidth={2} />
            Originally {original.short}, {appointment.time}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-textPrimary">
          <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
          <span className="hidden sm:inline">{meta.label}</span>
        </span>
        <ChevronRight
          className="h-4 w-4 text-textMuted transition-transform group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </div>
    </button>
  );
}

export function Column({
  title,
  items,
  emptyText,
  onOpen,
  toolbar,
}: {
  title: string;
  items: Appointment[];
  emptyText: string;
  onOpen: (id: string) => void;
  toolbar: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2 px-1">
        <h3 className="font-heading text-base font-semibold text-textPrimary">{title}</h3>
        <span className="rounded-md bg-surfaceMuted px-1.5 py-0.5 text-[11px] font-semibold text-textSecondary">
          {items.length}
        </span>
      </div>

      <div className="mb-3 flex min-h-[34px] items-center">{toolbar}</div>

      {items.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {items.map((appointment) => (
            <li key={appointment.id}>
              <AppointmentCard appointment={appointment} onOpen={() => onOpen(appointment.id)} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-12 text-center">
          <CalendarX className="h-5 w-5 text-textMuted" strokeWidth={2} />
          <p className="mt-3 text-sm text-textMuted">{emptyText}</p>
        </div>
      )}
    </section>
  );
}
