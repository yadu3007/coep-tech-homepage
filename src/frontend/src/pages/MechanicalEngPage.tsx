import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  Flame,
  Gauge,
  GraduationCap,
  Mail,
  Settings2,
  Sparkles,
  TrendingUp,
  Users,
  Wind,
  Wrench,
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

// ─── Faculty Data ─────────────────────────────────────────────────────────────
interface MechFaculty {
  id: number;
  name: string;
  designation: string;
  type: "head" | "professor" | "associate" | "assistant";
  email?: string;
  specialization: string;
  bio: string;
  initials: string;
  bgColor: string;
}

const MECH_FACULTY: MechFaculty[] = [
  {
    id: 1,
    name: "Dr. Sachin Mastud",
    designation: "Professor & Head of Department",
    type: "head",
    email: "hod.mech@coeptech.ac.in",
    specialization: "Advanced Manufacturing, Tribology, Surface Engineering",
    bio: "Distinguished researcher and educator leading the Department of Mechanical Engineering. Dr. Mastud's work in advanced manufacturing and tribology has earned international recognition, with 50+ publications in top-tier journals.",
    initials: "SM",
    bgColor: C.midnight,
  },
  {
    id: 2,
    name: "Dr. Vilas Warudkar",
    designation: "Professor",
    type: "professor",
    email: "vw.mech@coeptech.ac.in",
    specialization: "Wind Energy, Fluid Mechanics, Renewable Energy Systems",
    bio: "Pioneering researcher in wind energy and fluid mechanics with expertise in designing wind turbine systems optimized for Indian climate conditions. Recipient of multiple government-funded research grants.",
    initials: "VW",
    bgColor: C.cobalt,
  },
  {
    id: 3,
    name: "Dr. Prashant Pawar",
    designation: "Professor",
    type: "professor",
    email: "pp.mech@coeptech.ac.in",
    specialization: "Composite Materials, FRP Structures, Structural Analysis",
    bio: "Expert in fiber-reinforced polymer composites and structural analysis. His research contributes significantly to lightweight structural solutions for aerospace and automotive applications.",
    initials: "PP",
    bgColor: C.cobalt,
  },
  {
    id: 4,
    name: "Dr. Amit Patil",
    designation: "Associate Professor",
    type: "associate",
    email: "ap.mech@coeptech.ac.in",
    specialization: "CFD, Heat Transfer, Thermal Engineering",
    bio: "Computational fluid dynamics specialist with deep expertise in thermal system optimization. His simulations have been applied in industrial cooling systems and automotive thermal management.",
    initials: "AP",
    bgColor: C.deepBlue,
  },
  {
    id: 5,
    name: "Dr. Ganesh Talmale",
    designation: "Associate Professor",
    type: "associate",
    email: "gt.mech@coeptech.ac.in",
    specialization: "Machine Design, Vibration Analysis, Mechanical Systems",
    bio: "A specialist in dynamic systems and vibration control, Dr. Talmale bridges theoretical mechanics with practical industrial applications, with consulting experience across automotive and heavy machinery sectors.",
    initials: "GT",
    bgColor: C.deepBlue,
  },
  {
    id: 6,
    name: "Dr. Amol Shinde",
    designation: "Assistant Professor",
    type: "assistant",
    email: "as.mech@coeptech.ac.in",
    specialization:
      "Manufacturing Engineering, CNC Machining, Smart Manufacturing",
    bio: "Passionate about smart manufacturing and CNC automation. Dr. Shinde has worked on Industry 4.0 integration projects with leading Pune-based manufacturing companies and brings that practical knowledge to the classroom.",
    initials: "AS",
    bgColor: C.cobalt,
  },
  {
    id: 7,
    name: "Dr. Nilesh Patil",
    designation: "Assistant Professor",
    type: "assistant",
    email: "np.mech@coeptech.ac.in",
    specialization: "Robotics, Automation, Mechatronics",
    bio: "Robotics and automation researcher with a focus on autonomous systems and mechatronics. His work in robotic path planning and embedded control systems positions students for roles in India's growing automation industry.",
    initials: "NP",
    bgColor: C.cobalt,
  },
  {
    id: 8,
    name: "Dr. Sudhir Kamble",
    designation: "Associate Professor",
    type: "associate",
    email: "sk.mech@coeptech.ac.in",
    specialization: "Thermal Engineering, Energy Systems, Thermodynamics",
    bio: "Thermal engineering expert with extensive research in energy-efficient systems and sustainable thermal solutions. Collaborates with energy sector industries on waste heat recovery and power generation optimization.",
    initials: "SK",
    bgColor: C.deepBlue,
  },
];

// ─── Program Data ─────────────────────────────────────────────────────────────
interface MechProgram {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  duration: string;
  seats: string;
  eligibility: string;
  keyCourses: string[];
  learningOutcomes: string[];
  careerPaths: string[];
}

const MECH_PROGRAMS: MechProgram[] = [
  {
    id: "btech",
    label: "B.Tech Mechanical",
    icon: <Wrench size={32} strokeWidth={1.5} />,
    description:
      "COEP's flagship B.Tech in Mechanical Engineering is one of India's most sought-after undergraduate programs. Students gain a rigorous foundation in thermodynamics, fluid mechanics, machine design, and manufacturing — backed by world-class laboratories and deep industry connections.",
    duration: "4 Years",
    seats: "120 (Open: 72 | OBC: 27 | SC: 13 | ST: 8)",
    eligibility: "10+2 with PCM, MHT-CET / JEE Main",
    keyCourses: [
      "Engineering Mechanics",
      "Thermodynamics",
      "Fluid Mechanics",
      "Machine Design",
      "Manufacturing Processes",
      "Heat Transfer",
      "Automobile Engineering",
      "CAD/CAM",
    ],
    learningOutcomes: [
      "Apply principles of mechanics, thermodynamics, and materials science to real engineering problems",
      "Design mechanical components and systems using CAD/CAM tools and industry standards",
      "Analyse fluid flow and heat transfer problems for industrial and energy applications",
    ],
    careerPaths: [
      "Design Engineer",
      "R&D Engineer",
      "Production Engineer",
      "Thermal Systems Engineer",
      "Automotive Engineer",
      "Graduate Engineer Trainee (Core Industry)",
    ],
  },
  {
    id: "mtech",
    label: "M.Tech Mechanical",
    icon: <Settings2 size={32} strokeWidth={1.5} />,
    description:
      "The M.Tech program provides advanced specialization in Design Engineering, Manufacturing Engineering, or Thermal Engineering. Designed for engineers seeking deeper technical expertise and research capabilities, students benefit from state-of-the-art labs and industry collaborative projects.",
    duration: "2 Years",
    seats: "18 (GATE Score Required)",
    eligibility: "B.E./B.Tech in Mechanical or equivalent, valid GATE score",
    keyCourses: [
      "Advanced Machine Design",
      "Finite Element Analysis",
      "Advanced Manufacturing",
      "Computational Fluid Dynamics",
      "Advanced Thermodynamics",
      "Tribology & Surface Engineering",
    ],
    learningOutcomes: [
      "Conduct independent research and publish in peer-reviewed journals",
      "Apply advanced computational methods (FEA, CFD) to complex engineering challenges",
      "Develop specialization in Design, Manufacturing, or Thermal Engineering domain",
    ],
    careerPaths: [
      "Senior Design Engineer",
      "Research Scientist",
      "Product Development Lead",
      "Faculty / Academia",
      "R&D Manager",
      "Technical Specialist",
    ],
  },
  {
    id: "phd",
    label: "PhD Research",
    icon: <GraduationCap size={32} strokeWidth={1.5} />,
    description:
      "The doctoral program in Mechanical Engineering offers full-time and part-time pathways for scholars pursuing cutting-edge research. With strong industry and international academic connections, COEP PhD students contribute to the global body of knowledge in mechanical engineering.",
    duration: "3–5 Years (Full-time) / Up to 6 Years (Part-time)",
    seats: "Based on Faculty Availability",
    eligibility: "M.Tech / M.E. in relevant field, qualifying entrance test",
    keyCourses: [
      "Research Methodology & Scientific Writing",
      "Advanced CFD Simulation",
      "Tribology & Nano-tribology",
      "Robotics & Intelligent Systems",
      "Advanced MEMS & Micro-fabrication",
    ],
    learningOutcomes: [
      "Formulate original research questions and design rigorous experimental/computational methodologies",
      "Publish findings in high-impact international journals and conferences",
      "Contribute novel solutions to challenges in manufacturing, energy, design, or robotics",
    ],
    careerPaths: [
      "Research Scientist (ISRO, DRDO, BARC)",
      "University Professor / Faculty",
      "Senior R&D Engineer",
      "Innovation Lab Lead",
      "Technical Advisor / Consultant",
    ],
  },
];

// ─── Lab Data ─────────────────────────────────────────────────────────────────
const LABS = [
  {
    name: "Fluid Mechanics Laboratory",
    icon: <Wind size={28} />,
    description:
      "Equipped with PIV (Particle Image Velocimetry) systems, recirculating water channels, wind tunnel models, and flow visualization setups. Used for undergraduate experiments and advanced CFD validation research.",
    equipment: [
      "PIV System",
      "Recirculating Water Channel",
      "Wind Tunnel Models",
      "Flow Meters",
      "Pressure Transducers",
    ],
  },
  {
    name: "Heat Transfer Laboratory",
    icon: <Flame size={28} />,
    description:
      "Comprehensive setups for studying conduction, convection, and radiation heat transfer phenomena. Supports thermal engineering research and undergraduate coursework in thermodynamics and heat transfer.",
    equipment: [
      "Composite Wall Apparatus",
      "Pin Fin Setup",
      "Emissivity Measurement",
      "Heat Exchanger Rigs",
      "Natural Convection Setups",
    ],
  },
  {
    name: "Manufacturing & Metrology Lab",
    icon: <Gauge size={28} />,
    description:
      "State-of-the-art CNC turning centres, milling machines, lathes, and metrology equipment. The lab supports both undergraduate manufacturing processes coursework and advanced research in smart manufacturing.",
    equipment: [
      "CNC Turning Centre",
      "CNC Milling Machine",
      "Coordinate Measuring Machine (CMM)",
      "Surface Roughness Tester",
      "Tool Life Testing Setup",
    ],
  },
  {
    name: "CAD/CAM & Simulation Lab",
    icon: <Cpu size={28} />,
    description:
      "High-performance workstations with licensed CATIA V5, SolidWorks, ANSYS, AutoCAD, and Mastercam software. Used for product design, FEA simulations, CNC programming, and research in computational mechanics.",
    equipment: [
      "CATIA V5",
      "SolidWorks",
      "ANSYS Workbench",
      "AutoCAD",
      "Mastercam CNC Programming",
    ],
  },
  {
    name: "Automobile Engineering Lab",
    icon: <Settings2 size={28} />,
    description:
      "Features engine test beds, a chassis dynamometer, an automotive systems cut-section display, and emission testing equipment — one of the most comprehensive automobile labs in Pune's engineering institutions.",
    equipment: [
      "Engine Test Bed",
      "Chassis Dynamometer",
      "Emission Analyser",
      "Transmission Systems Cutaway",
      "Suspension & Steering Models",
    ],
  },
];

// ─── Research Areas ───────────────────────────────────────────────────────────
const RESEARCH_AREAS = [
  {
    title: "Computational Fluid Dynamics",
    icon: <Wind size={22} />,
    description:
      "Advanced CFD simulations applied to industrial flows, wind energy, and automotive aerodynamics using OpenFOAM, ANSYS Fluent, and in-house codes.",
  },
  {
    title: "Advanced Manufacturing & Tribology",
    icon: <Wrench size={22} />,
    description:
      "Research in non-traditional machining, surface engineering, micro-tribology, and smart manufacturing aligned with Industry 4.0 principles.",
  },
  {
    title: "Thermal Engineering & Energy Systems",
    icon: <Flame size={22} />,
    description:
      "Heat exchanger design, waste heat recovery, solar thermal systems, and energy-efficient industrial thermal management solutions.",
  },
  {
    title: "Machine Design & Vibration",
    icon: <Gauge size={22} />,
    description:
      "Dynamic systems modeling, finite element analysis for stress/fatigue, vibration diagnostics and active control for rotating machinery.",
  },
  {
    title: "Robotics & Automation",
    icon: <Cpu size={22} />,
    description:
      "Autonomous robotic systems, path planning algorithms, mechatronics integration, and collaborative robot (cobot) applications for industry.",
  },
  {
    title: "Composites & Structural Analysis",
    icon: <Zap size={22} />,
    description:
      "FRP composite design, failure analysis of laminated structures, nano-composites, and lightweight structural solutions for aerospace and automotive sectors.",
  },
];

// ─── Mech Stats ───────────────────────────────────────────────────────────────
const MECH_STATS = [
  {
    value: "1854",
    label: "Est. Year",
    description: "One of India's oldest engineering departments",
  },
  {
    value: "120",
    label: "B.Tech Seats",
    description: "Per academic year intake",
  },
  {
    value: "18",
    label: "M.Tech Seats",
    description: "Specialisation-focused postgraduate programme",
  },
  {
    value: "30+",
    label: "Expert Faculty",
    description: "Professors, researchers, and industry practitioners",
  },
  {
    value: "95%",
    label: "Placement Rate",
    description: "Strong industry connect with core sector companies",
  },
  {
    value: "Top 25",
    label: "National Rank",
    description: "Among top 25 Mechanical Engineering departments in India",
  },
];

// ─── Recruiters ───────────────────────────────────────────────────────────────
const MECH_RECRUITERS = [
  { name: "Tata Motors", sector: "Automotive" },
  { name: "Mahindra", sector: "Automotive" },
  { name: "Bajaj Auto", sector: "Automotive" },
  { name: "Cummins", sector: "Power & Energy" },
  { name: "Bosch", sector: "Automotive & Industrial" },
  { name: "Thermax", sector: "Energy" },
  { name: "Forbes Marshall", sector: "Industrial" },
  { name: "John Deere", sector: "Agriculture & Construction" },
  { name: "KPIT Technologies", sector: "Automotive IT" },
  { name: "L&T", sector: "Engineering & Construction" },
  { name: "Sandvik", sector: "Tools & Mining" },
  { name: "Atlas Copco", sector: "Industrial Equipment" },
  { name: "ISRO", sector: "Space & Defence" },
  { name: "DRDO", sector: "Defence R&D" },
  { name: "Emerson", sector: "Automation" },
  { name: "Parker Hannifin", sector: "Motion & Control" },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" data-ocid="mech.hero.section">
      <div
        className="relative overflow-hidden"
        style={{ minHeight: "520px", display: "flex", alignItems: "flex-end" }}
      >
        {/* Gradient background (no dept image uploaded — using premium cobalt gradient) */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 45%, ${C.cobalt} 100%)`,
          }}
          aria-hidden="true"
        />

        {/* Geometric decorative elements */}
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none"
          style={{ width: "45%", overflow: "hidden" }}
          aria-hidden="true"
        >
          <div
            style={{
              position: "absolute",
              right: "-60px",
              top: "20%",
              width: "380px",
              height: "380px",
              border: "2px solid rgba(232,196,42,0.12)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "40px",
              top: "30%",
              width: "220px",
              height: "220px",
              border: "2px solid rgba(232,196,42,0.08)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "120px",
              top: "25%",
              width: "140px",
              height: "140px",
              background: "rgba(232,196,42,0.04)",
              borderRadius: "50%",
            }}
          />
          {/* Gear-like decorative shape */}
          <div
            style={{
              position: "absolute",
              right: "60px",
              bottom: "15%",
              width: "90px",
              height: "90px",
              border: "1.5px solid rgba(232,196,42,0.15)",
              transform: "rotate(45deg)",
            }}
          />
        </div>

        {/* Bottom gradient for text legibility */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "60%",
            background:
              "linear-gradient(to top, rgba(8,30,92,0.92) 0%, rgba(8,30,92,0.5) 55%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Gold top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: C.gold }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="container max-w-7xl mx-auto px-6 pb-14 pt-36 relative z-10">
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
            School of Engineering &amp; Technology | COEP Technological
            University
          </div>
          <h1
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", color: C.white }}
          >
            Department of Mechanical Engineering
          </h1>
          <p
            className="font-body text-lg max-w-2xl mb-6"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Established in 1854 — one of the oldest and most distinguished
            mechanical engineering departments in Asia. Forging engineers who
            build the machines that move the world.
          </p>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-6 mb-8">
            {[
              { value: "120+", label: "Students per Batch" },
              { value: "30+", label: "Faculty Members" },
              { value: "170+", label: "Years of Excellence" },
              { value: "95%", label: "Placement Rate" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span
                  className="font-display font-bold text-2xl"
                  style={{ color: C.gold }}
                >
                  {s.value}
                </span>
                <span
                  className="font-body text-xs uppercase tracking-wide"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4">
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
              data-ocid="mech.hero.explore_button"
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
              data-ocid="mech.hero.faculty_button"
            >
              <Users size={16} />
              Meet Our Faculty
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const { ref: textRef, visible: textVisible } =
    useScrollReveal<HTMLDivElement>();
  const { ref: imgRef, visible: imgVisible } =
    useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="about"
      className="py-20 md:py-28"
      style={{ background: "#ffffff" }}
      data-ocid="mech.about.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Text */}
          <div
            ref={textRef}
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1)",
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
              Engineering Excellence Since 1854
            </h2>
            <div
              className="font-body text-base leading-relaxed space-y-4"
              style={{ color: C.bodyText }}
            >
              <p>
                The Department of Mechanical Engineering at COEP Technological
                University is one of the oldest and most distinguished
                engineering departments in India. Established alongside the
                college in 1854, the department has been at the forefront of
                mechanical engineering education for over 170 years.
              </p>
              <p>
                The department offers a comprehensive B.Tech program with deep
                specializations in Design, Manufacturing, Thermal, and Fluids
                engineering, along with M.Tech programs in Mechanical
                Engineering. Our postgraduate and doctoral programs attract some
                of India's brightest engineering minds.
              </p>
              <p>
                The department is equipped with state-of-the-art laboratories
                including a Fluid Mechanics Lab, Heat Transfer Lab,
                Manufacturing & Metrology Lab, CAD/CAM Lab, and the prestigious
                Automobile Engineering Lab — providing students with hands-on
                experience across all major mechanical engineering domains.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "AICTE Approved",
                "NBA Accredited",
                "NAAC A+ Accredited",
                "Est. 1854",
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

          {/* Visual — premium gradient card with stats */}
          <div
            ref={imgRef}
            className="relative"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible
                ? "scale(1) translateY(0)"
                : "scale(0.96) translateY(20px)",
              transition:
                "opacity 0.75s cubic-bezier(0.4,0,0.2,1) 0.15s, transform 0.75s cubic-bezier(0.4,0,0.2,1) 0.15s",
            }}
          >
            {/* Decorative bracket */}
            <div
              className="absolute -top-5 -right-5 w-24 h-24 pointer-events-none"
              style={{
                borderTop: `3px solid ${C.gold}`,
                borderRight: `3px solid ${C.gold}`,
              }}
              aria-hidden="true"
            />
            <div
              className="overflow-hidden"
              style={{
                background: `linear-gradient(145deg, ${C.midnight} 0%, ${C.deepBlue} 60%, ${C.cobalt} 100%)`,
                borderRadius: "4px",
                boxShadow: "0 24px 64px rgba(8,30,92,0.28)",
                padding: "48px 40px",
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8" style={{ background: C.gold }} />
                <span
                  className="font-body text-xs uppercase tracking-[0.26em] font-semibold"
                  style={{ color: C.gold }}
                >
                  Department at a Glance
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "1854", label: "Founded" },
                  { value: "120", label: "B.Tech Seats" },
                  { value: "18", label: "M.Tech Seats" },
                  { value: "30+", label: "Faculty" },
                  { value: "50+", label: "Research Publications / Year" },
                  { value: "10+", label: "Active Research Projects" },
                ].map((stat) => (
                  <div key={stat.label} className="group">
                    <div
                      className="font-display font-bold leading-none mb-1.5 group-hover:scale-105 inline-block transition-transform duration-300"
                      style={{
                        fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                        color: C.gold,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="font-body font-semibold text-[11px] uppercase tracking-[0.16em]"
                      style={{ color: "rgba(255,255,255,0.72)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative bracket bottom-left */}
            <div
              className="absolute -bottom-5 -left-5 w-24 h-24 pointer-events-none"
              style={{
                borderBottom: `3px solid ${C.gold}`,
                borderLeft: `3px solid ${C.gold}`,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: C.cobalt }} className="mt-20 py-16">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0">
            {MECH_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center px-5 py-8 group transition-all duration-300"
                style={{
                  borderRight:
                    idx < MECH_STATS.length - 1
                      ? "1px solid rgba(255,255,255,0.15)"
                      : "none",
                }}
                data-ocid={`mech.stats.item.${idx + 1}`}
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

// ─── Programs Section ─────────────────────────────────────────────────────────
function ProgramsSection() {
  const [activeTab, setActiveTab] = useState("btech");
  const [animating, setAnimating] = useState(false);
  const { ref: secRef, visible: secVisible } =
    useScrollReveal<HTMLDivElement>();
  const program =
    MECH_PROGRAMS.find((p) => p.id === activeTab) ?? MECH_PROGRAMS[0];
  const programIndex = MECH_PROGRAMS.findIndex((p) => p.id === activeTab);

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
      style={{ background: "#F4F7FF" }}
      data-ocid="mech.programs.section"
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
            eyebrow="Academic Programs"
            title="Programs Offered"
            subtitle="Three comprehensive programs — from undergraduate foundations to doctoral research — spanning the full breadth of mechanical engineering."
          />
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {MECH_PROGRAMS.map((p, i) => (
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
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.3s ease, background 0.3s ease, color 0.3s ease`,
              }}
              data-ocid={`mech.programs.${p.id}_tab`}
            >
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
            {/* Radial accents */}
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
            {/* Gold top bar */}
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
                    {program.icon}
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
                      Mechanical Engineering Program
                    </span>
                  </div>
                  <h3
                    className="font-display font-bold leading-tight mb-3"
                    style={{
                      fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                      color: C.white,
                    }}
                  >
                    {program.label}
                  </h3>
                  {/* Metadata pills */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    {[
                      { label: "Duration", value: program.duration },
                      { label: "Seats", value: program.seats },
                      { label: "Eligibility", value: program.eligibility },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="px-4 py-2"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          borderRadius: "4px",
                        }}
                      >
                        <span
                          className="font-body text-[10px] uppercase tracking-wider block mb-0.5"
                          style={{ color: "rgba(232,196,42,0.7)" }}
                        >
                          {m.label}
                        </span>
                        <span
                          className="font-body text-xs font-semibold"
                          style={{ color: "rgba(255,255,255,0.9)" }}
                        >
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
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
                          className="font-body text-sm px-4 py-2"
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

          {/* Bottom panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Learning Outcomes */}
            <div
              className="p-8"
              style={{
                background: "#ffffff",
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
                background: "#ffffff",
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
                    className="flex items-center gap-4 px-4 py-3 transition-all duration-200"
                    style={{
                      background: "#F4F7FF",
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

// ─── Faculty Carousel ─────────────────────────────────────────────────────────
function FacultyCarousel() {
  const [active, setActive] = useState(0);
  const total = MECH_FACULTY.length;
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

  const typeColors = (type: MechFaculty["type"]) => {
    switch (type) {
      case "head":
        return { bg: C.deepBlue, text: C.white };
      case "professor":
        return { bg: C.cobalt, text: C.white };
      case "associate":
        return { bg: C.midnight, text: C.white };
      default:
        return { bg: "#e5e7eb", text: C.deepBlue };
    }
  };

  const f = MECH_FACULTY[active];

  return (
    <section
      id="faculty"
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: "#F4F7FF" }}
      data-ocid="mech.faculty_carousel.section"
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
            subtitle="Distinguished researchers, engineers, and industry practitioners shaping the next generation of mechanical engineers."
          />
        </div>

        {/* Desktop carousel */}
        <div
          className="hidden md:block relative w-full"
          style={{ height: "500px" }}
          aria-label="Faculty carousel"
        >
          {MECH_FACULTY.map((member, idx) => {
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
                  data-ocid={`mech.faculty_carousel.item.${idx + 1}`}
                >
                  <div
                    style={{
                      height: "3px",
                      background: isCenter
                        ? `linear-gradient(90deg, ${C.cobalt}, ${C.gold})`
                        : `linear-gradient(90deg, ${C.cobalt}44, transparent)`,
                    }}
                  />
                  <div className="p-6 flex items-start gap-4">
                    {/* Avatar with initials */}
                    <div
                      className="shrink-0 w-[72px] h-[72px] flex items-center justify-center font-display font-bold text-lg"
                      style={{
                        background: member.bgColor,
                        borderRadius: "4px",
                        color: C.gold,
                        border: isCenter
                          ? `2px solid ${C.gold}`
                          : "2px solid rgba(22,72,200,0.15)",
                        flexShrink: 0,
                        minWidth: "72px",
                      }}
                    >
                      {member.initials}
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
            <div
              className="w-20 h-20 mx-auto mb-4 flex items-center justify-center font-display font-bold text-xl"
              style={{
                background: f.bgColor,
                borderRadius: "4px",
                color: C.gold,
                border: `2px solid ${C.gold}`,
              }}
            >
              {f.initials}
            </div>
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
            data-ocid="mech.faculty_carousel.prev_button"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {MECH_FACULTY.map((member, idx) => (
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
                data-ocid={`mech.faculty_carousel.dot.${idx + 1}`}
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
            data-ocid="mech.faculty_carousel.next_button"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <a
            href="#/academics/mechanical-engineering/faculty"
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
            data-ocid="mech.faculty_carousel.view_all_button"
          >
            <ExternalLink size={14} />
            View All Faculty
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Research & Labs Section ───────────────────────────────────────────────────
function ResearchAndLabsSection() {
  const { ref: labsRef, visible: labsVisible } =
    useScrollReveal<HTMLDivElement>();
  const { ref: researchRef, visible: researchVisible } =
    useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="research"
      className="py-20 md:py-28"
      style={{ background: "#ffffff" }}
      data-ocid="mech.research.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Research & Infrastructure"
          title="Laboratories & Research Areas"
          subtitle="World-class infrastructure supporting cutting-edge research and hands-on learning across all major mechanical engineering domains."
        />

        {/* Labs — alternating layout */}
        <div ref={labsRef} className="space-y-10 mb-20">
          {LABS.map((lab, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={lab.name}
                className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 24px rgba(8,30,92,0.1)",
                  opacity: labsVisible ? 1 : 0,
                  transform: labsVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${idx * 0.1}s, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${idx * 0.1}s`,
                }}
                data-ocid={`mech.labs.item.${idx + 1}`}
              >
                {/* Visual block */}
                <div
                  className={`flex items-center justify-center p-12 min-h-[220px] ${isEven ? "order-1" : "order-1 md:order-2"}`}
                  style={{
                    background: isEven
                      ? `linear-gradient(135deg, ${C.midnight} 0%, ${C.deepBlue} 100%)`
                      : `linear-gradient(135deg, ${C.cobalt} 0%, ${C.deepBlue} 100%)`,
                  }}
                >
                  <div className="text-center">
                    <div
                      className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
                      style={{
                        background: "rgba(232,196,42,0.15)",
                        border: "2px solid rgba(232,196,42,0.4)",
                        borderRadius: "12px",
                        color: C.gold,
                      }}
                    >
                      {lab.icon}
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {lab.equipment.slice(0, 3).map((eq) => (
                        <span
                          key={eq}
                          className="font-body text-[10px] uppercase tracking-wide px-2.5 py-1"
                          style={{
                            background: "rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.8)",
                            borderRadius: "100px",
                            border: "1px solid rgba(255,255,255,0.15)",
                          }}
                        >
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Text block */}
                <div
                  className={`p-10 flex flex-col justify-center ${isEven ? "order-2" : "order-2 md:order-1"}`}
                  style={{ background: "#F4F7FF" }}
                >
                  <div
                    className="h-px w-12 mb-4"
                    style={{ background: C.gold }}
                  />
                  <h3
                    className="font-display font-bold text-xl md:text-2xl mb-4"
                    style={{ color: C.deepBlue }}
                  >
                    {lab.name}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed mb-5"
                    style={{ color: C.bodyText }}
                  >
                    {lab.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {lab.equipment.map((eq) => (
                      <span
                        key={eq}
                        className="font-body text-[10px] uppercase tracking-wider px-3 py-1.5"
                        style={{
                          background: "rgba(22,72,200,0.06)",
                          border: "1px solid rgba(22,72,200,0.2)",
                          color: C.cobalt,
                          borderRadius: "2px",
                        }}
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Research Areas Grid */}
        <div
          ref={researchRef}
          style={{
            opacity: researchVisible ? 1 : 0,
            transform: researchVisible ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: C.gold }} />
              <span
                className="font-body text-xs uppercase tracking-[0.28em] font-semibold"
                style={{ color: C.gold }}
              >
                Research Focus
              </span>
              <div className="h-px w-10" style={{ background: C.gold }} />
            </div>
            <h3
              className="font-display font-bold"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                color: C.deepBlue,
              }}
            >
              Active Research Areas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESEARCH_AREAS.map((area, idx) => (
              <div
                key={area.title}
                className="p-7 group transition-all duration-300"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(22,72,200,0.1)",
                  borderTop: `4px solid ${C.cobalt}`,
                  borderRadius: "0 0 8px 8px",
                  boxShadow: "0 2px 12px rgba(8,30,92,0.07)",
                  opacity: researchVisible ? 1 : 0,
                  transform: researchVisible
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: `opacity 0.5s ease ${idx * 0.08}s, transform 0.5s ease ${idx * 0.08}s, box-shadow 0.3s ease`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 16px 40px rgba(22,72,200,0.15)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 2px 12px rgba(8,30,92,0.07)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                }}
                data-ocid={`mech.research_areas.item.${idx + 1}`}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-opacity-90"
                  style={{
                    background: "rgba(22,72,200,0.08)",
                    borderRadius: "10px",
                    color: C.cobalt,
                  }}
                >
                  {area.icon}
                </div>
                <h4
                  className="font-display font-bold text-lg mb-3"
                  style={{ color: C.deepBlue }}
                >
                  {area.title}
                </h4>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: C.mutedText }}
                >
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Placements Section ────────────────────────────────────────────────────────
function PlacementsSection() {
  const { ref: statsRef, visible: statsVisible } =
    useScrollReveal<HTMLDivElement>();

  const stats = [
    {
      value: "95",
      suffix: "%",
      label: "Placement Rate",
      icon: <TrendingUp size={22} />,
    },
    {
      value: "60",
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
      value: "22",
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
      data-ocid="mech.placements.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Career Outcomes"
          title="Placements & Careers"
          subtitle="Our graduates lead engineering teams at India's and the world's most prestigious automotive, aerospace, energy, and manufacturing organisations."
          light
        />

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
              data-ocid={`mech.placements.stat.${idx + 1}`}
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
        <div className="text-center">
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
                Placement Cell
              </p>
              <p
                className="font-display font-bold text-2xl mb-6"
                style={{ color: C.white }}
              >
                Explore Mechanical Engineering Placements
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://www.coeptech.ac.in/academics/schools/school-of-engineering-and-technology/school-of-mechanical-and-materials-engineering/mechanical-engineering/"
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
                  data-ocid="mech.placements.view_more_button"
                >
                  <ExternalLink size={14} />
                  View Placement Details
                </a>
                <a
                  href="mailto:hod.mech@coeptech.ac.in"
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
                  data-ocid="mech.placements.contact_button"
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

// ─── Recruiters Section ────────────────────────────────────────────────────────
function MechRecruiterCard({
  r,
  idx,
  visible,
}: {
  r: { name: string; sector: string };
  idx: number;
  visible: boolean;
}) {
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
      data-ocid={`mech.recruiters.card.${idx + 1}`}
    >
      <div
        className="w-10 h-10 flex items-center justify-center mb-2.5 font-display font-bold text-sm"
        style={{
          background: `linear-gradient(135deg, ${C.cobalt}, ${C.deepBlue})`,
          color: C.white,
          borderRadius: "8px",
        }}
      >
        {initials}
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

function RecruitersSection() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="recruiters"
      className="py-20 md:py-24"
      style={{ background: "#ffffff", borderTop: `4px solid ${C.cobalt}` }}
      data-ocid="mech.recruiters.section"
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
            India's leading automotive, industrial, and technology organisations
            come to COEP to recruit top mechanical engineering talent.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {MECH_RECRUITERS.map((r, idx) => (
            <MechRecruiterCard key={r.name} r={r} idx={idx} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Achievements Section ──────────────────────────────────────────────────────
function AchievementsSection() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const achievements = [
    {
      icon: <Award size={28} />,
      title: "NAAC A+ Accredited",
      description:
        "COEP Technological University holds the prestigious NAAC A+ accreditation, reflecting the highest standard of academic quality and institutional governance.",
    },
    {
      icon: <GraduationCap size={28} />,
      title: "NBA Accredited Programs",
      description:
        "All undergraduate programs in Mechanical Engineering are accredited by the National Board of Accreditation, meeting the highest engineering education standards.",
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Top 25 in India",
      description:
        "Ranked among the top 25 Mechanical Engineering departments in India by leading education surveys, consistently recognised for research output and placement quality.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Distinguished Alumni",
      description:
        "Alumni hold senior positions at ISRO, DRDO, Tata Motors, L&T, and top global automotive and aerospace firms, reflecting the department's global reach and industry impact.",
    },
  ];

  return (
    <section
      id="achievements"
      className="py-20 md:py-28"
      style={{ background: "#F4F7FF" }}
      data-ocid="mech.achievements.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Recognition"
          title="Achievements & Accreditations"
          subtitle="Decades of academic excellence, industry connect, and research impact — recognised nationally and globally."
        />
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((item, idx) => (
            <div
              key={item.title}
              className="p-8 group transition-all duration-300"
              style={{
                background: "#ffffff",
                borderBottom: `4px solid ${C.gold}`,
                borderRadius: "8px 8px 0 0",
                boxShadow: "0 2px 12px rgba(8,30,92,0.07)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${idx * 0.12}s, transform 0.6s ease ${idx * 0.12}s, box-shadow 0.3s ease`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 16px 40px rgba(8,30,92,0.14)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 2px 12px rgba(8,30,92,0.07)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
              }}
              data-ocid={`mech.achievements.item.${idx + 1}`}
            >
              <div
                className="w-14 h-14 flex items-center justify-center mb-5"
                style={{
                  background: "rgba(22,72,200,0.08)",
                  borderRadius: "12px",
                  color: C.cobalt,
                }}
              >
                {item.icon}
              </div>
              <h3
                className="font-display font-bold text-lg mb-3"
                style={{ color: C.deepBlue }}
              >
                {item.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: C.mutedText }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Admissions CTA ────────────────────────────────────────────────────────────
function AdmissionsCTA() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      className="py-16"
      style={{ background: C.midnight, borderTop: `3px solid ${C.gold}` }}
      data-ocid="mech.admissions_cta.section"
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
          Ready to Engineer the Future?
        </h2>
        <p
          className="font-body text-base mb-8 max-w-md mx-auto"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Join one of India's oldest and most prestigious Mechanical Engineering
          departments. Apply via MHT-CET or JEE Main. AY 2025–26 admissions are
          open.
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
            data-ocid="mech.admissions_cta.apply_button"
          >
            Apply Now
          </a>
          <a
            href="mailto:hod.mech@coeptech.ac.in"
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
            data-ocid="mech.admissions_cta.contact_button"
          >
            <Mail size={14} />
            Contact Department
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── MechanicalEngPage ─────────────────────────────────────────────────────────
export function MechanicalEngPage() {
  useEffect(() => {
    document.title = "Department of Mechanical Engineering | COEP Tech";
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Header />
      <main>
        <UniversityTabsSection />
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <FacultyCarousel />
        <ResearchAndLabsSection />
        <PlacementsSection />
        <RecruitersSection />
        <AchievementsSection />
        <AdmissionsCTA />
      </main>
      <Footer />
    </Layout>
  );
}
