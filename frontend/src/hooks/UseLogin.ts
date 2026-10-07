import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { sessionManager } from "/@/utils/SessionManager";
import { login } from "/@/api/auth.api";
import { PasswordAndId } from "/@/api/schema/ApiResponseSchema"
import axios from "axios";
/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface LoginValidationErrors {
    email?: string;
    password?: string;
}

/* -------------------------------------------------------------------------- */
/* Login Mutation                                                             */
/* -------------------------------------------------------------------------- */

export function useLogin() {
    const mutation = useMutation({
        mutationFn: async (credentials: PasswordAndId) =>
            login({ identifier: credentials.email, password: credentials.password }),

        onSuccess: (data) => {
            sessionManager.setLogin(
                data.access_token,
                data.refresh_token,
                data.user
            );
        },
    });

    const errorMessage =
        axios.isAxiosError(mutation.error)
            ? mutation.error.response?.data?.detail ?? mutation.error.message
            : mutation.error?.message ?? null;

    return {
        login: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: errorMessage,
    };
}

/* -------------------------------------------------------------------------- */
/* Login Form                                                                 */
/* -------------------------------------------------------------------------- */

export function useLoginForm() {
    const [credentials, setCredentials] =
        useState<PasswordAndId>({
            email: "",
            password: "",
        });

    const [validationErrors, setValidationErrors] =
        useState<LoginValidationErrors>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the field's validation error
        // when the user starts correcting it.
        setValidationErrors((previous) => ({
            ...previous,
            [name]: undefined,
        }));
    };

    const validate = (): boolean => {
        const newErrors: LoginValidationErrors = {};

        if (!credentials.email.trim()) {
            newErrors.email = "Staff ID is required.";
        }

        if (!credentials.password) {
            newErrors.password = "Password is required.";
        }

        setValidationErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    return {
        credentials,
        validationErrors,
        handleChange,
        validate,
    };
}
