import {apiClient} from "/@/api/client";
import { API_ENDPOINTS } from "/@/config/ApiConfig.js";
import { StaffModel } from "/@/repository/StaffModel.js";
import { ApiDataResponse } from "/@/api/schema/ApiResponseSchema"

export const getStaffById = async (
    staffId: string,
    signal?: AbortSignal
): Promise<StaffModel> => {
    const { data: apiResponse } = await apiClient<ApiDataResponse<StaffModel>>(
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