import { useParams } from "react-router-dom";
import { ArrowLeft, ClipboardList, Printer, User } from "lucide-react";

import { InfoField, getInitials } from "/@/utils/RecordInfo";
import { StatusBadge } from "/@/components/StatusBadge";
import LoadingPage from "/@/components/LoadingPage";
import { useMedicalVisitDetail } from "/@/hooks/query/MedicalQuery";
import type { MedicalRecordDetailSchema } from "/@/api/schema/MedicalSchema";

/*
 * Dummy-data toggle: set VITE_USE_DUMMY_MEDICAL=true in
 * frontend/.env (and restart vite) to render the mock below
 * instead of calling the backend. Unset/false = live API.
 */
const USE_DUMMY_DATA =
  import.meta.env.VITE_USE_DUMMY_MEDICAL === "true";

const DUMMY_MEDICAL_VISIT: MedicalRecordDetailSchema = {
  medical_visit_id: "1042",
  patient_name: "Kenji Chua",
  status: "Cleared",
  course: "BS Computer Science",
  staff_name: "Maria Santos",
};

interface MedicalNotFoundProps {
  patientId?: string | null;
  medicalId?: string | null;
}

export function MedicalNotFound({ patientId, medicalId }: MedicalNotFoundProps) {
  return (
    <div className="mx-auto w-full">
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-primaryDark">
          {medicalId
            ? `Medical record No. ${medicalId} not found`
            : "Medical record not found"}
        </h2>

        <p className="mt-2 text-sm text-textMuted">
          There is no medical visit at No. {medicalId ?? "unknown"} for patient{" "}
          <span className="font-medium text-textPrimary">
            {patientId ?? "unknown"}
          </span>
          .
        </p>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-medium text-textSecondary hover:bg-surfaceMuted"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to records
        </button>
      </div>
    </div>
  );
}

export default function PatientRecordView() {
  const { patientId, medicalId } = useParams<{
    patientId: string;
    medicalId: string;
  }>();

  const {
    data: fetchedVisit,
    isLoading,
    isError,
  } = useMedicalVisitDetail(
    USE_DUMMY_DATA ? undefined : patientId,
    USE_DUMMY_DATA ? undefined : medicalId
  );

  const visit = USE_DUMMY_DATA ? DUMMY_MEDICAL_VISIT : fetchedVisit;

  if (!USE_DUMMY_DATA && (!patientId || !medicalId)) {
    return <MedicalNotFound patientId={patientId} medicalId={medicalId} />;
  }

  if (!USE_DUMMY_DATA && isLoading) {
    return <LoadingPage />;
  }

  if (!visit || (!USE_DUMMY_DATA && isError)) {
    return <MedicalNotFound patientId={patientId} medicalId={medicalId} />;
  }

  const handleBack = (): void => {
    window.history.back();
  };

  return (
    <div className="mx-auto w-full">
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
              <StatusBadge status={visit.status} />

              <button
                type="button"
                onClick={() => window.print()}
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
                {getInitials(visit.patient_name)}
              </span>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading text-2xl font-semibold text-primaryDark">
                    {visit.patient_name}
                  </h1>

                  <span className="rounded-md bg-surfaceMuted px-2 py-0.5 text-xs text-textMuted">
                    MED-{visit.medical_visit_id}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-textMuted">
                  {patientId && (
                    <span>{patientId}</span>
                  )}
                  <span>•</span>
                  <span>Medical Record</span>
                </div>
              </div>
            </div>
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
            <InfoField label="Course" value={visit.course ?? undefined} />
            <InfoField label="Patient ID" value={patientId} />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <InfoField label="Attending Staff" value={visit.staff_name ?? undefined} />
            <InfoField label="Status" value={visit.status} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between gap-2 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />

              <h2 className="font-heading text-sm font-semibold text-primaryDark">
                Consultation
              </h2>
            </div>
          </div>

          <div className="rounded-xl border border-border p-5">
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <InfoField label="Status" value={visit.status} />
              <InfoField label="Course" value={visit.course ?? undefined} />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <InfoField label="Attending Staff" value={visit.staff_name ?? undefined} />
              <InfoField label="Patient" value={visit.patient_name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
