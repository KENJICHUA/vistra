import { apiClient } from "./client";
import { API_ENDPOINTS } from "../config/ApiConfig.js";
import { StaffModel } from "../repository/StaffModel.js";

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const getStaffById = async (
    staffId: string,
    signal?: AbortSignal
): Promise<StaffModel> => {
    const { data: apiResponse } = await apiClient<ApiResponse<StaffModel>>(
        API_ENDPOINTS.admin.getStaffById(staffId),
        {
            method: "GET",
            signal,
        }
    );
    if (!apiResponse) {
        throw new Error("Staff member not found");
    }

    return new StaffModel(apiResponse.data);
};
