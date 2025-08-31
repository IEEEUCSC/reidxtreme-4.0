"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import type { TimelineItemProps } from "@/lib/types";

gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);

CustomEase.create(
  "timeline-item-ease",
  "M0,0 C0.142,0.035 0.33,0.186 0.367,0.316 0.488,0.74 0.498,0.845 0.609,0.921 0.74,1.01 0.818,1.001 1,1 ",
);

interface _TimelineItemProps extends TimelineItemProps {
  scrollStart: number;
}

export default function TimelineItem(props: _TimelineItemProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const itemRef = useRef<HTMLDivElement>(null);
  const date = useRef<HTMLHeadingElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const description = useRef<HTMLParagraphElement>(null);

  const scrollGapAmount = isDesktop ? 128 * 1.5 : 32 * 1.5;

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const splitDate = new SplitText(date.current, {
        type: "words, chars",
        mask: "chars",
      });
      const splitTitle = new SplitText(title.current, {
        type: "lines",
        mask: "lines",
      });
      const splitDescription = new SplitText(description.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
      });

      const tl = gsap.timeline({
        ease: "timeline-item-ease",
        scrollTrigger: {
          trigger: itemRef.current,
          start: () =>
            "top+=" +
            ((itemRef.current ? itemRef.current.offsetWidth : 200) *
              props.scrollStart +
              props.scrollStart * scrollGapAmount) +
            " center",
          end: () =>
            "+=" + (itemRef.current ? itemRef.current.offsetHeight * 1.5 : 200),
          scrub: true,
          // markers: true,
        },
      });

      tl.from(splitDate.chars, {
        y: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      });
      tl.from(splitTitle.lines, {
        y: 100,
        opacity: 0,
        duration: 0.45,
        stagger: 0.1,
      });
      tl.from(splitDescription.lines, {
        y: 100,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
      });
    }, itemRef);

    return () => ctx.revert();
  });

  return (
    <div
      className="_bg-purple-500 flex min-h-[200px] min-w-[600px] flex-col gap-y-4 text-white"
      ref={itemRef}
    >
      <h3 className="lg:text-9xl" ref={date}>
        {props.date}
      </h3>
      <div className="flex flex-col gap-y-2">
        <h2 className="font-bold lg:text-3xl" ref={title}>
          {props.title}
        </h2>
        <p className="mt-4 lg:text-lg" ref={description}>
          {props.description}
        </p>
      </div>
    </div>
  );
}
