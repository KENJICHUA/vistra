import { resolveStatus, Status } from "/@/components/StatusBadge";
import { formatTime } from "/@/utils/FormatDate";
import { AppointmentSchema } from "/@/api/schema/AppointmentSchema";
import { DentalVisitSchema } from "/@/api/schema/DentalSchema";
import { MedicalVisitSchema } from "/@/api/schema/MedicalSchema";
import { AppointmentTableFormat } from "/@/pages/admin/appointments/appointmentsData";
import { AppointmentModel } from "/@/repository/AppointmentModel";

export interface OverviewConsultationEntry {
    id: string;
    student: string;
    course: string;
    time: string;
    type: string;
    status: Status;
    department: string;
    visitDate: string;
}

function toStatus(value: unknown, fallback: Status = "pending"): Status {
    return resolveStatus(value) ?? fallback;
}

export function mapMedicalToOverview(record: MedicalVisitSchema): OverviewConsultationEntry {
    return {
        id: `MED-${record.id}`,
        student: record.patient_name,
        course: record.course,
        time: formatTime(record.visit_date),
        type: "Medical Consultation",
        status: toStatus(record.status, "pending"),
        department: "Medical",
        visitDate: record.visit_date,
    };
}

export function mapDentalToOverview(record: DentalVisitSchema): OverviewConsultationEntry {
    return {
        id: `DEN-${record.id}`,
        student: record.patient_name,
        course: record.course,
        time: formatTime(record.visit_date),
        type: "Dental Consultation",
        status: toStatus(record.status, "pending"),
        department: "Dental",
        visitDate: record.visit_date,
    };
}

export function mapAppointmentToTable(record: AppointmentSchema): AppointmentTableFormat {
    return new AppointmentModel(record).UiTableFormat();
}
