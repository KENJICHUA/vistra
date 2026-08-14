import React from "react";
import { ChevronRight, Smile, Scissors, Sparkles, Wrench, ClipboardList, FileX2 } from "lucide-react";
import { statusStyles, statusLabels } from "./dentalData";

const TYPE_ICONS = [
  { match: /extract/i, icon: Scissors },
  { match: /prophylaxis|clean/i, icon: Sparkles },
  { match: /filling|repair/i, icon: Wrench },
  { match: /consult|check|exam/i, icon: Smile },
];

function getTypeIcon(type = "") {
  const found = TYPE_ICONS.find((entry) => entry.match.test(type));
  return found ? found.icon : ClipboardList;
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const AVATAR_PALETTE = [
  "bg-primary/10 text-primary",
  "bg-emerald-500/10 text-emerald-600",
  "bg-amber-500/10 text-amber-600",
  "bg-violet-500/10 text-violet-600",
  "bg-rose-500/10 text-rose-600",
];

function avatarColor(name = "") {
  const sum = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}

export default function DentalTable({ dentalRecords }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="text-left">
            <th className="border-b border-border pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">
              Student
            </th>
            <th className="border-b border-border pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">
              Course
            </th>
            <th className="border-b border-border pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">
              Time
            </th>
            <th className="border-b border-border pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">
              Type
            </th>
            <th className="border-b border-border pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">
              Status
            </th>
            <th className="border-b border-border pb-2" />
          </tr>
        </thead>
        <tbody>
          {dentalRecords.map((record) => {
            const TypeIcon = getTypeIcon(record.type);
            return (
              <tr key={record.id} className="group transition-colors duration-150 hover:bg-primary/[0.03]">
                <td className="border-b border-border py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${avatarColor(
                        record.student
                      )}`}
                    >
                      {getInitials(record.student)}
                    </span>
                    <span className="text-sm font-medium text-textPrimary">{record.student}</span>
                  </div>
                </td>
                <td className="border-b border-border py-3 pr-4 text-sm text-textSecondary">{record.course}</td>
                <td className="border-b border-border py-3 pr-4 text-sm text-textSecondary">{record.time}</td>
                <td className="border-b border-border py-3 pr-4">
                  <div className="flex items-center gap-1.5 text-sm text-textSecondary">
                    <TypeIcon className="h-3.5 w-3.5 shrink-0 text-textMuted" strokeWidth={2} />
                    {record.type}
                  </div>
                </td>
                <td className="border-b border-border py-3 pr-4">
                  <StatusBadge status={record.status} />
                </td>
                <td className="border-b border-border py-3 text-right">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-primary transition-colors duration-150 hover:bg-primary/10 hover:text-primaryDark"
                  >
                    View
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </button>
                </td>
              </tr>
            );
          })}
          {dentalRecords.length === 0 && (
            <tr>
              <td colSpan={6} className="py-10 text-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-textMuted/10 text-textMuted">
                    <FileX2 className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="text-sm text-textMuted">No dental records match your search.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}