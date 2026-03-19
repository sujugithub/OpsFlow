"use client";

import { useEffect, useRef } from "react";
import LiquidGlassOrb from "./LiquidGlassOrb";

export default function Hero() {
  const taglineRef = useRef<HTMLDivElement>(null);

  // HTML blob refs — controlled by JS for magnetic movement
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  // Text refs for mask / clip effects
  const enRef = useRef<HTMLHeadingElement>(null);
  const jpRef = useRef<HTMLHeadingElement>(null);

  // Shared mouse tracking — passed to Three.js canvas too
  const mouseRef = useRef({ x: -1, y: -1 });

  // Fade-in
  useEffect(() => {
    const el = taglineRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 300);
  }, []);

  useEffect(() => {
    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    // Per-blob lerped magnetic offsets
    const m1 = { x: 0, y: 0 };
    const m2 = { x: 0, y: 0 };
    const m3 = { x: 0, y: 0 };

    // Orb pixel position (same 0.1 lerp as Three.js sphere)
    const orb = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    let t = 0;
    let raf: number;

    const tick = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const mx = mouseRef.current.x < 0 ? W / 2 : mouseRef.current.x;
      const my = mouseRef.current.y < 0 ? H / 2 : mouseRef.current.y;
      t += 0.008;

      // Lerp orb pixel position — mirrors Three.js 0.1 factor
      orb.x += (mx - orb.x) * 0.1;
      orb.y += (my - orb.y) * 0.1;

      // ── Magnetic HTML blobs ──────────────────────────────────────
      // normX/Y: -0.5 → 0.5 (cursor position relative to screen centre)
      const normX = (mx - W / 2) / W;
      const normY = (my - H / 2) / H;

      // Each blob lerps toward cursor with unique pull range + organic drift
      const b1tx = normX * 210 + Math.sin(t * 0.38) * 14;
      const b1ty = normY * 160 + Math.cos(t * 0.29) * 11;
      m1.x += (b1tx - m1.x) * 0.035;
      m1.y += (b1ty - m1.y) * 0.035;

      const b2tx = normX * 250 + Math.sin(t * 0.44 + 1.0) * 11;
      const b2ty = normY * 190 + Math.cos(t * 0.33 + 2.0) * 9;
      m2.x += (b2tx - m2.x) * 0.028;
      m2.y += (b2ty - m2.y) * 0.028;

      const b3tx = normX * 175 + Math.sin(t * 0.51 + 2.1) * 17;
      const b3ty = normY * 135 + Math.cos(t * 0.40 + 0.8) * 13;
      m3.x += (b3tx - m3.x) * 0.042;
      m3.y += (b3ty - m3.y) * 0.042;

      if (blob1Ref.current) blob1Ref.current.style.transform = `translate3d(${m1.x}px,${m1.y}px,0)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate3d(${m2.x}px,${m2.y}px,0)`;
      if (blob3Ref.current) blob3Ref.current.style.transform = `translate3d(${m3.x}px,${m3.y}px,0)`;

      // ── Text effects — track the lerped orb pixel position ───────
      // Radius formula matches the Three.js sphere: min(H,W) * 0.19
      const orbR = Math.min(W, H) * 0.19;

      // English: mask punches a transparent hole where the orb sits
      if (enRef.current) {
        const rect = enRef.current.getBoundingClientRect();
        const lx = orb.x - rect.left;
        const ly = orb.y - rect.top;
        const mask = `radial-gradient(circle ${orbR}px at ${lx}px ${ly}px, transparent 72%, black 97%)`;
        enRef.current.style.maskImage = mask;
        enRef.current.style.setProperty("-webkit-mask-image", mask);
      }

      // Japanese: clip-path reveals text only inside the orb circle
      if (jpRef.current) {
        const rect = jpRef.current.getBoundingClientRect();
        const lx = orb.x - rect.left;
        const ly = orb.y - rect.top;
        jpRef.current.style.clipPath = `circle(${orbR}px at ${lx}px ${ly}px)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const h1Class =
    "text-[clamp(3.5rem,9vw,10rem)] font-light leading-[0.92] tracking-[-0.03em] mb-8";

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end pb-20 px-8 overflow-hidden"
      style={{ background: "#05000e" }}
    >
      {/* ── Dark overlay for readability ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.2) 100%)" }} />


      {/* ── Noise overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Metadata row ── */}
      <div className="absolute top-28 left-8 right-8 flex justify-between items-start max-w-[1400px] mx-auto w-full pointer-events-none">
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-35">
          <span>Sydney, Australia</span>
          <br />
          <span>Est. 2025</span>
        </div>
        <div className="text-[11px] tracking-[0.2em] uppercase opacity-35 text-right">
          <span>Web & Mobile Studio</span>
          <br />
          <span>AI-Powered Tools</span>
        </div>
      </div>

      {/*
        ── Three.js liquid-glass orb ── (z-index 20)
        Transparent canvas: outside orb = HTML shows through.
        Inside orb = glass refracts the vivid 3D blobs.
      */}
      <LiquidGlassOrb mouseRef={mouseRef} />

      {/* ── Text content — sits ABOVE the canvas ── (z-index 30) */}
      <div className="relative max-w-[1400px] mx-auto w-full" style={{ zIndex: 30 }}>
        <div
          ref={taglineRef}
          style={{
            opacity: 0,
            transform: "translateY(28px)",
            transition:
              "opacity 1.2s cubic-bezier(0.25,0.46,0.45,0.94), transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          {/* Stacked headlines — English masked + Japanese revealed */}
          <div style={{ position: "relative" }}>
            {/* English: mask removes text where the orb sits, so glass shows through */}
            <h1 ref={enRef} className={h1Class}>
              We build digital
              <br />
              <em className="not-italic" style={{ color: "rgba(240,237,232,0.42)" }}>
                that makes
              </em>
              <br />
              you money
            </h1>

            {/*
              Japanese: absolutely stacked on top, starts fully clipped (circle 0px).
              JS expands the clip-path circle to match the orb position.
              textShadow gives it a glowing iridescent feel, as if lit by the glass.
            */}
            <h1
              ref={jpRef}
              className={h1Class}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                margin: 0,
                clipPath: "circle(0px at 50% 50%)",
                color: "#f5f0ff",
                pointerEvents: "none",
                textShadow:
                  "0 0 30px rgba(180,120,255,0.55), 0 0 8px rgba(255,255,255,0.35)",
              }}
            >
              デジタルを
              <br />
              <em className="not-italic" style={{ color: "rgba(220,200,255,0.5)" }}>
                構築して
              </em>
              <br />
              収益を生む
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <p className="text-[15px] leading-relaxed opacity-50 max-w-sm">
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

        <div className="mt-16 flex items-center gap-3 opacity-25">
          <div className="w-[1px] h-10 bg-current" />
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}


