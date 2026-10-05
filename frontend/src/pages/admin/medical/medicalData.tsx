import {Status, StatusBadge} from "/@/components/StatusBadge";

import {Column} from "/@/components/table/Table";

import {avatarColor, getInitials} from "/@/components/avatar";

export const medRecords: medData[] = [

  {
    id: "MED-1042",
    student: "Kenji Chua",
    course: "BS Computer Science",
    time: "9:00 AM",
    type: "Medical Consultation",
    status: "cleared",
  },

  {
    id: "MED-1043",
    student: "Ivan Mejorada",
    course: "BS Psychology",
    time: "9:30 AM",
    type: "Follow-up",
    status: "secondOpinion",
  },

  {
    id: "MED-1044",
    student: "Cjay Gonzales",
    course: "BS Industrial Engineering",
    time: "10:00 AM",
    type: "Medical Consultation",
    status: "recovered",
  },

  {
    id: "MED-1045",
    student: "Joshua Lapitan",
    course: "BS Electronics Engineering",
    time: "10:15 AM",
    type: "Medical Consultation",
    status: "referred",
  },

  {
    id: "MED-1046",
    student: "Rosh Ingel",
    course: "BS Accountancy",
    time: "10:45 AM",
    type: "Medical Consultation",
    status: "ongoingTreatment",
  },

];

export const students = [

  {
    id: "MED-1042",
    name: "Kenji Chua",
    course: "BS Computer Science",
    yearSection: "4th Year, Section A",
    address: "12 Mahogany St.",
    barangay: "Barangay Holy Spirit",
    age: 21,
    mobileNumber: "0917 234 5566",
    sex: "Male",
    birthday: "2005-03-14",
    civilStatus: "Single",
  },

  {
    id: "MED-1043",
    name: "Ivan Mejorada",
    course: "BS Psychology",
    yearSection: "3rd Year, Section B",
    address: "45 Narra Ave.",
    barangay: "Barangay Batasan Hills",
    age: 20,
    mobileNumber: "0928 112 3344",
    sex: "Male",
    birthday: "2006-07-02",
    civilStatus: "Single",
  },

  {
    id: "MED-1044",
    name: "Cjay Gonzales",
    course: "BS Industrial Engineering",
    yearSection: "2nd Year, Section A",
    address: "8 Acacia Lane",
    barangay: "Barangay Commonwealth",
    age: 22,
    mobileNumber: "0939 887 6655",
    sex: "Male",
    birthday: "2004-01-29",
    civilStatus: "Single",
  },

  {
    id: "MED-1045",
    name: "Joshua Lapitan",
    course: "BS Electronics Engineering",
    yearSection: "4th Year, Section C",
    address: "27 Kalachuchi St.",
    barangay: "Barangay Payatas",
    age: 21,
    mobileNumber: "0906 554 4321",
    sex: "Male",
    birthday: "2005-11-08",
    civilStatus: "Single",
  },

  {
    id: "MED-1046",
    name: "Rosh Ingel",
    course: "BS Accountancy",
    yearSection: "2nd Year, Section B",
    address: "3 Ilang-Ilang St.",
    barangay: "Barangay Fairview",
    age: 19,
    mobileNumber: "0915 774 8899",
    sex: "Female",
    birthday: "2007-05-19",
    civilStatus: "Single",
  },

];

export const type = [
  "Medical Consultation",
  "Follow-up",
];

export const emptyDetails = {

  course: "",
  address: "",
  barangay: "",
  age: "",
  mobileNumber: "",
  sex: "",
  birthday: "",
  civilStatus: "",
  yearSection: "",
  type: "",

};

export interface medData {

  id: string;
  student: string;
  course: string;
  time: string;
  type: string;
  status: Status;

}

export const MedicalColumns: Column<medData>[] = [

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
    options: type,
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
      <StatusBadge status={value as Status} />
    ),
  },

];
