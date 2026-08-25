import React, { useState } from "react";
import { ArrowLeft, User, ClipboardList, Printer, Stethoscope } from "lucide-react";
import { ToothArch, upperTeeth, lowerTeeth } from "../../../components/teethDesign.jsx";
import { InfoField, getInitials } from "../../../utils/RecordInfo.jsx";
import { ToothViewModal } from "./dentalModal.jsx"

const exampleDental = {
  recordId: "DEN-0731",
  name: "Kenji Chua",
  age: "21",
  sex: "Male",
  yearSection: "BS Computer Science, 4th Year",
  date: "2026-06-02",
  lastVisit: "6 months ago",
  floss: "Yes",
  brushFrequency: "2x",
  calculus: "Light",
  medication: "None",
  notes: "Patient reports occasional sensitivity on the upper right molars.",
  medicalHistory: ["Allergy"],
  toothRecords: {
    16: { dentition: "permanent", condition: "decayed", notes: "Mild sensitivity, monitor" },
    26: { dentition: "permanent", condition: "filled", notes: "Filled 2025-11-02" },
    36: { dentition: "permanent", condition: "missing", notes: "" },
  },
};

export default function DentalRecordView({ record = exampleDental, onBack }) {
  const [selectedTooth, setSelectedTooth] = useState(null);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const openTooth = (number) => setSelectedTooth(number);
  const closeTooth = () => setSelectedTooth(null);

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
              {getInitials(record.name)}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-xl font-semibold text-primaryDark">{record.name}</h1>
                <span className="rounded-md bg-surfaceMuted px-2 py-0.5 text-xs font-medium text-textMuted">
                  {record.recordId}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-textMuted">
                {record.yearSection} · Exam date {record.date}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-primary" strokeWidth={2} />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">Personal information</h2>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
            <InfoField label="Age" value={record.age} />
            <InfoField label="Sex" value={record.sex} />
            <InfoField label="Year and section" value={record.yearSection} span />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-3">
            <InfoField label="Last dental visit" value={record.lastVisit} />
            <InfoField label="Flosses regularly" value={record.floss} />
            <InfoField label="Brushing frequency" value={record.brushFrequency} />
            <InfoField label="Calculus" value={record.calculus} />
            <InfoField label="Medication" value={record.medication} span />
          </div>

          <div className="mt-10">
            <div className="mb-1 flex items-center gap-2 border-t border-border pt-6">
              <Stethoscope className="h-4 w-4 text-primary" strokeWidth={2} />
              <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">Odontogram</h2>
            </div>
            <p className="mb-4 text-xs text-textMuted">Click a tooth to view its recorded condition.</p>

            <div className="overflow-x-auto rounded-xl border border-border bg-background/40 p-6">
              <div className="mb-2 flex justify-center">
                <ToothArch teeth={upperTeeth} flip={false} records={record.toothRecords} onToothClick={openTooth} />
              </div>
              <div className="mx-auto my-3 h-px w-full max-w-2xl bg-border" />
              <div className="mt-2 flex justify-center">
                <ToothArch teeth={lowerTeeth} flip={true} records={record.toothRecords} onToothClick={openTooth} />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between gap-2 border-t border-border pt-6">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" strokeWidth={2} />
                <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">Medical history</h2>
              </div>
            </div>

            {record.medicalHistory?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {record.medicalHistory.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-surfaceMuted/50 px-3 py-1 text-xs font-medium text-textSecondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-textMuted">No medical history flagged.</p>
            )}
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <InfoField label="Notes" value={record.notes} span />
          </div>
        </div>
      </div>

      {selectedTooth !== null && (
        <ToothViewModal
          toothNumber={selectedTooth}
          record={record.toothRecords[selectedTooth]}
          onClose={closeTooth}
        />
      )}
    </div>
  );
}