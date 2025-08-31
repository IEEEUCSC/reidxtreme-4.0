"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TimelineData } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { useWindowSize } from "usehooks-ts";
import SectionHeader from "../Common/SectionHeader";

gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);

export default function Timeline() {
  const horizontalScrollContainer = useRef<HTMLDivElement>(null);
  const { width = 0 } = useWindowSize();

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section");
      const totalWidth = sections.reduce(
        (acc, section) => acc + section.offsetWidth,
        0,
      );
      gsap.set(horizontalScrollContainer.current, { width: totalWidth });
      gsap.to(sections, {
        x: (totalWidth - width) * -1,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalScrollContainer.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + totalWidth,
        },
      });
    }, horizontalScrollContainer);

    return () => ctx.revert();
  });

  return (
    <div className="relative overflow-clip">
      <SectionHeader text="Timeline" className="container mx-auto mt-8" />
      <div
        className="sticky top-0 flex min-h-screen w-fit flex-col justify-center"
        ref={horizontalScrollContainer}
      >
        <div className="horizontal-section _bg-red-500 _w-[200vw] _h-screen flex grow items-center justify-start gap-x-8 px-8 lg:gap-x-32 lg:px-32">
          {TimelineData.map((item, i) => (
            <TimelineItem key={i} {...item} scrollStart={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
