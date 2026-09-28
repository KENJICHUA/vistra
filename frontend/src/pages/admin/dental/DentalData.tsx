import {Status, StatusBadge} from "/@/components/StatusBadge";
import {Column} from "/@/components/table/Table";
import {avatarColor, getInitials, getTypeIcon} from "/@/components/avatar";
import React from "react";
import {DentalStatus} from "/@/types/Dental";


export const dentalRecords: DentalData[] = [
    {
        id: "DEN-1042",
        studentId: "STU-001",
        student: "James Bontogon",
        course: "BS Computer Science",
        time: "9:00 AM",
        type: "Dental Consultation",
        status: "completed",
    },
    {
        id: "DEN-1043",
        studentId: "STU-001",
        student: "Heart Combinido",
        course: "BS Psychology",
        time: "9:30 AM",
        type: "Tooth Extraction",
        status: "followUp",
    },
    {
        id: "DEN-1044",
        studentId: "STU-001",
        student: "Angelo Bejamino",
        course: "BS Industrial Engineering",
        time: "10:00 AM",
        type: "Oral Prophylaxis",
        status: "completed",
    },
    {
        id: "DEN-1045",
        studentId: "STU-001",
        student: "Natasha Pinon",
        course: "BS Electronics Engineering",
        time: "10:15 AM",
        type: "Dental Filling",
        status: "referred",
    },
    {
        id: "DEN-1046",
        studentId: "STU-001",
        student: "Rosh Ingel",
        course: "BS Accountancy",
        time: "10:45 AM",
        type: "Dental Consultation",
        status: "ongoingTreatment",
    },
];

export interface DentalData {
    id: string;
    student: string;
    studentId: string
    course: string;
    time: string;
    type?: string;
    status: DentalStatus;
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
]
