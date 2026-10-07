export function getHonorific(position: any) {
    return position?.toLowerCase().includes("doctor") ? "Dr." : "";
}

export function getGreeting(date = new Date()) {
    const hour = date.getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

export function formatDisplayDate(date = new Date()) {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(date);
}

export function extractStaffCode(email: any) {
    if (!email || typeof email !== "string") {
        return "";
    }

    return email.split("@")[0].toUpperCase();
}

export function getClinicOperationState(date = new Date()) {
    const day = date.getDay();

    if (day === 0) {
        return "closed";
    }

    const currentTime = date.getHours() * 60 + date.getMinutes();

    const openingTime = 7 * 60;
    const closingTime = 17 * 60;

    return currentTime >= openingTime && currentTime < closingTime
        ? "open"
        : "closed";
}

export function getFieldErrors(error: unknown): string {
    if (!error) {
        return "";
    }

    if (Array.isArray((error as any).detail)) {
        return (error as any).detail
            .map((item: any) => {
                const field = item.loc?.[item.loc.length - 1];

                if (field) {
                    return `${field}: ${item.msg}`;
                }

                return item.msg;
            })
            .join(", ");
    }

    if (typeof (error as any).detail === "string") {
        return (error as any).detail;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "";
}

export function removeEmptyValues<T extends Record<string, unknown>>(
    obj: T
): T {
    return Object.fromEntries(
        Object.entries(obj).filter(
            ([, value]) => value !== "" && value !== null && value !== undefined
        )
    ) as T;
}