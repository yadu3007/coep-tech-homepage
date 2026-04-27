import { ChevronDown, ChevronRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "../data/homepage";
import type { NavItem } from "../types";

// ─── Font size control ────────────────────────────────────────────────────────
let currentFontSize = 100;
function setBodyFontSize(pct: number) {
  currentFontSize = Math.min(120, Math.max(80, pct));
  document.documentElement.style.fontSize = `${currentFontSize}%`;
}

// ─── Utility Row ──────────────────────────────────────────────────────────────
const utilityLinks = [
  { label: "Alumni", href: "#alumni" },
  { label: "Tenders", href: "#tenders" },
  { label: "Notices / Circulars", href: "#notices" },
  { label: "Contact Us", href: "#contact" },
];

function UtilityRow() {
  return (
    <div
      className="border-b h-9 hidden md:flex items-center"
      style={{ background: "#0F3499", borderColor: "rgba(255,255,255,0.1)" }}
    >
      <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: contact info */}
        <div
          className="flex items-center gap-1.5 text-[11px] font-body"
          style={{
            color: "rgba(255,255,255,0.65)",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          <Phone size={10} style={{ color: "rgba(255,255,255,0.5)" }} />
          <span>+91 20 2550 7000</span>
          <span className="px-1" style={{ color: "rgba(255,255,255,0.2)" }}>
            |
          </span>
          <span>registrar@coeptech.ac.in</span>
        </div>

        {/* Right: utility links + font controls */}
        <div className="flex items-center gap-0">
          {utilityLinks.map((link, idx) => (
            <span key={link.label} className="flex items-center">
              <a
                href={link.href}
                className="text-[11px] font-body transition-all duration-200 px-3 py-1 whitespace-nowrap"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#E8C42A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.7)";
                }}
                data-ocid={`header.utility.${idx + 1}`}
              >
                {link.label}
              </a>
              <span
                className="text-[10px] select-none"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                |
              </span>
            </span>
          ))}

          <span
            className="text-[10px] select-none px-1"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            |
          </span>

          {/* Font size controls */}
          <div
            className="flex items-center gap-0.5 pl-2"
            aria-label="Font size controls"
          >
            <button
              type="button"
              onClick={() => setBodyFontSize(currentFontSize + 10)}
              className="text-[11px] font-display font-bold transition-all duration-200 px-1.5 py-0.5 leading-none"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#E8C42A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.65)";
              }}
              aria-label="Increase font size"
              data-ocid="header.font_increase_button"
            >
              +A
            </button>
            <button
              type="button"
              onClick={() => setBodyFontSize(100)}
              className="text-[11px] font-display font-medium transition-all duration-200 px-1.5 py-0.5 leading-none"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#E8C42A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.65)";
              }}
              aria-label="Reset font size"
              data-ocid="header.font_reset_button"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setBodyFontSize(currentFontSize - 10)}
              className="text-[11px] font-display font-medium transition-all duration-200 px-1.5 py-0.5 leading-none"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#E8C42A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.65)";
              }}
              aria-label="Decrease font size"
              data-ocid="header.font_decrease_button"
            >
              -A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Nav Item with dropdown ──────────────────────────────────────────
function DesktopNavItem({
  item,
  isActive,
}: { item: NavItem; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleTabClick = () => {
    if (item.href && item.href !== "#") {
      window.location.hash = item.href.replace(/^#/, "");
    }
  };

  return (
    <div
      ref={ref}
      className="relative h-full flex items-center"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={handleTabClick}
        className="h-full flex items-center gap-1 px-4 text-[13px] font-body font-semibold uppercase tracking-wide whitespace-nowrap transition-all duration-200 relative group"
        style={{
          color: isActive ? "#E8C42A" : "rgba(255,255,255,0.88)",
          fontFamily: "'Source Sans 3', sans-serif",
          borderBottom: isActive
            ? "3px solid #E8C42A"
            : "3px solid transparent",
          letterSpacing: "0.06em",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.88)";
          }
        }}
        aria-expanded={open}
        aria-haspopup={item.children?.length ? "true" : "false"}
        data-ocid={`nav.${item.label.toLowerCase().replace(/[\s&/]+/g, "_")}_button`}
      >
        {item.label}
        {item.children?.length ? (
          <ChevronDown
            size={12}
            className="transition-transform duration-200"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              opacity: 0.7,
            }}
          />
        ) : null}

        {/* Underline hover effect */}
        {!isActive && (
          <span
            className="absolute bottom-0 left-0 right-0 h-[3px] origin-left transition-transform duration-250"
            style={{
              background: "#E8C42A",
              transform: open ? "scaleX(1)" : "scaleX(0)",
            }}
            aria-hidden="true"
          />
        )}
      </button>

      {/* Dropdown */}
      {open && item.children?.length ? (
        <div
          className="absolute top-full left-0 min-w-[220px] py-1.5 shadow-xl z-50 animate-dropdown-enter"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(22,72,200,0.12)",
            borderTop: "2px solid #1648C8",
            borderRadius: "0 0 4px 4px",
            boxShadow:
              "0 16px 48px rgba(15,52,153,0.16), 0 4px 16px rgba(15,52,153,0.08)",
          }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {item.children.map((child) => (
            <a
              key={child.label}
              href={child.href}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-body transition-all duration-150 group/item"
              style={{
                color: "#0F3499",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#1648C8";
                el.style.color = "#ffffff";
                el.style.paddingLeft = "20px";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "#0F3499";
                el.style.paddingLeft = "16px";
              }}
            >
              <ChevronRight
                size={10}
                className="shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150"
                style={{ color: "#E8C42A" }}
              />
              {child.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-[0_4px_32px_rgba(22,72,200,0.28)]" : ""}`}
      style={{ background: "#1648C8" }}
      data-ocid="header.container"
    >
      {/* ── Row 1: Utility Bar ── */}
      <UtilityRow />

      {/* ── Row 2: Logo + University Title ── */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.14)",
          background: "#1648C8",
        }}
      >
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo + University Title Block */}
            <a
              href="#top"
              className="flex items-center gap-4 py-4 shrink-0 group"
              data-ocid="header.logo_link"
            >
              <img
                src="/assets/coep-crest.png"
                alt="COEP Technological University Logo"
                className="h-16 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{
                  filter: "brightness(0) invert(1)",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  display: "block",
                  padding: 0,
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/coep-crest.png";
                }}
              />

              {/* University Title */}
              <div className="leading-tight">
                <div
                  className="font-display font-bold text-white leading-tight"
                  style={{
                    fontSize: "clamp(14px, 2vw, 20px)",
                    letterSpacing: "0.02em",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  COEP Technological University
                </div>
                <div
                  className="font-body text-white/78 leading-tight mt-0.5"
                  style={{
                    fontSize: "clamp(9px, 1.1vw, 12px)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  A Unitary Public University of Government of Maharashtra
                </div>
                <div
                  className="font-body leading-tight"
                  style={{
                    fontSize: "clamp(9px, 1vw, 11px)",
                    color: "rgba(232,196,42,0.9)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  (Formerly College of Engineering Pune)
                </div>
              </div>
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="lg:hidden transition-all duration-200 p-2"
              style={{ color: "rgba(255,255,255,0.85)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              data-ocid="header.mobile_menu_toggle"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 3: Desktop Navigation Tabs ── */}
      <nav
        className="hidden lg:block"
        style={{
          background: "#1648C8",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.08)",
        }}
        aria-label="Main navigation"
      >
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-stretch h-12">
            {navItems.map((item: NavItem) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                isActive={activeNav === item.label}
              />
            ))}

            {/* Apply Now CTA — gold button */}
            <div className="ml-auto flex items-center py-2">
              <a
                href="#admissions"
                className="font-display font-bold text-[11px] uppercase tracking-widest px-5 py-2 transition-all duration-200"
                style={{
                  background: "#E8C42A",
                  color: "#081E5C",
                  borderRadius: "2px",
                  fontFamily: "'Source Sans 3', sans-serif",
                  boxShadow: "0 2px 12px rgba(232,196,42,0.35)",
                  letterSpacing: "0.1em",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "#d4b025";
                  el.style.transform = "translateY(-1px)";
                  el.style.boxShadow = "0 4px 16px rgba(232,196,42,0.45)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "#E8C42A";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 2px 12px rgba(232,196,42,0.35)";
                }}
                data-ocid="header.apply_button"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t animate-fade-in max-h-[80vh] overflow-y-auto"
          style={{ background: "#ffffff", borderColor: "rgba(22,72,200,0.15)" }}
          data-ocid="header.mobile_drawer"
        >
          {/* Mobile utility links */}
          <div
            className="flex flex-wrap gap-x-4 gap-y-1 px-6 py-3 border-b"
            style={{ borderColor: "rgba(22,72,200,0.1)" }}
          >
            {utilityLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-body transition-all duration-200 py-0.5"
                style={{
                  color: "#0F3499",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#1648C8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#0F3499";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <nav
            className="container max-w-7xl mx-auto px-6 py-3 flex flex-col gap-0"
            aria-label="Mobile navigation"
          >
            {navItems.map((item: NavItem) => (
              <div
                key={item.label}
                className="border-b last:border-0"
                style={{ borderColor: "rgba(22,72,200,0.08)" }}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-3 text-[13px] font-display font-semibold transition-all duration-200 uppercase tracking-wide"
                  style={{
                    color:
                      mobileExpanded === item.label ? "#1648C8" : "#0F3499",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                  onClick={() => {
                    if (item.href && item.href !== "#") {
                      window.location.hash = item.href.replace(/^#/, "");
                      setMobileOpen(false);
                    } else {
                      setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label,
                      );
                    }
                  }}
                  aria-expanded={mobileExpanded === item.label}
                  data-ocid={`nav.mobile_${item.label.toLowerCase().replace(/[\s&/]+/g, "_")}_button`}
                >
                  {item.label}
                  {item.children?.length ? (
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200"
                      style={{
                        transform:
                          mobileExpanded === item.label
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        color:
                          mobileExpanded === item.label ? "#1648C8" : "#0F3499",
                      }}
                    />
                  ) : null}
                </button>

                {mobileExpanded === item.label && item.children && (
                  <div className="pb-2 pl-4 flex flex-col gap-0 animate-fade-in">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="flex items-center gap-2 py-2 text-sm font-body transition-all duration-200"
                        style={{
                          color: "#555",
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                        onClick={() => setMobileOpen(false)}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "#1648C8";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color =
                            "#555";
                        }}
                      >
                        <ChevronRight
                          size={11}
                          style={{ color: "#1648C8" }}
                          className="shrink-0"
                        />
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 pb-2">
              <a
                href="#admissions"
                className="block w-full text-center font-display font-bold text-[12px] uppercase tracking-widest px-5 py-3 transition-all duration-200"
                style={{
                  background: "#E8C42A",
                  color: "#081E5C",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#d4b025";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#E8C42A";
                }}
                data-ocid="header.mobile_apply_button"
              >
                Apply Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
