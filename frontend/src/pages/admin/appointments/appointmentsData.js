export const APPOINTMENTS = [
  { id: "APT-1042", student: "Kenji Chua", course: "BS Computer Science", time: "9:00 AM", type: "Medical Consultation", status: "pending" },
  { id: "APT-1043", student: "Ivan Mejorada", course: "BS Business Administration", time: "9:30 AM", type: "Follow-up", status: "confirmed" },
  { id: "APT-1044", student: "Cjay Gonzales", course: "BS Psychology", time: "10:00 AM", type: "Dental Consultation", status: "declined" },
  { id: "APT-1045", student: "Joshua Lapitan", course: "BS Nursing", time: "10:15 AM", type: "Fit to Work Certificate", status: "pending" },
];

export const statusStyles = {
  confirmed: "border-primary/30 bg-primary/10 text-primary",
  pending: "border-warning/30 bg-warning/10 text-warning",
  declined: "border-danger/30 bg-danger/10 text-danger",
};

export const statusLabels = {
  confirmed: "Confirmed",
  pending: "Pending",
  declined: "Declined",
};

export function filterByQuery(items, query, fields) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((item) =>
    fields.some((field) => String(item[field]).toLowerCase().includes(normalized))
  );
}