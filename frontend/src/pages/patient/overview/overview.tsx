import React, { useMemo } from "react";
import { useOutletContext, Link } from "react-router-dom";
import {
  CalendarClock,
  ArrowRight,
  FileText,
  CalendarPlus,
} from "lucide-react";

import PatientStatsGrid from "./stats";
import { getMyAppointments, Appointment } from "../appointments/appointmentsData";
import { myMedicalRecords, myVisits } from "../medical/medicalData";
import { filterByQuery } from "/@/utils/FilterByQuery.js";
import { statusLabels } from "/@/components/StatusBadge";
import { sessionManager } from "/@/utils/SessionManager";
import { ROUTES } from "/@/config/RoutePaths";
import { formatDate } from "/@/utils/FormatDate";
import { Visit } from "/@/types/types";

const DEFAULT_STUDENT_ID = "20230518-S";

interface OutletContextShape {
  searchQuery: string;
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const today = new Date();
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function todayLabel(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

function WelcomeHero({ name, studentId }: { name: string; studentId: string }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-primary/5x to-white shadow-card">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_100%_at_0%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-24 -left-10 h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />

      <div className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wide text-primary">
              {studentId}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-textMuted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {todayLabel()}
            </span>
          </div>

          <h1 className="mt-3 font-heading text-2xl font-semibold leading-tight text-primaryDark sm:text-3xl">
            Welcome back, {name.split(" ")[0]}.
          </h1>

          <p className="mt-1.5 max-w-l text-sm text-textSecondary">
            Here's what's happening with your health records and upcoming visits.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Link
            to={ROUTES.patient.appointment.bookAppointment}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.02] hover:bg-primaryDark"
          >
            <CalendarPlus className="h-4 w-4" strokeWidth={2} />
            Book Appointment
          </Link>

          <Link
            to={ROUTES.patient.dashboard.medical}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-textPrimary transition-colors hover:border-primary/40"
          >
            <FileText className="h-4 w-4" strokeWidth={2} />
            My Records
          </Link>
        </div>
      </div>
    </section>
  );
}

function NextAppointmentSpotlight({ appointment }: { appointment: Appointment | null }) {
  if (!appointment) {
    return (
      <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-border bg-surface p-6">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <CalendarClock className="h-4 w-4" strokeWidth={2} />
            <span className="text-xs font-semibold uppercase tracking-wide">Next Appointment</span>
          </div>
          <p className="mt-4 text-sm text-textMuted">
            You don't have anything scheduled. Booking takes less than a minute.
          </p>
        </div>

        <Link
          to={ROUTES.patient.appointment.bookAppointment}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primaryDark"
        >
          Book an appointment
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </Link>
      </div>
    );
  }

  const days = daysUntil(appointment.date);
  const countdownLabel = days <= 0 ? (days === 0 ? "Today" : "Past") : "days away";

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-primaryDark p-4 text-white shadow-card">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/75">
          <CalendarClock className="h-3.5 w-3.5" strokeWidth={2} />
          Next Appointment
        </span>

        <div className="mt-4 flex items-baseline gap-2">
          {days > 0 ? (
            <>
              <span className="font-heading text-4xl font-bold leading-none">{days}</span>
              <span className="text-sm font-medium text-white/80">{countdownLabel}</span>
            </>
          ) : (
            <span className="font-heading text-2xl font-bold leading-none">{countdownLabel}</span>
          )}
        </div>

        <p className="mt-3 font-heading text-lg font-semibold">{appointment.type}</p>
        <p className="mt-0.5 text-sm text-white/85">
          {formatDate(appointment.date)} · {appointment.time}
        </p>
      </div>

      <Link
        to={ROUTES.patient.appointment.viewAppointment}
        className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-white/80"
      >
        View details
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
      </Link>
    </div>
  );
}

function VisitTimelineRow({ entry, isLast }: { entry: Visit; isLast: boolean }) {
  return (
    <div className="relative flex gap-4">
      {!isLast && (
        <span
          className="absolute left-4 top-9 bottom-0 w-px bg-border"
          aria-hidden="true"
        />
      )}

      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-4 ring-surface">
        <span className="h-2 w-2 rounded-full bg-primary" />
      </span>

      <div className={`flex-1 ${isLast ? "" : "pb-6"}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <p className="text-sm font-medium text-textPrimary">{entry.complaint}</p>
          <span className="font-mono text-[11px] text-textMuted">{formatDate(entry.date)}</span>
        </div>
        <p className="mt-0.5 text-xs text-textMuted">
          {entry.doctor} <span className="mx-1 text-border">·</span> {entry.treatmentType}
        </p>
      </div>
    </div>
  );
}

function RecentVisitsPanel({ visits }: { visits: Visit[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-sm font-semibold text-primaryDark">Recent Visits</h2>
          <p className="mt-0.5 text-xs text-textMuted">Your last clinic check-ins</p>
        </div>

        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {visits.length} recent
        </span>
      </div>

      <div className="mt-6">
        {visits.length > 0 ? (
          visits.map((visit, i) => (
            <VisitTimelineRow key={visit.id} entry={visit} isLast={i === visits.length - 1} />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-textMuted">
            No visits yet — your check-ins will appear here.
          </div>
        )}
      </div>
    </div>
  );
}

export default function PatientOverviewTab() {
  const { searchQuery } = useOutletContext<OutletContextShape>();
  const user = sessionManager.getUser();
  const sessionId: string = user?.user_id ?? "";
  const studentId = myMedicalRecords[sessionId] ? sessionId : DEFAULT_STUDENT_ID;

  const patientName = myMedicalRecords[studentId]?.name ?? "there";

  const visits = useMemo(() => myVisits[studentId] ?? [], [studentId]);
  const appointments: Appointment[] = useMemo(() => getMyAppointments(studentId), [studentId]);
  const medicalStatus = myMedicalRecords[studentId]?.status;

  const sortedAppointments = useMemo(
    () => [...appointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [appointments],
  );
  const nextAppointment: Appointment | null = sortedAppointments[0] ?? null;

  const recentVisits = useMemo(() => {
    return [...visits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
  }, [visits]);

  const filteredVisits = useMemo(
    () => filterByQuery(recentVisits, searchQuery, ["complaint", "doctor", "treatmentType"]),
    [searchQuery, recentVisits],
  );

  return (
    <div className="flex flex-col gap-6">
      <WelcomeHero name={patientName} studentId={studentId} />

      <PatientStatsGrid
        nextAppointment={nextAppointment}
        visitCount={visits.length}
        medicalStatus={statusLabels[medicalStatus] ?? medicalStatus}
        dentalStatus="No record yet"
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentVisitsPanel visits={filteredVisits} />
        </div>

        <div className="flex flex-col gap-6">
          <NextAppointmentSpotlight appointment={nextAppointment} />
          {/* <UpcomingList appointments={upcomingAfterNext} /> */}
        </div>
      </div>
    </div>
  );
}