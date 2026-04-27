import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { UniversityTabsSection } from "../components/UniversityTabsSection";
import { RC } from "./ResearchPage";

// ─── Dept data ───────────────────────────────────────────────────────────────
const DEPT_DATA: Record<
  string,
  {
    name: string;
    shortName: string;
    tagline: string;
    color: string;
    head: string;
    email: string;
    pubs: { title: string; authors: string; journal: string; year: number }[];
    projects: { title: string; pi: string; funder: string; status: string }[];
    faculty: { name: string; area: string }[];
  }
> = {
  "computer-engineering": {
    name: "Department of Computer Engineering",
    shortName: "Computer Engineering",
    tagline: "AI, Machine Learning & Distributed Systems",
    color: RC.cobalt,
    head: "Prof. Rajesh Ingle",
    email: "comp-research@coeptech.ac.in",
    pubs: [
      {
        title: "Self-Supervised Contrastive Learning for Low-Resource NLP",
        authors: "R. Ingle, A. Kulkarni",
        journal: "ACL 2024",
        year: 2024,
      },
      {
        title: "Federated Graph Neural Networks for Fraud Detection",
        authors: "S. Patkar, R. Ingle",
        journal: "IEEE TKDE",
        year: 2023,
      },
      {
        title: "Adversarial Robustness of Medical Image Classifiers",
        authors: "A. Kulkarni, P. Deshmukh",
        journal: "NeurIPS Workshop",
        year: 2023,
      },
      {
        title: "BERT Fine-tuning for Code-mixed Marathi-English Text",
        authors: "D. Kale, R. Ingle",
        journal: "EMNLP 2023",
        year: 2023,
      },
      {
        title: "Efficient Transformer Architectures for Edge Deployment",
        authors: "V. Patil, S. Joshi",
        journal: "ICLR 2022",
        year: 2022,
      },
    ],
    projects: [
      {
        title: "AI-Driven Predictive Maintenance for Industrial Robots",
        pi: "Prof. R. Ingle",
        funder: "DST-SERB ₹85L",
        status: "Ongoing",
      },
      {
        title: "Deep Reinforcement Learning for Autonomous Warehouse Robots",
        pi: "Prof. R. Ingle",
        funder: "Amazon India ₹1.1Cr",
        status: "Completed",
      },
      {
        title: "Federated Learning for Privacy-Preserving Healthcare AI",
        pi: "Dr. S. Patkar",
        funder: "ICMR ₹65L",
        status: "Ongoing",
      },
    ],
    faculty: [
      { name: "Prof. Rajesh Ingle", area: "Machine Learning, NLP" },
      { name: "Dr. Sneha Patkar", area: "Federated Learning, Privacy" },
      { name: "Prof. Amit Kulkarni", area: "Computer Vision, Robotics" },
      { name: "Dr. Vikram Patil", area: "Distributed Systems, Cloud" },
    ],
  },
  "mechanical-engineering": {
    name: "Department of Mechanical Engineering",
    shortName: "Mechanical Engineering",
    tagline: "CFD, Manufacturing & Energy Systems",
    color: "#c0392b",
    head: "Prof. Vilas Warudkar",
    email: "mech-research@coeptech.ac.in",
    pubs: [
      {
        title: "Turbomachinery CFD with Reduced Basis Methods",
        authors: "V. Warudkar, R. Patil",
        journal: "ASME J. Turbomachinery",
        year: 2024,
      },
      {
        title: "Multi-scale Modelling of Composite Wind Turbine Blades",
        authors: "V. Warudkar, S. Sharma",
        journal: "Composites Part A",
        year: 2023,
      },
      {
        title: "Micro-Channel Heat Exchanger with Topology Optimization",
        authors: "V. Warudkar, R. Patil",
        journal: "Int. J. Heat Mass Transfer",
        year: 2022,
      },
      {
        title: "Additive Manufacturing of Functionally Graded Ti-6Al-4V",
        authors: "P. Gawande, A. Desai",
        journal: "J. Materials Processing",
        year: 2023,
      },
      {
        title:
          "Vibration Analysis of Rotating Machinery using Wavelet Transform",
        authors: "S. Kumar, V. Warudkar",
        journal: "Mechanical Systems & Signal Processing",
        year: 2022,
      },
    ],
    projects: [
      {
        title: "Next-Gen EV Battery Thermal Management",
        pi: "Prof. V. Warudkar",
        funder: "DRDO ₹1.2Cr",
        status: "Ongoing",
      },
      {
        title: "Carbon-Neutral Manufacturing Process Redesign",
        pi: "Dr. A. Desai",
        funder: "DST ₹75L",
        status: "Ongoing",
      },
      {
        title: "Composite Wind Turbine Blade Optimisation",
        pi: "Prof. V. Warudkar",
        funder: "MNRE ₹88L",
        status: "Completed",
      },
    ],
    faculty: [
      { name: "Prof. Vilas Warudkar", area: "CFD, Turbomachinery" },
      { name: "Dr. Anand Desai", area: "Manufacturing, AM" },
      { name: "Prof. Sachin Kumar", area: "Vibrations, Dynamics" },
      { name: "Dr. Priya Gawande", area: "Materials, Composites" },
    ],
  },
  "civil-engineering": {
    name: "Department of Civil Engineering",
    shortName: "Civil Engineering",
    tagline: "Smart Infrastructure & Sustainable Construction",
    color: "#27ae60",
    head: "Dr. Kavitha Rao",
    email: "civil-research@coeptech.ac.in",
    pubs: [
      {
        title: "UAV-assisted Bridge Inspection using Computer Vision",
        authors: "K. Rao, V. Sawant",
        journal: "Automation in Construction",
        year: 2023,
      },
      {
        title: "Resilient Concrete with Recycled Aggregate in Seismic Zones",
        authors: "A. Joshi, K. Rao",
        journal: "Construction and Building Materials",
        year: 2023,
      },
      {
        title: "Smart Water Metering for Urban Distribution Networks",
        authors: "K. Rao, P. Desai",
        journal: "Water Resources Management",
        year: 2022,
      },
      {
        title: "Groundwater Quality Prediction using LSTM Networks",
        authors: "V. Sawant, S. More",
        journal: "J. Hydrology",
        year: 2022,
      },
      {
        title: "Lateral Load Performance of Bamboo-Concrete Composite",
        authors: "A. Joshi, K. Rao",
        journal: "Structures, Elsevier",
        year: 2021,
      },
    ],
    projects: [
      {
        title: "IoT-Based Structural Health Monitoring of Railway Bridges",
        pi: "Dr. K. Rao",
        funder: "CSIR ₹65L",
        status: "Ongoing",
      },
      {
        title: "Smart Water Metering for Urban Distribution Networks",
        pi: "Dr. K. Rao",
        funder: "PMC ₹48L",
        status: "Completed",
      },
      {
        title: "Green Building Material from Industrial Waste",
        pi: "Dr. A. Joshi",
        funder: "SERB ₹52L",
        status: "Ongoing",
      },
    ],
    faculty: [
      { name: "Dr. Kavitha Rao", area: "Smart Infrastructure, SHM" },
      { name: "Dr. Amit Joshi", area: "Structural Engineering" },
      { name: "Prof. Vijay Sawant", area: "Geotechnical Engineering" },
      { name: "Dr. Snehal More", area: "Water Resources, Hydrology" },
    ],
  },
  "electrical-engineering": {
    name: "Department of Electrical Engineering",
    shortName: "Electrical Engineering",
    tagline: "Power Electronics, EVs & Smart Grids",
    color: "#e67e22",
    head: "Prof. Anil Deshmukh",
    email: "elec-research@coeptech.ac.in",
    pubs: [
      {
        title: "Bi-directional EV-to-Grid System with Fuzzy Control",
        authors: "A. Deshmukh, P. Kulkarni",
        journal: "IEEE Trans. Power Electronics",
        year: 2023,
      },
      {
        title: "Model Predictive Control for Grid-Tied Solar Inverters",
        authors: "A. Deshmukh, V. Patil",
        journal: "IEEE Trans. Industrial Electronics",
        year: 2022,
      },
      {
        title: "Adaptive Droop Control for Microgrids with High PV Penetration",
        authors: "S. Gawande, A. Deshmukh",
        journal: "IEEE Access",
        year: 2022,
      },
      {
        title: "SiC MOSFET-Based High-Frequency DC-DC Converter",
        authors: "P. Kulkarni, A. Deshmukh",
        journal: "IEEE Trans. Power Electronics",
        year: 2021,
      },
      {
        title: "AI-based Fault Detection in Underground Cables",
        authors: "V. Patil, S. Gawande",
        journal: "Electric Power Systems Research",
        year: 2021,
      },
    ],
    projects: [
      {
        title: "Grid-Interactive EV Charging with Demand Response",
        pi: "Prof. A. Deshmukh",
        funder: "SERB ₹80L",
        status: "Ongoing",
      },
      {
        title: "High-Frequency GaN-based Resonant Converter",
        pi: "Dr. P. Kulkarni",
        funder: "MeitY ₹62L",
        status: "Ongoing",
      },
      {
        title: "Smart Grid with PV and Battery Storage Integration",
        pi: "Prof. A. Deshmukh",
        funder: "MNRE ₹90L",
        status: "Completed",
      },
    ],
    faculty: [
      { name: "Prof. Anil Deshmukh", area: "Power Electronics, EVs" },
      { name: "Dr. Prasad Kulkarni", area: "High-Frequency Converters" },
      { name: "Dr. Suraj Gawande", area: "Smart Grids, Microgrids" },
      { name: "Prof. Vivek Patil", area: "Drives, Motion Control" },
    ],
  },
  "electronics-engineering": {
    name: "Department of Electronics Engineering",
    shortName: "Electronics Engineering",
    tagline: "VLSI, Embedded Systems & Signal Processing",
    color: "#8e44ad",
    head: "Prof. Mahesh Patil",
    email: "extc-research@coeptech.ac.in",
    pubs: [
      {
        title: "Sub-threshold CMOS Design for Batteryless IoT Nodes",
        authors: "M. Patil, P. Gokhale",
        journal: "IEEE Trans. Circuits & Systems",
        year: 2023,
      },
      {
        title: "Neuromorphic Computing Architectures for Edge Inference",
        authors: "P. More, M. Patil",
        journal: "IEEE Micro",
        year: 2023,
      },
      {
        title: "FPGA Implementation of Real-Time Video Compression",
        authors: "M. Patil, A. Kulkarni",
        journal: "Design Automation Conference",
        year: 2022,
      },
      {
        title: "Reconfigurable OFDM Receiver for 5G NR on FPGA",
        authors: "A. Kulkarni, M. Patil",
        journal: "IEEE Trans. VLSI Systems",
        year: 2022,
      },
      {
        title: "Temperature-Compensated Ring Oscillator for IoT",
        authors: "P. Gokhale, M. Patil",
        journal: "Microelectronics Journal",
        year: 2021,
      },
    ],
    projects: [
      {
        title: "GaN-based Power Devices for EV Applications",
        pi: "Prof. M. Patil",
        funder: "MeitY ₹95L",
        status: "Ongoing",
      },
      {
        title: "Neuromorphic Edge AI Chip Design",
        pi: "Dr. P. More",
        funder: "SERB ₹72L",
        status: "Ongoing",
      },
      {
        title: "VLSI Architectures for Real-Time Video Compression",
        pi: "Prof. M. Patil",
        funder: "ISRO ₹76L",
        status: "Completed",
      },
    ],
    faculty: [
      { name: "Prof. Mahesh Patil", area: "VLSI, Low-Power Design" },
      { name: "Dr. Priyanka More", area: "Neuromorphic Computing" },
      { name: "Prof. Ajay Kulkarni", area: "Signal Processing, FPGA" },
      { name: "Dr. Pushkar Gokhale", area: "Mixed-Signal IC Design" },
    ],
  },
  "applied-sciences": {
    name: "Department of Chemistry & Applied Sciences",
    shortName: "Applied Sciences",
    tagline: "Materials Science, Nanotechnology & Energy",
    color: "#16a085",
    head: "Dr. Priya Joshi",
    email: "appsci-research@coeptech.ac.in",
    pubs: [
      {
        title: "Carbon Capture via Metal-Organic Framework Nanomaterials",
        authors: "P. Joshi, A. Sharma",
        journal: "Nature Materials",
        year: 2024,
      },
      {
        title: "Self-Cleaning Nanocomposite Coating for Solar Panels",
        authors: "P. Joshi, S. Sharma",
        journal: "Applied Surface Science",
        year: 2023,
      },
      {
        title: "Synthesis of Silver Nanowire Transparent Electrodes for OLEDs",
        authors: "P. Joshi, R. Kulkarni",
        journal: "Advanced Materials",
        year: 2022,
      },
      {
        title: "Biomimetic Nanocomposite Scaffolds for Bone Regeneration",
        authors: "N. Jain, P. Joshi",
        journal: "Biomaterials",
        year: 2022,
      },
      {
        title: "ZnO Nanorod Arrays for Photocatalytic Dye Degradation",
        authors: "S. Sharma, P. Joshi",
        journal: "Journal of Hazardous Materials",
        year: 2021,
      },
    ],
    projects: [
      {
        title: "Carbon Capture via MOF Nanomaterials",
        pi: "Dr. P. Joshi",
        funder: "SERB-CRG ₹72L",
        status: "Ongoing",
      },
      {
        title: "Biomimetic Bone Scaffolds for Orthopaedic Applications",
        pi: "Dr. N. Jain",
        funder: "DBT ₹58L",
        status: "Ongoing",
      },
      {
        title: "Silver Nanowire Electrodes for Flexible Electronics",
        pi: "Dr. P. Joshi",
        funder: "SERB ₹62L",
        status: "Completed",
      },
    ],
    faculty: [
      { name: "Dr. Priya Joshi", area: "Nanomaterials, MOFs" },
      { name: "Dr. Nikita Jain", area: "Biomaterials, Tissue Engineering" },
      { name: "Dr. Suresh Sharma", area: "Photocatalysis, Energy" },
      { name: "Prof. Ramesh Kulkarni", area: "Polymer Chemistry" },
    ],
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
export function ResearchDeptPage({ slug }: { slug: string }) {
  const dept = DEPT_DATA[slug] ?? DEPT_DATA["computer-engineering"];

  return (
    <div style={{ background: "#f8f9fc" }}>
      {/* Dept header */}
      <div
        className="py-14 px-6"
        style={{
          background: `linear-gradient(135deg, ${RC.midnight} 0%, ${dept.color} 100%)`,
        }}
      >
        <div className="max-w-5xl mx-auto">
          <a
            href="#/research"
            className="inline-flex items-center gap-2 text-sm mb-6 font-body transition-all duration-200 hover:gap-3"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            ← Back to Research
          </a>
          <div
            className="text-xs tracking-widest uppercase mb-2 font-body"
            style={{ color: RC.gold }}
          >
            Research
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {dept.name}
          </h1>
          <p className="text-white/70 font-body">{dept.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-body">
            <span style={{ color: "rgba(255,255,255,0.65)" }}>
              Head: <strong style={{ color: "white" }}>{dept.head}</strong>
            </span>
            <span style={{ color: "rgba(255,255,255,0.65)" }}>
              Contact:{" "}
              <a href={`mailto:${dept.email}`} style={{ color: RC.gold }}>
                {dept.email}
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-14">
        {/* Faculty */}
        <div>
          <h2
            className="text-xl font-bold mb-6 pb-3 border-b border-gray-200"
            style={{
              color: RC.deepBlue,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Research Faculty
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {dept.faculty.map((f) => (
              <div
                key={f.name}
                className="flex gap-4 items-center p-4 rounded-xl hover:shadow-md transition-all duration-200"
                style={{
                  border: "1px solid rgba(22,72,200,0.1)",
                  background: "white",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold"
                  style={{
                    background: dept.color,
                    color: "white",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {f.name
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
                    {f.name}
                  </div>
                  <div
                    className="text-xs font-body"
                    style={{ color: RC.mutedText }}
                  >
                    {f.area}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div>
          <h2
            className="text-xl font-bold mb-6 pb-3 border-b border-gray-200"
            style={{
              color: RC.deepBlue,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Publications ({dept.pubs.length} listed)
          </h2>
          <div className="space-y-4">
            {dept.pubs.map((p) => (
              <div
                key={p.title}
                className="p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                style={{
                  border: "1px solid rgba(22,72,200,0.1)",
                  background: "white",
                }}
              >
                <div
                  className="text-xs font-body mb-1"
                  style={{ color: RC.mutedText }}
                >
                  {p.authors} ({p.year})
                </div>
                <div
                  className="font-semibold text-sm font-body"
                  style={{ color: RC.deepBlue }}
                >
                  {p.title}
                </div>
                <div
                  className="text-xs font-body italic mt-1"
                  style={{ color: RC.cobalt }}
                >
                  {p.journal}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h2
            className="text-xl font-bold mb-6 pb-3 border-b border-gray-200"
            style={{
              color: RC.deepBlue,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Research Projects
          </h2>
          <div className="space-y-3">
            {dept.projects.map((p) => (
              <div
                key={p.title}
                className="flex gap-4 items-start p-4 rounded-xl hover:shadow-md transition-all duration-200"
                style={{
                  border: "1px solid rgba(22,72,200,0.08)",
                  background: "white",
                }}
              >
                <span
                  className="shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold font-body mt-0.5"
                  style={{
                    background: p.status === "Ongoing" ? "#e8f5e9" : "#f0f4ff",
                    color: p.status === "Ongoing" ? "#2e7d32" : RC.cobalt,
                  }}
                >
                  {p.status}
                </span>
                <div>
                  <div
                    className="font-semibold text-sm font-body"
                    style={{ color: RC.deepBlue }}
                  >
                    {p.title}
                  </div>
                  <div
                    className="text-xs mt-1 font-body"
                    style={{ color: RC.mutedText }}
                  >
                    PI: {p.pi} | {p.funder}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back CTA */}
        <div className="pt-4 pb-8 text-center">
          <a
            href="#/research"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 font-body"
            style={{ background: RC.cobalt, color: "white" }}
          >
            ← Back to Research Overview
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Standalone page wrapper (for when accessed directly) ────────────────────
export function ResearchDeptPageStandalone({ slug }: { slug: string }) {
  return (
    <Layout>
      <Header />
      <UniversityTabsSection />
      <ResearchDeptPage slug={slug} />
      <Footer />
    </Layout>
  );
}
