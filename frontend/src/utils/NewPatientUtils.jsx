import { FieldLabel } from "./FieldLabel";

export const COURSE_OPTIONS = [
  { code: "BS PSY", label: "BS Psychology" },
  { code: "BS MATH", label: "BS Mathematics" },
  { code: "BSCS", label: "BS Computer Science" },
  { code: "BSIS", label: "BS Information Systems" },
  { code: "BSIT", label: "BS Information Technology" },
  { code: "BSEMC", label: "BS Entertainment and Multimedia Computing" },
  { code: "BPA", label: "Bachelor of Public Administration" },
  {
    code: "BPA ECGE",
    label: "Bachelor of Public Administration (Evening Class for Government Employees)",
  },
  { code: "BA COMM", label: "BA Communication" },
  { code: "BA POS", label: "BA Political Science" },
  { code: "BSOAD", label: "BS Office Administration" },
  { code: "BSAIS", label: "BS Accounting Information Systems" },
  { code: "BSA", label: "BS Accountancy" },
  { code: "BSTM", label: "BS Tourism Management" },
  { code: "BSHM", label: "BS Hospitality Management" },
  { code: "BSBA FMGT", label: "BSBA Major in Financial Management" },
  { code: "BSBA MKTG", label: "BSBA Major in Marketing Management" },
  { code: "BS ENTREP", label: "BS Entrepreneurship" },
  { code: "BSBA HRM", label: "BSBA Major in Human Resource Management" },
  { code: "BECED", label: "Bachelor of Early Childhood Education" },
  { code: "BSE SCI", label: "BSE Major in Science" },
  { code: "BSE ENG", label: "BSE Major in English" },
  {
    code: "BSE ENG-CHI",
    label: "BSE Major in English with Chinese Language and Pedagogy",
  },
  { code: "BTLED HE", label: "BTLEd Major in Home Economics" },
  { code: "BS CRIM", label: "BS Criminology" },
  { code: "BS CPE", label: "BS Computer Engineering" },
  { code: "BS IE", label: "BS Industrial Engineering" },
  { code: "BS ECE", label: "BS Electronics Engineering" },
  { code: "BS EE", label: "BS Electrical Engineering" },
  { code: "BSSW", label: "BS Social Work" },
  { code: "BSISM", label: "BS Industrial Security Management" },
  { code: "ABBS", label: "BA in Behavioural Sciences" },
  { code: "JD", label: "Juris Doctor" },
  { code: "PHD", label: "PhD in Educational Management" },
  { code: "MSC", label: "MS in Criminal Justice Major in Criminology" },
  { code: "MATS", label: "MA in Teaching Science" },
  { code: "MBA", label: "Master in Business Administration" },
  { code: "MPA", label: "Master in Public Administration" },
  {
    code: "MAED",
    label: "MA in Education Major in Educational Management",
  },
  { code: "MAT-EG", label: "MA in Teaching (Early Grades)" },
  { code: "CPE", label: "Certificate in Professional Education" },
  { code: "DPA", label: "Doctor in Public Administration" },
];

export const YEAR_OPTIONS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
];

export const SECTION_OPTIONS = ["A", "B", "C"];

export const SEX_OPTIONS = ["Male", "Female"];

export const CIVIL_STATUS_OPTIONS = [
  "Single",
  "Married",
  "Widowed",
  "Separated",
  "Divorced",
];

export const POSITION_OPTIONS = [
  "Full-time",
  "Part-time",
  "Adjunct",
  "Visiting",
  "Contractual",
];

export const DEPARTMENT_OPTIONS = [
  "College of Computer Studies",
  "College of Engineering",
  "College of Business Administration",
  "College of Nursing",
  "College of Education",
  "College of Hospitality Management",
  "College of Criminal Justice Education",
];


export function ClassificationToggle({
  value,
  onChange,
}) {
  const options = [
    { key: "student", label: "Student" },
    { key: "faculty", label: "Faculty / Professor" },
    { key: "admin", label: "Admin" },
  ];

  return (
    <div>
      <FieldLabel htmlFor="classification">
        Classification
      </FieldLabel>

      <div
        id="classification"
        role="radiogroup"
        aria-label="Classification"
        className="grid w-full grid-cols-3 gap-1 rounded-xl border border-border bg-background p-1 sm:inline-grid sm:w-auto"
      >
        {options.map((opt) => {
          const active = value === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-textSecondary hover:bg-surface hover:text-textPrimary"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <input
        type="hidden"
        name="classification"
        value={value}
      />
    </div>
  );
}
