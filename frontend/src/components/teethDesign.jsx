import React, { useState } from "react";
import { X } from "lucide-react";

export const upperTeeth = [
  18, 17, 16, 15, 14, 13, 12, 11,
  21, 22, 23, 24, 25, 26, 27, 28,
];

export const lowerTeeth = [
  48, 47, 46, 45, 44, 43, 42, 41,
  31, 32, 33, 34, 35, 36, 37, 38,
];

const conditionOptions = [
  { value: "sound", label: "Sound (/)" },
  { value: "decayed", label: "Decayed (D)" },
  { value: "filled", label: "Filled (F)" },
  { value: "missing", label: "Missing (M)" },
  { value: "extraction", label: "Indicated for extraction (X)" },
  { value: "unerupted", label: "Unerupted (Un)" },
  { value: "supernumerary", label: "Supernumerary (Sn)" },
];

export const conditionDesign = {
  sound: {
    fill: "fill-background",
    stroke: "stroke-textSecondary",
  },
  decayed: {
    fill: "fill-red-100",
    stroke: "stroke-red-500",
  },
  filled: {
    fill: "fill-blue-100",
    stroke: "stroke-blue-500",
  },
  missing: {
    fill: "fill-background",
    stroke: "stroke-textMuted",
    dashed: true,
  },
  extraction: {
    fill: "fill-orange-100",
    stroke: "stroke-orange-500",
  },
  unerupted: {
    fill: "fill-background",
    stroke: "stroke-textMuted",
    dashed: true,
  },
  supernumerary: {
    fill: "fill-purple-100",
    stroke: "stroke-purple-500",
  },
};

export function getToothType(number) {
  const last = number % 10;

  if (last === 1 || last === 2) return "incisor";
  if (last === 3) return "canine";
  if (last === 4 || last === 5) return "premolar";

  return "molar";
}

export function ToothShape({ type, flip, className, dashed }) {
  const dashProps = dashed ? { strokeDasharray: "3 2.5" } : {};

  const crowns = {
    incisor: (
      <path
        d="M16 4 C10.5 4 7 7 7 11.5 C7 15 8 17.5 9 20 C9.6 21.5 10.5 22.5 16 22.5 C21.5 22.5 22.4 21.5 23 20 C24 17.5 25 15 25 11.5 C25 7 21.5 4 16 4 Z"
        {...dashProps}
      />
    ),
    canine: (
      <path
        d="M16 3 C11 3 8 6.5 8 11 C8 14 9 16 10.5 18.5 C12.5 22 14.5 27 16 27 C17.5 27 19.5 22 21.5 18.5 C23 16 24 14 24 11 C24 6.5 21 3 16 3 Z"
        {...dashProps}
      />
    ),
    premolar: (
      <path
        d="M16 4 C10 4 6 7.5 6 12.5 C6 16 7.5 18.5 9 20.5 C10 21.8 12 22.5 16 22.5 C20 22.5 22 21.8 23 20.5 C24.5 18.5 26 16 26 12.5 C26 7.5 22 4 16 4 Z M11 11 L16 8 L21 11"
        {...dashProps}
      />
    ),
    molar: (
      <path
        d="M16 4 C9 4 4 7.5 4 13 C4 17 6 19.5 7.5 21.5 C9 23.3 12 24 16 24 C20 24 23 23.3 24.5 21.5 C26 19.5 28 17 28 13 C28 7.5 23 4 16 4 Z M8 12 L13 9 L16 12 L19 9 L24 12"
        {...dashProps}
      />
    ),
  };

  const roots = {
    incisor: (
      <path
        d="M12 22.5 C12 30 13.5 36 16 38 C18.5 36 20 30 20 22.5"
        {...dashProps}
      />
    ),
    canine: (
      <path
        d="M13 24 C13 31 14 36 16 39 C18 36 19 31 19 24"
        {...dashProps}
      />
    ),
    premolar: (
      <path
        d="M11.5 20.5 C11 27 12.5 33 15 36 M20.5 20.5 C21 27 19.5 33 17 36"
        {...dashProps}
      />
    ),
    molar: (
      <path
        d="M9 21 C8.5 27 9.5 32 11.5 35 M16 22 C16 28 16 32 16 35 M23 21 C23.5 27 22.5 32 20.5 35"
        {...dashProps}
      />
    ),
  };

  return (
    <svg
      viewBox="0 0 32 42"
      className={className}
      fill="none"
      strokeWidth="1.25"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <g>
        {roots[type]}
        {crowns[type]}
      </g>
    </svg>
  );
}

export function ToothBox({
  number,
  type,
  flip,
  record,
  onClick,
  verticalOffset,
}) {
  const condition = record?.condition || "sound";
  const style = conditionDesign[condition] || conditionDesign.sound;
  const hasNote = Boolean(record);

  return (
    <button
      type="button"
      onClick={() => onClick(number)}
      className="group flex flex-col items-center gap-0.5 rounded-lg px-0.5 py-1 transition-colors duration-150 hover:bg-primary/5"
      style={{
        transform: `translateY(${flip ? -verticalOffset : verticalOffset}px)`,
      }}
      title={`Tooth ${number}`}
    >
      {!flip && (
        <span
          className={`text-[10px] font-medium ${
            hasNote ? "text-primary" : "text-textMuted"
          }`}
        >
          {number}
        </span>
      )}

      <ToothShape
        type={type}
        flip={flip}
        dashed={style.dashed}
        className={`h-12 w-8 shrink-0 ${style.fill} ${style.stroke} transition-transform duration-150 group-hover:scale-110 ${
          hasNote ? "drop-shadow-sm" : ""
        }`}
      />

      {flip && (
        <span
          className={`text-[10px] font-medium ${
            hasNote ? "text-primary" : "text-textMuted"
          }`}
        >
          {number}
        </span>
      )}

      {hasNote && (
        <span className="mt-0.5 rounded-full bg-primary/10 px-1.5 py-[1px] text-[8px] font-semibold uppercase tracking-wide text-primary">
          {record.dentition === "temporary" ? "Temp" : "Perm"}
        </span>
      )}
    </button>
  );
}

export function archOffset(index, total, amplitude) {
  const center = (total - 1) / 2;
  const t = Math.abs(index - center) / center;

  return Math.pow(t, 1.6) * amplitude;
}

export function ToothArch({
  teeth,
  flip,
  records = {},
  onToothClick,
}) {
  return (
    <div className="flex min-w-max items-end justify-center gap-1">
      {teeth.map((number, index) => (
        <ToothBox
          key={number}
          number={number}
          type={getToothType(number)}
          flip={flip}
          record={records[number]}
          onClick={onToothClick}
          verticalOffset={archOffset(index, teeth.length, 16)}
        />
      ))}
    </div>
  );
}

function ToothModal({ title, onClose, children, footer }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-surface shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-heading text-base font-semibold text-primaryDark">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-textMuted hover:bg-surfaceMuted hover:text-textPrimary"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-6">{children}</div>

        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          {footer}
        </div>
      </div>
    </div>
  );
}

export function ToothNoteModal({
  toothNumber,
  initialRecord,
  onSave,
  onClear,
  onClose,
}) {
  const [dentition, setDentition] = useState(
    initialRecord?.dentition || "permanent"
  );
  const [condition, setCondition] = useState(
    initialRecord?.condition || "sound"
  );
  const [notes, setNotes] = useState(initialRecord?.notes || "");

  return (
    <ToothModal
      title={`Tooth ${toothNumber}`}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-textSecondary hover:text-red-500"
          >
            Clear note
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-textSecondary hover:bg-background"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSave({ dentition, condition, notes })}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primaryDark"
          >
            Save
          </button>
        </>
      }
    >
      <div>
        <p className="mb-2 text-xs font-medium text-textMuted">Dentition</p>

        <div className="flex gap-5">
          <label className="flex items-center gap-2 text-sm text-textPrimary">
            <input
              type="radio"
              name={`dentition-${toothNumber}`}
              value="permanent"
              checked={dentition === "permanent"}
              onChange={(e) => setDentition(e.target.value)}
            />
            Permanent
          </label>

          <label className="flex items-center gap-2 text-sm text-textPrimary">
            <input
              type="radio"
              name={`dentition-${toothNumber}`}
              value="temporary"
              checked={dentition === "temporary"}
              onChange={(e) => setDentition(e.target.value)}
            />
            Temporary
          </label>
        </div>
      </div>

      <div>
        <label
          htmlFor="tooth-condition"
          className="mb-2 block text-xs font-medium text-textMuted"
        >
          Condition
        </label>

        <select
          id="tooth-condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {conditionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="tooth-notes"
          className="mb-2 block text-xs font-medium text-textMuted"
        >
          Notes
        </label>

        <textarea
          id="tooth-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Add notes for this tooth..."
          className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
    </ToothModal>
  );
}