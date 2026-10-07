import React, { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function LiveDot({ className = "bg-primary" }) {
  return (
    <span className="relative inline-flex h-2.5 w-2.5" aria-hidden="true">
      <span
        className={`live-ping absolute inline-flex h-full w-full rounded-full ${className}`}
      />
      <span
        className={`relative inline-flex h-2.5 w-2.5 rounded-full ${className}`}
      />
    </span>
  );
}

export function CountUp({ to, duration = 900, delay = 0, suffix = "" }) {
  const reduced = usePrefersReducedMotion();
  const from = useRef(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (reduced) {
      from.current = to;
      setVal(to);
      return;
    }
    let raf;
    let start;
    const startVal = from.current;
    const timer = setTimeout(() => {
      const tick = (now) => {
        start ??= now;
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(startVal + (to - startVal) * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
        else from.current = to;
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [to, duration, delay, reduced]);

  return (
    <>
      {val}
      {suffix}
    </>
  );
}

const ecgBeat = (o) =>
  `H${o + 55} L${o + 68} 30 L${o + 74} 25 L${o + 80} 30 L${o + 90} 30 L${o + 98} 36 L${o + 108} 8 L${o + 118} 50 L${o + 128} 30 L${o + 145} 30 L${o + 154} 22 L${o + 164} 30 H${o + 200}`;

const ecgPath = `M0 30 ${[0, 200, 400, 600].map(ecgBeat).join(" ")}`;

export function HeartbeatLine({
  className = "text-heartRate",
  heightClass = "h-8",
  delay = 0,
  duration = 7,
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <div
      className={`${heightClass} w-full overflow-hidden ${className} [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 60"
        preserveAspectRatio="none"
        className="ecg-scroll h-full"
        style={{
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          animationPlayState: reduced ? "paused" : "running",
        }}
      >
        <path
          d={ecgPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

const staggerRules = Array.from({ length: 12 }, (_, i) => {
  return `.stagger-group > *:nth-child(${i + 1}) { animation-delay: ${0.75 + i * 0.09}s; }`;
}).join("\n");

export function AdminAnimStyles() {
  return (
    <style>{`

      .bg-grid {
        background-image:
          linear-gradient(rgb(var(--grid-rgb, 20 184 166) / 0.09) 1px, transparent 1px),
          linear-gradient(90deg, rgb(var(--grid-rgb, 20 184 166) / 0.09) 1px, transparent 1px);
        background-size: 44px 44px;
      }

      @keyframes livePing {
        0%   { transform: scale(1);   opacity: 0.5; }
        80%, 100% { transform: scale(2.6); opacity: 0; }
      }
      .live-ping { animation: livePing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; }

      @keyframes fadeInUp {
        0%   { opacity: 0; transform: translateY(18px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .fade-in-up { animation: fadeInUp 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }

      @keyframes fadeInRight {
        0%   { opacity: 0; transform: translateX(28px) scale(0.985); }
        100% { opacity: 1; transform: translateX(0) scale(1); }
      }
      .fade-in-right {
        animation: fadeInRight 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 0.25s both;
      }

      .stagger-group > * {
        animation: fadeInUp 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
      }
      ${staggerRules}

      @keyframes rowIn {
        0%   { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .row-in { animation: rowIn 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both; }

      @keyframes ecgScroll 
      { from { transform: translateX(0); } 
       to { transform: translateX(-50%); } } 

      .ecg-scroll {
        display: block;
        width: 200%;
        max-width: none;
        animation: ecgScroll 10s linear infinite;
        will-change: transform;
      }
      @keyframes pageIn { from { opacity: 0; } to { opacity: 1; } }
      .page-in { animation: pageIn 0.5s ease-out both; }

      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-100%); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .slide-down { animation: slideDown 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) backwards; }

      .reveal-group > * { animation: fadeInUp 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards; }
      .reveal-group > *:nth-child(1) { animation-delay: 0.15s; }
      .reveal-group > *:nth-child(2) { animation-delay: 0.25s; }
      .reveal-group > *:nth-child(3) { animation-delay: 0.35s; }
      .reveal-group > *:nth-child(4) { animation-delay: 0.45s; }
      .reveal-group > *:nth-child(5) { animation-delay: 0.55s; }
      .reveal-group > *:nth-child(6) { animation-delay: 0.85s; }

      .hover-lift {
        transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1),
                    box-shadow 0.25s ease, border-color 0.25s ease;
      }
      .hover-lift:hover {
        transform: translateY(-3px);
        border-color: rgb(var(--grid-rgb, 20 184 166) / 0.55);
        box-shadow: 0 12px 24px -14px rgb(var(--grid-rgb, 20 184 166) / 0.45);
      }

      .btn-shine { position: relative; overflow: hidden; }
      .btn-shine::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
        transform: translateX(-120%);
        transition: transform 0.7s ease;
        pointer-events: none;
      }
      .btn-shine:hover::after { transform: translateX(120%); }

      .tilt-card {
        transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.6s ease;
        will-change: transform;
      }
      .tilt-card:hover {
        transform: perspective(1200px) rotateY(-3deg) rotateX(2deg) translateY(-4px);
        box-shadow: 0 30px 60px -30px rgb(var(--grid-rgb, 20 184 166) / 0.45);
      }

      @keyframes cardIn {
        from { opacity: 0; transform: translateY(24px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      .card-in { animation: cardIn 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 0.1s backwards; }

      @keyframes barGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      .bar-grow {
        transform-origin: left;
        animation: barGrow 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 0.45s backwards;
      }

      .form-stagger > * { animation: fadeInUp 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) backwards; }
      ${Array.from({ length: 8 }, (_, i) => `.form-stagger > *:nth-child(${i + 1}) { animation-delay: ${0.5 + i * 0.08}s; }`).join("\n      ")}

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-6px); }
        40% { transform: translateX(5px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(2px); }
      }
      .shake { animation: shake 0.45s ease-in-out, rowIn 0.3s ease-out; }

      .link-underline {
        background: linear-gradient(currentColor, currentColor) left bottom / 0 1px no-repeat;
        transition: background-size 0.3s ease, color 0.2s ease;
      }
      .link-underline:hover, .link-underline:focus-visible { background-size: 100% 1px; }

      .hover-pop { display: inline-block; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
      .hover-pop:hover { transform: scale(1.06); }

      @keyframes panelIn {
        from { clip-path: inset(0 100% 0 0); opacity: 0.6; }
        to   { clip-path: inset(0 0 0 0); opacity: 1; }
      }
      .panel-in { animation: panelIn 1s cubic-bezier(0.7, 0, 0.2, 1) 0.2s backwards; }

      @keyframes gridDrift {
        from { background-position: 0 0; }
        to   { background-position: 44px 44px; }
      }
      .grid-drift { animation: gridDrift 6s linear infinite; }



      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-28px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      .layout-in > :first-child {
        animation: slideInLeft 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
      }

      @keyframes routeIn {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .route-in { animation: routeIn 0.4s cubic-bezier(0.2, 0.7, 0.2, 1) backwards; }

      @keyframes scanline {
        0%   { transform: translateY(-8%); opacity: 0; }
        12%  { opacity: 1; }
        88%  { opacity: 1; }
        100% { transform: translateY(108%); opacity: 0; }
      }
      .scan-line { animation: scanline 3.6s linear infinite; }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-6px); }
      }
      .float-slow { animation: float 7s ease-in-out infinite; }

      @keyframes glowPulse {
        0%, 100% { opacity: 0.55; transform: scale(1); }
        50%      { opacity: 0.9;  transform: scale(1.06); }
      }
      .glow-pulse { animation: glowPulse 7s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .live-ping, .fade-in-up, .fade-in-right, .row-in, .ecg-scroll,
        .scan-line, .float-slow, .glow-pulse, .stagger-group > *, .page-in, .slide-down,
        .card-in, .bar-grow, .form-stagger > *, .shake, .panel-in, .grid-drift, .route-in, .layout-in > :first-child {
          animation: none !important;
        }
        .reveal-group > *, .btn-shine::after { animation: none !important; }
        .hover-lift:hover, .tilt-card:hover, .hover-pop:hover { transform: none; }
      }
    `}</style>
  );
}
