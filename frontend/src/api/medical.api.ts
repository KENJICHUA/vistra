import {ApiResponse, PaginatedData} from "/@/api/schema/ApiResponseSchema";
import {apiClient} from "/@/api/axios_client";
import {API_ENDPOINTS} from "/@/config/ApiConfig";
import {MedicalVisitFilters} from "/@/api/schema/FilterSchemaCollection";
import {MedicalVisitSchema} from "/@/api/schema/MedicalSchema";

export async function getMedicalVisit(
    filter?: MedicalVisitFilters,
    signal?: AbortSignal
) {
    return apiClient<ApiResponse<PaginatedData<MedicalVisitSchema>>>(
        API_ENDPOINTS.medical.get_medical_visit,
        {
            method: "GET",
            params: filter,
            signal
        }
    );
}
