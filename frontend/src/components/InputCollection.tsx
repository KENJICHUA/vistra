import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FieldLabel } from "/@/utils/FieldLabel.jsx";

interface PasswordInputProps {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    error?: string;
}

interface FormInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    id: string;
    icon?: React.ReactNode;
    rightElement?: React.ReactNode;
    className?: string;
}

interface SelectOption {
    code: string;
    label: string;
}

type SelectOptionInput = string | SelectOption;

interface SelectFieldProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    label: string;
    options: SelectOptionInput[];
    placeholder?: string;
    error?: string;
    className?: string;
}

export function PasswordInput({
    value,
    onChange,
    error,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormInput
            label="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={value}
            onChange={onChange}
            placeholder="••••••••"
            error={error}
            icon={
                <Lock
                    className="h-4 w-4"
                    strokeWidth={2}
                />
            }
            rightElement={
                <button
                    type="button"
                    onClick={() =>
                        setShowPassword((prev) => !prev)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded text-textMuted transition-colors duration-200 hover:text-textSecondary"
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }
                >
                    {showPassword ? (
                        <EyeOff
                            className="h-4 w-4"
                            strokeWidth={2}
                        />
                    ) : (
                        <Eye
                            className="h-4 w-4"
                            strokeWidth={2}
                        />
                    )}
                </button>
            }
        />
    );
}

export function SelectField({
    id,
    label,
    options,
    placeholder = "Select",
    error,
    className,
    ...props
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
                {...props}
                className={`w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-textPrimary transition-colors duration-200 focus:outline-none focus:ring-2 ${
                    error
                        ? "border-danger/50 focus:border-danger/50 focus:ring-danger/20"
                        : "border-border focus:border-primary/50 focus:ring-primary/20"
                } ${className ?? ""}`}
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

            {error && (
                <p className="mt-1 text-xs text-danger">
                    {error}
                </p>
            )}
        </div>
    );
}

export function FormInput({
    label,
    error,
    id,
    icon,
    rightElement,
    className,
    ...props
}: FormInputProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-left text-xs font-semibold uppercase tracking-wide text-textMuted"
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
                        icon
                            ? "pl-10"
                            : "pl-3.5"
                    } ${
                        rightElement
                            ? "pr-11"
                            : "pr-3.5"
                    } ${
                        error
                            ? "border-danger/50 focus:border-danger/50 focus:ring-danger/20"
                            : "border-border focus:border-primary/50 focus:ring-primary/20"
                    } ${className ?? ""}`}
                />

                {rightElement}
            </div>

            {error && (
                <p className="mt-1 text-xs text-danger">
                    {error}
                </p>
            )}
        </div>
    );
}
