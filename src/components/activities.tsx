import { Brush, Megaphone, PackageCheck } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site";

const icons = [Megaphone, Brush, PackageCheck];
const numbers = ["01", "02", "03"];

export function Activities() {
  return (
    <section id="activities" className="scroll-mt-20 bg-background px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Choose your contribution"
            title="Three ways to make a difference."
            description="Bring your energy, ideas, or organizational spark. Every role supports one shared campaign."
          />
          <p className="max-w-sm text-sm leading-6 text-burgundy/55">No special experience is required—just curiosity, reliability, and a willingness to work with the team.</p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {siteConfig.activities.map((activity, index) => {
            const Icon = icons[index];
            return (
              <article key={activity.title} className="activity-card group">
                <div className="flex items-center justify-between">
                  <div className="icon-box transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"><Icon size={24} /></div>
                  <span className="font-heading text-4xl font-extrabold text-pink-100">{numbers[index]}</span>
                </div>
                <p className="mt-10 text-xs font-extrabold uppercase tracking-[.22em] text-primary">{activity.label}</p>
                <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-burgundy">{activity.title}</h3>
                <p className="mt-4 leading-7 text-burgundy/62">{activity.description}</p>
                <div className="mt-9 h-px bg-pink-100 transition-colors duration-300 group-hover:bg-primary/40" />
                <p className="mt-5 text-sm font-bold text-burgundy">I can help here <span aria-hidden="true">↗</span></p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
