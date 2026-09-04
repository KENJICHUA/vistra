import React, { forwardRef, useRef } from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import { useSidebar } from "../../hooks/UseSidebar.js";
import {
  LogOut,
  Menu,
  X,
} from "lucide-react";
import {sessionManager} from "../../utils/SessionManager.ts";
import { AdminRoutes } from "../../config/Routes.js";
import {ROUTES} from "../../config/RoutePaths.js";
import {LogoClickable} from "../../components/Clickables.jsx";

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
    close();
    navigate(ROUTES.public.home);
  };
  const firstLinkRef = useRef(null);
  const { isOpen, open, close } = useSidebar(firstLinkRef);


  return (
    <>
    
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
        <LogoClickable className="h-7" navigateTo={ROUTES.admin.dashboard.overview} />
        <button
          type="button"
          onClick={() => open()}
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
        onClick={() => close()}
        aria-hidden="true"
      />

      <aside
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-64 max-w-[80vw] shrink-0 flex-col border-r border-border bg-surface transition-transform duration-200 ease-out
          lg:static lg:z-auto lg:h-full lg:w-64 lg:max-w-none lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between gap-2.5 px-6 py-6">
          <LogoClickable className="h-8" navigateTo={ROUTES.admin.dashboard.overview} />

          <button
            type="button"
            onClick={() => close()}
            aria-label="Close navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-textSecondary transition-colors hover:bg-background hover:text-textPrimary lg:hidden"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
          {AdminRoutes.map((item, index) => (
            <SidebarLink
              key={item.path}
              item={item}
              onNavigate={() => close()}
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