"use client";

import { BPMono } from "@/fonts";
import { cn } from "@/lib/utils";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: Date | number; // End time as Date object or timestamp
  criticalHours?: number; // Hours before end when critical styling applies
  className?: string;
  criticalClassName?: string;
}

export const START_TIME = new Date("2025-06-09T09:15:00");

export default function CountdownTimer({
  endTime,
  criticalHours = 2,
  className = "",
  criticalClassName = "text-red-500 font-bold",
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isCritical, setIsCritical] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const current = new Date().getTime();
      const start = START_TIME.getTime();
      const end = typeof endTime === "number" ? endTime : endTime.getTime();

      if (current < start) {
        // If current time is before the start time, set remaining to 0
        setTimeRemaining(0);
        setIsActive(false);
        setStatusMessage("Countdown initiates soon.");
        return;
      }

      // Calculate remaining time
      const remaining = Math.max(0, end - current);
      setTimeRemaining(remaining);

      // Check if we're in the critical period
      const criticalTimeInMs = criticalHours * 60 * 60 * 1000;
      setIsCritical(remaining > 0 && remaining <= criticalTimeInMs);

      // If countdown is over
      if (remaining <= 0) {
        setIsActive(false);
        setStatusMessage("Time’s up — the countdown has reached zero.");
      } else {
        setIsActive(true);
        setStatusMessage("");
      }
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Then set up interval to update every second
    const timerInterval = setInterval(calculateTimeRemaining, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timerInterval);
  }, [endTime, criticalHours]);

  // Convert milliseconds to hours, minutes, seconds
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Format time values to always have two digits
  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return isActive === true ? (
    <NumberFlowGroup>
      <div
        className={cn(
          "font-bpmono relative grid grid-cols-[1fr_1fr_1fr] items-center gap-x-2 px-4 text-slate-100 *:text-right *:text-5xl lg:*:text-[12rem] ",
          className,
          isCritical && criticalClassName,
          BPMono.variable,
        )}
        style={
          {
            fontVariantNumeric: "tabular-nums",
            "--number-flow-char-height": "0.85em",
          } as React.CSSProperties
        }
      >
        <NumberFlow
          value={parseInt(formatTime(hours))}
          format={{ minimumIntegerDigits: 2 }}
        />
        <NumberFlow
          value={parseInt(formatTime(minutes))}
          prefix=":"
          format={{ minimumIntegerDigits: 2 }}
        />
        <NumberFlow
          value={parseInt(formatTime(seconds))}
          format={{ minimumIntegerDigits: 2 }}
          prefix=":"
          isolate={true}
          willChange={true}
        />
      </div>
    </NumberFlowGroup>
  ) : (
    <h1>
      <span className="text-primary-100 text-xl font-bold lg:text-3xl xl:text-5xl">
        {statusMessage || "Countdown has ended"}
      </span>
    </h1>
  );
}
