import {
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Mail,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { UniversityTabsSection } from "../components/UniversityTabsSection";
import { FACULTY, type FacultyMember } from "../data/dms";

/* ─────────────────────────────────────────────
   Colour tokens (strict palette)
───────────────────────────────────────────── */
const C = {
  cobalt: "#1648C8",
  deepBlue: "#0F3499",
  midnight: "#081E5C",
  gold: "#E8C42A",
  white: "#ffffff",
  bg: "#F4F6FB",
  cardBg: "#ffffff",
  border: "rgba(22,72,200,0.10)",
  textMuted: "#666",
  textLight: "rgba(255,255,255,0.75)",
  textDim: "rgba(255,255,255,0.55)",
} as const;

/* ─────────────────────────────────────────────
   Keyframes injected once
───────────────────────────────────────────── */
const STYLES = `
@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(-18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes profileFadeIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
`;

function injectStyles() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("faculty-dir-styles")) {
    const s = document.createElement("style");
    s.id = "faculty-dir-styles";
    s.textContent = STYLES;
    document.head.appendChild(s);
  }
}

/* ─────────────────────────────────────────────
   Intersection observer hook
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

/* ─────────────────────────────────────────────
   Designation badge config
───────────────────────────────────────────── */
function designationBadge(type: FacultyMember["type"]) {
  switch (type) {
    case "head":
      return { bg: C.gold, text: C.midnight, label: "Head of Department" };
    case "professor":
      return { bg: C.cobalt, text: C.white, label: "Professor" };
    case "assistant":
      return { bg: C.deepBlue, text: C.white, label: "Assistant Professor" };
    case "associate":
      return { bg: C.deepBlue, text: C.white, label: "Associate Professor" };
    default:
      return { bg: C.cobalt, text: C.white, label: "Faculty" };
  }
}

/* ─────────────────────────────────────────────
   FacultyCard
───────────────────────────────────────────── */
function FacultyCard({
  member,
  index,
  onReadMore,
}: {
  member: FacultyMember;
  index: number;
  onReadMore: (m: FacultyMember) => void;
}) {
  const badge = designationBadge(member.type);
  const { ref, inView } = useInView();
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const initials = member.name
    .split(" ")
    .filter((w) => w.length > 1 && !["Dr.", "Mr.", "Mrs.", "Ms."].includes(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  const delay = `${index * 0.08}s`;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid={`faculty_directory.card.${index + 1}`}
      style={{
        background: C.cardBg,
        borderRadius: "1rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered
          ? "0 16px 48px rgba(22,72,200,0.18), 0 2px 8px rgba(22,72,200,0.08)"
          : "0 4px 20px rgba(0,0,0,0.08)",
        transform: hovered
          ? "translateY(-6px)"
          : inView
            ? "translateY(0)"
            : "translateY(28px)",
        opacity: inView ? 1 : 0,
        transition: `opacity 0.55s ease ${delay}, transform 0.35s cubic-bezier(0.4,0,0.2,1) ${inView ? "0s" : delay}`,
        position: "relative",
      }}
    >
      {/* Top accent band */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${C.cobalt}, ${C.deepBlue})`,
          zIndex: 2,
        }}
      />

      {/* Photo */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "4/3",
          flexShrink: 0,
        }}
      >
        {imgError ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${C.midnight}, ${C.cobalt})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "3rem",
                color: C.gold,
                letterSpacing: "0.05em",
              }}
            >
              {initials}
            </span>
          </div>
        ) : (
          <img
            src={member.photo}
            alt={member.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
              display: "block",
            }}
            onError={() => setImgError(true)}
          />
        )}
        {/* gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "72px",
            background:
              "linear-gradient(to top, rgba(8,30,92,0.55), transparent)",
            pointerEvents: "none",
          }}
        />
        {/* HOD star */}
        {member.type === "head" && (
          <div
            aria-label="Head of Department"
            title="Head of Department"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: C.gold,
              border: "2px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              zIndex: 3,
            }}
          >
            <Star size={12} fill={C.midnight} strokeWidth={0} />
          </div>
        )}
      </div>

      {/* Name + badge */}
      <div
        style={{
          padding: "18px 20px 14px",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: C.deepBlue,
            lineHeight: 1.25,
            marginBottom: "8px",
            margin: 0,
          }}
        >
          {member.name}
        </h3>
        <span
          style={{
            display: "inline-block",
            marginTop: "8px",
            background: badge.bg,
            color: badge.text,
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 700,
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "3px 9px",
            borderRadius: "4px",
          }}
        >
          {badge.label}
        </span>
      </div>

      {/* Specialization */}
      <div style={{ padding: "14px 20px 10px", flex: 1 }}>
        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "0.68rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: C.cobalt,
            marginBottom: "5px",
          }}
        >
          Specialization
        </p>
        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "0.85rem",
            color: C.textMuted,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {member.specialization}
        </p>
      </div>

      {/* Contact + CTA */}
      <div
        style={{
          padding: "14px 20px 18px",
          borderTop: `1px solid ${C.border}`,
          background: "rgba(22,72,200,0.025)",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            data-ocid={`faculty_directory.email.${index + 1}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.78rem",
              color: C.cobalt,
              textDecoration: "none",
              overflow: "hidden",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = C.deepBlue;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = C.cobalt;
            }}
          >
            <Mail size={11} style={{ color: C.cobalt, flexShrink: 0 }} />
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {member.email}
            </span>
          </a>
        )}
        {member.phone && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.78rem",
              color: "#888",
            }}
          >
            <Phone size={11} style={{ color: C.cobalt, flexShrink: 0 }} />
            {member.phone}
          </div>
        )}
        {!member.email && !member.phone && (
          <span
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.78rem",
              color: "#bbb",
            }}
          >
            Contact via department
          </span>
        )}

        {/* Read More CTA */}
        {member.profile && (
          <ReadMoreButton onClick={() => onReadMore(member)} index={index} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Read More button with gold shine effect
───────────────────────────────────────────── */
function ReadMoreButton({
  onClick,
  index,
}: {
  onClick: () => void;
  index: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-ocid={`faculty_directory.read_more.${index + 1}`}
      style={{
        marginTop: "8px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "9px 0",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontFamily: "'Source Sans 3', sans-serif",
        fontWeight: 700,
        fontSize: "0.8rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background: hov
          ? `linear-gradient(90deg, ${C.gold} 0%, #f5d44a 40%, ${C.gold} 100%)`
          : C.gold,
        backgroundSize: hov ? "200% auto" : "100% auto",
        backgroundPosition: hov ? "200% 0" : "0 0",
        color: C.midnight,
        transform: hov ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hov
          ? "0 6px 20px rgba(232,196,42,0.45)"
          : "0 2px 8px rgba(232,196,42,0.2)",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, background-position 0.6s ease",
      }}
    >
      View Profile
      <ChevronRight size={13} />
    </button>
  );
}

/* ─────────────────────────────────────────────
   ProfileSection wrapper
───────────────────────────────────────────── */
function ProfileSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: C.cardBg,
        borderRadius: "12px",
        border: `1px solid ${C.border}`,
        borderTop: `3px solid ${C.cobalt}`,
        padding: "28px 32px",
        boxShadow: "0 2px 12px rgba(22,72,200,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {icon}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1.15rem",
            color: C.deepBlue,
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Faculty Profile View (detail page)
───────────────────────────────────────────── */
function FacultyProfileView({
  member,
  onBack,
}: {
  member: FacultyMember;
  onBack: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const profile = member.profile!;
  const isSpecial = profile.profileType === "special";
  const badge = designationBadge(member.type);
  const [backHov, setBackHov] = useState(false);

  const initials = member.name
    .split(" ")
    .filter((w) => w.length > 1 && !["Dr.", "Mr.", "Mrs.", "Ms."].includes(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      style={{ animation: "profileFadeIn 0.5s ease-out both" }}
      data-ocid="faculty_directory.profile_view"
    >
      {/* Back bar */}
      <div
        style={{
          background: C.midnight,
          borderBottom: "1px solid rgba(232,196,42,0.18)",
          padding: "12px 24px",
        }}
      >
        <div className="container max-w-5xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            onMouseEnter={() => setBackHov(true)}
            onMouseLeave={() => setBackHov(false)}
            data-ocid="faculty_directory.back_to_faculty_button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: backHov
                ? `1px solid ${C.gold}`
                : "1px solid rgba(255,255,255,0.2)",
              borderRadius: "6px",
              padding: "6px 14px",
              color: backHov ? C.gold : "rgba(255,255,255,0.7)",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
          >
            ← Back to Faculty Directory
          </button>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.cobalt} 100%)`,
          padding: "56px 24px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle grid texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(232,196,42,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(232,196,42,0.07) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            pointerEvents: "none",
          }}
        />
        {/* gold top stripe */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: C.gold,
          }}
        />

        <div
          className="container max-w-5xl mx-auto"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* photo */}
            <div style={{ flexShrink: 0, position: "relative" }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-8px",
                  borderRadius: "20px",
                  background: `linear-gradient(135deg, ${C.gold}, ${C.cobalt})`,
                  opacity: 0.35,
                }}
              />
              {imgError ? (
                <div
                  style={{
                    position: "relative",
                    width: "180px",
                    height: "180px",
                    borderRadius: "16px",
                    background: C.midnight,
                    border: `3px solid ${C.gold}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "3.2rem",
                      color: C.gold,
                    }}
                  >
                    {initials}
                  </span>
                </div>
              ) : (
                <img
                  src={member.photo}
                  alt={member.name}
                  data-ocid="faculty_directory.profile_photo"
                  style={{
                    position: "relative",
                    width: "180px",
                    height: "180px",
                    borderRadius: "16px",
                    objectFit: "cover",
                    objectPosition: "center top",
                    border: `3px solid ${C.gold}`,
                    boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
                  }}
                  onError={() => setImgError(true)}
                />
              )}
            </div>

            {/* text */}
            <div style={{ textAlign: "left" }}>
              {isSpecial && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    marginBottom: "12px",
                    border: "1px solid rgba(232,196,42,0.45)",
                    background: "rgba(232,196,42,0.1)",
                    borderRadius: "4px",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: C.gold,
                  }}
                >
                  <Award size={10} />
                  Distinguished Faculty
                </div>
              )}
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
                  color: C.white,
                  lineHeight: 1.15,
                  marginBottom: "10px",
                }}
              >
                {member.name}
              </h1>
              <span
                style={{
                  display: "inline-block",
                  background: badge.bg,
                  color: badge.text,
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  marginBottom: "14px",
                }}
              >
                {member.designation}
              </span>
              {member.bio && (
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "0.95rem",
                    color: C.textLight,
                    lineHeight: 1.7,
                    maxWidth: "520px",
                    marginBottom: "16px",
                  }}
                >
                  {member.bio}
                </p>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        C.gold;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.65)";
                    }}
                  >
                    <Mail size={13} style={{ color: C.gold }} />
                    {member.email}
                  </a>
                )}
                {member.phone && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <Phone size={13} style={{ color: C.gold }} />
                    {member.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div style={{ background: C.bg, padding: "48px 24px 64px" }}>
        <div
          className="container max-w-5xl mx-auto"
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {/* Education */}
          {profile.education?.length > 0 && (
            <ProfileSection
              icon={<GraduationCap size={18} style={{ color: C.cobalt }} />}
              title="Education"
            >
              <div
                style={{
                  position: "relative",
                  paddingLeft: "20px",
                  borderLeft: "2px solid rgba(22,72,200,0.15)",
                }}
              >
                {profile.education.map((edu) => (
                  <div
                    key={edu.degree}
                    style={{ position: "relative", paddingBottom: "22px" }}
                    className="last:pb-0"
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: "-26px",
                        top: "4px",
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: edu.year ? C.gold : C.cobalt,
                        border: "2px solid #fff",
                        boxShadow: "0 2px 6px rgba(22,72,200,0.2)",
                      }}
                    />
                    <div style={{ marginLeft: "12px" }}>
                      <p
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: C.deepBlue,
                          margin: "0 0 3px",
                        }}
                      >
                        {edu.degree}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "0.82rem",
                          color: "#555",
                          margin: 0,
                        }}
                      >
                        {edu.institution}
                      </p>
                      {edu.year && (
                        <span
                          style={{
                            display: "inline-block",
                            marginTop: "5px",
                            background: "rgba(232,196,42,0.12)",
                            color: "#9a7a00",
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.65rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            padding: "2px 8px",
                            borderRadius: "3px",
                          }}
                        >
                          {edu.year}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ProfileSection>
          )}

          {/* Experience */}
          {profile.experience?.length > 0 && (
            <ProfileSection
              icon={<Briefcase size={18} style={{ color: C.cobalt }} />}
              title="Professional Experience"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {profile.experience.map((exp) => (
                  <div
                    key={exp.organization}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      padding: "14px 16px",
                      background: "#fff",
                      border: `1px solid ${C.border}`,
                      borderLeft: `3px solid ${C.cobalt}`,
                      borderRadius: "6px",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          color: C.deepBlue,
                          margin: "0 0 3px",
                        }}
                      >
                        {exp.role}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "0.82rem",
                          color: "#555",
                          margin: 0,
                        }}
                      >
                        {exp.organization}
                      </p>
                    </div>
                    <span
                      style={{
                        flexShrink: 0,
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        color: "#777",
                        background: C.bg,
                        border: `1px solid ${C.border}`,
                        padding: "3px 8px",
                        borderRadius: "4px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                ))}
              </div>
            </ProfileSection>
          )}

          {/* Research Interests */}
          {profile.researchInterests?.length > 0 && (
            <ProfileSection
              icon={<BookOpen size={18} style={{ color: C.cobalt }} />}
              title="Research Interests"
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {profile.researchInterests.map((r) => (
                  <span
                    key={r}
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.82rem",
                      padding: "5px 14px",
                      background: "rgba(22,72,200,0.07)",
                      border: "1px solid rgba(22,72,200,0.18)",
                      color: C.deepBlue,
                      borderRadius: "20px",
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </ProfileSection>
          )}

          {/* Achievements */}
          {profile.achievements?.length > 0 && (
            <ProfileSection
              icon={<Award size={18} style={{ color: C.cobalt }} />}
              title="Achievements & Recognition"
            >
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {profile.achievements.map((ach) => (
                  <li
                    key={ach}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: C.gold,
                        color: C.midnight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                      }}
                    >
                      ✦
                    </span>
                    <p
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.9rem",
                        color: "#444",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {ach}
                    </p>
                  </li>
                ))}
              </ul>
            </ProfileSection>
          )}

          {/* Courses Taught */}
          {profile.coursesTaught?.length > 0 && (
            <ProfileSection
              icon={<Star size={18} style={{ color: C.cobalt }} />}
              title="Courses Taught"
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {profile.coursesTaught.map((course) => (
                  <span
                    key={course}
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.82rem",
                      padding: "6px 16px",
                      background: C.deepBlue,
                      color: "rgba(255,255,255,0.92)",
                      borderRadius: "4px",
                      border: "1px solid rgba(22,72,200,0.3)",
                    }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </ProfileSection>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main: Faculty Directory Page
───────────────────────────────────────────── */
export function FacultyDirectoryPage() {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(
    null,
  );

  useEffect(() => {
    injectStyles();
    document.title = selectedFaculty
      ? `${selectedFaculty.name} — Faculty | COEP Tech DMS`
      : "Faculty Directory — DMS | COEP Tech";
  }, [selectedFaculty]);

  if (selectedFaculty) {
    return (
      <Layout>
        <Header />
        <main>
          <UniversityTabsSection />
          <FacultyProfileView
            member={selectedFaculty}
            onBack={() => {
              setSelectedFaculty(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </main>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <main>
        <UniversityTabsSection />

        {/* ── Page Hero ── */}
        <div
          style={{
            background: `linear-gradient(135deg, ${C.midnight} 0%, ${C.cobalt} 100%)`,
            padding: "56px 24px 68px",
            position: "relative",
            overflow: "hidden",
            animation: "heroFadeIn 0.75s ease-out both",
          }}
        >
          {/* grid texture */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(232,196,42,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(232,196,42,0.07) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              pointerEvents: "none",
            }}
          />
          {/* gold top stripe */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: C.gold,
            }}
          />
          {/* decorative circle */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-80px",
              top: "-80px",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              border: "1px solid rgba(232,196,42,0.12)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "40px",
              top: "20px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              border: "1px solid rgba(232,196,42,0.08)",
              pointerEvents: "none",
            }}
          />

          <div
            className="container max-w-7xl mx-auto"
            style={{ position: "relative", zIndex: 1 }}
          >
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "6px",
                marginBottom: "24px",
              }}
            >
              {[
                { label: "Home", href: "#/" },
                { label: "Academics", href: "#" },
                { label: "DMS", href: "#/dms" },
                { label: "Faculty", href: null },
              ].map((crumb, idx) => (
                <span
                  key={crumb.label}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  {idx > 0 && (
                    <ChevronRight
                      size={10}
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    />
                  )}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      data-ocid={`faculty_directory.breadcrumb.${idx + 1}`}
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.78rem",
                        color: C.textDim,
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          C.gold;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          C.textDim;
                      }}
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.78rem",
                        color: C.gold,
                      }}
                    >
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>

            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}
            >
              {/* icon box */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  flexShrink: 0,
                  background: "rgba(232,196,42,0.12)",
                  border: "1px solid rgba(232,196,42,0.35)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Users size={26} style={{ color: C.gold }} />
              </div>
              <div>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.8rem, 4vw, 2.9rem)",
                    color: C.white,
                    lineHeight: 1.1,
                    marginBottom: "10px",
                  }}
                >
                  Faculty Directory
                </h1>
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.72)",
                    margin: 0,
                  }}
                >
                  Department of Management Studies, COEP Technological
                  University
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Grid section ── */}
        <div
          style={{ background: C.bg, padding: "48px 24px 72px" }}
          data-ocid="faculty_directory.section"
        >
          <div className="container max-w-7xl mx-auto">
            {/* count bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "36px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.9rem",
                  color: "#888",
                  margin: 0,
                }}
              >
                Showing{" "}
                <span style={{ fontWeight: 700, color: C.deepBlue }}>
                  {FACULTY.length}
                </span>{" "}
                faculty members
              </p>
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "6px 18px",
                  background: C.cobalt,
                  color: C.white,
                  borderRadius: "4px",
                }}
              >
                Our Faculty
              </span>
            </div>

            {/* 3-col grid (desktop), 2-col (tablet), 1-col (mobile) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "28px",
              }}
            >
              {FACULTY.map((member, idx) => (
                <FacultyCard
                  key={member.id}
                  member={member}
                  index={idx}
                  onReadMore={setSelectedFaculty}
                />
              ))}
            </div>

            {/* Back to DMS */}
            <div style={{ marginTop: "48px", textAlign: "center" }}>
              <a
                href="#/dms"
                data-ocid="faculty_directory.back_to_dms_link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: C.cobalt,
                  textDecoration: "none",
                  padding: "10px 24px",
                  border: "1px solid rgba(22,72,200,0.3)",
                  borderRadius: "6px",
                  transition:
                    "border-color 0.2s ease, background 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = C.cobalt;
                  el.style.color = "#fff";
                  el.style.borderColor = C.cobalt;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.color = C.cobalt;
                  el.style.borderColor = "rgba(22,72,200,0.3)";
                }}
              >
                ← Back to Department of Management Studies
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
