import {Status} from "/@/components/StatusBadge";
import {PatientInfo} from "/@/api/schema/PatientSchema";

export type PatientRecordTab = keyof Pick<
    PatientInfo,
    "appointment" | "medical" | "dental"
>;

export type TreatmentType =
  | "Medicine"
  | "Procedure"
  | "Advice"
  | "Referral"
  | "Other";

export const treatmentTypeOptions: TreatmentType[] = [
  "Medicine",
  "Procedure",
  "Advice",
  "Referral",
  "Other",
];

export interface Visit {
  id: string;
  date: string;
  doctor?: string;
  complaint: string;
  treatmentType?: TreatmentType;
  treatment: string;
}

export interface Patient {
  recordId: string;
  studentId?: string;
  name: string;
  address: string;
  barangay: string;
  age: string;
  mobileNumber: string;
  sex: string;
  birthday: string;
  civilStatus: string;
  yearSection: string;
  course: string;
  status: Status;
}

export type EditFieldType = "date" | "text" | "textarea" | "select";

export interface EditField {
  name: string;
  label: string;
  type: EditFieldType;
  options?: string[];
}

export const visitEditFields: EditField[] = [
  {
    name: "date",
    label: "Visit Date",
    type: "date",
  },
  {
    name: "doctor",
    label: "Attending Doctor",
    type: "text",
  },
  {
    name: "complaint",
    label: "Findings/Complaint",
    type: "text",
  },
  {
    name: "treatmentType",
    label: "Treatment Type",
    type: "select",
    options: ["Medicine", "Procedure", "Advice", "Referral", "Other"],
  },
  {
    name: "treatment",
    label: "Treatment Details",
    type: "textarea",
  },
];

export function formatVisitDate(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}