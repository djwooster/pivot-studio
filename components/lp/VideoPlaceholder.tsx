export default function VideoPlaceholder({ label = "Play video" }: { label?: string }) {
  return (
    <div className="relative w-full aspect-video bg-[#0a0a0a] flex items-center justify-center cursor-pointer group">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-2 border-white/30 flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors duration-200">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="white"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="text-white/50 text-sm">{label}</span>
      </div>
    </div>
  );
}
