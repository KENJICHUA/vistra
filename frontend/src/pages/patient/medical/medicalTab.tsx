import React, { useState } from "react";
import { User, ClipboardList, Printer } from "lucide-react";

import { InfoField, getInitials } from "/@/utils/RecordInfo.jsx";
import { StatusBadge } from "/@/components/StatusBadge";
import { VisitTimeline } from "/@/components/VisitTimeline";
import { VisitDetailModal } from "/@/components/VisitDetailModal";
import { sessionManager } from "/@/utils/SessionManager";

import { Patient, Visit } from "/@/types/types";
import { myMedicalRecords, myVisits, emptyMedicalRecord } from "./medicalData";

// Falls back to this ID while there's no backend/session wiring yet, so
// this page always shows the static data instead of coming up empty.
const DEFAULT_STUDENT_ID = "20230518-S";

export default function PatientMedicalTab() {
  const user = sessionManager.getUser();
  const sessionId = user?.user_id ?? "";
  const studentId = myMedicalRecords[sessionId] ? sessionId : DEFAULT_STUDENT_ID;

  const patientData = myMedicalRecords[studentId] ?? emptyMedicalRecord;
  const visitData = myVisits[studentId] ?? [];

  const [viewingVisit, setViewingVisit] = useState<Visit | null>(null);

  const hasRecord = Boolean(patientData.recordId);

  if (!hasRecord) {
    return (
      <div className="mx-auto w-full rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="text-sm text-textMuted">
          We couldn't find a medical record for your account yet. If you've recently
          had a clinic visit, check back soon or contact the clinic.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full">
      {viewingVisit && (
        <VisitDetailModal visit={viewingVisit} onClose={() => setViewingVisit(null)} />
      )}

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

        <div className="relative p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between">
            <h1 className="font-heading text-lg font-semibold text-primaryDark">
              My Medical Record
            </h1>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-textSecondary hover:bg-surfaceMuted"
            >
              <Printer className="h-3.5 w-3.5" />
              Print record
            </button>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
                {getInitials(patientData.name)}
              </span>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading text-2xl font-semibold text-primaryDark">
                    {patientData.name}
                  </h2>

                  <span className="rounded-md bg-surfaceMuted px-2 py-0.5 text-xs text-textMuted">
                    {patientData.recordId}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-textMuted">
                  {patientData.studentId && <span>{patientData.studentId}</span>}
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
            <InfoField label="Year and Section" value={patientData.yearSection} />
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
            <InfoField label="Mobile Number" value={patientData.mobileNumber} />
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
            <VisitTimeline visits={visitData} onView={setViewingVisit} />
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