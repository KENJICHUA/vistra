import React from "react";
import { motion } from "framer-motion";
import { Download, Smartphone } from "lucide-react";
import { Reveal, Floating, fadeUp, scaleIn, stagger } from "../../components/landinganim.jsx"
import { LiveDot, PhoneStatusBar } from "./Shared.jsx";
import PhoneScreens from "../../components/Phonescreens.jsx";
import { appFeatures } from "./data.jsx";

export default function Phone() {
  return (
    <section id="app" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-24">

        {/* phone */}
        <div className="order-2 flex justify-center md:order-1">
          <Reveal variants={scaleIn}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-primary/10 blur-[80px]" />

              <div className="absolute left-40 top-10 z-20 w-48 rounded-xl border border-border bg-surface/95 p-3 shadow-card backdrop-blur">
                <a
                  href="#"
                  className="flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/15">
                    <Download className="h-3 w-3 text-success" strokeWidth={2.5} />
                  </span>
                  <p className="text-[11px] font-medium text-textPrimary">Download the Vistra App</p>
                </a>
              </div>



              {/* phone frame */}
              <Floating>
                <div className="relative h-[560px] w-[272px] rounded-[2.5rem] border-[6px] border-textPrimary bg-textPrimary shadow-card">
                  <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-textPrimary" />
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-background">
                    <div
                      className="scan-line-slow pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
                      aria-hidden="true"
                    />
                    <PhoneStatusBar />

                    <div className="flex items-center justify-between px-5 pt-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src="/Vistralogo.png"
                            alt="Vistra Logo"
                            className="h-5 w-auto object-contain"
                          />
                        </div>
                      </div>
                      <LiveDot />
                    </div>

                    <PhoneScreens />
                  </div>
                </div>
              </Floating>
            </div>
          </Reveal>
        </div>

        <div className="order-1 md:order-2">
          <Reveal variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] tracking-wide text-textSecondary">
              <Smartphone className="h-3 w-3 text-primary" strokeWidth={2.5} />
              NOW IN YOUR POCKET
            </span>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.1}>
            <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-textPrimary md:text-3xl">
              The same clinic, carried in your bag.
            </h2>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.2}>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-textSecondary">
              The Vistra app is a UCC Clinic platform that mirrors what's on the nurse's screen — book or check your next
              appointment, pull up your full medical record, and know the moment you're cleared
              to head back to class.
            </p>
          </Reveal>

          <motion.div
            className="mt-8 space-y-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {appFeatures.map(({ icon: Icon, title, body }) => (
              <motion.div key={title} variants={fadeUp} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-textPrimary">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-textSecondary">{body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}