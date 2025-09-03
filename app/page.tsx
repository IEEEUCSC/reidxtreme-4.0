import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="bg-background relative min-h-screen">
      <Hero />
       <Timeline />
      <Footer />
    </main>
  );
}
