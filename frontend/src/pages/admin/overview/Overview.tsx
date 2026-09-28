import React, {useMemo} from "react";
import {FileText, Stethoscope, Calendar} from "lucide-react";
import StatsGrid from "./Stats";
import {
    AppointmentTableFormat,
    APPOINTMENTS,
    AppointmentsColumns
} from "/@/pages/admin/appointments/appointmentsData";
import PanelHeader from "/@/components/OverviewHeader.jsx";
import {
    buildClinicalRecords,
    DepartmentBadge,
    recordLimit,
} from "/@/components/overviewcmp.jsx";
import {parseTimeToday} from "/@/utils/FormatDate";
import {Status, statusLabels} from "/@/components/StatusBadge";
import {CardList} from "/@/components/CardList";
import {DefaultTablePreset} from "/@/components/table/TableDesignPreset";
import {CountUp} from "/@/components/adminanim.jsx";

const PANEL_HEIGHT = "h-[520px]";

const APPOINTMENT_LIMIT = 6;

const COMPACT_TABLE = "[&_td]:py-2.5 [&_td]:text-sm [&_th]:text-xs";

interface ConsultationEntry {
    id: string
    student: string
    course: string
    time: string
    type: string
    status: Status
    department: string
}

function RecentBadge({count}: { count: number }) {
    return (
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold tabular-nums text-primary">
            <CountUp to={count} delay={400}/> recent
        </span>
    );
}

function ConsultationCard({entry}: { entry: ConsultationEntry }) {
    return (
        <>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-medium text-textPrimary">
                            {entry.student}
                        </p>

                        <DepartmentBadge department={entry.department}/>
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
                <FileText className="h-3.5 w-3.5" strokeWidth={2}/>
                {statusLabels[entry.status] ?? entry.status}
            </div>
        </>
    );
}

function ConsultationsList({entries}: { entries: ConsultationEntry[] }) {
    return (
        <CardList
            items={entries}
            keyExtractor={(entry) => entry.id}
            renderItem={(entry) => <ConsultationCard entry={entry}/>}
            emptyState={
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Stethoscope className="h-5 w-5" strokeWidth={2}/>
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

function ConsultationPanel({filteredRecords}: { filteredRecords: ConsultationEntry[] }) {
    return (
        <div className={`flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card ${PANEL_HEIGHT}`}>
            <PanelHeader
                icon={Stethoscope}
                title="Medical & Dental Records"
                subtitle="Live check-in feed"
                action={<RecentBadge count={filteredRecords.length}/>}
            />

            <div className="mt-5 min-h-0 flex-1 overflow-y-auto">
                <ConsultationsList entries={filteredRecords}/>
            </div>
        </div>
    );
}

function AppointmentsPanel() {
    const recentAppointments = useMemo(
        () => APPOINTMENTS.slice(0, APPOINTMENT_LIMIT),
        []
    );

    return (
        <div className={`${PANEL_HEIGHT} ${COMPACT_TABLE}`}>
            <DefaultTablePreset<AppointmentTableFormat>
                title="Appointment"
                icon={Calendar}
                isLoading={false}
                data={recentAppointments}
                columns={AppointmentsColumns}
                panelAddon={<RecentBadge count={recentAppointments.length}/>}
                showFilters={false}
                showPagination={false}
                fillHeight
            />
        </div>
    );
}

export default function OverviewTab() {
    const clinicalRecords = useMemo(() => buildClinicalRecords(), []);

    const recentRecords = useMemo(() => {
        return [...clinicalRecords]
            .sort((a, b) => parseTimeToday(a.time) - parseTimeToday(b.time))
            .slice(0, recordLimit);
    }, [clinicalRecords]);

    return (
        <>
            <StatsGrid stats={[]}/>
            <div className="reveal-group mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <ConsultationPanel filteredRecords={recentRecords}/>
                <AppointmentsPanel/>
            </div>
        </>
    );
}