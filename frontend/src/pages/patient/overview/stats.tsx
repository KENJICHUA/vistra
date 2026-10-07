import React from "react";
import { CalendarClock, Stethoscope, ShieldCheck, ClipboardList } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { formatDate } from "/@/utils/FormatDate";
import { Appointment } from "../appointments/appointmentsData";

interface Stat {
  id: string;
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  accent: {
    ring: string;
    iconBg: string;
    iconText: string;
  };
}

interface PatientStatsGridProps {
  nextAppointment: Appointment | null;
  visitCount: number;
  medicalStatus?: string;
  dentalStatus?: string;
}

const ACCENTS = {
  sky: { ring: "ring-sky-500/15", iconBg: "bg-sky-500/10", iconText: "text-sky-600" },
  violet: { ring: "ring-violet-500/15", iconBg: "bg-violet-500/10", iconText: "text-violet-600" },
  emerald: { ring: "ring-emerald-500/15", iconBg: "bg-emerald-500/10", iconText: "text-emerald-600" },
  amber: { ring: "ring-amber-500/15", iconBg: "bg-amber-500/10", iconText: "text-amber-600" },
};

function buildStatCards({
  nextAppointment,
  visitCount,
  medicalStatus,
  dentalStatus,
}: PatientStatsGridProps): Stat[] {
  return [
    {
      id: "next-appointment",
      label: "Next Appointment",
      value: nextAppointment ? formatDate(nextAppointment.date) : "None scheduled",
      delta: nextAppointment ? `${nextAppointment.type} · ${nextAppointment.time}` : "Book one anytime",
      icon: CalendarClock,
      accent: ACCENTS.sky,
    },
    {
      id: "visits",
      label: "Total Visits",
      value: String(visitCount),
      delta: "Logged to your record",
      icon: Stethoscope,
      accent: ACCENTS.violet,
    },
    {
      id: "medical",
      label: "Medical Status",
      value: medicalStatus || "No record yet",
      delta: "Clinic clearance",
      icon: ShieldCheck,
      accent: ACCENTS.emerald,
    },
    {
      id: "dental",
      label: "Dental Status",
      value: dentalStatus || "No record yet",
      delta: "Clinic clearance",
      icon: ClipboardList,
      accent: ACCENTS.amber,
    },
  ];
}

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-5 shadow-card ring-1 transition-transform duration-200 hover:-translate-y-0.5 ${stat.accent.ring}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-textMuted">{stat.label}</span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.accent.iconBg} ${stat.accent.iconText}`}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
      <p className="mt-4 truncate font-heading text-2xl font-semibold text-textPrimary capitalize">
        {stat.value}
      </p>
      <p className="mt-1 truncate text-xs text-textMuted">{stat.delta}</p>
    </div>
  );
}

export default function PatientStatsGrid({
  nextAppointment,
  visitCount,
  medicalStatus,
  dentalStatus,
}: PatientStatsGridProps) {
  const statCards = buildStatCards({ nextAppointment, visitCount, medicalStatus, dentalStatus });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}