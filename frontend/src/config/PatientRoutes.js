import { ROUTES } from "./RoutePaths.ts";
import {
    LayoutDashboard,
    CalendarDays,
    HeartPulse,
    Stethoscope,
    UserRound,
} from "lucide-react";

export const PatientRoutes = [
    {
        path: ROUTES.patient.dashboard.overview,
        label: "Overview",
        icon: LayoutDashboard,
        component: "overview",
    },
    {
        path: ROUTES.patient.dashboard.appointments,
        label: "Appointments",
        icon: CalendarDays,
        component: "appointments",
    },
    {
        path: ROUTES.patient.dashboard.medical,
        label: "Medical Records",
        icon: HeartPulse,
        component: "medical",
    },
    {
        path: ROUTES.patient.dashboard.dental,
        label: "Dental Records",
        icon: Stethoscope,
        component: "dental",
    },
    {
        path: ROUTES.patient.profile,
        label: "My Profile",
        icon: UserRound,
        component: "profile",
    },
];
