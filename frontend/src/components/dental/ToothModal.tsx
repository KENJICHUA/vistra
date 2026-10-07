import {X} from "lucide-react";
import React from "react";
import type {ReactNode} from "react";

interface ToothModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
    footer?: ReactNode;
}

export function ToothModal({title, onClose, children, footer}: ToothModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-surface shadow-lg">
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                    <h2 className="font-heading text-base font-semibold text-primaryDark">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1 text-textMuted hover:bg-surfaceMuted hover:text-textPrimary"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4"/>
                    </button>
                </div>

                <div className="space-y-5 px-6 py-6">{children}</div>

                <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
                    {footer}
                </div>
            </div>
        </div>
    );
}