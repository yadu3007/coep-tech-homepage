import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

export function CampusLifeSection() {
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
      className="p-0 m-0 relative"
      style={{ background: "transparent", lineHeight: 0 }}
      data-ocid="campus_life.section"
      aria-label="Campus Life at COEP"
    >
      <div
        className="w-full overflow-hidden relative"
        style={{
          border: "3px solid #C9A84C",
          borderLeft: "none",
          borderRight: "none",
          lineHeight: 0,
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src="/assets/campus-video2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full block"
          style={{
            display: "block",
            width: "100%",
            maxHeight: "520px",
            objectFit: "cover",
          }}
          data-ocid="campus_life.video"
        />

        {/* Mute/Unmute button — only control */}
        <button
          type="button"
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-20 flex items-center justify-center w-10 h-10 transition-smooth"
          style={{
            background: "rgba(26,43,95,0.7)",
            border: "1px solid rgba(201,168,76,0.5)",
            backdropFilter: "blur(6px)",
            color: "#C9A84C",
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(201,168,76,0.2)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "#C9A84C";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(26,43,95,0.7)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(201,168,76,0.5)";
          }}
          aria-label={muted ? "Unmute video" : "Mute video"}
          data-ocid="campus_life.mute_toggle"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </section>
  );
}
