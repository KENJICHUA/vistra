import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  Children,
  cloneElement,
} from "react";

/**
 * Detects the user's `prefers-reduced-motion` OS setting and keeps it in
 * sync if they change it while the app is open.
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setPrefersReduced(e.matches);

    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
    // Safari <14 fallback
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, []);

  return prefersReduced;
}

/**
 * Internal hook: fires `true` once the element has scrolled into view,
 * then stays true (reveal doesn't reverse on scroll-out).
 */
function useInView({ threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No IO support — just show it.
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

/**
 * Wraps children in a fade/slide-up reveal that triggers once the element
 * scrolls into the viewport. Respects prefers-reduced-motion (renders
 * immediately visible, no animation, if the user has that set).
 *
 * Props:
 *  - as: element type to render (default "div")
 *  - delay: ms to hold before starting the reveal, for manual staggering
 *  - y: px to translate from (default 16)
 *  - duration: ms for the transition (default 500)
 *  - className: merged onto the wrapper
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 16,
  duration = 500,
  className = "",
  ...rest
}) {
  const [ref, inView] = useInView();
  const prefersReduced = usePrefersReducedMotion();

  const style = prefersReduced
    ? undefined
    : {
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : `translateY(${y}px)`,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      };

  return (
    <Tag ref={ref} style={style} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Reveals a group of children with a staggered delay, so list/grid items
 * animate in one after another rather than all at once.
 *
 * Props:
 *  - as: wrapper element type (default "div")
 *  - stagger: ms between each child's reveal start (default 80)
 *  - className: merged onto the wrapper (e.g. your flex/grid classes)
 *  - itemProps: extra props passed through to each Reveal-wrapped child
 */
export function RevealGroup({
  children,
  as: Tag = "div",
  stagger = 80,
  className = "",
  itemProps = {},
  ...rest
}) {
  const items = useMemo(() => Children.toArray(children), [children]);

  return (
    <Tag className={className} {...rest}>
      {items.map((child, i) => (
        <Reveal
          key={child.key ?? i}
          as="span"
          delay={i * stagger}
          className="contents"
          {...itemProps}
        >
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}

/**
 * Animates a number counting up from 0 (or from its previous value) to
 * `value` whenever `value` changes. Returns the current displayed number
 * (already rounded), so it can be dropped straight into JSX.
 *
 * Options:
 *  - duration: ms for the count animation (default 800)
 *  - decimals: number of decimal places to keep (default 0)
 */
export function useCountUp(value, { duration = 800, decimals = 0 } = {}) {
  const [display, setDisplay] = useState(value);
  const prefersReduced = usePrefersReducedMotion();
  const fromRef = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;

    if (prefersReduced || from === to) {
      setDisplay(to);
      fromRef.current = to;
      return;
    }

    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      const factor = Math.pow(10, decimals);
      setDisplay(Math.round(current * factor) / factor);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, decimals]);

  return display;
}