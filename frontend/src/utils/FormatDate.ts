// Formats an ISO-style date string ("2026-09-18") into a readable
// long-form date ("September 18, 2026"). Falls back to the raw string
// if it can't be parsed, so a bad value never crashes the UI.
export function formatDate(dateStr: string): string {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

// Compact version ("Sep 18") for tight spaces like metric tiles, where
// the full long-form date would overflow or force awkward truncation.
export function formatShortDate(dateStr: string): string {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    }).format(date);
}

export function parseTimeToday(timeStr: string | null | undefined): number {
    if (!timeStr) {
        return Number.MAX_SAFE_INTEGER;
    }

    const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(timeStr.trim());

    if (!match) {
        return Number.MAX_SAFE_INTEGER;
    }

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const meridiem = match[3].toUpperCase();

    if (meridiem === "PM" && hours !== 12) {
        hours += 12;
    }

    if (meridiem === "AM" && hours === 12) {
        hours = 0;
    }

    return hours * 60 + minutes;
}


export const formatTime = (dateTime?: string | null): string => {
    if (!dateTime) {
        return "";
    }

    const timePart = dateTime.split("T")[1];

    if (!timePart) {
        return "";
    }

    const [hours, minutes] = timePart.split(":");

    const date = new Date();
    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
};


export function monthKey(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
    });
}