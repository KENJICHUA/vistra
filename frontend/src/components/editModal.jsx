import { useState } from "react";
import { X } from "lucide-react";

export const patientEditFields = [
  { key: "name", label: "Full name", required: true },
  { key: "status", label: "Status", type: "select", options: ["Cleared", "Not Cleared"] },
  { key: "studentId", label: "Student ID" },
  { key: "yearSection", label: "Year & section" },
  { key: "age", label: "Age" },
  { key: "sex", label: "Sex", type: "select", options: ["Male", "Female", "Other"] },
  { key: "civilStatus", label: "Civil status" },
  { key: "birthday", label: "Birthday", type: "date" },
  { key: "mobileNumber", label: "Mobile number" },
  { key: "barangay", label: "Barangay" },
  { key: "address", label: "Address" },
];

export const dentalEditFields = [
  { key: "name", label: "Full name", required: true },
  { key: "studentId", label: "Student ID" },
  { key: "yearSection", label: "Year & section" },
  { key: "age", label: "Age" },
  {
    key: "sex",
    label: "Sex",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  { key: "date", label: "Exam date", type: "date" },
  { key: "lastVisit", label: "Last dental visit" },
  {
    key: "floss",
    label: "Flosses regularly",
    type: "select",
    options: ["Yes", "No"],
  },
  { key: "brushFrequency", label: "Brushing frequency" },
  {
    key: "calculus",
    label: "Calculus",
    type: "select",
    options: ["None", "Light", "Moderate", "Heavy"],
  },
  { key: "medication", label: "Medication" },
  { key: "notes", label: "Notes", type: "textarea", span: true },
];

export function Modal({
  title,
  onClose,
  children,
  footer,
  maxWidth = "max-w-2xl",
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-2xl border border-border bg-surface shadow-lg`}
      >
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

        <div className="space-y-6 px-6 py-6">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40";

function FormField({ field, value, onChange }) {
  const {
    key,
    label,
    type = "text",
    options,
    required,
    span,
  } = field;

  return (
    <label className={`flex flex-col gap-1.5 ${span ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-medium text-textMuted">{label}</span>

      {type === "select" ? (
        <select
          className={inputClass}
          value={value ?? ""}
          onChange={(e) => onChange(key, e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          className={`${inputClass} resize-none`}
          rows={4}
          value={value ?? ""}
          onChange={(e) => onChange(key, e.target.value)}
          required={required}
        />
      ) : (
        <input
          type={type}
          className={inputClass}
          value={value ?? ""}
          onChange={(e) => onChange(key, e.target.value)}
          required={required}
        />
      )}
    </label>
  );
}

export function EditRecordModal({
  title = "Edit record",
  fields,
  data,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(data);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-textSecondary hover:bg-surfaceMuted"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="edit-record-form"
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primaryDark"
          >
            Save changes
          </button>
        </>
      }
    >
      <form
        id="edit-record-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {fields.map((field) => (
          <FormField
            key={field.key}
            field={field}
            value={form[field.key]}
            onChange={update}
          />
        ))}
      </form>
    </Modal>
  );
}