import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { sessionManager } from "/@/utils/SessionManager";
import { login, LoginRequest } from "/@/api/auth.api";

export const PATIENT_ID_PATTERN = /^\d{8}-[SFA]$/i;

export interface PatientLoginFormState {
    idNumber: string;
    password: string;
}

export function usePatientLogin() {
    const mutation = useMutation({
        mutationFn: (request: LoginRequest) => login(request),
        onSuccess: (data) => {
            sessionManager.setLogin(
                data.access_token,
                data.refresh_token,
                data.user
            );
        },
    });

    const errorMessage = axios.isAxiosError(mutation.error)
        ? mutation.error.response?.data?.detail ?? mutation.error.message
        : mutation.error?.message ?? null;

    return {
        login: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: errorMessage,
    };
}

export function usePatientLoginForm() {
    const [credentials, setCredentials] = useState<PatientLoginFormState>({
        idNumber: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toRequest = (): LoginRequest => ({
        identifier: credentials.idNumber.trim(),
        password: credentials.password,
    });

    return { credentials, handleChange, toRequest };
}
