import React from "react";
import { Pencil, Stethoscope } from "lucide-react";
import { Visit, formatVisitDate } from "/@/types/types";

interface VisitRowProps {
  visit: Visit;
  isLast: boolean;
  onView: (visit: Visit) => void;
  onEdit?: (visit: Visit) => void;
}

export function VisitRow({ visit, isLast, onView, onEdit }: VisitRowProps) {
  const formatted = formatVisitDate(visit.date);

  return (
    <li className="relative flex gap-4 pb-7 pl-1 last:pb-0">
      {!isLast && (
        <span
          className="absolute left-[7px] top-3 h-full w-px bg-border"
          aria-hidden="true"
        />
      )}

      <span className="relative mt-2 h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-surface" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primaryDark">
            {formatted}
          </span>

          {visit.doctor && (
            <span className="inline-flex items-center gap-1 text-xs text-textMuted">
              <Stethoscope className="h-3 w-3" />
              {visit.doctor}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onView(visit)}
          className="mt-2 w-full rounded-xl border border-l-4 border-border border-l-primary/50 bg-surfaceMuted/40 p-4 text-left transition-colors hover:bg-surfaceMuted/70"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-2.5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-textMuted">
                  Findings/Complaint
                </p>
                <p className="mt-0.5 truncate text-sm font-medium text-textPrimary">
                  {visit.complaint}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-textMuted">
                  Treatment
                  {visit?.treatmentType ? ` · ${visit?.treatmentType}` : ""}
                </p>
                <p className="mt-0.5 line-clamp-1 text-sm text-textSecondary">
                  {visit.treatment}
                </p>
              </div>

              <p className="text-xs font-medium text-primary">View details</p>
            </div>

            {onEdit && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(visit);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    onEdit(visit);
                  }
                }}
                className="shrink-0 rounded-md p-1.5 text-textMuted hover:bg-surface hover:text-textPrimary"
                aria-label="Edit visit"
              >
                <Pencil className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </button>
      </div>
    </li>
  );
}

