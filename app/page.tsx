"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollBackground from "@/components/ScrollFrames/ScrollBackground";

export default function Home() {
  const handleFrameProgress = (progress: number) => {
    console.log("Frame progress:", progress);
  };

  return (
    <>
     
      <ScrollBackground
       
      />

     
      <main className="relative z-10 min-h-[400vh]">
       
      </main>
    </>
  );
}
