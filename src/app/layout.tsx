import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { SkipLink } from "@/components/skip-link";
import "./globals.css";
import { SITE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ericalohjones.com"),
  title: `${SITE.name} — Design Advisory for Sports, Media & Fan Platforms`,
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: `${SITE.name} — Design Advisory for Sports, Media & Fan Platforms`,
    description: SITE.description,
    url: "https://ericalohjones.com",
    siteName: SITE.name,
    locale: "en_US",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Design Advisory for Sports, Media & Fan Platforms`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col font-sans">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
