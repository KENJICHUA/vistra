import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Heart,
  Wind,
  FileText,
  Calendar,
  Clock,
  Home,
  User,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const SCREENS = ["dashboard", "appointment", "record"];
const AUTOPLAY_MS = 3200;

const NAV_ITEMS = [
  { key: "dashboard", icon: Home, label: "Home" },
  { key: "appointment", icon: Calendar, label: "Visits" },
  { key: "record", icon: FileText, label: "Record" },
  { key: "profile", icon: User, label: "You" },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 28 : -28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -28 : 28, opacity: 0 }),
};

function ScreenLabel({ children, icon: Icon }) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-mono text-[10px] tracking-wide text-textMuted">{children}</p>
      {Icon && <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2} />}
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="space-y-2.5">
      <p className="font-heading text-sm font-semibold text-textPrimary">Hi, Alex 👋</p>

      <div className="rounded-xl border border-border bg-surface p-3.5 shadow-card">
        <ScreenLabel icon={Calendar}>UPCOMING APPOINTMENT</ScreenLabel>
        <p className="mt-1 font-heading text-sm font-semibold text-textPrimary">
          Wellness check &middot; Nurse Reyes
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-mono text-[11px] text-textSecondary">Wed, Aug 12 &middot; 10:30 AM</p>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primaryDark">
            Reschedule
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-border bg-surface p-3 shadow-card">
          <Heart className="h-3.5 w-3.5 text-heartRate" strokeWidth={2} />
          <p className="mt-1.5 font-mono text-base font-semibold text-textPrimary">72</p>
          <p className="text-[10px] text-textMuted">bpm</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-3 shadow-card">
          <Wind className="h-3.5 w-3.5 text-spo2" strokeWidth={2} />
          <p className="mt-1.5 font-mono text-base font-semibold text-textPrimary">98%</p>
          <p className="text-[10px] text-textMuted">oxygen</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-3.5 shadow-card">
        <ScreenLabel icon={FileText}>MEDICAL RECORD</ScreenLabel>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-textPrimary">Flu vaccine</p>
            <p className="font-mono text-[10px] text-textMuted">Jul 3</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-textPrimary">Sprained ankle, treated</p>
            <p className="font-mono text-[10px] text-textMuted">Jun 18</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2">
          <p className="text-[11px] font-medium text-primary">View full record</p>
          <ChevronRight className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

function AppointmentScreen() {
  const slots = ["9:00 AM", "10:30 AM", "1:15 PM"];
  return (
    <div className="space-y-2.5">
      <p className="font-heading text-sm font-semibold text-textPrimary">Appointments</p>

      <div className="rounded-xl border border-border bg-surface p-3.5 shadow-card">
        <ScreenLabel icon={Calendar}>WELLNESS CHECK</ScreenLabel>
        <p className="mt-1 text-[11px] leading-relaxed text-textSecondary">
          With Nurse Reyes &middot; Clinic, Covered Court
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-3.5 shadow-card">
        <p className="font-mono text-[10px] tracking-wide text-textMuted">CHOOSE A TIME</p>
        <div className="mt-2 space-y-1.5">
          {slots.map((slot, i) => (
            <div
              key={slot}
              className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[11px] ${
                i === 1
                  ? "bg-primary/10 font-medium text-primaryDark"
                  : "bg-background text-textSecondary"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" strokeWidth={2} />
                {slot}
              </span>
              {i === 1 && <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-primary px-3.5 py-2.5 text-center text-[11px] font-semibold text-white shadow-card">
        Confirm Wed, Aug 12 &middot; 10:30 AM
      </div>
    </div>
  );
}

function RecordScreen() {
  const entries = [
    { label: "Flu vaccine", meta: "Jul 3" },
    { label: "Sprained ankle, treated", meta: "Jun 18" },
    { label: "Allergy: peanuts", meta: "On file" },
    { label: "Annual physical", meta: "Mar 22" },
  ];
  return (
    <div className="space-y-2.5">
      <p className="font-heading text-sm font-semibold text-textPrimary">Medical record</p>

      <div className="flex gap-1.5">
        {["All", "Visits", "Vaccines"].map((chip, i) => (
          <span
            key={chip}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
              i === 0 ? "bg-primary/10 text-primaryDark" : "bg-surface text-textMuted"
            }`}
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-surface p-3.5 shadow-card">
        <div className="space-y-2">
          {entries.map((entry) => (
            <div key={entry.label} className="flex items-center justify-between">
              <p className="text-[11px] text-textPrimary">{entry.label}</p>
              <p className="font-mono text-[10px] text-textMuted">{entry.meta}</p>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2">
          <p className="text-[11px] font-medium text-primary">Share with a doctor</p>
          <ChevronRight className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

const SCREEN_COMPONENTS = {
  dashboard: DashboardScreen,
  appointment: AppointmentScreen,
  record: RecordScreen,
};

export default function PhoneScreens() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % SCREENS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  function goTo(key) {
    const targetIndex = SCREENS.indexOf(key);
    if (targetIndex === -1) return; // "profile" tab is decorative, no screen yet
    setDirection(targetIndex > index ? 1 : -1);
    setIndex(targetIndex);
  }

  const activeKey = SCREENS[index];
  const ActiveScreen = SCREEN_COMPONENTS[activeKey];

  return (
    <>
      <div className="relative mt-3 h-[340px] overflow-hidden px-5">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeKey}
            custom={direction}
            variants={reduceMotion ? undefined : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActiveScreen />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-border bg-surface/95 py-3.5">
        {NAV_ITEMS.map(({ key, icon: Icon, label }) => {
          const isActive = key === activeKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => goTo(key)}
              aria-label={label}
              aria-current={isActive}
              className="flex flex-col items-center gap-0.5"
            >
              <Icon
                className={`h-4 w-4 transition-colors ${isActive ? "text-primary" : "text-textMuted"}`}
                strokeWidth={2}
              />
              {isActive && (
                <motion.span
                  layoutId="phone-nav-dot"
                  className="h-1 w-1 rounded-full bg-primary"
                  transition={{ duration: 0.25 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}