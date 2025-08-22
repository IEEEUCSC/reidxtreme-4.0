"use client";

import { HeaderNav, HeaderSocials } from "@/lib/data";
import HeaderMenuTarget from "./HeaderMenuTarget";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import { HeaderAnimConfig } from "@/lib/anim";
import HeaderSocialTarget from "./HeaderSocialTarget";

gsap.registerPlugin(SplitText, CustomEase);

interface HeaderMenuProps {
  isMenuOpen: boolean;
  onClose: () => void;
  onAnimationComplete: (isOpening: boolean) => void;
}

CustomEase.create(
  "nav-link-in",
  "M0,0 C0.142,0.035 0.33,0.186 0.367,0.316 0.488,0.74 0.498,0.845 0.609,0.921 0.74,1.01 0.818,1.001 1,1 ",
);

export default function HeaderMenu({
  isMenuOpen,
  onClose,
  onAnimationComplete,
}: HeaderMenuProps) {
  const container = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Create timeline refs to control animations
  const openTimeline = useRef<gsap.core.Timeline | null>(null);
  const closeTimeline = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef(false); // Track animation state internally

  let navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  let socialLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(
    () => {
      // Create open animation timeline
      openTimeline.current = gsap.timeline({
        paused: true,
        onStart: () => {
          console.log("GSAP Open animation started");
          isAnimatingRef.current = true;

          // Query nav links right when animation starts (when DOM is ready)
          navLinkRefs.current = Array.from(
            container.current?.querySelectorAll<HTMLAnchorElement>(
              ".nav-link",
            ) || [],
          );

          socialLinkRefs.current = Array.from(
            container.current?.querySelectorAll<HTMLAnchorElement>(
              ".social-link",
            ) || [],
          );

          console.log(
            `Open animation: Found ${navLinkRefs.current.length} nav links, ${socialLinkRefs.current.length} social links`,
          );

          // Reset all elements to initial state
          navLinkRefs.current.forEach((link, index) => {
            if (link) {
              gsap.set(link, { y: "100%", opacity: 0, rotate: "5deg" });
            }
          });
          socialLinkRefs.current.forEach((link, index) => {
            if (link) {
              gsap.set(link, { y: "100%", opacity: 0, rotate: "5deg" });
            }
          });
        },
        onComplete: () => {
          console.log("GSAP Open animation completed");
          isAnimatingRef.current = false;
          onAnimationComplete(true);
        },
        onInterrupt: () => {
          console.log("GSAP Open animation interrupted");
          isAnimatingRef.current = false;
        },
      });

      openTimeline.current
        .to(".layer-1", {
          clipPath: "inset(0 0 0% 0)",
          duration: HeaderAnimConfig.HeaderDropDown.duration,
          ease: HeaderAnimConfig.HeaderDropDown.ease,
        })
        .to(
          ".layer-2",
          {
            clipPath: "inset(0 0 0% 0)",
            duration: HeaderAnimConfig.HeaderDropDown.duration,
            ease: HeaderAnimConfig.HeaderDropDown.ease,
          },
          "-=.2",
        )
        .to(
          ".header-menu",
          {
            clipPath: "inset(0 0 0% 0)",
            duration: HeaderAnimConfig.HeaderDropDown.duration,
            ease: HeaderAnimConfig.HeaderDropDown.ease,
          },
          "-=.2",
        )
        .add(() => {
          // Add text animations after the links are queried
          navLinkRefs.current.forEach((link, index) => {
            if (link) {
              gsap.to(link, {
                y: "0%",
                opacity: 1,
                rotate: "0deg",
                duration: HeaderAnimConfig.HeaderMenuItem.duration,
                ease: "nav-link-in",
                delay: index * HeaderAnimConfig.HeaderMenuItem.stagger,
              });
            }
          });
        }, "<")
        .add(() => {
          socialLinkRefs.current.forEach((link, index) => {
            if (link) {
              gsap.to(link, {
                y: "0%",
                opacity: 1,
                rotate: "0deg",
                duration: HeaderAnimConfig.HeaderMenuItem.duration,
                ease: "nav-link-in",
                delay: index * HeaderAnimConfig.HeaderMenuItem.stagger,
              });
            }
          });
        }, "<");

      // Create close animation timeline
      closeTimeline.current = gsap.timeline({
        paused: true,
        onStart: () => {
          console.log("GSAP Close animation started");
          isAnimatingRef.current = true;

          // Ensure we have the latest nav links for closing
          navLinkRefs.current = Array.from(
            container.current?.querySelectorAll<HTMLAnchorElement>(
              ".nav-link",
            ) || [],
          );

          console.log(
            `Close animation: Found ${navLinkRefs.current.length} nav links`,
          );
        },
        onComplete: () => {
          console.log("GSAP Close animation completed");
          isAnimatingRef.current = false;
          onAnimationComplete(false);
        },
        onInterrupt: () => {
          console.log("GSAP Close animation interrupted");
          isAnimatingRef.current = false;
        },
      });

      closeTimeline.current
        .add(() => {
          // Animate text out first
          navLinkRefs.current.forEach((link, index) => {
            if (link) {
              gsap.fromTo(
                link,
                { y: "0%" },
                {
                  y: "100%",
                  duration: HeaderAnimConfig.HeaderMenuItem.duration * 0.5,
                  ease: "power2.in",
                  delay:
                    index * (HeaderAnimConfig.HeaderMenuItem.stagger * 0.3),
                },
              );
            }
          });
        })
        .to(
          ".header-menu",
          {
            clipPath: "inset(0 0 100% 0)",
            duration: HeaderAnimConfig.HeaderDropDown.duration,
            ease: HeaderAnimConfig.HeaderDropDown.ease,
          },
          0.5, // Start after some text animation
        )
        .to(
          ".layer-2",
          {
            clipPath: "inset(0 0 100% 0)",
            duration: HeaderAnimConfig.HeaderDropDown.duration * 0.7,
            ease: HeaderAnimConfig.HeaderDropDown.ease,
          },
          "-=.2",
        )
        .to(
          ".layer-1",
          {
            clipPath: "inset(0 0 100% 0)",
            duration: HeaderAnimConfig.HeaderDropDown.duration * 0.7,
            ease: HeaderAnimConfig.HeaderDropDown.ease,
          },
          "-=.2",
        );

      return () => {
        console.log("HeaderMenu cleanup - killing timelines");
        openTimeline.current?.kill();
        closeTimeline.current?.kill();
      };
    },
    { scope: container },
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("HeaderMenu unmounting - cleaning up timelines");
      openTimeline.current?.kill();
      closeTimeline.current?.kill();
    };
  }, []);

  // React to isMenuOpen changes
  useEffect(() => {
    console.log("HeaderMenu rendered", {
      isMenuOpen,
      isFirstRender: isFirstRender.current,
      isAnimating: isAnimatingRef.current,
    });

    // Skip animation on first render - component should just be ready
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Always kill any running animations first to prevent conflicts
    openTimeline.current?.kill();
    closeTimeline.current?.kill();

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      // Check if container and DOM elements exist
      if (!container.current) {
        console.error("Container not ready, retrying...");
        return;
      }

      // Re-query DOM elements to ensure they exist
      const navLinks =
        container.current.querySelectorAll<HTMLAnchorElement>(".nav-link");
      const socialLinks =
        container.current.querySelectorAll<HTMLAnchorElement>(".social-link");

      if (navLinks.length === 0) {
        console.warn("Nav links not found in DOM, retrying...");
        // Retry after a short delay
        setTimeout(() => {
          if (isMenuOpen) {
            openTimeline.current?.restart();
          } else {
            closeTimeline.current?.restart();
          }
        }, 100);
        return;
      }

      console.log(
        `Found ${navLinks.length} nav links, ${socialLinks.length} social links`,
      );

      if (isMenuOpen) {
        console.log("Starting GSAP open animation");
        openTimeline.current?.restart();
      } else {
        console.log("Starting GSAP close animation");
        closeTimeline.current?.restart();
      }
    });
  }, [isMenuOpen]);

  return (
    <div
      className="absolute min-h-screen w-[100vw]"
      ref={container}
      id="header-menu"
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="layer-1 absolute top-0 left-0 min-h-screen w-full bg-emerald-700/40"
        style={{
          clipPath: "inset(0 0 100% 0)",
        }}
      />
      <div
        className="layer-2 absolute top-0 left-0 min-h-screen w-full bg-emerald-700/70"
        style={{
          clipPath: "inset(0 0 100% 0)",
        }}
      />
      <div
        className="header-menu absolute top-0 flex min-h-screen w-full flex-col items-center bg-emerald-700 pt-[70px] pb-4 lg:justify-end lg:px-8 lg:py-[70px]"
        style={{
          clipPath: "inset(0 0 100% 0)",
        }}
      >
        <div className="container mx-auto flex h-full grow flex-col justify-between px-2 lg:flex-row lg:items-end">
          <nav className="flex w-full items-end lg:h-full">
            <ul className="flex w-full flex-col gap-y-2">
              {HeaderNav.map((item, i) => (
                <HeaderMenuTarget
                  key={item.title}
                  link={item.link}
                  title={item.title}
                  index={i}
                  onClose={onClose}
                />
              ))}
            </ul>
          </nav>
          <div className="flex items-end">
            <ul className="flex flex-col gap-y-2 lg:items-end">
              {HeaderSocials.map((item, i) => (
                <HeaderSocialTarget
                  key={item.title}
                  link={item.link}
                  title={item.title}
                  icon={item.icon}
                  onClose={onClose}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
