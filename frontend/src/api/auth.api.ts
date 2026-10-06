import { apiClient } from "/@/api/axios_client";
import { API_ENDPOINTS } from "/@/config/ApiConfig";
import { LoginStaffResponse } from "/@/api/schema/ApiResponseSchema";

export interface LoginRequest {
    identifier?: string;
    email?: string;
    patient_id?: string;
    staff_id?: string;
    password: string;
}

export const login = async (
    request: LoginRequest
): Promise<LoginStaffResponse> => {
    const result = await apiClient<LoginStaffResponse>(
        API_ENDPOINTS.auth.login,
        {
            method: "POST",
            data: request,
        }
    );

    return result.data;
};
