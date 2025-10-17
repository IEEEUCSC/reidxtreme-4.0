import { SocialLinkData, TimelineItemProps } from "./types";
import { Instagram, Linkedin } from "lucide-react";

export const HeaderNav = [
  {
    title: "About",
    link: "#about",
  },
  {
    title: "Timeline",
    link: "#timeline",
  },
  {
    title: "Prizes",
    link: "#prizes",
  },
  {
    title: "Sponsors",
    link: "#sponsors",
  },
  {
    title: "FAQ",
    link: "#faq",
  },
];

export const HeaderSocials: SocialLinkData[] = [
  {
    title: "Instagram",
    link: "https://instagram.com",
    icon: Instagram,
  },
  {
    title: "LinkedIn",
    link: "https://linkedin.com",
    icon: Linkedin,
  },
];

export const TimelineData: TimelineItemProps[] = [
  {
    date: "13 AUG",
    title: "Session 1: Introduction to Competitive Programming",
    description:
      "Kickoff session covering ReidXtreme overview, IEEEXtreme connection, rounds, and CP fundamentals by Bhasura and Lakshith.",
  },
  {
    date: "20 AUG",
    title: "Session 2: Getting Started with Algorithms",
    description:
      "Dinuka Amarasinghe introduces fundamental algorithms in competitive programming with practical insights and examples.",
  },
  {
    date: "3 SEP",
    title: "Awareness Session: Team Dynamics",
    description:
      "Saneru Akarawita shares strategies to master team dynamics and prepare effectively for ReidXtreme 4.0.",
  },
  {
    date: "18 OCT",
    title: "Grand Finale: Final Round",
    description:
      "Top teams face an 8-hour onsite coding challenge to compete for the ReidXtreme 4.0 title.",
  },
];
