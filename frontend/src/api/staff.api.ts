import {apiClient} from "/@/api/client";
import { API_ENDPOINTS } from "/@/config/ApiConfig.js";
import { StaffModel } from "/@/repository/StaffModel.js";
import { ApiResponse } from "/@/api/schema/ApiResponseSchema"

export const getStaffById = async (
    staffId: string,
    signal?: AbortSignal
): Promise<StaffModel> => {
    const { data: apiResponse } = await apiClient<ApiResponse<StaffModel[]>>(
        API_ENDPOINTS.staff.getStaffById(staffId),
        {
            method: "GET",
            signal,
        }
    );

    if (!apiResponse.data || apiResponse.data.length === 0 || !apiResponse) {
        throw new Error(`Staff not found for ${staffId}`);
    }

    return new StaffModel(apiResponse.data[0]);
};