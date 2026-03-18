export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 px-8 border-t border-[rgba(240,237,232,0.07)] relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase opacity-40 mb-3">Get in touch</p>
          <h2 className="text-[clamp(2.5rem,6vw,7rem)] font-light tracking-tight leading-[0.95] mb-12">
            Start a project
            <br />
            <span style={{ color: "rgba(240,237,232,0.35)" }}>with us today</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] tracking-[0.2em] uppercase opacity-40">Your name</label>
              <input
                type="text"
                placeholder="Full name"
                className="bg-transparent border-b border-[rgba(240,237,232,0.15)] py-3 text-[15px] placeholder:opacity-25 focus:outline-none focus:border-[rgba(240,237,232,0.6)] transition-colors duration-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] tracking-[0.2em] uppercase opacity-40">Email</label>
              <input
                type="email"
                placeholder="hello@yourbusiness.com"
                className="bg-transparent border-b border-[rgba(240,237,232,0.15)] py-3 text-[15px] placeholder:opacity-25 focus:outline-none focus:border-[rgba(240,237,232,0.6)] transition-colors duration-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] tracking-[0.2em] uppercase opacity-40">What do you need?</label>
              <select className="bg-transparent border-b border-[rgba(240,237,232,0.15)] py-3 text-[15px] opacity-60 focus:outline-none focus:border-[rgba(240,237,232,0.6)] transition-colors duration-300">
                <option value="" className="bg-[#0a0a0a]">Select a service</option>
                <option value="web" className="bg-[#0a0a0a]">Website Design & Dev</option>
                <option value="app" className="bg-[#0a0a0a]">Mobile App</option>
                <option value="ai" className="bg-[#0a0a0a]">AI Tool / OpsFlow</option>
                <option value="retainer" className="bg-[#0a0a0a]">Monthly Retainer</option>
                <option value="other" className="bg-[#0a0a0a]">Something else</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] tracking-[0.2em] uppercase opacity-40">Tell us more</label>
              <textarea
                rows={3}
                placeholder="What's your project about?"
                className="bg-transparent border-b border-[rgba(240,237,232,0.15)] py-3 text-[15px] placeholder:opacity-25 focus:outline-none focus:border-[rgba(240,237,232,0.6)] transition-colors duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 self-start bg-[var(--fg)] text-[var(--bg)] text-[13px] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
            >
              Send message →
            </button>
          </form>

          {/* Info */}
          <div className="flex flex-col gap-10 md:pt-8">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase opacity-40 mb-3">Email us</p>
              <a href="mailto:hello@opsflow.studio" className="text-lg hlink">
                hello@opsflow.studio
              </a>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase opacity-40 mb-3">Based in</p>
              <p className="text-lg font-light opacity-70">Sydney, Australia</p>
              <p className="text-[13px] opacity-40 mt-1">Serving AU-wide + remote globally</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase opacity-40 mb-3">Response time</p>
              <p className="text-lg font-light opacity-70">Within 24 hours</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase opacity-40 mb-4">Follow us</p>
              <div className="flex gap-6">
                {["Instagram", "LinkedIn", "Twitter"].map((s) => (
                  <a key={s} href="#" className="text-[13px] hlink opacity-60 hover:opacity-100 transition-opacity">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
