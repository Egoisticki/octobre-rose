import { describe, expect, it } from "vitest";

import { registrationSchema } from "@/lib/registration";

const validRegistration = {
  name: "Example Member",
  discord: "@example",
  phone: "0551234567",
  availability: ["Monday", "Tuesday"],
  time: "Morning",
  notes: "",
  standCommitment: true,
};

describe("registrationSchema", () => {
  it("accepts a complete valid registration", () => {
    expect(registrationSchema.safeParse(validRegistration).success).toBe(true);
  });

  it("accepts an Algerian international phone number", () => {
    const result = registrationSchema.safeParse({ ...validRegistration, phone: "+213551234567" });
    expect(result.success).toBe(true);
  });

  it("requires at least one availability day", () => {
    const result = registrationSchema.safeParse({ ...validRegistration, availability: [] });
    expect(result.success).toBe(false);
  });

  it("rejects a registration without stand commitment", () => {
    const result = registrationSchema.safeParse({ ...validRegistration, standCommitment: false });
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone numbers", () => {
    const result = registrationSchema.safeParse({ ...validRegistration, phone: "12345" });
    expect(result.success).toBe(false);
  });
});
