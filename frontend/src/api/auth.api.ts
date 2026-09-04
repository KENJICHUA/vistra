import { apiClient } from "/@/api/client";
import { API_ENDPOINTS } from "/@/config/ApiConfig";
import { PasswordAndId, LoginStaffResponse } from "/@/api/schema/ApiResponseSchema"

export const loginStaff = async ({
                                     staffId,
                                     password,
                                 }: PasswordAndId) => {
    let result;

    try {
        result = await apiClient<LoginStaffResponse>(
            API_ENDPOINTS.staff.login,
            {
                method: "POST",
                body: JSON.stringify({
                    email: staffId,
                    password,
                }),
            }
        );
    } catch (e) {
        throw new Error(
            "Unable to connect to server. Please try again later."
        );
    }

    const { response, data } = result;

    if (!response.ok) {
        throw new Error(data?.detail ?? "Login failed");
    }

    return data;
};
