import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "/@/pages/public/navbar";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background font-sans text-textPrimary selection:bg-primary/20">
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-6%); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateY(106%); opacity: 0; }
        }
        @keyframes gridpan {
          0% { background-position: 0 0; }
          100% { background-position: 0 48px; }
        }
        .scan-line { animation: scanline 3.4s linear infinite; }
        .scan-line-slow { animation: scanline 4.8s linear infinite; animation-delay: 1s; }
        .bg-grid {
          background-image:
            linear-gradient(rgba(20,184,166,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,184,166,0.08) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: gridpan 7s linear infinite;
        }
      `}</style>
      <Navbar />
      <Outlet />
    </div>
  );
}
