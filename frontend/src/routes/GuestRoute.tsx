import { Navigate, Outlet } from "react-router-dom";
import { sessionManager } from "/@/utils/SessionManager";
import { ROUTES } from "/@/config/RoutePaths";

/**
 * Blocks authenticated users from visiting login pages.
 * Staff go to the staff overview, everyone else with a
 * session goes to the patient overview.
 */
export default function GuestRoute(): React.JSX.Element {
    if (sessionManager.isAuthenticated()) {
        const target = sessionManager.isStaff()
            ? ROUTES.staff.dashboard.overview
            : ROUTES.patient.dashboard.overview;

        return <Navigate to={target} replace />;
    }

    return <Outlet />;
}
