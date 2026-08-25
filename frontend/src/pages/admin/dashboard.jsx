import {
  Search,
  Bell,
  ChevronRight,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import Sidebar from "./sidebar";
import AppointmentsTab from "./appointments/appointmentsTab";
import OverviewTab from "./overview/overview";
import MedicalTab from "./medical/medicalTab";
import { filterByQuery } from "../../utils/FilterByQuery.js";
const RECORDS = [
  { id: "REC-3391", student: "Miguel Santos", lastUpdated: "Aug 3, 2026", updatedBy: "Dr. Villanueva" },
  { id: "REC-3392", student: "Ana Reyes", lastUpdated: "Aug 3, 2026", updatedBy: "Nurse Ibarra" },
  { id: "REC-3393", student: "Liam Cruz", lastUpdated: "Aug 2, 2026", updatedBy: "Dr. Villanueva" },
];

const SETTINGS_SECTIONS = [
  { id: "profile", title: "Staff Profile", description: "Name, role, and contact details shown to other staff." },
  { id: "notifications", title: "Notifications", description: "Choose which alerts you receive for queue and appointments." },
  { id: "security", title: "Security", description: "Password, two-factor authentication, and active sessions." },
];



function PanelHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-heading text-base font-semibold text-textPrimary">{title}</h2>
      {action}
    </div>
  );
}

function QueueList({ entries }) {
  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry) => (
        <div key={entry.id} className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
          <div>
            <p className="text-sm font-medium text-textPrimary">{entry.student}</p>
            <p className="mt-0.5 text-xs text-textMuted">{entry.reason}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-textMuted">Waiting since</p>
            <p className="mt-0.5 text-sm text-textSecondary">{entry.waitingSince}</p>
          </div>
        </div>
      ))}
      {entries.length === 0 && (
        <p className="py-6 text-center text-sm text-textMuted">Queue is empty.</p>
      )}
    </div>
  );
}

function RecordsTable({ records }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">Student</th>
            <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">Record ID</th>
            <th className="pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">Last Updated</th>
            <th className="pb-2 text-xs font-semibold uppercase tracking-wide text-textMuted">Updated By</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b border-border last:border-b-0">
              <td className="py-3 pr-4 text-sm font-medium text-textPrimary">{record.student}</td>
              <td className="py-3 pr-4 text-sm text-textSecondary">{record.id}</td>
              <td className="py-3 pr-4 text-sm text-textSecondary">{record.lastUpdated}</td>
              <td className="py-3 text-sm text-textSecondary">{record.updatedBy}</td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-center text-sm text-textMuted">
                No records match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function QueueTab({ searchQuery }) {
  const filteredQueue = useMemo(
    () => filterByQuery(QUEUE, searchQuery, ["student", "reason", "id"]),
    [searchQuery]
  );

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <PanelHeader
        title="Queue"
        action={
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {filteredQueue.length} waiting
          </span>
        }
      />
      <div className="mt-4">
        <QueueList entries={filteredQueue} />
      </div>
    </div>
  );
}

function RecordsTab({ searchQuery }) {
  const filteredRecords = useMemo(
    () => filterByQuery(RECORDS, searchQuery, ["student", "id", "updatedBy"]),
    [searchQuery]
  );

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <PanelHeader title="Student Records" />
      <div className="mt-4">
        <RecordsTable records={filteredRecords} />
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="flex flex-col gap-4">
      {SETTINGS_SECTIONS.map((section) => (
        <div key={section.id} className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-base font-semibold text-textPrimary">{section.title}</h2>
              <p className="mt-1 text-xs text-textMuted">{section.description}</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-textSecondary transition-colors duration-200 hover:border-primary/50 hover:text-primary"
            >
              Manage
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const TAB_COMPONENTS = {
  overview: OverviewTab,
  medical: MedicalTab,
  appointments: AppointmentsTab,
  records: RecordsTab,
  settings: SettingsTab,
};

const TAB_SEARCH_PLACEHOLDERS = {
  overview: "Search students or appointments",
  medical: "Search medical records or patients",
  dental: "Search dental records or patients",
  appointments: "Search appointments",
  records: "Search student records",
  settings: "Search settings",
};

export default function AdminDashboardPage() {
  const [activeNavId, setActiveNavId] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const ActiveTab = TAB_COMPONENTS[activeNavId];

  const handleSelectNav = (id) => {
    setActiveNavId(id);
    setSearchQuery("");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans text-textPrimary selection:bg-primary/20">
      <Sidebar activeNavId={activeNavId} onSelectNav={handleSelectNav} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-border bg-surface px-8 py-4">
          <div>
            <h1 className="font-heading text-xl font-semibold text-textPrimary">Good morning, Dr. Fiesta</h1>
            <p className="mt-0.5 text-xs text-textMuted">Tuesday, August 4 · Clinic Ops Overview</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted" strokeWidth={2} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={TAB_SEARCH_PLACEHOLDERS[activeNavId]}
                className="w-72 rounded-xl border border-border bg-background py-2.5 pl-9 pr-3.5 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="button"
              aria-label="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-textSecondary transition-colors duration-200 hover:text-textPrimary"
            >
              <Bell className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
              LMF
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <ActiveTab searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
}