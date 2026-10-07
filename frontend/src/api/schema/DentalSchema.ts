import {DentalStatus, Dentition, ToothCondition} from "/@/types/Dental"

export interface ToothSchema {
    id: number;
    appointment_id: number;
    patient_id: string;
    tooth_number: number;
    dentition: Dentition | null;
    condition: ToothCondition;
    notes: string | null;
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
    status: string;

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

export interface DentalRecordDetailSchema {
    dental_visit_id: string;
    patient_name: string;
    patient_id: string;
    address: string | null;
    barangay: string | null;
    age: string | null;
    mobileNumber: string | null;
    sex: string | null;
    birthday: string | null;
    civil_status: string | null;
    year_section: string | null;
    course: string | null;
    status: DentalStatus;
    dental_visit_date: string | null;
    last_visit: string | null;
    floss: string | null;
    brush_frequency: string | null;
    calculus: string | null;
    medication: string | null;
    notes: string | null;
    medical_history: string[];
    tooth_records: ToothSchema[];
}


