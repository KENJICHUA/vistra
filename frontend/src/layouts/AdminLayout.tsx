import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../pages/admin/sidebar";
import StaffPageHeader from "../components/StaffPageHeader";
import { sessionManager } from "../utils/SessionManager";

const HIDDEN_HEADER_PATHS =
    [
        "/admin/medical/medical-record-form",
        "/admin/medical/records/viewrecord",
    ];


export default function AdminLayout() {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const hideHeader = HIDDEN_HEADER_PATHS.includes(location.pathname);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background font-sans text-textPrimary selection:bg-primary/20">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden pt-14 lg:pt-0">
                {!hideHeader && (
                    <StaffPageHeader
                        staffId={sessionManager.getUser()?.staff_id || ""}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                )}

                <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
                    <Outlet context={{ searchQuery }} />
                </main>
            </div>
        </div>
    );
}