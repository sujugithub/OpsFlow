"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-4 backdrop-blur-md bg-[rgba(10,10,10,0.7)]" : "py-7"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-[15px] tracking-[0.15em] uppercase font-medium hlink">
            OpsFlow
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-[13px] tracking-[0.08em] uppercase opacity-70 hover:opacity-100 hlink transition-opacity duration-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase border border-[rgba(240,237,232,0.25)] hover:border-[rgba(240,237,232,0.7)] px-5 py-2.5 transition-all duration-300 rounded-full"
          >
            Start a project
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden opacity-70 hover:opacity-100"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center px-8 transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-5xl font-light tracking-tight"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-16 text-sm tracking-widest uppercase opacity-60"
        >
          Start a project →
        </a>
      </div>
    </>
  );
}
