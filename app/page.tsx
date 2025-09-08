"use client";

import ScrollBackground from "@/components/ScrollFrames/ScrollBackground";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  
    const handleFrameProgress = (progress: number) => {
    console.log("Frame progress:", progress);
  };
  return (
    <>
       <ScrollBackground/>
    <main className=" relative min-h-screen">
      <Hero />
     <Timeline />
      <Footer /> 
    </main>
</>
  );
}
