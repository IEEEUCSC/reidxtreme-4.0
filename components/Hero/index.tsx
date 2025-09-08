import HeroText from "./HeroText";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full">
      
      <div className="relative container mx-auto flex min-h-screen items-end py-4 lg:py-[70px]">
        <HeroText />
      </div>
    </section>
  );
}
