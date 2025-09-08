import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { ReactLenis } from "lenis/react";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReidXtreme 4.0",
  description:
    "A premier competitive programming challenge organized by IEEE Student Branch of UCSC and ACM Student Chapter. Hone your problem-solving skills and prepare for IEEEXtreme 19.0.",
  openGraph: {
    title: "ReidXtreme 4.0",
    description:
      "A premier competitive programming challenge organized by IEEE Student Branch of UCSC and ACM Student Chapter. Hone your problem-solving skills and prepare for IEEEXtreme 19.0.",
    images: [
      {
        url: "https://cdn.jsdelivr.net/gh/IEEEUCSC/reidxtreme-4.0@main/public/email-assets/cover.png",
        width: 1200,
        height: 630,
        alt: "ReidXtreme 4.0 - Premier Competitive Programming Challenge",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReidXtreme 4.0",
    description:
      "A premier competitive programming challenge organized by IEEE Student Branch of UCSC and ACM Student Chapter. Hone your problem-solving skills and prepare for IEEEXtreme 19.0.",
    images: [
      {
        url: "https://cdn.jsdelivr.net/gh/IEEEUCSC/reidxtreme-4.0@main/public/email-assets/cover.png",
        alt: "ReidXtreme 4.0 - Premier Competitive Programming Challenge",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background relative antialiased`}
      >
       {/* <ReactLenis
          root
          options={{
            lerp: 0.04, // Slightly reduced for better frame sync
            duration: 1.0, // Reduced duration
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.8, // Reduced for better control
            touchMultiplier: 1.5, // Reduced for better mobile control
            infinite: false,
          }}
        >  */}
          <Header />
          {children}
         {/* </ReactLenis> */}

        {/* <Header /> */}
        {children}

      </body>
    </html>
  );
}
