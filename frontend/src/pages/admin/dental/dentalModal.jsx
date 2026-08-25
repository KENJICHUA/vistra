import { DetailModal } from "../../../components/viewModal.jsx";

export const conditionLabels = {
  sound: "Sound (/)",
  decayed: "Decayed (D)",
  filled: "Filled (F)",
  missing: "Missing (M)",
  extraction: "Indicated for extraction (X)",
  unerupted: "Unerupted (Un)",
  supernumerary: "Supernumerary (Sn)",
};

export const conditionBadgeStyles = {
  sound: "border-emerald-200 bg-emerald-50 text-emerald-700",
  decayed: "border-red-200 bg-red-50 text-red-700",
  filled: "border-blue-200 bg-blue-50 text-blue-700",
  missing: "border-textMuted/30 bg-textMuted/5 text-textSecondary",
  extraction: "border-orange-200 bg-orange-50 text-orange-700",
  unerupted: "border-textMuted/30 bg-textMuted/5 text-textSecondary",
  supernumerary: "border-purple-200 bg-purple-50 text-purple-700",
};


export function ToothViewModal({ toothNumber, record, onClose }) {
  return (
    <DetailModal
      title={`Tooth ${toothNumber}`}
      onClose={onClose}
      badge={
        record
          ? {
              label: conditionLabels[record.condition] || record.condition,
              className: conditionBadgeStyles[record.condition] || conditionBadgeStyles.sound,
            }
          : undefined
      }
      fields={
        record
          ? [
              { label: "Dentition", value: record.dentition === "temporary" ? "Temporary" : "Permanent" },
              { label: "Notes", value: record.notes, span: true },
            ]
          : []
      }
      emptyMessage="No record for this tooth — assumed sound."
    />
  );
}