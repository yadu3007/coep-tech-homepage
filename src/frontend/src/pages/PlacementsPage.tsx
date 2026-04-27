import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { UniversityTabsSection } from "../components/UniversityTabsSection";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

interface YearStat {
  year: number;
  placed: number;
  avg: string;
  highest: string;
}

interface PlacementDrive {
  company: string;
  date: string;
  roles: string;
  package: string;
  eligibility: string;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  value,
  suffix,
  prefix = "",
  duration = 2000,
  trigger,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  duration?: number;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - (1 - progress) ** 3;
      setCount(Math.round(ease * value));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, value, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ─── Section Observer Hook ────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroStats: StatItem[] = [
  { value: 98, suffix: "%", label: "Placement Rate" },
  { value: 12, suffix: " LPA", prefix: "₹", label: "Average Package" },
  { value: 45, suffix: " LPA", prefix: "₹", label: "Highest Package" },
  { value: 150, suffix: "+", label: "Recruiting Companies" },
];

const yearStats: YearStat[] = [
  { year: 2024, placed: 98, avg: "₹12.5 LPA", highest: "₹45 LPA" },
  { year: 2023, placed: 97, avg: "₹11.8 LPA", highest: "₹42 LPA" },
  { year: 2022, placed: 95, avg: "₹10.5 LPA", highest: "₹38 LPA" },
  { year: 2021, placed: 93, avg: "₹9.2 LPA", highest: "₹35 LPA" },
];

const recruiters = {
  it: [
    "TCS",
    "Infosys",
    "Wipro",
    "Cognizant",
    "Accenture",
    "Capgemini",
    "HCL",
    "Tech Mahindra",
    "IBM",
    "Oracle",
    "Microsoft",
    "Google",
    "Amazon",
    "Persistent",
    "KPIT Technologies",
    "Zensar Technologies",
    "Synerzip",
  ],
  core: [
    "Tata Motors",
    "Mahindra & Mahindra",
    "Bajaj Auto",
    "Cummins",
    "Bosch",
    "Thermax",
    "Forbes Marshall",
    "John Deere",
    "L&T",
    "BHEL",
    "NTPC",
    "Kirloskar",
    "Atlas Copco",
    "Sandvik",
  ],
  finance: [
    "Deloitte",
    "EY",
    "KPMG",
    "McKinsey",
    "BCG",
    "JP Morgan",
    "Goldman Sachs",
  ],
};

const processSteps = [
  {
    title: "Registration",
    desc: "Students register with the T&P Cell in their pre-final year, submitting academic records and skill profiles.",
  },
  {
    title: "Profile Building",
    desc: "Dedicated workshops on resume writing, LinkedIn optimization, and skill assessment sessions.",
  },
  {
    title: "Pre-Placement Talks",
    desc: "Companies conduct orientation sessions, sharing culture, roles, and expectations with students.",
  },
  {
    title: "Written Assessment",
    desc: "Online aptitude, technical, and coding rounds administered as per company requirements.",
  },
  {
    title: "Technical Interview",
    desc: "One to three rounds of technical interviews evaluating domain knowledge and problem-solving.",
  },
  {
    title: "HR Interview",
    desc: "Final HR round assessing cultural fit, communication skills, and career aspirations.",
  },
  {
    title: "Offer Letter",
    desc: "Offer letters issued directly by companies to selected candidates through the T&P Cell.",
  },
  {
    title: "Joining",
    desc: "Students typically join their respective companies in July–August after graduation.",
  },
];

const upcomingDrives: PlacementDrive[] = [
  {
    company: "TCS Digital",
    date: "Feb 10, 2025",
    roles: "Software Engineer",
    package: "₹7 LPA",
    eligibility: "CS/IT/E&TC ≥7 CGPA",
  },
  {
    company: "Cummins India",
    date: "Feb 14, 2025",
    roles: "Design Engineer",
    package: "₹8.5 LPA",
    eligibility: "Mechanical ≥6.5 CGPA",
  },
  {
    company: "JP Morgan",
    date: "Feb 18, 2025",
    roles: "Analyst",
    package: "₹12 LPA",
    eligibility: "All branches ≥8 CGPA",
  },
  {
    company: "Bosch",
    date: "Feb 22, 2025",
    roles: "Systems Engineer",
    package: "₹9 LPA",
    eligibility: "E&TC/Electrical ≥7 CGPA",
  },
  {
    company: "KPIT",
    date: "Feb 28, 2025",
    roles: "Embedded Developer",
    package: "₹8 LPA",
    eligibility: "CS/E&TC ≥6.5 CGPA",
  },
];

const archiveYears = [2020, 2021, 2022, 2023, 2024];

// ─── Hero Section ─────────────────────────────────────────────────────────────
function PlacementsHero() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref}
      data-ocid="placements.hero"
      style={{
        background:
          "linear-gradient(135deg, #081E5C 0%, #0F3499 40%, #1648C8 80%, #0F3499 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "6rem 2rem 5rem",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          border: "2px solid rgba(232,196,42,0.15)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "2px solid rgba(232,196,42,0.1)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-block",
            background: "rgba(232,196,42,0.15)",
            border: "1px solid rgba(232,196,42,0.4)",
            borderRadius: "2rem",
            padding: "0.4rem 1.2rem",
            marginBottom: "1.5rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease",
          }}
        >
          <span
            style={{
              color: "#E8C42A",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Training & Placement Cell
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            color: "#fff",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "1rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease 0.1s",
          }}
        >
          Placements & <span style={{ color: "#E8C42A" }}>Careers</span>
        </h1>

        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "1.25rem",
            color: "rgba(255,255,255,0.75)",
            marginBottom: "3.5rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          Launching Careers, Building Futures
        </p>

        {/* Animated Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
            maxWidth: "900px",
            margin: "0 auto",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s ease 0.3s",
          }}
        >
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              data-ocid={`placements.hero_stat.${i + 1}`}
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(232,196,42,0.25)",
                borderRadius: "1rem",
                padding: "1.75rem 1.25rem",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#E8C42A",
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  trigger={inView}
                  duration={1800 + i * 200}
                />
              </div>
              <div
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.7)",
                  marginTop: "0.5rem",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      data-ocid="placements.about"
      style={{ background: "#fff", padding: "5rem 2rem" }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Text */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-40px)",
            transition: "all 0.8s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "2rem",
                background: "#E8C42A",
                borderRadius: "2px",
              }}
            />
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#1648C8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              About the Cell
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#0F3499",
              lineHeight: 1.25,
              marginBottom: "1.5rem",
            }}
          >
            Training &amp; Placement Cell
          </h2>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "1.1rem",
              color: "#444",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            The Training and Placement Cell at COEP Tech has been the bridge
            between academia and industry for over 50 years. Our dedicated team
            works year-round to ensure that every COEP graduate is
            industry-ready and well-placed.
          </p>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "1.1rem",
              color: "#444",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            From campus drives to industry internships, from skill workshops to
            alumni mentoring — the T&amp;P Cell is the engine of COEP's
            placement excellence.
          </p>

          {/* Contact card */}
          <div
            style={{
              background: "#f5f8ff",
              border: "1px solid #dde6ff",
              borderRadius: "0.75rem",
              padding: "1.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                color: "#0F3499",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Contact the T&amp;P Cell
            </h3>
            <div
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.95rem",
                color: "#555",
                lineHeight: 2,
              }}
            >
              <div>
                📍 Main Administrative Building, Wellesley Road, Shivajinagar,
                Pune 411005
              </div>
              <div>📞 +91-20-25507150</div>
              <div>✉️ placements@coeptech.ac.in</div>
              <div>🎓 Dr. [Name], Training &amp; Placement Officer</div>
            </div>
          </div>
        </div>

        {/* Visual panel */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #081E5C 0%, #1648C8 100%)",
              borderRadius: "1.25rem",
              padding: "3rem 2.5rem",
              position: "relative",
              overflow: "hidden",
              minHeight: "380px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(232,196,42,0.08)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "-30px",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎓</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  color: "#fff",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                }}
              >
                50+ Years of Placement Excellence
              </h3>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                A legacy of connecting talent with opportunity, shaping careers
                across industries and geographies.
              </p>
              <div
                style={{
                  marginTop: "1.5rem",
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {["Internships", "Campus Drives", "Alumni Network"].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "rgba(232,196,42,0.2)",
                        border: "1px solid rgba(232,196,42,0.4)",
                        borderRadius: "2rem",
                        padding: "0.3rem 0.9rem",
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.8rem",
                        color: "#E8C42A",
                        fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Statistics Section ───────────────────────────────────────────────────────
function StatisticsSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      data-ocid="placements.statistics"
      style={{ background: "#f5f8ff", padding: "5rem 2rem" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{ height: "2px", width: "3rem", background: "#E8C42A" }}
            />
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#1648C8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Year on Year
            </span>
            <div
              style={{ height: "2px", width: "3rem", background: "#E8C42A" }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#0F3499",
            }}
          >
            Placement Statistics
          </h2>
        </div>

        {/* Bar chart visual */}
        <div
          style={{
            background: "#fff",
            borderRadius: "1.25rem",
            overflow: "hidden",
            boxShadow: "0 4px 32px rgba(22,72,200,0.08)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          {/* Bar chart */}
          <div
            style={{
              padding: "2rem 2.5rem 1rem",
              borderBottom: "1px solid #e8eef8",
            }}
          >
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.85rem",
                color: "#888",
                marginBottom: "1.25rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Placement Rate (%)
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "1.5rem",
                height: "120px",
              }}
            >
              {yearStats.map((y, i) => {
                const height = inView ? `${(y.placed / 100) * 110}px` : "0px";
                return (
                  <div
                    key={y.year}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: i === 0 ? "#E8C42A" : "#1648C8",
                      }}
                    >
                      {y.placed}%
                    </span>
                    <div
                      style={{
                        width: "100%",
                        height,
                        background:
                          i === 0
                            ? "linear-gradient(to top, #0F3499, #1648C8)"
                            : "linear-gradient(to top, #1648C8, #4a7aff)",
                        borderRadius: "0.4rem 0.4rem 0 0",
                        transition: `height 1s ease ${0.3 + i * 0.1}s`,
                        maxWidth: "80px",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.85rem",
                        color: "#666",
                      }}
                    >
                      {y.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#1648C8" }}>
                  {[
                    "Year",
                    "Placement Rate",
                    "Average Package",
                    "Highest Package",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "#fff",
                        padding: "1rem 1.5rem",
                        textAlign: "left",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {yearStats.map((row, i) => (
                  <tr
                    key={row.year}
                    data-ocid={`placements.stats_row.${i + 1}`}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#f8faff",
                      borderBottom: "1px solid #e8eef8",
                    }}
                  >
                    <td
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#0F3499",
                        padding: "1rem 1.5rem",
                      }}
                    >
                      {row.year}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: "#333",
                        padding: "1rem 1.5rem",
                      }}
                    >
                      <span
                        style={{
                          background: i === 0 ? "#E8C42A" : "transparent",
                          color: i === 0 ? "#081E5C" : "#333",
                          fontWeight: i === 0 ? 800 : 500,
                          padding: i === 0 ? "0.2rem 0.6rem" : "0",
                          borderRadius: "0.25rem",
                        }}
                      >
                        {row.placed}%
                      </span>
                    </td>
                    <td
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: "#333",
                        padding: "1rem 1.5rem",
                        fontWeight: 600,
                      }}
                    >
                      {row.avg}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        padding: "1rem 1.5rem",
                        fontWeight: i === 0 ? 800 : 600,
                        color: i === 0 ? "#E8C42A" : "#333",
                      }}
                    >
                      {row.highest}
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

// ─── Recruiters Section ───────────────────────────────────────────────────────
function RecruiterPill({
  name,
  theme,
}: { name: string; theme: "cobalt" | "gold" | "midnight" }) {
  const [hovered, setHovered] = useState(false);
  const colors = {
    cobalt: {
      bg: "#f0f4ff",
      border: "#c0d0ff",
      hoverBorder: "#E8C42A",
      text: "#0F3499",
    },
    gold: {
      bg: "#fdf8e8",
      border: "#f0df90",
      hoverBorder: "#E8C42A",
      text: "#5a3e00",
    },
    midnight: {
      bg: "#eef0f8",
      border: "#b0c0e0",
      hoverBorder: "#E8C42A",
      text: "#081E5C",
    },
  };
  const c = colors[theme];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#fff" : c.bg,
        border: `1px solid ${hovered ? c.hoverBorder : c.border}`,
        borderRadius: "0.5rem",
        padding: "0.6rem 1.1rem",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: "0.9rem",
        fontWeight: 600,
        color: c.text,
        cursor: "default",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 18px rgba(22,72,200,0.12)" : "none",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </div>
  );
}

function RecruitersSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      data-ocid="placements.recruiters"
      style={{ background: "#fff", padding: "5rem 2rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{ height: "2px", width: "3rem", background: "#E8C42A" }}
            />
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#1648C8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Industry Partners
            </span>
            <div
              style={{ height: "2px", width: "3rem", background: "#E8C42A" }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#0F3499",
              marginBottom: "0.75rem",
            }}
          >
            Our Recruiter Family
          </h2>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "#666",
              fontSize: "1.05rem",
            }}
          >
            150+ companies visit COEP Tech annually for campus placements
          </p>
        </div>

        {/* IT Category */}
        <div
          style={{
            marginBottom: "2.5rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.75s ease 0.15s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#1648C8",
              }}
            />
            <h3
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#1648C8",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              IT &amp; Software
            </h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {recruiters.it.map((name) => (
              <RecruiterPill key={name} name={name} theme="cobalt" />
            ))}
          </div>
        </div>

        {/* Core Engineering */}
        <div
          style={{
            marginBottom: "2.5rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.75s ease 0.25s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#E8C42A",
              }}
            />
            <h3
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#5a3e00",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Core Engineering
            </h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {recruiters.core.map((name) => (
              <RecruiterPill key={name} name={name} theme="gold" />
            ))}
          </div>
        </div>

        {/* Finance */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.75s ease 0.35s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#081E5C",
              }}
            />
            <h3
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#081E5C",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Finance &amp; Consulting
            </h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {recruiters.finance.map((name) => (
              <RecruiterPill key={name} name={name} theme="midnight" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process Section ──────────────────────────────────────────────────────────
function ProcessSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      data-ocid="placements.process"
      style={{
        background:
          "linear-gradient(160deg, #081E5C 0%, #0F3499 50%, #1648C8 100%)",
        padding: "5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(232,196,42,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.04) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            The Placement <span style={{ color: "#E8C42A" }}>Process</span>
          </h2>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.05rem",
            }}
          >
            A structured journey from student to professional
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {processSteps.map((step, i) => (
            <div
              key={step.title}
              data-ocid={`placements.process_step.${i + 1}`}
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(232,196,42,0.2)",
                borderRadius: "1rem",
                padding: "1.75rem 1.5rem",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(28px)",
                transition: `all 0.6s ease ${0.1 + i * 0.07}s`,
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  background: "#E8C42A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    color: "#081E5C",
                  }}
                >
                  {i + 1}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#E8C42A",
                  marginBottom: "0.6rem",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.92rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.7,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Career Services ──────────────────────────────────────────────────────────
function CareerServicesSection() {
  const { ref, inView } = useInView();

  const services = [
    {
      icon: "📝",
      title: "Resume & Interview Preparation",
      desc: "Expert-led workshops on resume crafting, mock interviews with industry professionals, and personalised feedback sessions to help you stand out.",
    },
    {
      icon: "🏢",
      title: "Industry Internships",
      desc: "Curated summer and winter internship programs (8-week minimum) with leading companies across sectors — real-world experience before graduation.",
    },
    {
      icon: "🤝",
      title: "Alumni Mentoring",
      desc: "Connect with COEPians working at top firms globally. One-on-one mentoring sessions, career guidance, and networking opportunities.",
    },
  ];

  return (
    <section
      ref={ref}
      data-ocid="placements.career_services"
      style={{ background: "#f5f8ff", padding: "5rem 2rem" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{ height: "2px", width: "3rem", background: "#E8C42A" }}
            />
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#1648C8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              What We Offer
            </span>
            <div
              style={{ height: "2px", width: "3rem", background: "#E8C42A" }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#0F3499",
            }}
          >
            Career Services
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              data-ocid={`placements.career_service.${i + 1}`}
              style={{
                background: "#fff",
                borderRadius: "1.25rem",
                padding: "2.5rem 2rem",
                boxShadow: "0 4px 24px rgba(22,72,200,0.06)",
                border: "1px solid #e0eaff",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(28px)",
                transition: `all 0.65s ease ${0.1 + i * 0.12}s`,
                borderTop: "3px solid #1648C8",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1.25rem" }}>
                {service.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#0F3499",
                  marginBottom: "0.9rem",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "1rem",
                  color: "#555",
                  lineHeight: 1.75,
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Upcoming Drives ──────────────────────────────────────────────────────────
function UpcomingDrivesSection() {
  const { ref, inView } = useInView();
  const [registered, setRegistered] = useState<Set<number>>(new Set());

  const handleRegister = (i: number) => {
    setRegistered((prev) => new Set([...prev, i]));
  };

  return (
    <section
      ref={ref}
      data-ocid="placements.upcoming_drives"
      style={{ background: "#fff", padding: "5rem 2rem" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{ height: "2px", width: "3rem", background: "#E8C42A" }}
            />
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#1648C8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Coming Up
            </span>
            <div
              style={{ height: "2px", width: "3rem", background: "#E8C42A" }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#0F3499",
            }}
          >
            Upcoming Placement Drives
          </h2>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "1.25rem",
            overflow: "hidden",
            boxShadow: "0 4px 32px rgba(22,72,200,0.08)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "700px",
              }}
            >
              <thead>
                <tr style={{ background: "#1648C8" }}>
                  {[
                    "Company",
                    "Date",
                    "Roles",
                    "Package",
                    "Eligibility",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "#fff",
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {upcomingDrives.map((drive, i) => (
                  <tr
                    key={drive.company}
                    data-ocid={`placements.drive_row.${i + 1}`}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#f8faff",
                      borderBottom: "1px solid #e8eef8",
                    }}
                  >
                    <td
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        color: "#0F3499",
                        padding: "1rem 1.25rem",
                      }}
                    >
                      {drive.company}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: "#555",
                        padding: "1rem 1.25rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {drive.date}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: "#333",
                        padding: "1rem 1.25rem",
                      }}
                    >
                      {drive.roles}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontWeight: 700,
                        color: "#0F3499",
                        padding: "1rem 1.25rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {drive.package}
                    </td>
                    <td
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        color: "#555",
                        padding: "1rem 1.25rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      {drive.eligibility}
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <button
                        type="button"
                        onClick={() => handleRegister(i)}
                        data-ocid={`placements.register_button.${i + 1}`}
                        style={{
                          background: registered.has(i) ? "#e8f4e8" : "#E8C42A",
                          color: registered.has(i) ? "#2a7a2a" : "#081E5C",
                          border: "none",
                          borderRadius: "0.4rem",
                          padding: "0.45rem 1rem",
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {registered.has(i) ? "✓ Registered" : "Register"}
                      </button>
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

// ─── Archives Section ─────────────────────────────────────────────────────────
function ArchivesSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      data-ocid="placements.archives"
      style={{ background: "#f5f8ff", padding: "5rem 2rem" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{ height: "2px", width: "3rem", background: "#E8C42A" }}
            />
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#1648C8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Placement Reports
            </span>
            <div
              style={{ height: "2px", width: "3rem", background: "#E8C42A" }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#0F3499",
            }}
          >
            Career Archives
          </h2>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "#666",
              fontSize: "1rem",
              marginTop: "0.5rem",
            }}
          >
            Access year-wise placement data and download detailed reports
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.75s ease 0.2s",
          }}
        >
          {archiveYears.map((year, i) => (
            <div
              key={year}
              data-ocid={`placements.archive_year.${i + 1}`}
              style={{
                background: "#fff",
                border: "1px solid #dde6ff",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: "0 2px 8px rgba(22,72,200,0.04)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#E8C42A";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 24px rgba(22,72,200,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#dde6ff";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 2px 8px rgba(22,72,200,0.04)";
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#0F3499",
                  marginBottom: "0.4rem",
                }}
              >
                {year}
              </div>
              <div
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  color: "#888",
                  marginBottom: "1rem",
                }}
              >
                Annual Report
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  color: "#1648C8",
                  fontWeight: 700,
                }}
              >
                <span>⬇</span> Download PDF
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            opacity: inView ? 1 : 0,
            transition: "all 0.7s ease 0.4s",
          }}
        >
          <button
            type="button"
            data-ocid="placements.view_archives_button"
            style={{
              background: "transparent",
              border: "2px solid #1648C8",
              color: "#1648C8",
              borderRadius: "0.5rem",
              padding: "0.75rem 2rem",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.25s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "#1648C8";
              btn.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "transparent";
              btn.style.color = "#1648C8";
            }}
          >
            View All Archives →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      data-ocid="placements.contact"
      style={{
        background:
          "linear-gradient(135deg, #081E5C 0%, #0F3499 60%, #1648C8 100%)",
        padding: "5rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "0.75rem",
            }}
          >
            Contact the <span style={{ color: "#E8C42A" }}>T&amp;P Cell</span>
          </h2>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.05rem",
            }}
          >
            Reach out to us for placement partnerships, student queries, or
            collaboration opportunities
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          {/* Left: Info */}
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(232,196,42,0.2)",
              borderRadius: "1.25rem",
              padding: "2.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                color: "#E8C42A",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              Training &amp; Placement Cell
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[
                {
                  icon: "📍",
                  label: "Address",
                  value:
                    "Main Administrative Building, Wellesley Road, Shivajinagar, Pune 411005",
                },
                { icon: "📞", label: "Phone", value: "+91-20-25507150" },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "placements@coeptech.ac.in",
                },
                {
                  icon: "🎓",
                  label: "TPO",
                  value: "Dr. [Name], Training & Placement Officer",
                },
                { icon: "👤", label: "Assistant TPO", value: "Mr./Ms. [Name]" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ display: "flex", gap: "0.75rem" }}
                >
                  <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.95rem",
                        color: "rgba(255,255,255,0.85)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Recruiter CTA */}
          <div
            style={{
              background: "rgba(232,196,42,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(232,196,42,0.3)",
              borderRadius: "1.25rem",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  color: "#fff",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                Are you a Recruiter?
              </h3>
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                Partner with COEP Tech to access top-tier engineering and
                management talent. We offer customised placement drives,
                internship programs, and research collaborations.
              </p>
              <ul
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.9rem",
                  lineHeight: 2,
                  paddingLeft: "1.25rem",
                }}
              >
                <li>Campus drives with flexible scheduling</li>
                <li>Pre-screened, highly-skilled candidates</li>
                <li>Dedicated placement coordinator</li>
                <li>PPT and branded events support</li>
              </ul>
            </div>
            <button
              type="button"
              data-ocid="placements.partner_button"
              style={{
                background: "#E8C42A",
                color: "#081E5C",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.85rem 1.75rem",
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "1rem",
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.25s ease",
                marginTop: "1.5rem",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#E8C42A";
              }}
            >
              Partner With Us →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function PlacementsPage() {
  return (
    <Layout>
      <Header />
      <UniversityTabsSection />
      <main
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          minHeight: "100vh",
          background: "#fff",
        }}
      >
        <PlacementsHero />
        <AboutSection />
        <StatisticsSection />
        <RecruitersSection />
        <ProcessSection />
        <CareerServicesSection />
        <UpcomingDrivesSection />
        <ArchivesSection />
        <ContactSection />
      </main>
      <Footer />
    </Layout>
  );
}
