import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { researchPapers } from "../data/homepage";
import type { ResearchPaper } from "../types";

function ResearchCard({
  paper,
  visible,
  delay,
}: {
  paper: ResearchPaper;
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={paper.link ?? "#"}
      className="group flex flex-col overflow-hidden transition-all duration-300"
      style={{
        background: "#ffffff",
        borderRadius: "3px",
        borderTop: `3px solid ${hovered ? "#E8C42A" : "#1648C8"}`,
        border: "1px solid rgba(22,72,200,0.1)",
        borderTopWidth: "3px",
        borderTopColor: hovered ? "#E8C42A" : "#1648C8",
        boxShadow: hovered
          ? "0 16px 48px rgba(15,52,153,0.18)"
          : "0 4px 20px rgba(15,52,153,0.07)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        transition: `all 0.3s ease, opacity 0.65s ease-out ${delay}s, transform 0.65s ease-out ${delay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid={`research.card.${paper.id}`}
    >
      {/* Gradient header band */}
      <div
        className="h-3 w-full shrink-0"
        style={{ background: paper.gradient }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Department tag */}
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={13} style={{ color: "#1648C8" }} />
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{
              color: "#1648C8",
              background: "rgba(22,72,200,0.07)",
              padding: "2px 8px",
              borderRadius: "2px",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            {paper.department}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold leading-snug mb-2 line-clamp-2"
          style={{
            color: "#0F3499",
            fontSize: "0.97rem",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {paper.title}
        </h3>

        {/* Author */}
        <p
          className="text-xs font-semibold mb-3"
          style={{
            color: "#1648C8",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          {paper.author}
        </p>

        {/* Abstract */}
        <p
          className="text-sm font-body leading-relaxed line-clamp-3 flex-1 mb-4"
          style={{ color: "#666", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {paper.abstract}
        </p>

        {/* Read paper link */}
        <div
          className="flex items-center gap-1.5 pt-3"
          style={{ borderTop: "1px solid rgba(22,72,200,0.07)" }}
        >
          <span
            className="text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200"
            style={{
              color: hovered ? "#E8C42A" : "#1648C8",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Read Paper
            <ArrowRight
              size={12}
              className={`transition-transform duration-200 ${hovered ? "translate-x-1" : ""}`}
            />
          </span>
        </div>
      </div>
    </a>
  );
}

export function ResearchSection() {
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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid rgba(22,72,200,0.08)",
      }}
      data-ocid="research.section"
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
                Innovation
              </span>
            </div>
            <h2
              className="font-display text-3xl md:text-4xl font-bold"
              style={{
                color: "#0F3499",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Research at COEP
            </h2>
            <p
              className="font-body text-sm mt-2 max-w-md"
              style={{
                color: "#666",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Cutting-edge research from our faculty and students making an
              impact across disciplines
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.hash = "/research";
            }}
            className="hidden md:flex text-sm font-body items-center gap-1.5 transition-all duration-200 group"
            style={{
              color: "#1648C8",
              fontFamily: "'Source Sans 3', sans-serif",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#0F3499";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#1648C8";
            }}
            data-ocid="research.view_all_link"
          >
            View All Research
            <ExternalLink
              size={13}
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            />
          </button>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchPapers.map((paper, idx) => (
            <ResearchCard
              key={paper.id}
              paper={paper}
              visible={visible}
              delay={idx * 0.1 + 0.1}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => {
              window.location.hash = "/research";
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
            data-ocid="research.view_all_button"
          >
            View All Research
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
