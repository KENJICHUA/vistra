import React from "react";
import {
  Calendar,
  FileText,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Lock,
  Heart,
  Wind,
  ChevronRight,
} from "lucide-react";
import { LiveDot, AdminAnimStyles } from "../../components/adminanim.jsx";
import Footer from "../public/Footer";
import { useNavigate } from "react-router-dom";


const capabilityChips = [
  { icon: Calendar, label: "Appointments" },
  { icon: FileText, label: "Medical records" },
  { icon: BarChart3, label: "Reporting" },
];

export default function AdminLandingPage() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background font-sans text-textPrimary selection:bg-primary/20">
      <AdminAnimStyles />

      <header className="flex shrink-0 items-center justify-between border-b border-border bg-surface/80 px-40 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2.5">
            <a href="/landingpage">
              <img
                src="/Vistralogo.png"
                alt="Vistra Logo"
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>
        </div>

        
          < a href="admin/login"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primaryDark hover:shadow-lg"
        >
          Log in
          <ArrowRight className="h-3 w-3" />
        </a>
      </header>


      <main className="relative flex min-h-0 flex-1 items-center overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_70%_at_30%_50%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px] glow-pulse" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-10 md:grid-cols-2">

          <div className="fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs tracking-wide text-textSecondary shadow-card">
              <LiveDot />
              BUILT FOR CLINIC STAFF
            </span>
            <h1 className="mt-6 font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-textPrimary lg:text-6xl">
              Run the clinic
              <br />
              from one screen.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-textSecondary">
              Queue, appointments, and student medical records — one console for nurses
              and staff, updated in real time.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              
                <a href="admin/login"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-card transition-all duration-300 hover:scale-[1.02] hover:bg-primaryDark hover:shadow-lg"
              >
                Log in to staff portal
                <ArrowRight className="h-5 w-5" />
              </a>
              <span className="flex items-center gap-1.5 text-sm text-textMuted">
                <Lock className="h-4 w-4" strokeWidth={2} />
                Staff ID required
              </span>
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5 stagger-group">
              {capabilityChips.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-textSecondary transition-colors duration-200 hover:border-primary/40"
                >
                  <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </div>

            <p className="mt-7 flex items-center gap-2 text-sm text-textMuted">
              <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={2} />
              Records are encrypted and scoped to your role.
            </p>
          </div>

       
          <div className="relative mx-auto w-full max-w-xl fade-in-right">
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-primary/10 blur-[80px] glow-pulse" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card float-slow">
              <div className="flex items-center gap-2 border-b border-border bg-background px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-temperature/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                <span className="ml-3 flex-1 truncate rounded-md bg-surface px-3 py-1 font-mono text-xs text-textMuted">
                  clinic.ucc.edu.ph/dashboard
                </span>
              </div>

              <div className="relative p-7">
                <div
                  className="scan-line pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between">
                  <p className="font-heading text-base font-semibold text-textPrimary">Good morning, Nurse Reyes</p>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-success">
                    <LiveDot className="bg-success" />
                    LIVE
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border bg-background p-4 transition-colors duration-200 hover:border-primary/40">
                    <p className="font-mono text-2xl font-semibold text-textPrimary">18</p>
                    <p className="text-xs text-textMuted">Visits today</p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4 transition-colors duration-200 hover:border-primary/40">
                    <p className="font-mono text-2xl font-semibold text-textPrimary">3</p>
                    <p className="text-xs text-textMuted">In queue</p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4 transition-colors duration-200 hover:border-primary/40">
                    <p className="font-mono text-2xl font-semibold text-textPrimary">7</p>
                    <p className="text-xs text-textMuted">Appts.</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-background p-4 transition-colors duration-200 hover:border-primary/40">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-textPrimary">Maria Santos</p>
                    <p className="truncate text-xs text-textSecondary">Fever, 38.1°C</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-temperature/10 px-3 py-1 text-xs font-medium text-temperature">
                    waiting
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-background p-4 transition-colors duration-200 hover:border-primary/40">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" strokeWidth={2} />
                    <p className="text-sm font-medium text-textPrimary">Miguel Torres — flu vaccine logged</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-textMuted" strokeWidth={2} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-background p-4 transition-colors duration-200 hover:border-primary/40">
                    <Heart className="h-4 w-4 text-heartRate" strokeWidth={2} />
                    <p className="mt-1.5 font-mono text-lg font-semibold text-textPrimary">72</p>
                    <p className="text-xs text-textMuted">bpm avg</p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4 transition-colors duration-200 hover:border-primary/40">
                    <Wind className="h-4 w-4 text-spo2" strokeWidth={2} />
                    <p className="mt-1.5 font-mono text-lg font-semibold text-textPrimary">98%</p>
                    <p className="text-xs text-textMuted">oxygen avg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}