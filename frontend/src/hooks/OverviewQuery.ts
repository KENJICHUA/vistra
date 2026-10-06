import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "/@/api/appointments.api";
import { getDentalVisit } from "/@/api/dental.api";
import { getMedicalVisit } from "/@/api/medical.api";

/**
 * Overview panel server state.
 * Reuses existing list endpoints - no new backend route.
 * - Appointments: GET /appointments/
 * - Consultations: merged GET /medical/ + GET /dental/
 */
export function useOverviewAppointments(limit = 6) {
    return useQuery({
        queryKey: ["overview", "appointments", limit],
        queryFn: async ({ signal }) => {
            const { data } = await getAllAppointments(
                { page: 1, page_size: limit },
                signal
            );

            if (!data.data) {
                throw new Error("Appointment data is missing");
            }

            return data.data;
        },
        refetchOnWindowFocus: false,
        staleTime: 30_000,
    });
}

export function useOverviewConsultations(limit = 8) {
    return useQuery({
        queryKey: ["overview", "consultations", limit],
        queryFn: async ({ signal }) => {
            const half = Math.ceil(limit / 2);
            const [medicalRes, dentalRes] = await Promise.all([
                getMedicalVisit({ page: 1, page_size: half }, signal),
                getDentalVisit({ page: 1, page_size: half }, signal),
            ]);

            if (!medicalRes.data.data || !dentalRes.data.data) {
                throw new Error("Consultation data is missing");
            }

            return {
                medical: medicalRes.data.data,
                dental: dentalRes.data.data,
            };
        },
        refetchOnWindowFocus: false,
        staleTime: 30_000,
    });
}
