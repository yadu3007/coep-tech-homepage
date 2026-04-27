import {
  BookOpen,
  Building,
  ChevronRight,
  Computer,
  Dumbbell,
  GraduationCap,
  Heart,
  Home,
  Menu,
  Shield,
  UtensilsCrossed,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { UniversityTabsSection } from "../components/UniversityTabsSection";

// ─── Brand colours ─────────────────────────────────────────────────────────────
const C = {
  cobalt: "#1648C8",
  deepBlue: "#0F3499",
  midnight: "#081E5C",
  gold: "#E8C42A",
  white: "#ffffff",
  body: "#374151",
  muted: "#6B7280",
  bg: "#F4F7FF",
  bgAlt: "#EEF2FF",
} as const;

// ─── Scroll reveal hook ─────────────────────────────────────────────────────────
function useReveal<T extends HTMLElement>(threshold = 0.1) {
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

// ─── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1600, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - prog) ** 3;
      setValue(Math.floor(eased * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

// ─── Facility section IDs (for nav) ───────────────────────────────────────────
const FACILITY_NAV = [
  { id: "krc", label: "Knowledge Resource Center", icon: BookOpen },
  { id: "bis", label: "BIS Dashboard", icon: Shield },
  { id: "nss", label: "NSS", icon: GraduationCap },
  { id: "sports", label: "Sports Facilities", icon: Dumbbell },
  { id: "hostel", label: "Hostel Facilities", icon: Home },
  { id: "computing", label: "Computing & Labs", icon: Computer },
  { id: "medical", label: "Medical Center", icon: Heart },
  { id: "canteen", label: "Canteen & Dining", icon: UtensilsCrossed },
] as const;

type FacilityId = (typeof FACILITY_NAV)[number]["id"];

// ─── KRC sub-tabs ──────────────────────────────────────────────────────────────
const KRC_TABS = [
  "About KRC",
  "E-Resources",
  "Databases",
  "OPAC",
  "New Additions",
  "Open Access",
  "Rules",
  "Feedback",
] as const;

// ─── Stats data ────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Books & Journals", value: 80000, suffix: "+" },
  { label: "Computers", value: 500, suffix: "+" },
  { label: "Hostel Seats", value: 2400, suffix: "+" },
  { label: "Internet Speed", value: 1, suffix: " Gbps" },
  { label: "Acres Campus", value: 17, suffix: "" },
  { label: "Sports Facilities", value: 12, suffix: "+" },
];

// ─── Visual placeholder component ─────────────────────────────────────────────
function FacilityVisual({
  gradient,
  icon: Icon,
  label,
  className = "",
}: {
  gradient: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden relative flex flex-col items-center justify-center ${className}`}
      style={{
        background: gradient,
        minHeight: 320,
        boxShadow: "0 20px 60px rgba(8,30,92,0.25)",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <Icon size={64} color="rgba(255,255,255,0.6)" />
      <p
        className="mt-4 text-sm tracking-widest uppercase font-semibold"
        style={{
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {label}
      </p>
    </div>
  );
}

// ─── Section title component ───────────────────────────────────────────────────
function SectionTitle({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="block w-10 h-1 rounded-full"
          style={{ background: C.gold }}
        />
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{
            color: light ? C.gold : C.cobalt,
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          COEP Facilities
        </span>
      </div>
      <h2
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: light ? C.white : C.deepBlue,
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontWeight: 800,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-3 text-base leading-relaxed max-w-2xl"
          style={{
            color: light ? "rgba(255,255,255,0.8)" : C.muted,
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── KRC Section ───────────────────────────────────────────────────────────────
function KRCSection() {
  const [activeTab, setActiveTab] = useState<string>("About KRC");
  const { ref, visible } = useReveal<HTMLDivElement>();

  const tabContent: Record<string, { title: string; body: string }> = {
    "About KRC": {
      title: "About Knowledge Resource Center",
      body: "The Knowledge Resource Center (KRC) is the intellectual heart of COEP Technological University. Spread across a state-of-the-art building, it houses over 80,000 books, journals, and periodicals covering all branches of engineering, science, and management. The KRC provides a serene and conducive environment for research, study, and self-improvement with open-shelf access, reference services, and bibliographic assistance.",
    },
    "E-Resources": {
      title: "E-Resources Portal",
      body: "COEP's E-Resources portal offers seamless access to thousands of online journals, e-books, and digital databases. Through subscriptions to NPTEL, IEEE Xplore, ScienceDirect, Springer, and DELNET, students and faculty can access cutting-edge research and academic content from anywhere on campus via the university intranet.",
    },
    Databases: {
      title: "Research Databases",
      body: "The KRC subscribes to premium academic databases including IEEE Xplore (engineering & technology), Elsevier ScienceDirect (science & technology), Springer Link (multidisciplinary), and DELNET (inter-library loan network). These resources cover millions of full-text articles, conference papers, and book chapters.",
    },
    OPAC: {
      title: "Online Public Access Catalogue",
      body: "The Online Public Access Catalogue (OPAC) enables students and faculty to search the entire collection of the KRC from any computer on campus. Users can search by title, author, subject, or keyword, and check availability, reserve books, and track their borrowing history in real time.",
    },
    "New Additions": {
      title: "New Additions",
      body: "The KRC regularly updates its collection with the latest textbooks, reference materials, and research publications across all departments. A dedicated 'New Arrivals' display shelf showcases the freshest additions each month, ensuring students have access to the most current technical knowledge.",
    },
    "Open Access": {
      title: "Open Access Resources",
      body: "COEP KRC champions open-access research. Students and faculty can access thousands of freely available peer-reviewed journals through platforms like DOAJ (Directory of Open Access Journals), arXiv, PubMed Central, and the National Digital Library of India (NDLI). These platforms democratise access to world-class research.",
    },
    Rules: {
      title: "Library Rules & Regulations",
      body: "Library members are entitled to borrow books as per their category (UG: 3 books, PG: 5 books, Faculty: 10 books). Books are issued for 14 days and may be renewed online or in person if not reserved. Silence must be maintained in the reading room. No bags are permitted beyond the security gate; use the cloak room provided.",
    },
    Feedback: {
      title: "Feedback & Suggestions",
      body: "The KRC values user feedback to continuously improve its services and collection. Students and faculty are encouraged to suggest new titles for acquisition, report damaged materials, or propose improvements to library services through the online feedback form available at the KRC front desk or via the library portal.",
    },
  };

  const current = tabContent[activeTab];

  return (
    <section id="krc" className="py-20" style={{ background: C.bg }}>
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid lg:grid-cols-2 gap-14 items-start mb-14">
            {/* Visual left */}
            <FacilityVisual
              gradient={`linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 60%, ${C.cobalt} 100%)`}
              icon={BookOpen}
              label="Knowledge Resource Center"
              className="lg:sticky top-32"
            />
            {/* Info right */}
            <div>
              <SectionTitle
                title="Knowledge Resource Center"
                subtitle="Your gateway to world-class academic resources — 80,000+ books, journals, and digital databases at your fingertips."
              />
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Books & Journals", value: "80,000+" },
                  { label: "E-Databases", value: "15+" },
                  { label: "Daily Visitors", value: "500+" },
                  { label: "Seating Capacity", value: "300+" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-4"
                    style={{
                      background: C.bgAlt,
                      border: `1px solid ${C.cobalt}22`,
                    }}
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: C.cobalt,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-xs mt-1 uppercase tracking-wider"
                      style={{
                        color: C.muted,
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KRC sub-tabs */}
          <div>
            <div
              className="flex flex-wrap gap-2 mb-6 p-1 rounded-xl"
              style={{ background: C.bgAlt }}
            >
              {KRC_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  data-ocid={`krc.tab.${tab.toLowerCase().replace(/\s+/g, "_")}`}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    background: activeTab === tab ? C.cobalt : "transparent",
                    color: activeTab === tab ? C.white : C.body,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div
              className="rounded-2xl p-8 transition-all duration-300"
              style={{
                background: C.white,
                border: `1px solid ${C.cobalt}18`,
                boxShadow: "0 4px 24px rgba(22,72,200,0.07)",
              }}
            >
              <h4
                className="mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: C.deepBlue,
                  fontSize: "1.25rem",
                  fontWeight: 700,
                }}
              >
                {current.title}
              </h4>
              <p
                style={{
                  color: C.body,
                  fontFamily: "'Source Sans 3', sans-serif",
                  lineHeight: 1.75,
                }}
              >
                {current.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BIS Dashboard Section ──────────────────────────────────────────────────────
function BISSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="bis" className="py-20" style={{ background: C.white }}>
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-14 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Text left */}
          <div>
            <SectionTitle
              title="BIS Dashboard"
              subtitle="Comprehensive access to Bureau of Indian Standards — national and international standards for technical excellence."
            />
            <div
              className="space-y-4"
              style={{
                color: C.body,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <p className="leading-relaxed">
                COEP Technological University provides its students and faculty
                with access to the Bureau of Indian Standards (BIS) dashboard —
                a comprehensive digital portal covering over 20,000 Indian
                Standards (IS) across all engineering and scientific
                disciplines.
              </p>
              <p className="leading-relaxed">
                Through the BIS portal, students can access standards relevant
                to civil, mechanical, electrical, chemical, and computer
                engineering. This ensures that academic projects and research
                adhere to industry-standard specifications, preparing students
                for professional practice from day one.
              </p>
              <ul className="space-y-2 mt-4">
                {[
                  "20,000+ Indian Standards (IS) accessible",
                  "ISO, IEC, and ASTM cross-references",
                  "Standards for all engineering disciplines",
                  "Regular updates with latest revisions",
                  "Full-text PDF access for registered users",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ChevronRight
                      size={16}
                      style={{ color: C.cobalt, marginTop: 4, flexShrink: 0 }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://www.bis.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 btn-primary"
                data-ocid="bis.visit_button"
              >
                Access BIS Dashboard <ChevronRight size={16} />
              </a>
            </div>
          </div>
          {/* Visual right */}
          <FacilityVisual
            gradient={`linear-gradient(135deg, #1a3a6b 0%, ${C.cobalt} 50%, #2563eb 100%)`}
            icon={Shield}
            label="Bureau of Indian Standards"
          />
        </div>
      </div>
    </section>
  );
}

// ─── NSS Section ───────────────────────────────────────────────────────────────
function NSSSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const activities = [
    {
      title: "Blood Donation Camps",
      desc: "Bi-annual blood donation drives in collaboration with Sassoon Hospital, contributing 200+ units each year.",
    },
    {
      title: "Tree Plantation Drives",
      desc: "Annual plantation drives on campus and nearby areas as part of environmental sustainability initiatives.",
    },
    {
      title: "Village Adoption",
      desc: "NSS volunteers work with adopted villages for cleanliness, digital literacy, and health awareness programs.",
    },
    {
      title: "Disaster Relief",
      desc: "Trained NSS volunteers assist in flood relief, earthquake preparedness, and community resilience activities.",
    },
    {
      title: "Republic Day Camp",
      desc: "Selected NSS volunteers represent COEP at the state and national NSS Republic Day parade.",
    },
    {
      title: "Skill Development",
      desc: "Workshops on first aid, road safety, and disaster management conducted for students and community members.",
    },
  ];
  return (
    <section id="nss" className="py-20" style={{ background: C.bg }}>
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-14">
            {/* Visual left */}
            <FacilityVisual
              gradient="linear-gradient(135deg, #166534 0%, #15803d 50%, #16a34a 100%)"
              icon={GraduationCap}
              label="National Service Scheme"
            />
            {/* Text right */}
            <div>
              <SectionTitle
                title="National Service Scheme"
                subtitle="Shaping engineers with social conscience — NSS at COEP bridges academic excellence with community responsibility."
              />
              <div
                className="space-y-4"
                style={{
                  color: C.body,
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <p className="leading-relaxed">
                  The NSS unit at COEP Technological University, established in
                  1969, has been at the forefront of community service, social
                  development, and environmental sustainability. With over 300
                  active volunteers each academic year, COEP NSS undertakes
                  impactful projects that touch thousands of lives.
                </p>
                <div className="grid grid-cols-3 gap-3 my-4">
                  {[
                    { label: "Active Volunteers", val: "300+" },
                    { label: "Camps Conducted", val: "50+" },
                    { label: "Villages Adopted", val: "5" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="text-center rounded-xl p-3"
                      style={{
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <div
                        className="text-xl font-bold"
                        style={{ color: "#166534" }}
                      >
                        {s.val}
                      </div>
                      <div className="text-xs mt-1" style={{ color: C.muted }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Activities grid */}
          <div>
            <h3
              className="text-center mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: C.deepBlue,
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              NSS Activities & Initiatives
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activities.map((act, i) => (
                <div
                  key={act.title}
                  data-ocid={`nss.activity.${i + 1}`}
                  className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: C.white,
                    border: "1px solid #bbf7d0",
                    boxShadow: "0 2px 12px rgba(22,101,52,0.08)",
                  }}
                >
                  <h5
                    className="mb-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "#166534",
                      fontSize: "1rem",
                    }}
                  >
                    {act.title}
                  </h5>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: C.muted,
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {act.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sports Section ─────────────────────────────────────────────────────────────
function SportsSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const sports = [
    {
      name: "Cricket Ground",
      desc: "Full-size turf cricket ground with practice nets",
      icon: "🏏",
    },
    {
      name: "Basketball Court",
      desc: "2 outdoor and 1 indoor basketball courts",
      icon: "🏀",
    },
    {
      name: "Football Ground",
      desc: "FIFA-standard football ground with floodlights",
      icon: "⚽",
    },
    {
      name: "Badminton Courts",
      desc: "6 indoor courts with professional flooring",
      icon: "🏸",
    },
    {
      name: "Table Tennis",
      desc: "8 TT tables in a dedicated indoor hall",
      icon: "🏓",
    },
    {
      name: "Gymnasium",
      desc: "Fully equipped gym with cardio and strength training",
      icon: "🏋️",
    },
    {
      name: "Volleyball Court",
      desc: "Outdoor volleyball courts with sand surface",
      icon: "🏐",
    },
    {
      name: "Athletics Track",
      desc: "400m running track with synthetic surface",
      icon: "🏃",
    },
  ];
  return (
    <section id="sports" className="py-20" style={{ background: C.white }}>
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-14">
            {/* Text left */}
            <div>
              <SectionTitle
                title="Sports Facilities"
                subtitle="Nurturing champions on and off the field — COEP's sports infrastructure caters to every athletic aspiration."
              />
              <div
                className="space-y-3"
                style={{
                  color: C.body,
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <p className="leading-relaxed">
                  COEP Technological University firmly believes in holistic
                  development. The sprawling 17-acre campus provides ample space
                  for a wide variety of indoor and outdoor sports facilities,
                  catering to students across all levels of expertise — from
                  recreational to competitive.
                </p>
                <p className="leading-relaxed">
                  The Annual Sports Meet, held every January, draws
                  participation from all departments and serves as a platform
                  for students to showcase their athletic talent. COEP students
                  have won gold medals at inter-university and national-level
                  competitions in cricket, athletics, and chess.
                </p>
                <div
                  className="mt-4 p-4 rounded-xl"
                  style={{
                    background: "#fffbeb",
                    border: `1px solid ${C.gold}44`,
                  }}
                >
                  <p
                    className="text-sm font-semibold"
                    style={{ color: C.midnight }}
                  >
                    🏆 Annual Sports Meet — January each year.
                    Inter-departmental competitions across 15+ sports.
                  </p>
                </div>
              </div>
            </div>
            {/* Visual right */}
            <FacilityVisual
              gradient="linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4f46e5 100%)"
              icon={Dumbbell}
              label="Sports & Athletics"
            />
          </div>
          {/* Sports grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sports.map((s, i) => (
              <div
                key={s.name}
                data-ocid={`sports.facility.${i + 1}`}
                className="rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
                  border: "1px solid #ddd6fe",
                }}
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <h5
                  className="font-bold mb-1"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#4f46e5",
                    fontSize: "1rem",
                  }}
                >
                  {s.name}
                </h5>
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: C.muted,
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Hostel Section ─────────────────────────────────────────────────────────────
function HostelSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const hostels = [
    {
      name: "Nilgiris Hostel",
      type: "Boys",
      capacity: "~500 seats",
      year: "1960s",
      amenities: ["WiFi", "Canteen", "Common Room", "Laundry"],
    },
    {
      name: "Sahyadri Hostel",
      type: "Boys",
      capacity: "~450 seats",
      year: "1970s",
      amenities: ["WiFi", "Reading Room", "Indoor Games", "Canteen"],
    },
    {
      name: "Aravalli Hostel",
      type: "Boys",
      capacity: "~400 seats",
      year: "1980s",
      amenities: ["WiFi", "TV Room", "Gymnasium", "Canteen"],
    },
    {
      name: "Vindhya Hostel",
      type: "Boys",
      capacity: "~350 seats",
      year: "2000s",
      amenities: ["WiFi", "Canteen", "ATM", "Medical Aid"],
    },
    {
      name: "Himgiri Hostel",
      type: "Boys",
      capacity: "~300 seats",
      year: "2010s",
      amenities: ["WiFi", "Canteen", "Security 24/7", "CCTV"],
    },
    {
      name: "Padmavati Hostel",
      type: "Girls",
      capacity: "~400 seats",
      year: "2005",
      amenities: ["WiFi", "Mess", "Security 24/7", "Common Room"],
    },
  ];
  return (
    <section id="hostel" className="py-20" style={{ background: C.bg }}>
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-14">
            {/* Visual left */}
            <FacilityVisual
              gradient={`linear-gradient(135deg, ${C.midnight} 0%, #0e4d8f 60%, ${C.cobalt} 100%)`}
              icon={Home}
              label="Hostel Facilities"
            />
            {/* Text right */}
            <div>
              <SectionTitle
                title="Hostel Facilities"
                subtitle="A home away from home — safe, comfortable, and well-equipped residential facilities for all students."
              />
              <div
                className="space-y-3"
                style={{
                  color: C.body,
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <p className="leading-relaxed">
                  COEP Technological University provides on-campus hostel
                  accommodation for both boys and girls. With 5 boys' hostels
                  (combined capacity ~2,000 seats) and 1 girls' hostel (~400
                  seats), the university ensures safe, comfortable, and
                  affordable housing for outstation students.
                </p>
                <div className="grid grid-cols-2 gap-3 my-4">
                  {[
                    { label: "Boys' Hostels", val: "5" },
                    { label: "Girls' Hostel", val: "1" },
                    { label: "Total Seats", val: "2,400+" },
                    { label: "WiFi Coverage", val: "100%" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: C.bgAlt,
                        border: `1px solid ${C.cobalt}18`,
                      }}
                    >
                      <div
                        className="text-xl font-bold"
                        style={{
                          color: C.cobalt,
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        {s.val}
                      </div>
                      <div className="text-xs mt-1" style={{ color: C.muted }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "WiFi",
                    "24/7 Security",
                    "Canteen",
                    "Laundry",
                    "CCTV",
                    "Medical Aid",
                    "Common Room",
                  ].map((a) => (
                    <span
                      key={a}
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{
                        background: `${C.cobalt}12`,
                        color: C.cobalt,
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Hostel cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hostels.map((h, i) => (
              <div
                key={h.name}
                data-ocid={`hostel.card.${i + 1}`}
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  background: C.white,
                  border: `1px solid ${C.cobalt}14`,
                  boxShadow: "0 4px 20px rgba(22,72,200,0.07)",
                }}
              >
                <div
                  className="h-2"
                  style={{
                    background:
                      h.type === "Girls"
                        ? "linear-gradient(90deg, #ec4899, #f43f5e)"
                        : `linear-gradient(90deg, ${C.cobalt}, ${C.deepBlue})`,
                  }}
                />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5
                        className="font-bold"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: C.deepBlue,
                          fontSize: "1rem",
                        }}
                      >
                        {h.name}
                      </h5>
                      <p
                        className="text-xs mt-0.5"
                        style={{
                          color: C.muted,
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                      >
                        Est. {h.year}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-bold"
                      style={{
                        background:
                          h.type === "Girls" ? "#fce7f3" : `${C.cobalt}12`,
                        color: h.type === "Girls" ? "#be185d" : C.cobalt,
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      {h.type}
                    </span>
                  </div>
                  <p
                    className="text-sm font-semibold mb-3"
                    style={{
                      color: C.cobalt,
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    Capacity: {h.capacity}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {h.amenities.map((a) => (
                      <span
                        key={a}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          background: "#f1f5ff",
                          color: C.body,
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Computing & Labs Section ───────────────────────────────────────────────────
function ComputingSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const software = [
    "MATLAB",
    "ANSYS",
    "CATIA",
    "SolidWorks",
    "AutoCAD",
    "STAAD Pro",
    "ETABS",
    "Simulink",
    "LabVIEW",
    "Eclipse IDE",
    "IntelliJ IDEA",
    "Abaqus",
  ];
  const labs = [
    {
      dept: "Computer Engineering",
      count: 4,
      focus: "Programming, Data Structures, Networks, AI/ML",
    },
    {
      dept: "Mechanical Engineering",
      count: 6,
      focus: "CAD/CAM, Fluid Mechanics, Thermal, Metrology",
    },
    {
      dept: "Civil Engineering",
      count: 5,
      focus: "Structural Analysis, Geotechnical, Surveying, Concrete",
    },
    {
      dept: "ENTC Engineering",
      count: 5,
      focus: "VLSI, Embedded Systems, Signal Processing, Communications",
    },
    {
      dept: "Chemical Engineering",
      count: 4,
      focus: "Process Control, Reaction Engineering, Separation",
    },
    {
      dept: "Metallurgy & Materials",
      count: 3,
      focus: "Materials Characterisation, Heat Treatment, Powder Metallurgy",
    },
  ];
  return (
    <section id="computing" className="py-20" style={{ background: C.white }}>
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-14">
            {/* Text left */}
            <div>
              <SectionTitle
                title="Computing & Laboratories"
                subtitle="State-of-the-art computing infrastructure and discipline-specific labs powering world-class engineering education."
              />
              <div
                className="space-y-3"
                style={{
                  color: C.body,
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <p className="leading-relaxed">
                  The Central Computing Facility at COEP houses over 500
                  high-performance computers with a 1 Gbps internet backbone —
                  one of the fastest campuses in Maharashtra. Accessible 24
                  hours for registered students, the facility is equipped with
                  industry-leading software for engineering simulation, design,
                  and programming.
                </p>
                <div className="grid grid-cols-2 gap-3 my-4">
                  {[
                    { label: "Computers", val: "500+" },
                    { label: "Internet Speed", val: "1 Gbps" },
                    { label: "Software Licenses", val: "50+" },
                    { label: "Department Labs", val: "27+" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: C.bg,
                        border: `1px solid ${C.cobalt}18`,
                      }}
                    >
                      <div
                        className="text-xl font-bold"
                        style={{
                          color: C.cobalt,
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        {s.val}
                      </div>
                      <div className="text-xs mt-1" style={{ color: C.muted }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Software tags */}
                <p
                  className="text-sm font-semibold"
                  style={{ color: C.deepBlue }}
                >
                  Available Software:
                </p>
                <div className="flex flex-wrap gap-2">
                  {software.map((sw) => (
                    <span
                      key={sw}
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{
                        background: `${C.cobalt}10`,
                        color: C.cobalt,
                        border: `1px solid ${C.cobalt}20`,
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Visual right */}
            <FacilityVisual
              gradient={`linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, ${C.cobalt} 100%)`}
              icon={Computer}
              label="Computing & Labs"
            />
          </div>
          {/* Department labs */}
          <div>
            <h3
              className="text-center mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: C.deepBlue,
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              Department Laboratories
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {labs.map((lab, i) => (
                <div
                  key={lab.dept}
                  data-ocid={`labs.dept.${i + 1}`}
                  className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{
                    background: C.bg,
                    border: `1px solid ${C.cobalt}14`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Wifi size={14} style={{ color: C.cobalt }} />
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{
                        color: C.cobalt,
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                    >
                      {lab.count} Labs
                    </span>
                  </div>
                  <h5
                    className="font-bold mb-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: C.deepBlue,
                      fontSize: "0.95rem",
                    }}
                  >
                    {lab.dept}
                  </h5>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: C.muted,
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {lab.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Medical Center Section ─────────────────────────────────────────────────────
function MedicalSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="medical" className="py-20" style={{ background: C.bg }}>
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-14 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Visual left */}
          <FacilityVisual
            gradient="linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)"
            icon={Heart}
            label="Medical Center"
          />
          {/* Text right */}
          <div>
            <SectionTitle
              title="Medical Center"
              subtitle="Student health and well-being are paramount — COEP's on-campus medical facility ensures immediate care when needed."
            />
            <div
              className="space-y-4"
              style={{
                color: C.body,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <p className="leading-relaxed">
                The on-campus Medical Center at COEP Technological University
                provides first aid, basic medical care, and health consultations
                to students, faculty, and staff. A part-time Medical Officer
                (MBBS) is available on campus during working hours, ensuring
                prompt attention to medical needs.
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "On-Campus Medical Officer",
                    desc: "Part-time MBBS doctor available Mon–Sat, 10 AM to 4 PM in the Admin Block.",
                  },
                  {
                    title: "First Aid Stations",
                    desc: "First aid kits and AED devices placed in all major academic and hostel buildings.",
                  },
                  {
                    title: "Ambulance Tie-up",
                    desc: "24/7 tie-up with a local ambulance service for emergency transport.",
                  },
                  {
                    title: "Nearby Hospitals",
                    desc: "Sassoon General Hospital (1.5 km), Ruby Hall Clinic (2 km), and KEM Hospital (3 km).",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-3 p-3 rounded-xl"
                    style={{ background: C.white, border: "1px solid #fee2e2" }}
                  >
                    <Heart
                      size={18}
                      style={{ color: "#dc2626", flexShrink: 0, marginTop: 2 }}
                    />
                    <div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: C.deepBlue }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="text-xs mt-0.5 leading-relaxed"
                        style={{ color: C.muted }}
                      >
                        {item.desc}
                      </p>
                    </div>
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

// ─── Canteen Section ────────────────────────────────────────────────────────────
function CanteenSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const canteens = [
    {
      name: "Main Campus Canteen",
      location: "Near Admin Block",
      timing: "8 AM – 8 PM",
      specialty: "Full meals, snacks, beverages",
    },
    {
      name: "Engineering Block Canteen",
      location: "Ground Floor, Eng Block",
      timing: "8 AM – 6 PM",
      specialty: "Quick snacks, tea, coffee, sandwiches",
    },
    {
      name: "Hostel Mess",
      location: "Nilgiris & Sahyadri Hostels",
      timing: "6 AM – 10 PM",
      specialty: "Breakfast, lunch, dinner, evening snacks",
    },
    {
      name: "Girls' Hostel Mess",
      location: "Padmavati Hostel",
      timing: "7 AM – 9 PM",
      specialty: "Vegetarian meals, evening snacks",
    },
  ];
  return (
    <section id="canteen" className="py-20" style={{ background: C.white }}>
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-14">
            {/* Text left */}
            <div>
              <SectionTitle
                title="Canteen & Dining"
                subtitle="Nutritious, affordable, and hygienic food options across campus to fuel the minds of tomorrow's engineers."
              />
              <div
                className="space-y-3"
                style={{
                  color: C.body,
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                <p className="leading-relaxed">
                  COEP Technological University operates multiple canteens and
                  dining facilities across the campus, ensuring that students
                  and faculty have access to hygienic, nutritious, and
                  affordable meals throughout the day. The food committees are
                  managed in close collaboration with student representatives to
                  ensure quality and variety.
                </p>
                <div className="grid grid-cols-2 gap-3 my-4">
                  {[
                    { label: "Canteens", val: "4+" },
                    { label: "Meals / Day", val: "3,000+" },
                    { label: "Menu Items", val: "50+" },
                    { label: "Operating Hours", val: "14 hrs" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: "#fffbeb",
                        border: `1px solid ${C.gold}44`,
                      }}
                    >
                      <div
                        className="text-xl font-bold"
                        style={{
                          color: C.midnight,
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        {s.val}
                      </div>
                      <div className="text-xs mt-1" style={{ color: C.muted }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Visual right */}
            <FacilityVisual
              gradient="linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)"
              icon={UtensilsCrossed}
              label="Canteen & Dining"
            />
          </div>
          {/* Canteen table */}
          <div
            className="overflow-x-auto rounded-2xl"
            style={{
              border: `1px solid ${C.cobalt}14`,
              boxShadow: "0 4px 20px rgba(22,72,200,0.06)",
            }}
          >
            <table
              className="w-full text-sm"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <thead>
                <tr style={{ background: C.midnight, color: C.white }}>
                  <th className="text-left px-5 py-4">Canteen / Mess</th>
                  <th className="text-left px-5 py-4">Location</th>
                  <th className="text-left px-5 py-4">Timings</th>
                  <th className="text-left px-5 py-4">Specialty</th>
                </tr>
              </thead>
              <tbody>
                {canteens.map((c, i) => (
                  <tr
                    key={c.name}
                    data-ocid={`canteen.row.${i + 1}`}
                    className="transition-colors duration-150"
                    style={{
                      background: i % 2 === 0 ? C.white : C.bg,
                      borderTop: "1px solid rgba(22,72,200,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = C.bgAlt;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        i % 2 === 0 ? C.white : C.bg;
                    }}
                  >
                    <td
                      className="px-5 py-3 font-semibold"
                      style={{ color: C.deepBlue }}
                    >
                      {c.name}
                    </td>
                    <td className="px-5 py-3" style={{ color: C.body }}>
                      {c.location}
                    </td>
                    <td className="px-5 py-3" style={{ color: C.body }}>
                      {c.timing}
                    </td>
                    <td className="px-5 py-3" style={{ color: C.muted }}>
                      {c.specialty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Banner ───────────────────────────────────────────────────────────────
function StatsBanner() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section
      className="py-16"
      style={{
        background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 50%, ${C.cobalt} 100%)`,
      }}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} active={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  active,
  index,
}: {
  stat: { label: string; value: number; suffix: string };
  active: boolean;
  index: number;
}) {
  const count = useCountUp(stat.value, 1600, active);
  return (
    <div
      className="text-center"
      data-ocid={`stats.item.${index + 1}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div
        className="text-3xl font-bold"
        style={{ fontFamily: "'Playfair Display', serif", color: C.gold }}
      >
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div
        className="text-xs mt-1 uppercase tracking-wider"
        style={{
          color: "rgba(255,255,255,0.7)",
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

// ─── Sticky Sidebar Navigation ─────────────────────────────────────────────────
function StickyNav({
  active,
  onNavigate,
}: {
  active: FacilityId;
  onNavigate: (id: FacilityId) => void;
}) {
  return (
    <nav
      className="hidden xl:block sticky top-24 w-56 flex-shrink-0 rounded-2xl overflow-hidden"
      style={{
        background: C.white,
        border: `1px solid ${C.cobalt}16`,
        boxShadow: "0 8px 32px rgba(22,72,200,0.1)",
        alignSelf: "start",
      }}
      aria-label="Facilities navigation"
    >
      <div
        className="px-4 py-3 text-xs font-bold uppercase tracking-widest"
        style={{
          background: C.midnight,
          color: C.gold,
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        Facilities
      </div>
      <ul className="py-2">
        {FACILITY_NAV.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              type="button"
              data-ocid={`facilities.nav.${id}`}
              onClick={() => {
                onNavigate(id);
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-all duration-200"
              style={{
                background: active === id ? `${C.cobalt}10` : "transparent",
                color: active === id ? C.cobalt : C.body,
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.82rem",
                fontWeight: active === id ? 700 : 500,
                borderLeft:
                  active === id
                    ? `3px solid ${C.cobalt}`
                    : "3px solid transparent",
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Mobile Quick Nav ──────────────────────────────────────────────────────────
function MobileNav({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: FacilityId;
}) {
  if (!open) return null;
  return (
    <div className="xl:hidden fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        role="button"
        tabIndex={-1}
        aria-label="Close navigation"
      />
      <div
        className="relative w-64 ml-auto h-full overflow-y-auto"
        style={{ background: C.white }}
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: C.midnight }}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: C.gold, fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Facilities
          </span>
          <button type="button" onClick={onClose} aria-label="Close navigation">
            <X size={18} style={{ color: C.white }} />
          </button>
        </div>
        <ul className="py-2">
          {FACILITY_NAV.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150"
                style={{
                  background: active === id ? `${C.cobalt}10` : "transparent",
                  color: active === id ? C.cobalt : C.body,
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: active === id ? 700 : 500,
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Hero Banner ───────────────────────────────────────────────────────────────
function HeroBanner({ onOpenNav }: { onOpenNav: () => void }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 55%, ${C.cobalt} 100%)`,
        minHeight: 340,
      }}
    >
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Gold top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: C.gold }}
      />

      <div className="relative container max-w-7xl mx-auto px-6 py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6" aria-label="Breadcrumb">
          <a
            href="/"
            className="text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = C.gold;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.6)";
            }}
          >
            Home
          </a>
          <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: C.gold, fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Facilities
          </span>
        </nav>

        <div className="flex items-end justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="block w-10 h-1 rounded-full"
                style={{ background: C.gold }}
              />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                COEP Technological University
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: C.white,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Facilities
            </h1>
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.8)",
                fontFamily: "'Source Sans 3', sans-serif",
                maxWidth: "36rem",
              }}
            >
              World-Class Infrastructure for World-Class Engineers
            </p>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Source Sans 3', sans-serif",
                maxWidth: "40rem",
              }}
            >
              From a 170-year-old heritage campus to modern digital
              infrastructure — COEP provides everything students need to learn,
              grow, and excel.
            </p>
          </div>

          {/* Mobile nav toggle */}
          <button
            type="button"
            className="xl:hidden flex items-center gap-2 px-4 py-2 rounded-lg xl:hidden"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: C.white,
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.85rem",
            }}
            onClick={onOpenNav}
            aria-label="Open facilities navigation"
            data-ocid="facilities.mobile_nav_button"
          >
            <Menu size={16} />
            All Facilities
          </button>
        </div>

        {/* Quick jump pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FACILITY_NAV.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              data-ocid={`facilities.hero_pill.${id}`}
              onClick={() =>
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="text-xs px-4 py-1.5 rounded-full font-semibold transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.2)",
                fontFamily: "'Source Sans 3', sans-serif",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  C.gold;
                (e.currentTarget as HTMLButtonElement).style.color = C.midnight;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.9)";
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function FacilitiesPage() {
  const [activeSection, setActiveSection] = useState<FacilityId>("krc");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      for (const { id } of [...FACILITY_NAV].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <Header />
      <UniversityTabsSection />
      <main>
        <HeroBanner onOpenNav={() => setMobileNavOpen(true)} />
        <MobileNav
          open={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          active={activeSection}
        />

        {/* Content with sticky sidebar */}
        <div className="flex gap-8 container max-w-7xl mx-auto px-6 py-12">
          <StickyNav active={activeSection} onNavigate={setActiveSection} />
          <div className="flex-1 min-w-0 -mx-6 px-0">
            {/* Sections outside the padded container so they go full-bleed */}
          </div>
        </div>

        {/* Full-bleed sections */}
        <div className="-mt-12">
          <KRCSection />
          <hr className="section-divider" />
          <BISSection />
          <hr className="section-divider" />
          <NSSSection />
          <hr className="section-divider" />
          <SportsSection />
          <hr className="section-divider" />
          <HostelSection />
          <hr className="section-divider" />
          <ComputingSection />
          <hr className="section-divider" />
          <MedicalSection />
          <hr className="section-divider" />
          <CanteenSection />
        </div>

        <StatsBanner />
      </main>
      <Footer />
    </Layout>
  );
}
