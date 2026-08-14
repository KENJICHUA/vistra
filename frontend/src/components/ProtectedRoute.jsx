import { Navigate, Outlet } from "react-router-dom";
import { sessionManager  } from "../utils/SessionManager.js";

export default function ProtectedRoute() {
    if (!sessionManager.isAuthenticated()) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}