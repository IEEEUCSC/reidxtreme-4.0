"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);

CustomEase.create(
  "Header-text-ease",
  "M0,0 C0.142,0.035 0.33,0.186 0.367,0.316 0.488,0.74 0.498,0.845 0.609,0.921 0.74,1.01 0.818,1.001 1,1 ",
);

export default function HeroText() {
  const ref = useRef<HTMLHeadingElement>(null);
  const introTlRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTlRef = useRef<gsap.core.Timeline | null>(null);
  const splitRef = useRef<SplitText | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      // Revert any previous split to avoid duplicates
      splitRef.current?.revert();

      // Create a new split on the actual element
      splitRef.current = new SplitText(ref.current, {
        type: "words",
        wordsClass: "hero-text-word leading-none",
      });

      const words = (splitRef.current.words || []) as HTMLElement[];
      if (!words.length) return;

      // For each word, convert it into a mask with two layers (top/bottom)
      const topLayers: HTMLElement[] = [];
      const bottomLayers: HTMLElement[] = [];

      words.forEach((wordEl) => {
        const text = wordEl.textContent || "";

        // Use the word element as the mask container
        wordEl.classList.add(
          "hero-word-mask",
          "inline-block",
          "overflow-hidden",
        );
        // Tailwind-like inline styles for safety; classes can be added in CSS if preferred
        wordEl.style.verticalAlign = "baseline";
        // Keep natural width; height should visually match one line
        // Avoid forcing explicit height to accommodate varying line-heights

        // Create top (static flow) and bottom (absolute) layers
        const topSpan = document.createElement("span");
        topSpan.className =
          "hero-word hero-word--top inline-block whitespace-nowrap";
        topSpan.textContent = text;

        const bottomSpan = document.createElement("span");
        bottomSpan.className =
          "hero-word hero-word--bottom absolute left-0 top-full whitespace-nowrap";
        bottomSpan.textContent = text;

        // Prepare container for absolute child
        wordEl.style.position = "relative";

        // Replace content with layered spans
        wordEl.textContent = "";
        wordEl.appendChild(topSpan);
        wordEl.appendChild(bottomSpan);

        topLayers.push(topSpan);
        bottomLayers.push(bottomSpan);
      });

      // Initial states for entrance
      gsap.set(topLayers, { yPercent: 120, opacity: 0 });
      gsap.set(bottomLayers, { yPercent: 0, opacity: 1 });

      // Kill any previous scroll timeline
      scrollTlRef.current?.kill();
      scrollTlRef.current = gsap.timeline({
        scrollTrigger: {
          // Start reacting as soon as the user begins to scroll the page
          trigger: document.documentElement,
          start: "top top",
          // Animate over ~80% of viewport height worth of scroll
          end: () => `+=200px`,
          scrub: 0.6, // smooth reversible scrub
          markers: false,
          invalidateOnRefresh: true,
        },
      });

      // Disable scroll-triggered timeline until intro finishes
      scrollTlRef.current.scrollTrigger?.disable();

      // Animate both layers: top goes up out of view, bottom comes up into view
      // Using ease: none for a clean scrubbed effect
      scrollTlRef.current
        .to(
          topLayers,
          {
            yPercent: -100,
            ease: "none",
            stagger: { each: 0.05 },
          },
          0,
        )
        .to(
          bottomLayers,
          {
            yPercent: -100,
            ease: "none",
            stagger: { each: 0.05 },
          },
          0,
        );

      // Entrance animation: reveal top layer first
      introTlRef.current?.kill();
      introTlRef.current = gsap.timeline({
        onComplete: () => {
          // Enable scroll after intro completes
          const st = scrollTlRef.current?.scrollTrigger;
          st?.enable();
          // Recalculate positions and sync with current scroll
          st?.refresh();
        },
      });
      introTlRef.current.to(topLayers, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "Header-text-ease",
        stagger: 0.08,
      });

      // Cleanup when scope unmounts
      return () => {
        introTlRef.current?.kill();
        scrollTlRef.current?.kill();
        splitRef.current?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <h1
      className="hero-text flex flex-col gap-y-2 uppercase lg:text-9xl"
      ref={ref}
    >
      Premier Competitive Programming Challenge.
    </h1>
  );
}
