import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ReidXtreme 4.0 - Team Registration",
  description:
    "Register your team for ReidXtreme 4.0 - A premier competitive programming challenge organized by IEEE Student Branch of UCSC and ACM Student Chapter.",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
  openGraph: {
    title: "ReidXtreme 4.0 - Team Registration",
    description:
      "Register your team for ReidXtreme 4.0 - A premier competitive programming challenge organized by IEEE Student Branch of UCSC and ACM Student Chapter.",
    images: [
      {
        url: "https://cdn.jsdelivr.net/gh/IEEEUCSC/reidxtreme-4.0@main/public/img/og/register-teams.jpeg",
        width: 1200,
        height: 630,
        alt: "ReidXtreme 4.0 - Team Registration",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReidXtreme 4.0 - Team Registration",
    description:
      "Register your team for ReidXtreme 4.0 - A premier competitive programming challenge organized by IEEE Student Branch of UCSC and ACM Student Chapter.",
    images: [
      "https://cdn.jsdelivr.net/gh/IEEEUCSC/reidxtreme-4.0@main/public/img/og/register-teams.jpeg",
    ],
  },
};

export default function TeamRegistrationPage() {
  return (
    <>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
      />
      <div className="fixed inset-0 overflow-hidden">
        <iframe
          data-tally-src="https://tally.so/r/w2WErp?transparentBackground=1"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="ReidXtreme 4.0"
          className="absolute top-0 right-0 bottom-0 left-0 border-0"
        />
      </div>

      <div className="bg-background fixed right-0 bottom-[18px] z-[100] hidden h-9 w-64 sm:flex"></div>
      <div className="bg-background fixed right-0 bottom-0 z-[100] flex h-9 w-full sm:hidden"></div>
    </>
  );
}
