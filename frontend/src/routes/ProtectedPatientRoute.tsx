import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "/@/config/RoutePaths";
import { sessionManager, type SessionUser } from "/@/utils/SessionManager";

// Static patient used only when VITE_SKIP_AUTH=true, so patient pages have
// something to render while there's no backend to actually log in against.
const MOCK_PATIENT: SessionUser = {
    id: "mock-patient-id",
    user_id: "20230518-S",
    email: "jane.delacruz@example.edu",
    role: "patient",
};

// Set VITE_SKIP_AUTH=true in frontend/.env to bypass patient auth locally.
const skipAuth: boolean = import.meta.env.VITE_SKIP_AUTH === "true";

export default function ProtectedPatientRoute(): React.JSX.Element {
    if (skipAuth) {
        if (!sessionManager.getUser()) {
            sessionManager.setUser(MOCK_PATIENT);
        }
        return <Outlet />;
    }

    if (!sessionManager.isAuthenticated()) {
        return <Navigate to={ROUTES.patient.login} replace />;
    }

    if (!sessionManager.isPatientLike()) {
        return <Navigate to={ROUTES.staff.dashboard.overview} replace />;
    }

    return <Outlet />;
}
