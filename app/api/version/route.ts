// GET /api/version — the live-commit heartbeat.
// Canon (boot.shared-core): "live commit = curl <app-url>/api/version".
// Vercel injects VERCEL_GIT_COMMIT_SHA on every deploy.
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? "dev",
    ref: process.env.VERCEL_GIT_COMMIT_REF ?? "local",
    serverTime: new Date().toISOString(),
  });
}
