const services = [
  {
    num: "01",
    title: "Web Design & Development",
    desc: "From brand identity to responsive websites that convert. Built on Next.js, fast, and made to rank.",
    tags: ["Next.js", "Tailwind", "CMS", "SEO"],
    from: "$2,500",
  },
  {
    num: "02",
    title: "Mobile App Development",
    desc: "iOS & Android apps that your customers actually use. Native-feel, beautifully designed, reliably built.",
    tags: ["React Native", "iOS", "Android", "Backend"],
    from: "$15,000",
  },
  {
    num: "03",
    title: "AI-Powered Tools",
    desc: "Automate quoting, invoicing, and cash flow with our OpsFlow platform. Custom AI integrations for your business.",
    tags: ["OpenAI", "Automation", "SaaS", "API"],
    from: "$49/mo",
  },
  {
    num: "04",
    title: "Growth Retainers",
    desc: "Monthly partnerships: SEO, content, ads, and strategy calls. We become your ongoing digital team.",
    tags: ["SEO", "Ads", "Analytics", "Strategy"],
    from: "$800/mo",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-8 border-t border-[rgba(240,237,232,0.07)]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="text-[11px] tracking-[0.25em] uppercase opacity-40 mb-3">What we do</p>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light tracking-tight leading-none">
            Services
          </h2>
        </div>

        {/* List */}
        <div className="divide-y divide-[rgba(240,237,232,0.07)]">
          {services.map((s) => (
            <div
              key={s.num}
              className="group py-10 flex flex-col md:flex-row md:items-center gap-6 hover:pl-4 transition-all duration-500"
            >
              <span className="text-[11px] tracking-[0.2em] uppercase opacity-30 md:w-12 shrink-0">
                {s.num}
              </span>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-[14px] leading-relaxed opacity-50 max-w-xl mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 border border-[rgba(240,237,232,0.15)] rounded-full opacity-60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:text-right shrink-0">
                <p className="text-[11px] tracking-[0.15em] uppercase opacity-30 mb-1">From</p>
                <p className="text-xl font-light">{s.from}</p>
              </div>

              <span className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
