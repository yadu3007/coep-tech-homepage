import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { announcements } from "../data/homepage";

export function AnnouncementsSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className="bg-background border-y border-border/30 overflow-hidden"
      data-ocid="announcements.section"
      aria-label="Latest Announcements"
    >
      <div className="flex items-stretch min-h-[52px]">
        {/* Label badge */}
        <div
          className="shrink-0 bg-primary flex items-center justify-center px-5 py-3 z-10"
          style={{ minWidth: "max-content" }}
          aria-label="Announcements label"
        >
          <div className="flex flex-col items-center leading-none gap-0.5">
            <span className="font-display text-[10px] font-bold text-accent uppercase tracking-[0.22em]">
              LATEST
            </span>
            <span className="font-display text-[10px] text-primary-foreground/50 uppercase tracking-[0.22em]">
              ANNOUNCEMENTS
            </span>
          </div>
        </div>

        {/* Scrolling ticker */}
        <div
          className="flex-1 overflow-hidden relative py-3 cursor-default"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-ocid="announcements.ticker"
        >
          {/* Fade masks */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.98), transparent)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgba(255,255,255,0.98), transparent)",
            }}
            aria-hidden="true"
          />

          <div
            className="flex whitespace-nowrap"
            style={{
              animation: "ticker 50s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
            aria-live="off"
          >
            {/* Two sets for seamless loop */}
            {[...announcements, ...announcements].map((item, idx) => (
              <a
                // biome-ignore lint/suspicious/noArrayIndexKey: ticker duplicate items
                key={idx}
                href="#announcements"
                className="inline-flex items-center gap-2.5 px-5 text-sm font-body text-foreground hover:text-accent transition-smooth"
                data-ocid={
                  idx < announcements.length
                    ? `announcements.item.${idx + 1}`
                    : undefined
                }
              >
                {item.tag && (
                  <span className="bg-accent text-primary text-[10px] font-display font-bold px-2 py-0.5 uppercase tracking-wider shrink-0">
                    {item.tag}
                  </span>
                )}
                <span className="text-foreground/80">{item.text}</span>
                <span className="text-accent/50 px-3 font-bold">◆</span>
              </a>
            ))}
          </div>
        </div>

        {/* View all CTA */}
        <div className="shrink-0 border-l border-border/30 flex items-center">
          <a
            href="#announcements"
            className="flex items-center gap-1.5 px-5 py-3 text-xs font-display font-semibold uppercase tracking-wider text-accent hover:bg-muted transition-smooth whitespace-nowrap"
            data-ocid="announcements.view_all_link"
          >
            View All <ChevronRight size={13} />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
