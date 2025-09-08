"use client";

import type { HeaderSocialTargetProps } from "@/lib/types";
import Link from "next/link";

export default function HeaderSocialTarget({
  title,
  link,
  icon: Icon,
  onClose,
}: HeaderSocialTargetProps) {
  const handleLinkClick = () => {
    onClose(); // Close the menu when a link is clicked
  };

  return (
    <li className="flex w-fit overflow-clip hover:cursor-pointer">
      <Link
        href={link}
        className="social-link flex gap-x-2 uppercase"
        onClick={handleLinkClick}
      >
        <Icon className="h-6 w-6" />
        <span className="">{title}</span>
      </Link>
    </li>
  );
}
