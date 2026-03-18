const projects = [
  {
    num: "01",
    name: "Sanjay Textile",
    type: "Brand + Web",
    year: "2025",
    tag: "Manufacturing",
    bg: "from-orange-950/40 to-stone-900/60",
    accent: "#ff6b35",
  },
  {
    num: "02",
    name: "TradiePro",
    type: "Mobile App",
    year: "2025",
    tag: "Construction",
    bg: "from-blue-950/50 to-slate-900/60",
    accent: "#3b82f6",
  },
  {
    num: "03",
    name: "MelbFoods",
    type: "Web + Ordering",
    year: "2025",
    tag: "Hospitality",
    bg: "from-emerald-950/40 to-zinc-900/60",
    accent: "#10b981",
  },
  {
    num: "04",
    name: "OpsFlow SaaS",
    type: "Product Design",
    year: "2026",
    tag: "SaaS",
    bg: "from-violet-950/50 to-zinc-900/60",
    accent: "#8b5cf6",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase opacity-40 mb-3">
              Selected Work
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light tracking-tight leading-none">
              What we've built
            </h2>
          </div>
          <a href="#" className="hidden md:block text-[13px] tracking-[0.1em] uppercase hlink opacity-60 hover:opacity-100">
            All projects →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p.num} className="work-card group relative overflow-hidden rounded-2xl">
              {/* Card background */}
              <div
                className={`card-img w-full aspect-[4/3] bg-gradient-to-br ${p.bg} flex items-end p-8`}
              >
                {/* Decorative circle */}
                <div
                  className="absolute top-8 right-8 w-24 h-24 rounded-full opacity-20 blur-xl"
                  style={{ background: p.accent }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-10 blur-2xl"
                  style={{ background: p.accent }}
                />
              </div>

              {/* Info overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] tracking-[0.2em] uppercase opacity-40">{p.num}</span>
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full border"
                    style={{ borderColor: `${p.accent}40`, color: p.accent }}
                  >
                    {p.tag}
                  </span>
                </div>

                <div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[12px] tracking-[0.1em] uppercase opacity-40 mb-1">{p.type}</p>
                      <h3 className="text-3xl font-light tracking-tight">{p.name}</h3>
                    </div>
                    <span className="text-[11px] opacity-30">{p.year}</span>
                  </div>

                  {/* Arrow appears on hover */}
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-[12px] tracking-widest uppercase">View case study</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
