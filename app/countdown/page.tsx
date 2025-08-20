"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Countdown configuration
const countdownConfig = {
  title: "ReidXtreme 4.0 - Final Round",
  description: "The ultimate 8-hour coding challenge is about to begin!",
  targetDate: "2025-08-20T20:00:00", // Set your target date and time here
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
    <main className="from-background via-background to-muted/20 relative flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="flex w-full max-w-4xl flex-col items-center gap-y-8 text-center">
        {/* Logo */}
        <div className="mb-4">
          <Image
            src={countdownConfig.logo}
            alt="ReidXtreme 4.0 Logo"
            width={120}
            height={120}
            className="h-auto w-24 md:w-32"
            priority
          />
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-foreground text-4xl font-bold md:text-6xl lg:text-7xl">
            {countdownConfig.title}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl">
            {countdownConfig.description}
          </p>
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
              🚀 Time's Up!
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              ReidXtreme 4.0 has begun! Good luck to all participants!
            </p>
          </div>
        )}

        {/* Additional Info */}
        <div className="bg-card border-border rounded-xl border p-6 text-center">
          <h3 className="text-foreground mb-2 text-xl font-semibold">
            Get Ready!
          </h3>
          <p className="text-muted-foreground">
            Make sure you have your development environment set up and ready to
            go. The competition will be intense!
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-3">
          <StatusCard
            icon="🏆"
            title="Competition"
            status="Starting Soon"
            color="text-yellow-400"
          />
          <StatusCard
            icon="⏰"
            title="Duration"
            status="8 Hours"
            color="text-blue-400"
          />
          <StatusCard
            icon="🎯"
            title="Goal"
            status="Solve & Win"
            color="text-green-400"
          />
        </div>
      </div>
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
