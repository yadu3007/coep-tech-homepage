import { ChevronDown, ChevronRight } from "lucide-react";
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
  bodyText: "#374151",
  mutedText: "#6B7280",
} as const;

// ─── Scroll reveal hook ────────────────────────────────────────────────────────
function useScrollReveal<T extends HTMLElement>(threshold = 0.12) {
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

// ─── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, active = false) {
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

// ─── Timeline data ─────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: 1854,
    title: "Founding",
    desc: "Poona Engineering Class and Mechanical School established in Bhawani Peth under British Government to train officers of the Public Works Department.",
    img: "/assets/generated/coep-historic-building.dim_800x500.jpg",
  },
  {
    year: 1865,
    title: "Foundation Stone",
    desc: "Governor Bartie Frere lays the foundation stone of the new campus building. W.S. Howard designs the iconic heritage main building still standing today.",
    img: null,
  },
  {
    year: 1868,
    title: "New Campus",
    desc: "College shifts to the present campus at Shivajinagar — state-of-the-art facilities for the era, complete with engineering workshops and laboratories.",
    img: null,
  },
  {
    year: 1878,
    title: "College of Science",
    desc: "Renamed as the College of Science, marking an expansion of academic scope beyond pure engineering.",
    img: null,
  },
  {
    year: 1911,
    title: "Engineering College",
    desc: "Renamed as Government College of Engineering, Poona — a distinguished name that endured for over a century of academic excellence.",
    img: null,
  },
  {
    year: 1948,
    title: "University Affiliation",
    desc: "Academic affiliation transferred to the newly established University of Pune, strengthening research and postgraduate programs.",
    img: null,
  },
  {
    year: 1970,
    title: "Expansion Era",
    desc: "Major expansion of departments and infrastructure. New engineering disciplines including Electronics and Computer Science added to meet India's growing technological needs.",
    img: "/assets/generated/coep-campus-modern.dim_800x500.jpg",
  },
  {
    year: 1990,
    title: "Autonomy Granted",
    desc: "Granted academic and administrative autonomy, enabling the college to independently design curricula, conduct examinations, and pursue research partnerships.",
    img: null,
  },
  {
    year: 2000,
    title: "National Recognition",
    desc: "Consistently ranked among the top 25 engineering institutes in India. NAAC A+ accreditation affirms the highest standards of academic quality.",
    img: null,
  },
  {
    year: 2022,
    title: "University Status",
    desc: "Government of Maharashtra upgrades COEP to a full unitary technological university — COEP Technological University is born, empowered to award its own degrees.",
    img: null,
  },
  {
    year: 2024,
    title: "170 Years of Excellence",
    desc: "Celebrating 170 years of engineering education, innovation, and nation-building — third oldest engineering institution in India and continuing to shape the future.",
    img: "/assets/generated/coep-campus-modern.dim_800x500.jpg",
  },
];

// ─── Alumni data ───────────────────────────────────────────────────────────────
const ALUMNI = [
  {
    name: "Sir M. Visvesvaraya",
    batch: "1881",
    dept: "Civil Engineering",
    contribution:
      "Bharat Ratna laureate; designed KRS Dam and automatic flood gates at Khadakwasala; Dewan of Mysore. Engineers' Day (Sept 15) is celebrated in his honor across India.",
    badge: "Bharat Ratna",
    img: "/assets/generated/alumni-visvesvaraya.dim_400x400.jpg",
  },
  {
    name: "Thomas Kailath",
    batch: "1956",
    dept: "Electrical Engineering",
    contribution:
      "Emeritus Professor at Stanford University; winner of the IEEE Shannon Award and US National Medal of Science; pioneer in signal processing and information theory.",
    badge: "US National Medal of Science",
    img: "/assets/generated/alumni-professor.dim_400x400.jpg",
  },
  {
    name: "Suhas V. Patankar",
    batch: "1962",
    dept: "Mechanical Engineering",
    contribution:
      "Professor Emeritus, University of Minnesota; co-developed the SIMPLE algorithm in Computational Fluid Dynamics; author of landmark textbook 'Numerical Heat Transfer and Fluid Flow'.",
    badge: "CFD Pioneer",
    img: "/assets/generated/alumni-professor.dim_400x400.jpg",
  },
  {
    name: "Lila Poonawalla",
    batch: "1966",
    dept: "Mechanical Engineering",
    contribution:
      "Padma Shri; first woman graduate from the Mechanical Engineering stream; renowned industrialist and philanthropist; founded the Lila Poonawalla Foundation supporting women's education.",
    badge: "Padma Shri",
    img: "/assets/generated/alumni-lila.dim_400x400.jpg",
  },
  {
    name: "Sanjay Govind Dhande",
    batch: "1972",
    dept: "Mechanical Engineering",
    contribution:
      "Padma Shri; Former Director of IIT Kanpur; pioneer in Computer Aided Design in India; instrumental in establishing India's CAD/CAM research ecosystem.",
    badge: "Padma Shri",
    img: "/assets/generated/alumni-professor.dim_400x400.jpg",
  },
  {
    name: "Aravind Joshi",
    batch: "1958",
    dept: "Computer Engineering",
    contribution:
      "Emeritus Professor at the University of Pennsylvania; pioneer in Natural Language Processing and Computational Linguistics; foundational contributions to formal language theory.",
    badge: "NLP Pioneer",
    img: "/assets/generated/alumni-professor.dim_400x400.jpg",
  },
  {
    name: "Rajiv Bajaj",
    batch: "1988",
    dept: "Mechanical Engineering",
    contribution:
      "Managing Director of Bajaj Auto; transformed Bajaj from scooters to high-performance motorcycles; one of India's most celebrated industrialists and business strategists.",
    badge: "Industry Leader",
    img: "/assets/generated/alumni-industrialist.dim_400x400.jpg",
  },
  {
    name: "Gaur Gopal Das",
    batch: "1995",
    dept: "Electrical Engineering",
    contribution:
      "International monk, bestselling author, and motivational speaker with millions of YouTube followers; named India's most influential spiritual leader by Forbes magazine.",
    badge: "Forbes Listed",
    img: "/assets/generated/alumni-monk.dim_400x400.jpg",
  },
  {
    name: "Baburao G. Shirke",
    batch: "1950",
    dept: "Civil Engineering",
    contribution:
      "Founder of B.G. Shirke & Company; pioneer in precast concrete construction technology in India; revolutionized large-scale infrastructure and housing construction.",
    badge: "Construction Pioneer",
    img: "/assets/generated/alumni-professor.dim_400x400.jpg",
  },
  {
    name: "Jaydeep Kulkarni",
    batch: "2001",
    dept: "Electrical Engineering",
    contribution:
      "Associate Professor at The University of Texas at Austin; holds the Silicon Laboratories Endowed Chair in Electrical Engineering; leading researcher in low-power VLSI design.",
    badge: "UT Austin Chair",
    img: "/assets/generated/alumni-professor.dim_400x400.jpg",
  },
];

// ─── Board of Governance data ──────────────────────────────────────────────────
const BOG_MEMBERS = [
  {
    sr: 1,
    role: "Chairman (Sec 23-4a)",
    name: "Shri. Vinayak Pai",
    designation: "TATA Projects Limited, Mumbai",
  },
  {
    sr: 2,
    role: "Vice Chancellor (Sec 23-4b)",
    name: "Prof. S.G. Bhirud",
    designation: "Vice-Chancellor, COEP Technological University",
  },
  {
    sr: 3,
    role: "Faculty Representative (Sec 23-4c)",
    name: "Prof. D.W. Pande",
    designation: "Professor, Dept. of Mechanical Engineering",
  },
  {
    sr: 4,
    role: "Director Technical Education (Sec 23-4d)",
    name: "Shri. Santosh Khorgade",
    designation: "Director, Technical Education, Maharashtra",
  },
  {
    sr: 5,
    role: "Finance & Accounts Officer (Sec 23-4e)",
    name: "Shri. P.R. Kulkarni",
    designation: "Finance and Accounts Officer, COEP Tech",
  },
  {
    sr: 6,
    role: "Registrar (Sec 23-4f)",
    name: "Dr. D.N. Sonawane",
    designation: "Registrar, COEP Technological University",
  },
  {
    sr: 7,
    role: "Expert Member (Sec 23-4g)",
    name: "Dr. Shrinivas Gondhalekar",
    designation: "Director, National Chemical Laboratory, Pune",
  },
  {
    sr: 8,
    role: "Expert Member (Sec 23-4g)",
    name: "Shri. Kiran Naik",
    designation: "CEO, Persistent Systems Ltd.",
  },
  {
    sr: 9,
    role: "Alumni Representative (Sec 23-4h)",
    name: "Dr. Prashant Bichkar",
    designation: "COEP Alumni Association President",
  },
  {
    sr: 10,
    role: "Industry Representative (Sec 23-4i)",
    name: "Ms. Pooja Kulkarni",
    designation: "MD, Maharashtra IT Corporation",
  },
  {
    sr: 11,
    role: "Government Nominee (Sec 23-4j)",
    name: "Shri. Atul Patne",
    designation: "Joint Secretary, Higher & Technical Education, Maharashtra",
  },
  {
    sr: 12,
    role: "University Representative (Sec 23-4k)",
    name: "Prof. R.M. Jalnekar",
    designation: "Director, Government College of Engineering, Aurangabad",
  },
];

// ─── Committees data ───────────────────────────────────────────────────────────
const COMMITTEES_A = [
  {
    sr: 1,
    name: "University Authorities",
    members: [
      {
        role: "Chairperson",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor, COEP Tech",
      },
      { role: "Member", name: "Dr. D.N. Sonawane", designation: "Registrar" },
      {
        role: "Member",
        name: "Dr. S.A. Meshram",
        designation: "Head, Dept. of Management Studies",
      },
      {
        role: "Member",
        name: "Dr. Y.V. Haribhakta",
        designation: "Director, BoEE",
      },
    ],
  },
  {
    sr: 2,
    name: "Academic Council Committee",
    members: [
      {
        role: "Chairperson",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor",
      },
      {
        role: "Member",
        name: "Dr. S.A. Meshram",
        designation: "Head, Dept. of Management Studies",
      },
      {
        role: "Member",
        name: "Dr. Y.V. Haribhakta",
        designation: "Director, Board of Examination & Evaluation",
      },
      {
        role: "Member",
        name: "Dr. S.P. Mahajan",
        designation: "Director, RIIL",
      },
      {
        role: "Member Secretary",
        name: "Dr. D.N. Sonawane",
        designation: "Registrar, COEP Tech",
      },
    ],
  },
  {
    sr: 3,
    name: "Finance and Accounts Committee",
    members: [
      {
        role: "Chairperson",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor",
      },
      {
        role: "Member",
        name: "Shri. P.R. Kulkarni",
        designation: "Finance & Accounts Officer",
      },
      {
        role: "Member",
        name: "Shri. Santosh Khorgade",
        designation: "Director, Technical Education",
      },
      {
        role: "Member Secretary",
        name: "Dr. D.N. Sonawane",
        designation: "Registrar",
      },
    ],
  },
  {
    sr: 4,
    name: "Purchase and Sales Committee",
    members: [
      {
        role: "Chairperson",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor",
      },
      {
        role: "Member",
        name: "Shri. P.R. Kulkarni",
        designation: "Finance & Accounts Officer",
      },
      {
        role: "Member",
        name: "Prof. D.W. Pande",
        designation: "Faculty Representative",
      },
      {
        role: "Member Secretary",
        name: "Dr. D.N. Sonawane",
        designation: "Registrar",
      },
    ],
  },
  {
    sr: 5,
    name: "Fees Fixation Committee",
    members: [
      {
        role: "Chairperson",
        name: "Shri. Santosh Khorgade",
        designation: "Director, Technical Education",
      },
      {
        role: "Member",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor",
      },
      {
        role: "Member",
        name: "Shri. P.R. Kulkarni",
        designation: "Finance & Accounts Officer",
      },
      {
        role: "Member Secretary",
        name: "Dr. D.N. Sonawane",
        designation: "Registrar",
      },
    ],
  },
  {
    sr: 6,
    name: "Buildings and Works Committee",
    members: [
      {
        role: "Chairperson",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor",
      },
      {
        role: "Member",
        name: "Shri. Vinayak Pai",
        designation: "TATA Projects Limited",
      },
      {
        role: "Member",
        name: "Prof. D.W. Pande",
        designation: "Faculty Representative",
      },
      {
        role: "Member Secretary",
        name: "Dr. D.N. Sonawane",
        designation: "Registrar",
      },
    ],
  },
  {
    sr: 7,
    name: "Knowledge Resource Committee (KRC)",
    members: [
      {
        role: "Chairperson",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor",
      },
      {
        role: "Member",
        name: "Dr. S.P. Mahajan",
        designation: "Director, RIIL",
      },
      {
        role: "Member",
        name: "Librarian",
        designation: "Chief Librarian, COEP Tech",
      },
      {
        role: "Member Secretary",
        name: "Dr. D.N. Sonawane",
        designation: "Registrar",
      },
    ],
  },
  {
    sr: 8,
    name: "Internal Quality Assurance Committee (IQAC)",
    members: [
      {
        role: "Chairperson",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor",
      },
      {
        role: "Member",
        name: "Dr. Y.V. Haribhakta",
        designation: "Director, BoEE",
      },
      { role: "Member", name: "Dr. S.A. Meshram", designation: "Head, DMS" },
      {
        role: "Member Secretary",
        name: "Dr. D.N. Sonawane",
        designation: "Registrar",
      },
    ],
  },
  {
    sr: 9,
    name: "Board of Examination and Evaluation (BoEE)",
    members: [
      {
        role: "Chairperson / Director",
        name: "Dr. Y.V. Haribhakta",
        designation: "Director, BoEE",
      },
      {
        role: "Member",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor",
      },
      { role: "Member", name: "Dr. D.N. Sonawane", designation: "Registrar" },
    ],
  },
  {
    sr: 10,
    name: "Board of Research, Innovation, Incubation and Linkages (RIIL)",
    members: [
      {
        role: "Director",
        name: "Dr. S.P. Mahajan",
        designation: "Director, RIIL",
      },
      {
        role: "Member",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor",
      },
      {
        role: "Member",
        name: "Shri. Kiran Naik",
        designation: "CEO, Persistent Systems",
      },
      {
        role: "Member Secretary",
        name: "Dr. D.N. Sonawane",
        designation: "Registrar",
      },
    ],
  },
  {
    sr: 11,
    name: "Board of Students' Development (BoSD)",
    members: [
      {
        role: "Chairperson",
        name: "Prof. S.G. Bhirud",
        designation: "Vice-Chancellor",
      },
      {
        role: "Member",
        name: "Dean, Student Affairs",
        designation: "Dean of Student Affairs",
      },
      {
        role: "Member",
        name: "Student Council President",
        designation: "Elected Student Representative",
      },
      {
        role: "Member Secretary",
        name: "Dr. D.N. Sonawane",
        designation: "Registrar",
      },
    ],
  },
];

const COMMITTEES_B = [
  { sr: 1, name: "SC, ST Committee" },
  { sr: 2, name: "Equal Opportunity Committee" },
  { sr: 3, name: "Grievances Committee" },
  { sr: 4, name: "IC Committee (Internal Complaints)" },
  { sr: 5, name: "Scholarship Committee" },
  { sr: 6, name: "Anti-Ragging Committee" },
];

// ─── SUB-TABS ──────────────────────────────────────────────────────────────────
const SUB_TABS = [
  { id: "about-university", label: "About University" },
  { id: "board-of-governance", label: "Board of Governance" },
  { id: "authorities-committees", label: "Authorities, Boards & Committees" },
];

// ─── Stat item with count-up ───────────────────────────────────────────────────
function StatItem({
  value,
  label,
  suffix = "+",
  active,
}: { value: number; label: string; suffix?: string; active: boolean }) {
  const count = useCountUp(value, 1600, active);
  return (
    <div className="text-center" style={{ flex: "1 1 0", minWidth: 0 }}>
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          color: C.gold,
          lineHeight: 1,
        }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
          marginTop: "0.4rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Timeline entry ────────────────────────────────────────────────────────────
function TimelineEntry({
  item,
  index,
}: { item: (typeof TIMELINE)[0]; index: number }) {
  const isLeft = index % 2 === 0;
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`flex items-start gap-0 w-full relative ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : isLeft
            ? "translateX(-40px)"
            : "translateX(40px)",
        transition:
          "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        transitionDelay: `${(index % 4) * 0.1}s`,
      }}
    >
      {/* Content side */}
      <div
        style={{
          flex: "0 0 calc(50% - 2.5rem)",
          padding: isLeft ? "0 2rem 0 0" : "0 0 0 2rem",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            backdropFilter: "blur(8px)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "rgba(232,196,42,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLDivElement).style.borderColor =
              "rgba(255,255,255,0.1)";
          }}
        >
          {item.img && (
            <div
              style={{
                width: "100%",
                height: "140px",
                borderRadius: "0.5rem",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}
          {!item.img && (
            <div
              style={{
                width: "100%",
                height: "80px",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                background: `linear-gradient(135deg, ${C.cobalt}40, ${C.deepBlue}60)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: C.gold,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  opacity: 0.5,
                }}
              >
                {item.year}
              </span>
            </div>
          )}
          <h4
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              color: "#ffffff",
              fontSize: "1.1rem",
              marginBottom: "0.5rem",
            }}
          >
            {item.title}
          </h4>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {item.desc}
          </p>
        </div>
      </div>

      {/* Center node */}
      <div
        style={{
          flex: "0 0 5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.cobalt}, ${C.deepBlue})`,
            border: `3px solid ${C.gold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "0.6rem",
              fontWeight: 800,
              color: C.gold,
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            {item.year}
          </span>
        </div>
      </div>

      {/* Empty side */}
      <div style={{ flex: "0 0 calc(50% - 2.5rem)" }} />
    </div>
  );
}

// ─── Alumni card ───────────────────────────────────────────────────────────────
function AlumniCard({ alumni }: { alumni: (typeof ALUMNI)[0] }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      data-ocid="alumni.card"
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: "1px solid rgba(22,72,200,0.1)",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-6px)";
          el.style.boxShadow = "0 20px 48px rgba(22,72,200,0.2)";
          el.style.borderColor = C.gold;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "";
          el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
          el.style.borderColor = "rgba(22,72,200,0.1)";
        }}
      >
        {/* Gold top accent */}
        <div
          style={{
            height: "4px",
            background: `linear-gradient(90deg, ${C.gold}, ${C.cobalt})`,
          }}
        />
        {/* Photo */}
        <div
          style={{
            padding: "1.5rem 1.5rem 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid ${C.gold}`,
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={alumni.img}
              alt={alumni.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(20%)",
              }}
            />
          </div>
        </div>
        {/* Content */}
        <div style={{ padding: "1rem 1.5rem 1.5rem", textAlign: "center" }}>
          <h4
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              color: C.deepBlue,
              fontSize: "1.05rem",
              marginBottom: "0.2rem",
              lineHeight: 1.25,
            }}
          >
            {alumni.name}
          </h4>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.75rem",
                color: C.cobalt,
                fontWeight: 600,
              }}
            >
              Batch '{alumni.batch.slice(-2)}
            </span>
            <span style={{ color: "#CBD5E1", fontSize: "0.75rem" }}>·</span>
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.75rem",
                color: C.mutedText,
              }}
            >
              {alumni.dept}
            </span>
          </div>
          <span
            style={{
              display: "inline-block",
              background: `${C.gold}20`,
              color: C.deepBlue,
              border: `1px solid ${C.gold}60`,
              borderRadius: "100px",
              padding: "0.2rem 0.75rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              marginBottom: "0.75rem",
            }}
          >
            {alumni.badge}
          </span>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.85rem",
              color: C.bodyText,
              lineHeight: 1.6,
              margin: 0,
              textAlign: "left",
            }}
          >
            {alumni.contribution}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Accordion row for committees ─────────────────────────────────────────────
function CommitteeRow({ committee }: { committee: (typeof COMMITTEES_A)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(22,72,200,0.12)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        data-ocid={`committee.row.${committee.sr}`}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            `${C.cobalt}08`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "transparent";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              background: C.cobalt,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {committee.sr}
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              color: C.deepBlue,
              fontSize: "1rem",
            }}
          >
            {committee.name}
          </span>
        </div>
        <ChevronDown
          size={18}
          style={{
            color: C.cobalt,
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            padding: "0 1.5rem 1.25rem 4.5rem",
            background: `${C.cobalt}04`,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
            }}
          >
            <thead>
              <tr style={{ background: `${C.cobalt}15` }}>
                <th
                  style={{
                    padding: "0.5rem 0.75rem",
                    textAlign: "left",
                    fontWeight: 700,
                    color: C.deepBlue,
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Role
                </th>
                <th
                  style={{
                    padding: "0.5rem 0.75rem",
                    textAlign: "left",
                    fontWeight: 700,
                    color: C.deepBlue,
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "0.5rem 0.75rem",
                    textAlign: "left",
                    fontWeight: 700,
                    color: C.deepBlue,
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Designation
                </th>
              </tr>
            </thead>
            <tbody>
              {committee.members.map((m) => (
                <tr
                  key={`${m.role}-${m.name}`}
                  style={{
                    background:
                      committee.members.indexOf(m) % 2 === 0
                        ? "transparent"
                        : `${C.cobalt}06`,
                  }}
                >
                  <td
                    style={{
                      padding: "0.5rem 0.75rem",
                      color: C.cobalt,
                      fontWeight: 600,
                    }}
                  >
                    {m.role}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem 0.75rem",
                      color: C.bodyText,
                      fontWeight: 500,
                    }}
                  >
                    {m.name}
                  </td>
                  <td style={{ padding: "0.5rem 0.75rem", color: C.mutedText }}>
                    {m.designation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── About University tab ─────────────────────────────────────────────────────
function AboutUniversityTab() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      {/* ── Intro Section ── */}
      <section style={{ padding: "4rem 0", background: "#ffffff" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div className="animate-on-scroll">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{ width: "3rem", height: "2px", background: C.gold }}
              />
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: C.cobalt,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Est. 1854
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: C.deepBlue,
                marginBottom: "1.5rem",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              }}
            >
              A Legacy of Engineering Excellence
            </h2>
            <p
              style={{
                color: C.bodyText,
                lineHeight: 1.8,
                marginBottom: "1rem",
                fontSize: "1.02rem",
              }}
            >
              COEP Technological University, formerly the Government College of
              Engineering, Pune, stands as the third oldest engineering
              institution in India — after the College of Engineering Guindy
              (1794) and IIT Roorkee (1847). Founded in 1854 as the Poona
              Engineering Class and Mechanical School, COEP has trained
              generations of engineers who have shaped India and the world.
            </p>
            <p
              style={{
                color: C.bodyText,
                lineHeight: 1.8,
                marginBottom: "1rem",
                fontSize: "1.02rem",
              }}
            >
              As a unitary public technological university of Maharashtra, COEP
              Tech is empowered to award its own degrees, conduct research, and
              forge international partnerships. The university's sprawling
              56-acre campus in Shivajinagar, Pune, blends Victorian heritage
              architecture with modern research facilities.
            </p>
            <p
              style={{
                color: C.bodyText,
                lineHeight: 1.8,
                fontSize: "1.02rem",
              }}
            >
              Consistently ranked among India's top engineering institutions,
              COEP holds NAAC A+ accreditation and NBA accreditation for all its
              programs. Its alumni include a Bharat Ratna, multiple Padma Shri
              awardees, and luminaries who have led premier global universities,
              industries, and institutions.
            </p>
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://www.coeptech.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: "0.9rem", padding: "0.6rem 1.4rem" }}
              >
                Official Website <ChevronRight size={14} />
              </a>
            </div>
          </div>
          <div
            className="animate-on-scroll"
            style={{
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(15,52,153,0.2)",
            }}
          >
            <img
              src="/assets/generated/coep-campus-modern.dim_800x500.jpg"
              alt="COEP Campus"
              style={{ width: "100%", height: "380px", objectFit: "cover" }}
            />
            <div
              style={{
                background: C.midnight,
                padding: "1rem 1.5rem",
                display: "flex",
                gap: "1rem",
                justifyContent: "space-around",
              }}
            >
              {[
                { v: "56", l: "Acre Campus" },
                { v: "NAAC A+", l: "Accredited" },
                { v: "#3", l: "Oldest in India" },
              ].map((s) => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 800,
                      color: C.gold,
                      fontSize: "1.2rem",
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.65)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section
        ref={statsRef}
        style={{
          padding: "2.5rem 0",
          background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 100%)`,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <StatItem
            value={170}
            label="Years of Excellence"
            active={statsVisible}
          />
          <div
            style={{
              width: "1px",
              background: "rgba(255,255,255,0.15)",
              margin: "0.5rem 0",
            }}
          />
          <StatItem
            value={12000}
            label="Students Enrolled"
            active={statsVisible}
          />
          <div
            style={{
              width: "1px",
              background: "rgba(255,255,255,0.15)",
              margin: "0.5rem 0",
            }}
          />
          <StatItem value={300} label="Faculty Members" active={statsVisible} />
          <div
            style={{
              width: "1px",
              background: "rgba(255,255,255,0.15)",
              margin: "0.5rem 0",
            }}
          />
          <StatItem
            value={98}
            label="Placement Rate %"
            suffix="%"
            active={statsVisible}
          />
        </div>
      </section>

      {/* ── Timeline Section ── */}
      <section
        style={{
          padding: "5rem 0",
          background: `linear-gradient(180deg, ${C.midnight} 0%, #0a2460 60%, ${C.midnight} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(ellipse at 20% 20%, ${C.cobalt}20 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, ${C.gold}10 0%, transparent 50%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 2rem",
            position: "relative",
          }}
        >
          {/* Section header */}
          <div
            className="animate-on-scroll"
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: `linear-gradient(90deg, transparent, ${C.gold}60)`,
                }}
              />
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: C.gold,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                Since 1854
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: `linear-gradient(90deg, ${C.gold}60, transparent)`,
                }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#ffffff",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginBottom: "1rem",
              }}
            >
              A Journey Through Time
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'Source Sans 3', sans-serif",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              COEP Technological University since 1854 — 170 years of
              engineering education, research, and nation-building.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            {/* Center vertical line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "2px",
                background: `linear-gradient(180deg, transparent, ${C.gold}40 10%, ${C.gold}40 90%, transparent)`,
                transform: "translateX(-50%)",
                zIndex: 1,
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
              }}
            >
              {TIMELINE.map((item, i) => (
                <TimelineEntry key={item.year} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Alumni Section ── */}
      <section style={{ padding: "5rem 0", background: "#F8FAFF" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}
        >
          <div
            className="animate-on-scroll"
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{ width: "3rem", height: "2px", background: C.gold }}
              />
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: C.cobalt,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Our Distinguished Alumni
              </span>
              <div
                style={{ width: "3rem", height: "2px", background: C.gold }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: C.deepBlue,
                marginBottom: "1rem",
              }}
            >
              Luminaries Who Shaped the World
            </h2>
            <p
              style={{
                color: C.mutedText,
                fontFamily: "'Source Sans 3', sans-serif",
                maxWidth: "600px",
                margin: "0 auto",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              From Bharat Ratna engineers to Stanford professors, COEP alumni
              have built dams, designed algorithms, led industries, and inspired
              millions across every continent.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {ALUMNI.map((a, i) => (
              <div
                key={a.name}
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              >
                <AlumniCard alumni={a} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Board of Governance tab ──────────────────────────────────────────────────
function BoardOfGovernanceTab() {
  return (
    <div>
      <section style={{ padding: "4rem 0", background: "#ffffff" }}>
        <div
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}
        >
          <div className="animate-on-scroll" style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{ width: "3rem", height: "2px", background: C.gold }}
              />
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: C.cobalt,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                University Governance
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: C.deepBlue,
                marginBottom: "1.25rem",
              }}
            >
              Board of Governance
            </h2>
            <p
              style={{
                color: C.bodyText,
                lineHeight: 1.8,
                maxWidth: "780px",
                fontSize: "1.02rem",
              }}
            >
              The Board of Governance is the apex statutory body of COEP
              Technological University, constituted under the COEP Technological
              University Act. The Board provides strategic direction, oversees
              the financial and academic health of the institution, and ensures
              accountability to all stakeholders including students, faculty,
              industry, and the Government of Maharashtra.
            </p>
            <div
              style={{
                marginTop: "1rem",
                display: "inline-block",
                background: `${C.cobalt}12`,
                border: `1px solid ${C.cobalt}30`,
                borderRadius: "0.5rem",
                padding: "0.6rem 1.2rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.85rem",
                  color: C.deepBlue,
                  fontWeight: 600,
                }}
              >
                As constituted under the COEP Technological University Act, 2022
              </span>
            </div>
          </div>

          {/* Table */}
          <div
            className="animate-on-scroll"
            style={{
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 4px 32px rgba(15,52,153,0.12)",
              border: "1px solid rgba(22,72,200,0.12)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background: `linear-gradient(90deg, ${C.midnight}, ${C.deepBlue})`,
                  }}
                >
                  {["Sr.No", "Member Role", "Name", "Designation"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        color: "#ffffff",
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BOG_MEMBERS.map((m, i) => (
                  <tr
                    key={m.sr}
                    data-ocid={`bog.row.${m.sr}`}
                    style={{
                      background: i % 2 === 0 ? "#ffffff" : "#EEF2FF",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.background = `${C.gold}18`;
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.background = i % 2 === 0 ? "#ffffff" : "#EEF2FF";
                    }}
                  >
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        fontWeight: 700,
                        color: C.cobalt,
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.9rem",
                      }}
                    >
                      {m.sr}
                    </td>
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        color: C.mutedText,
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.875rem",
                      }}
                    >
                      {m.role}
                    </td>
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        fontWeight: 600,
                        color: C.deepBlue,
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "0.95rem",
                      }}
                    >
                      {m.name}
                    </td>
                    <td
                      style={{
                        padding: "1rem 1.25rem",
                        color: C.bodyText,
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.875rem",
                      }}
                    >
                      {m.designation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note */}
          <div
            className="animate-on-scroll"
            style={{
              marginTop: "2rem",
              padding: "1.25rem 1.5rem",
              background: `${C.deepBlue}08`,
              borderLeft: `4px solid ${C.gold}`,
              borderRadius: "0 0.5rem 0.5rem 0",
            }}
          >
            <p
              style={{
                margin: 0,
                color: C.bodyText,
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
            >
              <strong style={{ color: C.deepBlue }}>Note:</strong> The Board of
              Governance meets at least twice a year. All decisions of the Board
              are final and binding, subject to provisions of the Act. Members
              are appointed for a term of three years and are eligible for
              reappointment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Authorities tab ──────────────────────────────────────────────────────────
function AuthoritiesTab() {
  return (
    <div>
      <section style={{ padding: "4rem 0", background: "#ffffff" }}>
        <div
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}
        >
          <div className="animate-on-scroll" style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{ width: "3rem", height: "2px", background: C.gold }}
              />
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: C.cobalt,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Institutional Structure
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: C.deepBlue,
                marginBottom: "1.25rem",
              }}
            >
              Authorities, Boards & Committees
            </h2>
            <p
              style={{
                color: C.bodyText,
                lineHeight: 1.8,
                maxWidth: "780px",
                fontSize: "1.02rem",
              }}
            >
              COEP Technological University operates through a well-defined
              governance structure comprising statutory authorities, boards, and
              committees as prescribed by the COEP Tech Act. Each body fulfills
              a distinct mandate to ensure academic excellence, financial
              integrity, student welfare, and institutional accountability.
            </p>
          </div>

          {/* Table 1 — Statutory Committees */}
          <div className="animate-on-scroll" style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: C.deepBlue,
                  fontSize: "1.4rem",
                  margin: 0,
                }}
              >
                University Authorities, Boards & Committees
              </h3>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: `linear-gradient(90deg, ${C.cobalt}30, transparent)`,
                }}
              />
            </div>
            <p
              style={{
                color: C.mutedText,
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
              }}
            >
              As per the COEP Technological University Act. Click on any
              committee to view its composition.
            </p>
            <div
              style={{
                border: "1px solid rgba(22,72,200,0.15)",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(15,52,153,0.08)",
              }}
            >
              <div
                style={{
                  background: `linear-gradient(90deg, ${C.midnight}, ${C.deepBlue})`,
                  padding: "0.875rem 1.5rem",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    width: "3rem",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.8rem",
                  }}
                >
                  Sr No
                </span>
                <span
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  Committee Name
                </span>
              </div>
              {COMMITTEES_A.map((c) => (
                <CommitteeRow key={c.sr} committee={c} />
              ))}
            </div>
          </div>

          {/* Table 2 — Internal Committees */}
          <div className="animate-on-scroll">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: C.deepBlue,
                  fontSize: "1.4rem",
                  margin: 0,
                }}
              >
                Internal University Level Committees
              </h3>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: `linear-gradient(90deg, ${C.cobalt}30, transparent)`,
                }}
              />
            </div>
            <div
              style={{
                border: "1px solid rgba(22,72,200,0.15)",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(15,52,153,0.08)",
              }}
            >
              <div
                style={{
                  background: `linear-gradient(90deg, ${C.midnight}, ${C.deepBlue})`,
                  padding: "0.875rem 1.5rem",
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.8rem",
                  }}
                >
                  Sr No
                </span>
                <span
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  Committee Name
                </span>
              </div>
              {COMMITTEES_B.map((c, i) => (
                <div
                  key={c.sr}
                  data-ocid={`internal-committee.row.${c.sr}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3rem 1fr",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    background: i % 2 === 0 ? "#ffffff" : "#EEF2FF",
                    borderBottom:
                      i < COMMITTEES_B.length - 1
                        ? "1px solid rgba(22,72,200,0.08)"
                        : "none",
                    alignItems: "center",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      `${C.gold}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      i % 2 === 0 ? "#ffffff" : "#EEF2FF";
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: C.cobalt,
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.9rem",
                    }}
                  >
                    {c.sr}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 600,
                      color: C.deepBlue,
                      fontSize: "1rem",
                    }}
                  >
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Hero Banner ──────────────────────────────────────────────────────────────
function HeroBanner({ activeTab }: { activeTab: string }) {
  const label = SUB_TABS.find((t) => t.id === activeTab)?.label || "About Us";
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 60%, ${C.cobalt} 100%)`,
        padding: "3rem 0 2.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "400px",
          height: "100%",
          backgroundImage: `radial-gradient(ellipse at top right, ${C.gold}15 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "600px",
          height: "2px",
          background: `linear-gradient(90deg, ${C.gold}80, transparent)`,
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          {["Home", "About Us", label].map((crumb, i, arr) => (
            <span
              key={crumb}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <button
                type="button"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  color:
                    i === arr.length - 1 ? C.gold : "rgba(255,255,255,0.6)",
                  fontWeight: i === arr.length - 1 ? 600 : 400,
                  cursor: i < arr.length - 1 ? "pointer" : "default",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
                onClick={() => {
                  if (i === 0) {
                    window.location.hash = "/";
                  }
                }}
                onKeyDown={() => {
                  if (i === 0) {
                    window.location.hash = "/";
                  }
                }}
              >
                {crumb}
              </button>
              {i < arr.length - 1 && (
                <ChevronRight
                  size={12}
                  style={{ color: "rgba(255,255,255,0.4)" }}
                />
              )}
            </span>
          ))}
        </div>
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#ffffff",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
          }}
        >
          About Us
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "1.05rem",
          }}
        >
          170 years of engineering excellence, innovation, and nation-building
        </p>
      </div>
    </div>
  );
}

// ─── Sub-nav ribbon ────────────────────────────────────────────────────────────
function SubNavRibbon({
  active,
  onChange,
}: { active: string; onChange: (id: string) => void }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderBottom: "1px solid rgba(22,72,200,0.12)",
        boxShadow: "0 2px 12px rgba(15,52,153,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          gap: "0",
          overflowX: "auto",
        }}
      >
        {SUB_TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => onChange(tab.id)}
              data-ocid={`about.tab.${tab.id}`}
              style={{
                padding: "1rem 1.75rem",
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.9rem",
                color: isActive ? C.cobalt : C.bodyText,
                background: "transparent",
                border: "none",
                borderBottom: isActive
                  ? `3px solid ${C.cobalt}`
                  : "3px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.25s ease",
                letterSpacing: isActive ? "0.01em" : "0",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = C.cobalt;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    C.bodyText;
                }
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

// ─── Main AboutUsPage export ──────────────────────────────────────────────────
export function AboutUsPage() {
  // Read sub-tab from URL hash
  const getTabFromHash = () => {
    const hash = window.location.hash;
    if (hash.includes("board-of-governance")) return "board-of-governance";
    if (hash.includes("authorities-committees"))
      return "authorities-committees";
    return "about-university";
  };
  const [activeTab, setActiveTab] = useState(getTabFromHash);

  // Listen for hash changes to switch sub-tabs (e.g. when nav dropdown links are clicked)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes("board-of-governance"))
        setActiveTab("board-of-governance");
      else if (hash.includes("authorities-committees"))
        setActiveTab("authorities-committees");
      else setActiveTab("about-university");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    // Setup scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const observeAll = () => {
      for (const el of document.querySelectorAll(
        ".animate-on-scroll:not(.is-visible)",
      ))
        observer.observe(el);
    };
    observeAll();
    const mut = new MutationObserver(observeAll);
    mut.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mut.disconnect();
    };
  }, []);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <Header />
      <main>
        <UniversityTabsSection />
        <HeroBanner activeTab={activeTab} />
        <SubNavRibbon active={activeTab} onChange={handleTabChange} />
        <div data-ocid="about.content">
          {activeTab === "about-university" && <AboutUniversityTab />}
          {activeTab === "board-of-governance" && <BoardOfGovernanceTab />}
          {activeTab === "authorities-committees" && <AuthoritiesTab />}
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
