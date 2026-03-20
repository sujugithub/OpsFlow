"use client";

import { useEffect, useRef } from "react";

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

export default function LiquidGlassOrb({ mouseRef }: { mouseRef: MouseRef }) {
  const orbRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  /* Lerp orb to mouse — same 0.1 factor as Hero.tsx so text mask stays in sync */
  useEffect(() => {
    posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let raf: number;

    function tick() {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.1;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.1;
      if (orbRef.current) {
        orbRef.current.style.transform =
          `translate(${posRef.current.x}px,${posRef.current.y}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mouseRef]);

  return (
    <>
      {/* ── SVG filter: animated water-droplet distortion ────────── */}
      <svg
        aria-hidden
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id="orb-distort" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.013"
              numOctaves="4"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.013 0.009;0.024 0.019;0.013 0.009"
                dur="10s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/*
        ── Orb shell ───────────────────────────────────────────────
        clip-path:circle(50%) is REQUIRED — border-radius alone
        does not clip the backdrop-filter bleed at the edges.
      */}
      <div
        ref={orbRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          /* diameter = min(W,H) * 0.38 matches Hero.tsx orbR * 2 */
          width:  "min(38vw, 38vh)",
          height: "min(38vw, 38vh)",
          pointerEvents: "none",
          zIndex: 20,
          clipPath: "circle(50%)",
          /* Soap-bubble refraction: subtle magnify + colour shift */
          backdropFilter:
            "blur(1.5px) brightness(1.07) saturate(1.5) contrast(1.04)",
          WebkitBackdropFilter:
            "blur(1.5px) brightness(1.07) saturate(1.5) contrast(1.04)",
        }}
      >

        {/* ── Iridescent body + animated water-droplet distortion ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            filter: "url(#orb-distort)",
          }}
        >
          {/* Soap-bubble interior — nearly invisible, colour washes */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: `
                radial-gradient(circle at 34% 30%, rgba(255,210,235,0.18) 0%, transparent 52%),
                radial-gradient(circle at 68% 18%, rgba(90,230,210,0.14) 0%, transparent 42%),
                radial-gradient(circle at 18% 70%, rgba(255,170,70,0.12)  0%, transparent 38%),
                radial-gradient(circle at 80% 78%, rgba(175,100,255,0.12) 0%, transparent 36%),
                rgba(255,255,255,0.025)
              `,
            }}
          />
        </div>

        {/*
          ── Prismatic rim ─────────────────────────────────────────
          Conic gradient masked with a radial so only the thin ring
          at the edge is painted — uneven, not a flat uniform band.
        */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `conic-gradient(
              from 20deg,
              rgba(255, 90,175,0.70)   0deg,
              rgba(75, 220,200,0.65)  55deg,
              rgba(255,200, 55,0.60) 110deg,
              rgba(130, 75,255,0.65) 180deg,
              rgba(55, 175,255,0.60) 240deg,
              rgba(255,120,140,0.65) 300deg,
              rgba(255, 90,175,0.70) 360deg
            )`,
            /* Outer glow + soft fade so it feels thin and liquid */
            WebkitMaskImage: `radial-gradient(
              circle,
              transparent 80%,
              rgba(0,0,0,0.25) 83%,
              black         87%,
              rgba(0,0,0,0.4) 93%,
              transparent   100%
            )`,
            maskImage: `radial-gradient(
              circle,
              transparent 80%,
              rgba(0,0,0,0.25) 83%,
              black         87%,
              rgba(0,0,0,0.4) 93%,
              transparent   100%
            )`,
          }}
        />

        {/* ── Primary specular — top-left, broad & soft ─────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(
              ellipse 42% 24% at 27% 21%,
              rgba(255,255,255,0.58) 0%,
              rgba(255,255,255,0.10) 55%,
              transparent 100%
            )`,
          }}
        />

        {/* ── Secondary specular — bottom-right, small & sharp ──── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(
              ellipse 16% 9% at 75% 77%,
              rgba(255,255,255,0.32) 0%,
              transparent 100%
            )`,
          }}
        />

      </div>
    </>
  );
}
