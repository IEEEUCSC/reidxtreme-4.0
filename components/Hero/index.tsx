import HeroText from "./HeroText";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full">
      <div className="absolute top-0 left-0 min-h-screen w-full">
        <video className="min-h-screen w-full object-cover">
          <source src="/model.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative container mx-auto flex min-h-screen items-end py-[70px]">
        <HeroText />
      </div>
    </section>
  );
}
