import { sessionManager } from "../utils/SessionManager";

const API_URL: string = import.meta.env.VITE_LOCAL_API_URL;

export const apiClient = async <T = unknown>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{
    response: Response;
    data: T;
}> => {
    const accessToken = sessionManager.getAccessToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",

            ...(accessToken && {
                Authorization: `Bearer ${accessToken}`,
            }),

            ...options.headers,
        },
    });

    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
        ? await response.json() as T
        : await response.text() as T;

    return {
        response,
        data,
    };
};