// /pm — the operator dashboard: a VIEW of the database, never a second
// source of truth (canon: process.dashboard-and-reporting).
// Gated in production by ?key=<PM_KEY>; open in local dev.
import { getServerSupabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const box: React.CSSProperties = {
  background: "#161d30",
  border: "1px solid #28324a",
  borderRadius: 12,
  padding: 16,
  marginTop: 16,
};
const h2s: React.CSSProperties = { fontSize: 15, margin: "0 0 10px", color: "#9aa7bd", textTransform: "uppercase", letterSpacing: 1, fontFamily: "monospace" };
const td: React.CSSProperties = { padding: "6px 10px", borderTop: "1px solid #28324a", fontSize: 13.5, verticalAlign: "top" };

function toneColor(t?: string | null) {
  if (t === "green") return "#35d07f";
  if (t === "amber") return "#f0b429";
  if (t === "red") return "#ff6b6b";
  return "#9aa7bd";
}

export default async function PM({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  // Gate: in production require ?key= to match PM_KEY.
  const gate = process.env.PM_KEY;
  if (process.env.NODE_ENV === "production" && (!gate || searchParams.key !== gate)) {
    notFound();
  }

  const supabase = getServerSupabase();

  if (!supabase) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontSize: 28 }}>Velkor Vibe · /pm</h1>
        <div style={box}>
          <p style={{ color: "#f0b429", margin: 0 }}>
            Database not wired yet. Set <code>SUPABASE_URL</code> and{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> (see <code>.env.example</code>), run the
            Velkor Vibe seed installer in Supabase, then reload.
          </p>
        </div>
      </main>
    );
  }

  const [status, notes, decisions, pages] = await Promise.all([
    supabase.from("pm_status").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("pm_notes")
      .select("author,recipient,tag,text,status,disposition,created_at")
      .eq("archived", false)
      .is("disposition", null)
      .order("created_at", { ascending: false })
      .limit(30),
    supabase.from("pm_decisions").select("key,title,status").order("key", { ascending: true }),
    supabase.from("pm_pages").select("surface,route,state,notes").order("route", { ascending: true }),
  ]);

  const err = status.error || notes.error || decisions.error || pages.error;
  const needsYou = (status.data ?? []).filter((r) => r.tone === "red");

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "40px 24px 80px" }}>
      <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 3, color: "#697690", textTransform: "uppercase", margin: 0 }}>
        Velkor Vibe · operator dashboard
      </p>
      <h1 style={{ fontSize: 30, margin: "6px 0 0" }}>Build Map</h1>

      {err && (
        <div style={{ ...box, borderColor: "#ff6b6b" }}>
          <p style={{ color: "#ff6b6b", margin: 0 }}>
            Query error: {err.message}. Has the seed installer been run?
          </p>
        </div>
      )}

      <section style={{ ...box, borderColor: needsYou.length ? "#ff6b6b" : "#28324a" }}>
        <h2 style={h2s}>Needs you</h2>
        {needsYou.length === 0 ? (
          <p style={{ color: "#35d07f", margin: 0, fontSize: 14 }}>Nothing needs you. The crew is working.</p>
        ) : (
          needsYou.map((r) => (
            <p key={r.id} style={{ margin: "4px 0", fontSize: 14 }}>
              <b>{r.label}:</b> <span style={{ color: "#9aa7bd" }}>{r.value}</span>
            </p>
          ))
        )}
      </section>

      <section style={box}>
        <h2 style={h2s}>Status board</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {(status.data ?? []).map((r) => (
              <tr key={r.id}>
                <td style={{ ...td, width: 220, fontWeight: 600 }}>
                  <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: toneColor(r.tone), marginRight: 8 }} />
                  {r.label}
                </td>
                <td style={{ ...td, color: "#9aa7bd", whiteSpace: "pre-wrap" }}>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={box}>
        <h2 style={h2s}>Open bus notes ({(notes.data ?? []).length})</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {(notes.data ?? []).map((n, i) => (
              <tr key={i}>
                <td style={{ ...td, width: 170, fontFamily: "monospace", fontSize: 12, color: "#697690" }}>
                  {n.author} → {n.recipient}
                  <br />
                  {n.tag}
                </td>
                <td style={{ ...td, color: "#9aa7bd", whiteSpace: "pre-wrap" }}>
                  {(n.text ?? "").slice(0, 400)}
                  {(n.text ?? "").length > 400 ? "…" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={box}>
        <h2 style={h2s}>Surfaces</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {(pages.data ?? []).map((p, i) => (
              <tr key={i}>
                <td style={{ ...td, width: 200, fontFamily: "monospace", fontSize: 12.5 }}>{p.route}</td>
                <td style={{ ...td, width: 90, color: toneColor(p.state === "shipped" ? "green" : p.state === "built" ? "amber" : null) }}>{p.state}</td>
                <td style={{ ...td, color: "#9aa7bd" }}>{p.surface}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={box}>
        <h2 style={h2s}>Canon ({(decisions.data ?? []).length} rules)</h2>
        <p style={{ color: "#697690", fontSize: 12.5, margin: "0 0 8px" }}>
          Read-only index — the rules live in pm_decisions; seats load them at boot.
        </p>
        <div style={{ columns: 2, columnGap: 24 }}>
          {(decisions.data ?? []).map((d) => (
            <p key={d.key} style={{ margin: "3px 0", fontSize: 12.5, breakInside: "avoid" }}>
              <code style={{ color: "#2dd4bf" }}>{d.key}</code>{" "}
              <span style={{ color: "#697690" }}>· {d.status}</span>
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
