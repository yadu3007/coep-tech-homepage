import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { UniversityTabsSection } from "../components/UniversityTabsSection";

// ─── Brand colours ──────────────────────────────────────────────────────────────
const C = {
  cobalt: "#1648C8",
  deepBlue: "#0F3499",
  midnight: "#081E5C",
  gold: "#E8C42A",
  white: "#ffffff",
  body: "#374151",
  muted: "#6B7280",
  bg: "#F8F9FC",
} as const;

// ─── Scroll reveal hook ─────────────────────────────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

// ─── Count-up hook ──────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1600, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor((1 - (1 - p) ** 3) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// ─── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  suffix = "",
  active,
}: { value: number; label: string; suffix?: string; active: boolean }) {
  const n = useCountUp(value, 1600, active);
  return (
    <div className="text-center">
      <div
        style={{
          fontFamily: "Playfair Display, Georgia, serif",
          fontSize: "clamp(2.5rem,5vw,3.5rem)",
          fontWeight: 800,
          color: C.gold,
          lineHeight: 1,
        }}
      >
        {n.toLocaleString()}
        {suffix}
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
          marginTop: "0.5rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Interactive Calendar ───────────────────────────────────────────────────────
const CALENDAR_EVENTS: Record<
  string,
  { label: string; type: "class" | "exam" | "holiday" | "event" }[]
> = {
  "2025-07-01": [{ label: "Semester Begin", type: "class" }],
  "2025-07-15": [{ label: "Workshop: ML Basics", type: "event" }],
  "2025-08-15": [{ label: "Independence Day", type: "holiday" }],
  "2025-08-20": [{ label: "Mid-sem Exams Start", type: "exam" }],
  "2025-08-25": [{ label: "Mid-sem Exams End", type: "exam" }],
  "2025-09-05": [{ label: "Teacher's Day Events", type: "event" }],
  "2025-10-02": [{ label: "Gandhi Jayanti", type: "holiday" }],
  "2025-10-15": [{ label: "Mindspark 2025 Begins", type: "event" }],
  "2025-10-17": [{ label: "Mindspark 2025 Ends", type: "event" }],
  "2025-11-01": [{ label: "End-sem Prep Week", type: "class" }],
  "2025-11-10": [{ label: "End-sem Exams Start", type: "exam" }],
  "2025-11-25": [{ label: "End-sem Exams End", type: "exam" }],
  "2025-12-01": [{ label: "Semester Break", type: "holiday" }],
};
const EVENT_COLORS = {
  class: C.cobalt,
  exam: "#DC2626",
  holiday: "#16A34A",
  event: C.gold,
} as const;
const EVENT_LABELS = {
  class: "Classes",
  exam: "Exams",
  holiday: "Holidays",
  event: "Events",
} as const;

function AcademicCalendar() {
  const [curDate, setCurDate] = useState(new Date(2025, 6, 1));
  const year = curDate.getFullYear();
  const month = curDate.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "1rem",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(22,72,200,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: C.deepBlue,
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          onClick={() => setCurDate(new Date(year, month - 1, 1))}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            color: "#fff",
            width: 32,
            height: 32,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>
        <span
          style={{
            fontFamily: "Playfair Display,Georgia,serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {monthNames[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setCurDate(new Date(year, month + 1, 1))}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            color: "#fff",
            width: 32,
            height: 32,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ›
        </button>
      </div>
      {/* Day headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          background: "#F8F9FC",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            style={{
              padding: "0.5rem",
              textAlign: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {d}
          </div>
        ))}
      </div>
      {/* Cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
        {cells.map((day, i) => {
          const key = day
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            : "";
          const evts = key ? (CALENDAR_EVENTS[key] ?? []) : [];
          return (
            <div
              key={key || `empty-${String(i)}`}
              style={{
                minHeight: 64,
                padding: "0.35rem 0.4rem",
                borderRight: "1px solid #F3F4F6",
                borderBottom: "1px solid #F3F4F6",
                background: day ? "#fff" : "#F8F9FC",
              }}
            >
              {day && (
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: evts.length ? C.deepBlue : C.body,
                    marginBottom: "0.2rem",
                  }}
                >
                  {day}
                </div>
              )}
              {evts.map((e) => (
                <div
                  key={e.label}
                  style={{
                    fontSize: "0.62rem",
                    background: EVENT_COLORS[e.type],
                    color: e.type === "event" ? C.midnight : "#fff",
                    borderRadius: "3px",
                    padding: "1px 4px",
                    marginBottom: "2px",
                    lineHeight: 1.4,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {e.label}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div
        style={{
          padding: "0.75rem 1.5rem",
          background: "#F8F9FC",
          borderTop: "1px solid #E5E7EB",
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {(Object.keys(EVENT_LABELS) as (keyof typeof EVENT_LABELS)[]).map(
          (k) => (
            <div
              key={k}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                color: C.body,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: EVENT_COLORS[k],
                  display: "inline-block",
                }}
              />
              {EVENT_LABELS[k]}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

// ─── Sub-Nav ────────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "facilities", label: "Facilities" },
  { id: "academic-support", label: "Academic Support" },
  { id: "student-development", label: "Student Development" },
  { id: "clubs-fests", label: "Clubs & Fests" },
  { id: "student-council", label: "Student Council" },
  { id: "achievements", label: "Achievements" },
  { id: "student-welfare", label: "Student Welfare" },
  { id: "downloads", label: "Downloads & Services" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function SubNav({
  active,
  onSelect,
}: { active: SectionId; onSelect: (id: SectionId) => void }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 900,
        background: C.deepBlue,
        borderBottom: `3px solid ${C.gold}`,
        boxShadow: "0 4px 16px rgba(8,30,92,0.3)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          overflowX: "auto",
        }}
      >
        <div style={{ display: "flex", gap: 0 }}>
          {SECTIONS.map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => onSelect(s.id)}
              data-ocid={`campus_life.${s.id}.tab`}
              style={{
                padding: "0.85rem 1.25rem",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                background:
                  active === s.id ? "rgba(232,196,42,0.15)" : "transparent",
                color: active === s.id ? C.gold : "rgba(255,255,255,0.8)",
                borderBottom:
                  active === s.id
                    ? `3px solid ${C.gold}`
                    : "3px solid transparent",
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 600,
                fontSize: "0.82rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                transition: "all 0.2s ease",
                marginBottom: "-3px",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section Wrapper ────────────────────────────────────────────────────────────
function Section({
  id,
  children,
  alt,
}: { id: string; children: React.ReactNode; alt?: boolean }) {
  return (
    <section
      id={id}
      style={{ background: alt ? C.bg : "#fff", padding: "5rem 0" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {children}
      </div>
    </section>
  );
}

// ─── Section Title ──────────────────────────────────────────────────────────────
function SectionTitle({
  label,
  title,
  subtitle,
}: { label: string; title: string; subtitle?: string }) {
  const { ref, vis } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        marginBottom: "3rem",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s cubic-bezier(.4,0,.2,1)",
      }}
    >
      <div
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: C.cobalt,
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </div>
      <h2
        style={{
          fontFamily: "Playfair Display,Georgia,serif",
          fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
          fontWeight: 700,
          color: C.deepBlue,
          lineHeight: 1.2,
          marginBottom: subtitle ? "0.75rem" : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: "1.05rem", color: C.muted, maxWidth: "600px" }}>
          {subtitle}
        </p>
      )}
      <div
        style={{
          width: 60,
          height: 3,
          background: C.gold,
          borderRadius: 2,
          marginTop: "1rem",
        }}
      />
    </div>
  );
}

// ─── Facilities Left Nav ────────────────────────────────────────────────────────
const FACILITY_TABS = [
  "Hostel",
  "Library / E-Resources",
  "Virtual Labs",
  "KRC",
] as const;
type FacilityTab = (typeof FACILITY_TABS)[number];

const FACILITY_CONTENT: Record<FacilityTab, React.ReactNode> = {
  Hostel: (
    <div>
      <h3
        style={{
          fontFamily: "Playfair Display,Georgia,serif",
          color: C.deepBlue,
          marginBottom: "1.25rem",
        }}
      >
        Student Hostels
      </h3>
      <p style={{ color: C.body, marginBottom: "1.5rem", lineHeight: 1.8 }}>
        COEP Tech provides on-campus residential facilities for students,
        ensuring a safe, comfortable, and academically conducive living
        environment.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            title: "Boys Hostels",
            icon: "🏠",
            detail:
              "5 hostels on campus\n2000+ seats capacity\nSeparate blocks for UG & PG",
          },
          {
            title: "Girls Hostel",
            icon: "🏡",
            detail:
              "1 dedicated hostel\n400+ seats capacity\n24×7 security & wardens",
          },
          {
            title: "Amenities",
            icon: "✨",
            detail:
              "High-speed WiFi throughout\nDining halls with hygienic mess\nLaundry facilities",
          },
          {
            title: "Sports & Recreation",
            icon: "⚽",
            detail:
              "Indoor games room\nSports equipment provision\nTerrace recreation areas",
          },
        ].map((c) => (
          <div
            key={c.title}
            style={{
              background: C.bg,
              borderRadius: "0.75rem",
              padding: "1.25rem",
              border: "1px solid #E5E7EB",
            }}
          >
            <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
              {c.icon}
            </div>
            <div
              style={{
                fontFamily: "Playfair Display,Georgia,serif",
                fontWeight: 700,
                color: C.deepBlue,
                marginBottom: "0.4rem",
                fontSize: "1rem",
              }}
            >
              {c.title}
            </div>
            <div
              style={{
                fontSize: "0.88rem",
                color: C.muted,
                whiteSpace: "pre-line",
                lineHeight: 1.6,
              }}
            >
              {c.detail}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: `${C.cobalt}10`,
          border: `1px solid ${C.cobalt}30`,
          borderRadius: "0.75rem",
          padding: "1.25rem",
        }}
      >
        <div
          style={{ fontWeight: 700, color: C.deepBlue, marginBottom: "0.4rem" }}
        >
          📞 Hostel Warden Office
        </div>
        <div style={{ fontSize: "0.9rem", color: C.body }}>
          Contact: +91-20-2550-7000 (Ext. 6101)
          <br />
          Email: hostel@coeptech.ac.in
          <br />
          Office Hours: 9:00 AM – 6:00 PM (Mon–Sat)
        </div>
      </div>
    </div>
  ),
  "Library / E-Resources": (
    <div>
      <h3
        style={{
          fontFamily: "Playfair Display,Georgia,serif",
          color: C.deepBlue,
          marginBottom: "1.25rem",
        }}
      >
        Knowledge Resource Center (KRC)
      </h3>
      <p style={{ color: C.body, marginBottom: "1.5rem", lineHeight: 1.8 }}>
        The KRC is one of the finest academic libraries in Maharashtra, housing
        an extensive collection of print and digital resources accessible to all
        students and faculty.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[
          { num: "80,000+", label: "Print Books" },
          { num: "400+", label: "Journals" },
          { num: "50,000+", label: "E-Books" },
          { num: "500+", label: "Reading Seats" },
          { num: "24×7", label: "Reading Room" },
          { num: "6", label: "E-Resource Databases" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: C.deepBlue,
              color: "#fff",
              borderRadius: "0.75rem",
              padding: "1.25rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Playfair Display,Georgia,serif",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: C.gold,
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.75)",
                marginTop: "0.25rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: "1.25rem" }}>
        <div
          style={{
            fontWeight: 700,
            color: C.deepBlue,
            marginBottom: "0.75rem",
          }}
        >
          E-Resource Databases
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {[
            "DELNET",
            "J-Gate",
            "IEEE Xplore",
            "Scopus",
            "Web of Science",
            "JSTOR",
          ].map((db) => (
            <span
              key={db}
              style={{
                background: `${C.cobalt}15`,
                color: C.deepBlue,
                padding: "0.3rem 0.75rem",
                borderRadius: "2rem",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              {db}
            </span>
          ))}
        </div>
      </div>
    </div>
  ),
  "Virtual Labs": (
    <div>
      <h3
        style={{
          fontFamily: "Playfair Display,Georgia,serif",
          color: C.deepBlue,
          marginBottom: "1.25rem",
        }}
      >
        Virtual Laboratories
      </h3>
      <p style={{ color: C.body, marginBottom: "1.5rem", lineHeight: 1.8 }}>
        COEP Tech provides access to IIT-developed Virtual Labs — a Ministry of
        Education initiative enabling students to conduct experiments online,
        anytime, anywhere.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        {[
          {
            icon: "🔬",
            title: "100+ Experiments",
            desc: "Across all major engineering disciplines — Civil, Mechanical, Electrical, CS, and more.",
          },
          {
            icon: "🌐",
            title: "24×7 Access",
            desc: "Available round-the-clock via vlabs.ac.in — no physical lab booking required.",
          },
          {
            icon: "💻",
            title: "Self-Paced Learning",
            desc: "Pre-experiment guides, in-experiment procedures, and post-experiment quizzes.",
          },
          {
            icon: "📜",
            title: "IIT Developed",
            desc: "Content developed by IIT Bombay, IIT Delhi, IIT Kharagpur, and other premier IITs.",
          },
        ].map((c) => (
          <div
            key={c.title}
            style={{
              background: C.bg,
              borderRadius: "0.75rem",
              padding: "1.25rem",
              border: "1px solid #E5E7EB",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              {c.icon}
            </div>
            <div
              style={{
                fontWeight: 700,
                color: C.deepBlue,
                marginBottom: "0.4rem",
              }}
            >
              {c.title}
            </div>
            <div
              style={{ fontSize: "0.88rem", color: C.muted, lineHeight: 1.6 }}
            >
              {c.desc}
            </div>
          </div>
        ))}
      </div>
      <a
        href="https://vlabs.ac.in"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        Visit Virtual Labs Portal ↗
      </a>
    </div>
  ),
  KRC: (
    <div>
      <h3
        style={{
          fontFamily: "Playfair Display,Georgia,serif",
          color: C.deepBlue,
          marginBottom: "1.25rem",
        }}
      >
        Knowledge Resource Center — Full Details
      </h3>
      <p style={{ color: C.body, marginBottom: "1.5rem", lineHeight: 1.8 }}>
        Established in 1854 along with the college, the KRC has grown into a
        modern, technology-enabled resource center serving the entire university
        community.
      </p>
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            fontWeight: 700,
            color: C.deepBlue,
            marginBottom: "0.75rem",
          }}
        >
          Services Available
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.6rem",
          }}
        >
          {[
            "Photocopying & Printing",
            "Document Scanning",
            "Interlibrary Loan (ILL)",
            "OPAC — Web Catalogue",
            "Book Issue & Return",
            "Reference Services",
            "Current Awareness Service",
            "Document Delivery Service",
          ].map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
                color: C.body,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.cobalt,
                  flexShrink: 0,
                }}
              />
              {s}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: `${C.cobalt}10`,
          border: `1px solid ${C.cobalt}30`,
          borderRadius: "0.75rem",
          padding: "1.25rem",
        }}
      >
        <div
          style={{ fontWeight: 700, color: C.deepBlue, marginBottom: "0.4rem" }}
        >
          📞 Librarian
        </div>
        <div style={{ fontSize: "0.9rem", color: C.body }}>
          Dr. A.B. Kulkarni, University Librarian
          <br />
          Email: librarian@coeptech.ac.in
          <br />
          Tel: +91-20-2550-7000 (Ext. 5200)
          <br />
          Timings: Mon–Sat, 8:00 AM – 10:00 PM
        </div>
      </div>
    </div>
  ),
};

// ─── Academic Support Tabs ──────────────────────────────────────────────────────
const ACAD_TABS = [
  "Examinations",
  "Transcript Verification",
  "Academic Calendar",
  "Timetable",
] as const;
type AcadTab = (typeof ACAD_TABS)[number];

// ─── Student Dev Tabs ───────────────────────────────────────────────────────────
const DEV_TABS = ["Skill Development Centre", "NSS"] as const;
type DevTab = (typeof DEV_TABS)[number];

// ─── Clubs & Fests ──────────────────────────────────────────────────────────────
const TECH_CLUBS = [
  {
    name: "COEP Robotics Club",
    desc: "Building autonomous robots and competing at national robotics championships.",
    category: "Technical",
  },
  {
    name: "IEEE Student Branch",
    desc: "IEEE-affiliated chapter fostering technical excellence and industry connections.",
    category: "Technical",
  },
  {
    name: "Credenz (IT Club)",
    desc: "Premier IT club organising coding competitions, hackathons, and tech talks.",
    category: "Technical",
  },
  {
    name: "COEP Racing Team",
    desc: "Formula SAE team designing, building, and racing formula-style cars.",
    category: "Technical",
  },
  {
    name: "SAE Collegiate Club",
    desc: "Society of Automotive Engineers chapter for automotive innovation.",
    category: "Technical",
  },
  {
    name: "COEP ACM Chapter",
    desc: "ACM student chapter for computer science and computing research.",
    category: "Technical",
  },
];
const CULTURAL_CLUBS = [
  {
    name: "Yuvak Bharati (Literary)",
    desc: "Marathi literary club promoting language, culture, and debate.",
    category: "Cultural",
  },
  {
    name: "COEP Drama Club",
    desc: "Theatre group staging plays, street performances, and dramatic arts.",
    category: "Cultural",
  },
  {
    name: "Music Club — Sur",
    desc: "Classical and contemporary music — vocal and instrumental performances.",
    category: "Cultural",
  },
  {
    name: "Dance Club",
    desc: "Classical, folk, and contemporary dance performances at fests and events.",
    category: "Cultural",
  },
  {
    name: "Photography Club — Shutterbug",
    desc: "Exploring visual storytelling through lens and digital arts.",
    category: "Cultural",
  },
  {
    name: "Fine Arts Club",
    desc: "Painting, sketching, and visual arts for creative expression.",
    category: "Cultural",
  },
];
const SPORTS_CLUBS = [
  {
    name: "Cricket Club",
    desc: "Competing at inter-collegiate and university level cricket tournaments.",
    category: "Sports",
  },
  {
    name: "Football Club",
    desc: "University football team with regular training and inter-college matches.",
    category: "Sports",
  },
  {
    name: "Basketball Club",
    desc: "Regular practice sessions and representation in state-level competitions.",
    category: "Sports",
  },
  {
    name: "Badminton Club",
    desc: "Shuttle enthusiasts with dedicated courts and coaching.",
    category: "Sports",
  },
];
const FESTS = [
  {
    name: "Mindspark",
    tagline: "Asia's Largest Technical Festival",
    desc: "Mindspark is COEP Tech's flagship national technical festival, drawing 50,000+ participants from across India. With 50+ events spanning robotics, coding, machine learning, and engineering challenges, it is one of the most prestigious technical fests in Asia.",
    month: "October / November",
    participants: "50,000+",
    events: "50+",
    website: "https://mindspark.in",
    gradient: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 60%, #1648C8 100%)`,
    accent: C.gold,
  },
  {
    name: "Impressions",
    tagline: "COEP's Annual Cultural Extravaganza",
    desc: "Impressions is the vibrant cultural festival of COEP Tech, celebrating music, dance, drama, and competitions. The fest brings together artists and performers from colleges across Maharashtra for an unforgettable cultural experience.",
    month: "February",
    participants: "20,000+",
    events: "30+",
    website: "#",
    gradient: "linear-gradient(135deg, #4C1D95 0%, #7C3AED 60%, #A855F7 100%)",
    accent: C.gold,
  },
  {
    name: "PSF",
    tagline: "Pune Student Festival",
    desc: "The Pune Student Festival (PSF) is an inter-collegiate festival celebrating student talent across disciplines. Featuring competitions in engineering, arts, business, and culture, PSF is a platform for students to showcase their multifaceted abilities.",
    month: "March",
    participants: "15,000+",
    events: "25+",
    website: "#",
    gradient: "linear-gradient(135deg, #065F46 0%, #059669 60%, #34D399 100%)",
    accent: C.gold,
  },
];

// ─── Achievement Data ───────────────────────────────────────────────────────────
const ACHIEVEMENTS: Record<
  string,
  { title: string; desc: string; year: string; award: string }[]
> = {
  Technical: [
    {
      title: "National Robotics Championship",
      desc: "COEP Robotics Club secured 1st place at IIT Bombay's Techfest robotics competition.",
      year: "2024",
      award: "🥇 Gold",
    },
    {
      title: "Smart India Hackathon",
      desc: "Team TechVision won in the Hardware category representing COEP.",
      year: "2024",
      award: "🏆 Winner",
    },
    {
      title: "Formula Student India",
      desc: "COEP Racing Team finished 2nd overall in Formula Student India.",
      year: "2023",
      award: "🥈 Silver",
    },
    {
      title: "IEEE PES Student Congress",
      desc: "IEEE COEP branch won best chapter award at national IEEE congress.",
      year: "2023",
      award: "⭐ Best Chapter",
    },
    {
      title: "ACM ICPC Regionals",
      desc: "Two COEP teams qualified for the ICPC Asia Pacific regionals.",
      year: "2024",
      award: "🎖 Qualifier",
    },
  ],
  Cultural: [
    {
      title: "Youth National Theater Festival",
      desc: "COEP Drama Club's performance won Best Play award at national competition.",
      year: "2024",
      award: "🏆 Best Play",
    },
    {
      title: "All India Radio Music Competition",
      desc: "Sur Music Club's ensemble won AIR's intercollegiate music competition.",
      year: "2024",
      award: "🥇 Gold",
    },
    {
      title: "Marathi Rajya Natya Spardha",
      desc: "Yuvak Bharati secured runner-up position in state-level literary fest.",
      year: "2023",
      award: "🥈 Runner-up",
    },
    {
      title: "Photography Exhibition Award",
      desc: "Shutterbug Club won best college photography exhibition at Fergusson.",
      year: "2023",
      award: "🎨 Best Exhibition",
    },
    {
      title: "Impressions Cultural Crown",
      desc: "COEP Dance Club won the overall cultural trophy at inter-college fest.",
      year: "2024",
      award: "👑 Cultural Crown",
    },
  ],
  Sports: [
    {
      title: "All India Inter-University Cricket",
      desc: "COEP cricket team won the All India Inter-University championship.",
      year: "2024",
      award: "🏆 Champion",
    },
    {
      title: "Maharashtra State Basketball",
      desc: "University basketball team won state-level championship for 2nd year.",
      year: "2023",
      award: "🥇 Gold",
    },
    {
      title: "Badminton Inter-University",
      desc: "COEP student Rohit Patil won individual title at inter-university meet.",
      year: "2024",
      award: "🏸 Individual Gold",
    },
    {
      title: "Football Khelo India",
      desc: "Football team represented Maharashtra in Khelo India Games.",
      year: "2024",
      award: "🎖 Representation",
    },
    {
      title: "Volleyball State Championship",
      desc: "Volleyball team secured bronze at Maharashtra state championship.",
      year: "2023",
      award: "🥉 Bronze",
    },
  ],
  Academic: [
    {
      title: "GATE Toppers 2024",
      desc: "35 COEP students secured AIR under 100 in GATE 2024 examination.",
      year: "2024",
      award: "📚 35 AIR < 100",
    },
    {
      title: "UPSC Civil Services",
      desc: "3 COEP alumni cleared UPSC Civil Services exam in 2024 batch.",
      year: "2024",
      award: "🎖 3 Selections",
    },
    {
      title: "National Science Day Award",
      desc: "Department of Physics won Best Research Paper at Science Day event.",
      year: "2024",
      award: "🔬 Best Paper",
    },
    {
      title: "Infosys Prize Nomination",
      desc: "Prof. R.K. Joshi from COEP nominated for Infosys Science Prize.",
      year: "2023",
      award: "⭐ Nomination",
    },
    {
      title: "MIT Innovation Challenge",
      desc: "Student team TechSolve reached finals of MIT's global innovation challenge.",
      year: "2024",
      award: "🌍 Global Finalist",
    },
  ],
};

// ─── Scholarship Data ───────────────────────────────────────────────────────────
const SCHOLARSHIPS = [
  {
    name: "Govt. of Maharashtra Scholarship",
    eligibility: "SC/ST/OBC/NT categories",
    amount: "₹50,000 – ₹2,00,000",
    applyBy: "November",
  },
  {
    name: "Merit-cum-Means Scholarship",
    eligibility: "Top 10% of class + income criteria",
    amount: "₹25,000/year",
    applyBy: "January",
  },
  {
    name: "Minority Scholarship",
    eligibility: "Minority communities",
    amount: "Varies",
    applyBy: "October",
  },
  {
    name: "GATE Fellowship",
    eligibility: "M.Tech / M.Plann students",
    amount: "₹12,400/month",
    applyBy: "On admission",
  },
  {
    name: "COEP Alumni Scholarship",
    eligibility: "Meritorious students, all categories",
    amount: "₹20,000/year",
    applyBy: "August",
  },
];

const DOWNLOADS_LIST = [
  { name: "Bonafide Certificate Form", type: "PDF", icon: "📄" },
  { name: "Character Certificate Form", type: "PDF", icon: "📄" },
  { name: "No Dues Form", type: "PDF", icon: "📄" },
  { name: "Hostel Application Form", type: "PDF", icon: "🏠" },
  { name: "Scholarship Application Form", type: "PDF", icon: "📝" },
  { name: "Anti-Ragging Declaration", type: "PDF", icon: "🛡" },
  { name: "Academic Calendar 2025–26", type: "PDF", icon: "📅" },
  { name: "Transcript Request Form", type: "PDF", icon: "🎓" },
];

// ─── Main Component ─────────────────────────────────────────────────────────────
export function CampusLifePage() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [facilityTab, setFacilityTab] = useState<FacilityTab>("Hostel");
  const [acadTab, setAcadTab] = useState<AcadTab>("Examinations");
  const [devTab, setDevTab] = useState<DevTab>("Skill Development Centre");
  const [clubsTab, setClubsTab] = useState<"Clubs" | "Fests">("Clubs");
  const [achieveTab, setAchieveTab] =
    useState<keyof typeof ACHIEVEMENTS>("Technical");
  const [welfareTab, setWelfareTab] = useState<
    "Scholarships" | "Education Loan"
  >("Scholarships");
  const [dlTab, setDlTab] = useState<
    "Certificates" | "How to Apply" | "Downloads"
  >("Certificates");
  const statsRef = useReveal<HTMLDivElement>();

  // Scroll to section
  const scrollTo = (id: SectionId) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Track active section on scroll
  useEffect(() => {
    const handler = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(s.id);
          return;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <Layout>
      <Header />
      <UniversityTabsSection />

      {/* ── Hero Banner ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 50%, ${C.cobalt} 100%)`,
          position: "relative",
          overflow: "hidden",
          padding: "4rem 0 3.5rem",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(232,196,42,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "10%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(22,72,200,0.2)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <a
              href="#/"
              style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
            >
              Home
            </a>
            <span>›</span>
            <span style={{ color: C.gold }}>Campus Life</span>
          </nav>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.gold,
                  marginBottom: "0.75rem",
                }}
              >
                COEP Technological University
              </div>
              <h1
                style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontSize: "clamp(2.5rem,5vw,4rem)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Campus Life at
                <br />
                <span style={{ color: C.gold }}>COEP Tech</span>
              </h1>
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: "500px",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                Where Engineering Meets Culture — 170 years of academic legacy,
                vibrant student life, and a campus that never sleeps.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => scrollTo("overview")}
                  data-ocid="campus_life.hero.explore_button"
                >
                  Explore Campus Life
                </button>
                <button
                  type="button"
                  className="btn-ghost-white"
                  onClick={() => scrollTo("clubs-fests")}
                  data-ocid="campus_life.hero.clubs_button"
                >
                  Clubs & Fests
                </button>
              </div>
            </div>
            {/* Stats quick strip */}
            <div
              ref={statsRef.ref}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem 2.5rem",
              }}
            >
              <StatCard
                value={12000}
                suffix="+"
                label="Students"
                active={statsRef.vis}
              />
              <StatCard
                value={50}
                suffix="+"
                label="Student Clubs"
                active={statsRef.vis}
              />
              <StatCard value={3} label="Annual Fests" active={statsRef.vis} />
              <StatCard
                value={100}
                suffix="%"
                label="Hostel Availability"
                active={statsRef.vis}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Sub-Nav ───────────────────────────────────────────────────────── */}
      <SubNav active={activeSection} onSelect={scrollTo} />

      {/* ══════════════════════════════════════════════════════════════════════════
          1. OVERVIEW
      ══════════════════════════════════════════════════════════════════════════ */}
      <Section id="overview">
        <SectionTitle
          label="Student Life"
          title="Life on Campus"
          subtitle="A thriving community of curious minds, cultural enthusiasts, and engineering innovators."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          <div className="animate-on-scroll">
            <p
              style={{
                color: C.body,
                lineHeight: 1.85,
                marginBottom: "1.25rem",
                fontSize: "1.05rem",
              }}
            >
              COEP Tech's campus in the heart of Pune is not just an institution
              — it's a living, breathing community. Spread across a verdant
              heritage campus, it blends 170 years of architectural grandeur
              with modern academic infrastructure.
            </p>
            <p
              style={{
                color: C.body,
                lineHeight: 1.85,
                marginBottom: "1.25rem",
                fontSize: "1.05rem",
              }}
            >
              From the iconic Gothic-style main building to state-of-the-art
              research labs, from the Knowledge Resource Center open till
              midnight to sports grounds alive with activity every evening —
              every corner of COEP reflects a culture of excellence.
            </p>
            <p style={{ color: C.body, lineHeight: 1.85, fontSize: "1.05rem" }}>
              Students here don't just study engineering — they lead, create,
              compete, and celebrate. With 50+ clubs, three major annual fests
              drawing lakhs of visitors, and a student council that actively
              shapes campus policy, COEP's student life is as dynamic as it
              gets.
            </p>
          </div>
          <div
            className="animate-on-scroll"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "180px 180px",
              gap: "1rem",
            }}
          >
            {[
              {
                bg: `linear-gradient(135deg, ${C.cobalt}, ${C.deepBlue})`,
                label: "Heritage Campus",
                icon: "🏛",
              },
              {
                bg: `linear-gradient(135deg, ${C.gold}, #C9A820)`,
                label: "Mindspark Fest",
                icon: "⚡",
              },
              {
                bg: "linear-gradient(135deg, #065F46, #059669)",
                label: "Sports & Recreation",
                icon: "🏆",
              },
              {
                bg: "linear-gradient(135deg, #4C1D95, #7C3AED)",
                label: "Cultural Fests",
                icon: "🎭",
              },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  background: c.bg,
                  borderRadius: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "scale(1.04)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 12px 32px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "scale(1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>{c.icon}</span>
                <span
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textAlign: "center",
                    padding: "0 0.5rem",
                  }}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Student Experience strip */}
        <div
          style={{
            marginTop: "4rem",
            background: C.deepBlue,
            borderRadius: "1rem",
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "2rem",
          }}
        >
          {[
            { num: "12,000+", label: "Students Enrolled" },
            { num: "50+", label: "Student Clubs" },
            { num: "3", label: "Major Annual Fests" },
            { num: "100%", label: "Hostel for 1st Years" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center animate-on-scroll"
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  fontFamily: "Playfair Display,Georgia,serif",
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 800,
                  color: C.gold,
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                  marginTop: "0.5rem",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════════════
          2. FACILITIES
      ══════════════════════════════════════════════════════════════════════════ */}
      <Section id="facilities" alt>
        <SectionTitle
          label="Infrastructure"
          title="Campus Facilities"
          subtitle="World-class infrastructure supporting every dimension of student life."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Left nav */}
          <div
            style={{
              background: "#fff",
              borderRadius: "0.75rem",
              overflow: "hidden",
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 12px rgba(22,72,200,0.08)",
              position: "sticky",
              top: 80,
            }}
          >
            {FACILITY_TABS.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setFacilityTab(t)}
                data-ocid={`campus_life.facilities.${t.toLowerCase().replace(/[\s/]+/g, "_")}.tab`}
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "Source Sans 3, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  transition: "all 0.2s ease",
                  borderLeft:
                    facilityTab === t
                      ? `3px solid ${C.gold}`
                      : "3px solid transparent",
                  background:
                    facilityTab === t ? `${C.cobalt}0D` : "transparent",
                  color: facilityTab === t ? C.deepBlue : C.muted,
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Content */}
          <div
            style={{
              background: "#fff",
              borderRadius: "0.75rem",
              padding: "2rem",
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 12px rgba(22,72,200,0.08)",
              minHeight: 400,
              animation: "fadeSlideIn 0.4s ease both",
            }}
            key={facilityTab}
          >
            {FACILITY_CONTENT[facilityTab]}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════════════
          3. ACADEMIC SUPPORT
      ══════════════════════════════════════════════════════════════════════════ */}
      <Section id="academic-support">
        <SectionTitle
          label="Academic"
          title="Academic Support"
          subtitle="Tools and services to help you thrive academically."
        />
        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "2px solid #E5E7EB",
            marginBottom: "2.5rem",
            overflowX: "auto",
          }}
        >
          {ACAD_TABS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setAcadTab(t)}
              data-ocid={`campus_life.academic.${t.toLowerCase().replace(/\s+/g, "_")}.tab`}
              style={{
                padding: "0.85rem 1.5rem",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                whiteSpace: "nowrap",
                borderBottom:
                  acadTab === t
                    ? `2px solid ${C.cobalt}`
                    : "2px solid transparent",
                color: acadTab === t ? C.cobalt : C.muted,
                marginBottom: "-2px",
                transition: "all 0.2s ease",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {acadTab === "Examinations" && (
          <div className="animate-on-scroll" key="exams">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: "Playfair Display,Georgia,serif",
                    color: C.deepBlue,
                    marginBottom: "1rem",
                  }}
                >
                  Examination Schedule
                </h4>
                <div
                  style={{
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                  }}
                >
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: C.deepBlue }}>
                        {["Exam Type", "Dates", "Duration"].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "0.75rem 1rem",
                              textAlign: "left",
                              color: "#fff",
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              letterSpacing: "0.05em",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          type: "Mid-Semester Exams",
                          dates: "Aug 18–25, 2025",
                          dur: "1 Week",
                        },
                        {
                          type: "End-Semester Exams",
                          dates: "Nov 10–25, 2025",
                          dur: "2 Weeks",
                        },
                        {
                          type: "Practical Examinations",
                          dates: "Oct 20–Nov 5, 2025",
                          dur: "2 Weeks",
                        },
                        {
                          type: "Back-log Examinations",
                          dates: "Dec 15–20, 2025",
                          dur: "1 Week",
                        },
                      ].map((r, i) => (
                        <tr
                          key={r.type}
                          style={{
                            background: i % 2 ? C.bg : "#fff",
                            borderTop: "1px solid #F3F4F6",
                          }}
                        >
                          <td
                            style={{
                              padding: "0.75rem 1rem",
                              fontSize: "0.9rem",
                              color: C.body,
                              fontWeight: 600,
                            }}
                          >
                            {r.type}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem 1rem",
                              fontSize: "0.9rem",
                              color: C.body,
                            }}
                          >
                            {r.dates}
                          </td>
                          <td
                            style={{
                              padding: "0.75rem 1rem",
                              fontSize: "0.9rem",
                              color: C.muted,
                            }}
                          >
                            {r.dur}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "Playfair Display,Georgia,serif",
                    color: C.deepBlue,
                    marginBottom: "1rem",
                  }}
                >
                  Examination Board Contact
                </h4>
                <div
                  style={{
                    background: C.bg,
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: C.deepBlue,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Dr. Y.V. Haribhakta
                  </div>
                  <div
                    style={{
                      fontSize: "0.88rem",
                      color: C.muted,
                      marginBottom: "1rem",
                    }}
                  >
                    Director, Board of Examinations & Evaluation
                  </div>
                  <div
                    style={{ fontSize: "0.9rem", color: C.body, lineHeight: 2 }}
                  >
                    📧 examination@coeptech.ac.in
                    <br />📞 +91-20-2550-7000 (Ext. 4100)
                    <br />🕐 Mon–Fri: 10 AM – 5 PM
                  </div>
                  <a
                    href="https://exam.coeptech.ac.in"
                    className="btn-secondary"
                    style={{
                      textDecoration: "none",
                      display: "inline-flex",
                      marginTop: "1rem",
                      fontSize: "0.85rem",
                      padding: "0.6rem 1.25rem",
                    }}
                    data-ocid="campus_life.examinations.portal_button"
                  >
                    Visit Exam Portal ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {acadTab === "Transcript Verification" && (
          <div className="animate-on-scroll" key="transcript">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: "Playfair Display,Georgia,serif",
                    color: C.deepBlue,
                    marginBottom: "1rem",
                  }}
                >
                  Transcript Verification Process
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {[
                    "Submit online application via student portal",
                    "Attach supporting documents (degree certificate, marksheets)",
                    "Pay verification fee (₹500 per transcript)",
                    "Receive acknowledgement within 2 working days",
                    "Verification completed in 10–15 working days",
                    "Collect in person or receive by post/courier",
                  ].map((s, idx) => (
                    <div
                      key={s}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          minWidth: 28,
                          height: 28,
                          background: C.cobalt,
                          color: "#fff",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <p
                        style={{
                          margin: 0,
                          color: C.body,
                          lineHeight: 1.6,
                          paddingTop: "0.2rem",
                        }}
                      >
                        {s}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "Playfair Display,Georgia,serif",
                    color: C.deepBlue,
                    marginBottom: "1rem",
                  }}
                >
                  Required Documents
                </h4>
                <div
                  style={{
                    background: C.bg,
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid #E5E7EB",
                    marginBottom: "1.25rem",
                  }}
                >
                  {[
                    "Degree Certificate (photocopy)",
                    "All Semester Marksheets",
                    "Enrollment Certificate",
                    "Valid Government ID",
                    "Recent Passport-size Photograph",
                  ].map((d) => (
                    <div
                      key={d}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.4rem 0",
                        fontSize: "0.9rem",
                        color: C.body,
                        borderBottom: "1px solid #F3F4F6",
                      }}
                    >
                      <span style={{ color: C.cobalt, fontWeight: 700 }}>
                        ✓
                      </span>{" "}
                      {d}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: `${C.gold}20`,
                    border: `1px solid ${C.gold}50`,
                    borderRadius: "0.75rem",
                    padding: "1rem 1.25rem",
                    fontSize: "0.88rem",
                    color: C.midnight,
                  }}
                >
                  ⏱ <strong>Processing Time:</strong> 10–15 working days from
                  date of application.
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ marginTop: "1rem" }}
                  data-ocid="campus_life.transcript.apply_button"
                >
                  Apply Online →
                </button>
              </div>
            </div>
          </div>
        )}

        {acadTab === "Academic Calendar" && (
          <div className="animate-on-scroll" key="calendar">
            <AcademicCalendar />
          </div>
        )}

        {acadTab === "Timetable" && (
          <div className="animate-on-scroll" key="timetable">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: "Playfair Display,Georgia,serif",
                    color: C.deepBlue,
                    marginBottom: "1rem",
                  }}
                >
                  Current Timetable
                </h4>
                <div
                  style={{
                    background: C.bg,
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid #E5E7EB",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    📅
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: C.deepBlue,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Timetable for Semester VI, 2025
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: C.muted,
                      marginBottom: "1.5rem",
                    }}
                  >
                    Academic Year 2024–25 | Even Semester
                  </div>
                  <a
                    href="https://academics.coeptech.ac.in/timetable"
                    className="btn-primary"
                    style={{
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    data-ocid="campus_life.timetable.download_button"
                  >
                    📥 Download PDF
                  </a>
                </div>
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "Playfair Display,Georgia,serif",
                    color: C.deepBlue,
                    marginBottom: "1rem",
                  }}
                >
                  Admin: Upload Timetable
                </h4>
                <div
                  style={{
                    background: C.bg,
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: `2px dashed ${C.cobalt}40`,
                  }}
                >
                  <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                      📤
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: C.deepBlue,
                        marginBottom: "0.25rem",
                      }}
                    >
                      Upload New Timetable
                    </div>
                    <div style={{ fontSize: "0.85rem", color: C.muted }}>
                      PDF files only, max 10MB
                    </div>
                  </div>
                  <label
                    htmlFor="timetable-file-upload"
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: C.deepBlue,
                      marginBottom: "0.35rem",
                    }}
                  >
                    Select PDF File
                  </label>
                  <input
                    id="timetable-file-upload"
                    type="file"
                    accept=".pdf"
                    style={{
                      display: "block",
                      width: "100%",
                      marginBottom: "1rem",
                      fontSize: "0.85rem",
                    }}
                    data-ocid="campus_life.timetable.upload_button"
                  />
                  <label
                    htmlFor="timetable-semester-select"
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: C.deepBlue,
                      marginBottom: "0.35rem",
                    }}
                  >
                    Select Semester
                  </label>
                  <select
                    id="timetable-semester-select"
                    style={{
                      width: "100%",
                      padding: "0.6rem 0.75rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "0.5rem",
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                      fontFamily: "Source Sans 3, sans-serif",
                      color: C.body,
                    }}
                    data-ocid="campus_life.timetable.semester_select"
                  >
                    {[
                      "Semester I",
                      "Semester II",
                      "Semester III",
                      "Semester IV",
                      "Semester V",
                      "Semester VI",
                      "Semester VII",
                      "Semester VIII",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ width: "100%", justifyContent: "center" }}
                    data-ocid="campus_life.timetable.submit_button"
                  >
                    Upload Timetable
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* ══════════════════════════════════════════════════════════════════════════
          4. STUDENT DEVELOPMENT
      ══════════════════════════════════════════════════════════════════════════ */}
      <Section id="student-development" alt>
        <SectionTitle
          label="Growth"
          title="Student Development"
          subtitle="Building the complete engineer — technically sharp, socially aware, personally empowered."
        />
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "2px solid #E5E7EB",
            marginBottom: "2.5rem",
          }}
        >
          {DEV_TABS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setDevTab(t)}
              data-ocid={`campus_life.development.${t.toLowerCase().replace(/\s+/g, "_")}.tab`}
              style={{
                padding: "0.85rem 1.5rem",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                borderBottom:
                  devTab === t
                    ? `2px solid ${C.cobalt}`
                    : "2px solid transparent",
                color: devTab === t ? C.cobalt : C.muted,
                marginBottom: "-2px",
                transition: "all 0.2s ease",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {devTab === "Skill Development Centre" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5rem",
              alignItems: "start",
            }}
            key="sdc"
            className="animate-on-scroll"
          >
            <div>
              <h3
                style={{
                  fontFamily: "Playfair Display,Georgia,serif",
                  color: C.deepBlue,
                  marginBottom: "1rem",
                }}
              >
                Skill Development Centre
              </h3>
              <p
                style={{
                  color: C.body,
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}
              >
                The SDC at COEP Tech bridges the gap between academic learning
                and industry requirements, offering a range of skill-building
                programs across communication, leadership, technical
                proficiency, and professional competencies.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                {[
                  {
                    icon: "💬",
                    title: "Communication Skills",
                    desc: "Public speaking, technical writing, business communication",
                  },
                  {
                    icon: "🏆",
                    title: "Leadership Programs",
                    desc: "Team management, decision-making, conflict resolution",
                  },
                  {
                    icon: "💻",
                    title: "Technical Skills",
                    desc: "Industry tools, certifications, advanced programming",
                  },
                  {
                    icon: "📊",
                    title: "Aptitude Training",
                    desc: "CAT/GATE/GRE preparation, placement readiness",
                  },
                ].map((p) => (
                  <div
                    key={p.title}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      background: C.bg,
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{p.icon}</span>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: C.deepBlue,
                          fontSize: "0.95rem",
                        }}
                      >
                        {p.title}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: C.muted }}>
                        {p.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "Playfair Display,Georgia,serif",
                  color: C.deepBlue,
                  marginBottom: "1rem",
                }}
              >
                Upcoming Workshops
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {[
                  {
                    title: "Advanced Python for Data Science",
                    date: "July 20, 2025",
                    seats: "40 seats",
                  },
                  {
                    title: "Interview Preparation Bootcamp",
                    date: "August 2, 2025",
                    seats: "60 seats",
                  },
                  {
                    title: "Technical Presentation Skills",
                    date: "August 15, 2025",
                    seats: "35 seats",
                  },
                  {
                    title: "Entrepreneurship Fundamentals",
                    date: "September 1, 2025",
                    seats: "50 seats",
                  },
                ].map((w) => (
                  <div
                    key={w.title}
                    style={{
                      background: "#fff",
                      borderRadius: "0.75rem",
                      padding: "1rem 1.25rem",
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: C.deepBlue,
                          fontSize: "0.9rem",
                        }}
                      >
                        {w.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: C.muted,
                          marginTop: "0.2rem",
                        }}
                      >
                        {w.date} · {w.seats}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{
                        fontSize: "0.78rem",
                        padding: "0.4rem 0.85rem",
                        whiteSpace: "nowrap",
                      }}
                      data-ocid="campus_life.sdc.register_button"
                    >
                      Register
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {devTab === "NSS" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5rem",
            }}
            key="nss"
            className="animate-on-scroll"
          >
            <div>
              <h3
                style={{
                  fontFamily: "Playfair Display,Georgia,serif",
                  color: C.deepBlue,
                  marginBottom: "1rem",
                }}
              >
                National Service Scheme at COEP
              </h3>
              <p
                style={{
                  color: C.body,
                  lineHeight: 1.8,
                  marginBottom: "1.25rem",
                }}
              >
                NSS at COEP Tech instills the spirit of community service,
                national development, and civic responsibility among students.
                The unit has been actively serving the community since 1969.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                {[
                  {
                    icon: "🩸",
                    title: "Blood Donation",
                    desc: "Annual blood donation camps with 500+ volunteers",
                  },
                  {
                    icon: "🌱",
                    title: "Tree Plantation",
                    desc: "1000+ saplings planted across Pune yearly",
                  },
                  {
                    icon: "🏡",
                    title: "Rural Development",
                    desc: "Annual camp in adopted village, Maharashtra",
                  },
                  {
                    icon: "📚",
                    title: "Literacy Drive",
                    desc: "Teaching and educational support for underprivileged",
                  },
                  {
                    icon: "🧹",
                    title: "Swachh Bharat",
                    desc: "Campus and community cleanliness drives",
                  },
                  {
                    icon: "🎓",
                    title: "Skill Sharing",
                    desc: "Technical knowledge sharing with rural communities",
                  },
                ].map((a) => (
                  <div
                    key={a.title}
                    style={{
                      background: C.bg,
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      border: "1px solid #E5E7EB",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "1.8rem", marginBottom: "0.3rem" }}>
                      {a.icon}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: C.deepBlue,
                        fontSize: "0.85rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {a.title}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: C.muted }}>
                      {a.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "Playfair Display,Georgia,serif",
                  color: C.deepBlue,
                  marginBottom: "1rem",
                }}
              >
                Annual Special Camp
              </h4>
              <div
                style={{
                  background: `linear-gradient(135deg, ${C.deepBlue}, ${C.cobalt})`,
                  borderRadius: "1rem",
                  padding: "1.75rem",
                  color: "#fff",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: C.gold,
                    marginBottom: "0.5rem",
                  }}
                >
                  Annual NSS Camp 2025
                </div>
                <div
                  style={{
                    fontFamily: "Playfair Display,Georgia,serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                  }}
                >
                  Gram Vikas Abhiyan
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.7,
                  }}
                >
                  7-day residential camp in rural Maharashtra. 200+ student
                  volunteers engage in village development activities — health
                  awareness, sanitation, agricultural support, and digital
                  literacy.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginTop: "1.25rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: C.gold,
                      }}
                    >
                      200+
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      Volunteers
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: C.gold,
                      }}
                    >
                      7
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      Days
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: C.gold,
                      }}
                    >
                      1954
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      Since
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-primary"
                data-ocid="campus_life.nss.join_button"
              >
                Join NSS at COEP →
              </button>
            </div>
          </div>
        )}
      </Section>

      {/* ══════════════════════════════════════════════════════════════════════════
          5. CLUBS & FESTS
      ══════════════════════════════════════════════════════════════════════════ */}
      <Section id="clubs-fests">
        <SectionTitle
          label="Community"
          title="Clubs & Fests"
          subtitle="50+ student clubs and 3 mega fests — the heartbeat of COEP's campus culture."
        />
        {/* Tab toggle */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginBottom: "2.5rem",
            background: C.bg,
            borderRadius: "0.75rem",
            padding: "0.25rem",
            width: "fit-content",
          }}
        >
          {(["Clubs", "Fests"] as const).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setClubsTab(t)}
              data-ocid={`campus_life.clubs_fests.${t.toLowerCase()}.toggle`}
              style={{
                padding: "0.65rem 2rem",
                border: "none",
                cursor: "pointer",
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                borderRadius: "0.5rem",
                transition: "all 0.2s ease",
                background: clubsTab === t ? C.cobalt : "transparent",
                color: clubsTab === t ? "#fff" : C.muted,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {clubsTab === "Clubs" && (
          <div key="clubs" className="animate-on-scroll">
            {[
              { label: "Technical Clubs", color: C.cobalt, clubs: TECH_CLUBS },
              {
                label: "Cultural Clubs",
                color: "#7C3AED",
                clubs: CULTURAL_CLUBS,
              },
              { label: "Sports Clubs", color: "#059669", clubs: SPORTS_CLUBS },
            ].map((cat) => (
              <div key={cat.label} style={{ marginBottom: "3rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 28,
                      background: cat.color,
                      borderRadius: 2,
                    }}
                  />
                  <h4
                    style={{
                      fontFamily: "Playfair Display,Georgia,serif",
                      color: C.deepBlue,
                      margin: 0,
                    }}
                  >
                    {cat.label}
                  </h4>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
                    gap: "1rem",
                  }}
                >
                  {cat.clubs.map((club) => (
                    <div
                      key={club.name}
                      className="card-elevated"
                      style={{ padding: "1.25rem 1.5rem" }}
                      data-ocid={`campus_life.clubs.${club.name.toLowerCase().replace(/\s+/g, "_")}.card`}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color: C.deepBlue,
                            fontSize: "0.95rem",
                            lineHeight: 1.3,
                          }}
                        >
                          {club.name}
                        </div>
                        <span
                          style={{
                            background: `${cat.color}15`,
                            color: cat.color,
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            padding: "0.2rem 0.5rem",
                            borderRadius: "2rem",
                            whiteSpace: "nowrap",
                            marginLeft: "0.5rem",
                          }}
                        >
                          {club.category}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: C.muted,
                          lineHeight: 1.6,
                          marginBottom: "1rem",
                        }}
                      >
                        {club.desc}
                      </p>
                      <button
                        type="button"
                        style={{
                          background: "transparent",
                          border: `1.5px solid ${cat.color}`,
                          color: cat.color,
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          padding: "0.4rem 1rem",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          fontFamily: "Source Sans 3, sans-serif",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = cat.color;
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            cat.color;
                        }}
                        data-ocid={"campus_life.clubs.join_button"}
                      >
                        Join Us
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {clubsTab === "Fests" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            key="fests"
            className="animate-on-scroll"
          >
            {FESTS.map((fest) => (
              <div
                key={fest.name}
                style={{
                  background: fest.gradient,
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  minHeight: 280,
                }}
                data-ocid={`campus_life.fests.${fest.name.toLowerCase()}.card`}
              >
                <div
                  style={{
                    padding: "2.5rem 3rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: fest.accent,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {fest.tagline}
                  </div>
                  <h2
                    style={{
                      fontFamily: "Playfair Display,Georgia,serif",
                      fontSize: "clamp(2rem,4vw,3rem)",
                      fontWeight: 800,
                      color: "#fff",
                      lineHeight: 1.1,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {fest.name}
                  </h2>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.82)",
                      lineHeight: 1.7,
                      fontSize: "0.95rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {fest.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      marginBottom: "1.75rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "Playfair Display,Georgia,serif",
                          fontSize: "1.6rem",
                          fontWeight: 800,
                          color: fest.accent,
                        }}
                      >
                        {fest.participants}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "rgba(255,255,255,0.65)",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Participants
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Playfair Display,Georgia,serif",
                          fontSize: "1.6rem",
                          fontWeight: 800,
                          color: fest.accent,
                        }}
                      >
                        {fest.events}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "rgba(255,255,255,0.65)",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Events
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Playfair Display,Georgia,serif",
                          fontSize: "1.1rem",
                          fontWeight: 800,
                          color: fest.accent,
                        }}
                      >
                        {fest.month}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "rgba(255,255,255,0.65)",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Month
                      </div>
                    </div>
                  </div>
                  <a
                    href={fest.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      textDecoration: "none",
                      display: "inline-flex",
                      width: "fit-content",
                    }}
                    data-ocid={`campus_life.fests.${fest.name.toLowerCase()}.know_more_button`}
                  >
                    Know More →
                  </a>
                </div>
                <div
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.1)",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "6rem", lineHeight: 1 }}>
                      {fest.name === "Mindspark"
                        ? "⚡"
                        : fest.name === "Impressions"
                          ? "🎭"
                          : "🏆"}
                    </div>
                    <div
                      style={{
                        fontFamily: "Playfair Display,Georgia,serif",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: fest.accent,
                        marginTop: "0.75rem",
                      }}
                    >
                      {fest.name} {new Date().getFullYear()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ══════════════════════════════════════════════════════════════════════════
          6. STUDENT COUNCIL
      ══════════════════════════════════════════════════════════════════════════ */}
      <Section id="student-council" alt>
        <SectionTitle
          label="Governance"
          title="Student Council"
          subtitle="Student-led governance that bridges the community and the institution."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          <div className="animate-on-scroll">
            <p
              style={{
                color: C.body,
                lineHeight: 1.85,
                marginBottom: "1.25rem",
              }}
            >
              The COEP Tech Student Council is the apex body of student
              self-governance, representing over 12,000 students across all
              programs. Elected democratically each academic year, the council
              works closely with the administration to address student concerns,
              organize events, and foster a vibrant campus culture.
            </p>
            <p
              style={{
                color: C.body,
                lineHeight: 1.85,
                marginBottom: "1.75rem",
              }}
            >
              The General Council oversees all student clubs, manages the annual
              budget for student activities, and coordinates with various
              academic and administrative bodies to ensure the holistic welfare
              of students.
            </p>
            <div
              style={{
                background: `${C.cobalt}08`,
                border: `1px solid ${C.cobalt}25`,
                borderRadius: "0.75rem",
                padding: "1.25rem",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: C.deepBlue,
                  marginBottom: "0.75rem",
                }}
              >
                Key Roles
              </div>
              {[
                "Representing student interests to administration",
                "Organizing college-wide events and cultural fests",
                "Managing student welfare funds and scholarships",
                "Liaising with alumni and industry for student benefits",
                "Maintaining discipline and ragging-free environment",
              ].map((r) => (
                <div
                  key={r}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    padding: "0.35rem 0",
                    fontSize: "0.9rem",
                    color: C.body,
                    borderBottom: "1px solid rgba(22,72,200,0.1)",
                  }}
                >
                  <span
                    style={{
                      color: C.cobalt,
                      fontWeight: 700,
                      marginTop: "0.1rem",
                    }}
                  >
                    →
                  </span>{" "}
                  {r}
                </div>
              ))}
            </div>
          </div>
          <div className="animate-on-scroll">
            <h4
              style={{
                fontFamily: "Playfair Display,Georgia,serif",
                color: C.deepBlue,
                marginBottom: "1.25rem",
              }}
            >
              Current Council (2024–25)
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                {
                  role: "President",
                  name: "Arjun Patil",
                  branch: "Computer Engineering, 4th Year",
                  icon: "👑",
                },
                {
                  role: "Vice President",
                  name: "Priya Kulkarni",
                  branch: "Mechanical Engineering, 3rd Year",
                  icon: "🌟",
                },
                {
                  role: "Secretary",
                  name: "Rahul Deshmukh",
                  branch: "Electrical Engineering, 3rd Year",
                  icon: "📋",
                },
                {
                  role: "Cultural Secretary",
                  name: "Anjali Joshi",
                  branch: "ENTC, 2nd Year",
                  icon: "🎭",
                },
                {
                  role: "Sports Secretary",
                  name: "Akshay Shinde",
                  branch: "Civil Engineering, 3rd Year",
                  icon: "🏆",
                },
                {
                  role: "Technical Secretary",
                  name: "Sneha More",
                  branch: "Computer Engineering, 2nd Year",
                  icon: "💻",
                },
              ].map((m) => (
                <div
                  key={m.role}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    background: "#fff",
                    borderRadius: "0.75rem",
                    padding: "0.85rem 1.25rem",
                    border: "1px solid #E5E7EB",
                    transition: "box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 4px 16px rgba(22,72,200,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "none";
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${C.cobalt}, ${C.deepBlue})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {m.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: C.deepBlue,
                        fontSize: "0.9rem",
                      }}
                    >
                      {m.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: C.muted,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {m.branch}
                    </div>
                  </div>
                  <span
                    style={{
                      background: `${C.cobalt}15`,
                      color: C.cobalt,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "0.25rem 0.65rem",
                      borderRadius: "2rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════════════
          7. ACHIEVEMENTS
      ══════════════════════════════════════════════════════════════════════════ */}
      <Section id="achievements">
        <SectionTitle
          label="Pride"
          title="Student Achievements"
          subtitle="COEP students excel in every arena — technical, cultural, sports, and academic."
        />
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {(Object.keys(ACHIEVEMENTS) as (keyof typeof ACHIEVEMENTS)[]).map(
            (cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setAchieveTab(cat)}
                data-ocid={`campus_life.achievements.${cat.toLowerCase()}.tab`}
                style={{
                  padding: "0.6rem 1.25rem",
                  border: `2px solid ${achieveTab === cat ? C.cobalt : "#E5E7EB"}`,
                  borderRadius: "2rem",
                  background: achieveTab === cat ? C.cobalt : "#fff",
                  color: achieveTab === cat ? "#fff" : C.muted,
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "Source Sans 3, sans-serif",
                }}
              >
                {cat}
              </button>
            ),
          )}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
            gap: "1.25rem",
          }}
          key={achieveTab}
        >
          {ACHIEVEMENTS[achieveTab].map((a, _i) => (
            <div
              key={a.title}
              className="card-elevated animate-on-scroll"
              style={{ padding: "1.5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    background: `${C.gold}25`,
                    color: C.midnight,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.6rem",
                    borderRadius: "2rem",
                  }}
                >
                  {a.award}
                </span>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: C.muted,
                    fontWeight: 600,
                  }}
                >
                  {a.year}
                </span>
              </div>
              <h5
                style={{
                  fontFamily: "Playfair Display,Georgia,serif",
                  color: C.deepBlue,
                  marginBottom: "0.5rem",
                  fontSize: "1rem",
                }}
              >
                {a.title}
              </h5>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: C.muted,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {a.desc}
              </p>
              <div
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.72rem",
                  color: C.cobalt,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                View Details →
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════════════
          8. STUDENT WELFARE
      ══════════════════════════════════════════════════════════════════════════ */}
      <Section id="student-welfare" alt>
        <SectionTitle
          label="Support"
          title="Student Support & Welfare"
          subtitle="Financial assistance and support systems for every student's journey."
        />
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "2px solid #E5E7EB",
            marginBottom: "2.5rem",
          }}
        >
          {(["Scholarships", "Education Loan"] as const).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setWelfareTab(t)}
              data-ocid={`campus_life.welfare.${t.toLowerCase().replace(/\s+/g, "_")}.tab`}
              style={{
                padding: "0.85rem 1.5rem",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "Source Sans 3, sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                borderBottom:
                  welfareTab === t
                    ? `2px solid ${C.cobalt}`
                    : "2px solid transparent",
                color: welfareTab === t ? C.cobalt : C.muted,
                marginBottom: "-2px",
                transition: "all 0.2s ease",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {welfareTab === "Scholarships" && (
          <div key="scholarships" className="animate-on-scroll">
            <div
              style={{
                marginBottom: "2.5rem",
                border: "1px solid #E5E7EB",
                borderRadius: "0.75rem",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: C.deepBlue }}>
                    {[
                      "Scholarship Name",
                      "Eligibility",
                      "Amount",
                      "Apply By",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "1rem 1.25rem",
                          textAlign: "left",
                          color: "#fff",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCHOLARSHIPS.map((s, i) => (
                    <tr
                      key={s.name}
                      style={{
                        background: i % 2 ? C.bg : "#fff",
                        borderTop: "1px solid #F3F4F6",
                      }}
                    >
                      <td
                        style={{
                          padding: "1rem 1.25rem",
                          fontWeight: 700,
                          color: C.deepBlue,
                          fontSize: "0.9rem",
                        }}
                      >
                        {s.name}
                      </td>
                      <td
                        style={{
                          padding: "1rem 1.25rem",
                          fontSize: "0.9rem",
                          color: C.body,
                        }}
                      >
                        {s.eligibility}
                      </td>
                      <td
                        style={{
                          padding: "1rem 1.25rem",
                          fontSize: "0.9rem",
                          color: "#059669",
                          fontWeight: 700,
                        }}
                      >
                        {s.amount}
                      </td>
                      <td
                        style={{
                          padding: "1rem 1.25rem",
                          fontSize: "0.9rem",
                          color: C.muted,
                        }}
                      >
                        {s.applyBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Application Form */}
            <div
              style={{
                background: "#fff",
                borderRadius: "1rem",
                padding: "2rem",
                border: "1px solid #E5E7EB",
                maxWidth: 640,
              }}
            >
              <h4
                style={{
                  fontFamily: "Playfair Display,Georgia,serif",
                  color: C.deepBlue,
                  marginBottom: "1.5rem",
                }}
              >
                Scholarship Application
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    label: "Full Name",
                    placeholder: "Enter full name",
                    id: "name",
                  },
                  {
                    label: "Roll Number",
                    placeholder: "e.g. 2021ME1234",
                    id: "roll",
                  },
                  {
                    label: "Program",
                    placeholder: "e.g. B.Tech",
                    id: "program",
                  },
                  {
                    label: "Department",
                    placeholder: "e.g. Mechanical Engineering",
                    id: "dept",
                  },
                ].map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={`scholarship-${f.id}`}
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: C.deepBlue,
                        marginBottom: "0.35rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      id={`scholarship-${f.id}`}
                      type="text"
                      placeholder={f.placeholder}
                      data-ocid={`campus_life.scholarship.${f.id}.input`}
                      style={{
                        width: "100%",
                        padding: "0.65rem 0.85rem",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.5rem",
                        fontSize: "0.9rem",
                        fontFamily: "Source Sans 3, sans-serif",
                        color: C.body,
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <label
                  htmlFor="scholarship-category"
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: C.deepBlue,
                    marginBottom: "0.35rem",
                  }}
                >
                  Scholarship Category
                </label>
                <select
                  id="scholarship-category"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    fontFamily: "Source Sans 3, sans-serif",
                    color: C.body,
                  }}
                  data-ocid="campus_life.scholarship.category.select"
                >
                  {SCHOLARSHIPS.map((s) => (
                    <option key={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <label
                  htmlFor="scholarship-documents"
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: C.deepBlue,
                    marginBottom: "0.35rem",
                  }}
                >
                  Upload Supporting Documents
                </label>
                <input
                  id="scholarship-documents"
                  type="file"
                  multiple
                  style={{ width: "100%", fontSize: "0.85rem" }}
                  data-ocid="campus_life.scholarship.documents.upload_button"
                />
              </div>
              <button
                type="button"
                className="btn-primary"
                style={{ marginTop: "1.5rem" }}
                data-ocid="campus_life.scholarship.submit_button"
              >
                Submit Application →
              </button>
            </div>
          </div>
        )}

        {welfareTab === "Education Loan" && (
          <div key="loan" className="animate-on-scroll">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                marginBottom: "2.5rem",
              }}
            >
              {[
                {
                  bank: "State Bank of India",
                  logo: "🏦",
                  btech: "Up to ₹20 Lakhs",
                  mtech: "Up to ₹30 Lakhs",
                  mba: "Up to ₹40 Lakhs",
                  rate: "8.65% p.a.",
                },
                {
                  bank: "Bank of Maharashtra",
                  logo: "🏛",
                  btech: "Up to ₹15 Lakhs",
                  mtech: "Up to ₹25 Lakhs",
                  mba: "Up to ₹35 Lakhs",
                  rate: "9.00% p.a.",
                },
                {
                  bank: "Canara Bank",
                  logo: "🏦",
                  btech: "Up to ₹20 Lakhs",
                  mtech: "Up to ₹30 Lakhs",
                  mba: "Up to ₹40 Lakhs",
                  rate: "8.90% p.a.",
                },
              ].map((b) => (
                <div
                  key={b.bank}
                  className="card-elevated"
                  style={{ padding: "1.5rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div style={{ fontSize: "2rem" }}>{b.logo}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: C.deepBlue }}>
                        {b.bank}
                      </div>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "#059669",
                          fontWeight: 700,
                        }}
                      >
                        Interest: {b.rate}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.5rem",
                    }}
                  >
                    {[
                      { label: "B.Tech", val: b.btech },
                      { label: "M.Tech/M.Plann", val: b.mtech },
                      { label: "MBA", val: b.mba },
                    ].map((l) => (
                      <div
                        key={l.label}
                        style={{
                          background: C.bg,
                          borderRadius: "0.5rem",
                          padding: "0.6rem 0.75rem",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: C.muted,
                            fontWeight: 600,
                          }}
                        >
                          {l.label}
                        </div>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: C.deepBlue,
                          }}
                        >
                          {l.val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: `${C.cobalt}08`,
                border: `1px solid ${C.cobalt}25`,
                borderRadius: "0.75rem",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: C.deepBlue,
                  marginBottom: "0.75rem",
                }}
              >
                📞 Financial Aid Office
              </div>
              <div style={{ fontSize: "0.9rem", color: C.body, lineHeight: 2 }}>
                Contact: Dr. Sunita Patil, Financial Aid Coordinator
                <br />
                Email: financialaid@coeptech.ac.in | Phone: +91-20-2550-7000
                (Ext. 3300)
                <br />
                Office Hours: Mon–Fri, 10:00 AM – 4:00 PM
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* ══════════════════════════════════════════════════════════════════════════
          9. DOWNLOADS & SERVICES
      ══════════════════════════════════════════════════════════════════════════ */}
      <Section id="downloads">
        <SectionTitle
          label="Services"
          title="Downloads & Services"
          subtitle="All forms, applications, and student services in one place."
        />
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {(["Certificates", "How to Apply", "Downloads"] as const).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setDlTab(t)}
              data-ocid={`campus_life.downloads.${t.toLowerCase().replace(/\s+/g, "_")}.tab`}
              style={{
                padding: "0.65rem 1.5rem",
                border: `2px solid ${dlTab === t ? C.cobalt : "#E5E7EB"}`,
                borderRadius: "2rem",
                background: dlTab === t ? C.cobalt : "#fff",
                color: dlTab === t ? "#fff" : C.muted,
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "Source Sans 3, sans-serif",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {dlTab === "Certificates" && (
          <div key="certs" className="animate-on-scroll">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
                gap: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              {[
                {
                  type: "Bonafide Certificate",
                  icon: "📄",
                  days: "3–5 working days",
                  desc: "Proof of enrollment at COEP Tech",
                },
                {
                  type: "Character Certificate",
                  icon: "🎖",
                  days: "5–7 working days",
                  desc: "Issued for employment and further studies",
                },
                {
                  type: "No Dues Certificate",
                  icon: "✅",
                  days: "10 working days",
                  desc: "Clearance from all university departments",
                },
                {
                  type: "Transfer Certificate",
                  icon: "🔄",
                  days: "7–10 working days",
                  desc: "For students transferring to another institution",
                },
                {
                  type: "Migration Certificate",
                  icon: "📜",
                  days: "10–15 working days",
                  desc: "For migration to other universities",
                },
              ].map((c) => (
                <div
                  key={c.type}
                  className="card-elevated"
                  style={{ padding: "1.25rem" }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    {c.icon}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: C.deepBlue,
                      marginBottom: "0.35rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {c.type}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: C.muted,
                      marginBottom: "0.75rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {c.desc}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      background: `${C.gold}20`,
                      color: C.midnight,
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.25rem",
                      display: "inline-block",
                      fontWeight: 600,
                    }}
                  >
                    ⏱ {c.days}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: `linear-gradient(135deg, ${C.deepBlue}, ${C.cobalt})`,
                borderRadius: "1rem",
                padding: "2rem 2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: "Playfair Display,Georgia,serif",
                    color: "#fff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Apply for Certificate Online
                </h4>
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.9rem",
                    margin: 0,
                  }}
                >
                  Submit your application digitally. Collect in person or
                  receive by post.
                </p>
              </div>
              <button
                type="button"
                className="btn-primary"
                data-ocid="campus_life.certificates.apply_button"
              >
                Apply Online →
              </button>
            </div>
          </div>
        )}

        {dlTab === "How to Apply" && (
          <div key="howto" className="animate-on-scroll">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
              }}
            >
              {[
                {
                  title: "Application for Hostel",
                  steps: [
                    "Fill online hostel form",
                    "Submit to hostel office",
                    "Allotment based on merit + distance",
                    "Pay hostel fees within 7 days",
                    "Collect room keys and handbook",
                  ],
                },
                {
                  title: "Application for Scholarship",
                  steps: [
                    "Check eligibility criteria",
                    "Gather required documents",
                    "Fill online application",
                    "Submit to scholarship committee",
                    "Receive confirmation within 15 days",
                  ],
                },
                {
                  title: "Application for NOC",
                  steps: [
                    "Apply online with reason",
                    "Department HOD approval required",
                    "Administration verification",
                    "Collection from administrative office",
                    "Valid for 6 months from issue date",
                  ],
                },
                {
                  title: "Application for Transcript",
                  steps: [
                    "Submit form with attested documents",
                    "Pay fee of ₹500 per transcript",
                    "Verification by examination board",
                    "Transcript prepared and sealed",
                    "Collect in person or by courier",
                  ],
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="card-elevated"
                  style={{ padding: "1.5rem" }}
                >
                  <h5
                    style={{
                      fontFamily: "Playfair Display,Georgia,serif",
                      color: C.deepBlue,
                      marginBottom: "1rem",
                    }}
                  >
                    {item.title}
                  </h5>
                  <ol style={{ paddingLeft: "1.25rem", margin: 0 }}>
                    {item.steps.map((s) => (
                      <li
                        key={s}
                        style={{
                          fontSize: "0.88rem",
                          color: C.body,
                          lineHeight: 1.7,
                          paddingLeft: "0.25rem",
                        }}
                      >
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        )}

        {dlTab === "Downloads" && (
          <div key="downloads" className="animate-on-scroll">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
                gap: "1rem",
              }}
            >
              {DOWNLOADS_LIST.map((d) => (
                <a
                  key={d.name}
                  href="https://coeptech.ac.in/downloads"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    background: "#fff",
                    borderRadius: "0.75rem",
                    padding: "1.1rem 1.25rem",
                    border: "1px solid #E5E7EB",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      C.cobalt;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 4px 16px rgba(22,72,200,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "#E5E7EB";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "none";
                  }}
                  data-ocid={`campus_life.downloads.${d.name.toLowerCase().replace(/[\s–]+/g, "_")}.link`}
                >
                  <span style={{ fontSize: "1.6rem" }}>{d.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: C.deepBlue,
                        fontSize: "0.88rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {d.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: C.muted,
                        marginTop: "0.2rem",
                      }}
                    >
                      {d.type} Document
                    </div>
                  </div>
                  <span style={{ fontSize: "1rem", color: C.cobalt }}>↓</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Footer />
    </Layout>
  );
}
