"use client";

import { useEffect, useState } from "react";
import BubbleUpButton from "../ui/BubbleUpButton/BubbleUpButton";
import HeaderMenu from "./HeaderMenu";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Start closing animation
      setIsMenuOpen(false);
      // Component will be unmounted after animation completes
    } else {
      // Mount component first, then start opening animation
      setIsMounted(true);
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        setIsMenuOpen(true);
      }, 10);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    // Component will be unmounted after animation completes
  };

  const handleAnimationComplete = (isOpening: boolean) => {
    if (!isOpening) {
      // Animation finished closing, now unmount
      setIsMounted(false);
    }
  };

  useEffect(() => {
    console.log("HeaderMenu state", { isMenuOpen, isMounted });
  }, [isMenuOpen, isMounted]);

  return (
    <header className="fixed inset-0 top-0 z-[9999] container mx-auto flex h-fit min-h-[70px] w-full flex-col items-center justify-between">
      {isMounted && (
        <HeaderMenu
          isMenuOpen={isMenuOpen}
          onClose={closeMenu}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
      <div className="flex w-full items-center justify-between py-2">
        <div className="relative z-[999]">
          <h1>logo</h1>
        </div>
        <div className="relative flex items-center gap-x-4">
          <BubbleUpButton className="flex w-fit cursor-pointer px-4 py-2 transition-all duration-300 hover:border-[rgba(0,160,116,1)]">
            <span>Register button</span>
          </BubbleUpButton>
          <button
            className="group flex w-10 flex-col gap-y-1 hover:cursor-pointer"
            onClick={toggleMenu}
          >
            <span
              className={cn(
                "ml-auto h-0.5 w-[70%] rounded-full bg-white transition-[width] group-hover:w-full",
                { "w-full": isMenuOpen },
              )}
            />
            <span
              className={cn(
                "mx-auto h-0.5 w-[70%] rounded-full bg-white transition-[width] group-hover:w-full",
                { "w-full": isMenuOpen },
              )}
            />
            <span
              className={cn(
                "mr-auto h-0.5 w-[70%] rounded-full bg-white transition-[width] group-hover:w-full",
                { "w-full": isMenuOpen },
              )}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
