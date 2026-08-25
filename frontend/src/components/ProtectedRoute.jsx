import { Navigate, Outlet } from "react-router-dom";
import { sessionManager  } from "../utils/SessionManager.ts";

export default function ProtectedRoute() {
    if (!sessionManager.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}