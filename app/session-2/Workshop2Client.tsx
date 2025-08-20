"use client";

import { CheckCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import BubbleUpButton from "@/components/ui/BubbleUpButton/BubbleUpButton";
import { useEffect, useState } from "react";

interface WorkshopData {
  subheading: string;
  title: string;
  description: string;
  speaker: {
    name: string;
    title: string;
    description: string;
    image: string;
  };
  sessionTime: string;
  meetingLink: string;
  redirectDelay: number;
}

interface Workshop2ClientProps {
  workshopData: WorkshopData;
}

export default function Workshop2Client({
  workshopData,
}: Workshop2ClientProps) {
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
  }, [redirected, workshopData.meetingLink]);

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
          speaker={workshopData.speaker}
          countdown={countdown}
          sessionTime={workshopData.sessionTime}
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
  sessionTime: string;
  speaker: {
    name: string;
    title: string;
    description: string;
    image: string;
  };
  countdown: number;
  onJoinNow: () => void;
  onGoBack: () => void;
  redirected: boolean;
}

const WorkshopCard = ({
  title,
  subheading,
  description,
  speaker,
  sessionTime,
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

        {/* Speaker Section */}
        <div className="bg-muted/20 border-muted/50 rounded-xl border p-3">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
            <div className="flex-shrink-0">
              <Image
                src={speaker.image}
                alt={`${speaker.name} - Speaker`}
                width={120}
                height={120}
                className="border-border/20 w-full rounded-lg border object-cover lg:size-42"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-foreground mb-1 text-lg font-semibold lg:text-xl">
                {speaker.name}
              </h3>
              <p className="text-muted-foreground mb-2 text-sm lg:text-base">
                {speaker.title}
              </p>
              <p className="text-muted-foreground mb-2 text-sm lg:text-base">
                Session starts at {sessionTime}
              </p>
              <p className="text-muted-foreground hidden text-sm leading-relaxed lg:block">
                {speaker.description}
              </p>
            </div>
          </div>
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
          <BubbleUpButton className="group flex w-full cursor-pointer gap-x-2 border-[rgba(0,160,116,0.5)] bg-[rgba(0,160,116,0.1)] py-4 transition-all duration-300 hover:border-[rgba(0,160,116,1)] lg:text-xl">
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
