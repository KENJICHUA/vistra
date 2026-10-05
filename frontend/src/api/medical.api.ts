import {ApiResponse, PaginatedData} from "/@/api/schema/ApiResponseSchema";
import {apiClient} from "/@/api/axios_client";
import {API_ENDPOINTS} from "/@/config/ApiConfig";
import {MedicalVisitFilters} from "/@/api/schema/FilterSchemaCollection";
import {CreateMedicalVisit, CreateMedicalVisitResponse, MedicalRecordDetailSchema, MedicalVisitSchema} from "/@/api/schema/MedicalSchema";

export async function createMedicalVisit(
    record: CreateMedicalVisit,
    signal?: AbortSignal
) {
    return apiClient<CreateMedicalVisitResponse>(
        API_ENDPOINTS.medical.create_medical_visit,
        {
            method: "POST",
            data: record,
            signal
        }
    );
}

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

export async function getMedicalRecordById(
    patientId: string,
    medicalId: string,
    signal?: AbortSignal
) {
    return apiClient<ApiResponse<MedicalRecordDetailSchema>>(
        API_ENDPOINTS.medical.get_medical_record(patientId, medicalId),
        {
            method: "GET",
            signal
        }
    );
}
