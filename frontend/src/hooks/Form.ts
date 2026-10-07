import { useState } from "react";

export function useForm<T extends Record<string, unknown>>(
    initialValues: T
) {
    const [form, setForm] = useState<T>(initialValues);

    const setField = <K extends keyof T>(
        field: K,
        value: T[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const reset = () => {
        setForm(initialValues);
    };

    return {
        form,
        setForm,
        setField,
        reset,
    };
}