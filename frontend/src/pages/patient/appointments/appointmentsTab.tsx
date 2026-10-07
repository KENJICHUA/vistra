import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, CalendarPlus, Clock } from "lucide-react";

import { getMyAppointments, AppointmentStatus, STATUS_META, getEffectiveSlot, getViewPath, isUpcoming, resolveStudentId, } from "./appointmentsData";
import { UpcomingFilter, UPCOMING_FILTERS, FilterOption, FilterBar, Column, } from "/@/utils/patientHelpers";
import { daysUntilLabel, getDateParts } from "/@/utils/DateUtils";
import { sessionManager } from "/@/utils/SessionManager";
import { ROUTES } from "/@/config/RoutePaths.js";

export default function PatientAppointmentsTab() {
  const navigate = useNavigate();
  const studentId = resolveStudentId(sessionManager.getUser());
  const [upcomingFilter, setUpcomingFilter] = useState<UpcomingFilter>("all");

  const { upcoming, history, counts } = useMemo(() => {
    const all = getMyAppointments(studentId);
    const upcomingList = all
      .filter(isUpcoming)
      .sort((a, b) => getEffectiveSlot(a).date.localeCompare(getEffectiveSlot(b).date));
    const historyList = all
      .filter((appointment) => !isUpcoming(appointment))
      .sort((a, b) => getEffectiveSlot(b).date.localeCompare(getEffectiveSlot(a).date));
    const statusCounts: Record<AppointmentStatus, number> = {
      pending: 0,
      approved: 0,
      rescheduled: 0,
      rejected: 0,
    };
    all.forEach((appointment) => {
      statusCounts[appointment.status] += 1;
    });
    return { upcoming: upcomingList, history: historyList, counts: statusCounts };
  }, [studentId]);

  const filterOptions = useMemo<FilterOption<UpcomingFilter>[]>(
    () =>
      UPCOMING_FILTERS.map((filter) => ({
        key: filter.key,
        label: filter.label,
        count:
          filter.key === "all"
            ? upcoming.length
            : upcoming.filter((appointment) => appointment.status === filter.key).length,
        dot: filter.key === "all" ? undefined : STATUS_META[filter.key].dot,
      })),
    [upcoming]
  );

  const filteredUpcoming =
    upcomingFilter === "all"
      ? upcoming
      : upcoming.filter((appointment) => appointment.status === upcomingFilter);

  const activeFilterLabel = UPCOMING_FILTERS.find((filter) => filter.key === upcomingFilter)?.label.toLowerCase();

  const next = upcoming[0];
  const nextSlot = next ? getEffectiveSlot(next) : null;
  const nextDate = nextSlot ? getDateParts(nextSlot.date) : null;
  const nextMeta = next ? STATUS_META[next.status] : null;
  const countdown = nextSlot ? daysUntilLabel(nextSlot.date) : "";

  const goToBook = () => navigate(ROUTES.patient.appointment.bookAppointment);
  const goToView = (id: string) => navigate(getViewPath(id));

  return (
    <div className="w-full">
      <section className="overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-primary/15 to-white shadow-sm">
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          {next && nextSlot && nextMeta ? (
            <>
              <div className="flex min-w-0 items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl border border-primary/50 bg-background text-primary">
                  <span className="text-xs font-semibold uppercase leading-none tracking-wide text-primary">
                    {nextDate?.monthShort}
                  </span>
                  <span className="mt-1.5 font-heading text-3xl font-semibold leading-none text-textPrimary">
                    {nextDate?.day}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-textMuted">
                      Next appointment
                    </span>
                    {countdown && (
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primaryDark">
                        {countdown}
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 truncate font-heading text-2xl font-semibold tracking-tight text-primaryDark">
                    {next.type}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-textSecondary">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-textMuted" strokeWidth={2} />
                      {nextDate?.weekday}, {nextDate?.short}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4 text-textMuted" strokeWidth={2} />
                      {nextSlot.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goToView(next.id)}
                  className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primaryDark"
                >
                  View details
                </button>

                <button
                  type="button"
                  onClick={goToBook}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-textPrimary transition-colors hover:bg-background"
                >
                  <CalendarPlus className="h-4 w-4 text-primary" strokeWidth={2} />
                  Book appointment
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex min-w-0 items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-primary">
                  <CalendarPlus className="h-7 w-7" strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <p className="font-heading text-2xl font-semibold tracking-tight text-textPrimary">
                    Nothing scheduled
                  </p>
                  <p className="mt-1 text-sm text-textSecondary">
                    Book an appointment and the clinic will confirm your slot.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={goToBook}
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primaryDark"
              >
                <CalendarPlus className="h-4 w-4" strokeWidth={2} />
                Book appointment
              </button>
            </>
          )}
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
        <Column
          title="Upcoming"
          items={filteredUpcoming}
          emptyText={
            upcomingFilter === "all"
              ? "No upcoming appointments."
              : `No ${activeFilterLabel} appointments.`
          }
          onOpen={goToView}
          toolbar={
            <FilterBar
              label="Filter upcoming appointments by status"
              options={filterOptions}
              value={upcomingFilter}
              onChange={setUpcomingFilter}
            />
          }
        />
        <Column
          title="History"
          toolbar={<p className="text-xs text-textMuted">Past and closed requests</p>}
          items={history}
          emptyText="Nothing in your history yet."
          onOpen={goToView}
        />
      </div>
    </div>
  );
}