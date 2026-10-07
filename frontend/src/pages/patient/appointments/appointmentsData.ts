import {
  CheckCircle2,
  XCircle,
  Hourglass,
  RotateCcw,
  LucideIcon,
} from "lucide-react";

import { ROUTES } from "/@/config/RoutePaths.js";
import { todayISO } from "/@/utils/DateUtils";

export type AppointmentStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "rescheduled";

export interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  rescheduledTo?: {
    date: string;
    time: string;
  };
}

export interface StatusMeta {
  label: string;
  icon: LucideIcon;
  iconText: string;
  dot: string;
  message: string;
}

export const STATUS_META: Record<AppointmentStatus, StatusMeta> = {
  pending: {
    label: "Pending Review",
    icon: Hourglass,
    iconText: "text-amber-600",
    dot: "bg-amber-500",
    message:
      "The clinic is reviewing your request. The outcome will appear here once they respond.",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    iconText: "text-emerald-600",
    dot: "bg-emerald-500",
    message:
      "Your appointment is confirmed. Please arrive a few minutes early.",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    iconText: "text-rose-600",
    dot: "bg-rose-500",
    message:
      "The clinic couldn't approve this request. Read the note below, then submit a new request.",
  },
  rescheduled: {
    label: "Rescheduled",
    icon: RotateCcw,
    iconText: "text-primary",
    dot: "bg-primary",
    message:
      "The clinic proposed a different time. Review the new slot below.",
  },
};

export const APPOINTMENT_TYPES = [
  "Medical Consultation",
  "Dental Consultation",
  "Follow-up",
  "Fit to Work Certificate",
];

export const DEFAULT_STUDENT_ID = "20230518-S";

const STORAGE_KEY = "vistra.patient.appointments";
const FIRST_NEW_ID = 3005;

const seedAppointments: Record<string, Appointment[]> = {
  "20230518-S": [
    {
      id: "APT-3001",
      type: "Dental Cleaning",
      date: "2026-09-18",
      time: "10:00 AM",
      status: "approved",
    },
    {
      id: "APT-3002",
      type: "Medical Follow-up",
      date: "2026-09-25",
      time: "2:30 PM",
      status: "pending",
    },
    {
      id: "APT-3003",
      type: "Fit to Work Certificate",
      date: "2026-08-30",
      time: "11:00 AM",
      status: "rejected",
      notes:
        "Requested documents were incomplete. Please resubmit with your latest checkup results.",
    },
    {
      id: "APT-3004",
      type: "Dental Consultation",
      date: "2026-09-10",
      time: "9:00 AM",
      status: "rescheduled",
      rescheduledTo: {
        date: "2026-09-14",
        time: "1:00 PM",
      },
      notes:
        "Original slot was unavailable due to a clinic closure.",
    },
  ],
};

function cloneSeed(): Record<string, Appointment[]> {
  return JSON.parse(JSON.stringify(seedAppointments));
}

function loadStore(): Record<string, Appointment[]> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);

    if (raw) {
      const parsed = JSON.parse(raw);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return parsed as Record<string, Appointment[]>;
      }
    }
  } catch {
    return cloneSeed();
  }

  return cloneSeed();
}

const myAppointmentsStore: Record<string, Appointment[]> = loadStore();

function saveStore(): void {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(myAppointmentsStore)
    );
  } catch {
    return;
  }
}

function generateId(): string {
  let highest = FIRST_NEW_ID - 1;

  Object.values(myAppointmentsStore).forEach((list) => {
    list.forEach((appointment) => {
      const value = Number(appointment.id.replace(/\D/g, ""));

      if (!Number.isNaN(value) && value > highest) {
        highest = value;
      }
    });
  });

  return `APT-${highest + 1}`;
}

export function getMyAppointments(
  studentId: string
): Appointment[] {
  return myAppointmentsStore[studentId] ?? [];
}

export function getAppointmentById(
  studentId: string,
  id: string
): Appointment | undefined {
  return getMyAppointments(studentId).find(
    (appointment) => appointment.id === id
  );
}

export function addAppointment(
  studentId: string,
  data: {
    type: string;
    date: string;
    time: string;
    notes?: string;
  }
): Appointment {
  const appointment: Appointment = {
    id: generateId(),
    type: data.type,
    date: data.date,
    time: data.time,
    notes: data.notes,
    status: "pending",
  };

  myAppointmentsStore[studentId] = [
    appointment,
    ...(myAppointmentsStore[studentId] ?? []),
  ];

  saveStore();

  return appointment;
}

export function resolveStudentId(user: any): string {
  const sessionId = user?.patient_id ?? user?.student_id ?? "";

  return getMyAppointments(sessionId).length > 0
    ? sessionId
    : DEFAULT_STUDENT_ID;
}

export function getViewPath(id: string): string {
  const base = ROUTES.patient.appointment.viewAppointment as string;

  if (base.includes(":id")) {
    return base.replace(":id", id);
  }

  return `${base}?id=${encodeURIComponent(id)}`;
}

export function getEffectiveSlot(
  appointment: Appointment
): {
  date: string;
  time: string;
} {
  if (
    appointment.status === "rescheduled" &&
    appointment.rescheduledTo
  ) {
    return appointment.rescheduledTo;
  }

  return {
    date: appointment.date,
    time: appointment.time,
  };
}

export function isUpcoming(
  appointment: Appointment
): boolean {
  if (appointment.status === "rejected") {
    return false;
  }

  return getEffectiveSlot(appointment).date >= todayISO();
}

