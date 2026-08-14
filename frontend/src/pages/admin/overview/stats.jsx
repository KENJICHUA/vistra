import React from "react";
import { CalendarDays, Stethoscope, FileText, Activity } from "lucide-react";

const STAT_CARDS = [
  { id: "today", label: "Today's Appointments", value: "18", delta: "+3 vs yesterday", icon: CalendarDays },
  { id: "consultations", label: "In Consultation", value: "6", delta: "2 Medical, 4 Dental", icon: Stethoscope },
  { id: "records", label: "Records Updated", value: "42", delta: "Today", icon: FileText },
  { id: "activity", label: "Active Staff", value: "9", delta: "On shift now", icon: Activity },
];

function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-textMuted">{stat.label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
      <p className="mt-4 font-heading text-3xl font-semibold text-textPrimary">{stat.value}</p>
      <p className="mt-1 text-xs text-textMuted">{stat.delta}</p>
    </div>
  );
}

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STAT_CARDS.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}