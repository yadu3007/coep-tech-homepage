import { useEffect, useRef, useState } from "react";
import { RC } from "./ResearchPage";

const FEATURED = [
  {
    id: "cfd",
    tag: "Mechanical Engineering",
    title:
      "Advances in Computational Fluid Dynamics for Turbomachinery Optimization",
    author: "Prof. Vilas Warudkar",
    dept: "Department of Mechanical Engineering",
    desc: "This pioneering research introduces novel methodologies for CFD simulation in turbomachinery systems, achieving a 40% improvement in computational efficiency while maintaining accuracy. Published in Nature Engineering, this work has been cited 230+ times globally.",
    cta: "Read Research",
    gradient:
      "linear-gradient(135deg, #7b1a0a 0%, #c0392b 40%, #e67e22 80%, #f1c40f 100%)",
    accentWord: "CFD",
  },
  {
    id: "vlsi",
    tag: "Electronics Engineering",
    title:
      "Low-Power VLSI Design for IoT Edge Computing Using Adaptive Voltage Scaling",
    author: "Prof. Mahesh Patil",
    dept: "Department of Electronics Engineering",
    desc: "A breakthrough approach to designing ultra-low-power VLSI circuits for IoT edge nodes using dynamic adaptive voltage scaling. Achieves 65% reduction in power consumption while meeting real-time constraints. Presented at ISSCC 2024.",
    cta: "Read Research",
    gradient:
      "linear-gradient(135deg, #0b2c6e 0%, #1a4fa8 40%, #2980b9 80%, #1abc9c 100%)",
    accentWord: "VLSI",
  },
  {
    id: "ai",
    tag: "Computer Science & AI",
    title:
      "Self-Supervised Learning for Medical Image Segmentation in Low-Resource Settings",
    author: "Dr. Rajesh Ingle",
    dept: "Department of Computer Engineering",
    desc: "Novel self-supervised framework enabling accurate medical image segmentation with only 10% labelled data. Validated across three public datasets achieving 94% Dice score. Accepted at NeurIPS 2024 as Spotlight Paper.",
    cta: "Read Research",
    gradient:
      "linear-gradient(135deg, #1a0b4a 0%, #4a1a8a 40%, #8e44ad 80%, #e056a0 100%)",
    accentWord: "AI/ML",
  },
];

// Paper card visual
function PaperVisual({ item }: { item: (typeof FEATURED)[0] }) {
  return (
    <div
      className="w-full h-full flex flex-col justify-end p-8 overflow-hidden relative group"
      style={{ background: item.gradient, minHeight: 380 }}
    >
      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-10">
        {(
          ["10%", "21%", "32%", "43%", "54%", "65%", "76%", "87%"] as const
        ).map((top, i) => (
          <div
            key={top}
            className="absolute h-px w-full"
            style={{
              background: "white",
              top,
              transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
            }}
          />
        ))}
      </div>

      {/* Journal badge */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-white/90 text-xs font-body tracking-wider uppercase">
          Peer Reviewed
        </span>
      </div>

      {/* Large accent word */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] font-black opacity-10 select-none pointer-events-none"
        style={{
          color: "white",
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1,
        }}
      >
        {item.accentWord}
      </div>

      {/* Bottom text */}
      <div className="relative z-10">
        <div className="text-white/60 text-xs tracking-widest uppercase mb-2 font-body">
          {item.tag}
        </div>
        <div
          className="text-white text-lg font-bold leading-snug line-clamp-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {item.title}
        </div>
      </div>
    </div>
  );
}

export function ResearchHero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 350);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % FEATURED.length);
        setAnimating(false);
      }, 350);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const item = FEATURED[current];

  const particleData = [
    { top: "4%", left: "8%", sz: 3 },
    { top: "17%", left: "23%", sz: 2 },
    { top: "31%", left: "42%", sz: 3 },
    { top: "48%", left: "61%", sz: 2 },
    { top: "63%", left: "77%", sz: 3 },
    { top: "79%", left: "15%", sz: 2 },
    { top: "92%", left: "88%", sz: 3 },
    { top: "8%", left: "55%", sz: 2 },
    { top: "22%", left: "70%", sz: 3 },
    { top: "36%", left: "5%", sz: 2 },
    { top: "52%", left: "32%", sz: 3 },
    { top: "67%", left: "50%", sz: 2 },
    { top: "84%", left: "67%", sz: 3 },
    { top: "13%", left: "38%", sz: 2 },
    { top: "27%", left: "82%", sz: 3 },
    { top: "44%", left: "19%", sz: 2 },
    { top: "58%", left: "44%", sz: 3 },
    { top: "73%", left: "93%", sz: 2 },
    { top: "89%", left: "29%", sz: 3 },
    { top: "6%", left: "75%", sz: 2 },
    { top: "39%", left: "95%", sz: 3 },
    { top: "55%", left: "12%", sz: 2 },
    { top: "71%", left: "38%", sz: 3 },
    { top: "97%", left: "58%", sz: 2 },
  ];

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #040d1e 0%, #081e5c 60%, #0a1a40 100%)",
        minHeight: 380,
      }}
    >
      {/* Golden particle dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particleData.map((p) => (
          <div
            key={`${p.top}-${p.left}`}
            className="absolute rounded-full"
            style={{
              width: p.sz,
              height: p.sz,
              background: RC.gold,
              opacity: 0.18,
              top: p.top,
              left: p.left,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[380px]">
        {/* Left: visual */}
        <div
          className="overflow-hidden relative transition-all duration-500 cursor-pointer"
          style={{ opacity: animating ? 0 : 1 }}
        >
          <PaperVisual item={item} />
        </div>

        {/* Right: content */}
        <div
          className="flex flex-col justify-center px-10 py-12 transition-all duration-500"
          style={{ opacity: animating ? 0 : 1 }}
        >
          {/* Featured label */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: "rgba(232,196,42,0.15)",
                color: RC.gold,
                border: "1px solid rgba(232,196,42,0.3)",
              }}
            >
              Featured Research
            </span>
          </div>

          <h1
            className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {item.title}
          </h1>

          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: RC.gold, color: RC.midnight }}
            >
              {item.author[0]}
            </div>
            <div>
              <span className="text-white/90 text-sm font-semibold font-body">
                {item.author}
              </span>
              <span className="text-white/50 text-xs ml-2 font-body">
                | {item.dept}
              </span>
            </div>
          </div>

          <p className="text-white/70 text-sm leading-relaxed mb-8 font-body">
            {item.desc}
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#research"
              data-ocid="research.hero.read_more.button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg font-body"
              style={{ background: RC.gold, color: RC.midnight }}
            >
              {item.cta} →
            </a>

            {/* Dots */}
            <div className="flex gap-2">
              {FEATURED.map((feat, i) => (
                <button
                  key={feat.id}
                  type="button"
                  data-ocid={`research.hero.dot.${i + 1}`}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 20 : 8,
                    height: 8,
                    background:
                      i === current ? RC.gold : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
