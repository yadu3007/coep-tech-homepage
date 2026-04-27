import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
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

// ─── Programme Types ────────────────────────────────────────────────────────────
type ProgramTab = "btech" | "mtech" | "mba" | "phd" | "pgdiploma";

const PROGRAM_TABS: { id: ProgramTab; label: string; icon: string }[] = [
  { id: "btech", label: "B.Tech", icon: "⚙️" },
  { id: "mtech", label: "M.Tech", icon: "🔬" },
  { id: "mba", label: "MBA", icon: "📊" },
  { id: "phd", label: "PhD", icon: "🎓" },
  { id: "pgdiploma", label: "PG Diploma", icon: "📜" },
];

// ─── Enquiry data ───────────────────────────────────────────────────────────────
const ENQUIRY: Record<
  ProgramTab,
  { type: string; name: string; phone: string; email: string; room: string }
> = {
  btech: {
    type: "Admissions Cell",
    name: "Mrs. Sunita Kulkarni",
    phone: "020-25507130",
    email: "admissions@coeptech.ac.in",
    room: "Room 101, Admin Block",
  },
  mtech: {
    type: "PG Admissions",
    name: "Dr. Priya Joshi",
    phone: "020-25507131",
    email: "pg-admissions@coeptech.ac.in",
    room: "Room 102, Admin Block",
  },
  mba: {
    type: "MBA Admissions",
    name: "Dr. S.A. Meshram",
    phone: "020-25507045",
    email: "mba@coeptech.ac.in",
    room: "DMS Office, Building 5",
  },
  phd: {
    type: "Research Office",
    name: "Dr. S.P. Mahajan",
    phone: "020-25507200",
    email: "research@coeptech.ac.in",
    room: "Room 201, Research Block",
  },
  pgdiploma: {
    type: "Academic Cell",
    name: "Prof. R.K. Sharma",
    phone: "020-25507132",
    email: "pgdip@coeptech.ac.in",
    room: "Room 103, Admin Block",
  },
};

// ─── Programmes data ────────────────────────────────────────────────────────────
type ProgramRow = {
  programme: string;
  duration: string;
  seats: string;
  eligibility: string;
};

const PROGRAMMES: Record<ProgramTab, ProgramRow[]> = {
  btech: [
    {
      programme: "Computer Engineering",
      duration: "4 Years",
      seats: "120",
      eligibility: "10+2 with PCM",
    },
    {
      programme: "Mechanical Engineering",
      duration: "4 Years",
      seats: "120",
      eligibility: "10+2 with PCM",
    },
    {
      programme: "Electronics & Telecomm Engineering",
      duration: "4 Years",
      seats: "60",
      eligibility: "10+2 with PCM",
    },
    {
      programme: "Civil Engineering",
      duration: "4 Years",
      seats: "60",
      eligibility: "10+2 with PCM",
    },
    {
      programme: "Electrical Engineering",
      duration: "4 Years",
      seats: "60",
      eligibility: "10+2 with PCM",
    },
    {
      programme: "Instrumentation & Control Engg",
      duration: "4 Years",
      seats: "30",
      eligibility: "10+2 with PCM",
    },
    {
      programme: "Metallurgy & Materials Science",
      duration: "4 Years",
      seats: "30",
      eligibility: "10+2 with PCM",
    },
    {
      programme: "Production Engineering",
      duration: "4 Years",
      seats: "30",
      eligibility: "10+2 with PCM",
    },
    {
      programme: "Chemical Engineering",
      duration: "4 Years",
      seats: "60",
      eligibility: "10+2 with PCM",
    },
    {
      programme: "Information Technology",
      duration: "4 Years",
      seats: "60",
      eligibility: "10+2 with PCM",
    },
  ],
  mtech: [
    {
      programme: "Computer Science & Engineering",
      duration: "2 Years",
      seats: "18",
      eligibility: "B.Tech/B.E. in relevant field",
    },
    {
      programme: "Mechanical Engineering",
      duration: "2 Years",
      seats: "18",
      eligibility: "B.Tech/B.E. Mechanical",
    },
    {
      programme: "VLSI Design & Embedded Systems",
      duration: "2 Years",
      seats: "18",
      eligibility: "B.Tech/B.E. Electronics",
    },
    {
      programme: "Structural Engineering",
      duration: "2 Years",
      seats: "18",
      eligibility: "B.Tech/B.E. Civil",
    },
    {
      programme: "Power Systems",
      duration: "2 Years",
      seats: "18",
      eligibility: "B.Tech/B.E. Electrical",
    },
  ],
  mba: [
    {
      programme: "MBA (General Management)",
      duration: "2 Years",
      seats: "60",
      eligibility: "Graduation + Entrance Test",
    },
    {
      programme: "MBA (Business Analytics)",
      duration: "2 Years",
      seats: "30",
      eligibility: "Graduation + Entrance Test",
    },
  ],
  phd: [
    {
      programme: "All Engineering Disciplines",
      duration: "3–5 Years",
      seats: "As per openings",
      eligibility: "M.Tech/M.E. or equivalent",
    },
  ],
  pgdiploma: [
    {
      programme: "Advanced Manufacturing",
      duration: "1 Year",
      seats: "30",
      eligibility: "B.Tech/B.E.",
    },
    {
      programme: "Industrial Automation",
      duration: "1 Year",
      seats: "30",
      eligibility: "B.Tech/B.E.",
    },
  ],
};

// ─── Fee structure ──────────────────────────────────────────────────────────────
type FeeCategory = "first" | "lateral" | "working";

const FEE_CATEGORIES: Record<ProgramTab, { id: FeeCategory; label: string }[]> =
  {
    btech: [
      { id: "first", label: "1st Year Admission" },
      { id: "lateral", label: "Direct 2nd Year (Lateral)" },
      { id: "working", label: "Working Professionals" },
    ],
    mtech: [
      { id: "first", label: "Regular Admission" },
      { id: "working", label: "Sponsored / Working" },
    ],
    mba: [
      { id: "first", label: "Full-Time MBA" },
      { id: "working", label: "Executive Track" },
    ],
    phd: [
      { id: "first", label: "Full-Time PhD" },
      { id: "working", label: "Part-Time PhD" },
    ],
    pgdiploma: [
      { id: "first", label: "Regular" },
      { id: "working", label: "Working Professionals" },
    ],
  };

type FeeRow = { type: string; amount: string };
type FeeData = { rows: FeeRow[]; note?: string };

const FEES: Record<ProgramTab, Record<FeeCategory, FeeData>> = {
  btech: {
    first: {
      rows: [
        { type: "Tuition Fees", amount: "₹88,150 per year" },
        { type: "Development Fees", amount: "₹15,000 per year" },
        { type: "Exam Fees", amount: "₹5,000 per year" },
        { type: "Library Fees", amount: "₹3,000 per year" },
        { type: "Total", amount: "₹1,11,150 per year" },
      ],
      note: "SC/ST/NT/OBC categories eligible for government fee concessions",
    },
    lateral: {
      rows: [
        { type: "Tuition Fees", amount: "₹88,150 per year" },
        { type: "Development Fees", amount: "₹15,000 per year" },
        { type: "Exam Fees", amount: "₹5,000 per year" },
        { type: "Library Fees", amount: "₹3,000 per year" },
        { type: "Total", amount: "₹1,11,150 per year" },
      ],
      note: "Lateral entry admitted directly to 3rd semester. Same fee structure applies.",
    },
    working: {
      rows: [
        { type: "Tuition Fees", amount: "₹95,000 per year" },
        { type: "Development Fees", amount: "₹15,000 per year" },
        { type: "Exam Fees", amount: "₹5,000 per year" },
        { type: "Total", amount: "₹1,15,000 per year" },
      ],
      note: "Contact admissions office for sponsorship letter requirements.",
    },
  },
  mtech: {
    first: {
      rows: [
        { type: "Tuition Fees", amount: "₹1,15,000 per year" },
        { type: "Development Fees", amount: "₹20,000 per year" },
        { type: "Total", amount: "₹1,35,000 per year" },
      ],
    },
    lateral: {
      rows: [
        { type: "Tuition Fees", amount: "₹1,15,000 per year" },
        { type: "Development Fees", amount: "₹20,000 per year" },
        { type: "Total", amount: "₹1,35,000 per year" },
      ],
    },
    working: {
      rows: [
        { type: "Tuition Fees", amount: "₹1,25,000 per year" },
        { type: "Development Fees", amount: "₹20,000 per year" },
        { type: "Total", amount: "₹1,45,000 per year" },
      ],
      note: "Sponsored candidates require employer certification letter.",
    },
  },
  mba: {
    first: {
      rows: [
        { type: "Tuition Fees", amount: "₹1,35,000 per year" },
        { type: "Development Fees", amount: "₹25,000 per year" },
        { type: "Total", amount: "₹1,60,000 per year" },
      ],
    },
    lateral: {
      rows: [
        { type: "Tuition Fees", amount: "₹1,35,000 per year" },
        { type: "Development Fees", amount: "₹25,000 per year" },
        { type: "Total", amount: "₹1,60,000 per year" },
      ],
    },
    working: {
      rows: [
        { type: "Tuition Fees", amount: "₹1,50,000 per year" },
        { type: "Development Fees", amount: "₹25,000 per year" },
        { type: "Total", amount: "₹1,75,000 per year" },
      ],
    },
  },
  phd: {
    first: {
      rows: [
        { type: "Tuition Fees", amount: "₹30,000 per year" },
        { type: "Research Fees", amount: "₹20,000 per year" },
        { type: "Total", amount: "₹50,000 per year" },
      ],
      note: "JRF/SRF fellows may be eligible for fee waiver.",
    },
    lateral: {
      rows: [
        { type: "Tuition Fees", amount: "₹30,000 per year" },
        { type: "Research Fees", amount: "₹20,000 per year" },
        { type: "Total", amount: "₹50,000 per year" },
      ],
    },
    working: {
      rows: [
        { type: "Tuition Fees", amount: "₹45,000 per year" },
        { type: "Research Fees", amount: "₹20,000 per year" },
        { type: "Total", amount: "₹65,000 per year" },
      ],
    },
  },
  pgdiploma: {
    first: {
      rows: [
        { type: "Tuition Fees", amount: "₹60,000" },
        { type: "Lab Fees", amount: "₹10,000" },
        { type: "Total", amount: "₹70,000" },
      ],
    },
    lateral: {
      rows: [
        { type: "Tuition Fees", amount: "₹60,000" },
        { type: "Lab Fees", amount: "₹10,000" },
        { type: "Total", amount: "₹70,000" },
      ],
    },
    working: {
      rows: [
        { type: "Tuition Fees", amount: "₹70,000" },
        { type: "Lab Fees", amount: "₹10,000" },
        { type: "Total", amount: "₹80,000" },
      ],
    },
  },
};

// ─── Important Dates ────────────────────────────────────────────────────────────
const IMPORTANT_DATES: Record<ProgramTab, { event: string; date: string }[]> = {
  btech: [
    {
      event: "Registration Opens on DTE Maharashtra Portal",
      date: "February 2025",
    },
    { event: "Application Form Submission Deadline", date: "May 2025" },
    { event: "MHT-CET Examination", date: "May 2025" },
    { event: "CAP Round 1 Allotment", date: "June 2025" },
    { event: "CAP Round 2 Allotment", date: "July 2025" },
    { event: "Academic Session Commences", date: "August 2025" },
  ],
  mtech: [
    { event: "GATE Score Card Registration", date: "January 2025" },
    { event: "Application Window Opens", date: "March 2025" },
    { event: "Entrance Test / Interview", date: "May 2025" },
    { event: "Merit List Publication", date: "June 2025" },
    { event: "Academic Session Commences", date: "August 2025" },
  ],
  mba: [
    { event: "CAT / MAH-CET Registration", date: "November 2024" },
    { event: "MAH-MBA-CET Exam", date: "March 2025" },
    { event: "Application to COEP DMS Opens", date: "April 2025" },
    { event: "GD/PI Rounds", date: "May 2025" },
    { event: "Academic Session Commences", date: "July 2025" },
  ],
  phd: [
    { event: "Application Window Opens", date: "January 2025" },
    { event: "Application Deadline", date: "March 2025" },
    { event: "Written Test / Interview", date: "April 2025" },
    { event: "Provisional Admission Offers", date: "May 2025" },
    { event: "Academic Session Commences", date: "July 2025" },
  ],
  pgdiploma: [
    { event: "Application Opens", date: "March 2025" },
    { event: "Application Deadline", date: "June 2025" },
    { event: "Merit List & Admission", date: "July 2025" },
    { event: "Programme Commencement", date: "August 2025" },
  ],
};

// ─── How To Apply steps ─────────────────────────────────────────────────────────
const HOW_TO_APPLY: Record<
  ProgramTab,
  { step: number; title: string; desc: string }[]
> = {
  btech: [
    {
      step: 1,
      title: "Register on DTE Maharashtra Portal",
      desc: "Visit dtemaharashtra.gov.in and create your applicant profile with valid credentials.",
    },
    {
      step: 2,
      title: "Fill Application Form",
      desc: "Complete the online application accurately with personal, academic, and contact details.",
    },
    {
      step: 3,
      title: "Upload Documents",
      desc: "Upload 10th & 12th marksheets, MHT-CET scorecard, photo, signature, and caste certificate if applicable.",
    },
    {
      step: 4,
      title: "Pay Application Fee",
      desc: "Pay the non-refundable application fee online via net banking, credit/debit card, or UPI.",
    },
    {
      step: 5,
      title: "Report for Document Verification",
      desc: "Attend document verification at the designated facilitation center with originals and photocopies.",
    },
  ],
  mtech: [
    {
      step: 1,
      title: "Register on DTE Maharashtra Portal",
      desc: "Visit dtemaharashtra.gov.in and complete your postgraduate applicant profile.",
    },
    {
      step: 2,
      title: "Submit GATE Scorecard",
      desc: "Enter your valid GATE score. COEP accepts scores from the last 2 years.",
    },
    {
      step: 3,
      title: "Upload Documents",
      desc: "Upload B.Tech/B.E. degree, GATE scorecard, photo, signature, and relevant certificates.",
    },
    {
      step: 4,
      title: "Pay Application Fee",
      desc: "Pay the processing fee online through the portal.",
    },
    {
      step: 5,
      title: "Attend Counselling",
      desc: "Appear for centralized counselling and report for admission with all original documents.",
    },
  ],
  mba: [
    {
      step: 1,
      title: "Appear for Entrance Test",
      desc: "Register and appear for CAT / MAH-MBA-CET. Scores are valid for the current admissions cycle.",
    },
    {
      step: 2,
      title: "Apply to COEP DMS",
      desc: "Fill the COEP DMS application form at coeptech.ac.in under Admissions → MBA.",
    },
    {
      step: 3,
      title: "Group Discussion & PI",
      desc: "Shortlisted candidates are called for GD and Personal Interview at the COEP campus.",
    },
    {
      step: 4,
      title: "Upload Documents",
      desc: "Graduation certificate, entrance test scorecard, work experience certificate (if applicable).",
    },
    {
      step: 5,
      title: "Confirm Admission",
      desc: "Pay the admission fee and submit the enrollment form to confirm your seat.",
    },
  ],
  phd: [
    {
      step: 1,
      title: "Check Advertised Vacancies",
      desc: "Visit coeptech.ac.in Research section for current PhD openings in your discipline.",
    },
    {
      step: 2,
      title: "Contact Prospective Supervisor",
      desc: "Reach out to a faculty member whose research interests align with yours.",
    },
    {
      step: 3,
      title: "Submit Research Proposal",
      desc: "Write and submit a 2-page research proposal along with the application form.",
    },
    {
      step: 4,
      title: "Written Test & Interview",
      desc: "Appear for a written aptitude test followed by a research interview panel.",
    },
    {
      step: 5,
      title: "Admission & Enrollment",
      desc: "Successful candidates receive provisional admission and register for the programme.",
    },
  ],
  pgdiploma: [
    {
      step: 1,
      title: "Check Programme Availability",
      desc: "Verify that your desired PG Diploma programme has seats available in the current cycle.",
    },
    {
      step: 2,
      title: "Fill Application Form",
      desc: "Complete the online form at coeptech.ac.in with academic and professional details.",
    },
    {
      step: 3,
      title: "Upload Documents",
      desc: "B.Tech/B.E. certificate, transcripts, photo, and identity proof.",
    },
    {
      step: 4,
      title: "Pay Application Fee",
      desc: "Pay the application processing fee through the portal.",
    },
    {
      step: 5,
      title: "Report for Admission",
      desc: "Attend the admission process and submit originals for verification to confirm enrolment.",
    },
  ],
};

// ─── Sidebar quick stats ────────────────────────────────────────────────────────
const SIDEBAR_STATS: Record<
  ProgramTab,
  { icon: React.ReactNode; label: string; value: string }[]
> = {
  btech: [
    { icon: <GraduationCap size={18} />, label: "Total Seats", value: "630+" },
    { icon: <BookOpen size={18} />, label: "Programmes", value: "10" },
    { icon: <Clock size={18} />, label: "Duration", value: "4 Years" },
  ],
  mtech: [
    { icon: <GraduationCap size={18} />, label: "Total Seats", value: "90" },
    { icon: <BookOpen size={18} />, label: "Specialisations", value: "5" },
    { icon: <Clock size={18} />, label: "Duration", value: "2 Years" },
  ],
  mba: [
    { icon: <GraduationCap size={18} />, label: "Total Seats", value: "90" },
    { icon: <BookOpen size={18} />, label: "Tracks", value: "2" },
    { icon: <Clock size={18} />, label: "Duration", value: "2 Years" },
  ],
  phd: [
    {
      icon: <GraduationCap size={18} />,
      label: "Active Scholars",
      value: "80+",
    },
    { icon: <BookOpen size={18} />, label: "Disciplines", value: "12+" },
    { icon: <Clock size={18} />, label: "Duration", value: "3–5 Years" },
  ],
  pgdiploma: [
    { icon: <GraduationCap size={18} />, label: "Total Seats", value: "60" },
    { icon: <BookOpen size={18} />, label: "Programmes", value: "2" },
    { icon: <Clock size={18} />, label: "Duration", value: "1 Year" },
  ],
};

// ─── Gradient helper ────────────────────────────────────────────────────────────
const GRAD_TB = `linear-gradient(90deg, ${C.midnight} 0%, ${C.cobalt} 100%)`;
const GRAD_CORNER = `linear-gradient(135deg, ${C.cobalt} 0%, ${C.deepBlue} 100%)`;
const GRAD_GOLD = `linear-gradient(135deg, ${C.gold} 0%, #c9a820 100%)`;

// ─── Shared table cell style ────────────────────────────────────────────────────
const tdStyle: React.CSSProperties = {
  padding: "13px 18px",
  fontFamily: "'Source Sans 3', sans-serif",
  fontSize: "0.92rem",
  color: C.body,
  borderBottom: "1px solid #e5eaf8",
  verticalAlign: "middle",
};

const thStyle: React.CSSProperties = {
  color: C.white,
  fontFamily: "'Source Sans 3', sans-serif",
  fontWeight: 700,
  fontSize: "0.82rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding: "14px 18px",
  textAlign: "left",
};

// ─── Section heading helper ─────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        color: C.deepBlue,
        fontSize: "1.5rem",
        fontWeight: 700,
        marginBottom: "0.75rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 4,
          height: 28,
          background: C.gold,
          borderRadius: 2,
          marginRight: 12,
          flexShrink: 0,
        }}
      />
      {children}
    </h3>
  );
}

// ─── Enquiry Section ────────────────────────────────────────────────────────────
function EnquirySection({ tab }: { tab: ProgramTab }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const e = ENQUIRY[tab];
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <SectionHeading>Admission Enquiry</SectionHeading>
      <div
        style={{
          overflowX: "auto",
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(22,72,200,0.10)",
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}
        >
          <thead>
            <tr style={{ background: GRAD_TB }}>
              {["Contact Type", "Name", "Phone", "Email", "Room"].map((h) => (
                <th key={h} style={thStyle}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: C.bgAlt }}>
              <td style={tdStyle}>{e.type}</td>
              <td style={{ ...tdStyle, fontWeight: 600, color: C.deepBlue }}>
                {e.name}
              </td>
              <td style={tdStyle}>
                <a
                  href={`tel:${e.phone}`}
                  style={{
                    color: C.cobalt,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Phone size={14} />
                  {e.phone}
                </a>
              </td>
              <td style={tdStyle}>
                <a
                  href={`mailto:${e.email}`}
                  style={{
                    color: C.cobalt,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Mail size={14} />
                  {e.email}
                </a>
              </td>
              <td style={tdStyle}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={14} color={C.muted} />
                  {e.room}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Programmes Table ───────────────────────────────────────────────────────────
function ProgrammesTable({ tab }: { tab: ProgramTab }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const rows = PROGRAMMES[tab];
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s",
      }}
    >
      <SectionHeading>Our Programmes</SectionHeading>
      <div
        style={{
          overflowX: "auto",
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(22,72,200,0.10)",
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", minWidth: 460 }}
        >
          <thead>
            <tr style={{ background: GRAD_TB }}>
              {["Programme", "Duration", "Seats", "Eligibility"].map((h) => (
                <th key={h} style={thStyle}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <ProgRow key={r.programme} r={r} i={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProgRow({ r, i }: { r: ProgramRow; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      style={{
        background: hovered ? "#dce6fa" : i % 2 === 0 ? C.white : C.bgAlt,
        transition: "background 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td style={{ ...tdStyle, fontWeight: 600, color: C.deepBlue }}>
        {r.programme}
      </td>
      <td style={tdStyle}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "#EEF2FF",
            color: C.cobalt,
            padding: "2px 10px",
            borderRadius: 20,
            fontWeight: 600,
            fontSize: "0.82rem",
          }}
        >
          <Clock size={12} />
          {r.duration}
        </span>
      </td>
      <td style={{ ...tdStyle, textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            background: C.cobalt,
            color: C.white,
            padding: "2px 12px",
            borderRadius: 20,
            fontWeight: 700,
            fontSize: "0.88rem",
          }}
        >
          {r.seats}
        </span>
      </td>
      <td style={tdStyle}>{r.eligibility}</td>
    </tr>
  );
}

// ─── Fee Structure ──────────────────────────────────────────────────────────────
function FeeStructureSection({ tab }: { tab: ProgramTab }) {
  const categories = FEE_CATEGORIES[tab] ?? FEE_CATEGORIES.btech;
  const [active, setActive] = useState<FeeCategory>(
    categories[0]?.id ?? "first",
  );
  const { ref, visible } = useReveal<HTMLDivElement>();

  // Reset active fee category whenever the program tab changes
  useEffect(() => {
    setActive(categories[0]?.id ?? "first");
  }, [categories]);

  const feeData = (FEES[tab] as Record<string, FeeData | undefined>)[active] ??
    FEES[tab][categories[0]?.id ?? "first"] ?? { rows: [] };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s",
      }}
    >
      <SectionHeading>Fee Structure</SectionHeading>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${String(categories.length)}, 1fr)`,
          gap: 12,
          marginBottom: 20,
        }}
      >
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              data-ocid={`admissions.fee_${cat.id}_button`}
              onClick={() => setActive(cat.id)}
              style={{
                padding: "16px 12px",
                borderRadius: 12,
                border: `2px solid ${isActive ? C.cobalt : "#D1D9F0"}`,
                background: isActive ? GRAD_CORNER : C.white,
                color: isActive ? C.white : C.body,
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: isActive
                  ? "0 6px 20px rgba(22,72,200,0.25)"
                  : "0 2px 8px rgba(0,0,0,0.05)",
                transform: isActive ? "translateY(-2px)" : "none",
                textAlign: "center",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(22,72,200,0.12)",
          border: "1px solid #D1D9F0",
          transition: "all 0.3s ease",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: GRAD_TB }}>
              <th style={{ ...thStyle, width: "60%" }}>Fee Component</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {feeData.rows.map((r, i) => {
              const isTotal = r.type === "Total";
              return (
                <tr
                  key={r.type}
                  style={{
                    background: isTotal
                      ? `linear-gradient(90deg, ${C.bgAlt} 0%, #dce6fa 100%)`
                      : i % 2 === 0
                        ? C.white
                        : C.bgAlt,
                    borderTop: isTotal ? `2px solid ${C.cobalt}` : "none",
                  }}
                >
                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: isTotal ? 700 : 400,
                      color: isTotal ? C.deepBlue : C.body,
                      fontSize: isTotal ? "1rem" : "0.92rem",
                    }}
                  >
                    {r.type}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontWeight: isTotal ? 800 : 500,
                      color: isTotal ? C.cobalt : C.body,
                      fontSize: isTotal ? "1.05rem" : "0.92rem",
                      fontFamily: isTotal
                        ? "'Playfair Display', serif"
                        : "'Source Sans 3', sans-serif",
                    }}
                  >
                    {r.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {feeData.note && (
          <div
            style={{
              background: "#FEF9E7",
              borderTop: `2px solid ${C.gold}`,
              padding: "10px 18px",
              fontSize: "0.82rem",
              color: C.body,
              fontFamily: "'Source Sans 3', sans-serif",
              display: "flex",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            <span style={{ color: C.gold, fontWeight: 700, flexShrink: 0 }}>
              ℹ
            </span>
            {feeData.note}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── How To Apply ───────────────────────────────────────────────────────────────
function HowToApplySection({ tab }: { tab: ProgramTab }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const steps = HOW_TO_APPLY[tab];
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.65s ease 0.2s, transform 0.65s ease 0.2s",
      }}
    >
      <SectionHeading>How to Apply</SectionHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {steps.map((s, i) => (
          <div
            key={s.step}
            style={{
              display: "flex",
              gap: 16,
              position: "relative",
              paddingBottom: i < steps.length - 1 ? 24 : 0,
            }}
          >
            {i < steps.length - 1 && (
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: 19,
                  top: 44,
                  bottom: 0,
                  width: 2,
                  background: `linear-gradient(180deg, ${C.cobalt} 0%, ${C.bgAlt} 100%)`,
                  opacity: 0.5,
                }}
              />
            )}
            <div
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: GRAD_CORNER,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.white,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(22,72,200,0.3)",
                zIndex: 1,
              }}
            >
              {s.step}
            </div>
            <div style={{ paddingTop: 6 }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  color: C.deepBlue,
                  fontSize: "1rem",
                  marginBottom: 4,
                }}
              >
                {s.title}
              </div>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.9rem",
                  color: C.muted,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Important Dates ────────────────────────────────────────────────────────────
function ImportantDatesSection({ tab }: { tab: ProgramTab }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState(true);
  const dates = IMPORTANT_DATES[tab];
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.65s ease 0.25s, transform 0.65s ease 0.25s",
        borderRadius: 12,
        border: "1px solid #D1D9F0",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(22,72,200,0.08)",
      }}
    >
      <button
        type="button"
        data-ocid="admissions.dates_accordion_toggle"
        onClick={() => setOpen((p) => !p)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: GRAD_TB,
          color: C.white,
          border: "none",
          cursor: "pointer",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "1.1rem",
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Calendar size={18} />
          Important Dates &amp; Deadlines
        </span>
        <ChevronDown
          size={20}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? 600 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ padding: "8px 0" }}>
          {dates.map((d, i) => (
            <div
              key={d.event}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                background: i % 2 === 0 ? C.white : C.bgAlt,
                borderBottom: "1px solid #e5eaf8",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.92rem",
                  color: C.body,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ChevronRight size={14} color={C.cobalt} />
                {d.event}
              </span>
              <span
                style={{
                  background: GRAD_CORNER,
                  color: C.white,
                  padding: "3px 14px",
                  borderRadius: 20,
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.03em",
                }}
              >
                {d.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Link Button ────────────────────────────────────────────────────────
function SidebarLinkBtn({
  href,
  ocid,
  children,
  variant = "gold",
}: {
  href: string;
  ocid: string;
  children: React.ReactNode;
  variant?: "gold" | "outline";
}) {
  const [hov, setHov] = useState(false);
  const isGold = variant === "gold";
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      data-ocid={ocid}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block",
        background: isGold
          ? hov
            ? "#f0d04a"
            : GRAD_GOLD
          : hov
            ? C.cobalt
            : C.white,
        color: isGold ? C.midnight : hov ? C.white : C.cobalt,
        fontFamily: "'Source Sans 3', sans-serif",
        fontWeight: 800,
        fontSize: "0.95rem",
        padding: "16px 20px",
        borderRadius: 12,
        textAlign: "center",
        textDecoration: "none",
        boxShadow: isGold
          ? "0 6px 24px rgba(232,196,42,0.4)"
          : "0 2px 8px rgba(22,72,200,0.08)",
        border: isGold ? "none" : `2px solid ${C.cobalt}`,
        transition: "all 0.2s ease",
        transform: hov ? "translateY(-2px)" : "none",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </a>
  );
}

// ─── Sidebar Download Button ────────────────────────────────────────────────────
function SidebarDownloadBtn() {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      data-ocid="admissions.prospectus_button"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block",
        background: hov ? C.cobalt : C.white,
        color: hov ? C.white : C.cobalt,
        fontFamily: "'Source Sans 3', sans-serif",
        fontWeight: 700,
        fontSize: "0.9rem",
        padding: "14px 20px",
        borderRadius: 12,
        textAlign: "center",
        border: `2px solid ${C.cobalt}`,
        cursor: "pointer",
        width: "100%",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 8px rgba(22,72,200,0.08)",
        transform: hov ? "translateY(-1px)" : "none",
      }}
    >
      📥 Download Prospectus
    </button>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState<ProgramTab>("btech");
  const contentRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const update = () => {
      const header = document.querySelector("header") as HTMLElement | null;
      const ribbon = document.querySelector(
        "[data-tabs-ribbon]",
      ) as HTMLElement | null;
      setStickyTop((header?.offsetHeight ?? 0) + (ribbon?.offsetHeight ?? 0));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const switchTab = (tab: ProgramTab) => {
    setActiveTab(tab);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const tabInfo =
    PROGRAM_TABS.find((t) => t.id === activeTab) ?? PROGRAM_TABS[0];
  const stats = SIDEBAR_STATS[activeTab] ?? SIDEBAR_STATS.btech;
  const sidebarSticky =
    stickyTop + (stickyRef.current?.offsetHeight ?? 56) + 24;

  return (
    <Layout>
      <Header />
      <UniversityTabsSection />

      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <div
        data-ocid="admissions.hero_banner"
        style={{
          position: "relative",
          height: 220,
          background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 50%, ${C.cobalt} 100%)`,
          overflow: "hidden",
        }}
      >
        <img
          src="/assets/generated/admissions-hero.dim_1600x320.jpg"
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.22,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: -60,
            top: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "40px solid rgba(232,196,42,0.12)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: 60,
            bottom: -80,
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "30px solid rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <BreadcrumbLink />
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: C.white,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Admissions{" "}
            <span style={{ color: C.gold, fontStyle: "italic" }}>2025–26</span>
          </h1>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.05rem",
              margin: "8px 0 0",
              letterSpacing: "0.01em",
            }}
          >
            Shaping Tomorrow&apos;s Engineers Today
          </p>
        </div>
      </div>

      {/* ── Program Tabs Ribbon ─────────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        data-ribbon="admissions-tabs"
        style={{
          position: "sticky",
          top: stickyTop,
          zIndex: 40,
          background: C.white,
          borderBottom: `3px solid ${C.cobalt}`,
          boxShadow: "0 4px 20px rgba(22,72,200,0.12)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {PROGRAM_TABS.map((tab) => (
            <ProgramTabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => switchTab(tab.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div
        ref={contentRef}
        style={{ background: C.bg, minHeight: "60vh" }}
        data-ocid="admissions.content_area"
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "40px 24px 60px",
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {/* Programme pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 20px",
                background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.cobalt} 100%)`,
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(22,72,200,0.18)",
              }}
            >
              <span style={{ fontSize: "1.6rem" }}>{tabInfo.icon}</span>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 800,
                    color: C.white,
                    fontSize: "1.3rem",
                  }}
                >
                  {tabInfo.label} Programme
                </div>
                <div
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.82rem",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  COEP Technological University · Pune
                </div>
              </div>
            </div>

            <EnquirySection tab={activeTab} />
            <Divider />
            <ProgrammesTable tab={activeTab} />
            <Divider />
            <FeeStructureSection tab={activeTab} />
            <Divider />
            <HowToApplySection tab={activeTab} />
            <Divider />
            <ImportantDatesSection tab={activeTab} />
          </div>

          {/* Sidebar */}
          <aside>
            <div
              style={{
                position: "sticky",
                top: sidebarSticky,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Highlights card */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 100%)`,
                  borderRadius: 16,
                  padding: "24px 20px",
                  color: C.white,
                  boxShadow: "0 8px 32px rgba(8,30,92,0.25)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    marginBottom: 16,
                    color: C.gold,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Programme Highlights
                </div>
                {stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.85rem",
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      <span style={{ color: C.gold, opacity: 0.9 }}>
                        {s.icon}
                      </span>
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 800,
                        fontSize: "1.1rem",
                        color: C.gold,
                      }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              <SidebarLinkBtn
                href="https://dtemaharashtra.gov.in"
                ocid="admissions.apply_cta_button"
                variant="gold"
              >
                Apply Now →
              </SidebarLinkBtn>

              <SidebarDownloadBtn />

              {/* Helpline */}
              <div
                style={{
                  background: C.white,
                  borderRadius: 12,
                  padding: "18px 16px",
                  border: "1px solid #D1D9F0",
                  boxShadow: "0 2px 10px rgba(22,72,200,0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    color: C.deepBlue,
                    fontSize: "0.95rem",
                    marginBottom: 12,
                  }}
                >
                  Admission Helpline
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <a
                    href="tel:020-25507000"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: C.cobalt,
                      textDecoration: "none",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    <Phone size={14} />
                    020-25507000
                  </a>
                  <a
                    href="mailto:admissions@coeptech.ac.in"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: C.cobalt,
                      textDecoration: "none",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      wordBreak: "break-all",
                    }}
                  >
                    <Mail size={14} />
                    admissions@coeptech.ac.in
                  </a>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      color: C.muted,
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.82rem",
                    }}
                  >
                    <MapPin size={14} style={{ flexShrink: 0, marginTop: 2 }} />
                    Wellesley Road, Shivajinagar, Pune – 411005
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}

// ─── Small helpers ──────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, #D1D9F0, transparent)",
      }}
    />
  );
}

function BreadcrumbLink() {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
        fontSize: "0.78rem",
        fontFamily: "'Source Sans 3', sans-serif",
        color: "rgba(255,255,255,0.65)",
      }}
    >
      <a
        href="#/"
        style={{
          color: hov ? C.gold : "rgba(255,255,255,0.65)",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        Home
      </a>
      <ChevronRight size={12} />
      <span style={{ color: C.gold, fontWeight: 600 }}>Admissions</span>
    </div>
  );
}

function ProgramTabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: { id: ProgramTab; label: string; icon: string };
  isActive: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      data-ocid={`admissions.tab_${tab.id}`}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        padding: "16px 24px",
        border: "none",
        borderBottom: `3px solid ${isActive ? C.gold : "transparent"}`,
        background: "transparent",
        color: isActive ? C.cobalt : hov ? C.cobalt : C.muted,
        fontFamily: "'Source Sans 3', sans-serif",
        fontWeight: isActive ? 700 : 500,
        fontSize: "0.95rem",
        cursor: "pointer",
        transition: "all 0.25s ease",
        display: "flex",
        alignItems: "center",
        gap: 6,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        marginBottom: -3,
      }}
    >
      <span>{tab.icon}</span>
      {tab.label}
    </button>
  );
}
