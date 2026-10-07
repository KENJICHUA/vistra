import {Status} from "/@/components/StatusBadge";

export interface MedicalRecord {
    recordId: string;
    studentId: string;
    name: string;
    address: string;
    barangay: string;
    age: string;
    mobileNumber: string;
    sex: string;
    birthday: string;
    civilStatus: string;
    yearSection: string;
    course: string;
    status: Status;
}

export interface Visit {
    id: string;
    date: string;
    doctor: string;
    complaint: string;
    treatmentType: string;
    treatment: string;
}

export type MedicalRecords = Record<string, MedicalRecord>;

export type MyVisits = Record<string, Visit[]>;

export const myMedicalRecords: MedicalRecords = {
    "20230518-S": {
        recordId: "MED-1042",
        studentId: "20230810-S",
        name: "Kenji Briones Chua",
        address: "123 Rizal Street",
        barangay: "Barangay San Isidro",
        age: "21",
        mobileNumber: "0917 234 5678",
        sex: "Male",
        birthday: "2004-03-12",
        civilStatus: "Single",
        yearSection: "4th Year - Section A",
        course: "BS Computer Science",
        status: "cleared",
    },
};

export const myVisits: MyVisits = {
    "20230518-S": [
        {
            id: "v1",
            date: "2026-02-14",
            doctor: "Dr. Maria Santos",
            complaint: "Mild fever, headache",
            treatmentType: "Medicine",
            treatment: "Paracetamol 500mg, rest advised",
        },
        {
            id: "v2",
            date: "2026-05-03",
            doctor: "Dr. Ramon Cruz",
            complaint: "Sprained ankle during PE",
            treatmentType: "Procedure",
            treatment: "Ice compress, elastic bandage applied",
        },
    ],
};

export const emptyMedicalRecord: MedicalRecord = {
    recordId: "",
    studentId: "",
    name: "",
    address: "",
    barangay: "",
    age: "",
    mobileNumber: "",
    sex: "",
    birthday: "",
    civilStatus: "",
    yearSection: "",
    course: "",
    status: "pending",
};