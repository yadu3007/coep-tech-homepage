import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Mail,
  Phone,
  Users,
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
} as const;

// ─── Scroll reveal hook ────────────────────────────────────────────────────────
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

// ─── Data ──────────────────────────────────────────────────────────────────────
interface AdminPerson {
  slug: string;
  role: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  photo?: string;
  message?: string;
  bio: string;
  areas: string[];
  education?: string[];
  achievements?: string[];
}

const ADMIN_PEOPLE: AdminPerson[] = [
  {
    slug: "vc",
    role: "Vice Chancellor",
    name: "Prof. S. G. Bhirud",
    designation: "Vice Chancellor, COEP Technological University",
    email: "vc@coeptech.ac.in",
    phone: "020-25507001",
    photo: "/assets/generated/admin-vc-photo.dim_400x480.jpg",
    message:
      "Welcome to COEP Technological University — an institution with 170 years of excellence in engineering education. Since our establishment in 1854, we have been committed to nurturing engineers who not only excel technically but contribute meaningfully to society. Our university stands at a pivotal moment, transitioning from a college to a full university, and we are poised to take our research, innovation, and academic standards to global heights. I invite you to join us in this remarkable journey of discovery, learning, and nation-building.",
    bio: "Prof. S. G. Bhirud is the Vice Chancellor of COEP Technological University. With decades of distinguished academic and research experience in Computer Science and Engineering, Prof. Bhirud has been instrumental in transforming COEP from a renowned college into a full-fledged technological university. He has spearheaded numerous initiatives in research, industry collaboration, and global partnerships.",
    areas: [
      "University Leadership & Governance",
      "Research & Innovation Strategy",
      "Academic Policy & Development",
      "Industry & International Partnerships",
      "Digital Transformation Initiatives",
    ],
    education: [
      "Ph.D. in Computer Science & Engineering",
      "M.Tech., IIT Bombay",
      "B.E., COEP Pune",
    ],
    achievements: [
      "Led COEP's transition to a full Technological University",
      "Established RIIL — Research, Innovation, Incubation & Linkages Board",
      "Initiated multiple international MoUs with global universities",
      "Champion of digital infrastructure and smart campus initiatives",
    ],
  },
  {
    slug: "registrar",
    role: "Registrar",
    name: "Dr. D. N. Sonawane",
    designation: "Registrar, COEP Technological University",
    email: "registrar@coeptech.ac.in",
    phone: "020-25507002",
    photo: "/assets/generated/admin-registrar-photo.dim_400x480.jpg",
    message:
      "The Registrar's office serves as the backbone of COEP Tech's academic and administrative operations. From student enrollment to examination management, from statutory compliance to faculty coordination — we ensure that every process at COEP Tech runs smoothly and in alignment with our commitment to excellence and transparency.",
    bio: "Dr. D. N. Sonawane serves as the Registrar of COEP Technological University, overseeing all administrative, academic, and legal operations of the university. With an extensive background in university administration and governance, Dr. Sonawane ensures smooth coordination between academic departments, regulatory bodies, and the university management.",
    areas: [
      "Academic Administration & Records",
      "Student Enrollment & Examinations",
      "Statutory & Regulatory Compliance",
      "Faculty Coordination",
      "Legal & Governance Affairs",
    ],
    education: ["Ph.D. in Engineering", "M.E., COEP Pune", "B.E. (Honors)"],
    achievements: [
      "Streamlined student enrollment and verification systems",
      "Led NAAC accreditation documentation and processes",
      "Digitized university administrative records",
      "Coordinated UGC and AICTE compliance frameworks",
    ],
  },
];

interface Director {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const DIRECTORS: Director[] = [
  {
    id: "riil",
    name: "Dr. S. P. Mahajan",
    designation: "Director, RIIL",
    department: "Board of Research, Innovation, Incubation and Linkages",
    email: "fao@coeptech.ac.in",
    phone: "020-25507003",
    description:
      "Leads COEP's research ecosystem, fostering innovation, incubation of startups, and strategic industry-academia linkages. Oversees the university's research output, patents, and funding from government and private bodies.",
    color: C.cobalt,
    icon: <BookOpen size={28} strokeWidth={1.5} />,
  },
  {
    id: "boee",
    name: "Dr. Y. V. Haribhakta",
    designation: "Director, BoEE",
    department: "Board of Examination and Evaluation",
    email: "director.exam@coeptech.ac.in",
    phone: "020-25507010",
    description:
      "Oversees the entire examination and evaluation process at COEP Tech, ensuring academic integrity, timely results, and fairness across all programs and departments.",
    color: C.deepBlue,
    icon: <GraduationCap size={28} strokeWidth={1.5} />,
  },
  {
    id: "krc",
    name: "Dr. A. R. Mahajan",
    designation: "Director, KRC",
    department: "Knowledge Resource Center",
    email: "director.krc@coeptech.ac.in",
    phone: "020-25507020",
    description:
      "Manages COEP's Knowledge Resource Center (Library), overseeing digital and physical collections, e-resources, and academic support services for faculty and students.",
    color: C.midnight,
    icon: <Building2 size={28} strokeWidth={1.5} />,
  },
  {
    id: "bsd",
    name: "Dr. R. K. Joshi",
    designation: "Director, BSD",
    department: "Board of Students' Development",
    email: "director.students@coeptech.ac.in",
    phone: "020-25507025",
    description:
      "Leads all student development initiatives including co-curricular activities, clubs, sports, NSS, cultural events, and welfare programs at COEP Technological University.",
    color: "#1B5E91",
    icon: <Users size={28} strokeWidth={1.5} />,
  },
];

interface Dean {
  name: string;
  role: string;
  designation: string;
  email: string;
  phone: string;
  slug: string;
  type: "dean" | "associate-dean";
  areas: string[];
  bio: string;
  education?: string[];
}

const DEANS: Dean[] = [
  {
    name: "Dr. P. A. Sadgir",
    role: "Dean School of Engineering & Technology",
    designation: "Professor of Civil Engineering and Dean",
    email: "dean.engineering@coeptech.ac.in",
    phone: "020-25507004",
    slug: "pa-sadgir",
    type: "dean",
    areas: [
      "Academic programs in Engineering & Technology",
      "Curriculum development and review",
      "Faculty affairs and recruitment",
      "Quality assurance of engineering education",
    ],
    bio: "Dr. P. A. Sadgir is a distinguished professor of Civil Engineering serving as the Dean of the School of Engineering and Technology at COEP Technological University. With decades of experience in structural engineering, materials science, and academia, Dr. Sadgir leads all engineering schools with academic rigor and innovation.",
    education: [
      "Ph.D., Civil Engineering",
      "M.Tech., IIT Bombay",
      "B.E., COEP Pune",
    ],
  },
  {
    name: "Prof. C. Y. Patil",
    role: "Dean School of Multidisciplinary Sciences",
    designation: "Professor of Instrumentation & Control Engineering and Dean",
    email: "dean.shm@coeptech.ac.in",
    phone: "020-25507005",
    slug: "cy-patil",
    type: "dean",
    areas: [
      "School of Multidisciplinary Sciences, Humanities & Management Studies",
      "Interdisciplinary curriculum design",
      "Management studies and humanities programs",
      "Research collaboration across schools",
    ],
    bio: "Prof. C. Y. Patil serves as the Dean of the School of Multidisciplinary Sciences, Humanities, and Management Studies. An expert in Instrumentation and Control Engineering, Prof. Patil champions interdisciplinary education and has built bridges between engineering, management, and liberal arts at COEP Tech.",
    education: [
      "Ph.D., Instrumentation Engineering",
      "M.Tech.",
      "B.E., COEP Pune",
    ],
  },
];

const ASSOCIATE_DEANS: Dean[] = [
  {
    name: "Dr. P. P. Bartakke",
    role: "Associate Dean",
    designation:
      "Associate Professor, Electronics & Telecommunication Engineering",
    email: "dean.ece@coeptech.ac.in",
    phone: "020-25507007",
    slug: "pp-bartakke",
    type: "associate-dean",
    areas: [
      "Electronics & Telecommunication academic oversight",
      "Student academic affairs",
      "Industry interface for ECE disciplines",
      "Research initiatives in ECE",
    ],
    bio: "Dr. Prashant P. Bartakke is an Associate Professor in the Department of Electronics and Telecommunication Engineering and serves as an Associate Dean at COEP Technological University. His research spans signal processing, embedded systems, and IoT technologies.",
    education: ["Ph.D., Electronics Engineering", "M.E.", "B.E., COEP Pune"],
  },
  {
    name: "Dr. S. A. Meshram",
    role: "Associate Dean",
    designation: "Associate Professor, Department of Management Studies",
    email: "adean.shm@coeptech.ac.in",
    phone: "020-25507006",
    slug: "sa-meshram",
    type: "associate-dean",
    areas: [
      "Management education and curriculum",
      "Student development in SHM School",
      "Research output in management",
      "Industry collaboration for MBA programs",
    ],
    bio: "Dr. Sandeep A. Meshram is a distinguished faculty member in the Department of Management Studies and serves as Associate Dean at COEP Tech. His academic work focuses on operations management, supply chain, and quantitative methods for business decision-making.",
    education: ["Ph.D., Management Studies", "MBA", "B.E."],
  },
  {
    name: "Dr. K. V. Dalvi",
    role: "Associate Dean",
    designation: "Associate Professor, Department of Mathematics",
    email: "kvd.maths@coeptech.ac.in",
    phone: "020-25507008",
    slug: "kv-dalvi",
    type: "associate-dean",
    areas: [
      "Applied Mathematics and Sciences",
      "Interdisciplinary research support",
      "Academic calendar and scheduling",
      "Student academic performance oversight",
    ],
    bio: "Dr. Kiran V. Dalvi is an Associate Professor in the Department of Mathematics and serves as Associate Dean at COEP Technological University. A specialist in mathematical modeling, numerical methods, and applied analysis, Dr. Dalvi contributes to both academic administration and research.",
    education: ["Ph.D., Applied Mathematics", "M.Sc., Mathematics", "B.Sc."],
  },
];

// ─── Sub-page: Individual Profile Page ────────────────────────────────────────
function ProfilePage({
  person,
  onBack,
}: { person: AdminPerson | Dean; onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const isAdminPerson = "message" in person;
  const photo = isAdminPerson ? (person as AdminPerson).photo : undefined;

  return (
    <Layout>
      <Header />
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>
        <UniversityTabsSection />
        {/* Hero */}
        <div
          style={{
            background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 60%, ${C.cobalt} 100%)`,
            borderBottom: `4px solid ${C.gold}`,
          }}
          className="relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 50%, rgba(232,196,42,0.07) 0%, transparent 55%)",
            }}
            aria-hidden="true"
          />
          <div className="container max-w-7xl mx-auto px-6 py-16 relative z-10">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 mb-8 font-body text-sm transition-all duration-200"
              style={{ color: "rgba(255,255,255,0.65)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = C.gold;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.65)";
              }}
              data-ocid="admin.profile.back_button"
            >
              <ArrowLeft size={15} />
              Back to Administration
            </button>
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {photo ? (
                <img
                  src={photo}
                  alt={person.name}
                  className="w-48 h-56 object-cover shrink-0"
                  style={{
                    borderRadius: "4px",
                    border: `3px solid ${C.gold}`,
                    boxShadow: "0 20px 48px rgba(0,0,0,0.35)",
                  }}
                />
              ) : (
                <div
                  className="w-48 h-56 shrink-0 flex items-center justify-center font-display font-bold text-4xl"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    border: "2px solid rgba(232,196,42,0.4)",
                    color: C.gold,
                  }}
                >
                  {person.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
              <div>
                <span
                  className="inline-block text-xs font-body font-bold uppercase tracking-[0.22em] px-4 py-1.5 mb-4"
                  style={{
                    background: "rgba(232,196,42,0.15)",
                    border: "1px solid rgba(232,196,42,0.4)",
                    color: C.gold,
                    borderRadius: "2px",
                  }}
                >
                  {person.role}
                </span>
                <h1
                  className="font-display font-bold leading-tight mb-3"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.white }}
                >
                  {person.name}
                </h1>
                <p
                  className="font-body text-base mb-5"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {person.designation}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-2 font-body text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        C.gold;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.65)";
                    }}
                  >
                    <Mail size={14} style={{ color: C.gold }} />
                    {person.email}
                  </a>
                  <span
                    className="flex items-center gap-2 font-body text-sm"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    <Phone size={14} style={{ color: C.gold }} />
                    {person.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Body */}
        <div className="container max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Bio + Message */}
            <div className="lg:col-span-2 space-y-10">
              {isAdminPerson && (person as AdminPerson).message && (
                <div
                  className="p-8 relative"
                  style={{
                    background: "#F4F7FF",
                    borderLeft: `5px solid ${C.gold}`,
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  <div
                    className="absolute top-5 left-6 font-display text-8xl leading-none pointer-events-none select-none"
                    style={{ color: "rgba(232,196,42,0.15)", lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    "
                  </div>
                  <blockquote
                    className="font-body text-lg leading-relaxed relative z-10 mb-5 italic"
                    style={{ color: C.body }}
                  >
                    {(person as AdminPerson).message}
                  </blockquote>
                  <cite
                    className="font-body font-semibold text-sm not-italic"
                    style={{ color: C.cobalt }}
                  >
                    — {person.name}, {person.role}
                  </cite>
                </div>
              )}

              <div>
                <h2
                  className="font-display font-bold text-2xl mb-5"
                  style={{
                    color: C.deepBlue,
                    borderBottom: `2px solid ${C.gold}`,
                    paddingBottom: "10px",
                    display: "inline-block",
                  }}
                >
                  About
                </h2>
                <p
                  className="font-body text-base leading-relaxed"
                  style={{ color: C.body }}
                >
                  {person.bio}
                </p>
              </div>

              <div>
                <h2
                  className="font-display font-bold text-2xl mb-5"
                  style={{
                    color: C.deepBlue,
                    borderBottom: `2px solid ${C.gold}`,
                    paddingBottom: "10px",
                    display: "inline-block",
                  }}
                >
                  Areas of Responsibility
                </h2>
                <ul className="space-y-3">
                  {person.areas.map((area) => (
                    <li key={area} className="flex items-start gap-3">
                      <ChevronRight
                        size={16}
                        className="shrink-0 mt-0.5"
                        style={{ color: C.gold }}
                      />
                      <span
                        className="font-body text-base"
                        style={{ color: C.body }}
                      >
                        {area}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Education + Achievements */}
            <div className="space-y-8">
              {"education" in person &&
                (person as AdminPerson | Dean).education && (
                  <div
                    className="p-7"
                    style={{
                      background: "#F4F7FF",
                      border: "1px solid rgba(22,72,200,0.12)",
                      borderRadius: "8px",
                    }}
                  >
                    <h3
                      className="font-display font-bold text-lg mb-5"
                      style={{ color: C.deepBlue }}
                    >
                      Education
                    </h3>
                    <ul className="space-y-3">
                      {((person as AdminPerson | Dean).education ?? []).map(
                        (edu) => (
                          <li key={edu} className="flex items-start gap-3">
                            <div
                              className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                              style={{ background: C.cobalt }}
                            />
                            <span
                              className="font-body text-sm"
                              style={{ color: C.body }}
                            >
                              {edu}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

              {isAdminPerson && (person as AdminPerson).achievements && (
                <div
                  className="p-7"
                  style={{ background: C.midnight, borderRadius: "8px" }}
                >
                  <h3
                    className="font-display font-bold text-lg mb-5"
                    style={{ color: C.gold }}
                  >
                    Key Achievements
                  </h3>
                  <ul className="space-y-3">
                    {((person as AdminPerson).achievements ?? []).map((ach) => (
                      <li key={ach} className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                          style={{ background: C.gold }}
                        />
                        <span
                          className="font-body text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.78)" }}
                        >
                          {ach}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact card */}
              <div
                className="p-7"
                style={{
                  background: `linear-gradient(135deg, ${C.cobalt} 0%, ${C.deepBlue} 100%)`,
                  borderRadius: "8px",
                }}
              >
                <h3
                  className="font-display font-bold text-lg mb-5"
                  style={{ color: C.white }}
                >
                  Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-3 font-body text-sm transition-all duration-200"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        C.gold;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.82)";
                    }}
                  >
                    <Mail size={15} style={{ color: C.gold, flexShrink: 0 }} />
                    {person.email}
                  </a>
                  <div
                    className="flex items-center gap-3 font-body text-sm"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  >
                    <Phone size={15} style={{ color: C.gold, flexShrink: 0 }} />
                    {person.phone}
                  </div>
                  <div
                    className="flex items-center gap-3 font-body text-sm"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  >
                    <Building2
                      size={15}
                      style={{ color: C.gold, flexShrink: 0 }}
                    />
                    COEP Technological University,
                    <br />
                    Pune – 411 005
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}

// ─── VC / Registrar Message Modal ─────────────────────────────────────────────
function MessageModal({
  person,
  onClose,
}: {
  person: AdminPerson;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(8,30,92,0.72)" }}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role="presentation"
      data-ocid="admin.message.dialog"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 32px 80px rgba(8,30,92,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Gold top bar */}
        <div
          style={{
            height: "4px",
            background: `linear-gradient(90deg, ${C.gold}, rgba(232,196,42,0.4), transparent)`,
          }}
        />

        <div className="p-8 md:p-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(22,72,200,0.06)",
              borderRadius: "50%",
              color: C.cobalt,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                C.cobalt;
              (e.currentTarget as HTMLButtonElement).style.color = C.white;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(22,72,200,0.06)";
              (e.currentTarget as HTMLButtonElement).style.color = C.cobalt;
            }}
            aria-label="Close message"
            data-ocid="admin.message.close_button"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1" style={{ background: C.gold }} />
            <span
              className="font-body text-xs uppercase tracking-[0.22em] font-bold"
              style={{ color: C.gold }}
            >
              Message from the {person.role}
            </span>
            <div className="h-px flex-1" style={{ background: C.gold }} />
          </div>

          <div className="relative mb-6">
            <div
              className="absolute -top-4 -left-2 font-display text-8xl leading-none pointer-events-none select-none"
              style={{ color: "rgba(232,196,42,0.18)", lineHeight: 1 }}
              aria-hidden="true"
            >
              "
            </div>
            <blockquote
              className="font-body text-lg leading-relaxed italic relative z-10"
              style={{ color: C.body }}
            >
              {person.message}
            </blockquote>
          </div>

          <div
            className="flex items-center gap-4 pt-5 border-t"
            style={{ borderColor: "rgba(22,72,200,0.1)" }}
          >
            {person.photo && (
              <img
                src={person.photo}
                alt={person.name}
                className="w-14 h-14 object-cover shrink-0"
                style={{ borderRadius: "4px", border: `2px solid ${C.gold}` }}
              />
            )}
            <div>
              <p
                className="font-display font-bold text-base"
                style={{ color: C.deepBlue }}
              >
                {person.name}
              </p>
              <p className="font-body text-sm" style={{ color: C.muted }}>
                {person.designation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Director Modal ────────────────────────────────────────────────────────────
function DirectorModal({
  director,
  onClose,
}: { director: Director; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(8,30,92,0.72)" }}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role="presentation"
      data-ocid="admin.director.dialog"
    >
      <div
        className="relative w-full max-w-lg"
        style={{
          background: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 32px 80px rgba(8,30,92,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div
          style={{
            height: "4px",
            background: `linear-gradient(90deg, ${director.color}, rgba(232,196,42,0.4), transparent)`,
          }}
        />
        <div className="p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(22,72,200,0.06)",
              borderRadius: "50%",
              color: C.cobalt,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                C.cobalt;
              (e.currentTarget as HTMLButtonElement).style.color = C.white;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(22,72,200,0.06)";
              (e.currentTarget as HTMLButtonElement).style.color = C.cobalt;
            }}
            aria-label="Close"
            data-ocid="admin.director.close_button"
          >
            <X size={16} />
          </button>

          <div
            className="w-16 h-16 flex items-center justify-center mb-5"
            style={{
              background: director.color,
              borderRadius: "8px",
              color: C.white,
            }}
          >
            {director.icon}
          </div>

          <span
            className="inline-block text-xs font-body font-bold uppercase tracking-[0.2em] px-3 py-1 mb-3"
            style={{
              background: "rgba(22,72,200,0.07)",
              color: director.color,
              borderRadius: "2px",
            }}
          >
            {director.designation}
          </span>
          <h3
            className="font-display font-bold text-2xl mb-2"
            style={{ color: C.deepBlue }}
          >
            {director.name}
          </h3>
          <p
            className="font-body text-sm font-semibold mb-5"
            style={{ color: C.muted }}
          >
            {director.department}
          </p>
          <p
            className="font-body text-sm leading-relaxed mb-6"
            style={{ color: C.body }}
          >
            {director.description}
          </p>
          <div
            className="space-y-2 pt-4 border-t"
            style={{ borderColor: "rgba(22,72,200,0.1)" }}
          >
            <a
              href={`mailto:${director.email}`}
              className="flex items-center gap-2 font-body text-sm transition-colors duration-200"
              style={{ color: C.cobalt }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.deepBlue;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.cobalt;
              }}
            >
              <Mail size={14} style={{ color: C.gold }} />
              {director.email}
            </a>
            <div
              className="flex items-center gap-2 font-body text-sm"
              style={{ color: C.muted }}
            >
              <Phone size={14} style={{ color: C.gold }} />
              {director.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
function AdminHero() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ minHeight: "280px", display: "flex", alignItems: "flex-end" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('/assets/generated/admin-hero-bg.dim_1400x400.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${C.midnight}ee 0%, ${C.deepBlue}cc 50%, ${C.cobalt}99 100%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: C.gold }}
        aria-hidden="true"
      />

      <div className="container max-w-7xl mx-auto px-6 pb-12 pt-20 relative z-10">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 mb-5 text-xs font-body"
          aria-label="Breadcrumb"
        >
          <a
            href="#/"
            className="transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.55)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = C.gold;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.55)";
            }}
          >
            Home
          </a>
          <ChevronRight size={11} style={{ color: "rgba(255,255,255,0.3)" }} />
          <span style={{ color: C.gold }}>Administration</span>
        </nav>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: C.gold }} />
          <span
            className="font-body text-xs uppercase tracking-[0.28em] font-bold"
            style={{ color: C.gold }}
          >
            University Governance
          </span>
          <div className="h-px w-10" style={{ background: C.gold }} />
        </div>
        <h1
          className="font-display font-bold leading-tight"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            color: C.white,
            letterSpacing: "-0.02em",
          }}
        >
          Administration
        </h1>
        <p
          className="font-body text-lg mt-3 max-w-2xl"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          COEP Technological University Leadership
        </p>
      </div>
    </div>
  );
}

// ─── VC / Registrar Featured Section ──────────────────────────────────────────
function LeaderCard({
  person,
  reversed = false,
  onReadMessage,
  onViewProfile,
}: {
  person: AdminPerson;
  reversed?: boolean;
  onReadMessage: (p: AdminPerson) => void;
  onViewProfile: (p: AdminPerson) => void;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="py-16 md:py-24"
      style={{
        background: reversed ? C.bg : "#ffffff",
        borderBottom: "1px solid rgba(22,72,200,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition:
          "opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)",
      }}
      data-ocid={`admin.${person.slug}.section`}
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div
          className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-16 items-center`}
        >
          {/* Photo */}
          <div className="md:w-2/5 relative">
            <div
              className="absolute pointer-events-none"
              style={{
                top: reversed ? "auto" : "-16px",
                bottom: reversed ? "-16px" : "auto",
                left: reversed ? "auto" : "-16px",
                right: reversed ? "-16px" : "auto",
                width: "80px",
                height: "80px",
                borderTop: reversed ? "none" : `3px solid ${C.gold}`,
                borderLeft: reversed ? "none" : `3px solid ${C.gold}`,
                borderBottom: reversed ? `3px solid ${C.gold}` : "none",
                borderRight: reversed ? `3px solid ${C.gold}` : "none",
              }}
              aria-hidden="true"
            />
            <img
              src={person.photo}
              alt={person.name}
              className="w-full object-cover"
              style={{
                height: "480px",
                borderRadius: "4px",
                boxShadow: "0 28px 72px rgba(8,30,92,0.22)",
                objectPosition: "top",
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: reversed ? "auto" : "-16px",
                top: reversed ? "-16px" : "auto",
                right: reversed ? "auto" : "-16px",
                left: reversed ? "-16px" : "auto",
                width: "80px",
                height: "80px",
                borderBottom: reversed ? "none" : `3px solid ${C.gold}`,
                borderRight: reversed ? "none" : `3px solid ${C.gold}`,
                borderTop: reversed ? `3px solid ${C.gold}` : "none",
                borderLeft: reversed ? `3px solid ${C.gold}` : "none",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div
            className={`md:w-3/5 ${reversed ? "md:text-left" : "md:text-left"}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: C.gold }} />
              <span
                className="font-body text-xs uppercase tracking-[0.28em] font-bold"
                style={{ color: C.gold }}
              >
                {person.role}
              </span>
            </div>

            <h2
              className="font-display font-bold leading-tight mb-3"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: C.deepBlue,
              }}
            >
              {person.name}
            </h2>
            <p
              className="font-body text-base mb-6 font-medium"
              style={{ color: C.muted }}
            >
              {person.designation}
            </p>

            <p
              className="font-body text-base leading-relaxed mb-8"
              style={{ color: C.body }}
            >
              {person.bio.slice(0, 240)}...
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onReadMessage(person)}
                className="flex items-center gap-2 font-body font-bold text-sm transition-all duration-200 group"
                style={{ color: C.cobalt }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    C.deepBlue;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = C.cobalt;
                }}
                data-ocid={`admin.${person.slug}.read_message_button`}
              >
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
                Read Message
              </button>

              <span style={{ color: "rgba(22,72,200,0.2)" }}>|</span>

              <button
                type="button"
                onClick={() => onViewProfile(person)}
                className="flex items-center gap-2 font-body text-sm transition-all duration-200"
                style={{ color: C.muted }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = C.cobalt;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = C.muted;
                }}
                data-ocid={`admin.${person.slug}.view_profile_button`}
              >
                <ExternalLink size={13} />
                Full Profile
              </button>
            </div>

            {/* Contact pills */}
            <div
              className="flex flex-wrap gap-3 mt-6 pt-6 border-t"
              style={{ borderColor: "rgba(22,72,200,0.1)" }}
            >
              <a
                href={`mailto:${person.email}`}
                className="flex items-center gap-2 px-4 py-2 font-body text-xs font-semibold transition-all duration-200"
                style={{
                  background: "rgba(22,72,200,0.06)",
                  border: "1px solid rgba(22,72,200,0.2)",
                  color: C.cobalt,
                  borderRadius: "100px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    C.cobalt;
                  (e.currentTarget as HTMLAnchorElement).style.color = C.white;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(22,72,200,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.color = C.cobalt;
                }}
              >
                <Mail size={12} />
                {person.email}
              </a>
              <span
                className="flex items-center gap-2 px-4 py-2 font-body text-xs font-semibold"
                style={{
                  background: "rgba(22,72,200,0.06)",
                  border: "1px solid rgba(22,72,200,0.2)",
                  color: C.cobalt,
                  borderRadius: "100px",
                }}
              >
                <Phone size={12} />
                {person.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Directors Section ─────────────────────────────────────────────────────────
function DirectorsSection({
  onDirectorClick,
}: { onDirectorClick: (d: Director) => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: `linear-gradient(180deg, ${C.midnight} 0%, ${C.deepBlue} 100%)`,
      }}
      data-ocid="admin.directors.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: C.gold }} />
            <span
              className="font-body text-xs uppercase tracking-[0.28em] font-bold"
              style={{ color: C.gold }}
            >
              University Directorate
            </span>
            <div className="h-px w-10" style={{ background: C.gold }} />
          </div>
          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.white }}
          >
            Directors
          </h2>
          <p
            className="font-body text-base mt-4 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Click on a director's card to learn more about their role and
            responsibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIRECTORS.map((director, idx) => (
            <button
              key={director.id}
              type="button"
              onClick={() => onDirectorClick(director)}
              className="text-left transition-all duration-350 group"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "32px 24px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ease ${idx * 0.12}s, transform 0.7s ease ${idx * 0.12}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(255,255,255,0.1)";
                el.style.borderColor = C.gold;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 20px 48px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(255,255,255,0.05)";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
              data-ocid={`admin.directors.item.${idx + 1}`}
            >
              <div
                className="w-14 h-14 flex items-center justify-center mb-5"
                style={{
                  background: "rgba(232,196,42,0.12)",
                  border: "1px solid rgba(232,196,42,0.3)",
                  borderRadius: "8px",
                  color: C.gold,
                  transition: "background 0.3s ease",
                }}
              >
                {director.icon}
              </div>
              <div
                className="text-xs font-body font-bold uppercase tracking-[0.18em] mb-2"
                style={{ color: "rgba(232,196,42,0.8)" }}
              >
                {director.designation}
              </div>
              <h3
                className="font-display font-bold text-lg leading-tight mb-2"
                style={{ color: C.white }}
              >
                {director.name}
              </h3>
              <p
                className="font-body text-xs leading-relaxed mb-5"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {director.department}
              </p>
              <div
                className="flex items-center gap-2 font-body text-xs font-semibold transition-all duration-200"
                style={{ color: "rgba(232,196,42,0.65)" }}
              >
                <span>View Details</span>
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Deans & Associate Deans ───────────────────────────────────────────────────
function DeansSection({
  onViewProfile,
}: { onViewProfile: (person: Dean) => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      className="py-20 md:py-28"
      style={{ background: "#ffffff" }}
      data-ocid="admin.deans.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: C.gold }} />
            <span
              className="font-body text-xs uppercase tracking-[0.28em] font-bold"
              style={{ color: C.gold }}
            >
              Academic Leadership
            </span>
            <div className="h-px w-10" style={{ background: C.gold }} />
          </div>
          <h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.deepBlue }}
          >
            Deans &amp; Associate Deans
          </h2>
          <p
            className="font-body text-base mt-4 max-w-xl mx-auto"
            style={{ color: C.muted }}
          >
            University Leadership — academic heads guiding COEP's schools and
            programs.
          </p>
        </div>

        {/* Deans */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <h3
              className="font-display font-bold text-xl"
              style={{ color: C.deepBlue }}
            >
              Deans
            </h3>
            <div
              className="h-px flex-1"
              style={{ background: "rgba(22,72,200,0.12)" }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEANS.map((dean, idx) => (
              <button
                key={dean.slug}
                type="button"
                onClick={() => onViewProfile(dean)}
                className="flex items-start gap-5 p-6 text-left transition-all duration-250 group"
                style={{
                  background: C.bg,
                  border: "1px solid rgba(22,72,200,0.1)",
                  borderLeft: `4px solid ${C.cobalt}`,
                  borderRadius: "0 8px 8px 0",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 0.6s ease ${idx * 0.1}s, transform 0.6s ease ${idx * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "#eef2ff";
                  el.style.transform = "translateX(4px)";
                  el.style.boxShadow = "0 8px 32px rgba(22,72,200,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = C.bg;
                  el.style.transform = "translateX(0)";
                  el.style.boxShadow = "none";
                }}
                data-ocid={`admin.deans.item.${idx + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0"
                  style={{ background: C.cobalt, color: C.white }}
                >
                  {dean.name
                    .split(" ")
                    .filter((w) => !w.startsWith("Dr") && !w.startsWith("Prof"))
                    .map((w) => w[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="font-display font-bold text-base leading-tight mb-1"
                    style={{ color: C.deepBlue }}
                  >
                    {dean.name}
                  </h4>
                  <p
                    className="font-body text-xs uppercase tracking-wide font-semibold mb-1"
                    style={{ color: C.cobalt }}
                  >
                    {dean.role}
                  </p>
                  <p className="font-body text-xs" style={{ color: C.muted }}>
                    {dean.designation}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <a
                      href={`mailto:${dean.email}`}
                      className="font-body text-xs transition-colors duration-200"
                      style={{ color: C.cobalt }}
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          C.deepBlue;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          C.cobalt;
                      }}
                    >
                      {dean.email}
                    </a>
                    <span style={{ color: "rgba(22,72,200,0.2)" }}>|</span>
                    <span
                      className="font-body text-xs"
                      style={{ color: C.muted }}
                    >
                      {dean.phone}
                    </span>
                  </div>
                </div>
                <ExternalLink
                  size={14}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1"
                  style={{ color: C.cobalt }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Associate Deans */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3
              className="font-display font-bold text-xl"
              style={{ color: C.deepBlue }}
            >
              Associate Deans
            </h3>
            <div
              className="h-px flex-1"
              style={{ background: "rgba(22,72,200,0.12)" }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ASSOCIATE_DEANS.map((dean, idx) => (
              <button
                key={dean.slug}
                type="button"
                onClick={() => onViewProfile(dean)}
                className="flex flex-col gap-3 p-6 text-left transition-all duration-250 group"
                style={{
                  background: C.bg,
                  border: "1px solid rgba(22,72,200,0.1)",
                  borderTop: `3px solid ${C.deepBlue}`,
                  borderRadius: "0 0 8px 8px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${idx * 0.12}s, transform 0.6s ease ${idx * 0.12}s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "#eef2ff";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 12px 32px rgba(22,72,200,0.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = C.bg;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
                data-ocid={`admin.associate_deans.item.${idx + 1}`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs shrink-0"
                  style={{ background: C.deepBlue, color: C.white }}
                >
                  {dean.name
                    .split(" ")
                    .filter((w) => !w.startsWith("Dr") && !w.startsWith("Prof"))
                    .map((w) => w[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <h4
                    className="font-display font-bold text-base leading-tight mb-1"
                    style={{ color: C.deepBlue }}
                  >
                    {dean.name}
                  </h4>
                  <p
                    className="font-body text-xs uppercase tracking-wide font-semibold mb-1"
                    style={{ color: C.cobalt }}
                  >
                    {dean.role}
                  </p>
                  <p
                    className="font-body text-xs leading-relaxed"
                    style={{ color: C.muted }}
                  >
                    {dean.designation}
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-auto">
                  <span
                    className="font-body text-xs"
                    style={{ color: C.cobalt }}
                  >
                    View Profile
                  </span>
                  <ExternalLink
                    size={11}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: C.cobalt }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Administration Page (main) ────────────────────────────────────────────────
export function AdministrationPage() {
  const [messageModal, setMessageModal] = useState<AdminPerson | null>(null);
  const [directorModal, setDirectorModal] = useState<Director | null>(null);
  const [profilePerson, setProfilePerson] = useState<AdminPerson | Dean | null>(
    null,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (profilePerson) {
    return (
      <ProfilePage
        person={profilePerson}
        onBack={() => setProfilePerson(null)}
      />
    );
  }

  return (
    <Layout>
      <Header />
      <main style={{ background: "#ffffff" }}>
        <UniversityTabsSection />
        <AdminHero />

        {/* VC */}
        <LeaderCard
          person={ADMIN_PEOPLE[0]}
          reversed={false}
          onReadMessage={setMessageModal}
          onViewProfile={setProfilePerson}
        />

        {/* Registrar */}
        <LeaderCard
          person={ADMIN_PEOPLE[1]}
          reversed={true}
          onReadMessage={setMessageModal}
          onViewProfile={setProfilePerson}
        />

        {/* Directors */}
        <DirectorsSection onDirectorClick={setDirectorModal} />

        {/* Deans */}
        <DeansSection onViewProfile={setProfilePerson} />

        {/* Modals */}
        {messageModal && (
          <MessageModal
            person={messageModal}
            onClose={() => setMessageModal(null)}
          />
        )}
        {directorModal && (
          <DirectorModal
            director={directorModal}
            onClose={() => setDirectorModal(null)}
          />
        )}
      </main>
      <Footer />
    </Layout>
  );
}
