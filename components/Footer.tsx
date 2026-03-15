export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-black/8 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-bold text-[#0a0a0a]/70 tracking-tight">Pivot Studio</span>
        <p className="text-xs text-[#0a0a0a]/30 text-center">
          &copy; {year} Pivot Studio. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a href="mailto:hello@pivotstudio.io" className="text-xs text-[#0a0a0a]/30 hover:text-[#0a0a0a]/60 transition-colors duration-200">
            hello@pivotstudio.io
          </a>
        </div>
      </div>
    </footer>
  );
}
