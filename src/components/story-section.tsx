import { ArrowUpRight, HeartHandshake } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";

export function StorySection() {
  return (
    <section id="about" className="scroll-mt-28 bg-white px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div className="sticky top-32">
          <SectionHeading eyebrow="Why we gather" title="One Week. One Cause. One Community." />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <article className="story-card sm:col-span-2">
            <div className="icon-box"><HeartHandshake size={24} /></div>
            <p className="mt-8 max-w-2xl font-heading text-2xl font-bold leading-snug tracking-tight text-burgundy sm:text-3xl">
              Pink October is a moment to turn awareness into care—and care into action across our campus.
            </p>
            <p className="mt-5 max-w-2xl leading-7 text-burgundy/65">
              OMC is bringing students together to share reliable awareness messages, create thoughtful content, and welcome the USTHB community into an open conversation.
            </p>
          </article>

          <article className="rounded-[1.75rem] bg-pink-50 p-7 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-primary">The anchor day</p>
            <p className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-burgundy">25 October</p>
            <p className="mt-3 leading-7 text-burgundy/64">Every volunteer joins the awareness stand at the Faculty of Biology.</p>
          </article>

          <article className="rounded-[1.75rem] bg-burgundy p-7 text-white sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-pink-200">Your contribution</p>
            <p className="mt-5 font-heading text-3xl font-extrabold tracking-tight">Made together.</p>
            <a href="#activities" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-pink-100 hover:text-white">
              Find your role <ArrowUpRight size={17} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
