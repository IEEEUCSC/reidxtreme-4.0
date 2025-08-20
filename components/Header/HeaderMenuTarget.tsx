"use client";

import Link from "next/link";

interface HeaderMenuTargetProps {
  title: string;
  link: string;
  index: number;
  onClose: () => void;
}

export default function HeaderMenuTarget({
  title,
  link,
  index,
  onClose,
}: HeaderMenuTargetProps) {
  const handleLinkClick = () => {
    onClose(); // Close the menu when a link is clicked
  };

  return (
    <li className="group flex w-fit overflow-clip hover:cursor-pointer">
      <Link
        href={link}
        className="nav-link flex gap-x-2 text-white/70 uppercase transition-colors group-hover:translate-x-6 hover:text-white focus:text-white"
        onClick={handleLinkClick}
      >
        <span className="lg:text-9xl">{title}</span>
        <span className="pt-2 text-4xl">({index + 1})</span>
      </Link>
    </li>
  );
}
