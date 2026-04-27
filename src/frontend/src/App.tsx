import {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";
import { AIChatbot } from "./components/AIChatbot";
import { CampusLifeSection } from "./components/CampusLifeSection";
import { EventsSection } from "./components/EventsSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HistorySection } from "./components/HistorySection";
import { Layout } from "./components/Layout";
import { LifeAtCoepSection } from "./components/LifeAtCoepSection";
import { NewsSection } from "./components/NewsSection";
import { NewsTicker } from "./components/NewsTicker";
import { NoticesSection } from "./components/NoticesSection";
import { ResearchSection } from "./components/ResearchSection";
import { StatsSection } from "./components/StatsSection";
import { UniversityTabsSection } from "./components/UniversityTabsSection";
import { AboutUsPage } from "./pages/AboutUsPage";
import { AdministrationPage } from "./pages/AdministrationPage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { CampusLifePage } from "./pages/CampusLifePage";
import { DMSPage } from "./pages/DMSPage";
import { FacilitiesPage } from "./pages/FacilitiesPage";
import { FacultyDirectoryPage } from "./pages/FacultyDirectoryPage";
import { MechanicalEngPage } from "./pages/MechanicalEngPage";
import { PlacementsPage } from "./pages/PlacementsPage";
import { ResearchPage } from "./pages/ResearchPage";

// ─── Per-route Error Boundary ────────────────────────────────────────────────
interface EBState {
  hasError: boolean;
  error: Error | null;
}

const C = {
  cobalt: "#1648C8",
  deepBlue: "#0F3499",
  gold: "#E8C42A",
  white: "#ffffff",
} as const;

class PageErrorBoundary extends Component<
  { children: ReactNode; pageName?: string },
  EBState
> {
  constructor(props: { children: ReactNode; pageName?: string }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `[PageErrorBoundary:${this.props.pageName ?? "unknown"}]`,
      error,
      info,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#F4F7FF",
            fontFamily: "'Source Sans 3', sans-serif",
            padding: "3rem 2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: C.cobalt,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ color: C.white, fontSize: "1.5rem" }}>⚠</span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              color: C.deepBlue,
              fontSize: "1.5rem",
              marginBottom: "0.75rem",
            }}
          >
            Page could not be loaded
          </h2>
          <p
            style={{ color: "#6B7280", marginBottom: "1.5rem", maxWidth: 420 }}
          >
            This page encountered an error. Use the navigation above to visit
            another section.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.hash = "/";
            }}
            style={{
              background: C.cobalt,
              color: C.white,
              border: "none",
              padding: "0.65rem 1.75rem",
              borderRadius: 8,
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Go to Homepage
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Suspense fallback ────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F4F7FF",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: `3px solid ${C.cobalt}`,
            borderTopColor: "transparent",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            color: "#6B7280",
            fontSize: "0.9rem",
          }}
        >
          Loading…
        </span>
      </div>
      <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
    </div>
  );
}

// ─── Wrap a page component safely ────────────────────────────────────────────
function SafePage({ name, children }: { name: string; children: ReactNode }) {
  return (
    <PageErrorBoundary pageName={name}>
      <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
    </PageErrorBoundary>
  );
}

// ─── Global scroll-triggered animation observer ──────────────────────────────
function useScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const observe = () => {
      for (const el of document.querySelectorAll(
        ".animate-on-scroll:not(.is-visible)",
      )) {
        observer.observe(el);
      }
    };

    observe();

    const mutationObs = new MutationObserver(observe);
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObs.disconnect();
    };
  }, []);
}

// ─── Simple hash-based router ─────────────────────────────────────────────────
function getHashRoute() {
  const hash = window.location.hash.replace("#", "") || "/";
  return hash.startsWith("/") ? hash : `/${hash}`;
}

function useRoute() {
  const [route, setRoute] = useState(getHashRoute);

  useEffect(() => {
    const handler = () => setRoute(getHashRoute());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return route;
}

// ─── Homepage ─────────────────────────────────────────────────────────────────
function HomePage() {
  useScrollAnimations();

  return (
    <Layout>
      <Header />
      <main style={{ margin: 0, padding: 0 }}>
        {/* Video + university tabs */}
        <UniversityTabsSection />

        {/* a) News ticker — continuous scrolling ribbon below the video */}
        <NewsTicker />

        {/* Existing campus life / hero section */}
        <CampusLifeSection />

        {/* b) Events — big portrait cards, 3 at once with arrows */}
        <EventsSection />

        {/* c) Notices & Circulars — same premium card layout as events */}
        <NoticesSection />

        {/* d) Latest News — kept exactly as-is */}
        <NewsSection />

        {/* e) History & Legacy — partial timeline preview */}
        <HistorySection />

        {/* f) Why COEP — white background with cobalt/blue stats */}
        <StatsSection />

        {/* g) Life at COEP — masonry collage */}
        <LifeAtCoepSection />

        {/* h) Research at COEP — 4 research paper cards */}
        <ResearchSection />
      </main>

      {/* j) Premium footer */}
      <Footer />

      {/* i) AI Chatbot — fixed floating bottom-right */}
      <AIChatbot />
    </Layout>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const route = useRoute();

  if (route === "/dms/faculty")
    return (
      <SafePage name="FacultyDirectory">
        <FacultyDirectoryPage />
      </SafePage>
    );
  if (route.startsWith("/dms"))
    return (
      <SafePage name="DMS">
        <DMSPage />
      </SafePage>
    );
  if (route.startsWith("/academics/mechanical-engineering"))
    return (
      <SafePage name="MechanicalEng">
        <MechanicalEngPage />
      </SafePage>
    );
  if (route.startsWith("/administration"))
    return (
      <SafePage name="Administration">
        <AdministrationPage />
      </SafePage>
    );
  if (route.startsWith("/about-us"))
    return (
      <SafePage name="AboutUs">
        <AboutUsPage />
      </SafePage>
    );
  if (route.startsWith("/admissions"))
    return (
      <SafePage name="Admissions">
        <AdmissionsPage />
      </SafePage>
    );
  if (route.startsWith("/research"))
    return (
      <SafePage name="Research">
        <ResearchPage />
      </SafePage>
    );
  if (route.startsWith("/campus-life"))
    return (
      <SafePage name="CampusLife">
        <CampusLifePage />
      </SafePage>
    );
  if (route.startsWith("/placements"))
    return (
      <SafePage name="Placements">
        <PlacementsPage />
      </SafePage>
    );
  if (route.startsWith("/facilities"))
    return (
      <SafePage name="Facilities">
        <FacilitiesPage />
      </SafePage>
    );
  return (
    <SafePage name="Home">
      <HomePage />
    </SafePage>
  );
}
