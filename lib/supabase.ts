// Server-only Supabase client using the service role key.
// The service role bypasses RLS — this module must only ever be imported
// from server components / route handlers, never client components.
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getServerSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null; // not wired yet — pages render setup help instead
  return createClient(url, key, { auth: { persistSession: false } });
}
