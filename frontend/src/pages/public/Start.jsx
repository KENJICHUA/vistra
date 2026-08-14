import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal, fadeUp, fadeRight, stagger } from "../../components/landinganim.jsx";
import { LiveDot } from "./Shared.jsx";
import { vitals, vitalStyles } from "./data.jsx";

export default function Start() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <Reveal variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] tracking-wide text-textSecondary shadow-card">
              <LiveDot />
              SYSTEM ONLINE &middot; WALK-INS WELCOME
            </span>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.1}>
            <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-textPrimary md:text-5xl">
              Transforming Campus <br /> Health Services.
            </h1>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.2}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-textSecondary">
              Provide students and healthcare professionals with a secure,
              centralized platform for managing medical records, dental records,
              appointments, and vital signs—enhancing efficiency, improving accessibility,
              and supporting high-quality healthcare services across your institution.
            </p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#app"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.02] hover:bg-primaryDark"
              >
                Download the App
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#hours"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-textPrimary transition-colors hover:border-primary/40"
              >
                See clinic hours
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal variants={fadeRight} delay={0.15}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card">
            <div
              className="scan-line pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between">
              <p className="font-heading text-sm font-medium text-textSecondary">Today's check-in snapshot</p>
            </div>

            <motion.div
              className="mt-5 grid grid-cols-2 gap-3"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {vitals.map(({ key, label, value, unit, icon: Icon }) => (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  className={`rounded-xl border border-border bg-background p-4 ring-1 ${vitalStyles[key].ring}`}
                >
                  <div className={`flex items-center gap-2 ${vitalStyles[key].text}`}>
                    <Icon className="h-4 w-4" strokeWidth={2} />
                    <span className="text-xs font-medium text-textSecondary">{label}</span>
                  </div>
                  <p className="mt-2 font-mono text-2xl font-semibold text-textPrimary">
                    {value}
                    <span className="ml-1 text-xs font-normal text-textMuted">{unit}</span>
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <p className="mt-4 text-xs leading-relaxed text-textMuted">
              Every visit logs a quick vitals check like this one to your student health record —
              visible to your parent or guardian, and to you.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}