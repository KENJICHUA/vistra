import React from "react";
import { Modal } from "./Modal.jsx";

function DetailField({ label, value, span }) {
  return (
    <div className={span ? "sm:col-span-2" : undefined}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-textMuted">{label}</p>
      <p className="text-sm text-textPrimary">{value || "—"}</p>
    </div>
  );
}

export function DetailModal({ title, onClose, badge, fields, emptyMessage, columns = 2 }) {
  const hasContent = fields && fields.length > 0;

  return (
    <Modal title={title} onClose={onClose} maxWidth="max-w-md">
      {badge && (
        <span
          className={`mb-5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}
        >
          {badge.label}
        </span>
      )}

      {hasContent ? (
        <div className={`grid grid-cols-1 gap-x-6 gap-y-4 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
          {fields.map((field) => (
            <DetailField key={field.label} {...field} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-textMuted">{emptyMessage || "Nothing recorded yet."}</p>
      )}
    </Modal>
  );
}