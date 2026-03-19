const stats = [
  { value: "4–5", label: "Person studio" },
  { value: "AU", label: "Primary market" },
  { value: "3×", label: "Avg revenue lift" },
  { value: "100%", label: "Remote-first" },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-8 border-t border-[rgba(240,237,232,0.07)]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase opacity-40 mb-3">About us</p>
          <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-light tracking-tight leading-[1.05] mb-8">
            Based in Australia.
            <br />
            <span style={{ color: "rgba(240,237,232,0.4)" }}>Born from ambition.</span>
          </h2>
          <p className="text-[15px] leading-relaxed opacity-55 mb-6">
            We are a lean, design-led digital studio founded by Suju — a tech founder with deep roots
            in South Asian textile manufacturing and a drive to build products that move the needle.
          </p>
          <p className="text-[15px] leading-relaxed opacity-55 mb-10">
            We dont just build websites. We engineer revenue. Every project starts with your
            business goals and ends with something that pays for itself.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-[13px] tracking-[0.1em] uppercase group"
          >
            <span className="hlink">Work with us</span>
            <span className="w-8 h-[1px] bg-current opacity-40 group-hover:w-16 group-hover:opacity-100 transition-all duration-500" />
          </a>
        </div>

        {/* Right — stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border border-[rgba(240,237,232,0.08)] rounded-2xl p-8 hover:border-[rgba(240,237,232,0.2)] transition-all duration-300"
            >
              <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-tight leading-none mb-2">
                {s.value}
              </p>
              <p className="text-[12px] tracking-[0.1em] uppercase opacity-40">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
