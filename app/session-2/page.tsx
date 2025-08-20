"use client";

import { CheckCheck, ExternalLink } from "lucide-react";
import BubbleUpButton from "@/components/ui/BubbleUpButton/BubbleUpButton";
import { useEffect, useState } from "react";

// Workshop data
const workshopData = {
  subheading: "Workshop 2",
  title: "Getting Started with Algorithms in Competitive Programming",
  description:
    "This workshop will introduce participants to the fundamental algorithms used in competitive programming, providing practical insights into their applications and preparing participants to approach problem solving with greater efficiency and confidence.",
  meetingLink:
    "https://zoom.us/j/92957770964?pwd=bItSG9nGA725wzyFcygSzqR6cthPiM.1", // Replace with actual meeting link
  redirectDelay: 5, // seconds
};

export default function Workshop2Page() {
  const [countdown, setCountdown] = useState(workshopData.redirectDelay);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1 && !redirected) {
          setRedirected(true);
          window.open(workshopData.meetingLink, "_blank");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [redirected]);

  const handleJoinNow = () => {
    setRedirected(true);
    window.open(workshopData.meetingLink, "_blank");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col items-center gap-y-6">
        <WorkshopCard
          subheading={workshopData.subheading}
          title={workshopData.title}
          description={workshopData.description}
          countdown={countdown}
          onJoinNow={handleJoinNow}
          onGoBack={handleGoBack}
          redirected={redirected}
        />
      </div>
    </main>
  );
}

interface WorkshopCardProps {
  title: string;
  subheading: string;
  description: string;
  countdown: number;
  onJoinNow: () => void;
  onGoBack: () => void;
  redirected: boolean;
}

const WorkshopCard = ({
  title,
  subheading,
  description,
  countdown,
  onJoinNow,
  redirected,
}: WorkshopCardProps) => {
  return (
    <div className="bg-card border-border flex w-full flex-col gap-y-6 rounded-2xl border p-6 backdrop-blur-sm lg:p-8">
      <div className="flex flex-col gap-y-4 lg:gap-y-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase lg:text-sm">
            {subheading}
          </p>
          <span className="rounded-full border border-blue-500/50 bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400">
            Live Now
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-2">
          <h1 className="text-2xl font-semibold text-[rgba(0,160,116)] lg:text-4xl">
            {title}
          </h1>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed lg:text-base">
          {description}
        </p>

        <div className="rounded-lg p-4 text-center">
          <p className="text-sm font-medium lg:text-lg">
            Session starts at 7:00 PM
          </p>
        </div>

        {!redirected && countdown > 0 && (
          <div className="bg-muted/20 rounded-lg p-4 text-center">
            <p className="text-foreground mb-2 text-sm lg:text-base">
              Redirecting to meeting in:
            </p>
            <p className="text-2xl font-bold text-[rgba(0,160,116)] lg:text-3xl">
              {countdown}s
            </p>
          </div>
        )}

        {redirected && (
          <div className="bg-muted rounded-lg p-6 text-center">
            <p className="border-[rgba(0,160,116,0.5)] text-sm lg:text-base">
              <CheckCheck className="mr-1 inline-block text-[rgba(0,160,116)]" />{" "}
              Meeting opened in new tab
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-3">
        <button onClick={onJoinNow} className="group">
          <BubbleUpButton className="group flex w-full cursor-pointer gap-x-2 border-[rgba(0,160,116,0.5)] bg-[rgba(0,160,116,0.1)] py-2 transition-all duration-300 hover:border-[rgba(0,160,116,1)] lg:py-4 lg:text-xl">
            Join Meeting Now{" "}
            <ExternalLink
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110"
              strokeWidth={1.5}
              size={20}
            />
          </BubbleUpButton>
        </button>
      </div>
    </div>
  );
};
