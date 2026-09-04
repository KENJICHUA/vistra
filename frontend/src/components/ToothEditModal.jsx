import { useState } from "react";
import { Modal } from "/@/components/editModal.jsx";
import { conditionLabels } from "/@/pages/admin/dental/dentalModal.jsx";

export function ToothEditModal({ toothNumber, record, onClose, onSave }) {
  const [form, setForm] = useState({
    dentition: record?.dentition || "permanent",
    condition: record?.condition || "sound",
    notes: record?.notes || "",
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Modal
      title={`Edit Tooth ${toothNumber}`}
      onClose={onClose}
      footer={
        <>
          <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-textSecondary hover:bg-surfaceMuted">
            Cancel
          </button>
          <button type="submit" form="tooth-edit-form" className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primaryDark">
            Save changes
          </button>
        </>
      }
    >
      <form id="tooth-edit-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-textMuted">Dentition</span>
          <select
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary"
            value={form.dentition}
            onChange={(e) => update("dentition", e.target.value)}
          >
            <option value="permanent">Permanent</option>
            <option value="temporary">Temporary</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-textMuted">Condition</span>
          <select
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary"
            value={form.condition}
            onChange={(e) => update("condition", e.target.value)}
          >
            {Object.entries(conditionLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-textMuted">Notes</span>
          <textarea
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-textPrimary"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Enter notes..."
          />
        </label>
      </form>
    </Modal>
  );
}