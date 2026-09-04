import { sessionManager } from "/@/utils/SessionManager";
import {API_ENDPOINTS} from "/@/config/ApiConfig";
import {getApiUrl} from "../config/ApiConfig";
const API_URL: string = getApiUrl();
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

        const response = await fetch(`${API_URL}${API_ENDPOINTS.auth.refresh_token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            }),
        });

        if (!response.ok) {
            sessionManager.clear();
            throw new Error("Session expired");
        }

        const data = await response.json();

        sessionManager.setTokens(
            data.access_token,
            data.refresh_token
        );

        return data.access_token;
    })();

    try {
        return await refreshPromise;
    } finally {
        refreshPromise = null;
    }
};


export const apiClient = async <T = unknown>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{
    response: Response;
    data: T;
}> => {

    const makeRequest = async (accessToken: string | null) => {
        return fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",

                ...(accessToken && {
                    Authorization: `Bearer ${accessToken}`,
                }),

                ...options.headers,
            },
        });
    };

    let accessToken = sessionManager.getAccessToken();
    let response = await makeRequest(accessToken);

    if (response.status === 401) {
        try {
            accessToken = await refreshAccessToken();
            response = await makeRequest(accessToken);
        } catch (error) {
            sessionManager.clear();
            throw error;
        }
    }
    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
        ? await response.json() as T
        : await response.text() as T;

    return {
        response,
        data,
    };
};