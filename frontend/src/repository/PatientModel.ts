import { PatientProfile } from "/@/api/schema/PatientSchema";
import { formatDate } from "/@/utils/DateUtils";

export interface PatientDashboardRecord {
    id: string;
    name: string;
    userId: string;
    userType: string;
    course: string;
    yearSection: string;
    lastVisit: string;
}

export interface PatientRecord {
    id: string;
    title: string;
    date: string;
    details: string;
    provider: string;
}

export interface PatientRecords {
    medical: PatientRecord[];
    dental: PatientRecord[];
    appointment: PatientRecord[];
}

export class PatientModel {
    private PatientProfile: PatientProfile;

    constructor(patientProfile: PatientProfile) {
        this.PatientProfile = patientProfile;
    }

    dataViewPatientDashboardRecord(): PatientDashboardRecord {
        return {
            id: this.PatientProfile.patient_id,

            name: [
                this.PatientProfile.first_name,
                this.PatientProfile.middle_name,
                this.PatientProfile.last_name,
            ]
                .filter(Boolean)
                .join(" "),

            userId: this.PatientProfile.patient_id,

            userType: "Student",

            course: this.PatientProfile.course ?? "N/A",

            yearSection: this.PatientProfile.school_year ?? "N/A",

            lastVisit: formatDate(this.PatientProfile.created_at),
        };
    }

    dataViewPatientRecords(): PatientRecords {
        return {
            medical: [],
            dental: [],
            appointment: [],
        };
    }
}