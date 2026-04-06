import type { Variants, Transition } from "framer-motion";

/* ── Easing ───────────────────────────────────────────── */
export const QUINTIC_OUT: Transition["ease"] = [0.22, 1, 0.36, 1];

/* ── Fade-up with blur ────────────────────────────────── */
export const FADE_UP: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring", bounce: 0, duration: 0.8 },
    },
};

/* ── Stagger container ────────────────────────────────── */
export const STAGGER_CONTAINER: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
};

/* ── Viewport config for whileInView ──────────────────── */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

/* ── Floating animation keyframes ─────────────────────── */
export const FLOAT = {
    y: [0, -10, 0],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
    },
};

/* ── Scale reveal ─────────────────────────────────────── */
export const SCALE_REVEAL: Variants = {
    hidden: { scale: 0.85, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.9, ease: QUINTIC_OUT },
    },
};

/* ── Spring config for button expand ──────────────────── */
export const SPRING_EXPAND = {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
};
