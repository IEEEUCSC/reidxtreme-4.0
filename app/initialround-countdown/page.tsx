import { cn } from "@/lib/utils";
import HeroBgImage from "@/assets/hero-bg.png";
import CountdownTimer from "./CountDownTimer";
import Image from "next/image";

const END_TIME = new Date("2025-09-06T16:00:00"); // Final round end time
const CRITICAL_HOURS = 2; // Critical period in hours (e.g., 3 hours before the end)

export default function Page() {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center border p-8",
      )}
    >
      {/* <HeroBgImage /> */}
      <Image
        src={HeroBgImage}
        alt="Hero Background"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      <div className="relative container mx-auto flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-4 py-8 shadow-lg backdrop-blur-lg lg:gap-y-8 lg:p-16">
        <h1 className="w-full text-lg font-bold text-slate-100 lg:text-2xl xl:text-4xl">
          Initial Round Countdown: The Battle Begins
        </h1>
        <CountdownTimer
          endTime={END_TIME}
          criticalHours={CRITICAL_HOURS}
          className="font-bpmono text-4xl xl:text-9xl"
          criticalClassName="text-primary-300 font-bold "
        />
      </div>
    </main>
  );
}
