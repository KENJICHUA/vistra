export interface CreatePatientSchema {
    patient_id: string
    email: string
    password: string
    created_by: string

    name: string
    address: string
    age: number
    barangay: string
    birthday: string
    mobile_number: string
    sex: string
    civil_status: string
    classification: string

    student_id?: string
    faculty_id?: string
    admin_id?: string

    course?: string
    year?: string
    section?: string
    department?: string
    position?: string
}
export interface PatientProfile {
    id: string
    patient_id: string
    created_at: string
    first_name: string
    middle_name?: string
    last_name: string
    birthday: string
    age: number
    sex: string
    complete_address: string
    barangay: string
    civil_status: string
    course?: string
    contact_no?: string
    school_year?: string
}