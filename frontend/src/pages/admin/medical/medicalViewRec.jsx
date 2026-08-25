import React from "react";
import { ArrowLeft, User, ClipboardList, CheckCircle2, AlertCircle, Phone, MapPin, Printer } from "lucide-react";
import { InfoField, getInitials } from "../../../utils/RecordInfo.jsx";

function StatusBadge({ status }) {
  const isCleared = status === "Cleared";
  const Icon = isCleared ? CheckCircle2 : AlertCircle;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
        isCleared
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-amber-200 bg-amber-50 text-amber-700"
      }`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      {status}
    </span>
  );
}

function VisitRow({ visit, isLast }) {
  return (
    <li className="relative flex gap-4 pb-6 pl-1 last:pb-0">
      {!isLast && <span className="absolute left-[7px] top-3 h-full w-px bg-border" aria-hidden="true" />}
      <span className="relative mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary bg-surface" />
      <div className="min-w-0 flex-1 rounded-xl border border-border bg-surfaceMuted/40 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-textMuted">{visit.date}</p>
        <p className="mt-1.5 text-sm font-medium text-textPrimary">{visit.complaint}</p>
        <p className="mt-1 text-sm text-textSecondary">{visit.treatment}</p>
      </div>
    </li>
  );
}


const examplePatient = {
  recordId: "MED-1042",
  studentId: "20230810-S",
  name: "Kenji Chua",
  address: "123 Rizal Street",
  barangay: "Barangay San Isidro",
  age: "21",
  mobileNumber: "0917 234 5678",
  sex: "Male",
  birthday: "2004-03-12",
  civilStatus: "Single",
  yearSection: "BS Computer Science, 4th Year",
  status: "Cleared",
};

const exampleVisits = [
  { id: "v1", date: "2026-02-14", complaint: "Mild fever, headache", treatment: "Paracetamol 500mg, rest advised" },
  { id: "v2", date: "2026-05-03", complaint: "Sprained ankle during PE", treatment: "Ice compress, elastic bandage applied" },
];


export default function PatientRecordView({ patient = examplePatient, visits = exampleVisits, onBack }) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">

        
      <div className="mb-4 flex items-center justify-between mx-6 mt-6">
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs font-medium text-textMuted transition-colors duration-150 hover:bg-surfaceMuted hover:text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to records
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-textSecondary transition-colors duration-150 hover:bg-surfaceMuted hover:text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Printer className="h-3.5 w-3.5" strokeWidth={2} />
          Print record
        </button>

      </div>

   
        <div className="flex flex-col gap-4 border-b border-border bg-gradient-to-b from-surfaceMuted/60 to-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {getInitials(patient.name)}
            </span>
          <div>

              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-xl font-semibold text-primaryDark">{patient.name}</h1>
                <span className="rounded-md bg-surfaceMuted px-2 py-0.5 text-xs font-medium text-textMuted">
                  {patient.recordId}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-textMuted">
                {patient.yearSection} · Student ID {patient.studentId}
              </p>
            </div>
          </div>
          <StatusBadge status={patient.status} />
        </div>

        <div className="p-6 sm:p-8">
    
          <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 rounded-xl border border-border bg-surfaceMuted/30 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-textSecondary">
              <Phone className="h-3.5 w-3.5 text-textMuted" strokeWidth={2} />
              {patient.mobileNumber}
            </div>
            <div className="flex items-center gap-2 text-sm text-textSecondary">
              <MapPin className="h-3.5 w-3.5 text-textMuted" strokeWidth={2} />
              {patient.address}, {patient.barangay}
            </div>
          </div>

       
          <div className="mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-primary" strokeWidth={2} />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">Personal information</h2>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
            <InfoField label="Age" value={patient.age} />
            <InfoField label="Sex" value={patient.sex} />
            <InfoField label="Civil status" value={patient.civilStatus} />
            <InfoField label="Birthday" value={patient.birthday} />
            <InfoField label="Student ID" value={patient.studentId} span />
          </div>


          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-2 border-t border-border pt-6">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" strokeWidth={2} />
                <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">Visit log</h2>
              </div>
              <span className="text-xs text-textMuted">
                {visits.length} visit{visits.length === 1 ? "" : "s"}
              </span>
            </div>

            {visits.length > 0 ? (
              <ol>
                {visits.map((visit, index) => (
                  <VisitRow key={visit.id} visit={visit} isLast={index === visits.length - 1} />
                ))}
              </ol>
            ) : (
              <div className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-textMuted">
                No visits recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}