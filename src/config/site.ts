export const siteConfig = {
  brand: {
    name: "Open Minds Club",
    shortName: "OMC",
    logoPath: "/assets/logos/omc-placeholder.svg",
    logoAlt: "OMC text placeholder",
  },
  campaign: {
    eyebrow: "Open Minds Club presents",
    title: "Pink October 2026",
    subtitle: "Together for Awareness. Together for Hope.",
    description:
      "Join Open Minds Club in raising awareness, supporting our community, and making a meaningful difference.",
    eventDate: "October 25, 2026",
    eventDateISO: "2026-10-25",
    location: "Faculty of Biology, USTHB",
  },
  colors: {
    primary: "#B83272",
    burgundy: "#831843",
    lightPink: "#FCE7F3",
    background: "#FFF7FA",
    white: "#FFFFFF",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Activities", href: "#activities" },
    { label: "Register", href: "#register" },
  ],
  activities: [
    {
      title: "Awareness Stand",
      description: "Welcome visitors, share key messages, and help create a warm, informed space on campus.",
      label: "Connect",
    },
    {
      title: "Creative Content",
      description: "Help produce awareness reels, thoughtful visuals, and social content that reaches beyond the stand.",
      label: "Create",
    },
    {
      title: "Organization & Logistics",
      description: "Prepare decorations, materials, and activities so every detail of the campaign feels considered.",
      label: "Coordinate",
    },
  ],
  socialLinks: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
