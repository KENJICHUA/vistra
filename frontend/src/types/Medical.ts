export const medicalStatuses = {
    cleared: "Cleared",
    secondOpinion: "Second Opinion",
    recovered: "Recovered",
    referred: "Referred",
    ongoingTreatment: "Ongoing Treatment",
    followUp: "Follow-up",
} as const;

export type MedicalStatus = keyof typeof medicalStatuses;
