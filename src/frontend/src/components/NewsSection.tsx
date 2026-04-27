import { ArrowRight, Clock, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { news } from "../data/homepage";

// ─── Scroll reveal hook ─────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
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

  return { ref, visible };
}

export function NewsSection() {
  const [expanded, setExpanded] = useState(false);
  const { ref, visible } = useScrollReveal();
  const topThree = news.slice(0, 3);
  const rest = news.slice(3);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid rgba(22,72,200,0.08)",
      }}
      data-ocid="news.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className="flex items-end justify-between mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8" style={{ background: "#1648C8" }} />
              <span
                className="text-xs uppercase tracking-[0.25em] font-body font-semibold"
                style={{
                  color: "#1648C8",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Updates
              </span>
            </div>
            <h2
              className="font-display text-3xl md:text-4xl font-bold"
              style={{
                color: "#0F3499",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Latest News
            </h2>
          </div>
          <a
            href="/news"
            className="hidden sm:flex text-sm font-body items-center gap-1.5 transition-all duration-200 group"
            style={{
              color: "#1648C8",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#0F3499";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#1648C8";
            }}
            data-ocid="news.read_all_link"
          >
            Read All News
            <ExternalLink
              size={13}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </a>
        </div>

        {/* Top 3 news items */}
        <div className="space-y-0">
          {topThree.map((item, idx) => (
            <a
              key={item.id}
              href={`/news/${item.id}`}
              className="group flex items-start gap-5 md:gap-8 py-7 px-4 -mx-4 transition-all duration-300 rounded-sm"
              style={{
                borderBottom: "1px solid rgba(22,72,200,0.1)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 0.65s ease-out ${idx * 0.1 + 0.1}s, transform 0.65s ease-out ${idx * 0.1 + 0.1}s, background 0.25s`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(22,72,200,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
              data-ocid={`news.item.${idx + 1}`}
            >
              {/* Large cobalt number */}
              <div className="shrink-0 w-14 flex items-start justify-center pt-0.5">
                <span
                  className="font-display font-bold leading-none group-hover:scale-105 transition-transform duration-300 inline-block"
                  style={{
                    fontSize: "3.5rem",
                    color: "#1648C8",
                    fontFamily: "'Playfair Display', serif",
                    opacity: 0.55,
                  }}
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="text-[11px] font-display font-bold uppercase tracking-wider px-2 py-0.5"
                    style={{
                      color: "#1648C8",
                      background: "rgba(22,72,200,0.08)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {item.category}
                  </span>
                  {item.isNew && (
                    <span
                      className="text-[10px] font-display font-bold uppercase tracking-wider px-2 py-0.5 text-white"
                      style={{ background: "#1648C8" }}
                    >
                      NEW
                    </span>
                  )}
                  <span
                    className="flex items-center gap-1 text-xs font-body"
                    style={{
                      color: "#999",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    <Clock size={10} />
                    {item.date}
                  </span>
                </div>
                <h3
                  className="font-display font-semibold text-lg leading-snug mb-1.5 transition-colors duration-200"
                  style={{
                    color: "#0F3499",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm font-body leading-relaxed line-clamp-2"
                  style={{
                    color: "#666",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  {item.excerpt}
                </p>
              </div>

              {/* Animated arrow */}
              <ArrowRight
                size={16}
                className="shrink-0 mt-3 transition-all duration-200 group-hover:translate-x-1"
                style={{ color: "rgba(22,72,200,0.35)" }}
              />
            </a>
          ))}
        </div>

        {/* Expanded items */}
        {expanded && (
          <div className="animate-fade-in">
            {rest.map((item, idx) => (
              <a
                key={item.id}
                href={`/news/${item.id}`}
                className="group flex items-start gap-5 md:gap-8 py-7 px-4 -mx-4 transition-all duration-300 rounded-sm"
                style={{ borderBottom: "1px solid rgba(22,72,200,0.1)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(22,72,200,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent";
                }}
                data-ocid={`news.item.${idx + 4}`}
              >
                <div className="shrink-0 w-14 flex items-start justify-center pt-0.5">
                  <span
                    className="font-display font-bold leading-none group-hover:scale-105 transition-transform duration-300 inline-block"
                    style={{
                      fontSize: "3.5rem",
                      color: "#1648C8",
                      fontFamily: "'Playfair Display', serif",
                      opacity: 0.3,
                    }}
                    aria-hidden="true"
                  >
                    {String(idx + 4).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="text-[11px] font-display font-bold uppercase tracking-wider px-2 py-0.5"
                      style={{
                        color: "#1648C8",
                        background: "rgba(22,72,200,0.08)",
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      {item.category}
                    </span>
                    {item.isNew && (
                      <span
                        className="text-[10px] font-display font-bold uppercase tracking-wider px-2 py-0.5 text-white"
                        style={{ background: "#1648C8" }}
                      >
                        NEW
                      </span>
                    )}
                    <span
                      className="flex items-center gap-1 text-xs font-body"
                      style={{
                        color: "#999",
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      <Clock size={10} />
                      {item.date}
                    </span>
                  </div>
                  <h3
                    className="font-display font-semibold text-lg leading-snug mb-1.5"
                    style={{
                      color: "#0F3499",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm font-body leading-relaxed line-clamp-2"
                    style={{
                      color: "#666",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {item.excerpt}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="shrink-0 mt-3 transition-all duration-200 group-hover:translate-x-1"
                  style={{ color: "rgba(22,72,200,0.35)" }}
                />
              </a>
            ))}
          </div>
        )}

        {/* View More / View Less button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="font-display font-bold text-xs uppercase tracking-widest px-10 py-3.5 transition-all duration-200"
            style={{
              background: "#E8C42A",
              color: "#081E5C",
              border: "none",
              borderRadius: "2px",
              fontFamily: "'Source Sans 3', sans-serif",
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
            data-ocid="news.view_more_button"
          >
            {expanded ? "Show Less" : "View More News"}
          </button>
          <a
            href="/news"
            className="sm:hidden flex text-sm font-body items-center gap-1.5 transition-all duration-200"
            style={{
              color: "#1648C8",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
            data-ocid="news.read_all_link_mobile"
          >
            Read All News <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
