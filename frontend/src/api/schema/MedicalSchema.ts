export interface MedicalVisitSchema {
    id: number;
    patient_id: string;
    patient_name: string;
    course: string;
    visit_date: string;
    staff_id: string;
    status: string;
}

export interface MedicalRecordDetailSchema {
    medical_visit_id: string;
    patient_name: string;
    status: string;
    course: string | null;
    staff_name: string | null;
}

export interface MedicalVisitLog {
    complaint: string;
    treatment: string;
}

export interface CreateMedicalVisit {
    patient_id: string;
    staff_id: string;
    status: string;
    type: string;
    visit_date: string;
    visit_log: MedicalVisitLog[];
}

export interface CreateMedicalVisitResponse {
    success: boolean;
    medical_visit_id?: number;
    error?: string;
}
