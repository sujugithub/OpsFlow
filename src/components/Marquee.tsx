const items = [
  "Web Design",
  "Mobile Apps",
  "AI Tools",
  "Brand Identity",
  "E-Commerce",
  "SEO & Growth",
  "UI/UX Design",
  "SaaS Products",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="py-6 border-y border-[rgba(240,237,232,0.08)] overflow-hidden">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 pr-6 text-[13px] tracking-[0.15em] uppercase opacity-40 whitespace-nowrap"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-100" />
          </span>
        ))}
      </div>
    </div>
  );
}
