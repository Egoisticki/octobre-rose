import { CalendarCheck2, MapPinned, ShieldCheck } from "lucide-react";

import { RegistrationForm } from "@/components/registration-form";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/site";

export function RegistrationSection() {
  return (
    <section id="register" className="scroll-mt-16 bg-burgundy px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Volunteer registration"
            title="Bring your energy. We’ll build the rest together."
            description="Tell us when you are available and where you would like to help. The OMC team will use your details only to organize the campaign."
            light
          />

          <div className="mt-10 grid gap-3">
            <div className="dark-detail"><CalendarCheck2 size={20} /><div><span>Mandatory stand</span><strong>{siteConfig.campaign.eventDate}</strong></div></div>
            <div className="dark-detail"><MapPinned size={20} /><div><span>Meet us at</span><strong>{siteConfig.campaign.location}</strong></div></div>
            <div className="dark-detail"><ShieldCheck size={20} /><div><span>Your privacy</span><strong>Details stay with the coordination team</strong></div></div>
          </div>

          <aside className="mt-8 rounded-[1.5rem] border border-pink-300/20 bg-white/7 p-5 text-sm leading-6 text-pink-100/78">
            <strong className="block text-white">Important notice</strong>
            All registered volunteers must participate in the Pink October awareness stand on October 25, 2026, at the Faculty of Biology, USTHB.
          </aside>
        </div>

        <RegistrationForm />
      </div>
    </section>
  );
}
