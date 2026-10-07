import {Status, StatusBadge} from "/@/components/StatusBadge";

import {Column} from "/@/components/table/Table";

import {avatarColor, getInitials} from "/@/components/avatar";

export const dentalRecords: DentalData[] = [

    {
        id: "DEN-1042",
        student: "James Bontogon",
        course: "BS Computer Science",
        time: "9:00 AM",
        type: "Dental Consultation",
        status: "completed",
    },

    {
        id: "DEN-1043",
        student: "Heart Combinido",
        course: "BS Psychology",
        time: "9:30 AM",
        type: "Tooth Extraction",
        status: "followUp",
    },

    {
        id: "DEN-1044",
        student: "Angelo Bejamino",
        course: "BS Industrial Engineering",
        time: "10:00 AM",
        type: "Oral Prophylaxis",
        status: "completed",
    },

    {
        id: "DEN-1045",
        student: "Natasha Pinon",
        course: "BS Electronics Engineering",
        time: "10:15 AM",
        type: "Dental Filling",
        status: "referred",
    },

    {
        id: "DEN-1046",
        student: "Rosh Ingel",
        course: "BS Accountancy",
        time: "10:45 AM",
        type: "Dental Consultation",
        status: "ongoingTreatment",
    },

];

export const dentalTypes = [
    "Dental Consultation",
    "Tooth Extraction",
    "Oral Prophylaxis",
    "Dental Filling",
];

export interface DentalData {

    id: string;
    student: string;
    course: string;
    time: string;
    type: string;
    status: Status;

}

export const DentalColumns: Column<DentalData>[] = [

    {
        key: "student",
        label: "Student",
        render: (value) => {

            const student = value as string;

            return (

                <div className="flex items-center gap-2.5">

                    <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${avatarColor(student)}`}
                    >
                        {getInitials(student)}
                    </span>

                    <span className="text-sm font-medium text-textPrimary">
                        {student}
                    </span>

                </div>

            );

        },
    },

    {
        key: "course",
        label: "Course",
        filterType: "select",
        options: [
            "BS Computer Science",
            "BS Business Administration",
            "BS Psychology",
            "BS Nursing",
            "BS Information Technology",
            "BS Education",
            "BS Accountancy",
        ],
    },

    {
        key: "type",
        label: "Type",
        filterType: "select",
        options: dentalTypes,
    },

    {
        key: "time",
        label: "Time",
        filterType: "date",
    },

    {
        key: "status",
        label: "Status",
        filterType: "select",
        options: [
            "ongoingTreatment",
            "followUp",
            "declined",
            "completed",
            "referred",
        ],
        render: (value) => (
            <StatusBadge status={value as Status}/>
        ),
    },

];

