import {Status} from "/@/components/StatusBadge";

export interface AppointmentSchema {
    id: string;
    patient_id: string;

    scheduled_start: string;
    scheduled_end: string;

    status: Status;
    reason: string;
    notes: string | null;
    decline_reason: string | null;
    location: string;

    created_at: string;

    staff_id: string | null;

    first_name: string;
    middle_name: string | null;
    last_name: string;

    course: string;
}
