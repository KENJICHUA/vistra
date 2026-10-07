import {AppointmentSchema} from "/@/api/schema/AppointmentSchema";
import {AppointmentPageFormat, AppointmentTableFormat} from "/@/pages/admin/appointments/appointmentsData";
import {formatDate, formatTime} from "/@/utils/FormatDate";


export class AppointmentModel {
    private AppointmentSchema: AppointmentSchema

    constructor(appointmentSchema: AppointmentSchema) {
        this.AppointmentSchema = appointmentSchema;
    }

    UiTableFormat(): AppointmentTableFormat {
        return {
            id: this.AppointmentSchema.id,
            studentId: this.AppointmentSchema.patient_id,
            student: [
                this.AppointmentSchema.first_name,
                this.AppointmentSchema.middle_name,
                this.AppointmentSchema.last_name,
            ]
                .filter(Boolean)
                .join(" "),
            course: this.AppointmentSchema.course,
            time: formatDate(this.AppointmentSchema.scheduled_start),
            type: this.AppointmentSchema.reason,
            status: this.AppointmentSchema.status
        };
    }

    UiPageFormat(): AppointmentPageFormat {
        return {
            id: this.AppointmentSchema.id,
            studentId: this.AppointmentSchema.patient_id,

            student: [
                this.AppointmentSchema.first_name,
                this.AppointmentSchema.middle_name,
                this.AppointmentSchema.last_name,
            ]
                .filter(Boolean)
                .join(" "),
            course: this.AppointmentSchema.course,
            time: formatTime(this.AppointmentSchema.scheduled_start),
            date: formatDate(this.AppointmentSchema.scheduled_start),
            type: this.AppointmentSchema.reason,
            notes: this.AppointmentSchema.notes,
            declineReason: this.AppointmentSchema.decline_reason,
            status: this.AppointmentSchema.status
        }
    }
}