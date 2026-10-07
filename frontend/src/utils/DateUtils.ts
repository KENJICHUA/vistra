export function formatDate(
  date: string | Date | null | undefined
): string {
  if (!date) return "N/A";

  const parsedDate = new Date(
    typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? `${date}T00:00:00`
      : date
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(
  date: string | Date | null | undefined
): string {
  if (!date) return "N/A";

  const parsedDate = new Date(
    typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? `${date}T00:00:00`
      : date
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function todayISO(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

export function getDateParts(date: string): {
  monthShort: string;
  day: string;
  weekday: string;
  weekdayShort: string;
  short: string;
} | null {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return {
    monthShort: parsedDate.toLocaleDateString("en-US", { month: "short" }),
    day: parsedDate.toLocaleDateString("en-US", { day: "numeric" }),
    weekday: parsedDate.toLocaleDateString("en-US", { weekday: "long" }),
    weekdayShort: parsedDate.toLocaleDateString("en-US", { weekday: "short" }),
    short: parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };
}

export function to12Hour(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return time;
  }

  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function daysUntilLabel(date: string): string {
  const target = new Date(`${date}T00:00:00`);

  if (Number.isNaN(target.getTime())) {
    return "";
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const diff = Math.round(
    (target.getTime() - now.getTime()) / 86400000
  );

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff > 1) return `In ${diff} days`;

  return "";
}
