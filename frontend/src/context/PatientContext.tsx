import React, {
    createContext,
    useContext,
    ReactNode,
    useMemo,
} from "react";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createPatientAccount,
    getAllPatientProfiles,
} from "/@/api/patient.api";

import {CreatePatientSchema, PatientProfile} from "/@/api/schema/PatientSchema";

import {
    PatientModel,
    PatientDashboardRecord,
} from "/@/repository/PatientModel";

import { sessionManager } from "/@/utils/SessionManager";
import {isFastAPIError} from "/@/utils/ApiHelper";
import {ApiDataResponse} from "/@/api/schema/ApiResponseSchema";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type SavePatientInput = Omit<CreatePatientSchema, "created_by">;

interface PatientContextType {
    // Server data
    patientProfiles: PatientProfile[];

    // Application/domain data
    patientRecords: PatientDashboardRecord[];

    // Query state
    isLoading: boolean;
    isRefreshing: boolean;
    error: string | null;

    // Mutation state
    isSaving: boolean;
    saveError: Error | null | unknown;

    // Actions
    refreshPatients: () => Promise<unknown>;
    savePatient: (record: SavePatientInput) => Promise<unknown>;
}

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */

const PatientContext = createContext<PatientContextType | undefined>(
    undefined
);

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

interface PatientProviderProps {
    children: ReactNode;
}

export function PatientProvider({
                                    children,
                                }: PatientProviderProps) {
    const queryClient = useQueryClient();

    /*
     * React Query owns the server state.
     *
     * This gives us:
     * - patientProfiles
     * - loading state
     * - fetching state
     * - errors
     * - refetching
     */

    const {
        data: patientProfiles = [],
        isLoading,
        isFetching,
        error,
        refetch,
    } = usePatientQuery();

    /*
     * Convert API models into records specifically
     * designed for the patient dashboard.
     *
     * Components don't need to know how this transformation works.
     */
    const patientRecords = useMemo<PatientDashboardRecord[]>(
        () =>
            patientProfiles.map((patientProfile) => {
                const patientModel = new PatientModel(patientProfile);

                return patientModel.dataViewPatientDashboardRecord();
            }),
        [patientProfiles]
    );

    /*
     * Save patient mutation.
     *
     * The provider adds application-specific behavior:
     * - Gets the currently logged-in staff member
     * - Adds created_by
     * - Calls the API
     * - Invalidates the patient query after success
     */
    const savePatientMutation = useMutation({
        mutationFn: async (record: SavePatientInput) => {
            const user = sessionManager.getUser();
            if (!user){
                throw new Error("Not logged in");
            }
            const patientData = {
                ...record,
                created_by: user.staff_id,
            };

            return createPatientAccount(patientData);
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["patients"],
            });
        },
        onError: (error: unknown) => {
            if (isFastAPIError(error)) {
                return;
            }

            if(error instanceof Error) {
                return;
            }

        }
    });

    /*
     * Context exposes only what the rest of the application needs.
     */
    const contextValue = useMemo<PatientContextType>(
        () => ({
            patientProfiles,
            patientRecords,

            isLoading,
            isRefreshing: isFetching,
            error: error
                ? "Failed to load patient profiles."
                : null,

            isSaving: savePatientMutation.isPending,
            saveError: savePatientMutation.error,

            refreshPatients: refetch,
            savePatient: savePatientMutation.mutateAsync,
        }),
        [
            patientProfiles,
            patientRecords,
            isLoading,
            isFetching,
            error,
            savePatientMutation.isPending,
            savePatientMutation.error,
            refetch,
            savePatientMutation.mutateAsync,
        ]
    );

    return (
        <PatientContext.Provider value={contextValue}>
            {children}
        </PatientContext.Provider>
    );
}

/* -------------------------------------------------------------------------- */
/* React Query                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Handles patient server state.
 *
 * React Query is responsible for:
 * - fetching
 * - caching
 * - stale state
 * - garbage collection
 * - refetching
 */
export function usePatientQuery() {
    return useQuery({
        queryKey: ["patients"],
        queryFn: async () => {
            const response: ApiDataResponse<PatientProfile> = await getAllPatientProfiles();
            return response.data;
        },

        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,

        refetchOnWindowFocus: false,
    });
}

/* -------------------------------------------------------------------------- */
/* Context Hook                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Provides access to patient-specific application functionality.
 *
 * Must be used inside PatientProvider.
 */
export function usePatientContext(): PatientContextType {
    const context = useContext(PatientContext);

    if (!context) {
        throw new Error(
            "usePatientContext must be used within a PatientProvider"
        );
    }

    return context;
}