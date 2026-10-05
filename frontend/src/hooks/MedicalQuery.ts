import {useMutation, useQuery} from "@tanstack/react-query";
import {createMedicalVisit, getMedicalRecordById, getMedicalVisit} from "/@/api/medical.api";
import {MedicalVisitFilters} from "/@/api/schema/FilterSchemaCollection";
import {CreateMedicalVisit, MedicalRecordDetailSchema} from "/@/api/schema/MedicalSchema";

export function useCreateMedicalVisit() {
    return useMutation({
        mutationFn: async (record: CreateMedicalVisit) => {
            const {data} = await createMedicalVisit(record);
            return data;
        },
    });
}

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
        queryFn: async ({signal}): Promise<MedicalRecordDetailSchema | null> => {
            const {data} = await getMedicalRecordById(
                patientId as string,
                medicalId as string,
                signal
            );

            return data.data ?? null;
        },
        enabled: Boolean(patientId && medicalId),
        refetchOnWindowFocus: false,
    });
}
