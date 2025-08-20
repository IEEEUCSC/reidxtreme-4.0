"use client";

import { useEffect, useState } from "react";
import BubbleUpButton from "../ui/BubbleUpButton/BubbleUpButton";
import HeaderMenu from "./HeaderMenu";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    // Prevent toggling if animation is in progress
    if (isAnimating) {
      console.log("Toggle blocked: Animation in progress");
      return;
    }

    if (isMenuOpen) {
      // Start closing animation
      console.log("Starting close animation");
      setIsAnimating(true);
      setIsMenuOpen(false);
      // Component will be unmounted after animation completes
    } else {
      // Mount component first, then start opening animation
      console.log("Starting open animation - mounting component");
      setIsAnimating(true);
      setIsMounted(true);
      // Increased delay to ensure DOM is fully ready
      setTimeout(() => {
        console.log("Setting menu open state");
        setIsMenuOpen(true);
      }, 50); // Increased from 10ms to 50ms
    }
  };

  const closeMenu = () => {
    // Prevent closing if animation is in progress
    if (isAnimating) {
      console.log("Close blocked: Animation in progress");
      return;
    }

    console.log("Starting close animation from menu");
    setIsAnimating(true);
    setIsMenuOpen(false);
    // Component will be unmounted after animation completes
  };

  const handleAnimationComplete = (isOpening: boolean) => {
    console.log("Animation complete:", { isOpening });
    setIsAnimating(false); // Reset animation state

    if (!isOpening) {
      // Animation finished closing, now unmount
      console.log("Unmounting menu component");
      setIsMounted(false);
    }
  };

  useEffect(() => {
    console.log("HeaderMenu state", { isMenuOpen, isMounted, isAnimating });

    // Handle keyboard accessibility
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen && !isAnimating) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isMounted, isAnimating]);

  return (
    <header className="fixed inset-0 top-0 z-[9999] container mx-auto flex h-fit min-h-[70px] w-full flex-col items-center justify-between px-2">
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
            <span>Register now</span>
          </BubbleUpButton>
          <button
            className={cn(
              "group flex w-10 flex-col gap-y-1 transition-opacity",
              {
                "hover:cursor-pointer": !isAnimating,
                "opacity-70": isAnimating,
              },
            )}
            onClick={toggleMenu}
            disabled={isAnimating} // Disable button during animation
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="header-menu"
          >
            <span
              className={cn(
                "ml-auto h-0.5 w-[70%] rounded-full bg-white transition-[width]",
                {
                  "group-hover:w-full": !isAnimating,
                  "w-full": isMenuOpen,
                },
              )}
            />
            <span
              className={cn(
                "mx-auto h-0.5 w-[70%] rounded-full bg-white transition-[width]",
                {
                  "group-hover:w-full": !isAnimating,
                  "w-full": isMenuOpen,
                },
              )}
            />
            <span
              className={cn(
                "mr-auto h-0.5 w-[70%] rounded-full bg-white transition-[width]",
                {
                  "group-hover:w-full": !isAnimating,
                  "w-full": isMenuOpen,
                },
              )}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
