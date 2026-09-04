import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import {LogoClickable} from "../../components/Clickables.jsx";

const NAV_LINKS = [
    { href: "#app", label: "Mobile App" },
  { href: "#services", label: "Services" },
  { href: "#visit", label: "How It Works" },
];

function LiveDot({ className = "bg-primary" }) {
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setBeat((b) => !b), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-2 w-2">
      <span
        className={`absolute inline-flex h-full w-full rounded-full ${className} transition-transform duration-500`}
        style={{
          transform: beat ? "scale(2.4)" : "scale(1)",
          opacity: beat ? 0 : 0.45,
        }}
      />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${className}`} />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionsRef = useRef([]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    sectionsRef.current = NAV_LINKS.map(({ href }) => document.querySelector(href)).filter(Boolean);
    if (sectionsRef.current.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
          setHasInteracted(true);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sectionsRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function handleLinkClick(href) {
    setActiveSection(href);
    setHasInteracted(true);
    setMobileOpen(false);
  }

  const highlighted = hovered ?? (hasInteracted ? activeSection : null);

  return (
    <motion.header
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-30 border-b bg-surface/80 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-border shadow-card" : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="flex items-center gap-3">
          <LogoClickable />
        </div>

        <nav
          onMouseLeave={() => setHovered(null)}
          className="hidden items-center gap-8 text-sm text-textSecondary md:flex"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = highlighted === href;
            return (
              <a
                key={href}
                href={href}
                onMouseEnter={() => setHovered(href)}
                onClick={() => handleLinkClick(href)}
                className={`relative py-1 transition-colors ${
                  isActive ? "text-textPrimary" : "hover:text-textPrimary"
                }`}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-primary"
                    transition={
                      reduceMotion ? { duration: 0.15 } : { type: "spring", stiffness: 420, damping: 32 }
                    }
                  />
                )}
              </a>
            );
          })}
        </nav>

        <motion.a
          href="#app"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="hidden items-center gap-1.5 rounded-xl bg-primary/10 px-4 py-2 text-xs font-medium text-primaryDark transition-colors hover:bg-primary/20 sm:inline-flex"
        >
          Book an Appointment
        </motion.a>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-textPrimary md:hidden">
          <AnimatePresence mode="wait" initial={false}>
            
            <motion.span
              key={mobileOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
              className="flex">

              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-surface md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => handleLinkClick(href)}
                  className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    hasInteracted && activeSection === href
                      ? "bg-primary/10 font-medium text-primaryDark"
                      : "text-textSecondary hover:bg-background hover:text-textPrimary"
                  }`}
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
              >
                Report a Symptom
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}