import React from "react";
import { motion } from "framer-motion";
import { Reveal, fadeUp, stagger } from "../../components/landinganim.jsx";
import { services, vitalStyles } from "./data.jsx";

export default function Services() {
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal variants={fadeUp}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-textPrimary">
            What the clinic handles
          </h2>
        </Reveal>

        <Reveal variants={fadeUp} delay={0.1}>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-textSecondary">
            Most visits take under fifteen minutes and end with either a treatment,
            a rest pass, or a call home — never a guessing game.
          </p>
        </Reveal>

        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map(({ key, icon: Icon, title, body }) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-card"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${vitalStyles[key].chip}`}>
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-textPrimary">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-textSecondary">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}