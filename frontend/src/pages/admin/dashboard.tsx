import { Search, Bell, ChevronRight } from "lucide-react";
import React, { useMemo, useState, type ReactNode } from "react";
import Sidebar from "./sidebar";
import AppointmentsTab from "./appointments/appointmentsTab";
import OverviewTab from "./overview/Overview";
import MedicalTab from "./medical/medicalTab";
import { filterByQuery } from "/@/utils/FilterByQuery.js";
import { AdminAnimStyles, CountUp } from "/@/components/adminanim.jsx";

interface QueueEntry {
  id: string;
  student: string;
  reason: string;
  waitingSince: string;
}

interface StudentRecord {
  id: string;
  student: string;
  lastUpdated: string;
  updatedBy: string;
}

interface SettingsSection {
  id: string;
  title: string;
  description: string;
}

interface TabProps {
  searchQuery: string;
}

type NavId = "overview" | "medical" | "dental" | "appointments" | "records" | "settings";

type SidebarProps = {
  activeNavId: NavId;
  onSelectNav: (id: NavId) => void;
};

const DashboardSidebar = Sidebar as unknown as React.ComponentType<SidebarProps>;

function AppointmentsTabAdapter(_props: TabProps) {
  const [, setFilters] = useState<unknown>();
  const appointmentProps = {} as React.ComponentProps<typeof AppointmentsTab>;

  return <AppointmentsTab setFilters={setFilters as typeof appointmentProps.setFilters} />;
}

const TABLE_AREA_HEIGHT = "h-[340px]";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const QUEUE: QueueEntry[] = [];

const RECORDS: StudentRecord[] = [
  { id: "REC-3391", student: "Miguel Santos", lastUpdated: "Aug 3, 2026", updatedBy: "Dr. Villanueva" },
  { id: "REC-3392", student: "Ana Reyes", lastUpdated: "Aug 3, 2026", updatedBy: "Nurse Ibarra" },
  { id: "REC-3393", student: "Liam Cruz", lastUpdated: "Aug 2, 2026", updatedBy: "Dr. Villanueva" },
];

const SETTINGS_SECTIONS: SettingsSection[] = [
  { id: "profile", title: "Staff Profile", description: "Name, role, and contact details shown to other staff." },
  { id: "notifications", title: "Notifications", description: "Choose which alerts you receive for queue and appointments." },
  { id: "security", title: "Security", description: "Password, two-factor authentication, and active sessions." },
];

const TAB_SEARCH_PLACEHOLDERS: Record<NavId, string> = {
  overview: "Search is turned off on Overview",
  medical: "Search medical records or patients",
  dental: "Search dental records or patients",
  appointments: "Search appointments",
  records: "Search student records",
  settings: "Search settings",
};

const SEARCH_DISABLED_TABS: NavId[] = ["overview"];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function todayLabel() {
  return new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" });
}

function PanelHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-heading text-base font-semibold text-textPrimary">{title}</h2>
      {action}
    </div>
  );
}

function QueueList({ entries }: { entries: QueueEntry[] }) {
  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="hover-lift flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
        >
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

function RecordsTable({ records }: { records: StudentRecord[] }) {
  return (
    <table className="w-full table-fixed">
      <thead className="sticky top-0 bg-surface">
        <tr className="border-b border-border text-left">
          <th className="w-[34%] pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">Student</th>
          <th className="w-[22%] pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">Record ID</th>
          <th className="w-[22%] pb-2 pr-4 text-xs font-semibold uppercase tracking-wide text-textMuted">Last Updated</th>
          <th className="w-[22%] pb-2 text-xs font-semibold uppercase tracking-wide text-textMuted">Updated By</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr
            key={record.id}
            className="border-b border-border transition-colors duration-200 last:border-b-0 hover:bg-primary/5"
          >
            <td className="truncate py-3 pr-4 text-sm font-medium text-textPrimary">{record.student}</td>
            <td className="truncate py-3 pr-4 text-sm text-textSecondary">{record.id}</td>
            <td className="truncate py-3 pr-4 text-sm text-textSecondary">{record.lastUpdated}</td>
            <td className="truncate py-3 text-sm text-textSecondary">{record.updatedBy}</td>
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
  );
}

function QueueTab({ searchQuery }: TabProps) {
  const filteredQueue = useMemo<QueueEntry[]>(
    () => filterByQuery(QUEUE, searchQuery, ["student", "reason", "id"]),
    [searchQuery]
  );

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <PanelHeader
        title="Queue"
        action={
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold tabular-nums text-primary">
            <CountUp to={filteredQueue.length} /> waiting
          </span>
        }
      />
      <div className={`mt-4 overflow-y-auto ${TABLE_AREA_HEIGHT}`}>
        <QueueList entries={filteredQueue} />
      </div>
    </div>
  );
}

function RecordsTab({ searchQuery }: TabProps) {
  const filteredRecords = useMemo<StudentRecord[]>(
    () => filterByQuery(RECORDS, searchQuery, ["student", "id", "updatedBy"]),
    [searchQuery]
  );

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <PanelHeader title="Student Records" />
      <div className={`mt-4 overflow-auto ${TABLE_AREA_HEIGHT}`}>
        <RecordsTable records={filteredRecords} />
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="stagger-group flex flex-col gap-4">
      {SETTINGS_SECTIONS.map((section) => (
        <div
          key={section.id}
          className="hover-lift rounded-2xl border border-border bg-surface p-6 shadow-card"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-base font-semibold text-textPrimary">{section.title}</h2>
              <p className="mt-1 text-xs text-textMuted">{section.description}</p>
            </div>
            <button
              type="button"
              className={`group inline-flex shrink-0 items-center gap-1 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-textSecondary transition-colors duration-200 hover:border-primary/50 hover:text-primary ${focusRing}`}
            >
              Manage
              <ChevronRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const TAB_COMPONENTS: Partial<Record<NavId, React.ComponentType<TabProps>>> = {
  overview: OverviewTab,
  medical: MedicalTab,
  appointments: AppointmentsTabAdapter,
  records: RecordsTab,
  settings: SettingsTab,
};

export default function AdminDashboardPage() {
  const [activeNavId, setActiveNavId] = useState<NavId>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const ActiveTab = TAB_COMPONENTS[activeNavId];
  const searchDisabled = SEARCH_DISABLED_TABS.includes(activeNavId);

  const handleSelectNav = (id: NavId) => {
    setActiveNavId(id);
    setSearchQuery("");
  };

  return (
    <div className="page-in layout-in flex h-screen w-full overflow-hidden bg-gradient-to-br from-background via-primary/[0.03] to-primary/10 font-sans text-textPrimary selection:bg-primary/20">
      <AdminAnimStyles />
      <DashboardSidebar activeNavId={activeNavId} onSelectNav={handleSelectNav} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="slide-down flex items-center justify-between border-b border-border bg-surface/80 px-8 py-4 backdrop-blur-md">
          <div>
            <h1 className="font-heading text-xl font-semibold text-textPrimary">
              {greeting()}, Dr. Fiesta
            </h1>
            <p className="mt-0.5 text-xs text-textMuted">{todayLabel()} · Clinic Ops Overview</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="group/field relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted transition-colors duration-200 group-focus-within/field:text-primary"
                strokeWidth={2}
              />
              <input
                type="text"
                value={searchDisabled ? "" : searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={searchDisabled}
                placeholder={TAB_SEARCH_PLACEHOLDERS[activeNavId]}
                className="w-72 rounded-xl border border-border bg-background py-2.5 pl-9 pr-3.5 text-sm text-textPrimary placeholder:text-textMuted transition-all duration-200 hover:border-primary/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <button
              type="button"
              aria-label="Notifications"
              className={`flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-textSecondary transition-all duration-200 hover:-translate-y-0.5 hover:text-primary ${focusRing}`}
            >
              <Bell className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
              LMF
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div key={activeNavId} className="route-in">
            {ActiveTab ? <ActiveTab searchQuery={searchDisabled ? "" : searchQuery} /> : null}
          </div>
        </main>
      </div>
    </div>
  );
} 