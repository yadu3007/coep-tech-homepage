import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import React, { Component, type ErrorInfo, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// ─── Global error listeners ───────────────────────────────────────────────────
window.addEventListener("error", (event) => {
  console.error("[GlobalError]", event.error ?? event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[UnhandledRejection]", event.reason);
});

// ─── Root Error Boundary ──────────────────────────────────────────────────────
interface EBState {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[RootErrorBoundary] Caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#F4F7FF",
            fontFamily: "'Source Sans 3', sans-serif",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#1648C8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ color: "#fff", fontSize: "2rem" }}>⚠</span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#0F3499",
              fontSize: "1.8rem",
              marginBottom: "1rem",
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: "#6B7280", marginBottom: "2rem", maxWidth: 480 }}>
            We encountered an unexpected error. Please refresh the page to try
            again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              background: "#1648C8",
              color: "#fff",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: 8,
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Refresh Page
          </button>
          {this.state.error && (
            <details
              style={{
                marginTop: "2rem",
                maxWidth: 600,
                textAlign: "left",
                color: "#374151",
              }}
            >
              <summary
                style={{ cursor: "pointer", fontWeight: 600, color: "#1648C8" }}
              >
                Technical details
              </summary>
              <pre
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.75rem",
                  overflow: "auto",
                  background: "#e8edf8",
                  padding: "1rem",
                  borderRadius: 6,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {this.state.error.message}
                {"\n"}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RootErrorBoundary>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </RootErrorBoundary>,
);
