import React, { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({ title, onClose, children, footer, maxWidth = "max-w-sm" }) {
  useEffect(() => {
    if (!onClose) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div
        className={`w-full ${maxWidth} rounded-2xl border border-border bg-surface p-6 shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || onClose) && (
          <div className="mb-5 flex items-center justify-between">
            {title && <h3 className="font-heading text-base font-semibold text-primaryDark">{title}</h3>}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-textMuted transition-colors hover:bg-background hover:text-textPrimary"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            )}
          </div>
        )}

        {children}

        {footer && <div className="mt-6 flex items-center justify-between gap-3">{footer}</div>}
      </div>
    </div>
  );
}