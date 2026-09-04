import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  ClipboardList,
  Printer,
  Pencil,
} from "lucide-react";
import { InfoField, getInitials } from "/@/utils/RecordInfo.jsx";
import { EditRecordModal, patientEditFields } from "/@/components/editModal.jsx";
import { StatusBadge } from "/@/components/statusbadge.jsx";

const visitEditFields = [
  {
    name: "date",
    label: "Visit Date",
    type: "date",
  },
  {
    name: "complaint",
    label: "Chief Complaint",
    type: "text",
  },
  {
    name: "treatment",
    label: "Treatment",
    type: "textarea",
  },
];

function VisitRow({ visit, isLast, onEdit }) {
  const formatted = new Date(visit.date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li className="relative flex gap-4 pb-7 pl-1 last:pb-0">
      {!isLast && (
        <span
          className="absolute left-[7px] top-3 h-full w-px bg-border"
          aria-hidden="true"
        />
      )}

      <span className="relative mt-2 h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-surface" />

      <div className="min-w-0 flex-1">
        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primaryDark">
          {formatted}
        </span>

        <div className="mt-2 rounded-xl border border-l-4 border-border border-l-primary/50 bg-surfaceMuted/40 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-textPrimary">
                {visit.complaint}
              </p>
              <p className="mt-1 text-sm text-textSecondary">
                {visit.treatment}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onEdit(visit)}
              className="shrink-0 rounded-md p-1.5 text-textMuted hover:bg-surfaceMuted hover:text-textPrimary"
              aria-label="Edit visit"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function VisitTimeline({ visits, onEdit }) {
  const byYear = visits.reduce((acc, visit) => {
    const year = new Date(visit.date).getFullYear();
    (acc[year] ||= []).push(visit);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b - a);

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <div key={year}>
          <p className="mb-4 text-sm font-semibold text-textPrimary">
            {year}
          </p>

          <ol>
            {byYear[year].map((visit, index) => (
              <VisitRow
                key={visit.id}
                visit={visit}
                isLast={index === byYear[year].length - 1}
                onEdit={onEdit}
              />
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

const examplePatient = {
  recordId: "MED-1042",
  studentId: "20230810-S",
  name: "Kenji Briones Chua",
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
};

const exampleVisits = [
  {
    id: "v1",
    date: "2026-02-14",
    complaint: "Mild fever, headache",
    treatment: "Paracetamol 500mg, rest advised",
  },
  {
    id: "v2",
    date: "2026-05-03",
    complaint: "Sprained ankle during PE",
    treatment: "Ice compress, elastic bandage applied",
  },
];

export default function PatientRecordView({
  patient = examplePatient,
  visits = exampleVisits,
  onBack,
  onSave,
}) {
  const [patientData, setPatientData] = useState(patient);
  const [visitData, setVisitData] = useState(visits);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState(null);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleSaveRecord = (updatedPatient) => {
    setPatientData(updatedPatient);
    setIsEditOpen(false);

    if (onSave) {
      onSave(updatedPatient);
    }
  };

  const handleSaveVisit = (updatedVisit) => {
    setVisitData((currentVisits) =>
      currentVisits.map((visit) =>
        visit.id === updatedVisit.id ? updatedVisit : visit
      )
    );

    setEditingVisit(null);
  };

  return (
    <div className="mx-auto w-full">
      {isEditOpen && (
        <EditRecordModal
          title="Edit patient record"
          fields={patientEditFields}
          data={patientData}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSaveRecord}
        />
      )}

      {editingVisit && (
        <EditRecordModal
          title="Edit visit"
          fields={visitEditFields}
          data={editingVisit}
          onClose={() => setEditingVisit(null)}
          onSave={handleSaveVisit}
        />
      )}

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

        <div className="relative p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-1.5 py-1 text-xs font-medium text-textMuted hover:text-textPrimary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to records
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-white border border-border px-3 py-1.5 text-xs font-medium hover:bg-surfaceMuted"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit record
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-textSecondary hover:bg-surfaceMuted"
              >
                <Printer className="h-3.5 w-3.5" />
                Print record
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
                {getInitials(patientData.name)}
              </span>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading text-2xl font-semibold text-primaryDark">
                    {patientData.name}
                  </h1>

                  <span className="rounded-md bg-surfaceMuted px-2 py-0.5 text-xs text-textMuted">
                    {patientData.recordId}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-textMuted">
                  {patientData.studentId && (
                    <span>{patientData.studentId}</span>
                  )}
                  <span>•</span>
                  <span>Medical Record</span>
                </div>
              </div>
            </div>

            <StatusBadge status={patientData.status} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />

              <h2 className="font-heading text-sm font-semibold text-primaryDark">
                Patient Information
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <InfoField label="Course" value={patientData.course} />
            <InfoField
              label="Year and Section"
              value={patientData.yearSection}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <InfoField label="Age" value={patientData.age} />
            <InfoField label="Sex" value={patientData.sex} />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <InfoField label="Civil status" value={patientData.civilStatus} />
            <InfoField label="Birthday" value={patientData.birthday} />
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-5">
            <InfoField
              label="Address"
              value={`${patientData.address}, ${patientData.barangay}`}
            />
            <InfoField
              label="Mobile Number"
              value={patientData.mobileNumber}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between gap-2 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />

              <h2 className="font-heading text-sm font-semibold text-primaryDark">
                Visit Log
              </h2>
            </div>

            <span className="text-xs text-textMuted">
              {visitData.length} visit{visitData.length === 1 ? "" : "s"}
            </span>
          </div>

          {visitData.length > 0 ? (
            <VisitTimeline
              visits={visitData}
              onEdit={setEditingVisit}
            />
          ) : (
            <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-textMuted">
              No visits recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}