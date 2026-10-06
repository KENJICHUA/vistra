import axios, {AxiosError, AxiosInstance, AxiosRequestConfig,} from "axios";

import {sessionManager} from "/@/utils/SessionManager";
import {API_ENDPOINTS, getApiUrl} from "/@/config/ApiConfig";
import {FastAPIErrorResponse} from "/@/api/schema/FastApiValidationResponse";
import {FastAPIConflictError, FastAPIValidationError} from "/@/api/errors";

const API_URL = getApiUrl();

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        const refreshToken = sessionManager.getRefreshToken();

        if (!refreshToken) {
            throw new Error("No refresh token available");
        }

        try {
            const response = await axios.post(
                `${API_URL}${API_ENDPOINTS.auth.refresh_token}`,
                {
                    refresh_token: refreshToken,
                }
            );

            const {access_token, refresh_token} = response.data;

            sessionManager.setTokens(
                access_token,
                refresh_token
            );

            return access_token;

        } catch (error) {
            sessionManager.clear();
            throw new Error("Session expired");
        }
    })();

    try {
        return await refreshPromise;
    } finally {
        refreshPromise = null;
    }
};

const axiosClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = sessionManager.getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    }
);


/*
 * Response interceptor
 */
axiosClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== API_ENDPOINTS.auth.login &&
            originalRequest.url !== API_ENDPOINTS.staff.login &&
            originalRequest.url !== API_ENDPOINTS.patient.login
        ) {
            originalRequest._retry = true;

            try {
                const accessToken = await refreshAccessToken();

                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${accessToken}`,
                };

                return axiosClient(originalRequest);

            } catch (refreshError) {
                sessionManager.clear();
                throw refreshError;
            }
        }

        if (error.response?.status === 422) {
            const data = error.response.data as FastAPIErrorResponse;
            throw new FastAPIValidationError(data);
        }


        if (error.response?.status === 409) {
            const data = error.response.data as { detail: string };

            throw new FastAPIConflictError(
                data.detail || "Conflict"
            );
        }

        throw error;
    }
);

export const apiClient = async <T = unknown>(
    endpoint: string,
    options: AxiosRequestConfig = {}
): Promise<{
    response: Awaited<ReturnType<typeof axiosClient>>;
    data: T;
}> => {

    const response = await axiosClient({
        url: endpoint,
        ...options,
    });

    return {
        response,
        data: response.data as T,
    };
};