import {apiClient} from "/@/api/client";
import {API_ENDPOINTS} from "/@/config/ApiConfig.js";
import {ApiDataResponse, ApiMessageResponse} from "/@/api/schema/ApiResponseSchema"
import {CreatePatientSchema, PatientProfile} from "/@/api/schema/PatientSchema";
import {FastAPIErrorResponse} from "/@/api/schema/FastApiValidationResponse";

export const createPatientAccount = async  (
    request: CreatePatientSchema,
    signal?: AbortSignal
): Promise<ApiMessageResponse> => {
    const { data: apiResponse, response } = await apiClient<ApiMessageResponse>(
        API_ENDPOINTS.patient.create_patient,
        {
            method: "POST",
            body: JSON.stringify(request),
            signal,
        }
    );


    if (!response.ok) {
        throw apiResponse;
    }

    return apiResponse;
}

export const getAllPatientProfiles = async () :Promise<ApiDataResponse<PatientProfile>> => {
    const { data: apiResponse, response } = await apiClient<ApiDataResponse<PatientProfile>>(
        API_ENDPOINTS.patient.get_all_patient_profile,
        {
            method: "GET",
        }
    );
    if (!response.ok) {
        throw await response.json();
    }

    return apiResponse;
};
