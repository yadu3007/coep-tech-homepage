import { useEffect, useRef } from "react";
import { tickerMessages } from "../data/homepage";

export function NewsTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate messages for seamless loop
  const messages = [...tickerMessages, ...tickerMessages];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Reset position immediately on mount
    track.style.transform = "translateX(0)";
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "#0F3499",
        borderBottom: "1px solid rgba(232,196,42,0.3)",
        borderTop: "1px solid rgba(232,196,42,0.15)",
      }}
      aria-label="University announcements ticker"
      data-ocid="ticker.section"
    >
      {/* Left gradient fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0F3499, transparent)",
        }}
        aria-hidden="true"
      />

      {/* LIVE label */}
      <div
        className="absolute left-0 top-0 bottom-0 z-20 flex items-center px-4"
        style={{
          background: "#E8C42A",
          minWidth: "80px",
        }}
        aria-hidden="true"
      >
        <span
          className="font-display font-bold text-[10px] uppercase tracking-[0.2em]"
          style={{
            color: "#081E5C",
            fontFamily: "'Source Sans 3', sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          ◉ LIVE
        </span>
      </div>

      {/* Right gradient fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #0F3499, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Scrolling track */}
      <div className="pl-24 pr-4 py-2.5 overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center whitespace-nowrap"
          style={{
            animation: "tickerScroll 50s linear infinite",
            gap: "0",
          }}
          aria-live="off"
        >
          {messages.map((msg, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: ticker duplicates intentional
              key={i}
              className="inline-flex items-center"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <span
                className="text-xs font-semibold px-2"
                style={{ color: "#E8C42A" }}
              >
                ◆
              </span>
              <span
                className="text-xs font-body tracking-wide pr-6"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                {msg}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* CSS animation injected inline */}
      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="tickerScroll"] { animation: none; }
        }
      `}</style>
    </div>
  );
}
