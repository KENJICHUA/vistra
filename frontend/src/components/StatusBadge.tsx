export const statusConfig = {
  completed: {
    label: "Completed",
    className: "border-success/30 bg-success/10 text-success",
  },

  followUp: {
    label: "Follow-up",
    className: "border-warning/30 bg-warning/10 text-warning",
  },

  referred: {
    label: "Referred",
    className: "border-info/30 bg-info/10 text-info",
  },

  ongoingTreatment: {
    label: "Ongoing Treatment",
    className: "border-treatment/30 bg-treatment/10 text-treatment",
  },

  confirmed: {
    label: "Confirmed",
    className: "border-primary/30 bg-primary/10 text-primary",
  },

  pending: {
    label: "Pending",
    className: "border-warning/30 bg-warning/10 text-warning",
  },

  declined: {
    label: "Declined",
    className: "border-danger/30 bg-danger/10 text-danger",
  },

  cleared: {
    label: "Cleared",
    className: "border-success/30 bg-success/10 text-success",
  },

  secondOpinion: {
    label: "Second Opinion",
    className: "border-warning/30 bg-warning/10 text-warning",
  },

  recovered: {
    label: "Recovered",
    className: "border-primary/30 bg-primary/10 text-primary",
  },
} as const;

export const statusLabels = {
  completed: "Completed",
  followUp: "Follow-up",
  referred: "Referred",
  ongoingTreatment: "Ongoing Treatment",
  confirmed: "Confirmed",
  pending: "Pending",
  declined: "Declined",
  cleared: "Cleared",
  secondOpinion: "Second Opinion",
  recovered: "Recovered",
} as const;

export type Status = keyof typeof statusConfig;

/*
 * Values that arrive from the database but match no key or
 * label in statusConfig (e.g. DENTAL_VISIT defaults to
 * 'ComingSoon', medical uses 'Not Cleared' / 'Second Option').
 */
const DB_STATUS_ALIASES: Record<string, Status> = {
  "comingsoon": "pending",
  "coming soon": "pending",
  "not cleared": "declined",
  "second option": "secondOpinion",
};

/*
 * Adapter: normalize any backend status string (key, display
 * label, or known DB variant) to a Status key. Returns null
 * when nothing matches so callers can fall back gracefully
 * instead of crashing on statusConfig[status].
 */
export function resolveStatus(value: unknown): Status | null {
  if (typeof value !== "string") {
    return null;
  }

  const raw = value.trim();

  if (!raw) {
    return null;
  }

  if (raw in statusConfig) {
    return raw as Status;
  }

  const lowered = raw.toLowerCase();

  for (const [key, config] of Object.entries(statusConfig)) {
    if (config.label.toLowerCase() === lowered) {
      return key as Status;
    }
  }

  return DB_STATUS_ALIASES[lowered] ?? null;
}

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const resolved = resolveStatus(status);

  if (!resolved) {
    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                border
                border-border
                bg-surfaceMuted
                px-2.5
                py-1
                text-xs
                font-medium
                text-textSecondary
            `}
      >
            {status || "—"}
        </span>
    );
  }

  const { label, className } = statusConfig[resolved];

  return (
      <span
          className={`
                inline-flex
                items-center
                rounded-full
                border
                px-2.5
                py-1
                text-xs
                font-medium
                ${className}
            `}
      >
            {label}
        </span>
  );
}

