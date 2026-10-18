"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Check, CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  availabilityDays,
  registrationSubmissionSchema,
  timeSlots,
  type RegistrationSubmission,
} from "@/lib/registration";

type ApiResponse = { success: boolean; message?: string };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-rose-700"><AlertCircle size={14} />{message}</p>;
}

export function RegistrationForm() {
  const [serverError, setServerError] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationSubmission>({
    resolver: zodResolver(registrationSubmissionSchema),
    defaultValues: {
      name: "",
      discord: "",
      phone: "",
      availability: [],
      time: undefined,
      notes: "",
      standCommitment: false,
      website: "",
      formStartedAt: 0,
    },
  });

  useEffect(() => {
    setValue("formStartedAt", Date.now());
  }, [setValue]);

  async function onSubmit(values: RegistrationSubmission) {
    setServerError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = (await response.json().catch(() => null)) as ApiResponse | null;

      if (!response.ok || result?.success !== true) {
        setServerError(result?.message || "We could not save your registration. Please try again.");
        return;
      }

      setIsComplete(true);
    } catch {
      setServerError("We could not reach the registration service. Check your connection and try again.");
    }
  }

  if (isComplete) {
    return (
      <div className="grid min-h-[560px] place-items-center rounded-[2rem] bg-white p-8 text-center shadow-[0_30px_80px_rgba(60,8,35,0.22)] sm:p-12" role="status" aria-live="polite">
        <div>
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-pink-50 text-primary">
            <CheckCircle2 size={38} strokeWidth={1.8} />
          </div>
          <p className="mt-8 text-xs font-extrabold uppercase tracking-[.24em] text-primary">Registration confirmed</p>
          <h3 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-burgundy sm:text-5xl">You&apos;re on the Team! 🎗️</h3>
          <p className="mx-auto mt-5 max-w-md leading-7 text-burgundy/65">Your registration was saved successfully. Thank you for showing up for awareness, care, and community.</p>
          <a href="#top" className="button-secondary mt-8">Back to the top <ArrowRight size={18} /></a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-[2rem] bg-white p-5 shadow-[0_30px_80px_rgba(60,8,35,0.22)] sm:p-8 lg:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">Full Name <span aria-hidden="true">*</span></label>
          <input id="name" autoComplete="name" className="field-input" placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="discord" className="field-label">Discord Username <span aria-hidden="true">*</span></label>
          <input id="discord" autoComplete="username" className="field-input" placeholder="@username" aria-invalid={!!errors.discord} aria-describedby={errors.discord ? "discord-error" : undefined} {...register("discord")} />
          <FieldError id="discord-error" message={errors.discord?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className="field-label">Algerian Phone Number <span aria-hidden="true">*</span></label>
          <input id="phone" type="tel" inputMode="tel" autoComplete="tel" className="field-input" placeholder="0551234567" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : "phone-hint"} {...register("phone")} />
          <p id="phone-hint" className="mt-2 text-xs text-burgundy/48">Accepted formats: 0551234567 or +213551234567</p>
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="field-label">Availability <span aria-hidden="true">*</span></legend>
          <p className="mb-3 text-xs text-burgundy/48">Choose every day you could help.</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {availabilityDays.map((day) => (
              <label key={day} className="check-card">
                <input type="checkbox" value={day} className="peer sr-only" {...register("availability")} />
                <span className="check-indicator"><Check size={13} /></span>
                <span>{day}</span>
              </label>
            ))}
          </div>
          <FieldError id="availability-error" message={errors.availability?.message} />
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="time" className="field-label">Preferred Time Slot <span aria-hidden="true">*</span></label>
          <select id="time" className="field-input appearance-none" defaultValue="" aria-invalid={!!errors.time} aria-describedby={errors.time ? "time-error" : undefined} {...register("time")}>
            <option value="" disabled>Select a time slot</option>
            {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
          </select>
          <FieldError id="time-error" message={errors.time?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className="field-label">Additional Notes <span className="font-normal text-burgundy/40">(optional)</span></label>
          <textarea id="notes" rows={4} className="field-input resize-y" placeholder="Anything the team should know?" aria-invalid={!!errors.notes} aria-describedby={errors.notes ? "notes-error" : undefined} {...register("notes")} />
          <FieldError id="notes-error" message={errors.notes?.message} />
        </div>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
        <input type="hidden" {...register("formStartedAt", { valueAsNumber: true })} />
      </div>

      <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl border border-pink-100 bg-pink-50/70 p-4 sm:p-5">
        <input type="checkbox" className="peer sr-only" aria-describedby={errors.standCommitment ? "commitment-error" : "commitment-notice"} {...register("standCommitment")} />
        <span className="commitment-check"><Check size={15} /></span>
        <span>
          <span className="block text-sm font-bold leading-6 text-burgundy">I confirm that I will attend the Pink October awareness stand. <span aria-hidden="true">*</span></span>
          <span id="commitment-notice" className="mt-1 block text-xs leading-5 text-burgundy/55">October 25, 2026 · Faculty of Biology, USTHB</span>
        </span>
      </label>
      <FieldError id="commitment-error" message={errors.standCommitment?.message} />

      {serverError && (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold leading-6 text-rose-800">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />{serverError}
        </div>
      )}

      <button type="submit" className="button-primary mt-7 w-full" disabled={isSubmitting}>
        {isSubmitting ? <><LoaderCircle className="animate-spin" size={18} /> Saving your registration…</> : <>Count me in <ArrowRight size={18} /></>}
      </button>
      <p className="mt-4 text-center text-xs leading-5 text-burgundy/44">Your details are used only to coordinate this campaign and are never displayed publicly.</p>
    </form>
  );
}
