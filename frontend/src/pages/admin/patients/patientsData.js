export const patientRecords = [
  {
    id: "PAT-1001",
    name: "Kenji Chua",
    userId: "20230786-S",
    userType: "Student",
    course: "BS Computer Science",
    yearSection: "4th Year, Section A",
    lastVisit: "August 27, 2026",
  },
  {
    id: "PAT-1002",
    name: "Ivan Mejorada",
    userId: "20230792-M",
    userType: "Student",
    course: "BS Psychology",
    yearSection: "3rd Year, Section B",
    lastVisit: "August 26, 2026",
  },
  {
    id: "PAT-1003",
    name: "Cjay Gonzales",
    userId: "20240841-M",
    userType: "Student",
    course: "BS Industrial Engineering",
    yearSection: "2nd Year, Section A",
    lastVisit: "August 25, 2026",
  },
  {
    id: "PAT-1004",
    name: "Joshua Lapitan",
    userId: "20220653-C",
    userType: "Student",
    course: "BS Electronics Engineering",
    yearSection: "4th Year, Section C",
    lastVisit: "August 24, 2026",
  },
  {
    id: "PAT-1005",
    name: "Rosh Ingel",
    userId: "20240917-S",
    userType: "Student",
    course: "BS Accountancy",
    yearSection: "2nd Year, Section B",
    lastVisit: "August 23, 2026",
  },
  {
    id: "PAT-1006",
    name: "Maria Santos",
    userId: "20231524-S",
    userType: "Student",
    course: "BS Psychology",
    yearSection: "3rd Year, Section A",
    lastVisit: "August 22, 2026",
  },
  {
    id: "PAT-1007",
    name: "Daniel Reyes",
    userId: "20220738-C",
    userType: "Student",
    course: "BS Information Technology",
    yearSection: "4th Year, Section B",
    lastVisit: "August 21, 2026",
  },
  {
    id: "PAT-1008",
    name: "Sofia Cruz",
    userId: "20241862-C",
    userType: "Student",
    course: "Bachelor of Early Childhood Education",
    yearSection: "2nd Year, Section A",
    lastVisit: "August 20, 2026",
  },
  {
    id: "PAT-1009",
    name: "Angel Bien",
    userId: "F-2023-045",
    userType: "Faculty",
    department: "College of Computer Studies",
    lastVisit: "August 19, 2026",
  },
  {
    id: "PAT-1010",
    name: "Christian Espinoza",
    userId: "F-2023-046",
    userType: "Professor",
    department: "College of Engineering",
    lastVisit: "August 18, 2026",
  },
  {
    id: "PAT-1011",
    name: "Gillian Marc Lorenzo",
    userId: "F-2024-012",
    userType: "Faculty",
    department: "College of Business Administration",
    lastVisit: "August 17, 2026",
  },
  {
    id: "PAT-1012",
    name: "Admin User",
    userId: "A-2023-045",
    userType: "Admin",
    department: "University Clinic",
    lastVisit: "August 16, 2026",
  },
];

export const patientRecordsMockData = {
  "PAT-1001": {
    medical: [
      {
        id: "MED-1001-1",
        title: "Annual physical exam",
        date: "2026-08-27",
        details: "Vitals normal. BP 118/76, HR 72 bpm. Cleared for physical activity.",
        provider: "Dr. Angela Ramos",
      },
      {
        id: "MED-1001-2",
        title: "Flu vaccination",
        date: "2026-02-14",
        details: "Seasonal influenza vaccine administered, left arm. No adverse reaction observed.",
        provider: "Nurse Bea Villanueva",
      },
    ],
    dental: [
      {
        id: "DEN-1001-1",
        title: "Routine cleaning",
        date: "2026-06-03",
        details: "Mild plaque buildup on lower molars. Recommended electric toothbrush.",
        provider: "Dr. Miko Tan",
      },
    ],
    appointment: [
      {
        id: "APT-1001-1",
        title: "Follow-up consultation",
        date: "2026-09-10",
        details: "Scheduled to review physical exam bloodwork results.",
        provider: "Dr. Angela Ramos",
      },
    ],
  },

  "PAT-1002": {
    medical: [
      {
        id: "MED-1002-1",
        title: "Sports injury assessment",
        date: "2026-08-26",
        details: "Mild ankle sprain from volleyball practice. RICE protocol advised, no fracture on exam.",
        provider: "Dr. Angela Ramos",
      },
    ],
    dental: [],
    appointment: [
      {
        id: "APT-1002-1",
        title: "Ankle re-check",
        date: "2026-09-02",
        details: "Follow-up to confirm swelling has gone down before clearing for practice.",
        provider: "Dr. Angela Ramos",
      },
    ],
  },

  "PAT-1003": {
    medical: [
      {
        id: "MED-1003-1",
        title: "Allergy consultation",
        date: "2026-08-25",
        details: "Reports seasonal rhinitis. Prescribed loratadine 10mg once daily.",
        provider: "Dr. Paolo Herrera",
      },
    ],
    dental: [
      {
        id: "DEN-1003-1",
        title: "Wisdom tooth evaluation",
        date: "2026-07-19",
        details: "Lower right wisdom tooth partially impacted. Referred to oral surgeon for extraction.",
        provider: "Dr. Miko Tan",
      },
    ],
    appointment: [],
  },

  "PAT-1004": {
    medical: [],
    dental: [],
    appointment: [
      {
        id: "APT-1004-1",
        title: "New patient intake",
        date: "2026-08-24",
        details: "First clinic visit. Medical history and allergy screening on file.",
        provider: "Nurse Bea Villanueva",
      },
    ],
  },

  "PAT-1005": {
    medical: [
      {
        id: "MED-1005-1",
        title: "Migraine follow-up",
        date: "2026-08-23",
        details: "Frequency reduced from 3x/week to 1x/week since starting propranolol. Continue current dose.",
        provider: "Dr. Paolo Herrera",
      },
      {
        id: "MED-1005-2",
        title: "Initial migraine evaluation",
        date: "2026-05-11",
        details: "Reports recurring tension headaches. Started on low-dose propranolol.",
        provider: "Dr. Paolo Herrera",
      },
    ],
    dental: [],
    appointment: [],
  },

  "PAT-1006": {
    medical: [
      {
        id: "MED-1006-1",
        title: "Mental health check-in",
        date: "2026-08-22",
        details: "Reports improved sleep and lower anxiety since last session. Continuing biweekly counseling.",
        provider: "Dr. Renz Aquino",
      },
    ],
    dental: [
      {
        id: "DEN-1006-1",
        title: "Cavity filling",
        date: "2026-04-08",
        details: "Composite filling placed on upper left first molar. No sensitivity reported after.",
        provider: "Dr. Miko Tan",
      },
    ],
    appointment: [
      {
        id: "APT-1006-1",
        title: "Counseling session",
        date: "2026-09-05",
        details: "Biweekly follow-up session.",
        provider: "Dr. Renz Aquino",
      },
    ],
  },

  "PAT-1007": {
    medical: [
      {
        id: "MED-1007-1",
        title: "Minor laceration treatment",
        date: "2026-08-21",
        details: "Small cut on right hand from lab equipment. Cleaned and dressed, tetanus booster up to date.",
        provider: "Nurse Bea Villanueva",
      },
    ],
    dental: [],
    appointment: [],
  },

  "PAT-1008": {
    medical: [],
    dental: [
      {
        id: "DEN-1008-1",
        title: "Routine cleaning",
        date: "2026-08-20",
        details: "No cavities found. Good oral hygiene, next cleaning recommended in 6 months.",
        provider: "Dr. Miko Tan",
      },
    ],
    appointment: [],
  },

  "PAT-1009": {
    medical: [
      {
        id: "MED-1009-1",
        title: "Annual wellness exam",
        date: "2026-08-19",
        details: "Routine faculty checkup. All results within normal range.",
        provider: "Dr. Angela Ramos",
      },
    ],
    dental: [],
    appointment: [],
  },

  "PAT-1010": {
    medical: [
      {
        id: "MED-1010-1",
        title: "Blood pressure monitoring",
        date: "2026-08-18",
        details: "BP 132/85, slightly elevated. Advised dietary changes and follow-up in one month.",
        provider: "Dr. Paolo Herrera",
      },
    ],
    dental: [],
    appointment: [
      {
        id: "APT-1010-1",
        title: "Blood pressure re-check",
        date: "2026-09-18",
        details: "Follow-up to reassess BP after dietary changes.",
        provider: "Dr. Paolo Herrera",
      },
    ],
  },

  "PAT-1011": {
    medical: [],
    dental: [],
    appointment: [],
  },

  "PAT-1012": {
    medical: [
      {
        id: "MED-1012-1",
        title: "Pre-employment medical clearance",
        date: "2026-08-16",
        details: "Clearance exam for administrative staff onboarding. No findings of concern.",
        provider: "Dr. Angela Ramos",
      },
    ],
    dental: [],
    appointment: [],
  },
};

export const patientColumns = [
  "Name",
  "User ID",
  "User Type",
  "Course / Department",
  "Year & Section",
  "Last Visit",
];

export function getMockPatientRecords(patientId) {
  return (
    patientRecordsMockData[patientId] || {
      medical: [],
      dental: [],
      appointment: [],
    }
  );
}
