import { useState } from "react";
import type { ResearchTabId } from "./ResearchPage";
import { RC, useScrollReveal } from "./ResearchPage";

// ─── Shared sub-nav panel ────────────────────────────────────────────────────
function SubNav({
  items,
  active,
  onSelect,
  tabId,
}: {
  items: string[];
  active: string;
  onSelect: (s: string) => void;
  tabId: string;
}) {
  return (
    <div className="w-52 shrink-0 flex flex-col gap-1 pr-4 border-r border-gray-200">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          data-ocid={`research.${tabId}.subnav.${item.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
          onClick={() => onSelect(item)}
          className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 font-body"
          style={{
            background: active === item ? RC.cobalt : "transparent",
            color: active === item ? RC.white : RC.bodyText,
            borderLeft:
              active === item
                ? `3px solid ${RC.gold}`
                : "3px solid transparent",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────
function Section({
  title,
  sub,
  children,
}: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="py-12 px-6 md:px-10 max-w-7xl mx-auto">
      <p
        className="text-xs tracking-widest uppercase mb-1 font-body"
        style={{ color: RC.cobalt }}
      >
        {sub}
      </p>
      <h2
        className="text-2xl font-bold mb-8 pb-3 border-b border-gray-200"
        style={{ color: RC.deepBlue, fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Dept card (Research Output / Projects) ──────────────────────────────────
const DEPARTMENTS = [
  {
    slug: "computer-engineering",
    name: "Computer Engineering",
    pubs: 45,
    projects: 12,
    featured: "Deep Learning for Autonomous Systems",
  },
  {
    slug: "mechanical-engineering",
    name: "Mechanical Engineering",
    pubs: 38,
    projects: 18,
    featured: "CFD for Turbomachinery Optimization",
  },
  {
    slug: "civil-engineering",
    name: "Civil Engineering",
    pubs: 22,
    projects: 9,
    featured: "Smart Infrastructure & IoT Monitoring",
  },
  {
    slug: "electrical-engineering",
    name: "Electrical Engineering",
    pubs: 28,
    projects: 11,
    featured: "Power Electronics & EV Charging",
  },
  {
    slug: "electronics-engineering",
    name: "Electronics Engineering",
    pubs: 25,
    projects: 10,
    featured: "Low-Power VLSI for Edge AI",
  },
  {
    slug: "applied-sciences",
    name: "Chemistry & Applied Sciences",
    pubs: 15,
    projects: 6,
    featured: "Nanocomposite Material Synthesis",
  },
];

function DeptCard({
  dept,
  mode,
}: { dept: (typeof DEPARTMENTS)[0]; mode: "publications" | "projects" }) {
  const count = mode === "publications" ? dept.pubs : dept.projects;
  const label = mode === "publications" ? "Publications" : "Projects";

  return (
    <a
      href={`#/research/department/${dept.slug}`}
      data-ocid={`research.dept.${dept.slug}.card`}
      className="block rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
      style={{ border: "1px solid rgba(22,72,200,0.1)" }}
    >
      {/* Coloured header */}
      <div
        className="h-24 flex items-end p-4 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${RC.deepBlue} 0%, ${RC.cobalt} 100%)`,
        }}
      >
        <div
          className="absolute right-4 top-4 text-5xl font-black opacity-10 select-none"
          style={{ color: "white", fontFamily: "'Playfair Display', serif" }}
        >
          {dept.name.slice(0, 2).toUpperCase()}
        </div>
        <span className="relative z-10 text-white/90 text-xs tracking-widest uppercase font-body">
          {label}
        </span>
      </div>

      {/* Body */}
      <div className="bg-white p-4">
        <div
          className="text-2xl font-bold mb-1"
          style={{ color: RC.cobalt, fontFamily: "'Playfair Display', serif" }}
        >
          {count}+
        </div>
        <h3
          className="font-semibold text-sm mb-2 font-body"
          style={{ color: RC.deepBlue }}
        >
          {dept.name}
        </h3>
        <p
          className="text-xs line-clamp-2 font-body"
          style={{ color: RC.mutedText }}
        >
          {dept.featured}
        </p>
        <div
          className="mt-3 text-xs font-semibold font-body flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
          style={{ color: RC.cobalt }}
        >
          View All <span>→</span>
        </div>
      </div>
    </a>
  );
}

// ─── OVERVIEW TAB ────────────────────────────────────────────────────────────
const OVERVIEW_SUBS = [
  "Research Vision & Strategy",
  "Focus Areas / Domains",
  "Key Achievements & Impact",
  "Interdisciplinary Research",
];

const FOCUS_AREAS = [
  {
    title: "Mechanical & Manufacturing Systems",
    desc: "Advanced manufacturing, automation, tribology, and thermal engineering with industry-integrated research.",
    color: "#c0392b",
  },
  {
    title: "Electronics, VLSI & Embedded Systems",
    desc: "Low-power IC design, embedded AI, signal processing, and RF communication systems.",
    color: "#8e44ad",
  },
  {
    title: "Civil Infrastructure & Environment",
    desc: "Sustainable construction, smart infrastructure, geotechnical engineering, and water resource management.",
    color: "#27ae60",
  },
  {
    title: "Computer Science & AI/ML",
    desc: "Deep learning, computer vision, NLP, bioinformatics, and distributed computing systems.",
    color: RC.cobalt,
  },
  {
    title: "Energy & Sustainability",
    desc: "Renewable energy, energy storage, smart grids, electric vehicles, and carbon-neutral technologies.",
    color: "#e67e22",
  },
  {
    title: "Materials Science & Nanotechnology",
    desc: "Nanocomposites, biomaterials, surface engineering, thin films, and advanced characterization.",
    color: "#16a085",
  },
];

const ACHIEVEMENTS = [
  {
    year: "2024",
    text: "COEP ranked among Top 50 NIRF Research Institutions in India",
  },
  {
    year: "2023",
    text: "₹12.5 Crore grant awarded by DST for Electric Vehicle Research Centre",
  },
  {
    year: "2022",
    text: "25 patents granted in a single calendar year — a university record",
  },
  {
    year: "2021",
    text: "Innovation Park at Chikhali inaugurated — 30+ startups incubated",
  },
  {
    year: "2020",
    text: "COEP–IIT Bombay joint PhD programme launched with 40 scholars enrolled",
  },
];

const INTERDISCIPLINARY = [
  {
    title: "AI-Driven Structural Health Monitoring",
    depts: "Civil + Computer Engg",
    desc: "Deploying ML models on IoT sensor data to predict bridge and building structural failures in real time.",
  },
  {
    title: "Green Hydrogen from Waste",
    depts: "Chemistry + Mechanical",
    desc: "Bio-electrochemical processes to generate clean hydrogen from municipal solid waste streams.",
  },
  {
    title: "Wearable Health Monitoring",
    depts: "Electronics + Biomedical",
    desc: "Ultra-low-power wearable devices combining VLSI and flexible sensors for continuous health monitoring.",
  },
  {
    title: "Smart Urban Mobility",
    depts: "Civil + CSE + Electrical",
    desc: "Integrated simulation platform for optimising traffic flow and EV charging infrastructure in smart cities.",
  },
];

function OverviewContent({ sub }: { sub: string }) {
  if (sub === "Research Vision & Strategy") {
    return (
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h3
            className="text-xl font-bold mb-4"
            style={{
              color: RC.deepBlue,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Shaping Knowledge, Driving Impact
          </h3>
          <p
            className="text-sm leading-relaxed mb-4 font-body"
            style={{ color: RC.bodyText }}
          >
            COEP Technological University's research strategy is anchored in
            four pillars:{" "}
            <strong>
              excellence, relevance, collaboration, and translation
            </strong>
            . We strive to generate knowledge that not only advances fundamental
            science but directly addresses the challenges faced by industry,
            government, and society at large.
          </p>
          <p
            className="text-sm leading-relaxed mb-4 font-body"
            style={{ color: RC.bodyText }}
          >
            Our 2024–2029 Research Roadmap sets ambitious targets — doubling
            extramural funding to ₹30 Crore, tripling PhD enrolments, and
            establishing three Centres of Excellence in nationally-prioritized
            domains: EV & Energy Storage, AI/ML for Industry 4.0, and Smart
            Infrastructure.
          </p>
          <p
            className="text-sm leading-relaxed mb-6 font-body"
            style={{ color: RC.bodyText }}
          >
            Through RIIL (Research, Innovation, Incubation & Linkages), COEP
            bridges the lab-to-market gap — turning discoveries into deployable
            technologies, supporting startups, and building long-term
            partnerships with industry leaders like Tata Motors, Bosch India,
            KPIT Technologies, and Cummins.
          </p>
          <a
            href="#research"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-body transition-all duration-200 hover:scale-105"
            style={{ background: RC.cobalt, color: RC.white }}
          >
            Read Full Strategy →
          </a>
        </div>
        <div
          className="rounded-xl overflow-hidden shadow-lg h-72 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${RC.deepBlue}, ${RC.cobalt})`,
          }}
        >
          <div className="text-center text-white/80 p-8">
            <div
              className="text-4xl font-black mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: RC.gold,
              }}
            >
              ₹15Cr+
            </div>
            <div className="text-sm font-body">Active Research Grants</div>
            <div
              className="mt-4 text-3xl font-black"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: RC.gold,
              }}
            >
              170+
            </div>
            <div className="text-sm font-body">Research Faculty</div>
          </div>
        </div>
      </div>
    );
  }

  if (sub === "Focus Areas / Domains") {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FOCUS_AREAS.map((area) => (
          <div
            key={area.title}
            className="rounded-xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
            style={{
              border: `2px solid ${area.color}20`,
              background: `${area.color}08`,
            }}
          >
            <div
              className="w-2 h-8 rounded-full mb-4"
              style={{ background: area.color }}
            />
            <h4
              className="font-bold text-sm mb-2 font-body"
              style={{ color: RC.deepBlue }}
            >
              {area.title}
            </h4>
            <p
              className="text-xs leading-relaxed font-body"
              style={{ color: RC.mutedText }}
            >
              {area.desc}
            </p>
            <div
              className="mt-4 text-xs font-semibold font-body"
              style={{ color: area.color }}
            >
              Explore →
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sub === "Key Achievements & Impact") {
    return (
      <div className="space-y-4">
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a.year}
            className="flex gap-6 items-center p-5 rounded-xl hover:shadow-md transition-all duration-200"
            style={{
              border: "1px solid rgba(22,72,200,0.1)",
              background: "white",
            }}
          >
            <div
              className="shrink-0 w-16 text-center font-bold text-xl"
              style={{
                color: RC.gold,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {a.year}
            </div>
            <div
              className="w-px h-10 shrink-0"
              style={{ background: RC.cobalt, opacity: 0.2 }}
            />
            <p className="text-sm font-body" style={{ color: RC.bodyText }}>
              {a.text}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Interdisciplinary
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {INTERDISCIPLINARY.map((p) => (
        <div
          key={p.title}
          className="rounded-xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          style={{
            border: "1px solid rgba(22,72,200,0.12)",
            background: "white",
          }}
        >
          <div
            className="text-xs tracking-wide uppercase mb-2 font-body font-semibold"
            style={{ color: RC.cobalt }}
          >
            {p.depts}
          </div>
          <h4
            className="font-bold mb-2 font-body"
            style={{ color: RC.deepBlue }}
          >
            {p.title}
          </h4>
          <p
            className="text-sm leading-relaxed font-body"
            style={{ color: RC.mutedText }}
          >
            {p.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── PEOPLE TAB ──────────────────────────────────────────────────────────────
const PEOPLE_SUBS = [
  "Faculty Research Profiles",
  "Research Scholars / PhD Students",
  "Collaborations & Partnerships",
];
type PeopleInnerTab = "Faculty" | "Researchers" | "Students" | "Industry";

const FACULTY_RESEARCHERS = [
  {
    name: "Prof. Vilas Warudkar",
    dept: "Mechanical Engineering",
    area: "CFD & Turbomachinery",
    pubs: 42,
  },
  {
    name: "Dr. Rajesh Ingle",
    dept: "Computer Engineering",
    area: "Machine Learning & NLP",
    pubs: 37,
  },
  {
    name: "Prof. Mahesh Patil",
    dept: "Electronics Engineering",
    area: "VLSI & Embedded Systems",
    pubs: 29,
  },
  {
    name: "Dr. Kavitha Rao",
    dept: "Civil Engineering",
    area: "Smart Infrastructure",
    pubs: 24,
  },
  {
    name: "Prof. Anil Deshmukh",
    dept: "Electrical Engineering",
    area: "Power Electronics & EVs",
    pubs: 31,
  },
  {
    name: "Dr. Priya Joshi",
    dept: "Applied Sciences",
    area: "Nanomaterials & Coatings",
    pubs: 19,
  },
];

const PHD_SCHOLARS = [
  {
    name: "Rohan Kulkarni",
    dept: "Mechanical Engineering",
    topic: "Multi-objective optimization of hybrid EV powertrains",
  },
  {
    name: "Sneha Patkar",
    dept: "Computer Engineering",
    topic: "Federated learning for privacy-preserving medical AI",
  },
  {
    name: "Amit Sharma",
    dept: "Civil Engineering",
    topic: "IoT-based structural health monitoring of railway bridges",
  },
  {
    name: "Priyanka More",
    dept: "Electronics Engineering",
    topic: "Neuromorphic computing architectures for edge inference",
  },
  {
    name: "Suraj Gawande",
    dept: "Electrical Engineering",
    topic: "Grid-interactive EV charging with demand response",
  },
  {
    name: "Nikita Jain",
    dept: "Applied Sciences",
    topic: "Biomimetic nanocomposite scaffolds for bone regeneration",
  },
];

function PeopleContent({ sub }: { sub: string }) {
  const [innerTab, setInnerTab] = useState<PeopleInnerTab>("Faculty");
  const innerTabs: PeopleInnerTab[] = [
    "Faculty",
    "Researchers",
    "Students",
    "Industry",
  ];

  if (sub === "Faculty Research Profiles") {
    return (
      <div>
        {/* Inner tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-3">
          {innerTabs.map((t) => (
            <button
              key={t}
              type="button"
              data-ocid={`research.people.inner.${t.toLowerCase()}.tab`}
              onClick={() => setInnerTab(t)}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 font-body"
              style={{
                background: innerTab === t ? RC.cobalt : "transparent",
                color: innerTab === t ? RC.white : RC.bodyText,
                border:
                  innerTab === t ? "none" : "1px solid rgba(22,72,200,0.2)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        {innerTab === "Faculty" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FACULTY_RESEARCHERS.map((f) => (
              <div
                key={f.name}
                className="rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  border: "1px solid rgba(22,72,200,0.1)",
                  background: "white",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-3"
                  style={{
                    background: RC.deepBlue,
                    color: RC.gold,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {f.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h4
                  className="font-bold text-sm mb-1 font-body"
                  style={{ color: RC.deepBlue }}
                >
                  {f.name}
                </h4>
                <p
                  className="text-xs mb-1 font-body"
                  style={{ color: RC.cobalt }}
                >
                  {f.dept}
                </p>
                <p
                  className="text-xs mb-3 font-body"
                  style={{ color: RC.mutedText }}
                >
                  {f.area}
                </p>
                <div
                  className="text-xs font-semibold font-body"
                  style={{ color: RC.gold }}
                >
                  {f.pubs} Publications
                </div>
              </div>
            ))}
          </div>
        )}
        {innerTab === "Researchers" && (
          <p className="text-sm font-body" style={{ color: RC.mutedText }}>
            COEP employs 12 dedicated postdoctoral research associates and
            visiting scientists across 6 departments. Research associate
            positions are advertised quarterly on the RIIL portal.
          </p>
        )}
        {innerTab === "Students" && (
          <div className="space-y-3">
            {PHD_SCHOLARS.map((s) => (
              <div
                key={s.name}
                className="flex gap-4 items-start p-4 rounded-lg"
                style={{
                  background: "rgba(22,72,200,0.04)",
                  border: "1px solid rgba(22,72,200,0.08)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{ background: RC.deepBlue, color: RC.gold }}
                >
                  {s.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm font-body"
                    style={{ color: RC.deepBlue }}
                  >
                    {s.name}
                  </div>
                  <div
                    className="text-xs font-body"
                    style={{ color: RC.cobalt }}
                  >
                    {s.dept}
                  </div>
                  <div
                    className="text-xs font-body"
                    style={{ color: RC.mutedText }}
                  >
                    {s.topic}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {innerTab === "Industry" && (
          <p className="text-sm font-body" style={{ color: RC.mutedText }}>
            COEP hosts 8 industry-sponsored research chairs supported by Tata
            Motors, Bosch India, KPIT Technologies, and John Deere. Each chair
            funds 2–3 PhD scholars and supports joint IP development.
          </p>
        )}
      </div>
    );
  }

  if (sub === "Research Scholars / PhD Students") {
    return (
      <div className="space-y-3">
        {PHD_SCHOLARS.map((s) => (
          <div
            key={s.name}
            className="flex gap-4 items-start p-4 rounded-xl hover:shadow-md transition-all duration-200"
            style={{
              border: "1px solid rgba(22,72,200,0.1)",
              background: "white",
            }}
          >
            <div
              className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold"
              style={{ background: RC.deepBlue, color: RC.gold }}
            >
              {s.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <div
                className="font-semibold text-sm font-body"
                style={{ color: RC.deepBlue }}
              >
                {s.name}
              </div>
              <div className="text-xs font-body" style={{ color: RC.cobalt }}>
                {s.dept}
              </div>
              <div
                className="text-sm mt-1 font-body"
                style={{ color: RC.mutedText }}
              >
                {s.topic}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Collaborations
  const industryPartners = [
    "Tata Motors",
    "Bosch India",
    "KPIT Technologies",
    "Cummins India",
    "L&T Technology Services",
    "Thermax",
  ];
  const academicPartners = [
    "IIT Bombay",
    "University of Minnesota",
    "Stanford University",
    "TU Delft",
    "EPFL Lausanne",
    "NUS Singapore",
  ];
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="font-bold mb-4 font-body" style={{ color: RC.deepBlue }}>
          Industry Partners
        </h4>
        <div className="flex flex-wrap gap-2">
          {industryPartners.map((p) => (
            <span
              key={p}
              className="px-3 py-1.5 rounded-full text-sm font-body font-medium"
              style={{
                background: `${RC.cobalt}12`,
                color: RC.cobalt,
                border: `1px solid ${RC.cobalt}30`,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-4 font-body" style={{ color: RC.deepBlue }}>
          Academic Partners
        </h4>
        <div className="flex flex-wrap gap-2">
          {academicPartners.map((p) => (
            <span
              key={p}
              className="px-3 py-1.5 rounded-full text-sm font-body font-medium"
              style={{
                background: `${RC.gold}15`,
                color: RC.deepBlue,
                border: `1px solid ${RC.gold}40`,
              }}
            >
              {p}
            </span>
          ))}
        </div>
        <p className="text-xs mt-4 font-body" style={{ color: RC.mutedText }}>
          + 50 international university MOUs
        </p>
      </div>
    </div>
  );
}

// ─── INFRASTRUCTURE TAB ──────────────────────────────────────────────────────
const INFRA_SUBS = ["RIIL", "Laboratories", "Innovation Park (Chikhali)"];

const LABS = [
  {
    name: "Central Research Laboratory",
    desc: "Equipped with SEM, XRD, TEM, and advanced spectroscopy instruments. Shared facility open to all departments and external researchers.",
    icon: "🔬",
  },
  {
    name: "High-Performance Computing Lab",
    desc: "32-node GPU cluster with NVIDIA A100s for ML training, CFD simulations, and molecular dynamics. 24/7 access for research scholars.",
    icon: "💻",
  },
  {
    name: "Advanced Materials Lab",
    desc: "Thin film deposition, nanoparticle synthesis, mechanical testing (UTM, hardness, fatigue), and characterization capabilities.",
    icon: "⚗️",
  },
  {
    name: "Prototype Development Centre",
    desc: "CNC machining, 3D printing (FDM/SLA/SLS), laser cutting, and PCB fabrication for rapid prototyping and product development.",
    icon: "🔧",
  },
  {
    name: "Electronics Research Lab",
    desc: "FPGA platforms, RF spectrum analyzers, oscilloscopes (1 GHz), and IC design tools (Cadence, Synopsis) for VLSI research.",
    icon: "📡",
  },
];

function InfraContent({ sub }: { sub: string }) {
  if (sub === "RIIL") {
    return (
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div
          className="rounded-xl overflow-hidden h-64 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${RC.midnight}, ${RC.cobalt})`,
          }}
        >
          <div className="text-center text-white p-6">
            <div className="text-5xl mb-4">🏛️</div>
            <div className="font-bold font-body">RIIL Building</div>
            <div className="text-white/60 text-xs font-body mt-1">
              Board of Research, Innovation, Incubation & Linkages
            </div>
          </div>
        </div>
        <div>
          <h3
            className="text-xl font-bold mb-3"
            style={{
              color: RC.deepBlue,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            RIIL — Research, Innovation, Incubation & Linkages
          </h3>
          <p
            className="text-sm leading-relaxed mb-4 font-body"
            style={{ color: RC.bodyText }}
          >
            RIIL is COEP's central body for translating academic research into
            real-world impact. It coordinates funding, IP management, startup
            incubation, and industry collaboration across all departments.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              ["30+", "Startups Incubated"],
              ["₹8Cr", "Seed Funding Deployed"],
              ["120+", "Industry Tie-ups"],
            ].map(([val, lbl]) => (
              <div
                key={lbl}
                className="text-center p-3 rounded-lg"
                style={{
                  background: `${RC.cobalt}0A`,
                  border: `1px solid ${RC.cobalt}20`,
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    color: RC.cobalt,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {val}
                </div>
                <div
                  className="text-xs font-body"
                  style={{ color: RC.mutedText }}
                >
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (sub === "Laboratories") {
    return (
      <div className="space-y-5">
        {LABS.map((lab, i) => (
          <div
            key={lab.name}
            className={`grid md:grid-cols-2 gap-6 items-center rounded-xl p-6 ${i % 2 === 0 ? "" : "md:grid-flow-dense"}`}
            style={{
              background: i % 2 === 0 ? "white" : "rgba(22,72,200,0.03)",
              border: "1px solid rgba(22,72,200,0.08)",
            }}
          >
            <div className={i % 2 !== 0 ? "md:col-start-2" : ""}>
              <div className="text-3xl mb-3">{lab.icon}</div>
              <h4
                className="font-bold mb-2 font-body"
                style={{ color: RC.deepBlue }}
              >
                {lab.name}
              </h4>
              <p
                className="text-sm leading-relaxed font-body"
                style={{ color: RC.bodyText }}
              >
                {lab.desc}
              </p>
            </div>
            <div
              className={`h-36 rounded-lg flex items-center justify-center text-4xl ${i % 2 !== 0 ? "md:col-start-1 md:row-start-1" : ""}`}
              style={{
                background: `linear-gradient(135deg, ${RC.deepBlue}20, ${RC.cobalt}30)`,
              }}
            >
              {lab.icon}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Innovation Park
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <h3
          className="text-xl font-bold mb-3"
          style={{
            color: RC.deepBlue,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          COEP Innovation Park, Chikhali
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 font-body"
          style={{ color: RC.bodyText }}
        >
          Spread over 20 acres in Chikhali (Pune), the COEP Innovation Park is a
          purpose-built ecosystem for deep-tech startups, R&D centres, and
          collaborative innovation between academia and industry.
        </p>
        <p
          className="text-sm leading-relaxed mb-6 font-body"
          style={{ color: RC.bodyText }}
        >
          The park hosts maker spaces, product testing zones, clean rooms, and
          business incubation facilities. Current residents include 8 industry
          R&D units and 22 COEP-origin startups.
        </p>
        <a
          href="#research"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-body transition-all duration-200 hover:scale-105"
          style={{ background: RC.gold, color: RC.midnight }}
        >
          Visit Innovation Park →
        </a>
      </div>
      <div
        className="rounded-xl h-64 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #1a4a10, #2e7d32)" }}
      >
        <div className="text-center text-white p-6">
          <div className="text-4xl mb-3">🏙️</div>
          <div className="font-bold font-body">Innovation Park</div>
          <div className="text-white/60 text-xs mt-1 font-body">
            Chikhali, Pune
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── RESEARCH OUTPUT TAB ─────────────────────────────────────────────────────
const OUTPUT_SUBS = ["Publications", "Books", "Patents / IPR"];

const SAMPLE_PUBS = [
  {
    authors: "Warudkar, V., Patil, R., Sharma, M.",
    title: "Turbomachinery CFD with Reduced Basis Methods",
    journal: "Journal of Turbomachinery, ASME",
    year: "2024",
    doi: "10.1115/1.4062891",
  },
  {
    authors: "Ingle, R., Kulkarni, A., Deshpande, S.",
    title: "Self-Supervised Contrastive Learning for Low-Resource NLP",
    journal: "ACL Anthology, Annual Meeting 2024",
    year: "2024",
    doi: "10.18653/v1/2024.acl-main.401",
  },
  {
    authors: "Patil, M., Gokhale, P.",
    title: "Sub-threshold CMOS Design for Batteryless IoT Nodes",
    journal: "IEEE Transactions on Circuits and Systems",
    year: "2023",
    doi: "10.1109/TCSI.2023.3290123",
  },
  {
    authors: "Rao, K., Sawant, V., Joshi, A.",
    title: "UAV-assisted Bridge Inspection using Computer Vision",
    journal: "Automation in Construction, Elsevier",
    year: "2023",
    doi: "10.1016/j.autcon.2023.104891",
  },
  {
    authors: "Deshmukh, A., Kulkarni, P.",
    title: "Bi-directional EV-to-Grid System with Fuzzy Control",
    journal: "IEEE Transactions on Power Electronics",
    year: "2023",
    doi: "10.1109/TPEL.2023.3312456",
  },
];

const BOOKS = [
  {
    title: "Computational Fluid Dynamics: Engineering Applications",
    author: "Prof. V. Warudkar",
    pub: "Springer Nature",
    year: 2023,
  },
  {
    title: "Machine Learning for Structural Health Monitoring",
    author: "Dr. K. Rao, Dr. A. Joshi",
    pub: "CRC Press",
    year: 2022,
  },
  {
    title: "VLSI Design for Low-Power IoT Systems",
    author: "Prof. M. Patil",
    pub: "Wiley-IEEE Press",
    year: 2022,
  },
  {
    title: "Advanced Nanocomposites: Synthesis and Characterization",
    author: "Dr. P. Joshi",
    pub: "Elsevier",
    year: 2021,
  },
];

const PATENTS = [
  {
    title: "Adaptive Voltage Scaling Circuit for IoT Edge Processors",
    inventors: "M. Patil, A. Kulkarni",
    year: 2024,
    status: "Granted",
  },
  {
    title: "AI-Based Real-Time Structural Defect Detection System",
    inventors: "K. Rao, R. Ingle",
    year: 2024,
    status: "Filed",
  },
  {
    title: "Hybrid Regenerative Braking System for Electric Vehicles",
    inventors: "A. Deshmukh, V. Kulkarni",
    year: 2023,
    status: "Granted",
  },
  {
    title: "Self-Cleaning Nanocomposite Coating for Solar Panels",
    inventors: "P. Joshi, S. Sharma",
    year: 2023,
    status: "Granted",
  },
  {
    title: "Micro-Channel Heat Exchanger with Topology Optimization",
    inventors: "V. Warudkar, R. Patil",
    year: 2022,
    status: "Granted",
  },
  {
    title: "Federated Learning Framework for Privacy-Preserving Healthcare AI",
    inventors: "R. Ingle, S. Patkar",
    year: 2022,
    status: "Filed",
  },
];

function OutputContent({ sub }: { sub: string }) {
  if (sub === "Publications") {
    return (
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {DEPARTMENTS.map((d) => (
            <DeptCard key={d.slug} dept={d} mode="publications" />
          ))}
        </div>
        <h4
          className="font-bold mb-5 pt-5 border-t border-gray-200 font-body"
          style={{ color: RC.deepBlue }}
        >
          Selected Publications
        </h4>
        <div className="space-y-4">
          {SAMPLE_PUBS.map((p) => (
            <div
              key={p.doi}
              className="p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              style={{ border: "1px solid rgba(22,72,200,0.1)" }}
            >
              <div
                className="text-xs font-body mb-1"
                style={{ color: RC.mutedText }}
              >
                {p.authors} ({p.year})
              </div>
              <div
                className="font-semibold text-sm font-body mb-1"
                style={{ color: RC.deepBlue }}
              >
                {p.title}
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-body italic"
                  style={{ color: RC.cobalt }}
                >
                  {p.journal}
                </span>
                <a
                  href={`https://doi.org/${p.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold font-body hover:underline"
                  style={{ color: RC.gold }}
                >
                  DOI →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sub === "Books") {
    return (
      <div className="grid md:grid-cols-2 gap-5">
        {BOOKS.map((b) => (
          <div
            key={b.title}
            className="flex gap-4 p-5 rounded-xl hover:shadow-md transition-all duration-200"
            style={{
              border: "1px solid rgba(22,72,200,0.1)",
              background: "white",
            }}
          >
            <div
              className="shrink-0 w-14 h-20 rounded flex items-center justify-center text-2xl"
              style={{
                background: `linear-gradient(135deg, ${RC.midnight}, ${RC.cobalt})`,
              }}
            >
              📖
            </div>
            <div>
              <h4
                className="font-bold text-sm mb-1 font-body"
                style={{ color: RC.deepBlue }}
              >
                {b.title}
              </h4>
              <p
                className="text-xs font-body mb-1"
                style={{ color: RC.cobalt }}
              >
                {b.author}
              </p>
              <p className="text-xs font-body" style={{ color: RC.mutedText }}>
                {b.pub}, {b.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Patents
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-sm font-body"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead>
          <tr style={{ background: RC.deepBlue, color: "white" }}>
            {["Title", "Inventors", "Year", "Status"].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-xs tracking-wider uppercase font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PATENTS.map((p, i) => (
            <tr
              key={p.title}
              className="hover:bg-blue-50 transition-colors duration-150"
              style={{
                background: i % 2 === 0 ? "white" : "rgba(22,72,200,0.02)",
                borderBottom: "1px solid rgba(22,72,200,0.08)",
              }}
            >
              <td
                className="px-4 py-3 font-medium"
                style={{ color: RC.deepBlue }}
              >
                {p.title}
              </td>
              <td className="px-4 py-3" style={{ color: RC.mutedText }}>
                {p.inventors}
              </td>
              <td className="px-4 py-3" style={{ color: RC.mutedText }}>
                {p.year}
              </td>
              <td className="px-4 py-3">
                <span
                  className="px-2 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: p.status === "Granted" ? "#e8f5e9" : "#fff3e0",
                    color: p.status === "Granted" ? "#2e7d32" : "#e65100",
                  }}
                >
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── PROJECTS TAB ────────────────────────────────────────────────────────────
const PROJECTS_SUBS = ["Ongoing Projects", "Completed Projects"];

const ONGOING = [
  {
    title: "AI-Driven Predictive Maintenance for Industrial Robots",
    pi: "Prof. R. Ingle",
    dept: "Computer Engg",
    funder: "DST-SERB",
    amount: "₹85L",
    duration: "2023–2026",
  },
  {
    title: "Next-Gen EV Battery Management System with Thermal Control",
    pi: "Prof. A. Deshmukh",
    dept: "Electrical Engg",
    funder: "DRDO",
    amount: "₹1.2Cr",
    duration: "2022–2025",
  },
  {
    title: "Fabrication of GaN-based Power Devices for EV Applications",
    pi: "Prof. M. Patil",
    dept: "Electronics Engg",
    funder: "MeitY",
    amount: "₹95L",
    duration: "2023–2026",
  },
  {
    title: "Resilient Concrete Structures Using Recycled Aggregate",
    pi: "Dr. K. Rao",
    dept: "Civil Engg",
    funder: "CSIR",
    amount: "₹65L",
    duration: "2022–2024",
  },
  {
    title: "Carbon Capture via Metal-Organic Framework Nanomaterials",
    pi: "Dr. P. Joshi",
    dept: "Applied Sciences",
    funder: "SERB-CRG",
    amount: "₹72L",
    duration: "2023–2026",
  },
];

const COMPLETED = [
  {
    title: "Smart Water Metering for Urban Distribution Networks",
    pi: "Dr. K. Rao",
    dept: "Civil Engg",
    funder: "Pune Municipal Corporation",
    amount: "₹48L",
    duration: "2020–2022",
  },
  {
    title: "Deep Reinforcement Learning for Autonomous Warehouse Robots",
    pi: "Prof. R. Ingle",
    dept: "Computer Engg",
    funder: "Amazon India",
    amount: "₹1.1Cr",
    duration: "2019–2022",
  },
  {
    title: "Multi-scale Modelling of Composite Wind Turbine Blades",
    pi: "Prof. V. Warudkar",
    dept: "Mechanical Engg",
    funder: "MNRE",
    amount: "₹88L",
    duration: "2018–2021",
  },
  {
    title: "VLSI Architectures for Real-Time Video Compression",
    pi: "Prof. M. Patil",
    dept: "Electronics Engg",
    funder: "ISRO",
    amount: "₹76L",
    duration: "2019–2022",
  },
  {
    title: "Synthesis of Silver Nanowire Transparent Electrodes for OLEDs",
    pi: "Dr. P. Joshi",
    dept: "Applied Sciences",
    funder: "SERB",
    amount: "₹62L",
    duration: "2018–2021",
  },
];

function ProjectsContent({ sub }: { sub: string }) {
  const projects = sub === "Ongoing Projects" ? ONGOING : COMPLETED;
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {DEPARTMENTS.map((d) => (
          <DeptCard key={d.slug} dept={d} mode="projects" />
        ))}
      </div>
      <h4
        className="font-bold mb-5 pt-5 border-t border-gray-200 font-body"
        style={{ color: RC.deepBlue }}
      >
        {sub === "Ongoing Projects"
          ? "Currently Funded Projects"
          : "Completed Research Projects"}
      </h4>
      <div className="overflow-x-auto">
        <table
          className="w-full text-sm font-body"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead>
            <tr style={{ background: RC.deepBlue, color: "white" }}>
              {["Title", "PI", "Dept", "Funder", "Amount", "Duration"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-3 py-3 text-xs tracking-wider uppercase font-semibold"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr
                key={p.title}
                className="hover:bg-blue-50 transition-colors duration-150"
                style={{
                  background: i % 2 === 0 ? "white" : "rgba(22,72,200,0.02)",
                  borderBottom: "1px solid rgba(22,72,200,0.06)",
                }}
              >
                <td
                  className="px-3 py-3 font-medium"
                  style={{ color: RC.deepBlue }}
                >
                  {p.title}
                </td>
                <td className="px-3 py-3" style={{ color: RC.mutedText }}>
                  {p.pi}
                </td>
                <td className="px-3 py-3" style={{ color: RC.mutedText }}>
                  {p.dept}
                </td>
                <td className="px-3 py-3" style={{ color: RC.mutedText }}>
                  {p.funder}
                </td>
                <td
                  className="px-3 py-3 font-semibold"
                  style={{ color: RC.cobalt }}
                >
                  {p.amount}
                </td>
                <td className="px-3 py-3" style={{ color: RC.mutedText }}>
                  {p.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── FUNDING TAB ─────────────────────────────────────────────────────────────
const FUNDING_SUBS = ["Research Grants", "Sponsored Projects"];

const SPONSORED = [
  {
    sponsor: "Tata Motors Ltd.",
    amount: "₹2.5 Cr",
    dept: "Electrical & Mechanical",
    focus: "EV Powertrain Testing",
  },
  {
    sponsor: "Bosch India",
    amount: "₹1.8 Cr",
    dept: "Electronics Engineering",
    focus: "ADAS Sensor Fusion",
  },
  {
    sponsor: "KPIT Technologies",
    amount: "₹1.2 Cr",
    dept: "Computer Engineering",
    focus: "Automotive AI/ML",
  },
  {
    sponsor: "Cummins India",
    amount: "₹95 L",
    dept: "Mechanical Engineering",
    focus: "Engine Emission Reduction",
  },
  {
    sponsor: "L&T Construction",
    amount: "₹78 L",
    dept: "Civil Engineering",
    focus: "Smart Building Automation",
  },
];

function FundingContent({ sub }: { sub: string }) {
  if (sub === "Research Grants") {
    return (
      <div>
        <div
          className="rounded-xl p-8 mb-8 text-center"
          style={{
            background: `linear-gradient(135deg, ${RC.midnight} 0%, ${RC.deepBlue} 100%)`,
          }}
        >
          <div
            className="text-5xl font-bold mb-2"
            style={{ color: RC.gold, fontFamily: "'Playfair Display', serif" }}
          >
            ₹15 Crore+
          </div>
          <div className="text-white/80 text-sm font-body mb-6">
            Active Research Grants Across All Departments
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["Apply for Funding →", "Collaborate with Us →"].map((cta, i) => (
              <a
                key={cta}
                href="#research"
                data-ocid={`research.funding.${i === 0 ? "apply" : "collaborate"}.button`}
                className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 font-body"
                style={
                  i === 0
                    ? { background: RC.gold, color: RC.midnight }
                    : {
                        background: "rgba(255,255,255,0.1)",
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.3)",
                      }
                }
              >
                {cta}
              </a>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              agency: "DST",
              full: "Dept of Science & Technology",
              projects: 8,
              total: "₹4.2Cr",
            },
            {
              agency: "SERB",
              full: "Science & Engineering Research Board",
              projects: 6,
              total: "₹3.1Cr",
            },
            {
              agency: "DRDO",
              full: "Defence Research & Development Org.",
              projects: 4,
              total: "₹3.8Cr",
            },
            {
              agency: "CSIR",
              full: "Council of Scientific & Industrial Research",
              projects: 5,
              total: "₹2.1Cr",
            },
            {
              agency: "MeitY",
              full: "Ministry of Electronics & IT",
              projects: 3,
              total: "₹1.8Cr",
            },
            {
              agency: "Industry",
              full: "Corporate Sponsored Research",
              projects: 12,
              total: "₹5.2Cr",
            },
          ].map((g) => (
            <div
              key={g.agency}
              className="rounded-xl p-5 hover:shadow-md transition-all duration-200"
              style={{
                border: "1px solid rgba(22,72,200,0.1)",
                background: "white",
              }}
            >
              <div
                className="text-2xl font-bold mb-1"
                style={{
                  color: RC.cobalt,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {g.agency}
              </div>
              <div
                className="text-xs font-body mb-3"
                style={{ color: RC.mutedText }}
              >
                {g.full}
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div
                    className="text-lg font-bold"
                    style={{
                      color: RC.gold,
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {g.total}
                  </div>
                  <div
                    className="text-xs font-body"
                    style={{ color: RC.mutedText }}
                  >
                    Total Awarded
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold" style={{ color: RC.deepBlue }}>
                    {g.projects}
                  </div>
                  <div
                    className="text-xs font-body"
                    style={{ color: RC.mutedText }}
                  >
                    Projects
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Sponsored projects
  return (
    <div>
      <p className="text-sm font-body mb-6" style={{ color: RC.mutedText }}>
        COEP partners with leading industry organisations through sponsored
        research agreements. Each agreement includes IP co-ownership clauses,
        publication rights, and technology transfer options.
      </p>
      <div className="overflow-x-auto">
        <table
          className="w-full text-sm font-body"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead>
            <tr style={{ background: RC.deepBlue, color: "white" }}>
              {["Sponsor", "Amount", "Department", "Research Focus"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs tracking-wider uppercase font-semibold"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {SPONSORED.map((s, i) => (
              <tr
                key={s.sponsor}
                className="hover:bg-blue-50 transition-colors duration-150"
                style={{
                  background: i % 2 === 0 ? "white" : "rgba(22,72,200,0.02)",
                  borderBottom: "1px solid rgba(22,72,200,0.06)",
                }}
              >
                <td
                  className="px-4 py-3 font-medium"
                  style={{ color: RC.deepBlue }}
                >
                  {s.sponsor}
                </td>
                <td
                  className="px-4 py-3 font-semibold"
                  style={{ color: RC.cobalt }}
                >
                  {s.amount}
                </td>
                <td className="px-4 py-3" style={{ color: RC.mutedText }}>
                  {s.dept}
                </td>
                <td className="px-4 py-3" style={{ color: RC.mutedText }}>
                  {s.focus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab content map ─────────────────────────────────────────────────────────
type SubState = {
  overview: string;
  people: string;
  infrastructure: string;
  output: string;
  projects: string;
  funding: string;
};

// ─── Main Component ──────────────────────────────────────────────────────────
export function ResearchMain({
  activeTab,
  onTabChange: _onTabChange,
}: { activeTab: ResearchTabId; onTabChange: (id: ResearchTabId) => void }) {
  const [subs, setSubs] = useState<SubState>({
    overview: OVERVIEW_SUBS[0],
    people: PEOPLE_SUBS[0],
    infrastructure: INFRA_SUBS[0],
    output: OUTPUT_SUBS[0],
    projects: PROJECTS_SUBS[0],
    funding: FUNDING_SUBS[0],
  });

  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05);

  const tabConfig: Record<
    ResearchTabId,
    { subs: string[]; title: string; sub: string }
  > = {
    overview: {
      subs: OVERVIEW_SUBS,
      title: "Research Overview",
      sub: "COEP Technological University",
    },
    people: {
      subs: PEOPLE_SUBS,
      title: "People & Community",
      sub: "Researchers, scholars & partners",
    },
    infrastructure: {
      subs: INFRA_SUBS,
      title: "Research Infrastructure",
      sub: "Labs, facilities & innovation",
    },
    output: {
      subs: OUTPUT_SUBS,
      title: "Research Output",
      sub: "Publications, books & patents",
    },
    projects: {
      subs: PROJECTS_SUBS,
      title: "Research Projects",
      sub: "Funded projects across departments",
    },
    funding: {
      subs: FUNDING_SUBS,
      title: "Funding & Grants",
      sub: "Supporting research excellence",
    },
  };

  const cfg = tabConfig[activeTab];
  const currentSub = subs[activeTab];

  const setSubForTab = (sub: string) => {
    setSubs((prev) => ({ ...prev, [activeTab]: sub }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewContent sub={currentSub} />;
      case "people":
        return <PeopleContent sub={currentSub} />;
      case "infrastructure":
        return <InfraContent sub={currentSub} />;
      case "output":
        return <OutputContent sub={currentSub} />;
      case "projects":
        return <ProjectsContent sub={currentSub} />;
      case "funding":
        return <FundingContent sub={currentSub} />;
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ background: "#f8f9fc", minHeight: "60vh" }}
    >
      <Section title={cfg.title} sub={cfg.sub}>
        <div className="flex gap-8 items-start">
          {/* Left sub-nav */}
          <SubNav
            items={cfg.subs}
            active={currentSub}
            onSelect={setSubForTab}
            tabId={activeTab}
          />
          {/* Right content with fade transition */}
          <div
            key={`${activeTab}-${currentSub}`}
            className="flex-1 min-w-0"
            style={{ animation: "fadeInUp 0.35s ease forwards" }}
          >
            {renderContent()}
          </div>
        </div>
      </Section>
    </div>
  );
}
