"use client";

/**
 * Root error boundary for failures that crash the whole layout (font load
 * errors, provider exceptions). Must render its own <html>/<body>; inline
 * styles only, because globals.css is not guaranteed to have loaded.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          background: "#faf9f6",
          color: "#0a2540",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ maxWidth: "34rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7a5e28",
            }}
          >
            Rough Seas
          </p>
          <h1 style={{ margin: "8px 0 0", fontSize: "2rem", lineHeight: 1.2 }}>
            The site could not load
          </h1>
          <p style={{ margin: "16px auto 0", fontSize: "15px", lineHeight: 1.6, color: "#3d3a34" }}>
            A critical error prevented the page from rendering. Please try
            again — if it persists, come back shortly.
          </p>
          {error.digest ? (
            <p style={{ margin: "12px 0 0", fontSize: "12px", color: "#8a8577" }}>
              Error reference: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "24px",
              minHeight: "44px",
              padding: "0 20px",
              borderRadius: "6px",
              border: "none",
              background: "#0a2540",
              color: "#faf9f6",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
