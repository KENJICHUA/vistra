import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

import Sidebar from "../pages/admin/sidebar";

const NO_HEADER_ROUTES = [
  "/admin/medical/new",
  "/admin/medical/records/view",
  "/admin/dental/new",
  "/admin/dental/records/view",
];

export default function AdminLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const hideHeader = NO_HEADER_ROUTES.includes(location.pathname);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans text-textPrimary selection:bg-primary/20">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden pt-14 lg:pt-0">
        {!hideHeader && (
          <header className="flex flex-col gap-3 border-b border-border bg-surface px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center justify-between gap-3 lg:justify-start">
              <div className="min-w-0">
                <h1 className="truncate font-heading text-lg font-semibold text-textPrimary sm:text-xl">
                  Good morning, Dr. Fiesta
                </h1>
                <p className="mt-0.5 text-xs text-textMuted">
                  Tuesday, August 4 · Clinic Operations
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2.5 lg:hidden">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-textSecondary hover:text-textPrimary"
                >
                  <Bell className="h-4 w-4" strokeWidth={2} />
                </button>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
                  LMF
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative min-w-0 flex-1 lg:flex-none">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3.5 text-sm text-textPrimary placeholder:text-textMuted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 lg:w-72"
                />
              </div>

              <div className="hidden shrink-0 items-center gap-2.5 sm:gap-3 lg:flex">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-textSecondary hover:text-textPrimary"
                >
                  <Bell className="h-4 w-4" strokeWidth={2} />
                </button>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
                  LMF
                </div>
              </div>
            </div>
          </header>
        )}

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
}