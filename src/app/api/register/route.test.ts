import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST, resetRateLimitForTests } from "@/app/api/register/route";

const validSubmission = {
  name: "Example Member",
  discord: "@example",
  phone: "0551234567",
  availability: ["Monday", "Tuesday"],
  time: "Morning",
  notes: "",
  standCommitment: true,
  website: "",
  formStartedAt: Date.now() - 5_000,
};

function makeRequest(body: unknown, ip = "203.0.113.10") {
  return new NextRequest("http://localhost:3000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/register", () => {
  beforeEach(() => {
    resetRateLimitForTests();
    process.env.GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/example";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns success only after the upstream service confirms the save", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest(validSubmission));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledOnce();

    const [, options] = fetchMock.mock.calls[0];
    expect(JSON.parse(options.body as string)).toEqual({
      name: validSubmission.name,
      discord: validSubmission.discord,
      phone: validSubmission.phone,
      availability: validSubmission.availability,
      time: validSubmission.time,
      notes: validSubmission.notes,
      standCommitment: true,
    });
  });

  it("rejects invalid input without contacting the upstream service", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ ...validSubmission, phone: "invalid" }));

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not claim success when Apps Script reports failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: false }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    const response = await POST(makeRequest(validSubmission));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.success).toBe(false);
  });

  it("rejects honeypot submissions", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ ...validSubmission, website: "spam.example" }));

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
