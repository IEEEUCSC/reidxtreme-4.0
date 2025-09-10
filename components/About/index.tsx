import TextScroll from "./TextScroll";

export default function About() {
  return (
    <section className="relative min-h-screen w-full">
      <div className="relative container mx-auto flex min-h-screen items-end py-4 lg:py-[70px]">
        <div className="grid-cols-2 md:grid">
          <div></div>
          <div>
            <TextScroll className="text-3xl font-medium" selector="about-1">
              ReidXtreme 4.0 is the flagship inter-university competitive
              programming hackathon organized by IEEE Student Branch and ACM
              Student Chapter of UCSC, enhancing algorithmic thinking and coding
              skills among undergraduate students.
            </TextScroll>
            <br />
            <br />
            <TextScroll className="text-3xl font-medium" selector="about-1">
              The competition features an online preliminary round and an 8-hour
              onsite finale. Beyond coding, it offers industry workshops,
              networking opportunities, and exposure to emerging technologies.
            </TextScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
