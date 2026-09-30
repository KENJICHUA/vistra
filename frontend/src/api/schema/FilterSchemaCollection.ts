export interface PatientFilters {
    search?: string;
    sex?: string;
    user_type?: string;
    course?: string;
    yearSection?: string;

    page?: number;
    page_size?: number;
    total?: number;
    total_pages?: number
}

export interface AppointmentFilters {
    search?: string;
    status?: string;
    type?: string;
    course?: string;
    date?: string;

    page?: number;
    page_size?: number;
    total?: number;
    total_pages?: number

}

export interface DentalVisitFilters {
    search?: string;
    status?: string;
    date?: string;
    course?: string;

    page?: number;
    page_size?: number;
    total?: number;
    total_pages?: number
}

export interface MedicalVisitFilters {
    search?: string;
    status?: string;
    date?: string;
    course?: string;

    page?: number;
    page_size?: number;
    total?: number;
    total_pages?: number
}