import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { sessionManager } from "/@/utils/SessionManager";
import { loginStaff } from "/@/api/auth.api";
import { PasswordAndId } from "/@/api/schema/ApiResponseSchema"
/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface LoginValidationErrors {
    staffId?: string;
    password?: string;
}

/* -------------------------------------------------------------------------- */
/* Login Mutation                                                             */
/* -------------------------------------------------------------------------- */

export function useLogin() {
    const mutation = useMutation({
        mutationFn: loginStaff,

        onSuccess: (data) => {
            console.log(data);

            sessionManager.setLogin(
                data.access_token,
                data.refresh_token,
                data.user
            )
        },
    });

    return {
        login: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error?.message ?? null,
    };
}

/* -------------------------------------------------------------------------- */
/* Login Form                                                                 */
/* -------------------------------------------------------------------------- */

export function useLoginForm() {
    const [credentials, setCredentials] =
        useState<PasswordAndId>({
            staffId: "",
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

        if (!credentials.staffId.trim()) {
            newErrors.staffId = "Staff ID is required.";
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
