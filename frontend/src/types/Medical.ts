// Mirrors backend app/enums/medical_terms.py::MedicalVisitStatus.
// Keys are the backend enum names, values the stored labels
// (medical_tab.status comes from visit_log ->> 'status'),
// so filter options send exactly what the backend compares.
export const medicalStatuses = {
    CLEARED: "Cleared",
    NOT_CLEARED: "Not Cleared",
    SECOND_OPTION: "Second Option",
    RECOVERED: "Recovered",
    REFERRED: "Referred",
    ONGOING_TREATMENT: "Ongoing Treatment",
} as const;

export type MedicalStatus = keyof typeof medicalStatuses;
