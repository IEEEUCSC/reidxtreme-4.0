"use client";

import ScrollBackground from "@/components/ScrollFrames/ScrollBackground";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";

import About from "@/components/About";

export default function Home() {
  const handleFrameProgress = (progress: number) => {
    console.log("Frame progress:", progress);
  };
  //   useEffect(() => {
  //   redirect("/initialround-countdown");
  // }, []);
  return (
    <>
      <ScrollBackground />
      <main className="relative min-h-screen">
        <Hero />
        <section className="relative min-h-[50vh] w-full"></section>
        <About />
        <Timeline />
        <Footer />
      </main>
    </>
  );
}
