import { Navigate, Outlet } from "react-router-dom";
import { sessionManager  } from "/@/utils/SessionManager.ts";
import { ROUTES } from "/@/config/RoutePaths.js";

export default function ProtectedRoute() {
    if (!sessionManager.isAuthenticated()) {
        return <Navigate to={ROUTES.admin.login} replace />;
    }

    return <Outlet />;
}