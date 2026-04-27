import {
  ArrowRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { notices } from "../data/homepage";
import type { Notice } from "../types";

const CATEGORY_COLORS: Record<string, string> = {
  Examinations: "#1648C8",
  Admissions: "#0F3499",
  Research: "#081E5C",
  Administration: "#1648C8",
  Recruitment: "#0F3499",
  Academic: "#081E5C",
};

function NoticeCard({
  notice,
  isActive,
  onClick,
  dataOcid,
  visible,
  delay,
}: {
  notice: Notice;
  isActive: boolean;
  onClick: () => void;
  dataOcid: string;
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLORS[notice.category] ?? "#1648C8";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left flex flex-col overflow-hidden transition-all duration-300"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(22,72,200,0.1)",
        borderLeft: `4px solid ${isActive ? "#E8C42A" : color}`,
        borderRadius: "3px",
        boxShadow:
          hovered || isActive
            ? "0 12px 40px rgba(15,52,153,0.15)"
            : "0 4px 16px rgba(15,52,153,0.06)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        transition: `all 0.3s ease, opacity 0.65s ease-out ${delay}s, transform 0.65s ease-out ${delay}s`,
        height: "100%",
      }}
      data-ocid={dataOcid}
    >
      {/* Date badge strip */}
      <div
        className="px-5 pt-4 pb-3 flex items-center gap-3"
        style={{ background: "rgba(22,72,200,0.03)" }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 shrink-0"
          style={{ background: color, borderRadius: "2px" }}
        >
          <Bell size={14} color="#ffffff" />
        </div>
        <div className="flex flex-col">
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color, fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {notice.category}
          </span>
          <span
            className="text-[11px] font-body"
            style={{ color: "#999", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {notice.date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 flex flex-col flex-1">
        <h3
          className="font-display font-bold leading-snug mb-2 line-clamp-2"
          style={{
            color: "#0F3499",
            fontSize: "0.97rem",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {notice.title}
        </h3>
        <p
          className="text-sm font-body leading-relaxed line-clamp-3 flex-1 mb-4"
          style={{ color: "#666", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {notice.description}
        </p>
        <div
          className="flex items-center gap-1.5 pt-3"
          style={{ borderTop: "1px solid rgba(22,72,200,0.07)" }}
        >
          <a
            href={notice.link ?? "#"}
            className="text-xs font-semibold flex items-center gap-1 transition-all duration-200"
            style={{
              color: hovered ? "#E8C42A" : "#1648C8",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Read More{" "}
            <ArrowRight
              size={11}
              className={hovered ? "translate-x-0.5" : ""}
            />
          </a>
        </div>
      </div>
    </button>
  );
}

export function NoticesSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const total = notices.length;
  const cardsPerView = 3;

  const prev = useCallback(
    () => setActive((a) => (a - cardsPerView + total) % total),
    [total],
  );
  const next = useCallback(
    () => setActive((a) => (a + cardsPerView) % total),
    [total],
  );

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

  // Get 3 visible notice indices
  const visibleIdx = [
    active % total,
    (active + 1) % total,
    (active + 2) % total,
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid rgba(22,72,200,0.08)",
      }}
      data-ocid="notices.section"
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
                Official
              </span>
            </div>
            <h2
              className="font-display text-3xl md:text-4xl font-bold"
              style={{
                color: "#0F3499",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Notices &amp; Circulars
            </h2>
            <p
              className="font-body text-sm mt-2 max-w-md"
              style={{
                color: "#666",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Official announcements, circulars, and important notifications
              from the university
            </p>
          </div>
          <a
            href="#notices"
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
            data-ocid="notices.view_all_link"
          >
            All Notices
            <ExternalLink
              size={13}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </a>
        </div>

        {/* Desktop: 3-card grid with nav arrows */}
        <div className="hidden md:block relative">
          <div className="flex items-stretch gap-6 min-h-[320px]">
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
                aria-label="Previous notice"
                data-ocid="notices.prev_button"
              >
                <ChevronLeft size={22} />
              </button>
            </div>

            {visibleIdx.map((idx, pos) => (
              <div key={notices[idx].id} className="flex-1">
                <NoticeCard
                  notice={notices[idx]}
                  isActive={idx === active}
                  onClick={() => setActive(idx)}
                  dataOcid={`notices.item.${idx + 1}`}
                  visible={visible}
                  delay={pos * 0.12}
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
                aria-label="Next notice"
                data-ocid="notices.next_button"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <NoticeCard
            notice={notices[active]}
            isActive={true}
            onClick={() => {}}
            dataOcid={`notices.mobile_item.${active + 1}`}
            visible={visible}
            delay={0}
          />
          <div className="flex justify-center gap-4 mt-6">
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
              data-ocid="notices.prev_mobile_button"
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
              data-ocid="notices.next_mobile_button"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {notices.map((_, idx) => (
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
              aria-label={`Go to notice ${idx + 1}`}
              data-ocid={`notices.dot.${idx + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <a
            href="#notices"
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
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#E8C42A";
              el.style.transform = "translateY(0)";
            }}
            data-ocid="notices.view_all_button"
          >
            View All Notices
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
