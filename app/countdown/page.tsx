"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { WavyBackground } from "@/components/ui/wavy-background";
import { TextShimmer } from "@/components/motion-primitives/text-shimmer";

// Countdown configuration
const countdownConfig = {
  title: "Final Round",
  description: "Race the Clock - Time remaining:",
  targetDate: "2025-10-18T17:00:00", // Set your target date and time here
  logo: "/img/logo.png",
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(countdownConfig.targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Animated gradient background layer */}
      <WavyBackground className="mx-auto max-w-4xl pb-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        >
          <div className="gradient-animated absolute inset-[-20%]" />
          {/* subtle vignette */}
          <div className="absolute inset-0" />
        </div>
        <div className="flex w-full max-w-4xl flex-col items-center gap-y-8 text-center">
          {/* Logo */}
          <div className="mb-4">
            <Image
              src={countdownConfig.logo}
              alt="ReidXtreme 4.0 Logo"
              width={120}
              height={120}
              className="h-auto w-24 md:w-48"
              priority
            />
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-foreground text-4xl font-bold md:text-6xl lg:text-7xl">
              {countdownConfig.title}
            </h1>
            <TextShimmer
              className="text-lg md:text-xl lg:text-2xl"
              duration={10}
            >
              {countdownConfig.description}
            </TextShimmer>
          </div>

          {/* Countdown Display */}
          {!isExpired ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              <TimeCard value={timeLeft.days} label="Days" />
              <TimeCard value={timeLeft.hours} label="Hours" />
              <TimeCard value={timeLeft.minutes} label="Minutes" />
              <TimeCard value={timeLeft.seconds} label="Seconds" />
            </div>
          ) : (
            <div className="bg-card border-border animate-pulse rounded-2xl border p-8">
              <h2 className="text-3xl font-bold text-[rgba(0,160,116)] md:text-4xl">
                ⏰ Time&apos;s Up!
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                The Final Round window is now closed.
              </p>
            </div>
          )}
        </div>
      </WavyBackground>
    </main>
  );
}

interface TimeCardProps {
  value: number;
  label: string;
}

const TimeCard = ({ value, label }: TimeCardProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [value, displayValue]);

  return (
    <div className="bg-card border-border flex flex-col items-center rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(0,160,116,0.3)] hover:shadow-lg">
      <div className="relative overflow-hidden">
        <div
          className={`text-4xl font-bold text-[rgba(0,160,116)] transition-all duration-300 md:text-5xl lg:text-6xl ${
            isAnimating
              ? "scale-110 transform opacity-60"
              : "scale-100 transform opacity-100"
          }`}
        >
          {displayValue.toString().padStart(2, "0")}
        </div>
      </div>
      <div className="text-muted-foreground mt-2 text-sm font-medium tracking-wider uppercase md:text-base">
        {label}
      </div>
    </div>
  );
};

interface StatusCardProps {
  icon: string;
  title: string;
  status: string;
  color: string;
}

const StatusCard = ({ icon, title, status, color }: StatusCardProps) => {
  return (
    <div className="bg-card border-border rounded-lg border p-4 text-center">
      <div className="mb-2 text-2xl">{icon}</div>
      <h4 className="text-foreground mb-1 text-sm font-semibold">{title}</h4>
      <p className={`text-sm font-medium ${color}`}>{status}</p>
    </div>
  );
};
