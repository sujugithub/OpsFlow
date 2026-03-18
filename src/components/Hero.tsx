"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = taglineRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200);
  }, []);

  return (
    <section className="relative min-h-screen mesh flex flex-col justify-end pb-20 px-8 overflow-hidden">
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Top metadata row */}
      <div className="absolute top-28 left-8 right-8 flex justify-between items-start max-w-[1400px] mx-auto w-full">
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-40">
          <span>Sydney, Australia</span>
          <br />
          <span>Est. 2025</span>
        </div>
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-40 text-right">
          <span>Web & Mobile Studio</span>
          <br />
          <span>AI-Powered Tools</span>
        </div>
      </div>

      {/* Main headline */}
      <div className="max-w-[1400px] mx-auto w-full">
        <div
          ref={taglineRef}
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <h1 className="text-[clamp(3.5rem,9vw,10rem)] font-light leading-[0.92] tracking-[-0.03em] mb-8">
            We build digital
            <br />
            <em className="not-italic" style={{ color: "rgba(240,237,232,0.45)" }}>
              that makes
            </em>
            <br />
            you money
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <p className="text-[15px] leading-relaxed opacity-55 max-w-sm">
              Design-led web & app studio for Australian businesses.
              <br />
              We turn ideas into products that grow revenue.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#work"
                className="group flex items-center gap-3 text-[13px] tracking-[0.1em] uppercase"
              >
                <span className="hlink">View our work</span>
                <span className="w-8 h-[1px] bg-current opacity-40 group-hover:w-16 group-hover:opacity-100 transition-all duration-500" />
              </a>
              <a
                href="#contact"
                className="text-[13px] tracking-[0.1em] uppercase bg-[var(--fg)] text-[var(--bg)] px-6 py-3 rounded-full hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
              >
                Start project
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex items-center gap-3 opacity-30">
          <div className="w-[1px] h-10 bg-current" />
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}
