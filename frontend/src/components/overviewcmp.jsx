import { medRecords } from "../pages/admin/medical/medicalData";
import { dentalRecords } from "../pages/admin/dental/dentalData";

export const recordLimit = 8;

export function buildClinicalRecords() {
  const medical = medRecords.map((record) => ({ ...record, department: "Medical" }));
  const dental = dentalRecords.map((record) => ({ ...record, department: "Dental" }));
  return [...medical, ...dental];
}

export function parseTimeToday(timeStr) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec((timeStr ?? "").trim());
  if (!match) return null;

  let [, hours, minutes, meridiem] = match;
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  if (meridiem.toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (meridiem.toUpperCase() === "AM" && hours === 12) hours = 0;

  const result = new Date();
  result.setHours(hours, minutes, 0, 0);
  return result;
}

const clinicalDesign = {
  Medical: { badge: "border-primary/30 bg-primary/10 text-primary", dot: "bg-primary", ring: "ring-primary/20" },
  Dental: { badge: "border-heartRate/30 bg-heartRate/10 text-heartRate", dot: "bg-heartRate", ring: "ring-heartRate/20" },
};

export function DepartmentBadge({ department }) {
  const style = clinicalDesign[department];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${style.badge}`}>
      {department}
    </span>
  );
}