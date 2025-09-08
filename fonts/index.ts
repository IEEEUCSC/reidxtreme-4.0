import localFont from "next/font/local";

export const BPMono = localFont({
  src: [
    {
      path: "../fonts/BPmono.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/BPmonoBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-bpmono",
});
