import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatientAccount } from "/@/api/patient.api";
import { CreatePatientSchema } from "/@/api/schema/PatientSchema";
import { sessionManager } from "/@/utils/SessionManager";

type SavePatientInput = Omit<CreatePatientSchema, "created_by">;

export function useSavePatient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (record: SavePatientInput) => {
            const user = sessionManager.getUser();

            if (!user) {
                throw new Error("Not logged in");
            }

            return createPatientAccount({
                ...record,
                created_by: user.user_id,
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["patients"],
            });
        },
    });
}