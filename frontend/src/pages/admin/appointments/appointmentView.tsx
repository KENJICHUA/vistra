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
import type {LucideIcon} from "lucide-react";
import {useParams} from "react-router-dom";

import {AppointmentModel} from "/@/repository/AppointmentModel";
import LoadingPage from "/@/components/LoadingPage";
import {useAppointmentByIdQuery} from "/@/hooks/query/AppointmentQuery";
import {useForm} from "/@/hooks/Form";

type AppointmentStatus = "pending" | "confirmed" | "declined";

interface AppointmentUiModel {
    id: string | number;
    student: string;
    course: string;
    date?: string;
    notes?: string
    time: string;
    type: string;
    status: AppointmentStatus;
}

interface InfoFieldProps {
    icon: LucideIcon;
    label: string;
    value?: string | number | null;
}

interface StatusMeta {
    label: string;
    icon: LucideIcon;
    text: string;
    chip: string;
    dot: string;
}

const STATUS_META: Record<AppointmentStatus, StatusMeta> = {
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

function getInitials(name: string = ""): string {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

function InfoField({
                       icon: Icon,
                       label,
                       value,
                   }: InfoFieldProps) {
    return (
        <div className="rounded-xl border border-border bg-surfaceMuted/30 px-4 py-3">
            <div className="flex items-center gap-2">
                <Icon
                    className="h-3.5 w-3.5 text-primary"
                    strokeWidth={2}
                />

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

interface AppointmentNotFoundProps {
    patientId?: string | null;
    appointmentId?: string | null;
}

export function AppointmentNotFound({
                                        patientId,
                                        appointmentId,
                                    }: AppointmentNotFoundProps) {
    return (
        <div className="mx-auto w-full">
            <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
                <h2 className="font-heading text-lg font-semibold text-primaryDark">
                    {appointmentId
                        ? `Appointment No. ${appointmentId} not found`
                        : "Appointment not found"}
                </h2>

                <p className="mt-2 text-sm text-textMuted">
                    There is no appointment at No. {appointmentId} for patient{" "}
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
                    <ArrowLeft className="h-3.5 w-3.5"/>
                    Back to appointments
                </button>
            </div>
        </div>
    );
}

type interviewForm = {
    status: AppointmentStatus
    declined: boolean
    reason: string
}

export default function AppointmentDetailView() {
    const {patientId, appointmentId} = useParams<{ patientId: string, appointmentId: string }>();
    const { form, setField } = useForm<interviewForm>({
        status: "pending",
        declined: false,
        reason: "",
    });
    if (!appointmentId || !patientId) {
        return (
            <AppointmentNotFound
                patientId={patientId}
                appointmentId={appointmentId}
            />
        );
    }

    const {
        data: appointmentDetails,
        isLoading,
        isError,
    } = useAppointmentByIdQuery(
        patientId,
        appointmentId
    );

    if (isLoading) {
        return <LoadingPage/>
    }

    if (!appointmentDetails) {
        return (
            <AppointmentNotFound
                patientId={patientId}
                appointmentId={appointmentId}
            />
        );
    }
    const appointmentModel = new AppointmentModel(appointmentDetails);

    const appointment = appointmentModel.UiPageFormat() as AppointmentUiModel;



    const meta = STATUS_META[form.status];

    const handleBack = (): void => {
        window.history.back();
    };

    const applyStatus = (
        next: AppointmentStatus
    ): void => {
        setField("status", next);
        setField("declined", next === "declined");
    };


    const confirmDecline = (): void => {
        applyStatus("declined");
        console.log(form.declined, form.reason)
    };

    return (
        <div className="mx-auto w-full">

            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">

                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"/>

                <div className="relative p-6 sm:p-8">

                    <div className="mb-6 flex items-start justify-between gap-4">

                        <button
                            type="button"
                            onClick={handleBack}
                            className="inline-flex items-center gap-1.5 px-1.5 py-1 text-xs font-medium text-textMuted hover:text-textPrimary"
                        >
                            <ArrowLeft className="h-3.5 w-3.5"/>
                            Back to appointments
                        </button>

                    </div>


                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-5">

                            <span
                                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
                                {getInitials(appointment.student)}
                            </span>

                            <div>

                                <div className="flex flex-wrap items-center gap-2">

                                    <h1 className="font-heading text-2xl font-semibold text-primaryDark">
                                        {appointment.student}
                                    </h1>

                                    <span
                                        className="rounded-md bg-surfaceMuted px-2 py-0.5 font-mono text-xs text-textMuted">
                                        {appointment.id}
                                    </span>

                                </div>

                                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-textMuted">

                                    <span>
                                        {appointment.course}
                                    </span>

                                    <span>•</span>

                                    <span>
                                        Appointment
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* Status */}

                        <span
                            className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${meta.chip} ${meta.text}`}
                        >
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
                            />

                            {meta.label}
                        </span>

                    </div>

                </div>

            </div>

            <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

                <div className="flex flex-col gap-y-5 rounded-2xl border border-border bg-surface p-6 shadow-sm">

                    <div className="border-b border-border pb-4">

                        <div className="flex items-center gap-2">

                            <ClipboardList className="h-4 w-4 text-primary"/>

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

                            <ClipboardList className="h-4 w-4 text-primary"/>

                            <h2 className="font-heading text-sm font-semibold text-primaryDark">
                                Appointment Notes
                            </h2>

                        </div>

                    </div>


                    <div
                        className="mt-5 rounded-xl border border-dashed border-border bg-surfaceMuted/20 px-4 py-4 text-sm text-textMuted">
                        {appointment.notes || "No additional notes were submitted with this appointment."}
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


                        {/* Decline reason */}

                        {form.declined ? (

                            <div className="rounded-xl border border-danger/25 bg-danger/5 p-4">

                                <label className="block text-xs font-medium text-textSecondary">

                                    Reason for declining{" "}

                                    <span className="text-textMuted">
                                        (optional)
                                    </span>

                                </label>


                                <textarea
                                    value={form.reason}
                                    onChange={(event) =>
                                        setField("reason", event.target.value)
                                    }
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
                                        <XCircle className="h-3.5 w-3.5"/>
                                        Confirm decline
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() => {
                                            setField("declined", false);
                                            setField("reason", "");
                                        }}
                                        className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-textSecondary hover:bg-surfaceMuted"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>

                        ) : (

                            <div className="flex flex-wrap gap-2">

                                {/* Confirm */}

                                {form.status !== "confirmed" && (

                                    <button
                                        type="button"
                                        onClick={() =>
                                            applyStatus("confirmed")
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white hover:opacity-90"
                                    >
                                        <CheckCircle2 className="h-3.5 w-3.5"/>
                                        Confirm appointment
                                    </button>

                                )}


                                {/* Decline */}

                                {form.status !== "declined" && (

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setField("declined", true)
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-danger/25 bg-danger/10 px-4 py-2 text-xs font-medium text-danger hover:bg-danger/15"
                                    >
                                        <XCircle className="h-3.5 w-3.5"/>
                                        Decline
                                    </button>

                                )}


                                {/* Reset */}

                                {form.status !== "pending" && (

                                    <button
                                        type="button"
                                        onClick={() =>
                                            applyStatus("pending")
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-medium text-textSecondary hover:bg-surfaceMuted"
                                    >
                                        <RotateCcw className="h-3.5 w-3.5"/>
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
