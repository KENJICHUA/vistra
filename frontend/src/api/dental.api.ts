import {CreateDentalVisit, DentalVisitSchema} from "/@/api/schema/DentalSchema";
import {ApiMessageResponse, ApiResponse, PaginatedData} from "/@/api/schema/ApiResponseSchema";
import {apiClient} from "/@/api/axios_client";
import {API_ENDPOINTS} from "/@/config/ApiConfig";
import {DentalVisitFilters} from "/@/api/schema/FilterSchemaCollection";

export async function createDentalVisit(
    record: CreateDentalVisit,
    signal?: AbortSignal
) {
    return apiClient<ApiMessageResponse>(
        API_ENDPOINTS.dental.create_dental_visit,
        {
            method: "POST",
            data: record,
            signal
        }
    );
}

export async function getDentalVisit(
    filter?: DentalVisitFilters,
    signal?: AbortSignal
) {
    return apiClient<ApiResponse<PaginatedData<DentalVisitSchema>>>(
        API_ENDPOINTS.dental.get_dental_visit,
        {
            method: "GET",
            params: filter,
            signal
        }
    );
}
