import React, { useState, useMemo, type ChangeEvent, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Eye,
  EyeOff,
  FileText,
  Lock,
  LoaderCircle,
  ShieldCheck,
  IdCard,
  Users,
} from "lucide-react";
import { ROUTES } from "/@/config/RoutePaths.js";
import { Logo } from "/@/components/Logo.jsx";
import { useLogin, useLoginForm } from "/@/hooks/UseLogin.js";
import { AdminAnimStyles, HeartbeatLine, LiveDot } from "/@/components/adminanim.jsx";

const ID_PATTERN = /^\d{8}-[SFA]$/i;

const ROLE_LABELS: Record<string, string> = {
  S: "Student",
  F: "Faculty",
  A: "Admin",
};

const panelPoints = [
  { icon: Calendar, label: "Book and track appointments" },
  { icon: Users, label: "See your place in the queue" },
  { icon: FileText, label: "View your medical records" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const fieldClass =
  "w-full rounded-xl border bg-background py-3 text-sm text-textPrimary placeholder:text-textMuted transition-all duration-200 hover:border-primary/30 focus:outline-none focus:ring-2";

const iconClass =
  "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted transition-colors duration-200 group-focus-within/field:text-primary";

function getRoleFromId(id: string): string | null {
  const match = id.trim().match(ID_PATTERN);
  if (!match) return null;
  const suffix = id.trim().slice(-1).toUpperCase();
  return ROLE_LABELS[suffix] ?? null;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function LoginPanel() {
  return (
    <aside className="panel-in relative hidden overflow-hidden bg-primaryDark text-white lg:order-2 lg:flex lg:flex-col lg:justify-between">
      <div className="bg-grid grid-drift pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_20%_20%,black,transparent)]" />
      <div className="glow-pulse pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />

      <div className="reveal-group relative p-9">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium">
          <LiveDot className="bg-white" />
          Clinic is open
        </span>

        <h2 className="mt-6 font-heading text-3xl font-semibold leading-[1.1] tracking-tight">
          {greeting()}.
          <br />
          Your health, in one place.
        </h2>

        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
          Sign in to book a visit, check the queue, and see your records.
        </p>
      </div>

      <ul className="stagger-group relative space-y-3 px-9">
        {panelPoints.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-sm text-white/90">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </span>
            {label}
          </li>
        ))}
      </ul>

      <div className="relative pb-6 pt-10" aria-hidden="true">
        <HeartbeatLine className="text-white" heightClass="h-14" delay={0} />
        <div className="-mt-6 opacity-50">
          <HeartbeatLine className="text-white" heightClass="h-14" delay={-1.4} />
        </div>
      </div>
    </aside>
  );
}

export default function PatientLoginPage() {
  const { credentials, handleChange } = useLoginForm();
  const { login, isLoading, error } = useLogin();

  const homeHref = ROUTES.patient?.dashboard?.overview ?? "/";

  const [showPassword, setShowPassword] = useState(false);
  const [idTouched, setIdTouched] = useState(false);

  const idNumber: string = credentials.idNumber ?? credentials.staffId ?? "";
  const isIdValid = idNumber.length === 0 || ID_PATTERN.test(idNumber.trim());
  const detectedRole = useMemo(() => getRoleFromId(idNumber), [idNumber]);

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const handleIdBlur = () => setIdTouched(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIdTouched(true);
    if (!ID_PATTERN.test(idNumber.trim())) return;
    await login(credentials);
  };

  return (
    <div className="page-in min-h-screen bg-[linear-gradient(135deg,#e3f6f2_0%,#f3fafa_45%,#e6f1fb_100%)]">
      <AdminAnimStyles />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

        <div className="relative w-full max-w-md lg:max-w-3xl">
          <div className="card-in grid overflow-hidden rounded-2xl border border-border bg-surface/90 shadow-card backdrop-blur-sm transition-shadow duration-500 hover:shadow-lg lg:grid-cols-[5fr_4fr]">
            <LoginPanel />

            <div className="relative lg:order-1">
              <div className="bar-grow absolute inset-x-0 top-0 h-1 bg-primary lg:hidden" aria-hidden="true" />

              <div className="reveal-group flex flex-col items-start px-8 pt-10 sm:px-12">
                <a href={homeHref} className={`hover-pop rounded-md ${focusRing}`}>
                  <Logo className="h-11" />
                </a>

                <h1 className="mt-7 font-heading text-3xl font-semibold leading-tight tracking-tight text-textPrimary">
                  Sign in to your account
                </h1>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-textSecondary">
                  Use your Student, Faculty, or Admin number.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="form-stagger relative px-8 pb-8 pt-6 sm:px-12 sm:pb-10"
              >
                {error ? (
                  <div
                    key={error}
                    role="alert"
                    className="shake mb-5 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                    <span>{error}</span>
                  </div>
                ) : null}

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="idNumber"
                      className="block text-xs font-semibold uppercase tracking-wide text-textMuted"
                    >
                      ID Number
                    </label>

                    {detectedRole ? (
                      <span
                        key={detectedRole}
                        className="row-in rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                      >
                        {detectedRole}
                      </span>
                    ) : null}
                  </div>

                  <div className="group/field relative">
                    <IdCard className={iconClass} strokeWidth={2} />
                    <input
                      id="idNumber"
                      name="idNumber"
                      type="text"
                      inputMode="text"
                      autoComplete="username"
                      value={idNumber}
                      onChange={handleIdChange}
                      onBlur={handleIdBlur}
                      placeholder="e.g. 20230518-S"
                      aria-invalid={idTouched && !isIdValid}
                      aria-describedby="idNumber-hint"
                      className={`${fieldClass} pl-10 pr-3.5 ${
                        idTouched && !isIdValid
                          ? "border-danger/50 focus:border-danger/50 focus:ring-danger/20"
                          : "border-border focus:border-primary/50 focus:ring-primary/20"
                      }`}
                    />
                  </div>

                  <p
                    id="idNumber-hint"
                    className={`mt-1.5 text-xs leading-relaxed transition-colors duration-200 ${
                      idTouched && !isIdValid ? "text-danger" : "text-textMuted"
                    }`}
                  >
                    {idTouched && !isIdValid
                      ? "Enter an 8-digit ID followed by -S (Student), -F (Faculty), or -A (Admin)."
                      : "Format: 8-digit number + suffix -S, -F, or -A."}
                  </p>
                </div>

                <div className="mt-5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold uppercase tracking-wide text-textMuted"
                    >
                      Password
                    </label>

                    <a
                      href="#forgot-password"
                      className={`link-underline rounded text-xs font-medium text-primary hover:text-primaryDark ${focusRing}`}
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="group/field relative">
                    <Lock className={iconClass} strokeWidth={2} />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`${fieldClass} border-border pl-10 pr-10 focus:border-primary/50 focus:ring-primary/20`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className={`absolute right-3.5 top-1/2 -translate-y-1/2 rounded text-textMuted transition-all duration-200 hover:scale-110 hover:text-primary ${focusRing}`}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" strokeWidth={2} />
                      ) : (
                        <Eye className="h-4 w-4" strokeWidth={2} />
                      )}
                    </button>
                  </div>
                </div>

                <label className="group mt-4 flex w-fit cursor-pointer items-center gap-2 text-sm text-textSecondary transition-colors duration-200 hover:text-textPrimary">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary transition-transform duration-200 focus:ring-primary/30 group-hover:scale-110"
                  />
                  Keep me signed in on this device
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn-shine group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:bg-primaryDark hover:shadow-lg active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
                >
                  {isLoading ? "Signing in..." : "Sign in"}

                  {isLoading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  )}
                </button>

                <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-textMuted">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                  Records are encrypted and scoped to your role.
                </p>
              </form>
            </div>
          </div>

          <p className="fade-in-up mt-6 text-center text-xs text-textMuted [animation-delay:1.1s]">
            Access is limited to registered students, faculty, and admins. Contact your administrator if you need an account.
          </p>
        </div>
      </main>
    </div>
  );
}