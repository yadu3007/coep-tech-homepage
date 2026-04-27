const quickLinks = [
  { label: "COEP Mail", href: "https://mail.coeptech.ac.in" },
  { label: "MIS Login", href: "https://mis.coeptech.ac.in" },
  { label: "Moodle Login", href: "https://moodle.coeptech.ac.in" },
  { label: "Samarth Login", href: "https://coeptech.samarth.edu.in" },
  { label: "Disclosures", href: "#disclosures" },
  { label: "RTI", href: "#rti" },
];

export function Ribbon() {
  return (
    <div
      className="h-8 flex items-center overflow-hidden border-b"
      style={{ background: "#0F3499", borderColor: "rgba(255,255,255,0.12)" }}
      role="complementary"
      aria-label="Quick links"
      data-ocid="ribbon.bar"
    >
      <div className="flex items-center h-full px-4 gap-0">
        {quickLinks.map((link, idx) => (
          <span key={link.label} className="flex items-center">
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="text-[11px] font-body font-medium whitespace-nowrap px-2.5 py-0.5 transition-all duration-200"
              style={{ color: "rgba(255,255,255,0.82)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#E8C42A";
                (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                  "none";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.82)";
                (e.currentTarget as HTMLAnchorElement).style.textDecoration =
                  "none";
              }}
              data-ocid={`ribbon.quicklink.${idx + 1}`}
            >
              {link.label}
            </a>
            {idx < quickLinks.length - 1 && (
              <span
                className="text-[10px] select-none"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                |
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
