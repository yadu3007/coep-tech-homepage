// ─── DMS Data ─────────────────────────────────────────────────────────────────

export interface FacultyEducation {
  degree: string;
  institution: string;
  year?: string;
}

export interface FacultyExperience {
  role: string;
  organization: string;
  duration: string;
}

export interface FacultyProfile {
  education: FacultyEducation[];
  experience: FacultyExperience[];
  researchInterests: string[];
  achievements: string[];
  coursesTaught: string[];
  profileType: "special" | "basic";
}

export interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  type: "head" | "professor" | "assistant" | "associate";
  email?: string;
  phone?: string;
  specialization: string;
  bio: string;
  photo: string;
  profile?: FacultyProfile;
}

export interface ProgramPhase {
  phase: number;
  title: string;
  subtitle: string;
  semester: string;
  subjects: string[];
  color: string;
}

export interface ProgramTab {
  id: string;
  label: string;
  icon: string;
  description: string;
  keyCourses: string[];
  learningOutcomes: string[];
  careerPaths: string[];
}

export interface DmsStat {
  value: string;
  label: string;
  description: string;
}

// ─── Faculty ──────────────────────────────────────────────────────────────────

export const FACULTY: FacultyMember[] = [
  {
    id: 1,
    name: "Dr. Sandeep A. Meshram",
    designation: "Head of Department & Associate Professor",
    type: "head",
    email: "hod.management@coeptech.ac.in",
    phone: "020-25507006 / 7214",
    specialization:
      "Financial Management, Corporate Governance, Strategic Management, Project Management",
    bio: "An accomplished academic and administrator with deep expertise in financial management and corporate governance. Leads the Department of Management Studies with a vision to create industry-ready management professionals.",
    photo:
      "/assets/dr._sandeep_a._meshram-019dbd9f-159e-71fb-8dc1-a7f530e2208f.jpg",
    profile: {
      profileType: "special",
      education: [
        {
          degree: "PhD in Management",
          institution: "University of Pune",
          year: "2010",
        },
        {
          degree: "MBA (Finance & Marketing)",
          institution: "Symbiosis Institute of Business Management, Pune",
          year: "2000",
        },
        {
          degree: "B.E. (Mechanical Engineering)",
          institution: "COEP Pune",
          year: "1997",
        },
      ],
      experience: [
        {
          role: "Head of Department & Associate Professor",
          organization: "COEP Technological University, DMS",
          duration: "2015 – Present",
        },
        {
          role: "Assistant Professor",
          organization: "COEP Technological University, DMS",
          duration: "2005 – 2015",
        },
        {
          role: "Finance Manager",
          organization: "Crompton Greaves Ltd., Pune",
          duration: "2002 – 2005",
        },
        {
          role: "Management Trainee",
          organization: "Kirloskar Electric Co. Ltd.",
          duration: "2000 – 2002",
        },
      ],
      researchInterests: [
        "Financial Management & Corporate Finance",
        "Corporate Governance & Business Ethics",
        "Strategic Management & Competitive Analysis",
        "Project Management & Infrastructure Planning",
        "Techno-Economic Analysis",
      ],
      achievements: [
        "Received University Merit Award for outstanding academic contribution to management education",
        "Published 25+ research papers in national and international peer-reviewed journals",
        "Authored 3 books on Financial Management and Corporate Strategy",
        "Guest faculty at premier management institutes including SIBM, SCMHRD, and IIMB Executive Programs",
        "Organized 10+ national conferences and faculty development workshops in management education",
        "Successfully guided 5 PhD scholars to completion in areas of finance and corporate governance",
        "Principal Investigator of a DST-funded research project on Corporate Governance in Indian SMEs",
        "Member of Board of Studies for MBA programs at multiple Maharashtra universities",
        "Contributed to AICTE curriculum reform committee for MBA programs (2019–2021)",
        "Awarded Best Administrator recognition by COEP Tech Alumni Association (2022)",
      ],
      coursesTaught: [
        "Financial Management",
        "Strategic Management",
        "Corporate Governance & Business Ethics",
        "Project Management",
        "Techno-Economic Analysis",
        "Infrastructure Planning",
      ],
    },
  },
  {
    id: 2,
    name: "Dr. Arun Mudbidri",
    designation: "Professor of Practice",
    type: "professor",
    email: "adm.mngmt@coeptech.ac.in",
    phone: "020-25507862",
    specialization:
      "Operations Management, Supply Chain Management, Student Employability, Corporate Connect",
    bio: "Over 40 years of rich experience spanning the education sector and industry. A champion of industry-academia collaboration, focused on enhancing student employability and building strong corporate connections for COEP DMS graduates.",
    photo: "/assets/dr._arun_mudbdri-019dbd9f-1598-71a8-8270-718a8eba924c.jpg",
    profile: {
      profileType: "special",
      education: [
        {
          degree: "PhD in Operations Management",
          institution: "IIT Bombay",
          year: "2004",
        },
        {
          degree: "M.Tech (Industrial Engineering)",
          institution: "IIT Bombay",
          year: "1995",
        },
        {
          degree: "B.E. (Mechanical Engineering)",
          institution: "COEP Pune",
          year: "1983",
        },
      ],
      experience: [
        {
          role: "Professor of Practice",
          organization: "COEP Technological University, DMS",
          duration: "2010 – Present",
        },
        {
          role: "Senior Manager – Operations",
          organization: "Thermax Ltd., Pune",
          duration: "2000 – 2010",
        },
        {
          role: "Deputy Manager – Manufacturing",
          organization: "Cummins India Ltd., Pune",
          duration: "1992 – 2000",
        },
        {
          role: "Engineer – Production Planning",
          organization: "Bajaj Auto Ltd.",
          duration: "1983 – 1992",
        },
      ],
      researchInterests: [
        "Operations Management & Process Optimization",
        "Supply Chain Management & Logistics",
        "Project Management & Planning",
        "Manufacturing Strategy & Industry 4.0",
        "Student Employability & Industry-Academia Connect",
      ],
      achievements: [
        "Recipient of Best Faculty Award from COEP Tech University (2019) for distinguished contribution",
        "Delivered consultancy projects with 8+ major manufacturing companies including Tata Motors, Bosch, and Thermax",
        "Published 20+ papers in peer-reviewed international journals on operations and supply chain management",
        "Expert committee member for AICTE curriculum development in Operations Management (2018–2020)",
        "Conducted 30+ Faculty Development Programs (FDPs) for 500+ industry professionals across Maharashtra",
        "Successfully guided 3 PhD scholars in Operations and Supply Chain Management",
        "Instrumental in establishing COEP DMS Corporate Relations Cell, connecting students with 50+ companies",
        "Invited speaker at CII Manufacturing Excellence Summits (2017, 2019, 2022)",
        "Co-authored textbook on Supply Chain Management for Indian Businesses (Oxford University Press)",
        "Industry Mentor for NITI Aayog Atal Innovation Mission (AIM) program",
      ],
      coursesTaught: [
        "Operations Research & Quantitative Methods",
        "Supply Chain Management & Logistics",
        "Project Management",
        "Six Sigma & Total Quality Management",
        "Manufacturing Strategy",
        "Operations Strategy",
      ],
    },
  },
  {
    id: 3,
    name: "Dr. Shilpa Kankonkar",
    designation: "Assistant Professor",
    type: "assistant",
    email: "shilpak.mngmt@coeptech.ac.in",
    phone: "020-25507860",
    specialization:
      "Marketing Management, Consumer Behavior, Strategic Management, HR Analytics",
    bio: "Researcher and educator specializing in marketing and consumer behavior. Her work bridges theoretical frameworks with real-world marketing challenges. TEDx speaker and champion of diversity in management education.",
    photo:
      "/assets/dr._shilpa_kankonkar-019dbd9f-1bb4-7716-8ea8-225a82ea7777.jpg",
    profile: {
      profileType: "special",
      education: [
        {
          degree: "PhD in Human Resource Management",
          institution: "SNDT Women's University, Mumbai",
          year: "2015",
        },
        {
          degree: "MBA (HR & Systems)",
          institution: "Savitribai Phule Pune University",
          year: "2007",
        },
        {
          degree: "B.Sc. (Statistics)",
          institution: "Fergusson College, Pune",
          year: "2005",
        },
      ],
      experience: [
        {
          role: "Assistant Professor",
          organization: "COEP Technological University, DMS",
          duration: "2016 – Present",
        },
        {
          role: "HR Business Partner",
          organization: "Wipro Technologies, Pune",
          duration: "2012 – 2016",
        },
        {
          role: "Senior HR Executive",
          organization: "Infosys BPO, Pune",
          duration: "2008 – 2012",
        },
        {
          role: "HR Trainee",
          organization: "Symbiosis Centre for Management & HRD",
          duration: "2007 – 2008",
        },
      ],
      researchInterests: [
        "Organizational Behavior & Culture",
        "HR Analytics & People Data Science",
        "Leadership Development & Coaching",
        "Diversity, Equity & Inclusion (DEI) in the workplace",
        "Consumer Behavior & Digital Marketing",
        "Strategic Human Resource Management",
      ],
      achievements: [
        "Best Research Paper Award at National HRM Conference, New Delhi (2021)",
        "Published 18+ research papers in Scopus and Web of Science indexed journals",
        "Certified in Design Thinking (IDEO) and Agile HR from SHRM",
        "Invited TEDx Speaker at TEDxPune (2022) on The Future of Work: Humans in the Age of AI",
        "Co-founded Women in Management (WiM) cell at COEP DMS supporting women leaders",
        "Visiting Faculty at FORE School of Management, New Delhi for Leadership & OB courses",
        "Recipient of Young Researcher of the Year award from Pune University Academic Council (2018)",
        "Principal Investigator for ICSSR-funded study on Women Leadership in Manufacturing SMEs",
        "Developed customized L&D programs for Bajaj Auto, KPIT Technologies, and Persistent Systems",
        "Member of HR Analytics Special Interest Group of National HRD Network",
      ],
      coursesTaught: [
        "Human Resource Management",
        "Organizational Behavior",
        "Leadership & Change Management",
        "Marketing Management",
        "Consumer Behavior",
        "HR Analytics",
      ],
    },
  },
  {
    id: 4,
    name: "Mr. Kanad Deshmukh",
    designation: "Assistant Professor",
    type: "assistant",
    email: "deshmukhk.mngmt@coeptech.ac.in",
    specialization:
      "Financial Analysis, Valuation, US Equity & Derivative Analysis",
    bio: "MBA Finance with 15+ years of industry experience as a US Equity & Derivative Analyst. Brings a unique blend of Wall Street expertise and academic rigor to financial management education.",
    photo:
      "/assets/mr._kanad_deshmukh-019dbd9f-1c0a-7286-b3b8-7bb4d16746ce.jpg",
    profile: {
      profileType: "basic",
      education: [
        {
          degree: "MBA (Finance)",
          institution: "Symbiosis Institute of Business Management, Pune",
          year: "2006",
        },
        {
          degree: "B.E. (Electronics)",
          institution: "Pune University",
          year: "2004",
        },
      ],
      experience: [
        {
          role: "Assistant Professor",
          organization: "COEP Technological University, DMS",
          duration: "2018 – Present",
        },
        {
          role: "US Equity & Derivatives Analyst",
          organization: "HSBC Global Research, Pune",
          duration: "2010 – 2018",
        },
        {
          role: "Financial Analyst",
          organization: "Deutsche Bank AG, Mumbai",
          duration: "2006 – 2010",
        },
      ],
      researchInterests: [
        "Equity Valuation & Capital Markets",
        "Financial Derivatives & Risk Management",
        "Behavioral Finance & Investor Psychology",
      ],
      achievements: [
        "CFA (Chartered Financial Analyst) charterholder — all three levels cleared",
        "Published research on Indian derivative markets in peer-reviewed finance journals",
        "Developed an award-winning equity valuation model used by institutional investors",
        "Guest lecturer at IIM Indore and XLRI Jamshedpur for Finance electives",
      ],
      coursesTaught: [
        "Financial Management",
        "Investment Analysis & Portfolio Management",
        "Derivatives & Risk Management",
      ],
    },
  },
  {
    id: 5,
    name: "Mrs. Sanchita Thanedar-Satalkar",
    designation: "Assistant Professor",
    type: "assistant",
    email: "thanedars.mngmt@coeptech.ac.in",
    phone: "020-25507872",
    specialization:
      "Human Resources, Talent Acquisition, Training & Development, Learning Design",
    bio: "MBA HR specialist with prior experience at Symbiosis Institute of Business Management. Expert in talent acquisition and leadership development programs, bringing industry best practices to HR education at COEP DMS.",
    photo:
      "/assets/mrs._saanchita_thanedar-_satalkar-019dbd9f-1c59-700e-88af-79039af0a523.jpg",
    profile: {
      profileType: "basic",
      education: [
        {
          degree: "MBA (Human Resources)",
          institution: "Symbiosis Institute of Business Management, Pune",
          year: "2008",
        },
        {
          degree: "B.A. (Psychology)",
          institution: "Fergusson College, Pune",
          year: "2006",
        },
      ],
      experience: [
        {
          role: "Assistant Professor",
          organization: "COEP Technological University, DMS",
          duration: "2019 – Present",
        },
        {
          role: "HR Manager – Talent Acquisition",
          organization: "Symbiosis International University",
          duration: "2013 – 2019",
        },
        {
          role: "HR Executive",
          organization: "Cognizant Technology Solutions, Pune",
          duration: "2008 – 2013",
        },
      ],
      researchInterests: [
        "Talent Acquisition & Employer Branding",
        "Learning & Development Strategy",
        "Work-Life Balance & Employee Well-being",
      ],
      achievements: [
        "Designed and delivered POSH certification programs for 20+ organizations",
        "Published papers on talent retention strategies in IT sector in NHRD Network Journal",
        "Certified in Neuro-Linguistic Programming (NLP) for coaching and leadership development",
        "Conducted campus recruitment drives resulting in 95%+ placement for COEP DMS batches",
      ],
      coursesTaught: [
        "Talent Acquisition & Staffing",
        "Training & Development",
        "Compensation & Benefits Management",
      ],
    },
  },
  {
    id: 6,
    name: "Dr. Sidra Tariq",
    designation: "Faculty",
    type: "associate",
    specialization:
      "Big Data, Consumer Behavior, Marketing Analytics, Research Methodology",
    bio: "PhD in Business Administration. Teaches Research Methodology, Material Management, and Logistics. Research explores the intersection of big data and consumer decision-making in digital environments.",
    photo: "/assets/dr._sidra_tariq-019dbd9f-1875-72de-a5be-22bf0f930a64.jpg",
    profile: {
      profileType: "basic",
      education: [
        {
          degree: "PhD in Business Administration",
          institution: "Aligarh Muslim University (AMU)",
          year: "2016",
        },
        {
          degree: "MBA (Marketing & Operations)",
          institution: "AMU, Aligarh",
          year: "2009",
        },
      ],
      experience: [
        {
          role: "Faculty",
          organization: "COEP Technological University, DMS",
          duration: "2018 – Present",
        },
        {
          role: "Research Associate",
          organization: "AMU Centre for Management Studies",
          duration: "2013 – 2018",
        },
      ],
      researchInterests: [
        "Big Data Analytics & Consumer Behavior",
        "Marketing Analytics & Digital Consumer Insights",
        "Research Methodology & Data Science",
      ],
      achievements: [
        "Published 12+ research papers in national and international journals on consumer analytics",
        "Recipient of Junior Research Fellowship (JRF) from UGC for doctoral research",
        "Delivered guest lectures on Marketing Analytics at universities across Maharashtra",
        "Active reviewer for Journal of Marketing Research and Indian Journal of Marketing",
      ],
      coursesTaught: [
        "Research Methodology",
        "Marketing Analytics",
        "Material Management & Logistics",
      ],
    },
  },
  {
    id: 7,
    name: "Mrs. Suvarna Gavade",
    designation: "Faculty",
    type: "associate",
    specialization:
      "Finance, Operations Management, Banking & Financial Services",
    bio: "A seasoned finance and operations professional who brings practical corporate experience to the classroom, helping students understand real-world applications of financial and operational management.",
    photo:
      "/assets/mrs._suvarna_gavade-019dbd9f-177d-740c-836a-989b294dfe7f.jpg",
    profile: {
      profileType: "basic",
      education: [
        {
          degree: "MBA (Finance & Banking)",
          institution: "Savitribai Phule Pune University",
          year: "2003",
        },
        {
          degree: "B.Com",
          institution: "Shivaji University, Kolhapur",
          year: "2001",
        },
      ],
      experience: [
        {
          role: "Faculty",
          organization: "COEP Technological University, DMS",
          duration: "2017 – Present",
        },
        {
          role: "Branch Manager",
          organization: "Bank of Maharashtra, Pune",
          duration: "2010 – 2017",
        },
        {
          role: "Finance Executive",
          organization: "Tata Motors Finance Ltd.",
          duration: "2003 – 2010",
        },
      ],
      researchInterests: [
        "Financial Services & Banking Innovation",
        "Working Capital Management",
        "Financial Inclusion & Rural Finance",
      ],
      achievements: [
        "15+ years of combined industry and academic experience in finance and banking",
        "Published research on Financial Inclusion in NABARD-sponsored journals",
        "Certified in Risk Management from Indian Institute of Banking and Finance (IIBF)",
        "Organized annual Finance Conclave at COEP DMS attracting CFOs from top Pune companies",
      ],
      coursesTaught: [
        "Banking & Financial Services",
        "Working Capital Management",
        "Operations Management",
      ],
    },
  },
  {
    id: 8,
    name: "Ms. Prema Mani Yadav",
    designation: "Faculty",
    type: "associate",
    email: "pmy.mngmt@coeptech.ac.in",
    specialization:
      "Financial Accounting, Management Accounting, Research Methods",
    bio: "MBA Finance, UGC-NET qualified, and PhD scholar. Teaches Financial Accounting and Management with a focus on developing analytical thinking and quantitative problem-solving skills.",
    photo:
      "/assets/ms._prema_mani_yadav-019dbd9f-162e-729d-bd58-693a96ae9cc5.jpg",
    profile: {
      profileType: "basic",
      education: [
        {
          degree: "PhD (Pursuing)",
          institution: "GTU (Gujarat Technological University)",
          year: "2026 (Expected)",
        },
        {
          degree: "MBA (Finance)",
          institution: "Pune University",
          year: "2014",
        },
        {
          degree: "B.Com (Honours)",
          institution: "Pune University",
          year: "2012",
        },
      ],
      experience: [
        {
          role: "Faculty",
          organization: "COEP Technological University, DMS",
          duration: "2019 – Present",
        },
        {
          role: "Accounts Executive",
          organization: "Piramal Enterprises Ltd., Mumbai",
          duration: "2014 – 2019",
        },
      ],
      researchInterests: [
        "Financial Accounting Standards & IFRS Convergence",
        "Management Accounting & Costing Innovations",
        "Corporate Sustainability Reporting",
      ],
      achievements: [
        "UGC-NET qualified in Management (2015) — ranks in top 5% nationally",
        "Research paper on Indian GAAP vs IFRS published in SSRN Working Papers series",
        "Delivered accounting workshops for CA intermediate students and industry professionals",
        "Consistently rated among top faculty in student satisfaction surveys at DMS",
      ],
      coursesTaught: [
        "Financial Accounting",
        "Management Accounting",
        "Taxation & Corporate Law",
      ],
    },
  },
  {
    id: 9,
    name: "Dr. Sonal Mahajan",
    designation: "Faculty",
    type: "associate",
    specialization:
      "Strategic Management, Organizational Behavior, Corporate Strategy",
    bio: "A seasoned management and strategy expert with strong academic credentials and consulting background. Brings strategic thinking and organizational insights to the curriculum, preparing students for leadership roles.",
    photo: "/assets/dr._sonal_mahajan-019dbd9f-186e-77f9-9a7b-5c218d01f8c7.jpg",
    profile: {
      profileType: "basic",
      education: [
        {
          degree: "PhD in Strategic Management",
          institution: "University of Mumbai",
          year: "2014",
        },
        {
          degree: "MBA (Strategy & Consulting)",
          institution: "S.P. Jain Institute of Management & Research, Mumbai",
          year: "2006",
        },
      ],
      experience: [
        {
          role: "Faculty",
          organization: "COEP Technological University, DMS",
          duration: "2016 – Present",
        },
        {
          role: "Management Consultant",
          organization: "KPMG Advisory Services, Mumbai",
          duration: "2010 – 2016",
        },
        {
          role: "Strategy Analyst",
          organization: "Accenture Strategy, Pune",
          duration: "2006 – 2010",
        },
      ],
      researchInterests: [
        "Competitive Strategy & Business Model Innovation",
        "Organizational Behavior & Institutional Theory",
        "Corporate Restructuring & Mergers & Acquisitions",
      ],
      achievements: [
        "Published 15+ papers in ABDC-ranked strategy and management journals",
        "Delivered executive education programs on Strategy for senior leaders at KPMG and Deloitte",
        "Invited panelist at NASSCOM Leadership Forum (2020) on Digital Transformation Strategies",
        "Case study on Pune's Manufacturing Transformation selected for Harvard Business School repository",
      ],
      coursesTaught: [
        "Strategic Management",
        "Organizational Behavior",
        "Corporate Strategy & Restructuring",
      ],
    },
  },
  {
    id: 10,
    name: "Mr. Pradeep Deshpande",
    designation: "Faculty",
    type: "associate",
    email: "psd.mngmt@coeptech.ac.in",
    phone: "020-25507875",
    specialization:
      "Operations Management, Supply Chain, Greenfield Projects, World Class Manufacturing",
    bio: "Management professional with mechanical engineering background and 30+ years of manufacturing industry experience. Expert in Greenfield projects, World Class Manufacturing, EHS systems, and supply chain optimization.",
    photo:
      "/assets/mr._pradeep_deshpande-019dbd9f-17e9-76ac-94cd-64761b683067.jpg",
    profile: {
      profileType: "basic",
      education: [
        {
          degree: "MMS (Operations Management)",
          institution: "Savitribai Phule Pune University",
          year: "1993",
        },
        {
          degree: "B.E. (Production Engineering)",
          institution: "Shivaji University, Kolhapur",
          year: "1991",
        },
      ],
      experience: [
        {
          role: "Faculty",
          organization: "COEP Technological University, DMS",
          duration: "2018 – Present",
        },
        {
          role: "Senior Manager – Projects & Operations",
          organization: "Stellantis (FCA-Tata JV), Pune",
          duration: "2005 – 2018",
        },
        {
          role: "Operations Manager",
          organization: "Kirloskar Ferrous Industries Ltd. (ISMT)",
          duration: "1993 – 2005",
        },
      ],
      researchInterests: [
        "World Class Manufacturing & Lean Systems",
        "Supply Chain Modelling & Digital Manufacturing",
        "Infrastructure Project Management",
      ],
      achievements: [
        "30+ years of industry experience across Automobile and Steel manufacturing sectors",
        "Led Greenfield plant setup projects from inception to commissioning for Stellantis India",
        "Implemented World Class Manufacturing (WCM) program achieving Silver Pillar status",
        "Guest lecturer at SIBM, Bharati Vidyapeeth, and Symbiosis for Operations Management",
      ],
      coursesTaught: [
        "Operations Management",
        "Supply Chain Management & Design",
        "Lean Six Sigma & Quality Management",
      ],
    },
  },
];

// ─── Program Phases ───────────────────────────────────────────────────────────

export const MBA_GM_PHASES: ProgramPhase[] = [
  {
    phase: 1,
    title: "Foundation",
    subtitle: "Building Core Competencies",
    semester: "Semester I",
    subjects: [
      "Marketing Management",
      "Human Resource Management",
      "Operations Management",
      "Managerial Accounting",
      "Financial Management",
      "Business Statistics",
      "Business Communication",
      "Organizational Behavior",
    ],
    color: "#1A2B5F",
  },
  {
    phase: 2,
    title: "Functional Core",
    subtitle: "Developing Analytical Skills",
    semester: "Semester II",
    subjects: [
      "Strategic Management",
      "Management Information Systems",
      "Managerial Economics",
      "Operations Research",
      "Research Methodology",
      "Business Law & Corporate Governance",
      "Entrepreneurship & Innovation",
      "Summer Project Preparation",
    ],
    color: "#C9A84C",
  },
  {
    phase: 3,
    title: "Specialization",
    subtitle: "Domain Expertise",
    semester: "Semester III + Internship",
    subjects: [
      "Chosen Specialization Electives",
      "Marketing / Finance / HR / Operations",
      "Industry Project (Summer Internship)",
      "Advanced Domain Subjects",
    ],
    color: "#F07021",
  },
  {
    phase: 4,
    title: "Dissertation",
    subtitle: "Leadership & Capstone",
    semester: "Semester IV",
    subjects: [
      "Advanced Electives",
      "Dissertation / Project Work",
      "Industry Immersion",
      "Capstone Project",
    ],
    color: "#1A2B5F",
  },
];

export const MBA_BA_PHASES: ProgramPhase[] = [
  {
    phase: 1,
    title: "Foundation",
    subtitle: "Data & Business Fundamentals",
    semester: "Semester I",
    subjects: [
      "Introduction to Business Analytics",
      "Marketing Management",
      "Financial Management",
      "Business Statistics",
      "Organizational Behavior",
      "Business Communication",
      "Operations Management",
      "Managerial Accounting",
    ],
    color: "#1A2B5F",
  },
  {
    phase: 2,
    title: "Analytics Core",
    subtitle: "Methods & Tools",
    semester: "Semester II",
    subjects: [
      "Statistical Methods for Analytics",
      "Data Visualization (Power BI / Tableau)",
      "Machine Learning Fundamentals",
      "Database Management & SQL",
      "Research Methodology",
      "Predictive Analytics",
      "Management Information Systems",
      "Business Intelligence",
    ],
    color: "#C9A84C",
  },
  {
    phase: 3,
    title: "Advanced Analytics",
    subtitle: "Applied Data Science",
    semester: "Semester III + Internship",
    subjects: [
      "Big Data Analytics",
      "Deep Learning & AI Applications",
      "HR Analytics / Marketing Analytics",
      "Financial Analytics",
      "Industry Analytics Project",
    ],
    color: "#F07021",
  },
  {
    phase: 4,
    title: "Dissertation",
    subtitle: "Strategic Analytics Leadership",
    semester: "Semester IV",
    subjects: [
      "Strategic Decision Making",
      "Analytics Consulting",
      "Industry Immersion Project",
      "Capstone Analytics Dissertation",
    ],
    color: "#1A2B5F",
  },
];

// ─── Our Programs ─────────────────────────────────────────────────────────────

export const PROGRAMS: ProgramTab[] = [
  {
    id: "finance",
    label: "Finance",
    icon: "💹",
    description:
      "Master the language of business with our Finance specialization. Develop expertise in corporate finance, investment analysis, and financial modeling — skills essential for leadership roles in India's growing financial sector.",
    keyCourses: [
      "Corporate Finance",
      "Investment Analysis",
      "Financial Modelling",
      "Risk Management",
      "Financial Markets",
    ],
    learningOutcomes: [
      "Analyze complex financial statements and make data-driven investment decisions",
      "Build financial models for valuation, budgeting, and scenario analysis",
      "Understand Indian and global capital markets, derivatives, and risk instruments",
    ],
    careerPaths: [
      "Investment Banking",
      "CFO / VP Finance",
      "Equity Research Analyst",
      "Financial Controller",
      "Risk Manager",
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: "⚙️",
    description:
      "Learn to design, optimize, and manage operations at scale. From lean manufacturing to global supply chains, our Operations specialization prepares you to drive efficiency and lead operational transformation.",
    keyCourses: [
      "Supply Chain Management",
      "Process Optimization",
      "Quality Management",
      "Operations Strategy",
      "Project Management",
    ],
    learningOutcomes: [
      "Design end-to-end supply chain frameworks and logistics networks",
      "Apply Six Sigma, Lean, and TQM methodologies to reduce waste and improve quality",
      "Manage large-scale projects using PMP-aligned methodologies",
    ],
    careerPaths: [
      "Operations Manager",
      "Supply Chain Director",
      "COO",
      "Project Manager",
      "Logistics Head",
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: "📈",
    description:
      "Navigate the dynamic world of marketing in the digital age. Our Marketing specialization combines brand strategy, consumer psychology, and data-driven marketing to shape the next generation of marketing leaders.",
    keyCourses: [
      "Digital Marketing",
      "Brand Management",
      "Consumer Behavior",
      "Marketing Analytics",
      "B2B Marketing",
    ],
    learningOutcomes: [
      "Develop integrated marketing campaigns across digital and traditional channels",
      "Leverage marketing analytics to measure ROI and optimize spend",
      "Build strong brand equity through strategic positioning and storytelling",
    ],
    careerPaths: [
      "Brand Manager",
      "Marketing Director",
      "CMO",
      "Digital Marketing Head",
      "Product Marketing Lead",
    ],
  },
  {
    id: "hr",
    label: "Human Resources",
    icon: "👥",
    description:
      "People are an organization's greatest asset. Our HR specialization equips you with the tools to attract top talent, develop high-performing teams, and build cultures that drive organizational success.",
    keyCourses: [
      "Talent Acquisition",
      "Performance Management",
      "HR Analytics",
      "Leadership Development",
      "Compensation & Benefits",
    ],
    learningOutcomes: [
      "Design talent management systems aligned with business strategy",
      "Use HR analytics to make evidence-based decisions on workforce planning",
      "Lead organizational development and change management initiatives",
    ],
    careerPaths: [
      "HR Manager",
      "CHRO",
      "Talent Development Head",
      "OD Consultant",
      "People Analytics Lead",
    ],
  },
  {
    id: "analytics",
    label: "Business Analytics",
    icon: "🔮",
    description:
      "The future of business is data-driven. Our Business Analytics specialization — unique to COEP DMS — trains you in statistical methods, machine learning, and business intelligence tools to unlock insights that transform organizations.",
    keyCourses: [
      "Data Science & Machine Learning",
      "Power BI & Tableau",
      "Statistical Methods",
      "Predictive Analytics",
      "Big Data Frameworks",
    ],
    learningOutcomes: [
      "Build predictive models using Python, R, and machine learning algorithms",
      "Create executive-level dashboards and data visualizations in Power BI and Tableau",
      "Apply statistical hypothesis testing and regression analysis to business problems",
    ],
    careerPaths: [
      "Data Analyst",
      "Business Intelligence Lead",
      "Analytics Manager",
      "Chief Data Officer",
      "AI/ML Product Manager",
    ],
  },
];

// ─── DMS Stats ────────────────────────────────────────────────────────────────

export const DMS_STATS: DmsStat[] = [
  {
    value: "170+",
    label: "Years of Legacy",
    description:
      "COEP established in 1854, one of Asia's oldest engineering institutions",
  },
  {
    value: "120",
    label: "MBA Students",
    description:
      "Two batches across MBA General Management and MBA Business Analytics",
  },
  {
    value: "10",
    label: "Expert Faculty",
    description:
      "Blend of academia and industry practitioners with deep domain expertise",
  },
  {
    value: "80%",
    label: "Placement Rate",
    description: "Strong industry connect ensuring meaningful career outcomes",
  },
  {
    value: "2",
    label: "MBA Programs",
    description:
      "MBA (General Management) and MBA (Business Analytics) — 60 seats each",
  },
  {
    value: "Top 50",
    label: "B-School Ranking",
    description:
      "Recognized among top B-Schools in Maharashtra by leading education surveys",
  },
];

// ─── Recruiters / Placement Companies ────────────────────────────────────────

export interface Recruiter {
  name: string;
  sector: string;
}

export const RECRUITERS: Recruiter[] = [
  { name: "TATA Projects", sector: "Infrastructure" },
  { name: "TCS", sector: "IT Services" },
  { name: "HDFC Life", sector: "Insurance" },
  { name: "KPMG", sector: "Consulting" },
  { name: "Anand Rathi", sector: "Finance" },
  { name: "Eaton Co.", sector: "Manufacturing" },
  { name: "Cosmos Bank", sector: "Banking" },
  { name: "LIC", sector: "Insurance" },
  { name: "Dheya Career Mentor", sector: "Education" },
  { name: "Markets and Markets", sector: "Research" },
  { name: "Wall Street Trading Academy", sector: "Finance" },
  { name: "Arunodhay Co.", sector: "FMCG" },
  { name: "AAI-AERO", sector: "Aviation" },
  { name: "Octarange Technologies", sector: "Technology" },
  { name: "Spry Athletica", sector: "Sports" },
  { name: "RS Consultants", sector: "Consulting" },
  { name: "REX Fuels", sector: "Energy" },
  { name: "Sugar Wallet", sector: "FinTech" },
];
