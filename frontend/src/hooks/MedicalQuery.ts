import {useQuery} from "@tanstack/react-query";
import {getMedicalVisit} from "/@/api/medical.api";
import {MedicalVisitFilters} from "/@/api/schema/FilterSchemaCollection";
import {MedicalVisitSchema} from "/@/api/schema/MedicalSchema";

export function useMedicalQuery(filters?: MedicalVisitFilters) {
    return useQuery({
        queryKey: ["medical", filters],
        queryFn: async ({signal}) => {
            const {data} = await getMedicalVisit(
                filters,
                signal
            );

            if (!data.data) {
                throw new Error("Medical data is missing");
            }

            return data.data;
        },
        refetchOnWindowFocus: false,
    });
}

export function useMedicalVisitDetail(patientId?: string, medicalId?: string) {
    return useQuery({
        queryKey: ["medical", patientId, medicalId],
        queryFn: async ({signal}): Promise<MedicalVisitSchema | null> => {
            const {data} = await getMedicalVisit(
                {search: patientId, page: 1, page_size: 50},
                signal
            );

            const items = data.data?.items ?? [];

            return (
                items.find(
                    (visit) =>
                        String(visit.id) === String(medicalId) &&
                        visit.patient_id === patientId
                ) ??
                items.find((visit) => String(visit.id) === String(medicalId)) ??
                null
            );
        },
        enabled: Boolean(patientId && medicalId),
        refetchOnWindowFocus: false,
    });
}
