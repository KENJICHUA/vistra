import  { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Stethoscope,
  Syringe,
  CalendarClock,
} from "lucide-react";
import { getMockPatientRecords } from "./patientsData";
import {usePatientContext} from "/@/context/PatientContext.tsx";

const TABS = [
  {
    key: "medical",
    label: "Medical",
    icon: Stethoscope,
    text: "text-primary",
    chip: "bg-primary/10",
  },
  {
    key: "dental",
    label: "Dental",
    icon: Syringe,
    text: "text-info",
    chip: "bg-info/10",
  },
  {
    key: "appointment",
    label: "Appointments",
    icon: CalendarClock,
    text: "text-treatment",
    chip: "bg-treatment/10",
  },
];

function getInitials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean);
  return (
    parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "?"
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function monthKey(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });
}

function RecordRow({ record, tabMeta }) {
  return (
    <div className="group flex gap-3 rounded-xl border border-border bg-background px-5 py-4 shadow-card transition-all duration-150 hover:border-primary/20">
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tabMeta.chip} ${tabMeta.text}`}
      >
        <tabMeta.icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <p className="text-sm font-semibold text-textPrimary">
            {record.title}
          </p>
          <span className="shrink-0 whitespace-nowrap rounded-md bg-surface px-2 py-0.5 text-xs font-medium text-textMuted">
            {formatDate(record.date)}
          </span>
        </div>
        {record.details && (
          <p className="mt-1.5 text-sm leading-relaxed text-textSecondary">
            {record.details}
          </p>
        )}
        {record.provider && (
          <p className="mt-3 border-t border-border pt-2.5 text-xs text-textMuted">
            {record.provider}
          </p>
        )}
      </div>
    </div>
  );
}

function EmptyState({ label, tabMeta }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
      <span
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${tabMeta.chip} ${tabMeta.text}`}
      >
        <tabMeta.icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <p className="text-sm font-medium text-textPrimary">
        No {label.toLowerCase()} records yet
      </p>
      <p className="mt-0.5 text-xs text-textMuted">
        Entries will appear here once one is added.
      </p>
    </div>
  );
}

export default function ViewStudentRecord() {
  const { patientProfiles } = usePatientContext();

  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("medical");
  const [records, setRecords] = useState({
    medical: [],
    dental: [],
    appointment: [],
  });
  const [loadingRecords, setLoadingRecords] = useState(true);
  // Look up the patient by the :id in the URL (matches patient.id, e.g. "PAT-1001")
  const patient = useMemo(() => patientProfiles.find((p) => p.patient_id === id), [id]);

  useEffect(() => {
    let cancelled = false;
    setLoadingRecords(true);
    //TODO use dataViewPatientRecords
    Promise.resolve(getMockPatientRecords(id)).then((data) => {
      if (!cancelled) {
        setRecords(data);
        setLoadingRecords(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleBack = () => navigate(-1);

  const isStudent = patient?.userType === "Student";
  const subLine = isStudent
    ? [patient?.course, patient?.yearSection].filter(Boolean).join(" • ")
    : patient?.department;

  const activeTabMeta = TABS.find((t) => t.key === activeTab);
  const activeRecords = (records[activeTab] || [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const grouped = useMemo(() => {
    const map = new Map();
    for (const record of activeRecords) {
      const key = monthKey(record.date);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(record);
    }
    return Array.from(map.entries());
  }, [activeRecords]);

  if (!patient) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-10 text-center shadow-card">
        <p className="text-sm font-medium text-textPrimary">
          No patient found for ID "{id}"
        </p>
        <p className="text-xs text-textMuted">
          It may have been removed, or the link is out of date.
        </p>
        <button
          type="button"
          onClick={handleBack}
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-textSecondary transition-colors duration-150 hover:bg-background hover:text-textPrimary"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card sm:flex-row">
      {" "}
      {/* Sidebar */}
      <div className="flex shrink-0 flex-col border-b border-border bg-white sm:w-72 sm:border-b-0 sm:border-r">
        <div className="p-7 pb-0">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex w-fit items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-textSecondary transition-colors duration-150 hover:bg-surface hover:text-textPrimary"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Back
          </button>
        </div>

        {/* Identity */}
        <div className="p-7 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-semibold text-primary ring-1 ring-inset ring-primary/15">
              {getInitials(patient?.name)}
            </div>

            <div className="min-w-0">
              <h1 className="font-heading text-lg font-semibold leading-snug tracking-tight text-primaryDark truncate">
                {patient?.name || "Unnamed patient"}
              </h1>
              <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-textSecondary">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isStudent ? "bg-primary" : "bg-treatment"}`}
                />
                {patient?.userType}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <dl className="space-y-4 border-t border-border px-7 py-6 text-xs">
          <div className="flex gap-x-1">
            <dt className="font-medium uppercase tracking-wide text-textMuted">
              ID:
            </dt>
            <dd className=" font-mono text-textPrimary">
              {patient?.userId}
            </dd>
          </div>

          {subLine && (
            <div>
              <dt className="font-medium uppercase tracking-wide text-textMuted">
                {isStudent ? "Course" : "Department"}
              </dt>
              <dd className="mt-1 text-textPrimary">{subLine}</dd>
            </div>
          )}

          {patient?.lastVisit && (
            <div>
              <dt className="font-medium uppercase tracking-wide text-textMuted">
                Last visit
              </dt>
              <dd className="mt-1 text-textPrimary">{patient.lastVisit}</dd>
            </div>
          )}
        </dl>

        {/* Section nav */}
        <nav className="space-y-1.5 border-t border-border p-5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? `${tab.chip} ${tab.text}`
                    : "text-textSecondary hover:bg-surface hover:text-textPrimary"
                }`}
              >
                <tab.icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span className="flex-1 text-left">{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive ? "bg-white/70" : "bg-border text-textMuted"
                  }`}
                >
                  {loadingRecords ? "…" : (records[tab.key] || []).length}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
      {/* Record panel */}
      <div
        key={activeTab}
        className="min-w-0 flex-1 animate-[fadeIn_150ms_ease-out] p-7 sm:p-8"
      >
        <div className="mb-7 flex items-start justify-between gap-4 border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activeTabMeta.chip} ${activeTabMeta.text}`}
            >
              <activeTabMeta.icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <p
                className={`text-[11px] font-semibold uppercase tracking-wider ${activeTabMeta.text}`}
              >
                {patient?.name?.split(" ")[0] || "Patient"}'s history
              </p>
              <h2 className="mt-0.5 font-heading text-xl font-semibold tracking-tight text-textPrimary">
                {activeTabMeta?.label}
              </h2>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-textMuted">
            {loadingRecords
              ? "Loading…"
              : `${activeRecords.length} record${activeRecords.length === 1 ? "" : "s"}`}
          </span>
        </div>

        {loadingRecords ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
            <p className="text-xs text-textMuted">Loading records…</p>
          </div>
        ) : grouped.length > 0 ? (
          <div className="space-y-8">
            {grouped.map(([month, entries]) => (
              <div key={month}>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-textMuted">
                  {month}
                </p>
                <div className="space-y-3">
                  {entries.map((record) => (
                    <RecordRow
                      key={record.id}
                      record={record}
                      tabMeta={activeTabMeta}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            label={activeTabMeta?.label || activeTab}
            tabMeta={activeTabMeta}
          />
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
