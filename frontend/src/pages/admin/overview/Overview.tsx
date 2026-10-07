import React, {useMemo} from "react";
import {FileText, Stethoscope, Calendar} from "lucide-react";
import StatsGrid from "./Stats";
import {AppointmentTableFormat} from "/@/pages/admin/appointments/appointmentsData";
import PanelHeader from "/@/components/OverviewHeader.jsx";
import {
    DepartmentBadge,
} from "/@/components/overviewcmp.jsx";
import {Status, statusLabels} from "/@/components/StatusBadge";
import {CardList} from "/@/components/CardList";
import {CountUp} from "/@/components/adminanim.jsx";
import {useOverviewData} from "/@/hooks/query/OverviewQuery";
import {
    mapAppointmentToTable,
    mapDentalToOverview,
    mapMedicalToOverview,
} from "/@/repository/OverviewModel";

const PANEL_HEIGHT = "h-[520px]";

const APPOINTMENT_LIMIT = 6;

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

function PanelListSkeleton({rows = 4}: { rows?: number }) {
    return (
        <div className="flex flex-col gap-4 py-2" aria-label="Loading">
            {Array.from({length: rows}).map((_, i) => (
                <div key={i} className="flex flex-col gap-2 animate-pulse">
                    <div className="flex items-center justify-between gap-3">
                        <div className="h-4 w-1/3 rounded bg-border"/>
                        <div className="h-3 w-16 rounded bg-border"/>
                    </div>
                    <div className="h-3 w-1/2 rounded bg-border/70"/>
                    <div className="h-3 w-24 rounded bg-border/70"/>
                </div>
            ))}
        </div>
    );
}

function PanelError({message, onRetry}: { message: string; onRetry: () => void }) {
    return (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
            <p className="text-sm font-medium text-textPrimary">Couldn't load data</p>
            <p className="text-xs text-textMuted">{message}</p>
            <button
                type="button"
                onClick={onRetry}
                className="mt-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
            >
                Retry
            </button>
        </div>
    );
}

function ConsultationPanel({medical, dental, loading, isError, onRetry}: {
    medical?: { items: Parameters<typeof mapMedicalToOverview>[0][] };
    dental?: { items: Parameters<typeof mapDentalToOverview>[0][] };
    loading: boolean;
    isError: boolean;
    onRetry: () => void;
}) {
    const filteredRecords = useMemo(() => {
        if (!medical || !dental) return [];
        const merged = [
            ...medical.items.map(mapMedicalToOverview),
            ...dental.items.map(mapDentalToOverview),
        ];
        return merged
            .sort((a, b) => +new Date(b.visitDate) - +new Date(a.visitDate))
            .slice(0, 8);
    }, [medical, dental]);

    return (
        <div className={`flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card ${PANEL_HEIGHT}`}>
            <PanelHeader
                icon={Stethoscope}
                title="Medical & Dental Records"
                subtitle="Live check-in feed"
                action={<RecentBadge count={filteredRecords.length}/>}
            />

            <div className="mt-5 min-h-0 flex-1 overflow-y-auto">
                {loading ? (
                    <PanelListSkeleton rows={5}/>
                ) : isError ? (
                    <PanelError message="Consultations failed to load." onRetry={onRetry}/>
                ) : (
                    <ConsultationsList entries={filteredRecords}/>
                )}
            </div>
        </div>
    );
}

function AppointmentCard({entry}: { entry: AppointmentTableFormat }) {
    return (
        <>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-medium text-textPrimary">
                            {entry.student}
                        </p>
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
                <Calendar className="h-3.5 w-3.5" strokeWidth={2}/>
                {statusLabels[entry.status] ?? entry.status}
            </div>
        </>
    );
}

function AppointmentsList({entries}: { entries: AppointmentTableFormat[] }) {
    return (
        <CardList
            items={entries}
            keyExtractor={(entry) => entry.id}
            renderItem={(entry) => <AppointmentCard entry={entry}/>}
            emptyState={
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Calendar className="h-5 w-5" strokeWidth={2}/>
                    </span>

                    <p className="text-sm font-medium text-textPrimary">
                        No appointments yet
                    </p>

                    <p className="text-xs text-textMuted">
                        Booked and walk-in appointments will show up here.
                    </p>
                </div>
            }
        />
    );
}

function AppointmentsPanel({appointments, loading, isError, onRetry}: {
    appointments?: { items: Parameters<typeof mapAppointmentToTable>[0][] };
    loading: boolean;
    isError: boolean;
    onRetry: () => void;
}) {
    const recentAppointments = useMemo(
        () => (appointments?.items ?? []).map(mapAppointmentToTable).slice(0, APPOINTMENT_LIMIT),
        [appointments]
    );

    return (
        <div className={`flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-card ${PANEL_HEIGHT}`}>
            <PanelHeader
                icon={Calendar}
                title="Appointment"
                subtitle="Upcoming and recent bookings"
                action={<RecentBadge count={recentAppointments.length}/>}
            />

            <div className="mt-5 min-h-0 flex-1 overflow-y-auto">
                {loading ? (
                    <PanelListSkeleton rows={4}/>
                ) : isError ? (
                    <PanelError message="Appointments failed to load." onRetry={onRetry}/>
                ) : (
                    <AppointmentsList entries={recentAppointments}/>
                )}
            </div>
        </div>
    );
}

export default function OverviewTab() {
    const {data, isLoading, isFetching, isError, refetch} = useOverviewData(APPOINTMENT_LIMIT, 8);
    const loading = isLoading || (isFetching && !data);
    const retry = () => refetch();

    return (
        <>
            <StatsGrid stats={[]}/>
            <div className="reveal-group mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <ConsultationPanel medical={data?.medical} dental={data?.dental} loading={loading} isError={isError} onRetry={retry}/>
                <AppointmentsPanel appointments={data?.appointments} loading={loading} isError={isError} onRetry={retry}/>
            </div>
        </>
    );
}
