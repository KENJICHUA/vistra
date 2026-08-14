import React from "react";
import { Reveal, fadeUp } from "../../components/landinganim.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Reveal variants={fadeUp}>
        <div className="mx-auto max-w-6xl px-6 py-8 text-center font-mono text-[11px] tracking-wide text-textMuted">
          UNIVERSITY OF CALOOCAN CITY CLINIC &middot; COVERED COURT &middot; OPEN EVERY SCHOOL DAY
        </div>
      </Reveal>
    </footer>
  );
}