import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Collage images — gradient placeholders in varying sizes/aspect ratios
const collageItems = [
  {
    id: 1,
    gradient: "linear-gradient(135deg, #1648C8 0%, #0F3499 100%)",
    aspectClass: "row-span-2",
    label: "Campus Life",
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg, #E8C42A 0%, #c9a820 100%)",
    aspectClass: "",
    label: "Regatta",
  },
  {
    id: 3,
    gradient: "linear-gradient(135deg, #081E5C 0%, #1648C8 100%)",
    aspectClass: "",
    label: "Mindspark",
  },
  {
    id: 4,
    gradient: "linear-gradient(135deg, #0F3499 0%, #081E5C 100%)",
    aspectClass: "col-span-2",
    label: "Engineering Labs",
  },
  {
    id: 5,
    gradient: "linear-gradient(135deg, #1648C8 0%, #E8C42A 100%)",
    aspectClass: "",
    label: "Sports",
  },
  {
    id: 6,
    gradient: "linear-gradient(135deg, #0a2580 0%, #1648C8 100%)",
    aspectClass: "",
    label: "Research",
  },
  {
    id: 7,
    gradient: "linear-gradient(135deg, #E8C42A 0%, #081E5C 100%)",
    aspectClass: "row-span-2",
    label: "Cultural Fest",
  },
  {
    id: 8,
    gradient: "linear-gradient(135deg, #0F3499 0%, #E8C42A 100%)",
    aspectClass: "col-span-2",
    label: "Clubs",
  },
];

export function LifeAtCoepSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: "#F5F7FF" }}
      data-ocid="life.section"
    >
      <div className="container max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-14px)",
            transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-px" style={{ background: "#1648C8" }} />
            <span
              className="text-xs uppercase tracking-[0.25em] font-body font-semibold"
              style={{
                color: "#1648C8",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Campus Experience
            </span>
            <div className="w-8 h-px" style={{ background: "#1648C8" }} />
          </div>
          <h2
            className="font-display text-3xl md:text-4xl font-bold"
            style={{
              color: "#0F3499",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Life at COEP
          </h2>
        </div>

        {/* Masonry collage grid */}
        <div className="relative">
          {/* Responsive grid */}
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(3, 160px)",
            }}
          >
            {collageItems.map((item, idx) => (
              <div
                key={item.id}
                className={`relative overflow-hidden group cursor-pointer ${item.aspectClass}`}
                style={{
                  background: item.gradient,
                  borderRadius: "4px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "scale(1)" : "scale(0.92)",
                  transition: `opacity 0.65s ease-out ${idx * 0.07}s, transform 0.65s ease-out ${idx * 0.07}s`,
                }}
              >
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                  style={{ background: "rgba(8,30,92,0.65)" }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest text-white px-3 pb-3"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </div>
                {/* Decorative pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          {/* Center overlay text block */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 20 }}
          >
            <div
              className="text-center px-6 py-5 max-w-xs md:max-w-sm"
              style={{
                background: "rgba(255,255,255,0.96)",
                borderRadius: "4px",
                boxShadow:
                  "0 20px 60px rgba(15,52,153,0.25), 0 4px 20px rgba(15,52,153,0.15)",
                border: "1px solid rgba(22,72,200,0.1)",
                opacity: visible ? 1 : 0,
                transition: "opacity 0.8s ease-out 0.5s",
              }}
            >
              <p
                className="text-sm font-body leading-relaxed mb-1"
                style={{
                  color: "#444",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Experience the vibrant campus life at COEP Tech — where
                curiosity meets community, and engineering meets culture.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile grid (simpler) */}
        <div className="md:hidden grid grid-cols-2 gap-3 mt-4">
          {collageItems.slice(0, 6).map((item, idx) => (
            <div
              key={item.id}
              className="relative overflow-hidden"
              style={{
                background: item.gradient,
                borderRadius: "4px",
                height: "120px",
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.92)",
                transition: `opacity 0.55s ease-out ${idx * 0.08}s, transform 0.55s ease-out ${idx * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex justify-center mt-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease-out 0.6s",
          }}
        >
          <button
            type="button"
            onClick={() => {
              window.location.hash = "/campus-life";
            }}
            className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest px-10 py-3.5 transition-all duration-200"
            style={{
              background: "#1648C8",
              color: "#ffffff",
              borderRadius: "2px",
              fontFamily: "'Source Sans 3', sans-serif",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(22,72,200,0.3)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "#E8C42A";
              el.style.color = "#081E5C";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 24px rgba(232,196,42,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "#1648C8";
              el.style.color = "#ffffff";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 16px rgba(22,72,200,0.3)";
            }}
            data-ocid="life.explore_campus_button"
          >
            Explore Campus Life
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
