export function getHonorific(position) {
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
export function extractStaffCode(email) {
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