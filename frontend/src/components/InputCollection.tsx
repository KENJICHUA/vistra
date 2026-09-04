import React from "react";
import { FieldLabel } from "/@/utils/FieldLabel.jsx";

interface FormInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    id: string;
    icon?: React.ReactNode;
    className?: string;
}
interface SelectOption {
    code: string;
    label: string;
}

type SelectOptionInput = string | SelectOption;

interface SelectFieldProps {
    id: string;
    label: string;
    options: SelectOptionInput[];
    placeholder?: string;
}
export function SelectField({
                                id,
                                label,
                                options,
                                placeholder = "Select",
                            }: SelectFieldProps) {
    const normalized: SelectOption[] = options.map((opt) =>
        typeof opt === "string"
            ? {
                code: opt,
                label: opt,
            }
            : opt
    );

    return (
        <div>
            <FieldLabel htmlFor={id}>
                {label}
            </FieldLabel>

            <select
                id={id}
                name={id}
                defaultValue=""
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-textPrimary transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
                <option value="" disabled>
                    {placeholder}
                </option>

                {normalized.map((opt) => (
                    <option
                        key={opt.code}
                        value={opt.code}
                    >
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
export function FormInput({
                              label,
                              error,
                              id,
                              icon,
                              className,
                              ...props
                          }: FormInputProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-textMuted"
            >
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted">
                        {icon}
                    </div>
                )}

                <input
                    id={id}
                    {...props}
                    className={`w-full rounded-xl border bg-background py-3 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:outline-none focus:ring-2 ${
                        icon ? "pl-10 pr-3.5" : "px-3.5"
                    } ${
                        error
                            ? "border-danger/50 focus:border-danger/50 focus:ring-danger/20"
                            : "border-border focus:border-primary/50 focus:ring-primary/20"
                    } ${className ?? ""}`}
                />
            </div>

            {error && (
                <p className="mt-1 text-xs text-danger">
                    {error}
                </p>
            )}
        </div>
    );
}