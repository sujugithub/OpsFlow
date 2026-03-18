"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const taglineRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  // Fade-in on mount
  useEffect(() => {
    const el = taglineRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 300);
  }, []);

  // Liquid glass orb follows cursor with heavy lag
  useEffect(() => {
    // Start at a visually interesting position over the text
    let cx = window.innerWidth * 0.48;
    let cy = window.innerHeight * 0.52;
    let tx = cx, ty = cy;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    let t = 0;

    const tick = () => {
      // Slow lerp — floaty, liquid feel
      cx += (tx - cx) * 0.035;
      cy += (ty - cy) * 0.035;
      t += 0.008;

      // Subtle autonomous drift (breathing)
      const driftX = Math.sin(t * 1.1) * 6;
      const driftY = Math.cos(t * 0.7) * 4;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${cx + driftX}px, ${cy + driftY}px) translate(-50%, -50%)`;
      }

      // Slowly rotate the shine highlight
      if (shineRef.current) {
        const angle = Math.sin(t * 0.5) * 12;
        shineRef.current.style.transform = `rotate(${angle}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative min-h-screen mesh flex flex-col justify-end pb-20 px-8 overflow-hidden">

      {/* ── SVG filter definitions ── */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {/* Liquid glass displacement */}
          <filter id="liquid-glass" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.018 0.014"
              numOctaves="3"
              seed="8"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>

          {/* Chromatic aberration — red channel shifted */}
          <filter id="ca-filter" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feOffset in="SourceGraphic" dx="3" dy="1" result="r" />
            <feOffset in="SourceGraphic" dx="-2" dy="-1" result="b" />
            <feBlend in="r" in2="SourceGraphic" mode="screen" result="rb" />
            <feBlend in="rb" in2="b" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* ── Noise overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Metadata row ── */}
      <div className="absolute top-28 left-8 right-8 flex justify-between items-start max-w-[1400px] mx-auto w-full pointer-events-none">
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-35">
          <span>Sydney, Australia</span><br />
          <span>Est. 2025</span>
        </div>
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-35 text-right">
          <span>Web & Mobile Studio</span><br />
          <span>AI-Powered Tools</span>
        </div>
      </div>

      {/* ── Main headline ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div
          ref={taglineRef}
          style={{
            opacity: 0,
            transform: "translateY(28px)",
            transition: "opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <h1 className="text-[clamp(3.5rem,9vw,10rem)] font-light leading-[0.92] tracking-[-0.03em] mb-8">
            We build digital
            <br />
            <em className="not-italic" style={{ color: "rgba(240,237,232,0.42)" }}>
              that makes
            </em>
            <br />
            you money
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <p className="text-[15px] leading-relaxed opacity-50 max-w-sm">
              Design-led web & app studio for Australian businesses.
              <br />
              We turn ideas into products that grow revenue.
            </p>
            <div className="flex items-center gap-6">
              <a href="#work" className="group flex items-center gap-3 text-[13px] tracking-[0.1em] uppercase">
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

        <div className="mt-16 flex items-center gap-3 opacity-25">
          <div className="w-[1px] h-10 bg-current" />
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        </div>
      </div>

      {/* ── LIQUID GLASS ORB ── */}
      <div
        ref={orbRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ zIndex: 20, willChange: "transform" }}
      >
        {/* Layer 1: Backdrop capture + liquid displacement */}
        <div
          style={{
            width: 290,
            height: 290,
            borderRadius: "50%",
            overflow: "hidden",
            backdropFilter: "blur(0.8px) brightness(1.18) saturate(1.3) contrast(1.05)",
            WebkitBackdropFilter: "blur(0.8px) brightness(1.18) saturate(1.3) contrast(1.05)",
            filter: "url(#liquid-glass)",
            position: "relative",
          }}
        >
          {/* Inner tint — slightly lightens the orb interior */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Layer 2: Glass shine highlights */}
        <div
          ref={shineRef}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            pointerEvents: "none",
            background: `
              radial-gradient(ellipse 55% 35% at 36% 28%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.10) 40%, transparent 70%),
              radial-gradient(ellipse 30% 18% at 62% 72%, rgba(255,255,255,0.10) 0%, transparent 60%)
            `,
          }}
        />

        {/* Layer 3: Chromatic aberration border */}
        <div
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: "50%",
            boxShadow: `
              0 0 0 1px rgba(255, 55, 0, 0.55),
              0 0 0 2.5px rgba(30, 60, 255, 0.30),
              0 0 0 4px rgba(0, 200, 255, 0.10),
              inset 0 0 0 1px rgba(255, 55, 0, 0.20),
              inset 0 0 0 2px rgba(30, 60, 255, 0.12),
              0 8px 60px rgba(0, 0, 0, 0.35),
              0 2px 20px rgba(255, 55, 0, 0.08)
            `,
            filter: "url(#ca-filter)",
          }}
        />

        {/* Layer 4: Bottom edge shadow (depth) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse 70% 30% at 50% 88%, rgba(0,0,0,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}
