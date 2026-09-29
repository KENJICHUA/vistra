import {CreateDentalVisit, DentalRecordDetailSchema, DentalVisitSchema} from "/@/api/schema/DentalSchema";
import {createDentalVisit, getDentalRecordById, getDentalVisit} from "/@/api/dental.api";

import {useMutation, useQuery} from "@tanstack/react-query";
import {AppointmentFilters, DentalVisitFilters} from "/@/api/schema/FilterSchemaCollection";
import {getAllAppointments} from "/@/api/appointments.api";

export function useCreateDentalVisit() {
    return useMutation({
        mutationFn: async (record: CreateDentalVisit) => {
            const { data } = await createDentalVisit(record);
            return data;
        },
    });
}

export function useDentalQuery(filters?: DentalVisitFilters ) {
    return useQuery({
        queryKey: ["dental", filters],
        queryFn: async ({signal}) => {
            const {data} = await getDentalVisit(
                filters,
                signal
            );

            if (!data.data) {
                throw new Error("Dental data is missing");
            }

            return data.data;
        }
    })
}

export function useDentalVisitDetail(patientId?: string, dentalId?: string) {
    return useQuery({
        queryKey: ["dental", patientId, dentalId],
        queryFn: async ({signal}): Promise<DentalRecordDetailSchema | null> => {
            const {data} = await getDentalRecordById(
                patientId as string,
                dentalId as string,
                signal
            );

            return data.data ?? null;
        },
        enabled: Boolean(patientId && dentalId),
        refetchOnWindowFocus: false,
    });
}
