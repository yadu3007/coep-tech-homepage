import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { UniversityTabsSection } from "../components/UniversityTabsSection";
import { ResearchDeptPage } from "./ResearchDeptPage";
import { ResearchHero } from "./ResearchHero";
import { ResearchMain } from "./ResearchMain";

// ─── Brand colours ─────────────────────────────────────────────────────────────
export const RC = {
  cobalt: "#1648C8",
  deepBlue: "#0F3499",
  midnight: "#081E5C",
  gold: "#E8C42A",
  white: "#ffffff",
  bodyText: "#1a2340",
  mutedText: "#4B5563",
} as const;

// ─── Tab definitions ────────────────────────────────────────────────────────────
export const RESEARCH_TABS = [
  { id: "overview", label: "Overview" },
  { id: "people", label: "People & Community" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "output", label: "Research Output" },
  { id: "projects", label: "Projects" },
  { id: "funding", label: "Funding" },
] as const;

export type ResearchTabId = (typeof RESEARCH_TABS)[number]["id"];

// ─── Scroll-reveal hook ─────────────────────────────────────────────────────────
export function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Count-up hook ──────────────────────────────────────────────────────────────
export function useCountUp(target: number, duration = 2000, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - prog) ** 3;
      setValue(Math.round(eased * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

// ─── Stats bar ──────────────────────────────────────────────────────────────────
const STATS = [
  { value: 250, suffix: "+", label: "Publications" },
  { value: 120, suffix: "+", label: "Active Projects" },
  { value: 75, suffix: "+", label: "Patents Filed" },
  { value: 50, suffix: "+", label: "Collaborations" },
];

function StatItem({
  stat,
  active,
}: { stat: (typeof STATS)[0]; active: boolean }) {
  const num = useCountUp(stat.value, 2000, active);
  return (
    <div className="flex flex-col items-center gap-1 px-8 py-6 group">
      <span
        className="text-5xl font-bold transition-transform duration-300 group-hover:scale-110"
        style={{ color: RC.gold, fontFamily: "'Playfair Display', serif" }}
      >
        {num}
        {stat.suffix}
      </span>
      <span className="text-sm tracking-widest uppercase text-white/70 font-body">
        {stat.label}
      </span>
    </div>
  );
}

function StatsBar() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className="w-full"
      style={{ background: RC.deepBlue, borderTop: `3px solid ${RC.gold}` }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
        {STATS.map((s) => (
          <StatItem key={s.label} stat={s} active={visible} />
        ))}
      </div>
    </div>
  );
}

// ─── Sticky Research Ribbon ─────────────────────────────────────────────────────
function ResearchRibbon({
  activeTab,
  onTabChange,
}: {
  activeTab: ResearchTabId;
  onTabChange: (id: ResearchTabId) => void;
}) {
  return (
    <div
      className="sticky z-30 top-0 w-full shadow-lg"
      style={{ background: RC.deepBlue }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-0 overflow-x-auto no-scrollbar">
        {/* Title */}
        <div
          className="shrink-0 pr-6 py-3 border-r border-white/20 mr-2"
          style={{
            color: RC.gold,
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.95rem",
            letterSpacing: "0.02em",
          }}
        >
          Research &amp; Innovation
        </div>
        {/* Tabs */}
        {RESEARCH_TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              data-ocid={`research.${tab.id}.tab`}
              onClick={() => onTabChange(tab.id)}
              type="button"
              className="relative shrink-0 px-4 py-3.5 text-sm font-medium transition-all duration-200"
              style={{
                color: isActive ? RC.gold : "rgba(255,255,255,0.75)",
                fontFamily: "'Source Sans 3', sans-serif",
                background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                borderBottom: isActive
                  ? `2px solid ${RC.gold}`
                  : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Research Page ──────────────────────────────────────────────────────────────
export function ResearchPage() {
  const [activeTab, setActiveTab] = useState<ResearchTabId>("overview");

  // Check for department sub-route
  const hash = window.location.hash.replace("#", "") || "/";
  const deptMatch = hash.match(/^\/research\/department\/(.+)$/);
  const deptSlug = deptMatch ? deptMatch[1] : null;

  const handleTabChange = (id: ResearchTabId) => {
    setActiveTab(id);
    const el = document.getElementById("research-main-content");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (deptSlug) {
    return (
      <Layout>
        <Header />
        <UniversityTabsSection />
        <ResearchDeptPage slug={deptSlug} />
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <UniversityTabsSection />

      {/* Sticky ribbon — sits right below the main header/nav */}
      <ResearchRibbon activeTab={activeTab} onTabChange={handleTabChange} />

      <main style={{ background: "#f8f9fc", minHeight: "60vh" }}>
        {/* Hero */}
        <ResearchHero />

        {/* Stats */}
        <StatsBar />

        {/* Main tabbed content */}
        <div id="research-main-content">
          <ResearchMain activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Information For section */}
        <InfoForSection />
      </main>

      <Footer />
    </Layout>
  );
}

// ─── Information For section ────────────────────────────────────────────────────
const INFO_TABS = [
  "Researchers",
  "Students",
  "Industry",
  "Faculty",
  "Administrators",
] as const;
type InfoTab = (typeof INFO_TABS)[number];

const INFO_CONTENT: Record<InfoTab, { heading: string; points: string[] }> = {
  Researchers: {
    heading: "For Research Community",
    points: [
      "Access state-of-the-art laboratories across all departments — submit a lab access request through the RIIL portal.",
      "Submit publications to internal review before journal submission — use the Research Management System (RMS) at rms.coeptech.ac.in.",
      "File patents with IPR Cell support. The team provides end-to-end guidance from drafting to grant.",
      "Apply for travel grants to present at international conferences — up to ₹1,00,000 per event.",
      "Collaborate across departments through the Interdisciplinary Research Initiative (IRI) open calls each semester.",
    ],
  },
  Students: {
    heading: "For Students",
    points: [
      "Join active research projects as a research assistant — check open positions on the Research Bulletin Board.",
      "Apply for UG/PG research fellowships (stipend ₹5,000–₹15,000/month) through COEP-IRS programme.",
      "PhD applications open twice a year — January and July intake. Entrance through GATE/NET scores.",
      "Access 50,000+ journals through the COEP E-Resources portal, including IEEE Xplore, Springer, and Elsevier.",
      "Participate in COEP Hackathons, Innovation Challenges and present at the annual Research Conclave.",
    ],
  },
  Industry: {
    heading: "For Industry Partners",
    points: [
      "Sponsor research projects aligned with your R&D roadmap — minimum engagement ₹10 Lakhs with IP co-ownership options.",
      "Sign an MOU for long-term academic-industry partnership — access to student talent pipeline and joint publications.",
      "Place industry problem statements for project-based learning with third and final year engineering students.",
      "Use COEP testing & certification facilities including NABL-accredited labs for material and component testing.",
      "Contact industry-liaison@coeptech.ac.in or call +91 20 2550 7042 to start a conversation.",
    ],
  },
  Faculty: {
    heading: "For Faculty Members",
    points: [
      "Apply for institute seed grants (₹2–5 Lakhs) to initiate new research directions — two cycles annually.",
      "Access publication support through the Research Development Cell — APC reimbursement available for Q1/Q2 journals.",
      "Sabbatical and study leave policies allow extended research residencies at partner universities.",
      "Submit proposals for externally-funded projects (DST, SERB, DRDO, CSIR) with pre-award administrative support.",
      "Research performance metrics contribute to ACR and promotion criteria from Associate to Professor.",
    ],
  },
  Administrators: {
    heading: "For Administrators",
    points: [
      "Access the Research Compliance Portal for ethics committee submissions and approval tracking.",
      "Financial reporting for sponsored projects follows UGC/DST guidelines — templates available in the Finance Division.",
      "Annual Research Report compilation deadline: March 31 — submit data through the online reporting system.",
      "Maintain project-wise utilisation certificates and audited statements for funding agencies.",
      "For policy enquiries, contact the Dean of Research office: research-admin@coeptech.ac.in.",
    ],
  },
};

function InfoForSection() {
  const [active, setActive] = useState<InfoTab>("Researchers");
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.1);
  const content = INFO_CONTENT[active];

  return (
    <section
      ref={ref}
      className="py-20 px-4"
      style={{
        background: `linear-gradient(135deg, ${RC.midnight} 0%, ${RC.deepBlue} 100%)`,
      }}
    >
      <div
        className={`max-w-5xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <p
          className="text-sm tracking-widest uppercase mb-2 font-body"
          style={{ color: RC.gold }}
        >
          Resources
        </p>
        <h2
          className="text-3xl font-bold mb-8"
          style={{ color: RC.white, fontFamily: "'Playfair Display', serif" }}
        >
          Information For…
        </h2>

        {/* Horizontal nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {INFO_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              data-ocid={`research.info.${tab.toLowerCase()}.tab`}
              onClick={() => setActive(tab)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: active === tab ? RC.gold : "rgba(255,255,255,0.08)",
                color: active === tab ? RC.midnight : "rgba(255,255,255,0.8)",
                fontFamily: "'Source Sans 3', sans-serif",
                border:
                  active === tab ? "none" : "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          key={active}
          className="transition-all duration-300"
          style={{ animation: "fadeInUp 0.4s ease forwards" }}
        >
          <h3
            className="text-xl font-semibold mb-6"
            style={{ color: RC.gold, fontFamily: "'Playfair Display', serif" }}
          >
            {content.heading}
          </h3>
          <ul className="space-y-4">
            {content.points.map((pt) => (
              <li key={pt.slice(0, 40)} className="flex gap-3 items-start">
                <span
                  className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: RC.gold, color: RC.midnight }}
                >
                  ✓
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "'Source Sans 3', sans-serif",
                    lineHeight: "1.7",
                  }}
                >
                  {pt}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
