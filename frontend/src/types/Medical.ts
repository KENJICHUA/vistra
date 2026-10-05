// Mirrors backend app/enums/medical_terms.py::MedicalVisitStatus.
// Keys are the backend enum names, values the stored labels
// (medical_tab.status comes from visit_log ->> 'status'),
// so filter options send exactly what the backend compares.
export const medicalStatuses = {
    cleared: "Cleared",
    notCleared: "Not Cleared",
    secondOption: "Second Option",
    recovered: "Recovered",
    referred: "Referred",
    ongoingTreatment: "Ongoing Treatment",
} as const;

export type MedicalStatus = keyof typeof medicalStatuses;
