"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    redirect("/initialround-countdown");
  }, []);
  return (
    <main className="bg-background relative min-h-screen">
      {/* <Hero /> */}
      {/* <Timeline /> */}
      {/* <Footer /> */}
    </main>
  );
}
