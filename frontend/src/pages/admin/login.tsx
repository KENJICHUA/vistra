import React from "react";
import {
    Calendar,
    FileText,
    ShieldCheck,
    User,
} from "lucide-react";
import {ROUTES} from "/@/config/RoutePaths.js";
import {Logo} from "/@/components/Logo.jsx";
import {useLogin, useLoginForm} from "/@/hooks/UseLogin.js";
import {useNavigate} from "react-router-dom";
import {FormInput, PasswordInput} from "/@/components/InputCollection";
import {LoginButton} from "/@/components/Button"
import {
    AdminAnimStyles,
    HeartbeatLine,
    LiveDot,
} from "/@/components/adminanim.jsx";

const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const panelPoints = [
    {icon: Calendar, label: "Queue and appointments"},
    {icon: FileText, label: "Student medical records"},
    {icon: ShieldCheck, label: "Access scoped to your role"},
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
            className="form-stagger relative px-8 pb-8 pt-6 sm:px-12 sm:pb-10"
        >
            {isError && error && (
                <div
                    key={error}
                    role="alert"
                    className="shake mb-4 rounded-lg border border-danger/20 bg-danger/10 p-3 text-sm text-danger"
                >
                    {error}
                </div>
            )}

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
                icon={<User className="h-4 w-4" strokeWidth={2}/>}
            />

            <div className="mt-5">
                <PasswordInput
                    value={credentials.password}
                    onChange={onChange}
                    error={validationErrors.password}
                />

                <div className="mb-1.5 flex items-center justify-end">
                    <a
                        href="#forgot-password"
                        className={`link-underline rounded text-xs font-medium text-primary hover:text-primaryDark ${focusRing}`}
                    >
                        Forgot password?
                    </a>
                </div>
            </div>

            <label className="group mt-4 flex w-fit cursor-pointer items-center gap-2 text-sm text-textSecondary transition-colors duration-200 hover:text-textPrimary">
                <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary transition-transform duration-200 focus:ring-primary/30 group-hover:scale-110"
                />
                Keep me signed in on this device
            </label>

            <LoginButton isLoading={isLoading}/>

            <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-textMuted">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={2}/>
                Records are encrypted and scoped to your role.
            </p>
        </form>
    );
}

function LoginPanel() {
    return (
        <aside className="panel-in relative hidden overflow-hidden bg-primaryDark text-white lg:flex lg:flex-col lg:justify-between">
            <div className="bg-grid grid-drift pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_20%_20%,black,transparent)]"/>
            <div className="glow-pulse pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-[80px]"/>

            <div className="reveal-group relative p-9">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium">
                    <LiveDot className="bg-white"/>
                    Clinic is open
                </span>

                <h2 className="mt-6 font-heading text-3xl font-semibold leading-[1.1] tracking-tight">
                    {greeting()}.
                    <br/>
                    Your queue is ready.
                </h2>

                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
                    Sign in to see who is waiting, who is booked, and what needs a record today.
                </p>
            </div>

            <ul className="stagger-group relative space-y-3 px-9">
                {panelPoints.map(({icon: Icon, label}) => (
                    <li key={label} className="flex items-center gap-3 text-sm text-white/90">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                            <Icon className="h-4 w-4" strokeWidth={2}/>
                        </span>
                        {label}
                    </li>
                ))}
            </ul>

            <div className="relative pb-6 pt-10" aria-hidden="true">
                <HeartbeatLine className="text-white" heightClass="h-14" delay={0}/>
                <div className="-mt-6 opacity-50">
                    <HeartbeatLine className="text-white" heightClass="h-14" delay={-1.4}/>
                </div>
            </div>
        </aside>
    );
}

interface AdminLoginLayoutProps {
    children: React.ReactNode;
}

export function AdminLoginLayout({children}: AdminLoginLayoutProps) {
    return (
        <div className="page-in min-h-screen bg-[linear-gradient(135deg,#e3f6f2_0%,#f3fafa_45%,#e6f1fb_100%)]">
            <AdminAnimStyles/>

            <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
                <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"/>

                <div className="relative w-full max-w-md lg:max-w-3xl">
                    <div className="card-in grid overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow duration-500 hover:shadow-lg lg:grid-cols-[4fr_5fr]">
                        <LoginPanel/>

                        <div className="relative">
                            <div className="bar-grow absolute inset-x-0 top-0 h-1 bg-primary lg:hidden" aria-hidden="true"/>
                            {children}
                        </div>
                    </div>

                    <p className="fade-in-up mt-6 text-center text-xs text-textMuted [animation-delay:1.1s]">
                        Access is limited to registered clinic staff. Contact your administrator if you need an account.
                    </p>
                </div>
            </main>
        </div>
    );
}

export function LoginHeader() {
    return (
        <div className="reveal-group flex flex-col items-start px-8 pt-10 sm:px-12">
            <a
                href={ROUTES.staff.dashboard.overview}
                className={`hover-pop rounded-md ${focusRing}`}
            >
                <Logo className="h-11"/>
            </a>

            <h1 className="mt-7 font-heading text-3xl font-semibold leading-tight tracking-tight text-textPrimary">
                Sign in to the staff portal
            </h1>

            <p className="mt-2 max-w-sm text-sm leading-relaxed text-textSecondary">
                Use your Staff ID and password.
            </p>
        </div>
    );
}

export default function AdminLoginPage() {
    const navigate = useNavigate();

    const {
        credentials,
        handleChange,
        validationErrors,
        validate,
    } = useLoginForm();

    const {
        login,
        isLoading,
        isError,
        error,
    } = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            await login(credentials);
            navigate(ROUTES.staff.dashboard.overview);
        } catch {
        }
    };

    return (
        <AdminLoginLayout>
            <LoginHeader/>

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