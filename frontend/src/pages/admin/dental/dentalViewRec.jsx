import React, { useState } from "react";
import { ArrowLeft, ClipboardList, Pencil, Printer, User } from "lucide-react";
import { InfoField, getInitials } from "/@/utils/RecordInfo.jsx";
import {
  ToothArch,
  ToothNoteModal,
  upperTeeth,
  lowerTeeth,
} from "/@/components/teethDesign.jsx";
import { EditRecordModal, dentalEditFields } from "/@/components/editModal.jsx";

const exampleDental = {
  recordId: "DEN-0731",
  name: "Kenji Chua",
  studentId: "20230786-S",
  address: "123 Rizal Street",
  barangay: "Barangay San Isidro",
  age: "21",
  mobileNumber: "0917 234 5678",
  sex: "Male",
  birthday: "2004-03-12",
  civilStatus: "Single",
  yearSection: "4th Year - Section A",
  course: "BS Computer Science",
  status: "cleared",
  date: "2026-06-02",
  lastVisit: "6 months ago",
  floss: "Yes",
  brushFrequency: "2x",
  calculus: "Light",
  medication: "None",
  notes: "Patient reports occasional sensitivity on the upper right molars.",
  medicalHistory: ["Allergy"],
  toothRecords: {
    16: {
      dentition: "permanent",
      condition: "decayed",
      notes: "Mild sensitivity, monitor",
    },
    26: {
      dentition: "permanent",
      condition: "filled",
      notes: "Filled 2025-11-02",
    },
    36: {
      dentition: "permanent",
      condition: "missing",
      notes: "",
    },
  },
};

export default function DentalRecordView({
  record = exampleDental,
  onBack,
  onSave,
}) {
  const [recordData, setRecordData] = useState(record);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleBack = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  const handleSaveRecord = (updatedRecord) => {
    setRecordData(updatedRecord);
    setIsEditOpen(false);
    if (onSave) onSave(updatedRecord);
  };

  const handleSaveTooth = (updatedTooth) => {
    const updatedRecord = {
      ...recordData,
      toothRecords: {
        ...recordData.toothRecords,
        [selectedTooth]: updatedTooth,
      },
    };

    setRecordData(updatedRecord);
    setSelectedTooth(null);

    if (onSave) onSave(updatedRecord);
  };

  const handleClearTooth = () => {
    const toothRecords = { ...recordData.toothRecords };
    delete toothRecords[selectedTooth];

    const updatedRecord = {
      ...recordData,
      toothRecords,
    };

    setRecordData(updatedRecord);
    setSelectedTooth(null);

    if (onSave) onSave(updatedRecord);
  };

  return (
    <div className="mx-auto w-full">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

        <div className="relative p-6">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-textSecondary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to records
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primaryDark"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit record
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-textSecondary hover:bg-surfaceMuted"
              >
                <Printer className="h-3.5 w-3.5" />
                Print
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
              {getInitials(recordData.name)}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-semibold text-primaryDark">
                  {recordData.name}
                </h1>

                <span className="rounded-full border border-border bg-surfaceMuted px-2.5 py-1 text-[10px] font-semibold text-textSecondary">
                  {recordData.recordId}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-textMuted">
                {recordData.studentId && <span>{recordData.studentId}</span>}
                <span>•</span>
                <span>Dental Record</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <h2 className="font-heading text-sm font-semibold text-primaryDark">
                Patient Information
              </h2>
            </div>
          </div>

          <div className="p-6 gap-y-4 flex flex-col">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoField label="Course" value={recordData.course} />
              <InfoField
                label="Year and Section"
                value={recordData.yearSection}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoField label="Age" value={recordData.age} />
              <InfoField label="Sex" value={recordData.sex} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoField label="Civil status" value={recordData.civilStatus} />
              <InfoField label="Birthday" value={recordData.birthday} />
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-5">
              <InfoField
                label="Address"
                value={`${recordData.address}, ${recordData.barangay}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoField label="Mobile Number" value={recordData.mobileNumber} />
              <InfoField label="Exam Date" value={recordData.date} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />
              <div>
                <h2 className="font-heading text-sm font-semibold text-primaryDark">
                  Dental Examination
                </h2>
                <p className="text-xs text-textMuted">
                  Click a tooth to add or edit its record.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 border-b border-border pb-5">
              <InfoField label="Flosses Regularly" value={recordData.floss} />
              <InfoField
                label="Brushing Frequency"
                value={recordData.brushFrequency}
              />
              <InfoField label="Calculus" value={recordData.calculus} />
              <InfoField label="Medication" value={recordData.medication} />
            </div>

            <div className="mt-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-textMuted">
                Dental Chart
              </p>

              <div className="overflow-x-auto rounded-xl border border-border bg-background p-5">
                <ToothArch
                  teeth={upperTeeth}
                  records={recordData.toothRecords || {}}
                  onToothClick={setSelectedTooth}
                />

                <div className="my-5 border-t border-dashed border-border" />

                <ToothArch
                  teeth={lowerTeeth}
                  flip
                  records={recordData.toothRecords || {}}
                  onToothClick={setSelectedTooth}
                />
              </div>
            </div>

            <div className="mt-6">
              <InfoField label="Clinical Notes" value={recordData.notes} />
            </div>
          </div>
        </div>
      </div>

      {selectedTooth && (
        <ToothNoteModal
          toothNumber={selectedTooth}
          initialRecord={recordData.toothRecords?.[selectedTooth]}
          onClose={() => setSelectedTooth(null)}
          onClear={handleClearTooth}
          onSave={handleSaveTooth}
        />
      )}

      {isEditOpen && (
        <EditRecordModal
          title="Edit dental record"
          fields={dentalEditFields}
          data={recordData}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSaveRecord}
        />
      )}
    </div>
  );
}
