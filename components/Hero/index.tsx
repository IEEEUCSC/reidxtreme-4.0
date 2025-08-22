import HeroText from "./HeroText";

export default function Hero() {
  return (
    <section className="min-h-screen w-full">
      <div className="container mx-auto flex min-h-screen items-end py-[70px]">
        <HeroText />
      </div>
    </section>
  );
}
