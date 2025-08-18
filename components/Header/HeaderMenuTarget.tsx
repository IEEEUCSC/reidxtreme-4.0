"use client";

import Link from "next/link";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

interface HeaderMenuTargetProps {
  title: string;
  link: string;
  index: number;
}

export default function HeaderMenuTarget({
  title,
  link,
  index,
}: HeaderMenuTargetProps) {
  const container = useRef<HTMLLIElement>(null);

  useGSAP(
    () => {
      // gsap code here...
      let split = new SplitText(".nav-link", {
        type: "chars",
        mask: "chars",
        // tag: "span",
        charsClass: "inline-flex",
      });
      gsap.from(split.chars, {
        y: "100%",
        stagger: 0.1,
        delay: 0.2 * index,
        onComplete: () => split.revert(),
      }); // <-- automatically reverted
    },
    { scope: container },
  );

  return (
    <li
      className="group flex w-full hover:cursor-pointer"
      ref={container}
    >
      <Link
        href={link}
        className="nav-link block uppercase transition-transform duration-300 group-hover:translate-x-6 lg:text-9xl"
      >
        {title}
      </Link>
    </li>
  );
}
