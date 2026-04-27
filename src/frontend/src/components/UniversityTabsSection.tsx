import { ChevronDown } from "lucide-react";
import { useCallback, useRef, useState } from "react";

// ─── Data Structures ───────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

interface NavTab {
  id: string;
  label: string;
  href?: string;
  items: NavItem[];
}

const NAV_TABS: NavTab[] = [
  {
    id: "about",
    label: "About Us",
    href: "#/about-us",
    items: [
      {
        label: "About University",
        children: [
          { label: "Vision and Mission", href: "#/about-us" },
          { label: "University Campus", href: "#/about-us" },
          { label: "University Achievements", href: "#/about-us" },
          { label: "University Geet", href: "#/about-us" },
          { label: "Former Vice Chancellors", href: "#/about-us" },
        ],
      },
      {
        label: "Authorities, Boards and Committees",
        children: [
          {
            label: "Academic Council Committee",
            href: "#/about-us#authorities-committees",
          },
          {
            label: "Board of Examination and Evaluation",
            href: "#/about-us#authorities-committees",
          },
          {
            label: "Board of Knowledge Resource Committee (KRC)",
            href: "#/about-us#authorities-committees",
          },
          {
            label:
              "Board of Research, Innovation, Incubation and Linkages (RIIL) Committee",
            href: "#/about-us#authorities-committees",
          },
          {
            label: "Board of Students' Development Committee",
            href: "#/about-us#authorities-committees",
          },
          {
            label: "Buildings and Works Committee",
            href: "#/about-us#authorities-committees",
          },
          {
            label: "Fee Fixation Committee",
            href: "#/about-us#authorities-committees",
          },
          {
            label: "Finance and Accounts Committee",
            href: "#/about-us#authorities-committees",
          },
          {
            label: "Internal Quality Assurance Committee (IQAC)",
            href: "#/about-us#authorities-committees",
          },
          {
            label: "Purchase Committee",
            href: "#/about-us#authorities-committees",
          },
          {
            label: "Scholarship Committee",
            href: "#/about-us#authorities-committees",
          },
          {
            label: "University Officers and Functionaries",
            href: "#/about-us#authorities-committees",
          },
        ],
      },
      {
        label: "Board of Governance",
        href: "#/about-us#board-of-governance",
      },
    ],
  },
  {
    id: "administration",
    label: "Administration",
    href: "#/administration",
    items: [
      {
        label: "Vice Chancellor",
        children: [{ label: "VC Office", href: "#/administration" }],
      },
      {
        label: "Registrar",
        children: [{ label: "Registrar Office", href: "#/administration" }],
      },
      { label: "Dean", href: "#/administration" },
      {
        label: "Directors",
        children: [{ label: "Director's Office", href: "#/administration" }],
      },
      {
        label: "Associate Deans",
        children: [
          { label: "Associate Dean's Office", href: "#/administration" },
        ],
      },
      { label: "Finance & Accounts Officer", href: "#/administration" },
      { label: "Ombudsperson for Students", href: "#/administration" },
    ],
  },
  {
    id: "admissions",
    label: "Admissions",
    href: "#/admissions",
    items: [
      {
        label: "Undergraduate (B.Tech)",
        children: [
          { label: "First Year Admission", href: "#/admissions" },
          { label: "Direct Second Year Admission", href: "#/admissions" },
          { label: "Working Professionals", href: "#/admissions" },
        ],
      },
      {
        label: "Post Graduate (M. Tech)",
        children: [
          { label: "M. Tech. Admissions 2025-26", href: "#/admissions" },
        ],
      },
      {
        label: "Ph. D.",
        children: [
          {
            label: "Ph.D. Previous Year Admissions Details",
            href: "#/admissions",
          },
        ],
      },
      { label: "International Admissions", href: "#/admissions" },
      {
        label: "Admitted Students for B.Tech & B.Plann. AY 2025-26",
        href: "#/admissions",
      },
      {
        label: "Admitted Students for M.Tech. & M.Plann. AY 2025-26",
        href: "#/admissions",
      },
      { label: "Admitted Students for MBA AY 2025-26", href: "#/admissions" },
      {
        label: "Admitted Students for PG Diploma AY 2025-26",
        href: "#/admissions",
      },
    ],
  },
  {
    id: "academics",
    label: "Academics",
    href: "#/dms",
    items: [
      {
        label: "Schools",
        children: [
          {
            label: "School of Engineering and Technology",
            children: [
              {
                label: "Department of Civil Engineering",
                href: "#/academics/mechanical-engineering",
              },
              {
                label: "Department of Computer Science and Engineering",
                href: "#/academics/mechanical-engineering",
              },
              {
                label: "Department of Electrical Engineering",
                href: "#/academics/mechanical-engineering",
              },
              {
                label:
                  "Department of Electronics and Telecommunication Engineering",
                href: "#/academics/mechanical-engineering",
              },
              {
                label: "Department of Instrumentation & Control Engineering",
                href: "#/academics/mechanical-engineering",
              },
              {
                label:
                  "Department of Manufacturing Engineering & Industrial Management",
                href: "#/academics/mechanical-engineering",
              },
              {
                label: "Department of Mechanical Engineering",
                href: "#/academics/mechanical-engineering",
              },
              {
                label: "Department of Metallurgy and Material Engineering",
                href: "#/academics/mechanical-engineering",
              },
              {
                label: "Department of Planning",
                href: "#/academics/mechanical-engineering",
              },
              {
                label: "Department of Robotics & AI",
                href: "#/academics/mechanical-engineering",
              },
            ],
          },
          {
            label:
              "School of Multidisciplinary Sciences, Humanities and Management Studies",
            children: [
              {
                label: "Department of Applied Sciences & Humanities",
                href: "#/dms",
              },
              { label: "Department of Management Studies", href: "#/dms" },
              { label: "Department of Mathematics", href: "#/dms" },
              { label: "Department of Physics", href: "#/dms" },
            ],
          },
        ],
      },
      {
        label: "Centres of Excellence",
        children: [
          { label: "KPIT Centre of Excellence", href: "#/research" },
          {
            label: "Advance Electronics Manufacturing (AEM)",
            href: "#/research",
          },
          { label: "Electric Vehicle", href: "#/research" },
          { label: "5G and 6G Use Cases", href: "#/research" },
          { label: "Smart Manufacturing", href: "#/research" },
          { label: "Industrial Product Design", href: "#/research" },
          { label: "AR/VR", href: "#/research" },
        ],
      },
      { label: "Skill Development Center", href: "#/campus-life" },
    ],
  },
  {
    id: "research",
    label: "Research",
    href: "#/research",
    items: [
      { label: "Research Projects", href: "#/research" },
      { label: "Research Publications", href: "#/research" },
      { label: "Books Published", href: "#/research" },
      { label: "IPR/Patent", href: "#/research" },
      { label: "Ph.D. Data", href: "#/research" },
      { label: "MOUs", href: "#/research" },
      { label: "Our Collaborations", href: "#/research" },
      {
        label: "COEP's Research & Innovation Park Chikhali",
        href: "#/research",
      },
      {
        label: "Research Innovation, Incubation and Linkages (RIIL)",
        href: "#/research",
      },
    ],
  },
  {
    id: "studentLife",
    label: "Campus Life",
    href: "#/campus-life",
    items: [
      { label: "Campus Life Overview", href: "#/campus-life" },
      { label: "Academic Calendar", href: "#/campus-life" },
      { label: "Anti-Ragging Cell", href: "#/campus-life" },
      { label: "Convocation", href: "#/campus-life" },
      { label: "Downloads", href: "#/campus-life" },
      { label: "E-Resource", href: "#/campus-life" },
      { label: "Gold Medals", href: "#/campus-life" },
      { label: "How do I get a Certificate", href: "#/campus-life" },
      { label: "Internal Committee (IC)", href: "#/campus-life" },
      { label: "Professional Chapter", href: "#/campus-life" },
      { label: "Skill Development Center", href: "#/campus-life" },
      {
        label: "Student Clubs",
        children: [
          { label: "Aarya Raas", href: "#/campus-life" },
          { label: "Abhijaat Newsletter", href: "#/campus-life" },
          { label: "Abhiyanta", href: "#/campus-life" },
          { label: "Arts and Crafts", href: "#/campus-life" },
          { label: "Astronomy Club", href: "#/campus-life" },
          { label: "Boat Club", href: "#/campus-life" },
          { label: "Boat Club Quiz Club", href: "#/campus-life" },
          { label: "Civil Services Aspirant's Club", href: "#/campus-life" },
          { label: "COEP ACM", href: "#/campus-life" },
          { label: "COEP Consulting Club", href: "#/campus-life" },
          { label: "COEP CSI Student Chapter", href: "#/campus-life" },
          { label: "COEP Philomystics", href: "#/campus-life" },
          { label: "COEP Tech E-Cell", href: "#/campus-life" },
          { label: "Pune Startup Fest", href: "#/campus-life" },
          { label: "Team Octane Racing", href: "#/campus-life" },
        ],
      },
      {
        label: "Student Services",
        children: [
          { label: "COEP Counseling Cell", href: "#/campus-life" },
          { label: "COEP's Wellness Centre मित्र", href: "#/campus-life" },
          { label: "Contact Us", href: "#/campus-life" },
          { label: "Earn While Learn Scheme", href: "#/campus-life" },
          { label: "Information", href: "#/campus-life" },
          { label: "Scholarship", href: "#/campus-life" },
          { label: "Scholarship Activities", href: "#/campus-life" },
        ],
      },
    ],
  },
  {
    id: "facilities",
    label: "Facilities",
    href: "#/facilities",
    items: [
      { label: "About", href: "#/facilities" },
      { label: "BIS Academic Dashboard", href: "#/facilities" },
      {
        label: "Facilities Manager",
        children: [
          { label: "General Campus Facilities/Services", href: "#/facilities" },
          { label: "Facility Manager Office Staff", href: "#/facilities" },
          {
            label: "Facilities for Differently-Abled Individuals",
            href: "#/facilities",
          },
        ],
      },
      {
        label: "Knowledge Resource Center",
        children: [
          { label: "Photo Gallery", href: "#/facilities" },
          { label: "Library Peoples", href: "#/facilities" },
          { label: "Library Facilities (Web OPAC)", href: "#/facilities" },
          { label: "E-Resources", href: "#/facilities" },
          { label: "Downloads", href: "#/facilities" },
          { label: "Notices", href: "#/facilities" },
          { label: "Publications", href: "#/facilities" },
          { label: "Circulars", href: "#/facilities" },
        ],
      },
      { label: "National Service Scheme", href: "#/facilities" },
    ],
  },
  {
    id: "placements",
    label: "Placements and Careers",
    href: "#/placements",
    items: [
      { label: "Training and Placement Cell", href: "#/placements" },
      {
        label: "Careers",
        children: [{ label: "Career Archives", href: "#/placements" }],
      },
    ],
  },
];

// ─── Dropdown Item Renderer ────────────────────────────────────────────────────

function DropdownItem({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <a
        href={item.href ?? "#"}
        className="block px-3 py-1.5 text-sm transition-colors duration-150 rounded whitespace-nowrap truncate max-w-xs"
        style={{ paddingLeft: `${0.75 + depth * 0.75}rem`, color: "#1A2B5F" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.color = "#C9A84C";
          el.style.background = "#F5F6FA";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.color = "#1A2B5F";
          el.style.background = "transparent";
        }}
        onClick={(e) => {
          const href = item.href;
          if (!href || href === "#") {
            e.preventDefault();
            return;
          }
          // All our hrefs start with "#/" — let the browser handle them normally
          // The href attribute is already correct (e.g. "#/about-us#board-of-governance")
          // so no special handling needed; just let the default link behavior work.
        }}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="w-full flex items-center justify-between gap-2 px-3 py-1.5 text-sm font-semibold transition-colors duration-150 rounded"
        style={{ paddingLeft: `${0.75 + depth * 0.75}rem`, color: "#1A2B5F" }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = "#C9A84C";
          el.style.background = "#F5F6FA";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = "#1A2B5F";
          el.style.background = "transparent";
        }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="truncate max-w-[200px] text-left">{item.label}</span>
        <ChevronDown
          className="shrink-0 transition-transform duration-200"
          size={13}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div
          className="border-l-2 ml-3 pl-1"
          style={{ borderColor: "#C9A84C" }}
        >
          {item.children!.map((child) => (
            <DropdownItem key={child.label} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Mega Dropdown Panel ───────────────────────────────────────────────────────

function DropdownPanel({
  tab,
  offsetLeft,
}: { tab: NavTab; offsetLeft: number }) {
  const cols = tab.items.length > 6 ? 3 : tab.items.length > 3 ? 2 : 1;
  const itemsPerCol = Math.ceil(tab.items.length / cols);
  const columns: NavItem[][] = [];
  for (let i = 0; i < cols; i++) {
    columns.push(tab.items.slice(i * itemsPerCol, (i + 1) * itemsPerCol));
  }

  return (
    <div
      className="fixed animate-dropdown-enter"
      style={{
        top: "var(--nav-bottom, 100px)",
        left: offsetLeft,
        zIndex: 9999,
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderTop: "2px solid #C9A84C",
        borderRadius: "0 0 6px 6px",
        boxShadow: "0 8px 32px rgba(26,43,95,0.18)",
        minWidth: "220px",
      }}
      role="menu"
      aria-label={`${tab.label} submenu`}
    >
      <div
        className="flex gap-0 p-3"
        style={{ minWidth: cols > 1 ? `${cols * 220}px` : "220px" }}
      >
        {columns.map((col) => (
          <div
            key={col[0]?.label ?? "col"}
            className="flex flex-col gap-0.5 flex-1 px-2 first:pl-0 last:pr-0"
            style={{ borderRight: "1px solid #f0f0f0" }}
          >
            {col.map((item) => (
              <DropdownItem key={item.label} item={item} depth={0} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function UniversityTabsSection() {
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [dropdownOffset, setDropdownOffset] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const handleMouseEnter = useCallback((tabId: string, liEl: HTMLLIElement) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    const rect = liEl.getBoundingClientRect();
    setDropdownOffset(rect.left);
    if (navRef.current) {
      const navBottom = navRef.current.getBoundingClientRect().bottom;
      navRef.current.style.setProperty("--nav-bottom", `${navBottom}px`);
    }
    setOpenTab(tabId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setOpenTab(null);
    }, 120);
  }, []);

  const handleDropdownMouseEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const openTabData = NAV_TABS.find((t) => t.id === openTab) ?? null;

  return (
    <div
      style={{ position: "relative", zIndex: 9999 }}
      data-ocid="university_tabs.section"
    >
      <nav
        ref={navRef}
        className="w-full"
        style={{
          background: "#1A2B5F",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
        aria-label="University Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ul
            className="flex items-stretch overflow-x-auto scrollbar-none"
            role="menubar"
            style={{ gap: 0 }}
          >
            {NAV_TABS.map((tab) => {
              const isOpen = openTab === tab.id;
              return (
                <li
                  key={tab.id}
                  className="shrink-0 flex items-stretch"
                  onMouseEnter={(e) =>
                    handleMouseEnter(tab.id, e.currentTarget)
                  }
                  onMouseLeave={handleMouseLeave}
                  role="presentation"
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 px-4 py-3 text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      color: isOpen ? "#C9A84C" : "rgba(255,255,255,0.82)",
                      borderBottom: isOpen
                        ? "2px solid #C9A84C"
                        : "2px solid transparent",
                      background: isOpen
                        ? "rgba(201,168,76,0.08)"
                        : "transparent",
                      fontFamily: "var(--font-display, sans-serif)",
                      letterSpacing: "0.06em",
                    }}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    data-ocid={`university_tabs.${tab.id}.tab`}
                    onClick={() => {
                      if (tab.href && tab.href !== "#") {
                        window.location.hash = tab.href.replace(/^#/, "");
                        setOpenTab(null);
                      } else {
                        setOpenTab(isOpen ? null : tab.id);
                      }
                    }}
                  >
                    {tab.label}
                    <ChevronDown
                      size={12}
                      className="shrink-0 transition-transform duration-200"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        color: isOpen ? "#C9A84C" : "rgba(255,255,255,0.4)",
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {openTabData && (
        <div
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <DropdownPanel tab={openTabData} offsetLeft={dropdownOffset} />
        </div>
      )}
    </div>
  );
}
