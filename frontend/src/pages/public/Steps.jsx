import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal, fadeUp, fadeLeft, stagger } from "../../components/landinganim.jsx";
import { steps } from "./data.jsx";

export default function Steps() {
  return (
    <section id="visit" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal variants={fadeUp}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-textPrimary">
            How a visit works
          </h2>
        </Reveal>

        <motion.div
          className="mt-10 grid gap-8 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {steps.map(({ number, title, body }, i) => (
            <motion.div
              key={number}
              variants={fadeLeft}
              className="relative rounded-2xl border border-border bg-background p-6"
            >
              <span className="font-mono text-sm text-primary">{number}</span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-textPrimary">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-textSecondary">{body}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-border md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}