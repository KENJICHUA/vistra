import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Hourglass,
  RotateCcw,
  CalendarDays,
  Clock,
  ClipboardList,
  GraduationCap,
} from "lucide-react";

const exampleAppointment = {
  id: "APT-1042",
  student: "Kenji Chua",
  course: "BS Computer Science",
  time: "9:00 AM",
  type: "Medical Consultation",
  status: "pending",
};

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const STATUS_META = {
  pending: {
    label: "Pending",
    icon: Hourglass,
    text: "text-warning",
    chip: "bg-warning/10",
    dot: "bg-warning",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    text: "text-success",
    chip: "bg-success/10",
    dot: "bg-success",
  },
  declined: {
    label: "Declined",
    icon: XCircle,
    text: "text-danger",
    chip: "bg-danger/10",
    dot: "bg-danger",
  },
};

function InfoField({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-border bg-surfaceMuted/30 px-4 py-3">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
        <p className="text-[10px] font-semibold uppercase tracking-wide text-textMuted">
          {label}
        </p>
      </div>

      <p className="mt-1.5 text-sm font-medium text-textPrimary">
        {value || "—"}
      </p>
    </div>
  );
}

export default function AppointmentDetailView({
  appointment = exampleAppointment,
  onBack,
  onStatusChange,
}) {
  const [status, setStatus] = useState(appointment.status);
  const [decliningReason, setDecliningReason] = useState(false);
  const [reason, setReason] = useState("");

  const meta = STATUS_META[status] || STATUS_META.pending;
  const StatusIcon = meta.icon;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const applyStatus = (next, extra) => {
    setStatus(next);
    setDecliningReason(false);
    onStatusChange?.(appointment.id, next, extra);
  };

  const confirmDecline = () => {
    applyStatus("declined", reason.trim() || undefined);
    setReason("");
  };

  return (
    <div className="mx-auto w-full">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

        <div className="relative p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-1.5 py-1 text-xs font-medium text-textMuted hover:text-textPrimary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to appointments
            </button>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
                {getInitials(appointment.student)}
              </span>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-heading text-2xl font-semibold text-primaryDark">
                    {appointment.student}
                  </h1>

                  <span className="rounded-md bg-surfaceMuted px-2 py-0.5 font-mono text-xs text-textMuted">
                    {appointment.id}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-textMuted">
                  <span>{appointment.course}</span>
                  <span>•</span>
                  <span>Appointment</span>
                </div>
              </div>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${meta.chip} ${meta.text}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {meta.label}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-y-5 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />

              <h2 className="font-heading text-sm font-semibold text-primaryDark">
                Appointment Information
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <InfoField
              icon={CalendarDays}
              label="Appointment Date"
              value={appointment.date}
            />

            <InfoField
              icon={Clock}
              label="Appointment Time"
              value={appointment.time}
            />

            <InfoField
              icon={ClipboardList}
              label="Appointment Type"
              value={appointment.type}
            />

            <InfoField
              icon={GraduationCap}
              label="Course"
              value={appointment.course}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8 lg:col-span-2">
          <div className="border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />

              <h2 className="font-heading text-sm font-semibold text-primaryDark">
                Appointment Notes
              </h2>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-border bg-surfaceMuted/20 px-4 py-4 text-sm text-textMuted">
            No additional notes were submitted with this appointment.
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <div className="mb-4">
              <h2 className="font-heading text-sm font-semibold text-primaryDark">
                Update Status
              </h2>

              <p className="mt-1 text-xs text-textMuted">
                Update the appointment status based on the clinic's decision.
              </p>
            </div>

            {decliningReason ? (
              <div className="rounded-xl border border-danger/25 bg-danger/5 p-4">
                <label className="block text-xs font-medium text-textSecondary">
                  Reason for declining{" "}
                  <span className="text-textMuted">(optional)</span>
                </label>

                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  placeholder="e.g. Schedule conflict — ask student to rebook"
                  className="mt-2 w-full resize-none rounded-lg border border-border bg-surface p-3 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/20"
                />

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={confirmDecline}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-danger px-4 py-2 text-xs font-medium text-white hover:opacity-90"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Confirm decline
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDecliningReason(false);
                      setReason("");
                    }}
                    className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-textSecondary hover:bg-surfaceMuted"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {status !== "confirmed" && (
                  <button
                    type="button"
                    onClick={() => applyStatus("confirmed")}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white hover:opacity-90"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Confirm appointment
                  </button>
                )}

                {status !== "declined" && (
                  <button
                    type="button"
                    onClick={() => setDecliningReason(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-danger/25 bg-danger/10 px-4 py-2 text-xs font-medium text-danger hover:bg-danger/15"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Decline
                  </button>
                )}

                {status !== "pending" && (
                  <button
                    type="button"
                    onClick={() => applyStatus("pending")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-medium text-textSecondary hover:bg-surfaceMuted"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset to pending
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

