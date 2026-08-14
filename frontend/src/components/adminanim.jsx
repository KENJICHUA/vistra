import React, { useState, useEffect } from "react";

export function LiveDot({ className = "bg-primary" }) {
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setBeat((b) => !b), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span
        className={`absolute inline-flex h-full w-full rounded-full ${className} transition-transform duration-500`}
        style={{ transform: beat ? "scale(2.4)" : "scale(1)", opacity: beat ? 0 : 0.45 }}
      />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${className}`} />
    </span>
  );
}

export function AdminAnimStyles() {
  return (
    <style>{`
      @keyframes scanline {
        0% { transform: translateY(-8%); opacity: 0; }
        12% { opacity: 1; }
        88% { opacity: 1; }
        100% { transform: translateY(108%); opacity: 0; }
      }
      .scan-line { animation: scanline 3.6s linear infinite; }

      .bg-grid {
        background-image:
          linear-gradient(rgba(20,184,166,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(20,184,166,0.08) 1px, transparent 1px);
        background-size: 44px 44px;
      }

      /* Entrance: fade + slide up */
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(16px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .fade-in-up {
        animation: fadeInUp 0.6s ease-out both;
      }

      /* Entrance: fade + slide in from right (for the dashboard preview) */
      @keyframes fadeInRight {
        0% { opacity: 0; transform: translateX(24px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      .fade-in-right {
        animation: fadeInRight 0.7s ease-out both;
      }

      /* Staggered children — apply .stagger-item + inline delay, or use nth-child below */
      .stagger-group > * {
        opacity: 0;
        animation: fadeInUp 0.5s ease-out both;
      }
      .stagger-group > *:nth-child(1) { animation-delay: 0.05s; }
      .stagger-group > *:nth-child(2) { animation-delay: 0.15s; }
      .stagger-group > *:nth-child(3) { animation-delay: 0.25s; }
      .stagger-group > *:nth-child(4) { animation-delay: 0.35s; }
      .stagger-group > *:nth-child(5) { animation-delay: 0.45s; }

      /* Gentle continuous float for the dashboard card */
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      .float-slow {
        animation: float 6s ease-in-out infinite;
      }

      /* Soft pulse for glow blobs */
      @keyframes glowPulse {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.08); }
      }
      .glow-pulse {
        animation: glowPulse 5s ease-in-out infinite;
      }
    `}</style>
  );
}