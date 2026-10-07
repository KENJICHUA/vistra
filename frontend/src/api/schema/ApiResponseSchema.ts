import {SessionUser} from "/@/utils/SessionManager";

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}
export interface PaginatedData<T> {
    items: T[];
    page: number;
    page_size: number;
    total: number;
    total_pages: number
}
export interface ApiMessageResponse {
    success: boolean;
    message: string;
}

export interface PasswordAndId {
    email: string;
    password: string;
}

export interface LoginStaffResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    detail: string
    user: SessionUser;
}