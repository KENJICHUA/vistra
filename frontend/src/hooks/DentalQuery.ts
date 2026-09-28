import {CreateDentalVisit} from "/@/api/schema/DentalSchema";
import {createDentalVisit, getDentalVisit} from "/@/api/dental.api";

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
