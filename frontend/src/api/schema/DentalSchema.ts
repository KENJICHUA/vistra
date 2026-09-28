import {DentalStatus, Dentition, ToothCondition} from "/@/types/Dental"

export interface ToothSchema {
    id: string
    appointment_id: string,
    patient_id: string,
    tooth_number: number,
    dentition: Dentition,
    condition: ToothCondition,
    notes: string
}

export type CreateToothRequest = Omit<
    ToothSchema,
    "id" | "appointment_id" | "patient_id"
>;

export interface CreateDentalVisit {
    patient_id: string;
    last_dental_visit: string;
    brushing_frequency: string;
    floss: boolean
    calculus_severity: string;
    current_medication: string
    notes: string

    tooth_records: CreateToothRequest[];
}

export interface DentalVisitSchema {
    id: number;
    patient_id: string;
    patient_name: string;
    course: string;
    visit_date: string;
    staff_id: string;
    status: DentalStatus;
}
