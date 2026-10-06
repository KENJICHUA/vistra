import axios from "axios";

import {apiClient} from "/@/api/axios_client";
import {API_ENDPOINTS} from "/@/config/ApiConfig";
import {
    PasswordAndId,
    LoginStaffResponse
} from "/@/api/schema/ApiResponseSchema";

export interface UnifiedLoginRequest {
    identifier?: string;
    email?: string;
    patient_id?: string;
    staff_id?: string;
    password: string;
}

export const loginUnified = async (
    request: UnifiedLoginRequest
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

export const loginStaff = async ({
                                     email,
                                     password,
                                 }: PasswordAndId): Promise<LoginStaffResponse> => {
    return loginUnified({ identifier: email, password });
};

export interface PatientLoginRequest {
    patient_id: string;
    password: string;
}

export const loginPatient = async ({
                                       patient_id,
                                       password,
                                   }: PatientLoginRequest): Promise<LoginStaffResponse> => {
    return loginUnified({ identifier: patient_id, password });
};