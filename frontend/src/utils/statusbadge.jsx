import { statusStyles, statusLabels } from "../pages/admin/appointments/appointmentsData";

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}</span>
  );
}