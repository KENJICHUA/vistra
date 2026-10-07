import { medRecords } from "../pages/admin/medical/medicalData.tsx";
import { dentalRecords } from "../pages/admin/dental/DentalData.tsx";

export const recordLimit = 8;

export function buildClinicalRecords() {
  const medical = medRecords.map((record) => ({ ...record, department: "Medical" }));
  const dental = dentalRecords.map((record) => ({ ...record, department: "Dental" }));
  return [...medical, ...dental];
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

export class parseTimeToday {
}