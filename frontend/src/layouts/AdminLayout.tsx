import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "/@/pages/admin/sidebar";
import StaffPageHeader from "/@/components/StaffPageHeader";
import { sessionManager } from "/@/utils/SessionManager";
import { AdminAnimStyles } from "/@/components/adminanim.jsx";

const HIDDEN_HEADER_PATHS = [
    "/staff/medical/new",
    "/staff/medical/records/view",
    "/staff/dental/new",
    "/staff/dental/records/view",
    "/staff/patient/new",
    "/staff/appointment/view",
    "/staff/patient/record/view",
];

export default function AdminLayout() {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const mainRef = useRef<HTMLElement>(null);

    const hideHeader = HIDDEN_HEADER_PATHS.some((path) =>
        location.pathname.startsWith(path)
    );

    useEffect(() => {
        mainRef.current?.scrollTo({ top: 0 });
    }, [location.pathname]);

    return (
        <div className="page-in layout-in flex h-screen w-full overflow-hidden bg-gradient-to-br from-background via-primary/[0.03] to-primary/10 font-sans text-textPrimary selection:bg-primary/20">
            <AdminAnimStyles />
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden pt-14 lg:pt-0">
                {!hideHeader && (
                    <div className="slide-down">
                        <StaffPageHeader
                            staffId={sessionManager.getUser()?.user_id || ""}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </div>
                )}

                <main
                    ref={mainRef}
                    className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-6"
                >
                    <div key={location.pathname} className="route-in">
                        <Outlet context={{ searchQuery }} />
                    </div>
                </main>
            </div>
        </div>
    );
}