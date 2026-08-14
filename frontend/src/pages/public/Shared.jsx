import React, { useState, useEffect } from "react";
import { Wifi, BatteryFull } from "lucide-react";

export function LiveDot({ className = "bg-primary" }) {
  const [beat, setBeat] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setBeat((b) => !b), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-2 w-2">
      <span
        className={`absolute inline-flex h-full w-full rounded-full ${className} transition-transform duration-500`}
        style={{ transform: beat ? "scale(2.4)" : "scale(1)", opacity: beat ? 0 : 0.45 }}
      />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${className}`} />
    </span>
  );
}

export function PhoneStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 font-mono text-[10px] text-textPrimary/70">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Wifi className="h-3 w-3" strokeWidth={2} />
        <BatteryFull className="h-3.5 w-3.5" strokeWidth={2} />
      </div>
    </div>
  );
}