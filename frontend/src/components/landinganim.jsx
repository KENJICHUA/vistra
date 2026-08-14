import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";


export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* -------------------------
   Reveal Component
--------------------------*/

export function Reveal({
  children,
  className = "",
  variants = fadeUp,
  delay = 0,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}


export function Floating({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}


export function useCountUp(target, { duration = 1000, start = false } = {}) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef(null);

  useEffect(() => {
  
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!start) return;

    const targetStr = String(target);
    const match = targetStr.match(/^-?\d+(\.\d+)?/);

    if (!match) {
      setDisplay(targetStr);
      return;
    }

    const number = parseFloat(match[0]);
    const suffix = targetStr.replace(match[0], "");
    let startTime = null;

    function animate(time) {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${(number * eased).toFixed(1)}${suffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [target, start, duration]);

  return display;
}