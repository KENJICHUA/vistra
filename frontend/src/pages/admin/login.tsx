import React, { useState, useEffect } from "react";

import clinicImage from "/@/assets/images/consult.jpg";
import clinicImage2 from "/@/assets/images/image3.jpg";
import clinicImage3 from "/@/assets/images/image4.jpg";
import clinicImage4 from "/@/assets/images/image5.jpg";

import { Calendar, FileText, ShieldCheck, User } from "lucide-react";

import { ROUTES } from "/@/config/RoutePaths.js";
import { Logo } from "/@/components/Logo.jsx";
import { useLogin, useLoginForm } from "/@/hooks/UseLogin.js";
import { useNavigate } from "react-router-dom";
import { FormInput, PasswordInput } from "/@/components/InputCollection";
import { LoginButton } from "/@/components/Button";
import {
  AdminAnimStyles,
  HeartbeatLine,
  LiveDot,
} from "/@/components/adminanim.jsx";

const SLIDESHOW_IMAGES = [
  clinicImage2,
  clinicImage,
  clinicImage3,
  clinicImage4,
];

const SLIDE_DURATION = 5000;
const FADE_DURATION = 1200;

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const panelPoints = [
  { icon: Calendar, label: "Queue and appointments" },
  { icon: FileText, label: "Student medical & dental records" },
  { icon: ShieldCheck, label: "Secure role-based access" },
];

function greeting() {
  const h = new Date().getHours();

  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";

  return "Good evening";
}

interface LoginFormProps {
  credentials: {
    email: string;
    password: string;
  };
  validationErrors: {
    email?: string;
    password?: string;
  };
  isLoading: boolean;
  isError: boolean;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export function LoginForm({
  credentials,
  validationErrors,
  isLoading,
  isError,
  error,
  onChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="form-stagger relative mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center px-2 py-12 text-center sm:px-5 sm:py-14"
    >
      <div className="mb-9">
        <a
          href={ROUTES.staff.dashboard.overview}
          className={`hover-pop mb-5 inline-block rounded-md ${focusRing}`}
        >
          <Logo className="h-16" />
        </a>

        <h1 className="mb-2 font-heading text-3xl font-semibold leading-tight tracking-tight text-textPrimary">
          Sign in to the staff portal
        </h1>

        <p className="text-base leading-relaxed text-textSecondary">
          Use your Staff ID and password.
        </p>
      </div>

      {isError && error && (
        <div
          key={error}
          role="alert"
          className="shake mb-5 w-full rounded-lg border border-danger/20 bg-danger/10 p-3 text-sm text-danger"
        >
          {error}
        </div>
      )}

      <div className="mb-5 w-full text-left">
        <FormInput
          label="Staff ID"
          id="email"
          name="email"
          type="text"
          autoComplete="username"
          value={credentials.email}
          onChange={onChange}
          placeholder="e.g. UCC-2481"
          error={validationErrors.email}
          icon={<User className="h-5 w-5" strokeWidth={2} />}
        />
      </div>

      <div className="mb-5 w-full text-left">
        <PasswordInput
          value={credentials.password}
          onChange={onChange}
          error={validationErrors.password}
        />

        <div className="mt-3 flex items-end justify-end">
          <a
            href="#forgot-password"
            className={`link rounded text-sm font-medium text-primary hover:text-primaryDark ${focusRing}`}
          >
            Forgot password?
          </a>
        </div>
      </div>

      <label className="group mb-7 flex w-fit cursor-pointer select-none items-center gap-3">
        <div className="relative h-5 w-5">
          <input
            type="checkbox"
            className="peer absolute inset-0 z-10 h-5 w-5 cursor-pointer opacity-0"
          />

          <div className="absolute inset-0 flex items-center justify-center rounded-md border-2 border-border bg-white transition-all duration-200 group-hover:border-primary peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary/20"></div>

          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 scale-75 text-white opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10l4 4 8-8" />
          </svg>
        </div>

        <span className="text-sm text-textSecondary transition-colors duration-200 group-hover:text-textPrimary">
          Keep me signed in on this device
        </span>
      </label>

      <div className="mb-5 w-full">
        <LoginButton isLoading={isLoading} />
      </div>

      <p className="flex items-center justify-center gap-1 text-sm text-textMuted">
        <ShieldCheck
          className="h-5 w-5 flex-shrink-0 text-primary"
          strokeWidth={2}
        />
        <span>Records are encrypted and scoped to your role.</span>
      </p>
    </form>
  );
}

function LoginPanel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const preloadedImages = SLIDESHOW_IMAGES.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });

    const timer = window.setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % SLIDESHOW_IMAGES.length,
      );
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(timer);
      preloadedImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  return (
    <aside className="panel-in relative hidden min-h-screen overflow-hidden bg-primaryDark text-white lg:flex lg:flex-col lg:justify-between">
      {SLIDESHOW_IMAGES.map((image, index) => (
        <div
          key={image}
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-right bg-no-repeat transition-opacity ease-in-out motion-reduce:transition-none"
          style={{
            backgroundImage: `url("${image}")`,
            opacity: currentImageIndex === index ? 1 : 0,
            transitionDuration: `${FADE_DURATION}ms`,
            zIndex: index === currentImageIndex ? 1 : 0,
            willChange: "opacity",
          }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-primaryDark/90 via-primaryDark/80 to-primary/75" />

      <div className="bg-grid grid-drift pointer-events-none absolute inset-0 z-[3] opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_20%_20%,black,transparent)]" />

      <div className="glow-pulse pointer-events-none absolute -right-16 -top-16 z-[3] h-72 w-72 rounded-full bg-white/10 blur-[90px]" />

      <div className="reveal-group relative z-10 flex flex-col p-14">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium">
          <LiveDot className="bg-white" />
          Clinic is open
        </span>

        <h2 className="mt-10 max-w-xl font-heading text-4xl font-semibold leading-[1.15] tracking-tight xl:text-5xl">
          {greeting()}.
          <br />
          Your queue is ready.
        </h2>

        <p className="mt-7 max-w-lg text-base leading-7 text-white/75">
          Sign in to see who is waiting, who is booked, and what needs a record
          today.
        </p>
      </div>
      <ul className="stagger-group relative z-10 flex-1 space-y-6 px-14 py-6">
        {panelPoints.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-4 text-base text-white/90"
          >
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>

            <span>{label}</span>
          </li>
        ))}
      </ul>
      <div className="relative px-14 py-10 z-10" aria-hidden="true">
        <HeartbeatLine
          className="text-white"
          heightClass="h-16"
          delay={0}
          duration={7}
        />
        <div className="-mt-8 opacity-30">
          <HeartbeatLine
            className="text-white"
            heightClass="h-16"
            delay={-1.75}
            duration={10}
          />
        </div>
      </div>
    </aside>
  );
}

interface AdminLoginLayoutProps {
  children: React.ReactNode;
}

export function AdminLoginLayout({ children }: AdminLoginLayoutProps) {
  return (
    <div className="page-in min-h-screen bg-[linear-gradient(135deg,#e3f6f2_0%,#f3fafa_45%,#e6f1fb_100%)]">
      <AdminAnimStyles />

      <main className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

        <LoginPanel />

        <div className="relative flex min-h-screen flex-col bg-surface">
          <div
            className="bar-grow absolute inset-x-0 top-0 h-1 bg-primary lg:hidden"
            aria-hidden="true"
          />

          {children}

          <p className="fade-in-up px-8 py-4 text-center text-xs text-textMuted [animation-delay:1.1s]">
            Access is limited to registered clinic staff. Contact your
            administrator if you need an account.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const { credentials, handleChange, validationErrors, validate } =
    useLoginForm();

  const { login, isLoading, isError, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await login(credentials);
      navigate(ROUTES.staff.dashboard.overview);
    } catch {}
  };

  return (
    <AdminLoginLayout>
      <LoginForm
        credentials={credentials}
        validationErrors={validationErrors}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </AdminLoginLayout>
  );
}
