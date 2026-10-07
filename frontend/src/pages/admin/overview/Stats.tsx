import React from "react";
import {
    CalendarDays,
    Stethoscope,
    FileText,
    Activity,
    LucideIcon,
} from "lucide-react";
import Card from "/@/components/Card";

export interface StatData {
    id: string;
    value: number;
    delta?: string;
}

interface StatConfig {
    id: string;
    label: string;
    icon: LucideIcon;
}

const STAT_CONFIG: StatConfig[] = [
    {
        id: "today",
        label: "Today's Appointments",
        icon: CalendarDays,
    },
    {
        id: "consultations",
        label: "In Consultation",
        icon: Stethoscope,
    },
    {
        id: "records",
        label: "Records Updated",
        icon: FileText,
    },
    {
        id: "activity",
        label: "Active Staff",
        icon: Activity,
    },
];

interface StatCardProps {
    label: string;
    value: number;
    delta?: string;
    icon: LucideIcon;
}

interface StatsGridProps {
    stats: StatData[];
}

function StatCard({
                      label,
                      value,
                      delta,
                      icon: Icon,
                  }: StatCardProps) {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-textMuted">
                    {label}
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon
                        className="h-4 w-4"
                        strokeWidth={2}
                    />
                </span>
            </div>

            <p className="mt-4 font-heading text-3xl font-semibold text-textPrimary">
                {value}
            </p>

            {delta && (
                <p className="mt-1 text-xs text-textMuted">
                    {delta}
                </p>
            )}
        </Card>
    );
}

export default function StatsGrid({
    stats,
}: StatsGridProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STAT_CONFIG.map((config) => {
                const data = stats.find(
                    (stat) => stat.id === config.id
                );

                return (
                    <StatCard
                        key={config.id}
                        label={config.label}
                        value={data?.value ?? 0}
                        delta={data?.delta}
                        icon={config.icon}
                    />
                );
            })}
        </div>
    );
}
