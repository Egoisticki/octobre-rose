"use client";

import { ArrowDownRight, ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

import { siteConfig } from "@/config/site";

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section id="top" className="hero-shell relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:min-h-[900px] lg:pb-28">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <Image
        src="/assets/decorations/ribbon-outline.svg"
        alt=""
        width={210}
        height={300}
        loading="eager"
        className="pointer-events-none absolute -right-10 top-44 w-52 rotate-12 opacity-80 sm:right-[6%] sm:w-64 lg:right-[3%] lg:top-28 lg:w-80"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
          <motion.div variants={reveal} transition={{ duration: 0.55 }} className="eyebrow">
            <Sparkles size={15} />
            {siteConfig.campaign.eyebrow}
          </motion.div>

          <motion.h1
            variants={reveal}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mt-7 max-w-4xl font-heading text-[clamp(3.55rem,9vw,8.2rem)] font-extrabold uppercase leading-[.86] tracking-[-0.075em] text-burgundy"
          >
            Pink
            <span className="block bg-gradient-to-r from-primary via-pink-500 to-rose-400 bg-clip-text text-transparent">
              October
            </span>
            <span className="ml-[.08em] text-[.31em] tracking-[.22em] text-burgundy/45">2026</span>
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="mt-7 max-w-2xl font-heading text-xl font-bold tracking-tight text-burgundy sm:text-2xl"
          >
            {siteConfig.campaign.subtitle}
          </motion.p>
          <motion.p
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="mt-4 max-w-xl text-base leading-7 text-burgundy/68 sm:text-lg sm:leading-8"
          >
            {siteConfig.campaign.description}
          </motion.p>

          <motion.div variants={reveal} transition={{ duration: 0.55 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#register" className="button-primary">
              Become a volunteer <ArrowRight size={18} />
            </a>
            <a href="#activities" className="button-secondary">
              Explore activities <ArrowDownRight size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="campaign-card relative overflow-hidden rounded-[2.25rem] border border-white/85 bg-white/75 p-6 shadow-[0_30px_90px_rgba(131,24,67,0.16)] backdrop-blur-xl sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-[.22em] text-primary">Campaign anchor</span>
                <p className="mt-2 font-heading text-2xl font-bold tracking-tight text-burgundy">Show up for hope.</p>
              </div>
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-burgundy text-white shadow-lg shadow-pink-900/15">🎗️</span>
            </div>

            <div className="mt-9 grid gap-3">
              <div className="event-detail">
                <CalendarDays size={19} />
                <div>
                  <span>Date</span>
                  <strong>{siteConfig.campaign.eventDate}</strong>
                </div>
              </div>
              <div className="event-detail">
                <MapPin size={19} />
                <div>
                  <span>Location</span>
                  <strong>{siteConfig.campaign.location}</strong>
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-pink-100 pt-6">
              <div className="flex items-center justify-between text-sm font-bold text-burgundy">
                <span>One week</span><span>One cause</span><span>One community</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-pink-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "76%" }}
                  transition={{ delay: 0.9, duration: 1.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-burgundy to-pink-400"
                />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-7 -left-5 rounded-2xl border border-white bg-white px-5 py-4 shadow-xl sm:-left-10">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Your part matters</p>
            <p className="mt-1 font-heading text-sm font-bold text-burgundy">Create • Connect • Care</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
