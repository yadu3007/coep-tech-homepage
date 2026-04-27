import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  GraduationCap,
  LineChart,
  Mail,
  Phone,
  Settings2,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { UniversityTabsSection } from "../components/UniversityTabsSection";
import {
  DMS_STATS,
  FACULTY,
  type FacultyMember,
  MBA_BA_PHASES,
  MBA_GM_PHASES,
  PROGRAMS,
  type ProgramPhase,
  RECRUITERS,
} from "../data/dms";

// ─── Brand colours ─────────────────────────────────────────────────────────────
const C = {
  cobalt: "#1648C8",
  deepBlue: "#0F3499",
  midnight: "#081E5C",
  gold: "#E8C42A",
  white: "#ffffff",
  bodyText: "#374151",
  mutedText: "#6B7280",
} as const;

// ─── Scroll-triggered fade-in hook ────────────────────────────────────────────
function useScrollReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
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
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  const alignClass =
    align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <div className={`mb-14 flex flex-col ${alignClass}`}>
      <div
        className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}
      >
        <div className="h-px w-10" style={{ background: C.gold }} />
        <span
          className="font-body text-xs uppercase tracking-[0.28em] font-semibold"
          style={{ color: C.gold }}
        >
          {eyebrow}
        </span>
        <div className="h-px w-10" style={{ background: C.gold }} />
      </div>
      <h2
        className="font-display font-bold leading-tight"
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: light ? C.white : C.deepBlue,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="font-body mt-5 max-w-2xl leading-relaxed text-lg"
          style={{ color: light ? "rgba(255,255,255,0.68)" : C.mutedText }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const { ref: imgRef, visible: imgVisible } =
    useScrollReveal<HTMLImageElement>();
  const { ref: textRef, visible: textVisible } =
    useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" data-ocid="dms.about.section">
      {/* Hero Banner — 5.png with NO overlay, just a bottom gradient for text legibility */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: "520px", display: "flex", alignItems: "flex-end" }}
      >
        {/* Background image — no color overlay, no filter */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/dms-hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
          aria-hidden="true"
        />

        {/* ONLY a bottom gradient for text legibility — not a full image overlay */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "55%",
            background:
              "linear-gradient(to top, rgba(8,30,92,0.88) 0%, rgba(8,30,92,0.5) 55%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Gold top-accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: C.gold }}
          aria-hidden="true"
        />

        {/* Text content pinned to bottom */}
        <div className="container max-w-7xl mx-auto px-6 pb-14 pt-32 relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-xs font-body font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(232,196,42,0.18)",
              border: "1px solid rgba(232,196,42,0.5)",
              color: C.gold,
              borderRadius: "2px",
            }}
          >
            <Award size={12} />
            School of Multidisciplinary Sciences, Humanities &amp; Management
            Studies
          </div>
          <h1
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", color: C.white }}
          >
            Department of Management Studies
          </h1>
          <p
            className="font-body text-lg max-w-2xl"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Forging tomorrow's business leaders at one of India's most
            prestigious engineering universities — since 1854.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#programs"
              className="inline-flex items-center gap-2 px-7 py-3 font-body font-bold text-sm uppercase tracking-wider transition-all duration-200"
              style={{
                background: C.gold,
                color: C.midnight,
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
              data-ocid="dms.about.explore_button"
            >
              <GraduationCap size={16} />
              Explore Programs
            </a>
            <a
              href="#faculty"
              className="inline-flex items-center gap-2 px-7 py-3 font-body font-bold text-sm uppercase tracking-wider transition-all duration-200"
              style={{
                border: "1.5px solid rgba(255,255,255,0.5)",
                color: C.white,
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.1)";
                el.style.borderColor = C.white;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.borderColor = "rgba(255,255,255,0.5)";
              }}
              data-ocid="dms.about.faculty_button"
            >
              <Users size={16} />
              Meet Our Faculty
            </a>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="py-20 md:py-28" style={{ background: "#ffffff" }}>
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Faculty group image */}
            <div className="relative">
              {/* Decorative bracket */}
              <div
                className="absolute -top-5 -left-5 w-24 h-24 pointer-events-none"
                style={{
                  borderTop: `3px solid ${C.gold}`,
                  borderLeft: `3px solid ${C.gold}`,
                }}
                aria-hidden="true"
              />
              <img
                ref={imgRef}
                src="/assets/whatsapp_image_2026-04-24_at_12.42.38-019dbeee-5dc5-747d-a092-acb5add81b87.jpeg"
                alt="COEP DMS Faculty and Students"
                className="w-full object-cover"
                style={{
                  height: "440px",
                  borderRadius: "4px",
                  boxShadow: "0 24px 64px rgba(8,30,92,0.22)",
                  opacity: imgVisible ? 1 : 0,
                  transform: imgVisible
                    ? "scale(1) translateY(0)"
                    : "scale(0.96) translateY(20px)",
                  transition:
                    "opacity 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1)",
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=COEP+DMS&background=1648C8&color=E8C42A&size=400&bold=true";
                }}
                data-ocid="dms.about.faculty_image"
              />
              {/* Decorative bracket bottom-right */}
              <div
                className="absolute -bottom-5 -right-5 w-24 h-24 pointer-events-none"
                style={{
                  borderBottom: `3px solid ${C.gold}`,
                  borderRight: `3px solid ${C.gold}`,
                }}
                aria-hidden="true"
              />
            </div>

            {/* Text */}
            <div
              ref={textRef}
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.75s cubic-bezier(0.4,0,0.2,1) 0.15s, transform 0.75s cubic-bezier(0.4,0,0.2,1) 0.15s",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10" style={{ background: C.gold }} />
                <span
                  className="font-body text-xs uppercase tracking-[0.28em] font-semibold"
                  style={{ color: C.cobalt }}
                >
                  About Us
                </span>
              </div>
              <h2
                className="font-display font-bold leading-tight mb-6"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  color: C.deepBlue,
                }}
              >
                Shaping Managers Who Think Like Engineers
              </h2>
              <div
                className="font-body text-base leading-relaxed space-y-4"
                style={{ color: C.bodyText }}
              >
                <p>
                  The Department of Management Studies (DMS) at COEP
                  Technological University, Pune, is a distinguished centre of
                  management education that uniquely blends rigorous analytical
                  thinking with business acumen. Established within one of
                  Asia's oldest and most prestigious engineering institutions
                  (est. 1854), DMS offers a transformative MBA experience unlike
                  any other.
                </p>
                <p>
                  Our MBA programs — MBA (General Management) and MBA (Business
                  Analytics) — are designed for students who aspire to lead in
                  complex, technology-driven business environments. With a
                  curriculum crafted in close collaboration with industry,
                  students gain hands-on exposure through live projects, case
                  studies, industry immersions, and a structured internship
                  program.
                </p>
                <p>
                  Situated within COEP's vibrant campus along the banks of the
                  Mula river in Pune — India's emerging Silicon Valley — DMS
                  students benefit from an unparalleled ecosystem of innovation,
                  technology, and enterprise.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "AICTE Approved",
                  "University Grants Commission",
                  "NAAC Accredited",
                  "Pune, Maharashtra",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-body font-semibold uppercase tracking-wider px-4 py-2"
                    style={{
                      background: "rgba(22,72,200,0.06)",
                      border: "1px solid rgba(22,72,200,0.2)",
                      color: C.cobalt,
                      borderRadius: "2px",
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar — cobalt background */}
      <div style={{ background: C.cobalt }} className="py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0">
            {DMS_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center px-5 py-8 group transition-all duration-300"
                style={{
                  borderRight:
                    idx < DMS_STATS.length - 1
                      ? "1px solid rgba(255,255,255,0.15)"
                      : "none",
                }}
                data-ocid={`dms.stats.item.${idx + 1}`}
              >
                <span
                  className="font-display font-bold leading-none mb-2 group-hover:scale-110 transition-transform duration-300 inline-block"
                  style={{
                    fontSize: "clamp(2.2rem, 3.5vw, 2.9rem)",
                    color: C.gold,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-body font-bold text-[11px] uppercase tracking-[0.18em] mb-1"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  {stat.label}
                </span>
                <span
                  className="font-body text-[10px] leading-relaxed text-center hidden lg:block"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Program Structure Roadmap ────────────────────────────────────────────────
function RoadmapNode({
  phase,
  index,
  isLast,
  visible,
}: {
  phase: ProgramPhase;
  index: number;
  isLast: boolean;
  visible: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const delay = index * 0.14;

  // Alternating direction for premium effect
  const slideFrom = index % 2 === 0 ? "translateX(-30px)" : "translateX(30px)";

  const nodeColors: Record<number, { bg: string; text: string }> = {
    1: { bg: C.deepBlue, text: C.white },
    2: { bg: C.cobalt, text: C.white },
    3: { bg: C.midnight, text: C.white },
    4: { bg: C.gold, text: C.midnight },
  };
  const nc = nodeColors[phase.phase] ?? { bg: C.cobalt, text: C.white };

  return (
    <div
      className="flex flex-col md:flex-row items-stretch gap-0 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) translateY(0)"
          : `${slideFrom} translateY(20px)`,
        transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
      }}
      data-ocid={`dms.roadmap.item.${index + 1}`}
    >
      {/* Timeline column */}
      <div
        className="hidden md:flex flex-col items-center"
        style={{ width: "90px", flexShrink: 0 }}
      >
        <div
          className="w-0.5 flex-1"
          style={{
            background:
              index === 0
                ? "transparent"
                : `linear-gradient(to bottom, ${C.cobalt}, ${C.gold})`,
            minHeight: "28px",
          }}
        />
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-white text-base shrink-0 z-10 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: nc.bg,
            color: nc.text,
            boxShadow:
              "0 0 0 4px rgba(22,72,200,0.15), 0 4px 16px rgba(8,30,92,0.25)",
          }}
        >
          {phase.phase}
        </div>
        <div
          className="w-0.5 flex-1"
          style={{
            background: isLast
              ? "transparent"
              : `linear-gradient(to bottom, ${C.gold}, ${C.cobalt})`,
            minHeight: "28px",
          }}
        />
      </div>

      {/* Card */}
      <button
        type="button"
        className="flex-1 w-full mb-4 md:mb-6 md:my-4 cursor-pointer text-left"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {/* Mobile phase badge */}
        <div className="md:hidden flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
            style={{ background: nc.bg, color: nc.text }}
          >
            {phase.phase}
          </div>
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to right, ${C.cobalt}, transparent)`,
            }}
          />
        </div>

        <div
          className="overflow-hidden transition-all duration-300 group-hover:shadow-xl"
          style={{
            background: "#ffffff",
            borderLeft: `5px solid ${nc.bg}`,
            borderRadius: "0 4px 4px 0",
            boxShadow: expanded
              ? "0 16px 48px rgba(8,30,92,0.18), 0 0 0 1px rgba(22,72,200,0.1)"
              : "0 2px 12px rgba(8,30,92,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-7">
            <div className="flex-1">
              <span
                className="font-body text-xs uppercase tracking-[0.22em] font-bold block mb-2"
                style={{ color: nc.bg }}
              >
                {phase.semester}
              </span>
              <h3
                className="font-display font-bold text-xl md:text-2xl"
                style={{ color: C.deepBlue }}
              >
                {phase.title}
              </h3>
              <p
                className="font-body text-sm mt-1"
                style={{ color: C.mutedText }}
              >
                {phase.subtitle}
              </p>
            </div>
            <div
              className="w-9 h-9 flex items-center justify-center shrink-0 ml-4 transition-all duration-300"
              style={{
                background: expanded ? nc.bg : "rgba(22,72,200,0.06)",
                borderRadius: "50%",
              }}
            >
              <ChevronRight
                size={16}
                style={{
                  color: expanded ? C.white : C.cobalt,
                  transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Expanded subjects */}
          <div
            style={{
              maxHeight: expanded ? "600px" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div
              className="px-6 md:px-7 pb-7 border-t"
              style={{ borderColor: "rgba(22,72,200,0.08)" }}
            >
              <p
                className="font-body text-xs uppercase tracking-[0.18em] mt-5 mb-4 font-bold"
                style={{ color: nc.bg }}
              >
                Core Subjects
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {phase.subjects.map((sub, si) => (
                  <div
                    key={sub}
                    className="flex items-center gap-2.5 px-4 py-2.5 transition-all duration-200"
                    style={{
                      background: "rgba(22,72,200,0.03)",
                      borderLeft: `3px solid ${nc.bg}`,
                      opacity: expanded ? 1 : 0,
                      transform: expanded
                        ? "translateX(0)"
                        : "translateX(-8px)",
                      transition: `opacity 0.3s ease ${si * 0.04}s, transform 0.3s ease ${si * 0.04}s`,
                    }}
                  >
                    <span
                      className="font-body text-sm leading-relaxed"
                      style={{ color: C.bodyText }}
                    >
                      {sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function ProgramStructureSection() {
  const [activeProgram, setActiveProgram] = useState<"gm" | "ba">("gm");
  const [animating, setAnimating] = useState(false);
  const { ref: secRef, visible: secVisible } =
    useScrollReveal<HTMLDivElement>();

  const phases = activeProgram === "gm" ? MBA_GM_PHASES : MBA_BA_PHASES;

  const switchProgram = (prog: "gm" | "ba") => {
    if (prog === activeProgram) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveProgram(prog);
      setAnimating(false);
    }, 250);
  };

  return (
    <section
      id="curriculum"
      className="py-20 md:py-28"
      style={{ background: "#F4F7FF" }}
      data-ocid="dms.curriculum.section"
    >
      <div className="container max-w-5xl mx-auto px-6">
        <div className="text-center">
          <SectionHeader
            eyebrow="Academic Roadmap"
            title="Program Structure"
            subtitle="A meticulously designed 4-phase journey from business fundamentals to specialized expertise and dissertation."
          />
        </div>

        {/* Toggle tabs */}
        <div className="flex items-center justify-center mb-14">
          <div
            className="inline-flex p-1.5 gap-1.5"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(22,72,200,0.15)",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(8,30,92,0.1)",
            }}
          >
            {(["gm", "ba"] as const).map((prog) => (
              <button
                key={prog}
                type="button"
                onClick={() => switchProgram(prog)}
                className="px-7 py-3.5 font-body font-bold text-sm transition-all duration-300"
                style={{
                  background: activeProgram === prog ? C.cobalt : "transparent",
                  color: activeProgram === prog ? C.white : C.cobalt,
                  borderRadius: "5px",
                  boxShadow:
                    activeProgram === prog
                      ? "0 4px 12px rgba(22,72,200,0.35)"
                      : "none",
                }}
                data-ocid={`dms.curriculum.${prog}_tab`}
              >
                {prog === "gm"
                  ? "MBA — General Management"
                  : "MBA — Business Analytics"}
              </button>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div
          ref={secRef}
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {phases.map((phase, idx) => (
            <RoadmapNode
              key={`${activeProgram}-${phase.phase}`}
              phase={phase}
              index={idx}
              isLast={idx === phases.length - 1}
              visible={secVisible}
            />
          ))}
        </div>

        {/* Legend */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-6 py-4 px-6"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(22,72,200,0.12)",
            borderRadius: "4px",
          }}
        >
          {[
            { color: C.deepBlue, label: "Foundation" },
            { color: C.cobalt, label: "Core / Analytics" },
            { color: C.midnight, label: "Specialization / Applied" },
            { color: C.gold, label: "Dissertation / Capstone" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: color }}
              />
              <span
                className="font-body text-xs"
                style={{ color: C.mutedText }}
              >
                {label}
              </span>
            </div>
          ))}
          <span className="font-body text-xs italic" style={{ color: "#aaa" }}>
            Click any semester to expand subjects
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Faculty Carousel (3 cards visible, full width) ───────────────────────────
function FacultyCarousel() {
  const [active, setActive] = useState(0);
  const total = FACULTY.length;
  const { ref: secRef, visible: secVisible } =
    useScrollReveal<HTMLDivElement>();

  const prev = useCallback(
    () => setActive((a) => (a - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);

  const getPos = (idx: number) => {
    const diff = (idx - active + total) % total;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === total - 1) return "left";
    return "hidden";
  };

  const posStyle = (pos: string): CSSProperties => {
    switch (pos) {
      case "center":
        return {
          transform: "scale(1)",
          opacity: 1,
          zIndex: 20,
          left: "33.333%",
          filter: "none",
        };
      case "left":
        return {
          transform: "scale(0.91)",
          opacity: 0.75,
          zIndex: 10,
          left: "0%",
          filter: "brightness(0.85)",
        };
      case "right":
        return {
          transform: "scale(0.91)",
          opacity: 0.75,
          zIndex: 10,
          left: "66.666%",
          filter: "brightness(0.85)",
        };
      default:
        return {
          transform: "scale(0.6)",
          opacity: 0,
          zIndex: 0,
          pointerEvents: "none",
          left: "33.333%",
        };
    }
  };

  const typeColors = (type: FacultyMember["type"]) => {
    switch (type) {
      case "head":
        return { bg: C.deepBlue, text: C.white };
      case "professor":
        return { bg: C.cobalt, text: C.white };
      default:
        return { bg: "#e5e7eb", text: C.deepBlue };
    }
  };

  const f = FACULTY[active];

  return (
    <section
      id="faculty"
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "#F4F7FF" }}
      data-ocid="dms.faculty_carousel.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={secRef}
          style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <SectionHeader
            eyebrow="Meet the Team"
            title="Our Faculty"
            subtitle="Experienced academicians and industry practitioners shaping the next generation of business leaders."
          />
        </div>

        {/* Desktop carousel — 3 visible cards spanning full width */}
        <div
          className="hidden md:block relative w-full"
          style={{ height: "500px" }}
          aria-label="Faculty carousel"
        >
          {FACULTY.map((member, idx) => {
            const pos = getPos(idx);
            const isCenter = pos === "center";
            const tc = typeColors(member.type);
            return (
              <div
                key={member.id}
                className="absolute top-0 bottom-0"
                style={{
                  width: "33.333%",
                  padding: "8px",
                  transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                  transformOrigin: "center center",
                  ...posStyle(pos),
                }}
              >
                <button
                  type="button"
                  onClick={() => !isCenter && setActive(idx)}
                  className="w-full h-full text-left flex flex-col overflow-hidden"
                  style={{
                    background: "#ffffff",
                    borderTop: isCenter
                      ? `5px solid ${C.gold}`
                      : "3px solid rgba(22,72,200,0.2)",
                    borderRadius: "4px",
                    boxShadow: isCenter
                      ? "0 28px 72px rgba(8,30,92,0.28), 0 4px 16px rgba(22,72,200,0.15)"
                      : "0 4px 16px rgba(8,30,92,0.12)",
                    cursor: isCenter ? "default" : "pointer",
                  }}
                  aria-pressed={isCenter}
                  data-ocid={`dms.faculty_carousel.item.${idx + 1}`}
                >
                  {/* Top cobalt accent band */}
                  <div
                    style={{
                      height: "3px",
                      background: isCenter
                        ? `linear-gradient(90deg, ${C.cobalt}, ${C.gold})`
                        : `linear-gradient(90deg, ${C.cobalt}44, transparent)`,
                    }}
                  />
                  <div className="p-6 flex items-start gap-4">
                    <div className="shrink-0 relative">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-18 h-18 object-cover"
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "4px",
                          border: isCenter
                            ? `2px solid ${C.gold}`
                            : "2px solid rgba(22,72,200,0.15)",
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-display font-bold text-base leading-tight mb-1 truncate"
                        style={{ color: C.deepBlue }}
                      >
                        {member.name}
                      </h3>
                      <span
                        className="inline-block text-[10px] font-body font-bold uppercase tracking-wider px-2.5 py-1 mb-2"
                        style={{
                          background: tc.bg,
                          color: tc.text,
                          borderRadius: "2px",
                        }}
                      >
                        {member.designation}
                      </span>
                      <p
                        className="font-body text-xs leading-relaxed line-clamp-2"
                        style={{ color: C.mutedText }}
                      >
                        {member.specialization}
                      </p>
                    </div>
                  </div>

                  {isCenter && (
                    <div
                      className="px-6 pb-6 flex-1 flex flex-col border-t"
                      style={{ borderColor: "rgba(22,72,200,0.07)" }}
                    >
                      <p
                        className="font-body text-xs leading-relaxed mt-4 mb-4 line-clamp-3 flex-1"
                        style={{ color: "#555" }}
                      >
                        {member.bio}
                      </p>
                      <div className="space-y-1.5">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-xs font-body transition-colors"
                            style={{ color: C.cobalt }}
                          >
                            <Mail size={11} style={{ color: C.gold }} />
                            {member.email}
                          </a>
                        )}
                        {member.phone && (
                          <div
                            className="flex items-center gap-2 text-xs font-body"
                            style={{ color: C.mutedText }}
                          >
                            <Phone size={11} style={{ color: C.gold }} />
                            {member.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile single card */}
        <div className="md:hidden mb-6">
          <div
            className="p-6 text-center"
            style={{
              background: "#ffffff",
              borderTop: `5px solid ${C.gold}`,
              borderRadius: "4px",
              boxShadow: "0 8px 32px rgba(8,30,92,0.15)",
            }}
          >
            <img
              src={f.photo}
              alt={f.name}
              className="w-20 h-20 object-cover mx-auto mb-4"
              style={{ borderRadius: "4px", border: `2px solid ${C.gold}` }}
            />
            <h3
              className="font-display font-bold text-lg mb-1"
              style={{ color: C.deepBlue }}
            >
              {f.name}
            </h3>
            <span
              className="inline-block text-[10px] font-body font-bold uppercase tracking-wider px-2.5 py-1 mb-3"
              style={{
                background: C.cobalt,
                color: C.white,
                borderRadius: "2px",
              }}
            >
              {f.designation}
            </span>
            <p
              className="font-body text-sm leading-relaxed mb-3"
              style={{ color: C.mutedText }}
            >
              {f.specialization}
            </p>
            {f.email && (
              <a
                href={`mailto:${f.email}`}
                className="text-xs font-body block"
                style={{ color: C.cobalt }}
              >
                <Mail
                  size={11}
                  className="inline mr-1"
                  style={{ color: C.gold }}
                />
                {f.email}
              </a>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            type="button"
            onClick={prev}
            className="w-11 h-11 flex items-center justify-center transition-all duration-200"
            style={{
              background: "#ffffff",
              border: "1.5px solid rgba(22,72,200,0.25)",
              borderRadius: "50%",
              color: C.cobalt,
              boxShadow: "0 2px 8px rgba(8,30,92,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                C.cobalt;
              (e.currentTarget as HTMLButtonElement).style.color = C.white;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.color = C.cobalt;
            }}
            aria-label="Previous faculty"
            data-ocid="dms.faculty_carousel.prev_button"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {FACULTY.map((member, idx) => (
              <button
                type="button"
                key={member.id}
                onClick={() => setActive(idx)}
                className="transition-all duration-300"
                style={{
                  width: idx === active ? "28px" : "6px",
                  height: "6px",
                  background: idx === active ? C.cobalt : "rgba(22,72,200,0.2)",
                  borderRadius: "3px",
                }}
                aria-label={`Go to faculty ${idx + 1}`}
                data-ocid={`dms.faculty_carousel.dot.${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="w-11 h-11 flex items-center justify-center transition-all duration-200"
            style={{
              background: "#ffffff",
              border: "1.5px solid rgba(22,72,200,0.25)",
              borderRadius: "50%",
              color: C.cobalt,
              boxShadow: "0 2px 8px rgba(8,30,92,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                C.cobalt;
              (e.currentTarget as HTMLButtonElement).style.color = C.white;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.color = C.cobalt;
            }}
            aria-label="Next faculty"
            data-ocid="dms.faculty_carousel.next_button"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* View All Button — gold primary */}
        <div className="flex justify-center mt-10">
          <a
            href="#/dms/faculty"
            className="inline-flex items-center gap-2 px-9 py-3.5 font-body font-bold text-sm uppercase tracking-wider transition-all duration-200"
            style={{
              background: C.gold,
              color: C.midnight,
              borderRadius: "2px",
              boxShadow: "0 4px 16px rgba(232,196,42,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
            }}
            data-ocid="dms.faculty_carousel.view_all_button"
          >
            <ExternalLink size={14} />
            View All Faculty
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Our Programs Section — Premium Redesign ──────────────────────────────────
const PROGRAM_ICONS: Record<string, React.ReactNode> = {
  finance: <LineChart size={32} strokeWidth={1.5} />,
  operations: <Settings2 size={32} strokeWidth={1.5} />,
  marketing: <TrendingUp size={32} strokeWidth={1.5} />,
  hr: <Users size={32} strokeWidth={1.5} />,
  analytics: <Zap size={32} strokeWidth={1.5} />,
};

function OurProgramsSection() {
  const [activeTab, setActiveTab] = useState("finance");
  const [animating, setAnimating] = useState(false);
  const { ref: secRef, visible: secVisible } =
    useScrollReveal<HTMLDivElement>();
  const program = PROGRAMS.find((p) => p.id === activeTab) ?? PROGRAMS[0];
  const programIndex = PROGRAMS.findIndex((p) => p.id === activeTab);

  const switchTab = (id: string) => {
    if (id === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(id);
      setAnimating(false);
    }, 220);
  };

  return (
    <section
      id="programs"
      className="py-20 md:py-28"
      style={{ background: "#ffffff" }}
      data-ocid="dms.programs.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={secRef}
          style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <SectionHeader
            eyebrow="Specializations"
            title="Our Programs"
            subtitle="Five specialized tracks designed for the demands of modern business leadership."
          />
        </div>

        {/* Elegant horizontal pill navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {PROGRAMS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => switchTab(p.id)}
              className="flex items-center gap-2.5 px-6 py-3 font-body font-semibold text-sm transition-all duration-300"
              style={{
                background: activeTab === p.id ? C.cobalt : "#ffffff",
                color: activeTab === p.id ? C.white : C.cobalt,
                border: `1.5px solid ${activeTab === p.id ? C.cobalt : "rgba(22,72,200,0.3)"}`,
                borderRadius: "100px",
                boxShadow:
                  activeTab === p.id
                    ? "0 4px 16px rgba(22,72,200,0.3)"
                    : "0 1px 4px rgba(8,30,92,0.06)",
                transform:
                  activeTab === p.id ? "translateY(-2px)" : "translateY(0)",
                opacity: secVisible ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.3s ease, background 0.3s ease, color 0.3s ease`,
              }}
              data-ocid={`dms.programs.${p.id}_tab`}
            >
              <span style={{ color: activeTab === p.id ? C.gold : C.cobalt }}>
                {PROGRAM_ICONS[p.id]?.toString().includes("size") ? null : (
                  <span className="text-sm">{p.icon}</span>
                )}
              </span>
              {p.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(16px)" : "translateY(0)",
            transition:
              "opacity 0.22s cubic-bezier(0.4,0,0.2,1), transform 0.22s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {/* Main panel */}
          <div
            className="relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 50%, ${C.cobalt} 100%)`,
              borderRadius: "8px",
              boxShadow: "0 20px 60px rgba(8,30,92,0.25)",
            }}
          >
            {/* Subtle geometric background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 20%, rgba(232,196,42,0.07) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(22,72,200,0.15) 0%, transparent 50%)",
              }}
              aria-hidden="true"
            />

            {/* Large decorative number */}
            <div
              className="absolute right-10 top-1/2 -translate-y-1/2 font-display font-bold pointer-events-none select-none"
              style={{
                fontSize: "clamp(6rem, 12vw, 11rem)",
                color: "rgba(232,196,42,0.05)",
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              {String(programIndex + 1).padStart(2, "0")}
            </div>

            {/* Gold accent top bar */}
            <div
              style={{
                height: "4px",
                background: `linear-gradient(90deg, ${C.gold}, rgba(232,196,42,0.4), transparent)`,
              }}
            />

            <div className="relative z-10 p-10 md:p-14">
              <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
                {/* Icon */}
                <div className="shrink-0">
                  <div
                    className="w-20 h-20 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105"
                    style={{
                      background: "rgba(232,196,42,0.12)",
                      border: "2px solid rgba(232,196,42,0.3)",
                      borderRadius: "8px",
                      color: C.gold,
                    }}
                  >
                    {PROGRAM_ICONS[activeTab]}
                  </div>
                  <div
                    style={{ height: "2px", width: "40px", background: C.gold }}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles size={14} style={{ color: C.gold }} />
                    <span
                      className="font-body text-xs uppercase tracking-[0.2em] font-semibold"
                      style={{ color: "rgba(232,196,42,0.8)" }}
                    >
                      MBA Specialization
                    </span>
                  </div>
                  <h3
                    className="font-display font-bold leading-tight mb-5"
                    style={{
                      fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                      color: C.white,
                    }}
                  >
                    {program.label}
                  </h3>
                  <p
                    className="font-body text-base leading-relaxed mb-8 max-w-2xl"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    {program.description}
                  </p>

                  {/* Key Courses */}
                  <div>
                    <p
                      className="font-body text-[11px] uppercase tracking-[0.22em] mb-4 font-bold"
                      style={{ color: "rgba(232,196,42,0.7)" }}
                    >
                      Key Courses
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {program.keyCourses.map((course) => (
                        <span
                          key={course}
                          className="font-body text-sm px-4 py-2 transition-all duration-200"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "rgba(255,255,255,0.88)",
                            borderRadius: "100px",
                          }}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom two panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Learning Outcomes */}
            <div
              className="p-8"
              style={{
                background: "#F4F7FF",
                border: "1px solid rgba(22,72,200,0.12)",
                borderLeft: `5px solid ${C.cobalt}`,
                borderRadius: "0 8px 8px 0",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 flex items-center justify-center"
                  style={{
                    background: C.cobalt,
                    borderRadius: "8px",
                    color: C.white,
                  }}
                >
                  <BookOpen size={16} />
                </div>
                <h4
                  className="font-display font-bold text-lg"
                  style={{ color: C.deepBlue }}
                >
                  Learning Outcomes
                </h4>
              </div>
              <ol className="space-y-4">
                {program.learningOutcomes.map((outcome, idx) => (
                  <li key={outcome} className="flex items-start gap-4">
                    <div
                      className="w-7 h-7 flex items-center justify-center shrink-0 font-body font-bold text-xs"
                      style={{
                        background: C.cobalt,
                        color: C.white,
                        borderRadius: "50%",
                      }}
                    >
                      {idx + 1}
                    </div>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: C.bodyText }}
                    >
                      {outcome}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Career Paths */}
            <div
              className="p-8"
              style={{
                background: "#F4F7FF",
                border: "1px solid rgba(22,72,200,0.12)",
                borderLeft: `5px solid ${C.deepBlue}`,
                borderRadius: "0 8px 8px 0",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 flex items-center justify-center"
                  style={{
                    background: C.deepBlue,
                    borderRadius: "8px",
                    color: C.white,
                  }}
                >
                  <Briefcase size={16} />
                </div>
                <h4
                  className="font-display font-bold text-lg"
                  style={{ color: C.deepBlue }}
                >
                  Career Paths
                </h4>
              </div>
              <div className="space-y-3">
                {program.careerPaths.map((role, idx) => (
                  <div
                    key={role}
                    className="flex items-center gap-4 px-4 py-3 group transition-all duration-200"
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(22,72,200,0.1)",
                      borderRadius: "4px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        C.cobalt;
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        "rgba(22,72,200,0.1)";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateX(0)";
                    }}
                  >
                    <span
                      className="font-body font-bold text-xs w-6 h-6 flex items-center justify-center shrink-0"
                      style={{
                        background: idx % 2 === 0 ? C.cobalt : C.deepBlue,
                        color: C.white,
                        borderRadius: "50%",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className="font-body text-sm font-medium"
                      style={{ color: C.bodyText }}
                    >
                      {role}
                    </span>
                    <div
                      className="ml-auto"
                      style={{
                        width: "6px",
                        height: "6px",
                        background: C.gold,
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Academic Resources Section ──────────────────────────────────────────────

interface AcademicDoc {
  title: string;
  description: string;
  file: string | null;
}

const ACADEMIC_RESOURCES: Record<string, AcademicDoc[]> = {
  timetable: [
    {
      title: "MBA Semester 1 Timetable",
      description: "Class schedule for first semester",
      file: null,
    },
    {
      title: "MBA Semester 2 Timetable",
      description: "Class schedule for second semester",
      file: null,
    },
    {
      title: "MBA-BA Semester 1 Timetable",
      description: "Business Analytics program schedule",
      file: null,
    },
  ],
  exam: [
    {
      title: "Mid-term Examination Schedule 2024-25",
      description: "Schedule for mid-semester examinations",
      file: null,
    },
    {
      title: "End-term Examination Schedule 2024-25",
      description: "Schedule for end-semester examinations",
      file: null,
    },
  ],
  curriculum: [
    {
      title: "MBA General Management Curriculum",
      description: "Complete course structure and syllabus",
      file: null,
    },
    {
      title: "MBA Business Analytics Curriculum",
      description: "Complete BA program syllabus",
      file: null,
    },
    {
      title: "Elective Course List 2024-25",
      description: "Available elective courses for all semesters",
      file: null,
    },
  ],
};

const RESOURCE_TABS = [
  { id: "timetable", label: "Timetable", icon: <Calendar size={18} /> },
  { id: "exam", label: "Exam Schedule", icon: <Clock size={18} /> },
  { id: "curriculum", label: "Curriculum", icon: <BookOpen size={18} /> },
];

function AcademicResourcesSection() {
  const [activeTab, setActiveTab] = useState("timetable");
  const { ref: secRef, visible: secVisible } =
    useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="academic-resources"
      className="py-20 md:py-28"
      style={{ background: "#f8faff" }}
      data-ocid="dms.academic_resources.section"
    >
      <div className="container max-w-5xl mx-auto px-6">
        <div
          ref={secRef}
          style={{
            opacity: secVisible ? 1 : 0,
            transform: secVisible ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <SectionHeader
            eyebrow="Department Resources"
            title="Academic Resources"
            subtitle="Access timetables, exam schedules, and curriculum documents"
          />
        </div>

        {/* Tab buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          {RESOURCE_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 font-body font-semibold text-sm transition-all duration-300"
                style={{
                  background: isActive ? C.cobalt : "#ffffff",
                  color: isActive ? C.white : C.cobalt,
                  border: `1.5px solid ${isActive ? C.cobalt : "rgba(22,72,200,0.35)"}`,
                  borderRadius: "6px",
                  boxShadow: isActive
                    ? "0 4px 18px rgba(22,72,200,0.28)"
                    : "0 1px 4px rgba(8,30,92,0.06)",
                  transform: isActive ? "translateY(-2px)" : "translateY(0)",
                }}
                data-ocid={`dms.academic_resources.${tab.id}_tab`}
              >
                <span style={{ color: isActive ? C.gold : C.cobalt }}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Document cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {ACADEMIC_RESOURCES[activeTab].map((doc, idx) => (
            <div
              key={doc.title}
              className="group flex flex-col p-6 transition-all duration-300"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(22,72,200,0.12)",
                borderTop: `3px solid ${C.cobalt}`,
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(8,30,92,0.06)",
                opacity: secVisible ? 1 : 0,
                transform: secVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s ease ${idx * 0.1}s, box-shadow 0.3s ease`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 10px 32px rgba(22,72,200,0.14)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 2px 10px rgba(8,30,92,0.06)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
              }}
              data-ocid={`dms.academic_resources.doc.${idx + 1}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-11 h-11 flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(22,72,200,0.07)",
                    borderRadius: "8px",
                    color: C.cobalt,
                  }}
                >
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="font-display font-bold text-base leading-tight mb-1"
                    style={{ color: C.deepBlue }}
                  >
                    {doc.title}
                  </h4>
                  <p
                    className="font-body text-xs leading-relaxed"
                    style={{ color: C.mutedText }}
                  >
                    {doc.description}
                  </p>
                </div>
              </div>

              <div
                className="mt-auto pt-4"
                style={{ borderTop: "1px solid rgba(22,72,200,0.08)" }}
              >
                {doc.file ? (
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 font-body font-semibold text-xs uppercase tracking-wider transition-all duration-200"
                    style={{
                      background: C.cobalt,
                      color: C.white,
                      borderRadius: "3px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.opacity =
                        "0.88";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.opacity =
                        "1";
                    }}
                    data-ocid={`dms.academic_resources.view_pdf.${idx + 1}`}
                  >
                    <ExternalLink size={12} />
                    View PDF
                  </a>
                ) : (
                  <div className="relative inline-block group/tooltip">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-2 px-5 py-2.5 font-body font-semibold text-xs uppercase tracking-wider cursor-not-allowed"
                      style={{
                        background: "rgba(22,72,200,0.08)",
                        color: "rgba(22,72,200,0.4)",
                        border: "1px solid rgba(22,72,200,0.15)",
                        borderRadius: "3px",
                      }}
                      aria-label="PDF not yet uploaded"
                      data-ocid={`dms.academic_resources.view_pdf_disabled.${idx + 1}`}
                    >
                      <FileText size={12} />
                      View PDF
                    </button>
                    <div
                      className="absolute bottom-full left-0 mb-2 px-3 py-1.5 font-body text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 z-10"
                      style={{
                        background: C.midnight,
                        color: C.white,
                        borderRadius: "3px",
                      }}
                    >
                      PDF not yet uploaded
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <p
          className="font-body text-xs text-center"
          style={{ color: C.mutedText }}
          data-ocid="dms.academic_resources.note"
        >
          📋 Documents are uploaded by the department. Contact the department
          for the latest versions.
        </p>
      </div>
    </section>
  );
}

// ─── Our Recruiters Section — white background ────────────────────────────────

function getLogoUrl(name: string): string {
  const domainMap: Record<string, string> = {
    TCS: "tcs.com",
    KPMG: "kpmg.com",
    LIC: "licindia.in",
    "HDFC Life": "hdfclife.com",
    "TATA Projects": "tataprojects.com",
    "Anand Rathi": "anandrathi.com",
  };
  const domain = domainMap[name];
  if (domain) return `https://logo.clearbit.com/${domain}`;
  return "";
}

function RecruiterCard({
  r,
  idx,
  visible,
}: {
  r: { name: string; sector: string };
  idx: number;
  visible: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const logoUrl = getLogoUrl(r.name);
  const initials = r.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="flex flex-col items-center justify-center text-center p-5 transition-all duration-300"
      style={{
        background: "#ffffff",
        border: "1.5px solid rgba(22,72,200,0.18)",
        minHeight: "110px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(8,30,92,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "scale(1) translateY(0)"
          : "scale(0.9) translateY(12px)",
        transition: `opacity 0.45s cubic-bezier(0.4,0,0.2,1) ${0.04 * idx}s, transform 0.45s cubic-bezier(0.4,0,0.2,1) ${0.04 * idx}s`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-5px) scale(1.07)";
        el.style.boxShadow = "0 14px 38px rgba(22,72,200,0.2)";
        el.style.borderColor = C.cobalt;
        el.style.transition = "all 0.3s ease";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0) scale(1)";
        el.style.boxShadow = "0 2px 10px rgba(8,30,92,0.06)";
        el.style.borderColor = "rgba(22,72,200,0.18)";
        el.style.transition = "all 0.3s ease";
      }}
      data-ocid={`dms.recruiters.card.${idx + 1}`}
    >
      {/* Logo or initials avatar */}
      <div
        className="mb-2.5 flex items-center justify-center"
        style={{ height: "42px" }}
      >
        {logoUrl && !imgFailed ? (
          <img
            src={logoUrl}
            alt={r.name}
            className="max-h-10 max-w-[80px] object-contain"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className="w-10 h-10 flex items-center justify-center font-display font-bold text-sm"
            style={{
              background: `linear-gradient(135deg, ${C.cobalt}, ${C.deepBlue})`,
              color: C.white,
              borderRadius: "8px",
            }}
          >
            {initials}
          </div>
        )}
      </div>
      <span
        className="font-display font-bold text-sm leading-tight mb-1 block"
        style={{ color: C.deepBlue }}
      >
        {r.name}
      </span>
      <span
        className="font-body text-[10px] uppercase tracking-wider block"
        style={{ color: C.mutedText }}
      >
        {r.sector}
      </span>
    </div>
  );
}

function OurRecruitersSection() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="recruiters"
      className="py-20 md:py-24"
      style={{
        background: "#ffffff",
        borderTop: `4px solid ${C.cobalt}`,
      }}
      data-ocid="dms.recruiters.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-14" style={{ background: C.gold }} />
            <span
              className="font-body text-xs uppercase tracking-[0.28em] font-semibold"
              style={{ color: C.cobalt }}
            >
              Hiring Partners
            </span>
            <div className="h-px w-14" style={{ background: C.gold }} />
          </div>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              color: C.deepBlue,
              letterSpacing: "-0.02em",
            }}
          >
            Our Recruiters
          </h2>
          <p
            className="font-body text-base mt-3 max-w-xl mx-auto"
            style={{ color: C.mutedText }}
          >
            Leading organizations from across industries trust COEP DMS for top
            management talent.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {RECRUITERS.map((r, idx) => (
            <RecruiterCard key={r.name} r={r} idx={idx} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlacementsSection() {
  const { ref: statsRef, visible: statsVisible } =
    useScrollReveal<HTMLDivElement>();

  const stats = [
    {
      value: "90",
      suffix: "%",
      label: "Placement Rate",
      icon: <TrendingUp size={22} />,
    },
    {
      value: "50",
      suffix: "+",
      label: "Recruiting Companies",
      icon: <Building2 size={22} />,
    },
    {
      value: "8.5",
      suffix: " LPA",
      label: "Average Package",
      icon: <BarChart3 size={22} />,
    },
    {
      value: "15",
      suffix: "+ LPA",
      label: "Highest Package",
      icon: <Briefcase size={22} />,
    },
  ];

  return (
    <section
      id="placements"
      className="py-20 md:py-28"
      style={{ background: C.cobalt }}
      data-ocid="dms.placements.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Career Outcomes"
          title="Placements & Internships"
          subtitle="Our students are placed at leading organizations across industries — from technology and finance to consulting and manufacturing."
          light
        />

        {/* Stats grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center p-7 group transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "8px",
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${idx * 0.12}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${idx * 0.12}s`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
              }}
            >
              <div
                className="mb-3 opacity-80"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {s.icon}
              </div>
              <div
                className="font-display font-bold mb-1.5 leading-none"
                style={{ fontSize: "2.5rem", color: C.gold }}
              >
                {s.value}
                {s.suffix}
              </div>
              <div
                className="font-body text-xs uppercase tracking-[0.16em]"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div
            className="inline-block p-px"
            style={{
              background: `linear-gradient(135deg, ${C.gold}, rgba(232,196,42,0.4))`,
              borderRadius: "6px",
            }}
          >
            <div
              className="px-12 py-10 text-center"
              style={{ background: C.midnight, borderRadius: "5px" }}
            >
              <p
                className="font-body text-xs uppercase tracking-[0.22em] mb-2"
                style={{ color: C.gold }}
              >
                Download Brochure
              </p>
              <p
                className="font-display font-bold text-2xl mb-6"
                style={{ color: C.white }}
              >
                Explore MBA Placements in Detail
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://www.coeptech.ac.in/academics/schools/school-of-multidisciplinary-sciences-humanities-and-management-studies/department-of-management-studies/internships-and-placements/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-bold text-sm uppercase tracking-wider transition-all duration-200"
                  style={{
                    background: C.gold,
                    color: C.midnight,
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity =
                      "0.88";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                  }}
                  data-ocid="dms.placements.view_more_button"
                >
                  <ExternalLink size={14} />
                  View Placement Details
                </a>
                <a
                  href="mailto:hod.management@coeptech.ac.in"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-bold text-sm uppercase tracking-wider transition-all duration-200"
                  style={{
                    border: "1.5px solid rgba(255,255,255,0.35)",
                    color: C.white,
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(255,255,255,0.1)";
                    el.style.borderColor = "rgba(255,255,255,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "transparent";
                    el.style.borderColor = "rgba(255,255,255,0.35)";
                  }}
                  data-ocid="dms.placements.contact_button"
                >
                  <Mail size={14} />
                  Contact Placement Cell
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Admissions CTA ───────────────────────────────────────────────────────────
function AdmissionsCTA() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      className="py-16"
      style={{ background: C.midnight, borderTop: `3px solid ${C.gold}` }}
      data-ocid="dms.admissions_cta.section"
    >
      <div
        ref={ref}
        className="container max-w-4xl mx-auto px-6 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition:
            "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <p
          className="font-body text-xs uppercase tracking-[0.28em] mb-4"
          style={{ color: C.gold }}
        >
          Admissions Open
        </p>
        <h2
          className="font-display font-bold text-3xl md:text-4xl mb-4"
          style={{ color: C.white }}
        >
          Ready to Lead the Future?
        </h2>
        <p
          className="font-body text-base mb-8 max-w-md mx-auto"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Apply via MAH-MBA-CET / CAT / CMAT / GMAT. 60 seats per program. AY
          2025–26 admissions are open.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://www.coeptech.ac.in/admissions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-9 py-3.5 font-body font-bold text-sm uppercase tracking-wider transition-all duration-200"
            style={{
              background: C.gold,
              color: C.midnight,
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
            data-ocid="dms.admissions_cta.apply_button"
          >
            Apply Now
          </a>
          <a
            href="mailto:hod.management@coeptech.ac.in"
            className="inline-flex items-center justify-center gap-2 px-9 py-3.5 font-body font-bold text-sm uppercase tracking-wider transition-all duration-200"
            style={{
              border: "1.5px solid rgba(255,255,255,0.35)",
              color: C.white,
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(255,255,255,0.08)";
              el.style.borderColor = "rgba(255,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(255,255,255,0.35)";
            }}
            data-ocid="dms.admissions_cta.contact_button"
          >
            <Mail size={14} />
            Contact DMS
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── DMS Page ─────────────────────────────────────────────────────────────────
export function DMSPage() {
  useEffect(() => {
    document.title = "Department of Management Studies | COEP Tech";
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Header />
      <main>
        <UniversityTabsSection />
        <AboutSection />
        <ProgramStructureSection />
        <AcademicResourcesSection />
        <FacultyCarousel />
        <OurProgramsSection />
        <PlacementsSection />
        <OurRecruitersSection />
        <AdmissionsCTA />
      </main>
      <Footer />
    </Layout>
  );
}
