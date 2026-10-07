import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Search, X } from "lucide-react";
import { sessionManager } from "/@/utils/SessionManager";

interface PatientPageHeaderProps {
  patientId?: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  unreadCount?: number;
  onNotificationsClick?: () => void;
}

function getGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getToday(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function PatientPageHeader({
  searchQuery,
  setSearchQuery,
  unreadCount = 0,
  onNotificationsClick,
}: PatientPageHeaderProps) {
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const user = sessionManager.getUser() as Record<string, any> | null;
  const firstName: string =
    user?.first_name || user?.firstName || user?.name?.split(" ")[0] || "";

  const greeting = useMemo(() => getGreeting(), []);
  const today = useMemo(() => getToday(), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setMobileSearchOpen(true);
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setSearchQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setSearchQuery]);

  useEffect(() => {
    setMobileSearchOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-20 border-b border-primary/10 bg-background/75 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <div
          className={`min-w-0 flex-1 ${
            mobileSearchOpen ? "hidden sm:block" : ""
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <h1 className="truncate text-xl font-semibold tracking-tight text-textPrimary sm:text-2xl">
              {greeting}
              {firstName ? `, ${firstName}` : ""}
            </h1>
            <span
              aria-hidden
              className="hidden h-5 w-px shrink-0 bg-textPrimary/20 sm:block"
            />
            <span className="hidden shrink-0 text-sm text-textPrimary/55 sm:block">
              {today}
            </span>
          </div>
        </div>

        <div
          className={`group relative ${
            mobileSearchOpen ? "flex-1" : "hidden"
          } sm:block sm:w-64 sm:flex-none sm:transition-[width] sm:duration-200 sm:focus-within:w-80 lg:w-80 lg:focus-within:w-96`}
        >
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-textPrimary/40 transition-colors group-focus-within:text-primary"
          />
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search this page"
            aria-label="Search this page"
            className="h-10 w-full rounded-full border border-primary/15 bg-white/70 pl-10 pr-10 text-sm text-textPrimary shadow-sm placeholder:text-textPrimary/40 focus:border-primary/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-textPrimary/50 hover:bg-primary/10 hover:text-textPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-primary/15 bg-background px-1.5 py-0.5 text-[11px] font-medium text-textPrimary/45 lg:block"
            >
              /
            </kbd>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setMobileSearchOpen((open) => !open);
            if (mobileSearchOpen) setSearchQuery("");
          }}
          aria-label={mobileSearchOpen ? "Close search" : "Open search"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white/70 text-textPrimary/70 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:hidden"
        >
          {mobileSearchOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>

        <button
          type="button"
          onClick={onNotificationsClick}
          aria-label={
            unreadCount > 0
              ? `Notifications, ${unreadCount} unread`
              : "Notifications"
          }
          className={`relative h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white/70 text-textPrimary/70 shadow-sm transition-colors hover:bg-white hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
            mobileSearchOpen ? "hidden sm:flex" : "flex"
          }`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white ring-2 ring-background">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
