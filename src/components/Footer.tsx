export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-8 py-8 border-t border-[rgba(240,237,232,0.07)]">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[12px] tracking-[0.15em] uppercase opacity-30">
          OpsFlow Studio
        </span>
        <span className="text-[12px] opacity-25">
          © {year} · Sydney, Australia
        </span>
        <span className="text-[12px] tracking-[0.1em] uppercase opacity-30">
          We build digital that makes you money
        </span>
      </div>
    </footer>
  );
}
