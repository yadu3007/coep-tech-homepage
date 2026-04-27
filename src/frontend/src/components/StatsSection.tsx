import { useEffect, useRef, useState } from "react";
import { stats } from "../data/homepage";

// ─── Count-up hook ─────────────────────────────────────────────────────────
function useCountUp(
  target: number,
  start: number,
  duration: number,
  triggered: boolean,
) {
  const [current, setCurrent] = useState(start);

  useEffect(() => {
    if (!triggered) return;
    const startTime = performance.now();
    const range = target - start;

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(start + range * eased));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [triggered, target, start, duration]);

  return current;
}

// ─── Animated Stat Item (white theme) ────────────────────────────────────────
function AnimatedStatItem({
  stat,
  idx,
  triggered,
  totalCount,
}: {
  stat: { value: string; label: string; description?: string };
  idx: number;
  triggered: boolean;
  totalCount: number;
}) {
  const numericMatch = stat.value.match(/^(\d+)/);
  const isNumeric = numericMatch !== null;
  const numericTarget = isNumeric ? Number.parseInt(numericMatch[1], 10) : 0;
  const suffix = isNumeric ? stat.value.replace(/^\d+/, "") : stat.value;

  const startFrom =
    stat.label.toLowerCase() === "established"
      ? numericTarget - 14
      : Math.max(0, numericTarget - Math.round(numericTarget * 0.15));

  const animated = useCountUp(numericTarget, startFrom, 2000, triggered);
  const displayValue = isNumeric ? `${animated}${suffix}` : stat.value;

  const isLastInRow = (idx + 1) % 4 === 0;
  const isLast = idx === totalCount - 1;

  return (
    <div
      className="group relative flex flex-col items-center text-center px-8 py-10"
      style={{
        borderRight:
          isLastInRow || isLast ? "none" : "1px solid rgba(22,72,200,0.1)",
        borderBottom: "1px solid rgba(22,72,200,0.06)",
        opacity: triggered ? 1 : 0,
        transform: triggered ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${idx * 0.1}s, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${idx * 0.1}s`,
      }}
      data-ocid={`stats.item.${idx + 1}`}
    >
      {/* Cobalt top bar accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500"
        style={{
          height: "3px",
          width: triggered ? "48px" : "0px",
          background:
            "linear-gradient(to right, transparent, #1648C8, transparent)",
          transitionDelay: `${idx * 0.1 + 0.3}s`,
        }}
        aria-hidden="true"
      />

      {/* Large cobalt value */}
      <span
        className="font-display font-bold leading-none mb-3 group-hover:scale-105 transition-transform duration-300 inline-block"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
          color: "#1648C8",
          letterSpacing: "-0.02em",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {displayValue}
      </span>

      {/* Uppercase label */}
      <span
        className="font-bold text-[11px] uppercase tracking-[0.18em] mb-2"
        style={{
          color: "#0F3499",
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {stat.label}
      </span>

      {/* Description */}
      {stat.description && (
        <span
          className="font-body text-xs leading-relaxed max-w-[180px]"
          style={{
            color: "#888",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          {stat.description}
        </span>
      )}

      {/* Gold bottom accent on hover */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-12 transition-all duration-300"
        style={{ background: "#E8C42A" }}
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Stats Section ─────────────────────────────────────────────────────────
export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const allStats = [
    ...stats.slice(0, 2),
    {
      value: "250+",
      label: "PhD Holders",
      description: "Faculty and researchers with doctoral qualifications",
    },
    ...stats.slice(2),
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{
        background: "#ffffff",
        borderTop: "1px solid rgba(22,72,200,0.08)",
        borderBottom: "1px solid rgba(22,72,200,0.08)",
      }}
      data-ocid="stats.section"
    >
      {/* Subtle diagonal texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(22,72,200,0.015) 0px, rgba(22,72,200,0.015) 1px, transparent 1px, transparent 40px)",
        }}
        aria-hidden="true"
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div
          className="mb-16 text-center"
          style={{
            opacity: triggered ? 1 : 0,
            transform: triggered ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-12"
              style={{ background: "rgba(22,72,200,0.4)" }}
            />
            <span
              className="font-body text-xs uppercase tracking-[0.28em] font-medium"
              style={{
                color: "#1648C8",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              By the Numbers
            </span>
            <div
              className="h-px w-12"
              style={{ background: "rgba(22,72,200,0.4)" }}
            />
          </div>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{
              color: "#0F3499",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Why COEP Technological University
          </h2>
          <p
            className="font-body mt-4 max-w-xl mx-auto text-base leading-relaxed"
            style={{
              color: "#666",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            A legacy of excellence backed by data.
          </p>
          {/* Gold accent underline */}
          <div
            className="mx-auto mt-4"
            style={{
              height: "3px",
              width: triggered ? "80px" : "0px",
              background: "#E8C42A",
              transition: "width 0.8s ease-out 0.3s",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 rounded-sm overflow-hidden"
          style={{
            border: "1px solid rgba(22,72,200,0.1)",
            background: "#ffffff",
            boxShadow: "0 8px 40px rgba(15,52,153,0.08)",
          }}
        >
          {allStats.map((stat, idx) => (
            <AnimatedStatItem
              key={stat.label}
              stat={stat}
              idx={idx}
              triggered={triggered}
              totalCount={allStats.length}
            />
          ))}
        </div>

        {/* Bottom highlights */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 pt-8"
          style={{
            borderTop: "1px solid rgba(22,72,200,0.08)",
            opacity: triggered ? 1 : 0,
            transition: "opacity 0.8s ease-out 0.5s",
          }}
        >
          {[
            { value: "170+", label: "Years of Legacy" },
            { value: "50k+", label: "Alumni Network" },
            { value: "95%+", label: "Placement Rate" },
          ].map((highlight, i) => (
            <div key={highlight.label} className="flex items-center gap-3">
              <div
                className="h-8 w-px"
                style={{
                  background: "rgba(22,72,200,0.2)",
                  display: i === 0 ? "none" : "block",
                }}
                aria-hidden="true"
              />
              <span
                className="font-display font-bold text-2xl"
                style={{
                  color: "#1648C8",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {highlight.value}
              </span>
              <span
                className="font-body text-xs uppercase tracking-widest"
                style={{
                  color: "#888",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                {highlight.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
