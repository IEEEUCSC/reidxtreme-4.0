import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ReidXtreme 4.0 - Team Registration",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

export default async function TeamRegistrationPage() {
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

      <div className="bg-background fixed right-[18px] bottom-[18px] z-[100] flex h-9 w-64"></div>
    </>
  );
}
