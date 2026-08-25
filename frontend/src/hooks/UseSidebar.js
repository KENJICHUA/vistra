import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useSidebar(firstLinkRef) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    // Close when navigating
    useEffect(() => {
        close();
    }, [location.pathname]);

    // Close when switching to desktop
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const handleChange = (event) => {
            if (event.matches) {
                close();
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    // Prevent background scrolling
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    // Focus + Escape key
    useEffect(() => {
        if (!isOpen) return;

        firstLinkRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                close();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, firstLinkRef]);

    return {
        isOpen,
        open,
        close,
    };
}