import type {
  Announcement,
  Event,
  NavItem,
  NewsItem,
  Notice,
  ResearchPaper,
  Stat,
} from "../types";

export const announcements: Announcement[] = [
  {
    id: 1,
    text: "New: CAS Applications — Apply for Central Admission System before the deadline",
    tag: "NEW",
  },
  {
    id: 2,
    text: "98th Edition of Regatta: Live Streaming available on COEP official channels",
    tag: "LIVE",
  },
  {
    id: 3,
    text: "Two-Day Workshop: Fundamentals of Statistics & Machine Learning for Researchers — Register now",
    tag: "NEW",
  },
  {
    id: 4,
    text: "VIVEKMALA '26: From Vision to Victory — Fest results announced",
    tag: "RESULTS",
  },
  {
    id: 5,
    text: "Notification: Joining of Dr. Kishore M. Paknikar under ANRF PMP (Practice)",
    tag: "NOTICE",
  },
  {
    id: 6,
    text: "AICTE QIP Post Graduate Certificate Programme in High Performance Computing — Admissions open",
    tag: "ADMISSIONS",
  },
  {
    id: 7,
    text: "ZEST '26: Annual Sports Festival registration open for all students",
    tag: "NEW",
  },
  {
    id: 8,
    text: "COEP Research Park: Industry Meet on Automotive Centre of Excellence — Dec 12",
    tag: "EVENT",
  },
];

export const tickerMessages: string[] = [
  "COEP Tech Ranked #1 Engineering Institution in Maharashtra",
  "Mindspark 2025 — Registration Now Open for Technical Fest",
  "Admissions 2025–26 Now Open — Apply via CAS Portal",
  "COEP Fest Impressions Returns: March 2025 | Register Your Team",
  "New Research Centre for Advanced Materials Inaugurated",
  "100% Placement Record Achieved for MBA Batch 2024",
  "Apply for Merit-Based Scholarships — Last Date: 31st March",
  "International Collaborations Established with 50+ Universities Worldwide",
  "98th COEP Regatta — One of Asia's Oldest Boat Races | Feb 21, 2026",
  "ZEST '26 Annual Sports Festival | Registration Open for All Students",
];

export const events: Event[] = [
  {
    id: 1,
    title: "AICTE QIP Programme in High Performance Computing",
    date: "April 30, 2025",
    location: "COEP Pune Campus",
    category: "Academic Programme",
    description:
      "An intensive post-graduate certificate programme designed for working professionals seeking mastery in high-performance computing and parallel algorithms.",
    gradient: "linear-gradient(145deg, #1648C8 0%, #0a2580 100%)",
  },
  {
    id: 2,
    title: "ZEST '26 — Annual Sports Festival",
    date: "February 14–16, 2026",
    location: "COEP Pune Campus",
    category: "Sports & Culture",
    description:
      "Where passion, discipline, and sportsmanship converge. ZEST '26 brings together the best athletes from institutions across Maharashtra for a week of competitive excellence.",
    gradient: "linear-gradient(145deg, #0F3499 0%, #1648C8 100%)",
  },
  {
    id: 3,
    title: "Industry Meet on Automotive Centre of Excellence",
    date: "December 12, 2025",
    location: "COEP Chikhali Campus",
    category: "Industry Connect",
    description:
      "COEP Research Park hosts the Industry Meet on Automotive CoE, connecting industry leaders with academia to advance automotive research and innovation.",
    gradient: "linear-gradient(145deg, #081E5C 0%, #0F3499 100%)",
  },
  {
    id: 4,
    title: "VIVEKMALA '26: The Annual Technical Fest",
    date: "January 21–23, 2026",
    location: "COEP Pune Campus",
    category: "Technical Fest",
    description:
      "The flagship technical festival of COEP Technological University celebrating innovation, entrepreneurship, and problem-solving among students and professionals.",
    gradient: "linear-gradient(145deg, #1648C8 0%, #081E5C 100%)",
  },
  {
    id: 5,
    title: "98th Regatta — Inter-Collegiate Boat Race",
    date: "February 21, 2026",
    location: "Pashan Lake, Pune",
    category: "Sports",
    description:
      "The 98th edition of the legendary COEP Regatta, one of Asia's oldest boat races, returns to Pashan Lake for a day of tradition, teamwork, and competitive rowing.",
    gradient: "linear-gradient(145deg, #0a2580 0%, #1648C8 100%)",
  },
];

export const notices: Notice[] = [
  {
    id: 1,
    title: "Examination Schedule 2024–25 Released",
    date: "March 15, 2025",
    description:
      "The complete examination timetable for all UG and PG programmes for the academic year 2024–25 has been published. Students are advised to download and verify their schedules.",
    category: "Examinations",
    link: "#",
  },
  {
    id: 2,
    title: "Admission Notifications for 2025–26",
    date: "March 10, 2025",
    description:
      "COEP Technological University announces admission for B.Tech, M.Tech, MBA, and PhD programmes for 2025–26. Applications available on the official portal.",
    category: "Admissions",
    link: "#",
  },
  {
    id: 3,
    title: "TEQIP Grant Applications Open",
    date: "February 28, 2025",
    description:
      "Faculty members and researchers are invited to apply for TEQIP research grants for applied research projects. Deadline for submission: March 31, 2025.",
    category: "Research",
    link: "#",
  },
  {
    id: 4,
    title: "Annual Report 2023–24 Available",
    date: "February 20, 2025",
    description:
      "The COEP Technological University Annual Report for the year 2023–24 is now available for download on the official website.",
    category: "Administration",
    link: "#",
  },
  {
    id: 5,
    title: "Faculty Recruitment 2025 Announced",
    date: "February 12, 2025",
    description:
      "Applications are invited for faculty positions across departments. Eligible candidates may apply online through the prescribed format before the closing date.",
    category: "Recruitment",
    link: "#",
  },
  {
    id: 6,
    title: "New PhD Programme in Quantum Computing",
    date: "February 1, 2025",
    description:
      "COEP Technological University introduces a new PhD programme in Quantum Computing and Cryptography in collaboration with national research institutions.",
    category: "Academic",
    link: "#",
  },
];

export const researchPapers: ResearchPaper[] = [
  {
    id: 1,
    title:
      "Advances in Computational Fluid Dynamics for Turbomachinery Applications",
    department: "Mechanical Engineering",
    author: "Dr. R. B. Patil, Prof. S. Kulkarni",
    abstract:
      "This study presents novel numerical methods for solving Navier-Stokes equations in turbomachinery domains, achieving 23% improved accuracy over conventional CFD approaches with applications in jet propulsion and wind turbine design.",
    gradient: "linear-gradient(135deg, #1648C8 0%, #0a2580 100%)",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0360319923000001",
  },
  {
    id: 2,
    title: "Machine Learning for Smart Grid Optimization and Fault Detection",
    department: "Electrical Engineering",
    author: "Dr. P. M. Deshpande, Dr. A. Sharma",
    abstract:
      "A deep learning framework for real-time fault detection and load balancing in smart power grids. The proposed model achieves 97.3% accuracy in identifying fault patterns across 10,000 simulated grid scenarios.",
    gradient: "linear-gradient(135deg, #0F3499 0%, #1648C8 100%)",
    link: "https://ieeexplore.ieee.org/document/9876543",
  },
  {
    id: 3,
    title:
      "Sustainable Construction Materials Using Industrial Waste By-products",
    department: "Civil Engineering",
    author: "Dr. V. S. Joshi, Prof. M. R. Naik",
    abstract:
      "Investigation of fly ash and slag-based geopolymer concrete as an eco-friendly alternative to Portland cement. Results demonstrate 30% reduction in carbon footprint with superior compressive strength and durability.",
    gradient: "linear-gradient(135deg, #081E5C 0%, #0F3499 100%)",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0950061823000002",
  },
  {
    id: 4,
    title: "Quantum Computing Algorithms for Post-Quantum Cryptography",
    department: "Computer Engineering",
    author: "Dr. S. A. Meshram, Dr. T. Bagave",
    abstract:
      "Novel lattice-based cryptographic algorithms designed to resist attacks from quantum computers. The proposed scheme offers 256-bit security with 40% lower computational overhead than existing NIST post-quantum standards.",
    gradient: "linear-gradient(135deg, #1648C8 0%, #081E5C 100%)",
    link: "https://arxiv.org/abs/2301.00001",
  },
];

export const news: NewsItem[] = [
  {
    id: 1,
    title: "CAS Applications — Central Admission System Now Open",
    date: "February 21, 2026",
    excerpt:
      "COEP Technological University announces the opening of CAS applications for the academic year 2026-27. Eligible candidates are encouraged to apply through the official portal.",
    category: "Admissions",
    isNew: true,
  },
  {
    id: 2,
    title:
      "COEP Tech Celebrates Alumni Milestone: Bharat Gite, Founder of Taural India",
    date: "February 18, 2026",
    excerpt:
      "COEP Technological University extends congratulations to Bharat Gite, Founder, MD & CEO of Taural India Pvt Ltd and esteemed COEP alumnus, for a distinguished entrepreneurial journey.",
    category: "Alumni",
    isNew: false,
  },
  {
    id: 3,
    title: "Workshop on Real Life 5G & Advanced Communication Use Cases",
    date: "February 10, 2026",
    excerpt:
      "A specialized training programme on Real Life Use Case Implementation with 5G and Advance Communication technologies. Participants gain hands-on experience with next-generation networks.",
    category: "Workshop",
    isNew: false,
  },
  {
    id: 4,
    title: "COEP Tech Observes Reading Hour — Celebrating the Joy of Books",
    date: "January 30, 2026",
    excerpt:
      "Faculty, staff, and students of COEP Technological University came together for the Reading Hour initiative, reaffirming the university's commitment to lifelong learning.",
    category: "Campus Life",
    isNew: false,
  },
  {
    id: 5,
    title: "Notification: Dr. Kishore M. Paknikar Joins under ANRF PMP",
    date: "January 25, 2026",
    excerpt:
      "Official notification regarding the joining of Dr. Kishore M. Paknikar under the ANRF Principal Mentorship Programme. Details available on the university notice board.",
    category: "Faculty",
    isNew: true,
  },
  {
    id: 6,
    title: "COEP Presents ZEST '26 — Annual Sports & Cultural Festival",
    date: "January 15, 2026",
    excerpt:
      "COEP Technological University proudly presents ZEST '26, celebrating competitive spirit, teamwork, and excellence. Registration open for all disciplines.",
    category: "Events",
    isNew: false,
  },
];

export const stats: Stat[] = [
  {
    value: "1854",
    label: "Established",
    description:
      "One of India's oldest and most prestigious technical institutions",
  },
  {
    value: "4500+",
    label: "Students",
    description: "Vibrant and diverse student community on campus",
  },
  {
    value: "167",
    label: "Regular Faculty",
    description: "Distinguished professors and industry-experienced educators",
  },
  {
    value: "9",
    label: "UG Programmes",
    description: "Cutting-edge undergraduate engineering programmes",
  },
  {
    value: "26",
    label: "PG Programmes",
    description: "Specialized postgraduate and research programmes",
  },
  {
    value: "13",
    label: "Departments",
    description: "Covering every frontier of engineering and technology",
  },
  {
    value: "NAAC A++",
    label: "Accreditation",
    description: "Highest accreditation grade awarded by NAAC, India",
  },
  {
    value: "6×",
    label: "Industry Award",
    description: "Multiple industry recognitions for excellence and innovation",
  },
];

export const navItems: NavItem[] = [
  {
    label: "About Us",
    href: "#/about-us",
    children: [
      { label: "About University", href: "#/about-us" },
      { label: "Board of Governance", href: "#/about-us#board-of-governance" },
      {
        label: "Authorities, Boards & Committees",
        href: "#/about-us#authorities-committees",
      },
    ],
  },
  {
    label: "Administration",
    href: "#/administration",
    children: [
      { label: "Vice Chancellor", href: "#/administration" },
      { label: "Registrar", href: "#/administration" },
      { label: "Dean", href: "#/administration" },
      { label: "Directors", href: "#/administration" },
      { label: "Associate Deans", href: "#/administration" },
      { label: "Finance & Accounts Officer", href: "#/administration" },
      { label: "Ombudsperson for Students", href: "#/administration" },
    ],
  },
  {
    label: "Admissions",
    href: "#/admissions",
    children: [
      { label: "Undergraduate (B.Tech)", href: "#/admissions" },
      { label: "Postgraduate (M.Tech)", href: "#/admissions" },
      { label: "MBA", href: "#/admissions" },
      { label: "PhD", href: "#/admissions" },
      { label: "PG Diploma", href: "#/admissions" },
    ],
  },
  {
    label: "Academics",
    href: "#/dms",
    children: [
      { label: "Dept. of Management Studies", href: "#/dms" },
      {
        label: "Dept. of Mechanical Engineering",
        href: "#/academics/mechanical-engineering",
      },
      { label: "Centers of Excellence", href: "#/research" },
      { label: "Skill Development Center", href: "#/campus-life" },
    ],
  },
  {
    label: "Research",
    href: "#/research",
    children: [
      { label: "Research Projects", href: "#/research" },
      { label: "Publications", href: "#/research" },
      { label: "Books", href: "#/research" },
      { label: "IPR / Patent", href: "#/research" },
      { label: "PhD Data", href: "#/research" },
      { label: "MOUs", href: "#/research" },
      { label: "Collaborations", href: "#/research" },
      { label: "RIIL", href: "#/research" },
    ],
  },
  {
    label: "Campus Life",
    href: "#/campus-life",
    children: [
      { label: "Overview", href: "#/campus-life" },
      { label: "Facilities", href: "#/campus-life" },
      { label: "Student Clubs", href: "#/campus-life" },
      { label: "Student Services", href: "#/campus-life" },
      { label: "Academic Calendar", href: "#/campus-life" },
    ],
  },
  {
    label: "Facilities",
    href: "#/facilities",
    children: [
      { label: "About", href: "#/facilities" },
      { label: "KRC", href: "#/facilities" },
      { label: "NSS", href: "#/facilities" },
      { label: "BIS Dashboard", href: "#/facilities" },
    ],
  },
  {
    label: "Placements & Careers",
    href: "#/placements",
    children: [
      { label: "Training and Placement Cell", href: "#/placements" },
      { label: "Careers", href: "#/placements" },
      { label: "Career Archives", href: "#/placements" },
    ],
  },
];
