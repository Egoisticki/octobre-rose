import Image from "next/image";
import { AtSign, BriefcaseBusiness, MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";

const socialItems = [
  { label: "Instagram", href: siteConfig.socialLinks.instagram, icon: AtSign },
  { label: "Facebook", href: siteConfig.socialLinks.facebook, icon: MessageCircle },
  { label: "LinkedIn", href: siteConfig.socialLinks.linkedin, icon: BriefcaseBusiness },
];

export function Footer() {
  return (
    <footer className="bg-[#5e0f31] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-white/12 pt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Image src={siteConfig.brand.logoPath} alt={siteConfig.brand.logoAlt} width={148} height={48} className="h-11 w-auto rounded-xl bg-white p-1.5" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-pink-100/65">Pink October 2026 at USTHB. Together for awareness, together for hope.</p>
        </div>
        <div>
          <div className="flex gap-2 sm:justify-end">
            {socialItems.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} className="grid size-10 place-items-center rounded-xl border border-white/15 text-pink-100 transition hover:border-pink-200 hover:bg-white/10 hover:text-white">
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="mt-5 text-xs text-pink-100/45">© 2026 {siteConfig.brand.name}. Built for community.</p>
        </div>
      </div>
    </footer>
  );
}
