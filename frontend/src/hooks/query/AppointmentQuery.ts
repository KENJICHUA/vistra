import {AppointmentFilters} from "/@/api/schema/FilterSchemaCollection";
import {useQuery} from "@tanstack/react-query";
import {getAllAppointments, getAppointmentById} from "/@/api/appointments.api";

export function useAppointmentQuery(filters?: AppointmentFilters) {
    return useQuery({
        queryKey: ["appointments", filters],
        queryFn: async ({signal}) => {
            const {data} = await getAllAppointments(
                filters,
                signal
            );

            if (!data.data) {
                throw new Error("Appointment data is missing");
            }

            return data.data;
        },
        refetchOnWindowFocus: false,
    })
}

export function useAppointmentByIdQuery(
    appointmentId: string,
    patientId: string
) {
    return useQuery({
        queryKey: ["appointment", appointmentId, patientId],
        queryFn: async ({signal}) => {
            const {data} = await getAppointmentById(
                appointmentId,
                patientId,
                signal
            );

            if (!data.data) {
                throw new Error("Appointment data is missing");
            }

            return data.data;
        },
        refetchOnWindowFocus: false,
    })
}
