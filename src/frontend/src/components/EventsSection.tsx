import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { events } from "../data/homepage";
import type { Event } from "../types";

// ─── Portrait Event Card ──────────────────────────────────────────────────────
function EventCard({
  event,
  isActive,
  onClick,
  dataOcid,
}: {
  event: Event;
  isActive: boolean;
  onClick: () => void;
  dataOcid: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left overflow-hidden flex flex-col transition-all duration-400"
      style={{
        background: "#ffffff",
        borderLeft: isActive ? "4px solid #E8C42A" : "4px solid #1648C8",
        borderTop: "1px solid rgba(22,72,200,0.1)",
        borderRight: "1px solid rgba(22,72,200,0.1)",
        borderBottom: "1px solid rgba(22,72,200,0.1)",
        borderRadius: "3px",
        boxShadow: isActive
          ? "0 24px 64px rgba(15,52,153,0.22), 0 6px 24px rgba(15,52,153,0.12)"
          : hovered
            ? "0 12px 40px rgba(15,52,153,0.15)"
            : "0 4px 16px rgba(15,52,153,0.07)",
        transform: isActive
          ? "translateY(-6px)"
          : hovered
            ? "translateY(-3px)"
            : "translateY(0)",
        cursor: "pointer",
        height: "100%",
      }}
      data-ocid={dataOcid}
      aria-pressed={isActive}
    >
      {/* Image area — gradient placeholder with overlay pattern */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ height: "220px" }}
      >
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{
            background:
              event.gradient ??
              "linear-gradient(145deg, #1648C8 0%, #0a2580 100%)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(232,196,42,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[10px] font-body font-bold uppercase tracking-widest px-3 py-1"
            style={{
              background: "#E8C42A",
              color: "#081E5C",
              borderRadius: "2px",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            {event.category}
          </span>
        </div>
        {/* Decorative icon/graphic area */}
        <div
          className="absolute bottom-4 right-4 opacity-30"
          aria-hidden="true"
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "2px solid rgba(255,255,255,0.6)",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Date */}
        <div
          className="flex items-center gap-1.5 mb-3"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          <Calendar size={12} style={{ color: "#1648C8" }} />
          <span className="text-xs font-semibold" style={{ color: "#1648C8" }}>
            {event.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold leading-snug mb-3 line-clamp-2"
          style={{
            color: "#0F3499",
            fontSize: "1rem",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm font-body leading-relaxed line-clamp-3 flex-1 mb-4"
          style={{ color: "#666", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {event.description}
        </p>

        {/* Footer: location + arrow */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid rgba(22,72,200,0.08)" }}
        >
          <div
            className="flex items-center gap-1.5 text-xs font-body"
            style={{ color: "#888", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <MapPin size={11} style={{ color: "#1648C8" }} />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <ExternalLink
            size={13}
            className="shrink-0 transition-transform duration-200"
            style={{
              color: isActive ? "#E8C42A" : "#1648C8",
              transform: hovered ? "translate(2px,-2px)" : "none",
            }}
          />
        </div>
      </div>
    </button>
  );
}

// ─── Events Section ───────────────────────────────────────────────────────────
export function EventsSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const total = events.length;

  const prev = useCallback(
    () => setActive((a) => (a - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Show 3 cards: left neighbour, center (active), right neighbour
  const getVisibleIndices = () => {
    return [(active - 1 + total) % total, active, (active + 1) % total];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section
      ref={sectionRef}
      className="py-20 overflow-hidden"
      style={{
        background: "#F5F7FF",
        borderBottom: "1px solid rgba(22,72,200,0.08)",
      }}
      data-ocid="events.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className="flex items-end justify-between mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px" style={{ background: "#1648C8" }} />
              <span
                className="text-xs uppercase tracking-[0.25em] font-body font-semibold"
                style={{
                  color: "#1648C8",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Upcoming
              </span>
            </div>
            <h2
              className="font-display text-3xl md:text-4xl font-bold"
              style={{
                color: "#0F3499",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Events
            </h2>
            <p
              className="font-body text-sm mt-2 max-w-md"
              style={{
                color: "#666",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Stay informed about what's happening at COEP Technological
              University
            </p>
          </div>
          <a
            href="#events"
            className="hidden md:flex text-sm font-body items-center gap-1.5 transition-all duration-200 group"
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
            data-ocid="events.view_all_link"
          >
            All Events
            <ExternalLink
              size={13}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </a>
        </div>

        {/* Desktop: 3-card portrait grid with nav arrows */}
        <div className="hidden md:block relative">
          <div className="flex items-stretch gap-6 min-h-[520px]">
            {/* Left arrow */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={prev}
                className="flex items-center justify-center w-12 h-12 transition-all duration-200"
                style={{
                  background: "#1648C8",
                  border: "none",
                  color: "#ffffff",
                  borderRadius: "2px",
                  boxShadow: "0 4px 20px rgba(22,72,200,0.4)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "#E8C42A";
                  el.style.color = "#081E5C";
                  el.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "#1648C8";
                  el.style.color = "#ffffff";
                  el.style.transform = "scale(1)";
                }}
                aria-label="Previous event"
                data-ocid="events.prev_button"
              >
                <ChevronLeft size={22} />
              </button>
            </div>

            {/* 3 Portrait cards */}
            {visibleIndices.map((idx, pos) => (
              <div
                key={events[idx].id}
                className="flex-1"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.65s ease-out ${pos * 0.1}s, transform 0.65s ease-out ${pos * 0.1}s`,
                }}
              >
                <EventCard
                  event={events[idx]}
                  isActive={idx === active}
                  onClick={() => setActive(idx)}
                  dataOcid={`events.item.${idx + 1}`}
                />
              </div>
            ))}

            {/* Right arrow */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={next}
                className="flex items-center justify-center w-12 h-12 transition-all duration-200"
                style={{
                  background: "#1648C8",
                  border: "none",
                  color: "#ffffff",
                  borderRadius: "2px",
                  boxShadow: "0 4px 20px rgba(22,72,200,0.4)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "#E8C42A";
                  el.style.color = "#081E5C";
                  el.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "#1648C8";
                  el.style.color = "#ffffff";
                  el.style.transform = "scale(1)";
                }}
                aria-label="Next event"
                data-ocid="events.next_button"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <EventCard
            event={events[active]}
            isActive={true}
            onClick={() => {}}
            dataOcid={`events.mobile_item.${active + 1}`}
          />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {events.map((_, idx) => (
            <button
              type="button"
              // biome-ignore lint/suspicious/noArrayIndexKey: stable index for dots
              key={idx}
              onClick={() => setActive(idx)}
              className="transition-all duration-300"
              style={{
                width: idx === active ? "28px" : "6px",
                height: "6px",
                background: idx === active ? "#1648C8" : "rgba(22,72,200,0.2)",
                borderRadius: "3px",
              }}
              aria-label={`Go to event ${idx + 1}`}
              data-ocid={`events.dot.${idx + 1}`}
            />
          ))}
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={prev}
            className="flex items-center justify-center w-10 h-10"
            style={{
              background: "#1648C8",
              color: "#fff",
              borderRadius: "2px",
            }}
            aria-label="Previous"
            data-ocid="events.prev_mobile_button"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            className="flex items-center justify-center w-10 h-10"
            style={{
              background: "#1648C8",
              color: "#fff",
              borderRadius: "2px",
            }}
            aria-label="Next"
            data-ocid="events.next_mobile_button"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* View All CTA */}
        <div className="flex justify-center mt-8">
          <a
            href="#events"
            className="font-display font-bold text-xs uppercase tracking-widest px-10 py-3.5 transition-all duration-200 inline-flex items-center gap-2"
            style={{
              background: "#E8C42A",
              color: "#081E5C",
              borderRadius: "2px",
              fontFamily: "'Source Sans 3', sans-serif",
              boxShadow: "0 4px 16px rgba(232,196,42,0.3)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#d4b025";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 24px rgba(232,196,42,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#E8C42A";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 16px rgba(232,196,42,0.3)";
            }}
            data-ocid="events.view_all_button"
          >
            View All Events
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
