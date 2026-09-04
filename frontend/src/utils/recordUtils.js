import { Stethoscope, Syringe, CalendarClock } from "lucide-react";


export const TABS = [
  {
    key: "medical",
    label: "Medical",
    icon: Stethoscope,
    text: "text-primary",
    chip: "bg-primary/10",
  },
  {
    key: "dental",
    label: "Dental",
    icon: Syringe,
    text: "text-info",
    chip: "bg-info/10",
  },
  {
    key: "appointment",
    label: "Appointments",
    icon: CalendarClock,
    text: "text-treatment",
    chip: "bg-treatment/10",
  },
];


export const NameUtil = {
  getFullName(data) {
    return [data.first_name, data.middle_name, data.last_name]
        .filter(Boolean)
        .join(' ');
  },

  getInitials(data) {
    return this.getFullName(data)
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('');
  }
};

export function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function monthKey(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });
}


export function sortRecordsByDateDesc(records) {
  return records.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function groupRecordsByMonth(records) {
  const map = new Map();
  for (const record of records) {
    const key = monthKey(record.date);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(record);
  }
  return Array.from(map.entries());
}


export function findPatientById(patientRecords, id) {
  return patientRecords.find((p) => p.id === id) || null;
}

export function isValidPatient(patient) {
  return Boolean(patient && patient.id && patient.name);
}

export function isValidRecord(record) {
  if (!record || !record.id || !record.title) return false;
  const d = new Date(record.date);
  return !Number.isNaN(d.getTime());
}

export function sanitizeRecords(records = {}) {
  const clean = {};
  for (const key of Object.keys(records)) {
    clean[key] = (records[key] || []).filter(isValidRecord);
  }
  return clean;
}

export function getPatientSubLine(patient) {
  if (!patient) return "";
  const isStudent = patient.userType === "Student";
  return isStudent
    ? [patient.course, patient.yearSection].filter(Boolean).join(" • ")
    : patient.department || "";
}

export function isStudentPatient(patient) {
  return patient?.userType === "Student";
}
