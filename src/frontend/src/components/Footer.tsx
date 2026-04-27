import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const quickLinks = [
  { label: "Contact Us", href: "#contact" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Disclaimer", href: "#disclaimer" },
  { label: "Navigate", href: "#navigate" },
  { label: "COEP History", href: "#history" },
];

const academicLinks = [
  { label: "About University", href: "#about" },
  { label: "Admissions", href: "#admissions" },
  { label: "Departments", href: "#departments" },
  { label: "Research", href: "#research" },
];

const socialLinks = [
  {
    Icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/coeptech",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/school/coep-technological-university",
  },
  { Icon: Twitter, label: "Twitter", href: "https://twitter.com/coep_pune" },
  {
    Icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/coep_pune",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: "#081E5C", color: "#ffffff" }}
      data-ocid="footer.section"
    >
      {/* Thin gold accent line at top */}
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(to right, #E8C42A 0%, rgba(232,196,42,0.4) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Main footer grid */}
      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Column 1: Brand ── */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/assets/coep-logo-new.png"
                alt="COEP Logo"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/coep-crest.png";
                }}
              />
              <div>
                <div
                  className="font-display font-bold text-sm leading-tight tracking-wide text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  COEP TECHNOLOGICAL
                </div>
                <div
                  className="font-body text-[10px] uppercase tracking-widest"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  UNIVERSITY
                </div>
              </div>
            </div>

            <p
              className="font-body text-sm leading-relaxed mb-6 italic"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              A Unitary Public University of Government of Maharashtra
            </p>

            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin
                  size={13}
                  style={{ color: "#E8C42A" }}
                  className="shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p
                  className="text-sm font-body leading-relaxed"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  COEP Technological University,
                  <br />
                  Wellesely Rd, Shivajinagar,
                  <br />
                  Pune – 411 005. Maharashtra, INDIA.
                </p>
              </div>
              <a
                href="tel:+912025507000"
                className="flex items-center gap-2.5 text-sm font-body transition-all duration-200"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#E8C42A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.6)";
                }}
                data-ocid="footer.phone_link"
              >
                <Phone
                  size={13}
                  style={{ color: "#E8C42A" }}
                  aria-hidden="true"
                />
                +91 20 2550 7000
              </a>
              <a
                href="mailto:registrar@coeptech.ac.in"
                className="flex items-center gap-2.5 text-sm font-body transition-all duration-200"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#E8C42A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.6)";
                }}
                data-ocid="footer.email_link"
              >
                <Mail
                  size={13}
                  style={{ color: "#E8C42A" }}
                  aria-hidden="true"
                />
                registrar@coeptech.ac.in
              </a>
            </address>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <h4
              className="font-display font-bold text-xs uppercase tracking-[0.18em] mb-5 pb-3"
              style={{
                color: "#E8C42A",
                borderBottom: "1px solid rgba(232,196,42,0.2)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-2 text-sm font-body transition-all duration-200 group"
                    style={{
                      color: "rgba(255,255,255,0.62)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#ffffff";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft =
                        "4px";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.62)";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft =
                        "0px";
                    }}
                    data-ocid={`footer.quick_link.${label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    <ChevronRight
                      size={11}
                      style={{ color: "#E8C42A" }}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Academics ── */}
          <div>
            <h4
              className="font-display font-bold text-xs uppercase tracking-[0.18em] mb-5 pb-3"
              style={{
                color: "#E8C42A",
                borderBottom: "1px solid rgba(232,196,42,0.2)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Academics
            </h4>
            <ul className="space-y-2.5">
              {academicLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-2 text-sm font-body transition-all duration-200 group"
                    style={{
                      color: "rgba(255,255,255,0.62)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#ffffff";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft =
                        "4px";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.62)";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft =
                        "0px";
                    }}
                    data-ocid={`footer.academic_link.${label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    <ChevronRight
                      size={11}
                      style={{ color: "#E8C42A" }}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Connect ── */}
          <div>
            <h4
              className="font-display font-bold text-xs uppercase tracking-[0.18em] mb-5 pb-3"
              style={{
                color: "#E8C42A",
                borderBottom: "1px solid rgba(232,196,42,0.2)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Connect With Us
            </h4>
            <p
              className="font-body text-xs uppercase tracking-wider mb-4"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Follow us
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.55)",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "#E8C42A";
                    el.style.borderColor = "#E8C42A";
                    el.style.background = "rgba(232,196,42,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "rgba(255,255,255,0.55)";
                    el.style.borderColor = "rgba(255,255,255,0.18)";
                    el.style.background = "transparent";
                  }}
                  data-ocid={`footer.${label.toLowerCase()}_link`}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Est. 1854 badge */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="h-4 w-1"
                style={{ background: "#E8C42A", borderRadius: "1px" }}
              />
              <span
                className="font-display font-bold text-xs uppercase tracking-wider"
                style={{
                  color: "#E8C42A",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Est. 1854
              </span>
            </div>

            <p
              className="font-body text-xs"
              style={{
                color: "rgba(255,255,255,0.38)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              © {year} COEP Technological University.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <div className="container max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs font-body text-center sm:text-left"
            style={{
              color: "rgba(255,255,255,0.38)",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            © {year} COEP Technological University. All rights reserved.
          </p>
          <div
            className="flex items-center gap-1 text-xs font-body"
            style={{
              color: "rgba(255,255,255,0.38)",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            <span>Built with love using</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "coeptech.ac.in")}`}
              className="font-display font-semibold hover:underline ml-1"
              style={{ color: "#E8C42A" }}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.caffeine_link"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
