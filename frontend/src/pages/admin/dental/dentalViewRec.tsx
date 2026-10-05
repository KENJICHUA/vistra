import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ClipboardList, Printer, User } from "lucide-react";
import { InfoField, getInitials } from "/@/utils/RecordInfo";
import {
  ToothArch,
  upperTeeth,
  lowerTeeth,
} from "/@/components/teethDesign.jsx";
import LoadingPage from "/@/components/LoadingPage";
import { StatusBadge } from "/@/components/StatusBadge";
import { useDentalVisitDetail } from "/@/hooks/DentalQuery";
import { formatDate } from "/@/utils/FormatDate";

interface DentalNotFoundProps {
  patientId?: string | null;
  dentalId?: string | null;
}

export function DentalNotFound({ patientId, dentalId }: DentalNotFoundProps) {
  return (
    <div className="mx-auto w-full">
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-primaryDark">
          {dentalId
            ? `Dental record No. ${dentalId} not found`
            : "Dental record not found"}
        </h2>

        <p className="mt-2 text-sm text-textMuted">
          There is no dental visit at No. {dentalId ?? "unknown"} for patient{" "}
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

function noop(): void {}

export default function DentalRecordView() {
  const { patientId, dentalId } = useParams<{
    patientId: string;
    dentalId: string;
  }>();

  if (!patientId || !dentalId) {
    return <DentalNotFound patientId={patientId} dentalId={dentalId} />;
  }

  const {
    data: record,
    isLoading,
    isError,
  } = useDentalVisitDetail(patientId, dentalId);

  const toothRecords = useMemo(() => {
    const map: Record<
      number,
      { dentition: string; condition: string; notes: string | null }
    > = {};

    for (const tooth of record?.tooth_records ?? []) {
      map[tooth.tooth_number] = {
        dentition: tooth.dentition ?? "permanent",
        condition: tooth.condition,
        notes: tooth.notes,
      };
    }

    return map;
  }, [record]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !record) {
    return <DentalNotFound patientId={patientId} dentalId={dentalId} />;
  }

  const handleBack = (): void => {
    window.history.back();
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
              <StatusBadge status={record.status} />

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
              {getInitials(record.patient_name)}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-semibold text-primaryDark">
                  {record.patient_name}
                </h1>

                <span className="rounded-full border border-border bg-surfaceMuted px-2.5 py-1 text-[10px] font-semibold text-textSecondary">
                  DEN-{record.dental_visit_id}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-textMuted">
                {record.patient_id && <span>{record.patient_id}</span>}
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

          <div className="flex flex-col gap-y-4 p-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoField label="Course" value={record.course ?? undefined} />
              <InfoField
                label="Year and Section"
                value={record.year_section ?? undefined}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoField label="Age" value={record.age ?? undefined} />
              <InfoField label="Sex" value={record.sex ?? undefined} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoField
                label="Civil status"
                value={record.civil_status ?? undefined}
              />
              <InfoField
                label="Birthday"
                value={
                  record.birthday ? formatDate(record.birthday) : undefined
                }
              />
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-5">
              <InfoField
                label="Address"
                value={
                  record.address
                    ? `${record.address}${
                        record.barangay ? `, ${record.barangay}` : ""
                      }`
                    : undefined
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <InfoField
                label="Mobile Number"
                value={record.mobileNumber ?? undefined}
              />
              <InfoField
                label="Exam Date"
                value={
                  record.dental_visit_date
                    ? formatDate(record.dental_visit_date)
                    : undefined
                }
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface shadow-sm lg:col-span-2">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />
              <div>
                <h2 className="font-heading text-sm font-semibold text-primaryDark">
                  Dental Examination
                </h2>
                <p className="text-xs text-textMuted">
                  {record.last_visit
                    ? `Last visit: ${record.last_visit}`
                    : "Visit record details below."}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 border-b border-border pb-5">
              <InfoField
                label="Flosses Regularly"
                value={record.floss ?? undefined}
              />
              <InfoField
                label="Brushing Frequency"
                value={record.brush_frequency ?? undefined}
              />
              <InfoField label="Calculus" value={record.calculus ?? undefined} />
              <InfoField
                label="Medication"
                value={record.medication ?? undefined}
              />
            </div>

            {record.medical_history.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2 border-b border-border pb-5">
                {record.medical_history.map((entry) => (
                  <span
                    key={entry}
                    className="rounded-full border border-border bg-surfaceMuted px-2.5 py-1 text-[11px] font-medium text-textSecondary"
                  >
                    {entry}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-textMuted">
                Dental Chart
              </p>

              <div className="overflow-x-auto rounded-xl border border-border bg-background p-5">
                <ToothArch
                  teeth={upperTeeth}
                  flip={false}
                  records={toothRecords}
                  onToothClick={noop}
                />

                <div className="my-5 border-t border-dashed border-border" />

                <ToothArch
                  teeth={lowerTeeth}
                  flip={true}
                  records={toothRecords}
                  onToothClick={noop}
                />
              </div>
            </div>

            <div className="mt-6">
              <InfoField
                label="Clinical Notes"
                value={record.notes ?? undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
