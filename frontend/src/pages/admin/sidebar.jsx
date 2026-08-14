import React, { forwardRef, useEffect, useRef, useState } from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Settings,
  LogOut,
  Stethoscope,
  HeartPulse,
  Menu,
  X,
} from "lucide-react";
import {sessionManager} from "../../utils/SessionManager.js";



const navTabs = [
  {
    path: "/admin/dashboard/overview",
    label: "Overview",
    icon: LayoutDashboard,
    activePath: "/admin/dashboard/overview",
  },
  {
    path: "/admin/dashboard/medical",
    label: "Medical Consultation",
    icon: HeartPulse,
    activePaths: [ "/admin/dashboard/medical", "/admin/medical", ],
  },
  {
    path: "/admin/dashboard/dental",
    label: "Dental Consultation",
    icon: Stethoscope,
    activePath: "/admin/dashboard/dental",
  },
  {
    path: "/admin/dashboard/appointments",
    label: "Appointments",
    icon: CalendarDays,
    activePath: "/admin/dashboard/appointments",
  },
];

const SidebarLink = forwardRef(function SidebarLink({ item, onNavigate }, ref) {
  const Icon = item.icon;
  const location = useLocation();
  const isActive = item.activePaths?.some((path) => location.pathname.startsWith(path)) || location.pathname === item.path;

  return (
    <NavLink
      ref={ref}
      to={item.path}
      onClick={onNavigate}
      className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-textSecondary hover:text-primary"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
      {item.label}
    </NavLink>
  );
});

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionManager.logout();
    setIsOpen(false);
    navigate("/admin/login");
  };
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e) => {
      if (e.matches) setIsOpen(false);
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);


  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    firstLinkRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
    
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
        <img src="/Vistralogo.png" alt="Vistra Logo" className="h-7 w-auto object-contain" />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-sidebar"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-textSecondary transition-colors hover:bg-background hover:text-textPrimary"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

     
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 max-w-[80vw] shrink-0 flex-col border-r border-border bg-surface transition-transform duration-200 ease-out
          lg:static lg:z-auto lg:h-full lg:w-64 lg:max-w-none lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between gap-2.5 px-6 py-6">
          <img src="/Vistralogo.png" alt="Vistra Logo" className="h-8 w-auto object-contain" />

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-textSecondary transition-colors hover:bg-background hover:text-textPrimary lg:hidden"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
          {navTabs.map((item, index) => (
            <SidebarLink
              key={item.path}
              item={item}
              onNavigate={() => setIsOpen(false)}
              ref={index === 0 ? firstLinkRef : undefined}
            />
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-textSecondary transition-colors duration-200 hover:bg-background hover:text-danger"
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}