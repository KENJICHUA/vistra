import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarPlus, Check, X } from "lucide-react";

import {
  getMyAppointments,
  getAppointmentById,
  Appointment,
  AppointmentStatus,
  STATUS_META,
  getEffectiveSlot,
  resolveStudentId,
} from "./appointmentsData";
import { sessionManager } from "/@/utils/SessionManager";
import { ROUTES } from "/@/config/RoutePaths.js";
import { getDateParts } from "/@/utils/DateUtils";

type StepState = "done" | "current" | "upcoming" | "failed";

interface Step {
  title: string;
  description: string;
  state: StepState;
}

const LABELS: Record<AppointmentStatus, { date: string; time: string }> = {
  pending: { date: "Requested date", time: "Requested time" },
  approved: { date: "Date", time: "Time" },
  rejected: { date: "Requested date", time: "Requested time" },
  rescheduled: { date: "New date", time: "New time" },
};

function buildSteps(status: AppointmentStatus): Step[] {
  const outcome: Record<AppointmentStatus, Step> = {
    pending: {
      title: "Decision",
      description: "You'll see the clinic's decision here.",
      state: "upcoming",
    },
    approved: {
      title: "Approved",
      description: "Your slot is confirmed.",
      state: "done",
    },
    rejected: {
      title: "Rejected",
      description: "See the clinic's note for what to do next.",
      state: "failed",
    },
    rescheduled: {
      title: "New time proposed",
      description: "The clinic suggested a different slot.",
      state: "done",
    },
  };

  return [
    {
      title: "Request sent",
      description: "Your request was submitted to the clinic.",
      state: "done",
    },
    {
      title: "Clinic review",
      description:
        status === "pending"
          ? "The clinic is reviewing your request."
          : "The clinic reviewed your request.",
      state: status === "pending" ? "current" : "done",
    },
    outcome[status],
  ];
}

function StepMarker({ state }: { state: StepState }) {
  if (state === "done") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
        <Check className="h-4 w-4" strokeWidth={2.5} />
      </span>
    );
  }
  if (state === "failed") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
        <X className="h-4 w-4" strokeWidth={2.5} />
      </span>
    );
  }
  if (state === "current") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-500/10">
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
      </span>
    );
  }
  return (
    <span className="h-8 w-8 shrink-0 rounded-full border-2 border-border bg-surface" />
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-3.5 text-sm">
      <dt className="shrink-0 text-textMuted">{label}</dt>
      <dd className="text-right font-medium text-textPrimary">{children}</dd>
    </div>
  );
}

export default function PatientAppointmentView() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const studentId = resolveStudentId(sessionManager.getUser());
  const requestedId = params.id ?? searchParams.get("id") ?? undefined;

  const appointments = getMyAppointments(studentId);
  const appointment: Appointment | undefined = requestedId
    ? getAppointmentById(studentId, requestedId)
    : appointments[0];

  const handleBack = () => navigate(ROUTES.patient.dashboard.appointments);
  const handleBook = () => navigate(ROUTES.patient.appointment.bookAppointment);

  if (!appointment) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="text-sm text-textMuted">
          We couldn't find that appointment.
        </p>
        <button
          type="button"
          onClick={handleBack}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primaryDark"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to appointments
        </button>
      </div>
    );
  }

  const meta = STATUS_META[appointment.status];
  const StatusIcon = meta.icon;
  const steps = buildSteps(appointment.status);
  const labels = LABELS[appointment.status];
  const slot = getEffectiveSlot(appointment);
  const slotDate = getDateParts(slot.date);
  const isRescheduled =
    appointment.status === "rescheduled" && !!appointment.rescheduledTo;
  const originalDate = isRescheduled ? getDateParts(appointment.date) : null;
  const canRebook =
    appointment.status === "rejected" || appointment.status === "rescheduled";

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-1.5 px-1.5 py-1 text-xs font-medium text-textMuted hover:text-textPrimary"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to appointments
      </button>

      <section className="mt-3 overflow-hidden rounded-3xl bg-gradient-to-b from-primary/15 to-white text-primaryDark shadow-sm">
        <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1.5 text-xs font-medium text-primary border border-primary/20">
              <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
              {meta.label}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
              {appointment.type}
            </h1>
            <p className="mt-1 font-mono text-xs text-primary">
              {appointment.id}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-primary bg-white/50 px-5 py-4">
              <p className="text-xs text-primary">{labels.date}</p>
              <p className="mt-1 mb-1 text-lg font-semibold text-primary">
                {slotDate?.full ?? slot.date}
              </p>
              {slotDate && (
                <p className="text-xs text-primary">{slotDate.weekday}</p>
              )}
            </div>

            <div className="rounded-2xl border border-primary bg-white/50 px-5 py-4">
              <p className="text-xs text-primary">{labels.time}</p>
              <p className="mt-1 text-lg font-semibold text-primary">
                {slot.time}
              </p>
            </div>
          </div>
        </div>

        {isRescheduled && originalDate && (
          <div className="border-t border-white/10 bg-white/5 px-6 py-4 text-sm text-white/70 sm:px-8">
            Originally scheduled for {originalDate.full} at {appointment.time}.
          </div>
        )}
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="font-heading text-sm font-semibold text-textPrimary">
          Progress
        </h2>

        <ol className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li key={step.title} className="min-w-0">
                <div className="flex items-center gap-3">
                  <StepMarker state={step.state} />
                  {!isLast && (
                    <span
                      aria-hidden
                      className={`hidden h-0.5 flex-1 md:block ${
                        step.state === "done" ? "bg-primary/40" : "bg-border"
                      }`}
                    />
                  )}
                </div>
                <p
                  className={`mt-3 text-sm font-semibold ${
                    step.state === "upcoming"
                      ? "text-textMuted"
                      : "text-textPrimary"
                  }`}
                >
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-textMuted">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-surfaceMuted/60 px-4 py-3">
          <StatusIcon
            className={`mt-0.5 h-4 w-4 shrink-0 ${meta.iconText}`}
            strokeWidth={2}
          />
          <p className="text-sm leading-relaxed text-textSecondary">
            {meta.message}
          </p>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
        <section className="rounded-2xl border border-border bg-surface shadow-sm">
          <h2 className="border-b border-border px-6 py-4 font-heading text-sm font-semibold text-textPrimary">
            Appointment details
          </h2>
          <dl className="divide-y divide-border px-6">
            <DetailRow label="Type">{appointment.type}</DetailRow>
            <DetailRow label="Reference">
              <span className="font-mono">{appointment.id}</span>
            </DetailRow>
            {isRescheduled && originalDate ? (
              <>
                <DetailRow label="Original slot">
                  {originalDate.full}, {appointment.time}
                </DetailRow>
                <DetailRow label="New slot">
                  {slotDate?.full ?? slot.date}, {slot.time}
                </DetailRow>
              </>
            ) : (
              <>
                <DetailRow label={labels.date}>
                  {slotDate?.full ?? slot.date}
                </DetailRow>
                <DetailRow label={labels.time}>{slot.time}</DetailRow>
              </>
            )}
            <DetailRow label="Status">
              <span className="inline-flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                {meta.label}
              </span>
            </DetailRow>
          </dl>
        </section>

        <section className="rounded-2xl border border-border bg-surface shadow-sm">
          <h2 className="border-b border-border px-6 py-4 font-heading text-sm font-semibold text-textPrimary">
            Notes
          </h2>
          <p className="p-6 text-sm leading-relaxed text-textSecondary">
            {appointment.notes || "No additional notes for this appointment."}
          </p>
        </section>
      </div>
    </div>
  );
}
