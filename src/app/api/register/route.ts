import { NextRequest, NextResponse } from "next/server";

import { registrationSubmissionSchema } from "@/lib/registration";

export const runtime = "nodejs";

const REQUEST_TIMEOUT_MS = 10_000;
const MIN_FORM_TIME_MS = 1_500;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX = 4;

type RateEntry = { count: number; resetsAt: number };
const rateLimitStore = new Map<string, RateEntry>();

function clientIdentifier(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(identifier: string, now = Date.now()) {
  const current = rateLimitStore.get(identifier);

  if (!current || current.resetsAt <= now) {
    rateLimitStore.set(identifier, { count: 1, resetsAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

export function resetRateLimitForTests() {
  if (process.env.NODE_ENV === "test") rateLimitStore.clear();
}

function jsonError(message: string, status: number, details?: unknown) {
  return NextResponse.json(
    { success: false, message, ...(details ? { details } : {}) },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientIdentifier(request))) {
    return jsonError("Too many attempts. Please wait a few minutes and try again.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const parsed = registrationSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Please review the highlighted fields.", 400, parsed.error.flatten().fieldErrors);
  }

  const { website: _website, formStartedAt, ...registration } = parsed.data;
  void _website;

  if (Date.now() - formStartedAt < MIN_FORM_TIME_MS) {
    return jsonError("Submission could not be accepted. Please try again.", 429);
  }

  const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!endpoint) {
    return jsonError("Registration is temporarily unavailable.", 503);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration),
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
    });

    if (!response.ok) {
      return jsonError("We could not save your registration. Please try again later.", 502);
    }

    let result: unknown;
    try {
      result = await response.json();
    } catch {
      return jsonError("The registration service returned an invalid response.", 502);
    }

    if (
      typeof result !== "object" ||
      result === null ||
      !("success" in result) ||
      result.success !== true
    ) {
      return jsonError("We could not confirm that your registration was saved.", 502);
    }

    return NextResponse.json(
      { success: true },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return jsonError("The registration service timed out. Please try again later.", 504);
    }

    return jsonError("Registration is temporarily unavailable.", 502);
  } finally {
    clearTimeout(timeout);
  }
}
