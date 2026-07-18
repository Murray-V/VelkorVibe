export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "72px 24px" }}>
      <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 3, color: "#697690", textTransform: "uppercase" }}>
        Velkor Vibe
      </p>
      <h1 style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: -1, margin: "8px 0 16px", fontWeight: 800 }}>
        Your venture&rsquo;s OS is running.
      </h1>
      <p style={{ color: "#9aa7bd", fontSize: 17, lineHeight: 1.6 }}>
        This is the Velkor Vibe starter — the app shell for the Multi-Seat Venture OS.
        Two teams of AI seats coordinate through one Supabase database; this app is the
        heartbeat (<code style={{ color: "#2dd4bf" }}>/api/version</code>) and the operator
        dashboard (<code style={{ color: "#2dd4bf" }}>/pm</code>).
      </p>
      <div style={{ marginTop: 32, padding: 20, background: "#161d30", border: "1px solid #28324a", borderRadius: 12 }}>
        <p style={{ margin: 0, color: "#9aa7bd", fontSize: 14, lineHeight: 1.7 }}>
          <b style={{ color: "#eef2f9" }}>Next steps</b><br />
          1&nbsp;·&nbsp;Run the Velkor Vibe seed installer in your Supabase project.<br />
          2&nbsp;·&nbsp;Set <code>SUPABASE_URL</code>, <code>SUPABASE_SERVICE_ROLE_KEY</code>, and <code>PM_KEY</code> in Vercel.<br />
          3&nbsp;·&nbsp;Open <code>/pm?key=&lt;your PM_KEY&gt;</code> — the build map comes alive.<br />
          4&nbsp;·&nbsp;Boot Mike. He takes it from there.
        </p>
      </div>
      <p style={{ marginTop: 40, color: "#697690", fontSize: 13 }}>
        Velkor Vibe · MIT-licensed starter · the full playbook &amp; canon package is licensed separately.
      </p>
    </main>
  );
}
