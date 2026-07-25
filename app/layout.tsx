import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const baseUrl = host ? new URL(`${protocol}://${host}`) : new URL("https://skyward-aerial-drone.angelwingsuas.chatgpt.site");
  const title = "AngelWingsUAS | Drone Services & Technology Solutions";
  const description =
    "FAA-certified drone services, aerial media, inspections, mapping support, custom web applications, AI tools, and automation for Southern California.";

  return {
    metadataBase: baseUrl,
    title,
    description,
    icons: {
      icon: "/angel-wings-uas-logo-cropped.png",
      apple: "/angel-wings-uas-logo-cropped.png",
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: new URL("/og.png", baseUrl), width: 1774, height: 887, alt: "AngelWingsUAS — Perspective with Purpose" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/og.png", baseUrl)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
