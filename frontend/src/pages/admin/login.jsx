import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionManager } from "../../utils/SessionManager"
import {
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import Footer from "../public/Footer";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!staffId.trim() || !password) {
      setError("Enter your staff ID and password to continue.");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL_API_URL}staff/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: staffId,
          password: password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Invalid staff ID or password.");
        return;
      }

      // Login successful
      sessionManager.setLogin(
          data.access_token,
          data.user
      );

      navigate("/admin/dashboard/overview");

    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="flex min-h-screen items-center justify-center py-10">
        <div className="relative w-full max-w-md px-6">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
            <div className="h-1 w-full bg-primary" aria-hidden="true"></div>

            <div className="flex flex-col items-center px-8 pt-8 text-center">
              <a href="/admin">
                <img
                  src="/Vistralogo.png"
                  alt="Vistra Logo"
                  className="h-11 w-auto object-contain"
                />
              </a>

              <h1 className="mt-6 font-heading text-2xl font-semibold leading-tight tracking-tight text-textPrimary">
                Clinical Staff Login
              </h1>

              <p className="mt-2 max-w-xs text-xs leading-relaxed text-textSecondary">
                Sign in with your Staff ID to access appointments, queues, and student medical records.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative p-8">
              {error ? (
                <div className="mb-5 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
                  <span>{error}</span>
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="staffId"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-textMuted"
                >
                  Staff ID
                </label>

                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted"
                    strokeWidth={2}
                  />
                  <input
                    id="staffId"
                    type="text"
                    autoComplete="username"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    placeholder="e.g. UCC-2481"
                    className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-3.5 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wide text-textMuted"
                  >
                    Password
                  </label>
                  
                    <a href="#forgot-password"
                    className="text-xs font-medium text-primary transition-colors duration-200 hover:text-primaryDark"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted"
                    strokeWidth={2}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-10 text-sm text-textPrimary placeholder:text-textMuted transition-colors duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-textMuted transition-colors duration-200 hover:text-textSecondary"
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

              <label className="mt-4 flex items-center gap-2 text-sm text-textSecondary">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                />
                Keep me signed in on this device
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-card transition-colors duration-200 hover:bg-primaryDark"
              >
                Sign in
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-textMuted">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                Records are encrypted and scoped to your role.
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-textMuted">
            Access is limited to registered clinic staff. Contact your administrator if you need an account.
          </p>
        </div>
      </main>
    </div>
  );
}