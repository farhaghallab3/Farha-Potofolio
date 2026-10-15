import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/data";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});

const description =
  "Farha Ghallab is a Full-Stack Software Developer in Alexandria, Egypt, building products from interface to infrastructure with React, Next.js, Django and AI integrations.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Farha Ghallab — Full-Stack Software Developer", template: "%s · Farha Ghallab" },
  description,
  keywords: ["Full-Stack Developer", "React", "Next.js", "Django", "Python", "Alexandria", "Egypt"],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    title: "Farha Ghallab — Full-Stack Software Developer",
    description,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0c" },
  ],
};

// Runs before paint: applies a saved theme and flags JS for reveal animations.
const boot = `try{var d=document.documentElement;d.classList.add("js");var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Alexandria", addressCountry: "EG" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["React", "Next.js", "TypeScript", "Python", "Django", "PostgreSQL", "Docker"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
