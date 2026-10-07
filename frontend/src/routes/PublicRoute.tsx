import {sessionManager} from "/@/utils/SessionManager";
import {Navigate, Outlet} from "react-router-dom";
import {ROUTES} from "/@/config/RoutePaths";

export default function PublicRoute() {
    if (sessionManager.isAuthenticated()) {
        return <Navigate to={ROUTES.staff.dashboard.overview} replace />;
    }

    return <Outlet />;
}