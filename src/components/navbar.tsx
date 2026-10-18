"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between rounded-[1.35rem] border border-white/80 bg-white/82 px-4 py-3 shadow-[0_12px_45px_rgba(131,24,67,0.08)] backdrop-blur-xl sm:px-5"
      >
        <a href="#top" className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-700">
          <Image
            src={siteConfig.brand.logoPath}
            alt={siteConfig.brand.logoAlt}
            width={148}
            height={48}
            loading="eager"
            className="h-10 w-auto"
          />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <a href="#register" className="button-primary hidden min-h-11 px-5 py-2.5 text-sm sm:inline-flex">
          Join the team
        </a>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl border border-pink-100 text-burgundy sm:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-7xl rounded-[1.35rem] border border-white bg-white p-3 shadow-xl sm:hidden"
        >
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-xl px-4 py-3 font-semibold text-burgundy hover:bg-pink-50"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
