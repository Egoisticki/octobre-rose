import { z } from "zod";

export const availabilityDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const timeSlots = [
  "Morning",
  "Afternoon",
  "All Day",
  "Depends on the day",
] as const;

const algerianPhone = /^(?:0[567]\d{8}|\+213[567]\d{8})$/;

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80),
  discord: z.string().trim().min(2, "Please enter your Discord username.").max(64),
  phone: z
    .string()
    .trim()
    .regex(algerianPhone, "Use an Algerian number such as 0551234567 or +213551234567."),
  availability: z
    .array(z.enum(availabilityDays))
    .min(1, "Choose at least one available day."),
  time: z.enum(timeSlots, { error: "Choose a preferred time slot." }),
  notes: z.string().trim().max(500, "Please keep notes under 500 characters."),
  standCommitment: z
    .boolean()
    .refine((value) => value, "You must confirm attendance at the awareness stand."),
});

export const registrationSubmissionSchema = registrationSchema.extend({
  website: z.string().max(0, "Submission could not be accepted."),
  formStartedAt: z.number().int().positive(),
});

export type RegistrationInput = z.input<typeof registrationSchema>;
export type RegistrationData = z.output<typeof registrationSchema>;
export type RegistrationSubmission = z.input<typeof registrationSubmissionSchema>;
