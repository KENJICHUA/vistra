export interface ApiDataResponse<T> {
    success: boolean;
    message?: string;
    data: Array<T>;
}

export interface ApiMessageResponse {
    success: boolean;
    message: string;
}

export interface PasswordAndId {
    staffId: string;
    password: string;
}

export interface LoginStaffResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    detail: string
    user: userSessionField;
}

interface userSessionField {
    email: string
    id: string
    staff_id: string
}
