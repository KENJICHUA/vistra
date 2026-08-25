import { ROUTES } from "./RoutePaths";
import {
    LayoutDashboard,
    CalendarDays,
    HeartPulse,
    Stethoscope,
    UsersRound,
} from "lucide-react";

export const AdminRoutes = [
    {
        path: ROUTES.admin.dashboard.overview,
        label: "Overview",
        icon: LayoutDashboard,
        component: "overview",
    },
    {
        path: ROUTES.admin.dashboard.medical,
        label: "Medical Consultation",
        icon: HeartPulse,
        component: "medical",
    },
    {
        path: ROUTES.admin.dashboard.dental,
        label: "Dental Consultation",
        icon: Stethoscope,
        component: "dental",
    },
    {
        path: ROUTES.admin.dashboard.appointments,
        label: "Appointments",
        icon: CalendarDays,
        component: "appointments",
    },
    {
        path: ROUTES.admin.dashboard.patients,
        label: "Patient Management",
        icon: UsersRound,
        component: "patients"
    },
];