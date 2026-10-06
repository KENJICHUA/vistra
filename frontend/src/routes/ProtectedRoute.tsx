import { Navigate, Outlet } from "react-router-dom";
import { sessionManager } from "/@/utils/SessionManager";
import { ROUTES } from "/@/config/RoutePaths";

export default function ProtectedRoute(): React.JSX.Element {
    if (!sessionManager.isAuthenticated()) {
        return <Navigate to={ROUTES.staff.login} replace />;
    }

    if (!sessionManager.isStaff() && sessionManager.getRole()) {
        return <Navigate to={ROUTES.patient.dashboard.overview} replace />;
    }

    return <Outlet />;
}
