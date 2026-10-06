import React from "react";

import {
  Pencil,
  Stethoscope,
  Calendar,
  X,
} from "lucide-react";

import {
  Visit,
  formatVisitDate,
} from "/@/types/types";

interface VisitDetailModalProps {
  visit: Visit;
  onClose: () => void;
  onEdit?: (visit: Visit) => void;
}

export function VisitDetailModal({
  visit,
  onClose,
  onEdit,
}: VisitDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div>
            <p className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primaryDark">
              {formatVisitDate(visit.date)}
            </p>

            <h3 className="mt-2 font-heading text-lg font-semibold text-primaryDark">
              Visit Details
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-textMuted transition-colors hover:bg-surfaceMuted hover:text-textPrimary"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Calendar className="h-4 w-4" />
            </span>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-textMuted">
                Visit Date
              </p>

              <p className="mt-0.5 text-sm text-textPrimary">
                {formatVisitDate(visit.date)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Stethoscope className="h-4 w-4" />
            </span>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-textMuted">
                Attending Doctor
              </p>

              <p className="mt-0.5 text-sm text-textPrimary">
                {visit.doctor || "Not recorded"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-textMuted">
              Findings / Complaint
            </p>

            <p className="mt-1 text-sm leading-relaxed text-textPrimary">
              {visit.complaint || "Not recorded"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-textMuted">
              Treatment Type
            </p>

            <p className="mt-1 text-sm text-textPrimary">
              {visit.treatmentType || "Not recorded"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-textMuted">
              Treatment
            </p>

            <p className="mt-1 text-sm leading-relaxed text-textPrimary">
              {visit.treatment || "Not recorded"}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-textSecondary transition-colors hover:bg-surfaceMuted"
          >
            Close
          </button>

          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(visit)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primaryDark"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit visit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}