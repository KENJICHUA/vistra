import React from "react";
import { ChevronRight } from "lucide-react";
import { getInitials, avatarColor } from "../../../utils/avatar";
import { StatusBadge } from "../../../utils/statusbadge";

const defaultColumns = [
  {
    key: "student",
    label: "Student",
    render: (appointment) => (
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${avatarColor(
            appointment.student
          )}`}
        >
          {getInitials(appointment.student)}
        </span>
        <span className="text-sm font-medium text-textPrimary">{appointment.student}</span>
      </div>
    ),
  },
  { key: "course", label: "Course" },
  { key: "time", label: "Time" },
  { key: "type", label: "Type" },
  {
    key: "status",
    label: "Status",
    render: (appointment) => <StatusBadge status={appointment.status} />,
  },
];

export default function AppointmentsTable({ appointments, columns = defaultColumns }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            {columns.map((col) => (
              <th
                key={col.key}
                className="border-b border-border pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted"
              >
                {col.label}
              </th>
            ))}
            <th className="border-b border-border pb-2" />
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-b border-border last:border-b-0">
              {columns.map((col) => (
                <td key={col.key} className="py-3 pr-4 text-sm text-textSecondary">
                  {col.render ? col.render(appointment) : appointment[col.key]}
                </td>
              ))}
              <td className="py-3 text-right">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors duration-200 hover:text-primaryDark"
                >
                  View
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center text-sm text-textMuted">
                No appointments match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}