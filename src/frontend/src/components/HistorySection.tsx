import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const timelineNodes = [
  {
    year: "1854",
    title: "Foundation",
    description:
      "College of Engineering Pune established as the third engineering college in Asia, under the colonial government.",
    accent: "#E8C42A",
  },
  {
    year: "1865",
    title: "Foundation Stone",
    description:
      "The iconic main building's foundation stone laid, marking the beginning of permanent campus infrastructure on Wellesley Road.",
    accent: "#E8C42A",
  },
  {
    year: "1911",
    title: "Name Change",
    description:
      "Renamed to the College of Engineering, Pune — a name it would carry proudly for over a century of engineering education.",
    accent: "#E8C42A",
  },
  {
    year: "1948",
    title: "Affiliation Transfer",
    description:
      "Transfer of administration to the newly independent Government of Maharashtra, marking a new chapter in national technical education.",
    accent: "#E8C42A",
  },
  {
    year: "2022",
    title: "University Status",
    description:
      "Elevated to COEP Technological University — a full-fledged Unitary Public University by the Government of Maharashtra.",
    accent: "#E8C42A",
  },
];

export function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #081E5C 0%, #0F3499 60%, #1648C8 100%)",
      }}
      data-ocid="history.section"
    >
      {/* Background decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(255,255,255,0.3) 80px, rgba(255,255,255,0.3) 81px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.3) 80px, rgba(255,255,255,0.3) 81px)",
        }}
        aria-hidden="true"
      />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-12"
              style={{ background: "rgba(232,196,42,0.6)" }}
            />
            <span
              className="text-xs uppercase tracking-[0.28em] font-medium"
              style={{
                color: "#E8C42A",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Since 1854
            </span>
            <div
              className="h-px w-12"
              style={{ background: "rgba(232,196,42,0.6)" }}
            />
          </div>
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            History &amp; Legacy
          </h2>
          <p
            className="font-body mt-4 max-w-xl mx-auto text-base leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            170 years of pioneering technical education — shaping engineers,
            innovators, and leaders who have changed the world.
          </p>
        </div>

        {/* Timeline — horizontal strip showing first 3-4 nodes */}
        <div className="relative">
          {/* Horizontal connector line */}
          <div
            className="hidden md:block absolute top-8 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent 2%, rgba(232,196,42,0.5) 15%, rgba(232,196,42,0.5) 85%, transparent 98%)",
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {timelineNodes.slice(0, 4).map((node, idx) => (
              <div
                key={node.year}
                className="relative"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.65s ease-out ${idx * 0.12 + 0.1}s, transform 0.65s ease-out ${idx * 0.12 + 0.1}s`,
                }}
              >
                {/* Year node circle */}
                <div className="flex flex-col items-center md:items-start">
                  <div
                    className="w-16 h-16 flex items-center justify-center mb-4 shrink-0"
                    style={{
                      background: "rgba(232,196,42,0.15)",
                      border: "2px solid #E8C42A",
                      borderRadius: "50%",
                    }}
                  >
                    <span
                      className="font-display font-bold text-sm"
                      style={{
                        color: "#E8C42A",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {node.year}
                    </span>
                  </div>
                  <h3
                    className="font-display font-bold text-base mb-2 text-center md:text-left"
                    style={{
                      color: "#ffffff",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {node.title}
                  </h3>
                  <p
                    className="text-sm font-body leading-relaxed text-center md:text-left"
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {node.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View full timeline CTA */}
        <div
          className="flex justify-center mt-12"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease-out 0.6s",
          }}
        >
          <button
            type="button"
            onClick={() => {
              window.location.hash = "/about-us";
            }}
            className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest px-10 py-3.5 transition-all duration-200"
            style={{
              background: "#E8C42A",
              color: "#081E5C",
              borderRadius: "2px",
              fontFamily: "'Source Sans 3', sans-serif",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(232,196,42,0.3)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "#d4b025";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 24px rgba(232,196,42,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "#E8C42A";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 16px rgba(232,196,42,0.3)";
            }}
            data-ocid="history.view_full_timeline_button"
          >
            View Full Timeline
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
