import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { fadeUp, stagger } from "../../components/landinganim.jsx";

export default function Hours() {
  return (
    <section id="hours" className="border-t border-border">
      <motion.div
          className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-surface p-6">
          <Clock className="h-5 w-5 text-primary" strokeWidth={2} />
          <h3 className="mt-3 font-heading text-base font-semibold text-textPrimary">
            Clinic hours
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-textSecondary">
            Monday–Friday, 7:30 AM–6:00 PM<br />
            Emergencies handled anytime school is in session.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-surface p-6">
          <MapPin className="h-5 w-5 text-primary" strokeWidth={2} />
          <h3 className="mt-3 font-heading text-base font-semibold text-textPrimary">
            Location
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-textSecondary">
            UCC Covered Court, South Campus<br />
            Next to registrar
          </p>
        </motion.div>

        <motion.div
          id="contact"
          variants={fadeUp}
          className="rounded-2xl border border-danger/25 bg-surface p-6"
        >
          <Phone className="h-5 w-5 text-danger" strokeWidth={2} />
          <h3 className="mt-3 font-heading text-base font-semibold text-textPrimary">
            Urgent? Call the front desk
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-textSecondary">
            (555) 019-4420<br />
            Staff will send someone to you.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}