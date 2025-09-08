"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

export interface SectionHeaderProps {
  /** Header text to display */
  text: string;
  /** Optional extra class names */
  className?: string;
  /** HTML heading level (defaults to h2) */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** ScrollTrigger start position (advanced override) */
  start?: string;
  /** ScrollTrigger end position (advanced override) */
  end?: string;
  /** Vertical offset (in px) the header animates from */
  fromY?: number;
  /** Animation duration */
  duration?: number;
  /** Easing */
  ease?: string;
  /** Stagger between lines */
  lineStagger?: number;
}

/**
 * SectionHeader – displays a heading with a GSAP ScrollTrigger "flow-up" reveal.
 */
export default function SectionHeader({
  text,
  className,
  as: Tag = "h1",
  start = "top 85%",
  end = "bottom 60%",
  fromY = 40,
  duration = 1.2,
  ease = "power3.in",
  lineStagger = 0.08,
}: SectionHeaderProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      // Kill previous tweens
      gsap.killTweensOf(ref.current);

      // Split into lines (mask wrappers created by SplitText)
      const split = new SplitText(ref.current, {
        type: "lines",
        mask: "lines",
      });

      // Ensure lines start hidden/offset
      gsap.set(split.lines, { y: fromY, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          // markers: true, // debug
        },
      });

      tl.to(split.lines, {
        y: 0,
        opacity: 1,
        ease,
        duration,
        stagger: lineStagger,
        force3D: true,
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        split.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      className={cn(
        "relative text-3xl leading-tight text-balance md:text-4xl lg:text-6xl xl:text-8xl", // base styles
        "overflow-visible will-change-transform", // allow mask wrappers to show overflow where needed
        className,
      )}
    >
      {text}
    </Tag>
  );
}
