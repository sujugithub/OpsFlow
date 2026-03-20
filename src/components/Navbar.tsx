"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ── Data ──────────────────────────────────────────────────────── */
const navLinks = [
  { title: "Work",     href: "#work" },
  { title: "Services", href: "#services" },
  { title: "About",    href: "#about" },
  { title: "Contact",  href: "#contact" },
];

const footerLinks = [
  { title: "Instagram", href: "#" },
  { title: "LinkedIn",  href: "#" },
  { title: "Twitter",   href: "#" },
  { title: "GitHub",    href: "#" },
];

/* ── Easing ────────────────────────────────────────────────────── */
const ease = [0.76, 0, 0.24, 1] as const;
const easeIn = [0.215, 0.61, 0.355, 1] as const;

/* ── Framer variants ───────────────────────────────────────────── */
const menuVariants = {
  open: {
    width: "480px",
    height: "650px",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween" as const, ease },
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween" as const, ease },
  },
};

const perspectiveVariant = {
  initial: { opacity: 0, rotateX: 90, translateY: 80, translateX: -20 },
  enter: (i: number) => ({
    opacity: 1, rotateX: 0, translateY: 0, translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: easeIn,
      opacity: { duration: 0.35 },
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.5, ease } },
};

const slideInVariant = {
  initial: { opacity: 0, y: 20 },
  enter: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: 0.75 + i * 0.1, ease: easeIn },
  }),
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

/* ── Nav panel ─────────────────────────────────────────────────── */
function Nav({ close }: { close: () => void }) {
  return (
    <div className="nav-panel">
      <div className="nav-panel-body">
        {navLinks.map((link, i) => (
          <div key={link.title} className="nav-link-container">
            <motion.div
              custom={i}
              variants={perspectiveVariant}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <a href={link.href} onClick={close} className="nav-link-item">
                {link.title}
              </a>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="nav-panel-footer">
        {footerLinks.map((link, i) => (
          <motion.a
            key={link.title}
            href={link.href}
            custom={i}
            variants={slideInVariant}
            initial="initial"
            animate="enter"
            exit="exit"
            className="nav-footer-link"
          >
            {link.title}
          </motion.a>
        ))}
      </div>
    </div>
  );
}

/* ── Navbar ────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {/* Logo — top left */}
      <div className="fixed top-0 left-0 z-50 px-8 py-7">
        <a
          href="#"
          className="text-[15px] tracking-[0.15em] uppercase font-medium hlink text-[var(--fg)]"
        >
          OpsFlow
        </a>
      </div>

      {/* Expanding menu — top right */}
      <div style={{ position: "fixed", top: "25px", right: "25px", zIndex: 50 }}>
        {/* Panel */}
        <motion.div
          className="nav-menu-panel"
          variants={menuVariants}
          animate={isActive ? "open" : "closed"}
          initial="closed"
        >
          <AnimatePresence>
            {isActive && <Nav close={() => setIsActive(false)} />}
          </AnimatePresence>
        </motion.div>

        {/* Toggle button */}
        <div className="nav-btn" onClick={() => setIsActive(!isActive)}>
          <motion.div
            className="nav-slider"
            animate={{ y: isActive ? -40 : 0 }}
            transition={{ duration: 0.5, type: "tween", ease }}
          >
            <div className="nav-el">
              <div className="perspective-text">
                <p>Menu</p>
                <p>Menu</p>
              </div>
            </div>
            <div className="nav-el">
              <div className="perspective-text">
                <p>Close</p>
                <p>Close</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
