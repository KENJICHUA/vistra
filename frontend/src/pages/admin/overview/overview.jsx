import React, { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { FileText, Stethoscope, CalendarClock } from "lucide-react";
import StatsGrid from "./stats";
import { APPOINTMENTS } from "../appointments/appointmentsData";
import { filterByQuery } from "../../../utils/FilterByQuery.js"
import PanelHeader from "../../../components/OverviewHeader.jsx";
import {
  buildClinicalRecords,
  parseTimeToday,
  DepartmentBadge,
  recordLimit,
} from "../../../components/overviewcmp.jsx";
import { statusLabels} from "../../../components/statusbadge.jsx";
import {RecordsTablePanel} from "../../../components/Table.jsx";
import {ROUTES} from "../../../config/RoutePaths.js";
import {getTableColumns} from "../../../utils/TableUtils.js";
import {CardList} from "../../../components/CardList.jsx";


function ConsultationCard({ entry }) {
  return (
      <>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-sm font-medium text-textPrimary">
                {entry.student}
              </p>

              <DepartmentBadge department={entry.department} />
            </div>

            <p className="mt-0.5 break-words text-xs text-textMuted">
              {entry.type}
            </p>
          </div>

          <span className="shrink-0 whitespace-nowrap text-xs font-medium text-textSecondary">
          {entry.time}
        </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-primary">
          <FileText className="h-3.5 w-3.5" strokeWidth={2} />
          {statusLabels[entry.status] ?? entry.status}
        </div>
      </>
  );
}
function ConsultationsList({ entries }) {
  return (
      <CardList
          items={entries}
          renderItem={(entry) => <ConsultationCard entry={entry} />}
          emptyState={
            <div className="flex flex-col items-center gap-2 py-10 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Stethoscope className="h-5 w-5" strokeWidth={2} />
          </span>

              <p className="text-sm font-medium text-textPrimary">
                No consultations yet
              </p>

              <p className="text-xs text-textMuted">
                Walk-ins and clinic visits will show up here as they're checked in.
              </p>
            </div>
          }
      />
  );
}
function ConsultationPanel({filteredRecords}){
  return(
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <PanelHeader
            icon={Stethoscope}
            title="Medical & Dental Consultations"
            subtitle="Live check-in feed"
            action={
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                {filteredRecords.length} recent
              </span>
            }
        />
        <div className="mt-5">
          <ConsultationsList entries={filteredRecords} />
        </div>
      </div>
  );
}
export default function OverviewTab() {
  const { searchQuery } = useOutletContext();

  const clinicalRecords = useMemo(() => buildClinicalRecords(), []);

  const recentRecords = useMemo(() => {
    return [...clinicalRecords]
      .sort((a, b) => parseTimeToday(a.time) - parseTimeToday(b.time))
      .slice(0, recordLimit);
  }, [clinicalRecords]);

  const filteredRecords = useMemo(
    () => filterByQuery(recentRecords, searchQuery, ["student", "course", "type", "id"]),
    [searchQuery, recentRecords]
  );

  const filteredAppointments = useMemo(
    () => filterByQuery(APPOINTMENTS, searchQuery, ["student", "type", "id"]),
    [searchQuery]
  );

  return (
    <>
      <StatsGrid />
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ConsultationPanel filteredRecords={filteredRecords} />
        <RecordsTablePanel
            name="Appointment"
            data={filteredAppointments}
            columns={getTableColumns(filteredAppointments, ["id"])}
            createRecordPath={ROUTES.admin.appointment.createNewRecord}
            icon={CalendarClock}
            createDisabled={true}
            showCreate={false}
        />
      </div>
    </>
  );
}