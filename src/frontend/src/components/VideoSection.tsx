import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(400px, 56vw, 780px)", zIndex: 0 }}
      data-ocid="video.section"
      aria-label="COEP Campus Video"
    >
      {/* Campus video — autoplay, muted, loop, horizontally inverted */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src="/assets/beauty-is-beautifyingcoep-pune-coep-tech-university-pune-shorts-coep-coeptech-xb_tqqiyaiz-019da87f-e369-75f9-873f-fc0501551202.mp4"
        autoPlay
        muted
        loop
        playsInline
        tabIndex={-1}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transform: "scaleX(-1)",
        }}
      />

      {/* Bottom gradient — midnight cobalt fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "45%",
          background:
            "linear-gradient(to top, rgba(8,30,92,0.92) 0%, rgba(8,30,92,0.45) 55%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Top gradient — cobalt tint for visual continuity with header */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "22%",
          background:
            "linear-gradient(to bottom, rgba(22,72,200,0.35), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Side vignettes — cobalt */}
      <div
        className="absolute inset-y-0 left-0 w-8 md:w-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(22,72,200,0.28), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-8 md:w-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(22,72,200,0.28), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Mute/Unmute button — cobalt bg, gold icon */}
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-20 flex items-center justify-center w-11 h-11 transition-all duration-300"
        style={{
          background: "rgba(22,72,200,0.75)",
          border: "1.5px solid rgba(232,196,42,0.55)",
          backdropFilter: "blur(8px)",
          color: "#E8C42A",
          borderRadius: "2px",
          boxShadow: "0 4px 20px rgba(8,30,92,0.4)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(22,72,200,1)";
          el.style.borderColor = "#E8C42A";
          el.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(22,72,200,0.75)";
          el.style.borderColor = "rgba(232,196,42,0.55)";
          el.style.transform = "scale(1)";
        }}
        aria-label={muted ? "Unmute video" : "Mute video"}
        data-ocid="video.mute_toggle"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Text overlay — bottom center */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none flex items-end justify-center pb-7 md:pb-12 px-4">
        <p
          className="font-display text-sm md:text-base tracking-[0.28em] uppercase text-center"
          style={{
            color: "rgba(232,196,42,0.9)",
            textShadow: "0 2px 16px rgba(0,0,0,0.7)",
            letterSpacing: "0.28em",
          }}
        >
          COEP Technological University — Pune, Maharashtra
        </p>
      </div>
    </section>
  );
}
